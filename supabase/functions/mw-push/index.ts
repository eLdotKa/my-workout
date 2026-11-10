// My Workout browser push dispatcher. Deploy as a Supabase Edge Function.
// Public GET returns only the VAPID public key; POST requires a private webhook header.
// NEVER add VAPID_PRIVATE_KEY, SERVICE_ROLE_KEY or MW_WEBHOOK_SECRET to GitHub.
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const cors = {
  "Access-Control-Allow-Origin": "https://eldotka.github.io",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "apikey, authorization, content-type, x-client-info",
  "Content-Type": "application/json; charset=utf-8",
};
const response = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: cors });
const uuid = (s: unknown) =>
  typeof s === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
const allowed = (p: { messages_enabled?: boolean; mute_until?: string | null } | undefined) =>
  !p || (p.messages_enabled !== false && (!p.mute_until || Date.parse(p.mute_until) <= Date.now()));
function equalSecret(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method === "GET") {
    const key = Deno.env.get("VAPID_PUBLIC_KEY");
    return key ? response({ publicKey: key }) : response({ error: "Push is not configured yet" }, 503);
  }
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);
  const secret = Deno.env.get("MW_WEBHOOK_SECRET") || "";
  if (!equalSecret(request.headers.get("x-mw-webhook-secret") || "", secret))
    return response({ error: "Unauthorized" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const publicKey = Deno.env.get("VAPID_PUBLIC_KEY");
  const privateKey = Deno.env.get("VAPID_PRIVATE_KEY");
  const subject = Deno.env.get("VAPID_SUBJECT");
  if (!supabaseUrl || !serviceKey || !publicKey || !privateKey || !subject)
    return response({ error: "Server configuration is incomplete" }, 503);
  if (!subject.startsWith("mailto:") && !subject.startsWith("https://"))
    return response({ error: "VAPID_SUBJECT must be a mailto: or HTTPS URL" }, 503);

  let event: { type?: string; table?: string; schema?: string; record?: { id?: string } };
  try { event = await request.json(); } catch { return response({ error: "Invalid payload" }, 400); }
  if (event.type !== "INSERT" || event.table !== "mw_messages" ||
      event.schema !== "public" || !uuid(event.record?.id))
    return response({ error: "Expected a mw_messages INSERT webhook" }, 400);

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // Never trust the webhook's author_id/group_id/body. Re-read the saved row.
  const { data: message, error: messageError } = await db.from("mw_messages")
    .select("id,group_id,thread_key,author_id")
    .eq("id", event.record!.id!).maybeSingle();
  if (messageError) return response({ error: "Message lookup failed" }, 500);
  if (!message) return response({ ok: true, sent: 0 });

  const { data: members, error: membersError } = await db.from("mw_members")
    .select("user_id").eq("group_id", message.group_id).neq("user_id", message.author_id);
  if (membersError) return response({ error: "Member lookup failed" }, 500);
  const userIds = [...new Set((members || []).map(m => m.user_id))];
  if (!userIds.length) return response({ ok: true, sent: 0 });

  const [globalResult, groupResult, subscriptionResult] = await Promise.all([
    db.from("mw_notification_prefs").select("user_id,messages_enabled,mute_until").in("user_id", userIds),
    db.from("mw_group_notification_prefs").select("user_id,messages_enabled,mute_until")
      .eq("group_id", message.group_id).in("user_id", userIds),
    db.from("mw_push_subscriptions").select("user_id,endpoint,p256dh,auth").in("user_id", userIds),
  ]);
  if (globalResult.error || groupResult.error || subscriptionResult.error)
    return response({ error: "Notification preference lookup failed" }, 500);
  const globalPrefs = new Map((globalResult.data || []).map(p => [p.user_id, p]));
  const groupPrefs = new Map((groupResult.data || []).map(p => [p.user_id, p]));
  const recipients = new Set(userIds.filter(id => allowed(globalPrefs.get(id)) && allowed(groupPrefs.get(id))));

  webpush.setVapidDetails(subject, publicKey, privateKey);
  const payload = JSON.stringify({
    title: "My Workout",
    body: "Nowa wiadomość w prywatnej grupie",
    groupId: message.group_id,
    threadKey: message.thread_key,
    messageId: message.id,
  });
  let sent = 0, failed = 0, removed = 0;
  for (const subscription of subscriptionResult.data || []) {
    if (!recipients.has(subscription.user_id)) continue;
    try {
      await webpush.sendNotification(
        { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
        payload,
        { TTL: 3600, urgency: "normal" },
      );
      sent++;
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode;
      if (status === 404 || status === 410) {
        const { error } = await db.from("mw_push_subscriptions")
          .delete().eq("user_id", subscription.user_id).eq("endpoint", subscription.endpoint);
        if (!error) removed++;
      } else {
        failed++;
        console.error("Web Push delivery failed", status || String(err));
      }
    }
  }
  return response({ ok: true, sent, failed, expiredSubscriptionsRemoved: removed });
});

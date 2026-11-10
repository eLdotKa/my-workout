(function workoutOnlineModule(){
  "use strict";
  const URL="https://tbhmudrrhelpyfqmmcxv.supabase.co";
  const KEY="sb_publishable_8h5bVBCNL7ZE6YE1bA2SFw_VsQfRWjS";
  const APP="https://eldotka.github.io/my-workout/";
  const GROUP_KEY="my-workout-online-group-id";
  const LANG={
    pl:{
      loading:"Łączenie z forum online…",offline:"Forum online jest chwilowo niedostępne. Sprawdź połączenie z internetem.",
      online:"Forum online",offlineShort:"Brak połączenia",login:"Zaloguj się do forum",loginInfo:"Wpisz e-mail, aby otrzymać link lub kod logowania. Twoje treningi pozostają zapisane lokalnie.",
      email:"Adres e-mail",loginButton:"Wyślij e-mail logowania",code:"Kod z wiadomości (jeśli otrzymałeś kod)",confirmCode:"Potwierdź kod",
      emailSent:"Sprawdź pocztę. Link może otworzyć aplikację w przeglądarce. Jeśli w wiadomości jest kod, wpisz go tutaj.",
      emailNeeded:"Podaj poprawny adres e-mail.",codeNeeded:"Podaj kod z wiadomości.",loginIssue:"Nie udało się zalogować",
      welcome:"Twoje konto",logout:"Wyloguj",nickname:"Twoja nazwa na forum",saveNickname:"Zapisz nazwę",profileNeeded:"Wybierz nazwę widoczną dla znajomych.",
      groups:"Prywatne grupy",createGroup:"Utwórz własną grupę",groupName:"Nazwa grupy, np. Ekipa z siłowni",create:"Utwórz",
      join:"Dołącz do grupy",inviteCode:"Wklej kod zaproszenia (UUID) lub pełny link",joinButton:"Dołącz",noGroups:"Utwórz grupę albo wklej zaproszenie otrzymane od znajomego.",
      activeGroup:"Aktywna grupa",invite:"Zaproś znajomych",makeInvite:"Wygeneruj zaproszenie",copyInvite:"Kopiuj kod",shareInvite:"Udostępnij zaproszenie",
      inviteInfo:"Zaproszenie wygasa po 7 dniach lub po 10 wykorzystaniach.",groupError:"Nie udało się pobrać grup.",
      posts:"Wiadomości",message:"Twoja wiadomość…",send:"Wyślij",noMessages:"Na razie nie ma wiadomości. Rozpocznij rozmowę.",
      delete:"Usuń",deleteConfirm:"Usunąć tę wiadomość?",refresh:"Odśwież",now:"Teraz",sessionInfo:"Tylko osoby z tej grupy widzą wiadomości.",
      auto:"Nowe wpisy pojawiają się na górze, bez ręcznego odświeżania.",alertOpen:"Alerty o nowych wiadomościach działają, gdy aplikacja jest otwarta.",
      noPush:"Powiadomienia w tle wymagają jeszcze usługi push. Ustawienia wyciszania są już zapisywane.",
      enabled:"Włącz alerty na urządzeniu",alertStatus:"Alerty urządzenia",settings:"Ustawienia powiadomień znajdziesz również w Settings.",
      emailLimit:"Na darmowym serwerze e-mail Supabase testowe wiadomości dochodzą tylko do członków zespołu. Aby logować znajomych, skonfiguruj własny SMTP.",
      actionError:"Operacja nie powiodła się",copied:"Skopiowano",inviteJoined:"Dołączono do grupy",nicknameSaved:"Zapisano nazwę",
      you:"Ty",pending:"Wysyłanie…",authentication:"Wymagane logowanie",notOwner:"Zaproszenia może tworzyć właściciel grupy.",
      messageCount:"Najnowsze wpisy",added:"Wiadomość wysłana",failed:"Nie można wczytać wpisów",restore:"Nie publikujemy automatycznie wcześniejszych lokalnych szkiców.",
      permissions:"Zezwolenie na alerty jest dobrowolne. Nie włącza powiadomień w tle.",
      selectGroup:"Wybierz grupę"
    },
    en:{
      loading:"Connecting to the online forum…",offline:"The online forum is temporarily unavailable. Check your connection.",
      online:"Online forum",offlineShort:"Offline",login:"Sign in to the forum",loginInfo:"Enter your email for a sign-in link or code. Your workout data remains on this device.",
      email:"Email address",loginButton:"Send sign-in email",code:"Email code (if provided)",confirmCode:"Verify code",
      emailSent:"Check your inbox. A link may open in your browser. If the email contains a code, enter it here.",
      emailNeeded:"Enter a valid email address.",codeNeeded:"Enter the code from the email.",loginIssue:"Could not sign in",
      welcome:"Your account",logout:"Sign out",nickname:"Your forum nickname",saveNickname:"Save nickname",profileNeeded:"Choose a name that friends can see.",
      groups:"Private groups",createGroup:"Create a group",groupName:"Group name, e.g. Gym Crew",create:"Create",
      join:"Join a group",inviteCode:"Paste invite UUID or full link",joinButton:"Join",noGroups:"Create a group or paste an invitation from a friend.",
      activeGroup:"Current group",invite:"Invite friends",makeInvite:"Generate invite",copyInvite:"Copy code",shareInvite:"Share invite",
      inviteInfo:"Invitations expire after 7 days or 10 uses.",groupError:"Could not load groups.",
      posts:"Messages",message:"Write a message…",send:"Send",noMessages:"No messages yet. Start the conversation.",
      delete:"Delete",deleteConfirm:"Delete this message?",refresh:"Refresh",now:"Now",sessionInfo:"Only members of this group can see the messages.",
      auto:"Newest messages appear first and refresh automatically.",alertOpen:"New-message alerts work while the app is open.",
      noPush:"Background push delivery still requires a separate service. Your mute settings are saved.",
      enabled:"Enable device alerts",alertStatus:"Device alerts",settings:"Notification preferences are also available in Settings.",
      emailLimit:"Supabase's default email service sends only to project team members. Configure SMTP before inviting friends.",
      actionError:"Action failed",copied:"Copied",inviteJoined:"Joined group",nicknameSaved:"Nickname saved",
      you:"You",pending:"Sending…",authentication:"Sign-in required",notOwner:"Only the group owner can create invitations.",
      messageCount:"Latest messages",added:"Message sent",failed:"Could not load messages",restore:"Older local drafts are not posted automatically.",
      permissions:"Device alerts are optional and do not enable background push.",
      selectGroup:"Select group"
    }
  };
  const validUUID=v=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(v||""));
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let language="en",prefs={messages:true,muteUntil:null},root=null,scope="general",onRemotePrefs=null;
  let client=null,loadingClient=null,boot=null,user=null,profile="",groups=[],group=null,messages=[],names={},channel=null,channelGroup="";
  let email="",notice="",error="",busy=false,lastPrefsUid="",inviteCode="",started=false,requestId=0,drafts={},friendName="",automaticProfileAttemptedFor="";
  const t=k=>(LANG[language]||LANG.en)[k]||k;
  function apiError(e){
    const v=String(e?.message||e||t("actionError")).slice(0,220);
    return v.replace(/\b(sb_secret_|service_role)\S*/g,"[hidden]");
  }
  function setStatus(s="",e=""){notice=s;error=e;draw()}
  function showToast(msg){
    const toast=document.createElement("div");
    toast.className="wf-toast";toast.textContent=msg;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3800);
  }
  function loadLibrary(){
    if(window.supabase?.createClient)return Promise.resolve(window.supabase);
    if(loadingClient)return loadingClient;
    loadingClient=new Promise((resolve,reject)=>{
      const tag=document.createElement("script");
      tag.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      tag.async=true;
      tag.onload=()=>window.supabase?.createClient?resolve(window.supabase):reject(new Error("Supabase library unavailable"));
      tag.onerror=()=>reject(new Error("Supabase library could not load"));
      document.head.appendChild(tag);
    });
    return loadingClient;
  }
  async function init(){
    await loadLibrary();
    if(client)return client;
    client=window.supabase.createClient(URL,KEY,{auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
    client.auth.onAuthStateChange((event,authSession)=>{
      if(event==="INITIAL_SESSION")return;
      const next=authSession?.user||null;
      if(next?.id===user?.id&&event!=="SIGNED_OUT")return;
      user=next;
      setTimeout(()=>refreshAccount().catch(e=>setStatus("",apiError(e))),0);
    });
    const r=await client.auth.getSession();
    if(r.error)throw r.error;
    user=r.data?.session?.user||null;
    await refreshAccount();
    return client;
  }
  let roster=[], inviteGroup="", pendingCode=new URLSearchParams(location.search).get("mw_invite")||"";
  function mount(options={}){
    language=options.lang==="pl"?"pl":"en";
    friendName=typeof options.friendName==="string"?options.friendName.trim().slice(0,40):"";
    prefs=options.notifications||prefs;
    onRemotePrefs=typeof options.onRemotePrefs==="function"?options.onRemotePrefs:onRemotePrefs;
    const box=document.querySelector(".forum-panel[data-thread]");
    if(!box){root=null;return}
    scope=box.dataset.thread||"general";
    box.innerHTML='<div class="wf-app"></div>';
    root=box.querySelector(".wf-app");
    if(!root)return;
    root.addEventListener("click",handleClick);
    root.addEventListener("submit",handleSubmit);
    root.addEventListener("input",ev=>{if(ev.target.id==="wf-message")drafts[scope]=ev.target.value});
    draw();
    if(!boot){
      boot=init().catch(e=>{error=apiError(e);draw();});
    } else if(client&&user&&group) {
      loadMessages().catch(e=>setStatus("",apiError(e)));
    }
  }
  function button(action,text,css="",more=""){
    return '<button type="button" class="wf-btn '+css+'" data-wf-action="'+action+'" '+more+'>'+text+'</button>';
  }
  function field(id,label,type="text",placeholder="",value="",extra=""){
    return '<label class="wf-field">'+esc(label)+'<input id="'+id+'" type="'+type+'" placeholder="'+esc(placeholder)+'" value="'+esc(value)+'" '+extra+'></label>';
  }
  function draw(){
    if(!root||!root.isConnected)return;
    let html='<div class="wf-title"><strong>🌐 '+t("online")+'</strong><small>'+esc(scope==="general"?"Friends Forum":scope.toUpperCase())+'</small></div>';
    if(!client){
      html+='<p class="wf-info">'+t("loading")+'</p>';
      if(error)html+='<p class="wf-error">'+esc(error)+'</p><p class="wf-info">'+t("offline")+'</p>';
    }else if(!user){
      html+='<h3>'+t("login")+'</h3><p class="wf-info">'+t("loginInfo")+'</p>';
      html+=field("wf-email",t("email"),"email","name@example.com",email,'autocomplete="email" inputmode="email"');
      html+=button("email",t("loginButton"),"",busy?"disabled":"");
      html+=field("wf-otp",t("code"),"text","123456","",'inputmode="numeric" autocomplete="one-time-code" maxlength="12"');
      html+=button("verify",t("confirmCode"),"secondary",busy?"disabled":"");
      html+='<p class="wf-small">'+t("emailLimit")+'</p>';
    }else{
      html+='<div class="wf-account"><small>'+t("welcome")+': '+esc(user.email||"")+'</small>'+button("signout",t("logout"),"link")+'</div>';
      if(!profile){
        html+='<h3>'+t("profileNeeded")+'</h3>'+field("wf-nick",t("nickname"),"text",t("nickname"),friendName, 'maxlength="40"');
        html+=button("nickname",t("saveNickname"),"",busy?"disabled":"");
      }else{
        html+='<div class="wf-account"><span>👤 '+esc(profile)+'</span>'+button("edit-nick","✎","link")+'</div>';
        html+='<h3>'+t("groups")+'</h3>';
        if(groups.length){
          html+='<label class="wf-field">'+t("selectGroup")+'<select id="wf-group">'+groups.map(g=>'<option value="'+esc(g.id)+'" '+(group?.id===g.id?'selected':'')+'>'+esc(g.name)+'</option>').join('')+'</select></label>';
        }else{
          html+='<p class="wf-info">'+t("noGroups")+'</p>';
        }
        html+='<details class="wf-details" '+(!groups.length?'open':'')+'><summary>+ '+t("createGroup")+'</summary>'+field("wf-groupname",t("groupName"),"text","My Workout",'','maxlength="60"')+button("create",t("create"),"",busy?"disabled":"")+'</details>';
        html+='<details class="wf-details" '+(!groups.length||validUUID(pendingCode)?'open':'')+'><summary>↳ '+t("join")+'</summary>'+field("wf-invite",t("inviteCode"),"text","xxxxxxxx-xxxx-...",validUUID(pendingCode)?pendingCode:"",'maxlength="250"')+button("join",t("joinButton"),"",busy?"disabled":"")+'</details>';
        if(group){
          html+='<p class="wf-info">🔒 '+esc(group.name)+' · '+t("sessionInfo")+'</p>';
          if(group.owner_id===user.id){
            html+='<details class="wf-details" '+(inviteGroup===group.id?'open':'')+'><summary>🔗 '+t("invite")+'</summary>'+button("make-invite",t("makeInvite"),"",busy?"disabled":"");
            if(inviteGroup===group.id && inviteCode) html+='<div class="wf-copy"><input id="wf-link" readonly value="'+esc(inviteCode)+'">'+button("copy-invite",t("copyInvite"),"secondary")+button("share-invite",t("shareInvite"),"secondary")+'</div>';
            html+='<p class="wf-small">'+t("inviteInfo")+'</p></details>';
          }
          if(root.parentElement.dataset.members){
            html+='<h3>'+ (language==="pl"?"Członkowie drużyny":"Team members")+'</h3><ul>'+roster.map(n=>'<li>'+esc(n)+'</li>').join("")+'</ul>';
          }else{
          html+='<div class="wf-compose"><textarea class="forum-text" id="wf-message" maxlength="500" placeholder="'+t("message")+'" aria-label="'+t("message")+'">'+esc(drafts[scope]||"")+'</textarea>'+button("send",t("send"),"",busy?"disabled":"")+'</div>';
          html+='<div class="wf-header"><h3>'+t("messageCount")+'</h3>'+button("refresh","↻ "+t("refresh"),"secondary")+'</div>';
          if(!messages.length)html+='<p class="wf-info">'+t("noMessages")+'</p>';
          html+=messages.map(m=>{
            const stamp=new Date(m.created_at).toLocaleString(language==="pl"?"pl-PL":"en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
            const author=m.author_id===user.id?t("you"):(names[m.author_id]||"Friend");
            return '<article class="forum-post"><div class="forum-post-header"><strong>'+esc(author)+'</strong><small>'+esc(stamp)+'</small></div><p>'+esc(m.body)+'</p>'+
              (m.author_id===user.id?'<div class="forum-post-actions">'+button("delete",t("delete"),"link",'data-id="'+esc(m.id)+'"')+'</div>':'')+'</article>';
          }).join("");
          html+='<p class="wf-small">'+t("auto")+'</p>';
          html+='<p class="wf-small">'+t("noPush")+'</p>';
          if("Notification" in window)html+=button("alerts",t("enabled"),"secondary");
          }
        }
      }
    }
    if(notice)html+='<p class="wf-ok" role="status">'+esc(notice)+'</p>';
    if(error&&client)html+='<p class="wf-error" role="alert">'+esc(error)+'</p>';
    root.innerHTML=html;
  }
  async function refreshAccount(){
    if(!client)return;
    if(channel){await client.removeChannel(channel);channel=null;channelGroup=""}
    if(!user){profile="";groups=[];group=null;messages=[];roster=[];inviteCode="";inviteGroup="";draw();return}
    const prof=await client.from("mw_profiles").select("nickname").eq("user_id",user.id).maybeSingle();
    if(prof.error)throw prof.error;
    profile=prof.data?.nickname||"";
    if(!profile&&friendName&&automaticProfileAttemptedFor!==user.id){
      automaticProfileAttemptedFor=user.id;
      try{
        await ensureProfile(friendName);
      }catch(e){
        // Keep the saved Friends name in the editable input.
        // The owner may still need to run 002_fix_profile_permissions.sql.
        error=apiError(e);
      }
    }
    const gs=await client.from("mw_groups").select("id,name,owner_id").order("created_at",{ascending:false});
    if(gs.error)throw gs.error;
    groups=gs.data||[];
    let preferred="";
    try{preferred=localStorage.getItem(GROUP_KEY)||""}catch(_){}
    group=groups.find(g=>g.id===preferred)||groups[0]||null;
    if(group)try{localStorage.setItem(GROUP_KEY,group.id)}catch(_){}
    if(lastPrefsUid!==user.id){
      lastPrefsUid=user.id;
      const remote=await client.from("mw_notification_prefs").select("messages_enabled,mute_until").eq("user_id",user.id).maybeSingle();
      if(!remote.error&&remote.data&&onRemotePrefs)onRemotePrefs(remote.data);
    }
    await loadMessages();
  }
  async function loadMessages(){
    if(!client||!user||!group){messages=[];draw();return}
    const targetGroup=group.id,targetScope=scope,number=++requestId;
    if(root?.parentElement.dataset.members){
      const members=await client.from("mw_members").select("user_id").eq("group_id",targetGroup);
      if(members.error)throw members.error;
      const ids=members.data.map(m=>m.user_id);
      const profiles=ids.length?await client.from("mw_profiles").select("user_id,nickname").in("user_id",ids):{data:[]};
      if(profiles.error)throw profiles.error;
      if(number!==requestId||targetGroup!==group?.id)return;
      const byId=new Map(profiles.data.map(p=>[p.user_id,p.nickname]));
      roster=ids.map(id=>byId.get(id)||(language==="pl"?"Członek":"Member"));
      draw();return;
    }
    const out=await client.from("mw_messages").select("id,group_id,thread_key,author_id,body,created_at")
      .eq("group_id",targetGroup).eq("thread_key",targetScope)
      .order("created_at",{ascending:false}).limit(100);
    if(number!==requestId||targetGroup!==group?.id||targetScope!==scope)return;
    if(out.error){error=apiError(out.error);messages=[];draw();return}
    messages=out.data||[];
    const ids=[...new Set(messages.map(m=>m.author_id))].filter(v=>v!==user?.id);
    if(ids.length){
      const n=await client.from("mw_profiles").select("user_id,nickname").in("user_id",ids);
      if(!n.error)(n.data||[]).forEach(p=>names[p.user_id]=p.nickname);
    }
    draw();
    subscribe();
  }
  function notificationAllowed(){
    if(prefs.messages===false)return false;
    const until=Date.parse(prefs.muteUntil||"");
    return !Number.isFinite(until)||until<=Date.now();
  }
  async function subscribe(){
    if(!client||!group)return;
    if(channel&&channelGroup===group.id)return;
    if(channel){await client.removeChannel(channel);channel=null}
    channelGroup=group.id;
    channel=client.channel("mw-forum-"+group.id+"-"+user.id)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"mw_messages",filter:"group_id=eq."+group.id},p=>{
        const m=p.new;
        if(!m)return;
        if(m.thread_key===scope)loadMessages().catch(()=>{});
        if(m.author_id===user.id||!notificationAllowed())return;
        showToast("💬 My Workout: "+(m.body||"").slice(0,100));
        if("Notification" in window&&Notification.permission==="granted"&&navigator.serviceWorker?.ready){
          navigator.serviceWorker.ready.then(reg=>reg.showNotification("My Workout",{body:(m.body||"").slice(0,110),tag:"mw-"+m.id})).catch(()=>{});
        }
      }).subscribe();
  }
  async function joinInvite(token,automatic=false){
    const clean=String(token||"").match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i)?.[0]||"";
    if(!validUUID(clean))throw new Error(t("inviteCode"));
    const joined=await client.rpc("mw_join_group",{p_token:clean});
    if(joined.error)throw joined.error;
    try{localStorage.setItem(GROUP_KEY,joined.data)}catch(_){}
    if(!automatic){notice=t("inviteJoined");await refreshAccount()}
  }
  async function ensureProfile(name){
    if(!user)throw new Error(t("authentication"));
    const trimmed=String(name||"").trim().slice(0,40);
    if(!trimmed)throw new Error(t("nickname"));
    const out=await client.from("mw_profiles").upsert({user_id:user.id,nickname:trimmed},{onConflict:"user_id"});
    if(out.error)throw out.error;
    profile=trimmed;notice=t("nicknameSaved");
  }
  async function savePrefs(p){
    prefs=p||prefs;
    if(!user||!client)return;
    const out=await client.from("mw_notification_prefs").upsert({
      user_id:user.id,messages_enabled:prefs.messages!==false,mute_until:prefs.muteUntil||null
    },{onConflict:"user_id"});
    if(out.error)console.warn("My Workout notification preferences:",out.error.message);
  }
  async function act(action,button){
    if(busy)return;
    error="";notice="";
    busy=true;
    try{
      if(action==="email"){
        const v=(document.getElementById("wf-email")?.value||email).trim();
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))throw new Error(t("emailNeeded"));
        email=v;
        const r=await client.auth.signInWithOtp({email,options:{emailRedirectTo:APP}});
        if(r.error)throw r.error;
        notice=t("emailSent");
      }else if(action==="verify"){
        const v=(document.getElementById("wf-otp")?.value||"").trim();
        const em=(document.getElementById("wf-email")?.value||email).trim();
        if(!v||!em)throw new Error(t("codeNeeded"));
        const r=await client.auth.verifyOtp({email:em,token:v,type:"email"});
        if(r.error)throw r.error;
        user=r.data.user;await refreshAccount();
      }else if(action==="signout"){
        const r=await client.auth.signOut();if(r.error)throw r.error;
        user=null;profile="";group=null;groups=[];messages=[];
      }else if(action==="nickname"){
        await ensureProfile(document.getElementById("wf-nick")?.value);
      }else if(action==="edit-nick"){
        const p=prompt(t("nickname"),profile);
        if(p!==null)await ensureProfile(p);
      }else if(action==="create"){
        const n=(document.getElementById("wf-groupname")?.value||"").trim().slice(0,60);
        if(!n)throw new Error(t("groupName"));
        const r=await client.rpc("mw_create_group",{p_name:n});if(r.error)throw r.error;
        try{localStorage.setItem(GROUP_KEY,r.data)}catch(_){}
        await refreshAccount();
      }else if(action==="join"){
        const token=document.getElementById("wf-invite")?.value;
        await joinInvite(token);
        pendingCode="";
        if(new URLSearchParams(location.search).has("mw_invite"))history.replaceState({},document.title,location.pathname+location.hash);
      }else if(action==="make-invite"){
        if(!group||group.owner_id!==user?.id)throw new Error(t("notOwner"));
        const r=await client.rpc("mw_create_invite",{p_group:group.id});if(r.error)throw r.error;
        inviteCode=r.data;inviteGroup=group.id;
      }else if(action==="copy-invite"){
        const val=document.getElementById("wf-link")?.value||inviteCode;
        if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(val);notice=t("copied")}
        else{const field=document.getElementById("wf-link");field?.select();notice=t("copyInvite")}
      }else if(action==="share-invite"){
        const inviteLink=APP+"?mw_invite="+encodeURIComponent(inviteCode);
        if(navigator.share)await navigator.share({title:"My Workout",url:inviteLink});
        else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(inviteLink);notice=t("copied")}
      }else if(action==="send"){
        const input=document.getElementById("wf-message");
        const text=(input?.value||"").trim().slice(0,500);
        if(!text)throw new Error(t("message"));
        const r=await client.from("mw_messages").insert({group_id:group.id,thread_key:scope,author_id:user.id,body:text});
        if(r.error)throw r.error;
        delete drafts[scope];notice=t("added");await loadMessages();
      }else if(action==="refresh"){await loadMessages()}
      else if(action==="delete"){
        const id=button.dataset.id;
        if(!validUUID(id)||!confirm(t("deleteConfirm")))return;
        const r=await client.from("mw_messages").delete().eq("id",id).eq("author_id",user.id).eq("group_id",group.id);
        if(r.error)throw r.error;
        await loadMessages();
      }else if(action==="alerts"){
        if(!("Notification" in window))throw new Error(t("permissions"));
        const status=await Notification.requestPermission();
        notice=status==="granted"?t("enabled"):t("permissions");
      }
    }catch(e){error=apiError(e)}
    finally{busy=false;draw()}
  }
  function handleClick(event){
    const b=event.target.closest("[data-wf-action]");
    if(!b)return;
    event.preventDefault();event.stopPropagation();
    act(b.dataset.wfAction,b);
  }
  function handleSubmit(event){event.preventDefault()}
  function handleChange(event){
    if(event.target.id!=="wf-group")return;
    const selected=groups.find(g=>g.id===event.target.value);
    if(!selected||selected.id===group?.id)return;
    group=selected;roster=[];inviteCode="";inviteGroup="";messages=[];names={};
    try{localStorage.setItem(GROUP_KEY,group.id)}catch(_){}
    loadMessages().catch(e=>setStatus("",apiError(e)));
  }
  function attachEvents(){
    document.addEventListener("change",ev=>{if(ev.target.id==="wf-group")handleChange(ev)});
  }
  attachEvents();
  window.MyWorkoutForum={
    mount,
    savePrefs:p=>{savePrefs(p).catch(e=>console.warn(e))},
    isNotificationEnabled:notificationAllowed,
    version:"1.0"
  };
})();

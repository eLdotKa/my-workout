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
      handle:"Moja @nazwa do zaproszeń",handleHelp:"Opcjonalnie: 3–24 znaki (a–z, 0–9, _). Zostaw puste, aby wyłączyć.",save:"Zapisz",inviteByName:"Dodaj po @nazwie",sendInvite:"Dodaj",inbox:"Otrzymane zaproszenia",accept:"Przyjmij",decline:"Odrzuć",sentInvite:"Dodano osobę do drużyny.",alreadyMember:"Ta osoba jest już w drużynie.",handleNotFound:"Nie znaleziono tej @nazwy. Znajomy musi zapisać swoją @nazwę w profilu i potwierdzić e-mail.",handleTaken:"Ta @nazwa jest zajęta.",invalidHandle:"Użyj 3–24 znaków: a–z, 0–9 lub _.",emptyInbox:"Brak zaproszeń.",
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
      handle:"My invitation @handle",handleHelp:"Optional: 3–24 characters (a–z, 0–9, _). Leave blank to turn off.",save:"Save",inviteByName:"Add by @handle",sendInvite:"Add",inbox:"Received invitations",accept:"Accept",decline:"Decline",sentInvite:"Added to the team.",alreadyMember:"This person is already in the team.",handleNotFound:"Handle not found. Your friend must save this @handle in their profile and confirm their email.",handleTaken:"That handle is taken.",invalidHandle:"Use 3–24 characters: a–z, 0–9 or _.",emptyInbox:"No invitations.",
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
      if(event==="SIGNED_OUT")localStorage.removeItem(ownerKey);
      user=next;
      setTimeout(()=>refreshAccount().catch(e=>setStatus("",apiError(e))),0);
    });
    const r=await client.auth.getSession();
    if(r.error)throw r.error;
    user=r.data?.session?.user||null;
    await refreshAccount();
    return client;
  }
  let myHandle="",inbox=[],inboxUser="",extraFeaturesAvailable=true;
  async function loadInvitations(){
    const uid=user?.id;
    if(!uid)return;
    const [own,invites]=await Promise.all([client.rpc("mw_my_invite_handle"),client.rpc("mw_my_invitations")]);
    if(uid!==user?.id)return;
    // Optional invitation-by-handle functions are introduced by a later SQL migration.
    // Never prevent existing private groups and chat from loading when that migration
    // has not yet been run in Supabase.
    if(own.error||invites.error){
      extraFeaturesAvailable=false;
      inboxUser=uid;myHandle="";inbox=[];
      console.info("My Workout: optional invitation features are not configured yet");
      return;
    }
    extraFeaturesAvailable=true;
    inboxUser=uid;myHandle=own.data||"";inbox=invites.data||[];
  }
  let totalsForSharing=null,progressRows=[],progressGroup="",progressUser="",flushing=false,retryTimer;
  const ownerKey="mw-progress-account-v1";
  const queueKey=uid=>"mw-progress-pending-v1-"+uid;
  function queueProgress(totals){
    const uid=localStorage.getItem(ownerKey);
    if(!uid||(user&&user.id!==uid))return;
    localStorage.setItem(queueKey(uid),JSON.stringify(totals));
    flushProgress();
  }
  async function flushProgress(){
    const uid=user?.id;
    if(!uid||!client||flushing||!navigator.onLine)return;
    const key=queueKey(uid);
    flushing=true;
    try{
      let raw;
      while(user?.id===uid&&(raw=localStorage.getItem(key))){
        const {exercises,workouts}=JSON.parse(raw);
        const result=await client.from("mw_team_progress").update({exercises,workouts}).eq("user_id",uid).eq("sharing",true);
        if(result.error)throw result.error;
        if(localStorage.getItem(key)===raw)localStorage.removeItem(key);
      }
    }catch(e){
      clearTimeout(retryTimer);retryTimer=setTimeout(flushProgress,15000);
    }finally{flushing=false}
  }
  function startClient(){
    if(!boot)boot=init().catch(e=>{boot=null;loadingClient=null;error=apiError(e);draw()});
  }
  window.addEventListener("online",()=>{startClient();flushProgress()});
  let roster=[], inviteGroup="", pendingCode=new URLSearchParams(location.search).get("mw_invite")||"";
  function mount(options={}){
    notificationSettings=options.notificationSettings;
    totalsForSharing=options.teamTotals;
    language=options.lang==="pl"?"pl":"en";
    friendName=typeof options.friendName==="string"?options.friendName.trim().slice(0,40):"";
    prefs=options.notifications||prefs;
    onRemotePrefs=typeof options.onRemotePrefs==="function"?options.onRemotePrefs:onRemotePrefs;
    const box=document.querySelector(".forum-panel[data-thread]");
    if(!box){root=null;if(localStorage.getItem(ownerKey)&&navigator.onLine)startClient();return}
    scope=box.dataset.thread||"general";
    box.innerHTML='<div class="wf-app"></div>';
    root=box.querySelector(".wf-app");
    if(!root)return;
    root.addEventListener("click",handleClick);
    root.addEventListener("submit",handleSubmit);
    root.addEventListener("input",ev=>{if(ev.target.id==="wf-message")drafts[draftKey()]=ev.target.value});
    draw();
    if(!boot){
      startClient();
    } else if(client&&user&&box.dataset.members){
      refreshAccount().catch(e=>setStatus("",apiError(e)));
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
  const draftKey=()=>[user?.id,group?.id,scope].join("/");
  let menuOpen=false,menuContext="",notificationSettings=null;
  function conversation(){
    const locale=language==="pl"?"pl-PL":"en-GB";
    let day="",html='<div class="mw-stream" role="log" aria-label="'+esc(t("messageCount"))+'">';
    if(!messages.length)html+='<p class="mw-empty">'+esc(t("noMessages"))+'</p>';
    for(const m of [...messages].reverse()){
      const mine=m.author_id===user.id,date=new Date(m.created_at),label=date.toLocaleDateString(locale,{day:"numeric",month:"short",year:"numeric"});
      if(label!==day){day=label;html+='<span class="mw-date">'+esc(label)+'</span>'}
      html+='<article class="mw-bubble'+(mine?' mine':'')+'">'+(mine?'':'<b>'+esc(names[m.author_id]||(language==="pl"?"Znajomy":"Friend"))+'</b>')+'<p>'+esc(m.body)+'</p><footer>'+esc(date.toLocaleTimeString(locale,{hour:"2-digit",minute:"2-digit"}))+
        (mine?'<details class="mw-message-menu"><summary aria-label="'+esc(t("delete"))+'">⋯</summary>'+button("delete",t("delete"),"link",'aria-label="'+esc(t("delete"))+'" title="'+esc(t("delete"))+'" data-id="'+esc(m.id)+'"')+'</details>':'')+'</footer></article>';
    }
    return html+'</div><div class="mw-compose"><textarea id="wf-message" rows="1" maxlength="500" placeholder="'+esc(t("message"))+'" aria-label="'+esc(t("message"))+'">'+esc(drafts[draftKey()]||"")+'</textarea><button class="mw-send" data-wf-action="send" aria-label="'+esc(t("send"))+'" title="'+esc(t("send"))+'">➤</button></div>';
  }
  function teamSwitcher(){
    if(groups.length<2)return "";
    const buttons=groups.map(team=>'<button type="button" class="mw-team-tab" data-wf-action="switch-team" data-id="'+esc(team.id)+'" aria-pressed="'+(team.id===group.id)+'">'+esc(team.name)+'</button>');
    return '<div class="mw-team-strip" role="group" aria-label="'+esc(t("selectGroup"))+'">'+buttons.join("")+'</div>';
  }
  function draw(){
    if(!root||!root.isConnected)return;
    let html='<div class="wf-title"><strong>🌐 '+t("online")+'</strong><small>'+esc(scope==="general"?"Friends Forum":scope.toUpperCase())+'</small></div>';
    if(!client){
      html+='<p class="wf-info">'+t("loading")+'</p>';
      if(error)html+='<p class="wf-error">'+esc(error)+'</p><p class="wf-info">'+t("offline")+'</p>';
    }else if(!user){
      html+='<h3>'+t("login")+'</h3><p class="wf-info">'+t("loginInfo")+'</p>';
      html+='<p class="wf-small">'+(language==="pl"?
        "Jeśli po dodaniu My Workout do ekranu głównego nie widzisz swojej grupy, zaloguj się tutaj tym samym kontem. Grupa i wiadomości są nadal w Supabase.":
        "If your group disappeared after adding My Workout to the Home Screen, sign in here with your original account. Your groups and messages remain in Supabase.")+'</p>';
      html+=field("wf-email",t("email"),"email","name@example.com",email,'autocomplete="email" inputmode="email"');
      html+=button("email",t("loginButton"),"",busy?"disabled":"");
      html+=field("wf-otp",t("code"),"text","123456","",'inputmode="numeric" autocomplete="one-time-code" maxlength="12"');
      html+=button("verify",t("confirmCode"),"secondary",busy?"disabled":"");
      html+='<p class="wf-small">'+t("emailLimit")+'</p>';
    }else{
      const membersView=!!root.parentElement.dataset.members;
      const context=[user.id,group?.id,scope,membersView].join("/");
      if(context!==menuContext){menuOpen=false;menuContext=context}
      if(group&&profile){
        const label=language==="pl"?"Opcje drużyny":"Team options";
        html='<div class="mw-chat-head"><span class="mw-avatar" aria-hidden="true">'+esc(Array.from(group.name)[0]?.toUpperCase()||"•")+'</span><div><strong>'+esc(group.name)+'</strong><small>'+esc(membersView?(language==="pl"?"Drużyna":"Team"):(scope==="general"?(language==="pl"?"Czat drużyny":"Team chat"):scope.toUpperCase()))+'</small></div><button type="button" class="mw-more" data-wf-action="menu" aria-label="'+label+'" title="'+label+'" aria-expanded="'+menuOpen+'">⋮</button></div>';
        html+=teamSwitcher();
        if(!membersView&&!menuOpen)html+=conversation();
      }
      if(group&&profile){
          if(root.parentElement.dataset.members){
            if(progressGroup===group.id&&progressUser===user.id){
              const mine=progressRows.find(p=>p.user_id===user.id);
              html+='<label class="wf-field"><span><input id="wf-sharing" type="checkbox" '+(mine?.sharing?'checked ':'')+(busy?'disabled':'')+'> '+(language==="pl"?"Udostępniaj mój postęp tej drużynie":"Share my progress with this team")+'</span></label>';
              html+='<h3>'+(language==="pl"?"Postępy drużyny":"Team progress")+'</h3><ul>'+roster.map(member=>{
                const score=progressRows.find(p=>p.user_id===member.id&&p.sharing);
                const summary=score?(language==="pl"?'Ćwiczenia: '+score.exercises+' · Treningi: '+score.workouts:'Exercises: '+score.exercises+' · Workouts: '+score.workouts):(language==="pl"?"Postęp prywatny":"Progress private");
                return '<li><strong>'+esc(member.name)+'</strong> · '+summary+'</li>';
              }).join("")+'</ul>';
            }
          }
      }
      if(group&&profile){
        html+='<div class="mw-menu" '+(menuOpen?'':'hidden')+'>';
        if(!membersView)html+='<button class="wf-btn secondary" data-action="forum-back">'+(language==="pl"?"Członkowie i postępy":"Members and progress")+'</button>';
      }
      if(profile)html+='<details class="wf-details"><summary>'+(language==="pl"?"Mój profil":"My profile")+'</summary>';
      html+='<div class="wf-account"><small>'+t("welcome")+': '+esc(user.email||"")+'</small>'+button("signout",t("logout"),"link")+'</div>';
      if(!profile){
        html+='<h3>'+t("profileNeeded")+'</h3>'+field("wf-nick",t("nickname"),"text",t("nickname"),friendName, 'maxlength="40"');
        html+=button("nickname",t("saveNickname"),"",busy?"disabled":"");
      }else{
        html+='<div class="wf-account"><span>👤 '+esc(profile)+'</span>'+button("edit-nick","✎","link")+'</div>';
        if(extraFeaturesAvailable)html+='<details class="wf-details"><summary>'+t("handle")+(inboxUser===user.id&&myHandle?' · @'+esc(myHandle):'')+'</summary>'+field("wf-handle",t("handle"),"text","@name",inboxUser===user.id?myHandle:"")+'<p>'+t("handleHelp")+'</p>'+button("save-handle",t("save"))+'</details>';
        html+='</details>';
        if(extraFeaturesAvailable)html+='<details class="wf-details" '+(inboxUser===user.id&&inbox.length?'open':'')+'><summary>'+t("inbox")+(inboxUser===user.id&&inbox.length?' ('+inbox.length+')':'')+'</summary>'+button("reload-inbox",t("refresh"),"secondary");
        if(extraFeaturesAvailable&&inboxUser===user.id&&inbox.length){
          for(const invite of inbox){
            const attr='data-id="'+esc(invite.invite_id)+'"';
            html+='<div class="wf-account"><span>'+esc(invite.group_name)+' · '+esc(invite.inviter_name)+'</span>'+button("accept-invite",t("accept"),"",attr)+button("decline-invite",t("decline"),"secondary",attr)+'</div>';
          }
        }else if(extraFeaturesAvailable)html+='<p class="wf-small">'+t("emptyInbox")+'</p>';
        if(extraFeaturesAvailable)html+='</details>';
        if(groups.length){
          html+='<label class="wf-field">'+t("selectGroup")+'<select id="wf-group">'+groups.map(g=>'<option value="'+esc(g.id)+'" '+(group?.id===g.id?'selected':'')+'>'+esc(g.name)+'</option>').join('')+'</select></label>';
        }else{
          html+='<p class="wf-info">'+t("noGroups")+'</p>';
        }
        html+='<details class="wf-details" '+''+'><summary>+ '+t("createGroup")+'</summary>'+field("wf-groupname",t("groupName"),"text","My Workout",'','maxlength="60"')+button("create",t("create"),"",busy?"disabled":"")+'</details>';
        html+='<details class="wf-details" '+(validUUID(pendingCode)?'open':'')+'><summary>↳ '+t("join")+'</summary>'+field("wf-invite",t("inviteCode"),"text","xxxxxxxx-xxxx-...",validUUID(pendingCode)?pendingCode:"",'maxlength="250"')+button("join",t("joinButton"),"",busy?"disabled":"")+'</details>';
        if(group){

          if(group.owner_id===user.id){
            html+='<details class="wf-details"><summary>'+t("invite")+'</summary>';
            if(extraFeaturesAvailable)html+=field("wf-target",t("inviteByName"),"text","@name")+button("invite-handle",t("sendInvite"));
            html+='<details class="wf-details" '+(inviteGroup===group.id?'open':'')+'><summary>🔗 '+t("invite")+'</summary>'+button("make-invite",t("makeInvite"),"",busy?"disabled":"");
            if(inviteGroup===group.id && inviteCode) html+='<div class="wf-copy"><input id="wf-link" readonly value="'+esc(inviteCode)+'">'+button("copy-invite",t("copyInvite"),"secondary")+button("share-invite",t("shareInvite"),"secondary")+'</div>';
            html+='<p class="wf-small">'+t("inviteInfo")+'</p></details></details>';
          }

        }
      }
    }
    if(user&&profile&&group){
      html+=button("refresh",t("refresh"),"secondary");
      if(!root.parentElement.dataset.members && notificationSettings){
        html+='<details class="wf-details"><summary>'+(language==="pl"?"Powiadomienia":"Notifications")+'</summary>'+notificationSettings()+("Notification" in window?button("alerts",t("enabled"),"secondary"):"")+'</details>';
      }
      html+='</div>';
    }
    if(notice)html+='<p class="wf-ok" role="status">'+esc(notice)+'</p>';
    if(error&&client)html+='<p class="wf-error" role="alert">'+esc(error)+'</p>';
    const stream=root.querySelector(".mw-stream"),previous=stream?.scrollTop||0;
    const bottom=!stream||stream.scrollHeight-stream.clientHeight-previous<44||stream.dataset.thread!==draftKey();
    const writing=document.activeElement?.id==="wf-message";
    const caret=writing?document.activeElement.selectionStart:0;
    const same=root.dataset.context===menuContext&&root.dataset.menu===String(menuOpen);
    const expanded=same?Array.from(root.querySelectorAll("details[open] > summary"),el=>el.textContent):[];
    const editing=same&&root.contains(document.activeElement)?document.activeElement:null;
    const fieldState=editing?.matches('input:not([type=checkbox]), textarea')&&editing.id!=="wf-message"?{id:editing.id,value:editing.value}:null;
    const oldStrip=root.querySelector(".mw-team-strip");
    const offset=oldStrip?.scrollLeft||0;
    const focusedTeam=document.activeElement?.dataset?.wfAction==="switch-team";
    root.innerHTML=html;
    const strip=root.querySelector(".mw-team-strip");
    if(strip){
      strip.scrollLeft=offset;
      const current=strip.querySelector('[aria-pressed="true"]');
      if(current&&(!same||!oldStrip)){
        const tab=current.getBoundingClientRect(),bounds=strip.getBoundingClientRect();
        if(tab.left<bounds.left)strip.scrollLeft+=tab.left-bounds.left-8;
        else if(tab.right>bounds.right)strip.scrollLeft+=tab.right-bounds.right+8;
      }
      if(focusedTeam&&current)current.focus({preventScroll:true});
    }
    root.dataset.context=menuContext;root.dataset.menu=String(menuOpen);
    for(const summary of root.querySelectorAll("details > summary"))if(expanded.includes(summary.textContent))summary.parentElement.open=true;
    if(fieldState){const field=document.getElementById(fieldState.id);if(field){field.value=fieldState.value;field.focus({preventScroll:true})}}
    const next=root.querySelector(".mw-stream");
    if(next){next.dataset.thread=draftKey();next.scrollTop=bottom?next.scrollHeight:previous}
    if(writing&&next){const input=root.querySelector("#wf-message");input.focus({preventScroll:true});input.setSelectionRange(caret,caret)}
  }
  async function refreshAccount(){
    if(!client)return;
    if(channel){await client.removeChannel(channel);channel=null;channelGroup=""}
    if(!user){if(navigator.onLine)localStorage.removeItem(ownerKey);profile="";groups=[];group=null;messages=[];roster=[];inviteCode="";inviteGroup="";draw();return}
    localStorage.setItem(ownerKey,user.id);
    flushProgress();
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
    await loadInvitations();
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
      const uid=user.id;
      const progress=await client.from("mw_team_progress").select("user_id,sharing,exercises,workouts").eq("group_id",targetGroup);
      if(progress.error)throw progress.error;
      if(number!==requestId||targetGroup!==group?.id||uid!==user?.id)return;
      progressRows=progress.data;progressGroup=targetGroup;progressUser=uid;
      const byId=new Map(profiles.data.map(p=>[p.user_id,p.nickname]));
      roster=ids.map(id=>({id,name:byId.get(id)||(language==="pl"?"Członek":"Member")}));
      draw();subscribe();return;
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
      if(number!==requestId||targetGroup!==group?.id||targetScope!==scope)return;
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
    const gid=group.id,uid=user.id;
    if(channel){
      const previous=channel;
      channel=null;
      await client.removeChannel(previous);
      if(group?.id!==gid||user?.id!==uid||channel)return;
    }
    channelGroup=gid;
    channel=client.channel("mw-forum-"+group.id+"-"+user.id)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"mw_messages",filter:"group_id=eq."+group.id},p=>{
        const m=p.new;
        if(!m||group?.id!==gid||user?.id!==uid)return;
        if(m.thread_key===scope)loadMessages().catch(()=>{});
        if(m.author_id===user.id||!notificationAllowed())return;
        showToast("💬 My Workout: "+(m.body||"").slice(0,100));
        if("Notification" in window&&Notification.permission==="granted"&&navigator.serviceWorker?.ready){
          navigator.serviceWorker.ready.then(reg=>reg.showNotification("My Workout",{body:(m.body||"").slice(0,110),tag:"mw-"+m.id})).catch(()=>{});
        }
      }).on("postgres_changes",{event:"*",schema:"public",table:"mw_team_progress",filter:"group_id=eq."+group.id},()=>{
        if(root?.parentElement.dataset.members)loadMessages().catch(e=>setStatus("",apiError(e)));
      }).subscribe(status=>{
        if(status==="SUBSCRIBED"&&root)loadMessages().catch(e=>setStatus("",apiError(e)));
      });
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
      if(action==="menu"){menuOpen=!menuOpen;return}
      if(action==="sharing"){
        const gid=group.id,uid=user.id,sharing=button.checked;
        const values={sharing,...(sharing?totalsForSharing():{exercises:null,workouts:null})};
        const update=()=>client.from("mw_team_progress").update(values).eq("group_id",gid).eq("user_id",uid).select("user_id");
        let result=await update();
        if(!result.error&&!result.data.length&&sharing){
          result=await client.from("mw_team_progress").insert({group_id:gid,user_id:uid,...values});
          if(result.error?.code==="23505")result=await update();
        }
        if(result.error)throw result.error;
        await loadMessages();
      }else if(action==="save-handle"||action==="invite-handle"){
        const saving=action==="save-handle";
        const handle=document.getElementById(saving?"wf-handle":"wf-target").value.trim().replace(/^@/,"").toLowerCase();
        if(!(saving&&!handle)&&!/^[a-z0-9_]{3,24}$/.test(handle))throw new Error(t("invalidHandle"));
        const result=saving?await client.rpc("mw_set_invite_handle",{p_handle:handle}):await client.rpc("mw_add_by_handle",{p_group:group.id,p_handle:handle});
        if(result.error)throw result.error.code==="23505"?new Error(t("handleTaken")):result.error.message==="Handle not found"?new Error(t("handleNotFound")):result.error;
        if(saving)await loadInvitations();
        notice=t(saving?"nicknameSaved":result.data==="already_member"?"alreadyMember":"sentInvite");
        if(!saving){document.getElementById("wf-target").value="";await loadMessages()}
      }else if(action==="reload-inbox"){
        await loadInvitations();
      }else if(action==="accept-invite"||action==="decline-invite"){
        const result=await client.rpc("mw_answer_invitation",{p_id:button.dataset.id,p_accept:action==="accept-invite"});
        if(result.error)throw result.error;
        if(result.data)try{localStorage.setItem(GROUP_KEY,result.data)}catch(_){}
        await refreshAccount();
      }else if(action==="email"){
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
        delete drafts[draftKey()];notice="";await loadMessages();
      }else if(action==="refresh"){await refreshAccount()}
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
    if(b.dataset.wfAction==="switch-team"){selectTeam(b.dataset.id);return}
    act(b.dataset.wfAction,b);
  }
  function handleSubmit(event){event.preventDefault()}
  function selectTeam(id){
    if(busy){draw();return}
    const selected=groups.find(g=>g.id===id);
    if(!selected||selected.id===group?.id)return;
    group=selected;notice="";error="";progressGroup="";roster=[];inviteCode="";inviteGroup="";messages=[];names={};
    try{localStorage.setItem(GROUP_KEY,group.id)}catch(_){}
    draw();
    loadMessages().catch(e=>setStatus("",apiError(e)));
  }
  function attachEvents(){
    document.addEventListener("change",ev=>{if(ev.target.id==="wf-sharing")act("sharing",ev.target);if(ev.target.id==="wf-group")selectTeam(ev.target.value)});
  }
  attachEvents();
  window.MyWorkoutForum={
    mount,queueProgress,
    savePrefs:p=>{savePrefs(p).catch(e=>console.warn(e))},
    isNotificationEnabled:notificationAllowed,
    version:"1.0"
  };
})();

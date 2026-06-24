// Sorbet — screens D: deeper Report + Me flows
const { useState: dS } = React;

const SB_KIND = {
  mess: { label:'Cleanliness', bg:'rgba(255,92,122,0.14)', fg:'#E84A68' },
  fix:  { label:'Maintenance', bg:'rgba(242,179,61,0.20)', fg:'#9A6B12' },
  note: { label:'Heads-up',    bg:'rgba(79,185,138,0.18)', fg:'#2F7D5A' },
};

// ─────────────────────────────────────────────────────
// REPORT POSTED — confirmation
// ─────────────────────────────────────────────────────
function SReportPosted({ ctx, parkId }) {
  const { go, parks } = ctx;
  const park = parks.find(p => p.id === parkId) || parks[0];
  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="coral" mode="fade" fade={330}/>
      <SBStatus light/>

      {/* hero */}
      <div style={{ position:'relative', zIndex:2, padding:'10px 28px 0', textAlign:'center', color:SB.ink }}>
        <div style={{ width:88, height:88, borderRadius:'50%', background:SB.accent, border:'none',
          margin:'18px auto 0', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 10px 28px ${SB.accentSh}` }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
        </div>
        <SHead light size={38} style={{ marginTop:22 }}>Posted!</SHead>
        <p style={{ margin:'8px 0 0', fontFamily:SB.ui, fontSize:14, color:SB.inkSoft, lineHeight:1.5 }}>Thanks, Mira — your heads-up is live at<br/>{park.name} for the next 24 hours.</p>
      </div>

      {/* body */}
      <div style={{ position:'relative', zIndex:2, flex:1, padding:'26px 20px 0' }}>
        <SLabel style={{ marginBottom:10, paddingLeft:4 }}>Your report</SLabel>
        <SFrost tone="card2" radius={20} style={{ padding:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <span style={{ fontFamily:SB.ui, fontSize:10.5, fontWeight:800, padding:'4px 10px', borderRadius:999, background:SB_KIND.mess.bg, color:SB_KIND.mess.fg, letterSpacing:'0.04em', textTransform:'uppercase' }}>Cleanliness</span>
            <span style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>just now</span>
          </div>
          <div style={{ fontFamily:SB.serif, fontWeight:500, fontSize:18, color:SB.ink, lineHeight:1.4 }}>Trash overflowing near the south bench.</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:`1px solid ${SB.line}` }}>
            <span style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>Mira · expires in 24h</span>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:SB.ui, fontSize:11.5, fontWeight:700, color:SB.accent }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:SB.accent }}/> Live
            </div>
          </div>
        </SFrost>

        <SFrost radius={16} style={{ marginTop:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:SB.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>✦</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.ink }}>+5 park karma</div>
            <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:1 }}>6 reports this month · top 10% in your area</div>
          </div>
        </SFrost>
      </div>

      {/* sticky */}
      <div style={{ position:'relative', zIndex:2, padding:'12px 20px 14px', display:'flex', gap:8, flexShrink:0 }}>
        <button onClick={()=>go('feed', park.id)} style={{ flex:1, background:'rgba(255,255,255,0.7)', color:SB.ink, border:`1px solid ${SB.cardB}`, borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:13.5, fontWeight:700, cursor:'pointer' }}>See all reports</button>
        <button onClick={()=>go('park', park.id)} style={{ flex:1, background:SB.accent, color:'#fff', border:'none', borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:`0 8px 22px ${SB.accentSh}` }}>Back to park</button>
      </div>
      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// REPORTS FEED — all community reports at a park
// ─────────────────────────────────────────────────────
function SReportsFeed({ ctx, parkId }) {
  const { go, parks } = ctx;
  const park = parks.find(p => p.id === parkId) || parks[0];
  const [filter, setFilter] = dS('all');
  const feed = [
    { kind:'mess', who:'Tamar · mom', text:'Trash overflowing near the south bench.', time:'34 min', votes:3 },
    { kind:'note', who:'Yael · mom',  text:'Sand pit just refilled — clean and dry today.', time:'1 h', votes:8 },
    { kind:'fix',  who:'Adi · dad',   text:'Loose bolt on the small slide — taped off for now.', time:'2 h', votes:5 },
    { kind:'note', who:'Roni · dad',  text:'Lots of shade near the swings this morning.', time:'4 h', votes:2 },
    { kind:'mess', who:'Dana · mom',  text:'Puddle by the gate, slippery after the sprinklers.', time:'5 h', votes:1 },
  ];
  const filters = [['all','All'],['mess','Cleanliness'],['fix','Maintenance'],['note','Heads-up']];
  const shown = filter === 'all' ? feed : feed.filter(r => r.kind === filter);

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, padding:'2px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={()=>go('park', park.id)} style={{ background:'none', border:'none', fontSize:22, color:SB.inkSoft, cursor:'pointer', padding:0 }}>‹</button>
          <button onClick={()=>go('report', park.id)} style={{ background:SB.accent, color:'#fff', border:'none', borderRadius:999, padding:'8px 16px', fontFamily:SB.ui, fontSize:12.5, fontWeight:700, cursor:'pointer' }}>+ Add</button>
        </div>
        <SHead size={32} style={{ marginTop:8 }}>From parents</SHead>
        <div style={{ fontFamily:SB.ui, fontSize:13, color:SB.inkSoft, marginTop:2 }}>{park.name} · last 24 hours</div>
        <div className="sb-scroll" style={{ display:'flex', gap:7, marginTop:14, overflowX:'auto', paddingBottom:4 }}>
          {filters.map(([id,l]) => <SPill key={id} active={filter===id} onClick={()=>setFilter(id)} size="sm">{l}</SPill>)}
        </div>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'14px 18px 16px', display:'flex', flexDirection:'column', gap:10, minHeight:0 }}>
        {shown.map((r,i) => {
          const k = SB_KIND[r.kind];
          return (
            <SFrost key={i} tone="card2" radius={18} style={{ padding:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:SB.ui, fontSize:10.5, fontWeight:800, padding:'4px 10px', borderRadius:999, background:k.bg, color:k.fg, letterSpacing:'0.04em', textTransform:'uppercase' }}>{k.label}</span>
                <span style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>{r.time} ago</span>
              </div>
              <div style={{ fontFamily:SB.serif, fontWeight:500, fontSize:17, color:SB.ink, lineHeight:1.4 }}>{r.text}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12, paddingTop:11, borderTop:`1px solid ${SB.line}` }}>
                <span style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>{r.who}</span>
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ fontFamily:SB.ui, fontSize:12, fontWeight:700, color:SB.inkSoft, display:'flex', alignItems:'center', gap:5 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11v8M7 11l4-7a2 2 0 0 1 3 1v3h4a2 2 0 0 1 2 2l-1.5 6a2 2 0 0 1-2 1.5H7"/></svg>
                    {r.votes}
                  </span>
                  <span style={{ fontFamily:SB.ui, fontSize:12, fontWeight:700, color:SB.accent }}>Still here?</span>
                </div>
              </div>
            </SFrost>
          );
        })}
      </div>
      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ME · EDIT BUDDY PROFILE
// ─────────────────────────────────────────────────────
function SMeEdit({ ctx }) {
  const { go, me } = ctx;
  const [name, setName] = dS(me.kid.name);
  const [age, setAge]   = dS(2);
  const [loves, setLoves] = dS(['sand','climb','dog']);
  const LOVES = [['sand','Sand'],['climb','Climbing'],['swing','Swings'],['water','Water'],['art','Art'],['dog','Dogs'],['run','Running'],['music','Music'],['books','Books']];
  const tog = id => setLoves(l => l.includes(id) ? l.filter(x=>x!==id) : [...l, id]);

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 22px 12px' }}>
        <button onClick={()=>go('me')} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:600, color:SB.inkSoft, cursor:'pointer' }}>Cancel</button>
        <SLabel>Edit buddy</SLabel>
        <button onClick={()=>go('me')} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:800, color:SB.accent, cursor:'pointer' }}>Save</button>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'4px 22px 16px', minHeight:0 }}>
        {/* avatar + name */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'8px 0 18px' }}>
          <div style={{ position:'relative' }}>
            <div style={{ width:96, height:96, borderRadius:28, background:SB.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.serif, fontWeight:600, fontSize:46, color:SB.ink }}>{(name[0]||'?').toUpperCase()}</div>
            <div style={{ position:'absolute', right:-6, bottom:-6, width:34, height:34, borderRadius:'50%', background:SB.accent, border:'3px solid #FBF3EF', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4l10-10a2 2 0 0 0-3-3L5 17v3Z"/></svg>
            </div>
          </div>
        </div>

        <SLabel style={{ marginBottom:8 }}>Name</SLabel>
        <SFrost tone="card2" radius={16} style={{ padding:'4px 16px' }}>
          <input value={name} onChange={e=>setName(e.target.value)} style={{ width:'100%', border:'none', background:'none', outline:'none', fontFamily:SB.serif, fontWeight:600, fontSize:22, color:SB.ink, padding:'12px 0' }}/>
        </SFrost>

        <SLabel style={{ margin:'20px 0 8px' }}>Age</SLabel>
        <SFrost tone="card2" radius={16} style={{ padding:'16px 16px 14px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
            <span style={{ fontFamily:SB.ui, fontSize:13, color:SB.inkSoft }}>Years old</span>
            <span style={{ fontFamily:SB.serif, fontWeight:600, fontSize:22, color:SB.ink }}>{age}y</span>
          </div>
          <input className="sb-range" type="range" min="1" max="5" step="0.5" value={age} onChange={e=>setAge(parseFloat(e.target.value))} style={{ width:'100%' }}/>
        </SFrost>

        <SLabel style={{ margin:'20px 0 8px' }}>What they love</SLabel>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {LOVES.map(([id,l]) => <SPill key={id} active={loves.includes(id)} onClick={()=>tog(id)} tone="sel" size="sm">{l}</SPill>)}
        </div>

        <button style={{ width:'100%', marginTop:26, background:'none', border:'none', fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.accentD, cursor:'pointer', padding:'12px 0' }}>Remove this buddy</button>
      </div>
      <SBTabBar active="me" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ME · SETTINGS
// ─────────────────────────────────────────────────────
function SMeSettings({ ctx }) {
  const { go, me } = ctx;
  const [t, setT] = dS({ beacon:true, auto:false, age:true, match:true, push:true, weekly:false });
  const flip = k => setT(s => ({ ...s, [k]: !s[k] }));

  const Row = ({ k, title, sub }) => (
    <SFrost tone="card2" radius={14} style={{ padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.ink }}>{title}</div>
        {sub && <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:1 }}>{sub}</div>}
      </div>
      <button onClick={()=>flip(k)} style={{ background:'none', border:'none', padding:0, cursor:'pointer' }}><SToggle on={t[k]}/></button>
    </SFrost>
  );
  const Link = ({ title, val }) => (
    <SFrost tone="card2" radius={14} style={{ padding:'13px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}>
      <span style={{ fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.ink }}>{title}</span>
      <span style={{ fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft }}>{val} ›</span>
    </SFrost>
  );

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:14, padding:'2px 22px 8px' }}>
        <button onClick={()=>go('me')} style={{ background:'none', border:'none', fontSize:22, color:SB.inkSoft, cursor:'pointer', padding:0 }}>‹</button>
        <SHead size={30}>Settings</SHead>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'8px 18px 16px', minHeight:0 }}>
        <SLabel style={{ margin:'8px 0 10px', paddingLeft:4 }}>Privacy</SLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <Row k="beacon" title="Who can see my beacon" sub="My circle of 12"/>
          <Row k="auto" title="Auto-beacon at parks" sub="Off · ask me each time"/>
          <Row k="age" title="Show Talia's age" sub="Year only · 2y"/>
          <Row k="match" title="Buddy match suggestions" sub="Same neighborhood · ±6mo"/>
        </div>

        <SLabel style={{ margin:'22px 0 10px', paddingLeft:4 }}>Notifications</SLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <Row k="push" title="A buddy drops a beacon nearby"/>
          <Row k="weekly" title="Weekly park digest"/>
        </div>

        <SLabel style={{ margin:'22px 0 10px', paddingLeft:4 }}>Account</SLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <Link title="Name" val={me.parent}/>
          <Link title="Neighborhood" val="Neve Zemer"/>
          <Link title="Email" val="mira@…"/>
        </div>

        <button style={{ width:'100%', marginTop:24, background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:700, color:SB.accentD, cursor:'pointer', padding:'12px 0' }}>Sign out</button>
      </div>
      <SBTabBar active="me" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PLAN POSTED — playdate beacon went live
// ─────────────────────────────────────────────────────
function SPlanDone({ ctx, parkId }) {
  const { go, parks, friends } = ctx;
  const park = parks.find(p => p.id === parkId) || parks[0];
  const invited = friends.slice(0, 3).map((f,i) => ({ letter:f.avatar, color: sbAvatarColors[i % sbAvatarColors.length], name:f.parent.split(' ')[0] }));

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="warm" mode="fade" fade={340}/>
      <SBStatus light/>

      {/* hero */}
      <div style={{ position:'relative', zIndex:2, padding:'10px 28px 0', textAlign:'center', color:SB.ink }}>
        <div style={{ width:88, height:88, borderRadius:'50%', background:SB.accent, border:'none',
          margin:'18px auto 0', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 10px 28px ${SB.accentSh}` }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l20-9-9 20-2.5-8.5L2 12z"/></svg>
        </div>
        <SHead light size={38} style={{ marginTop:22 }}>Beacon on!</SHead>
        <p style={{ margin:'8px 0 0', fontFamily:SB.ui, fontSize:14, color:SB.inkSoft, lineHeight:1.5 }}>Your invite just went out to <span style={{ fontWeight:700, color:SB.ink }}>{invited.length} parents</span>. We’ll ping you the moment someone says yes.</p>
      </div>

      {/* the sentence card */}
      <div style={{ position:'relative', zIndex:2, padding:'22px 20px 0' }}>
        <SLabel style={{ marginBottom:10, paddingLeft:4 }}>Your playdate</SLabel>
        <SFrost tone="card2" radius={20} style={{ padding:18 }}>
          <div style={{ fontFamily:SB.serif, fontWeight:500, fontSize:21, color:SB.ink, lineHeight:1.35 }}>
            I’m heading to <span style={{ fontStyle:'italic', color:SB.accent }}>{park.name}</span> at <span style={{ fontStyle:'italic', color:SB.accent }}>16:00</span>.
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:`1px solid ${SB.line}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <SAvatarStack items={invited} size={28}/>
              <span style={{ fontFamily:SB.ui, fontSize:12, color:SB.inkSoft }}>{invited.map(a=>a.name).join(', ')}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:SB.ui, fontSize:11.5, fontWeight:700, color:SB.accent }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:SB.accent }}/> Live
            </div>
          </div>
        </SFrost>

        <SFrost radius={16} style={{ marginTop:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:SB.peach, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>⏱</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.ink }}>Auto-expires at 6:00 PM</div>
            <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:1 }}>Beacon comes down after your window. No permanent trace.</div>
          </div>
        </SFrost>
      </div>

      {/* sticky CTAs */}
      <div style={{ position:'relative', zIndex:2, marginTop:'auto', padding:'12px 20px 14px', display:'flex', gap:8, flexShrink:0 }}>
        <button onClick={()=>go('inbox')} style={{ flex:1, background:'rgba(255,255,255,0.7)', color:SB.ink, border:`1px solid ${SB.cardB}`, borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:13.5, fontWeight:700, cursor:'pointer' }}>See replies</button>
        <button onClick={()=>go('home')} style={{ flex:1, background:SB.accent, color:'#fff', border:'none', borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:`0 8px 22px ${SB.accentSh}` }}>Back to home</button>
      </div>
      <SBTabBar active="plan" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// COMPOSE — the + button action sheet
// ─────────────────────────────────────────────────────
function SCompose({ ctx }) {
  const { go } = ctx;

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', background:'rgba(58,29,46,0.32)' }}>
      <SBStatus/>
      {/* dim backdrop — tapping cancels back to home */}
      <button onClick={()=>go('home')} aria-label="Close" style={{ position:'absolute', inset:0, background:'transparent', border:'none', cursor:'pointer', zIndex:1 }}/>

      {/* sheet */}
      <div style={{ position:'relative', zIndex:2, marginTop:'auto', background:SB.surface,
        borderTopLeftRadius:28, borderTopRightRadius:28, padding:'18px 20px 24px',
        boxShadow:'0 -20px 60px rgba(58,29,46,0.18)' }}>
        {/* grabber */}
        <div style={{ width:42, height:4, borderRadius:99, background:'rgba(58,29,46,0.18)', margin:'0 auto 16px' }}/>
        <SLabel style={{ marginBottom:6 }}>What’s on your mind?</SLabel>
        <SHead size={26}>Start something <span style={{ fontStyle:'italic', color:SB.accent }}>quick.</span></SHead>

        {/* two big options */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:18 }}>
          <button onClick={()=>go('plan', 'gan-gitara')} style={{
            display:'flex', alignItems:'center', gap:14, padding:'18px 18px',
            background: 'linear-gradient(120deg, rgba(255,151,184,0.18), rgba(196,155,236,0.14))',
            border:`1px solid ${SB.cardB}`, borderRadius:20, cursor:'pointer', textAlign:'left', width:'100%',
          }}>
            <div style={{ width:50, height:50, borderRadius:16, background:SB.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              boxShadow:`0 6px 16px ${SB.accentSh}` }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-4 3v-3a3 3 0 0 1-3-3V8Z" fill="none"/><circle cx="9" cy="12" r="1.2" fill="#fff"/><circle cx="13" cy="12" r="1.2" fill="#fff"/><circle cx="17" cy="12" r="1.2" fill="#fff"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:19, color:SB.ink, lineHeight:1.2 }}>Ask friends for a <span style={{ fontStyle:'italic', color:SB.accent }}>playdate</span></div>
              <div style={{ fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft, marginTop:4 }}>Pick a park, a time, who can see it. Posts as a sentence.</div>
            </div>
            <span style={{ fontSize:22, color:SB.inkFaint }}>›</span>
          </button>

          <button onClick={()=>go('report', 'gan-gitara')} style={{
            display:'flex', alignItems:'center', gap:14, padding:'18px 18px',
            background: 'linear-gradient(120deg, rgba(255,183,120,0.18), rgba(255,217,138,0.18))',
            border:`1px solid ${SB.cardB}`, borderRadius:20, cursor:'pointer', textAlign:'left', width:'100%',
          }}>
            <div style={{ width:50, height:50, borderRadius:16, background:SB.yellowD, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              boxShadow:'0 6px 16px rgba(242,179,61,0.36)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12l4 4v12H4Z"/><path d="M9 13h6M9 17h4"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:19, color:SB.ink, lineHeight:1.2 }}>Write a <span style={{ fontStyle:'italic', color:SB.accent }}>report</span> about a park</div>
              <div style={{ fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft, marginTop:4 }}>Cleanliness, broken stuff, or a heads-up. Expires in 24h.</div>
            </div>
            <span style={{ fontSize:22, color:SB.inkFaint }}>›</span>
          </button>
        </div>

        <button onClick={()=>go('home')} style={{ width:'100%', marginTop:14, background:'none', color:SB.inkSoft,
          border:'none', padding:'14px 0', fontFamily:SB.ui, fontSize:14, fontWeight:600, cursor:'pointer' }}>Cancel</button>
      </div>
    </div>
  );
}

Object.assign(window, { SReportPosted, SReportsFeed, SMeEdit, SMeSettings, SPlanDone, SCompose });

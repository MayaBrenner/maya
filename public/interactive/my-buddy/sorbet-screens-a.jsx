// Sorbet — screens A: Welcome, Setup, Home
const { useState: aS } = React;

// ─────────────────────────────────────────────────────
// WELCOME — aurora splash
// ─────────────────────────────────────────────────────
function SWelcome({ ctx }) {
  const go = ctx.go;
  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="warm"/>
      <SBStatus light/>
      <div style={{ position:'relative', zIndex:2, flex:1, display:'flex', flexDirection:'column', padding:'8px 32px 40px', minHeight:0 }}>
        <SLabel light style={{ letterSpacing:'0.2em' }}>My Buddy</SLabel>

        {/* Park-with-a-friend scene: two parent + child duos meeting on a hill,
            swaying trees behind, soft sun. Figures are intentionally chunky
            so they read clearly at small sizes. */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <svg width="280" height="210" viewBox="0 0 280 210" style={{ overflow:'visible' }}>
            {/* sun + halo */}
            <circle cx="232" cy="32" r="32" fill="#fff" opacity="0.18"/>
            <circle cx="232" cy="32" r="22" fill="#fff" opacity="0.92"/>

            {/* swaying tree (left, behind figures) */}
            <g style={{ transformOrigin:'40px 178px', animation:'sbsway 5.2s ease-in-out infinite' }}>
              <ellipse cx="40" cy="92" rx="32" ry="28" fill="#fff" opacity="0.88"/>
              <ellipse cx="28" cy="80" rx="16" ry="14" fill="#FF89AE"/>
              <ellipse cx="50" cy="84" rx="13" ry="12" fill="#C49BEC"/>
              <rect x="36" y="116" width="8" height="32" rx="3" fill="#fff" opacity="0.95"/>
            </g>

            {/* swaying tree (right, behind figures) */}
            <g style={{ transformOrigin:'242px 188px', animation:'sbsway 4.6s ease-in-out infinite', animationDelay:'0.6s' }}>
              <ellipse cx="242" cy="118" rx="22" ry="20" fill="#fff" opacity="0.85"/>
              <ellipse cx="242" cy="112" rx="13" ry="12" fill="#FFB778"/>
              <rect x="239" y="136" width="6" height="26" rx="3" fill="#fff" opacity="0.92"/>
            </g>

            {/* horizon hill */}
            <path d="M0 200 Q 70 178 140 184 Q 210 190 280 174 L 280 210 L 0 210 Z" fill="#fff" opacity="0.55"/>

            {/* — PARENT + KID DUO #1 (left of centre, peach + pink) — */}
            {/* parent shadow */}
            <ellipse cx="108" cy="187" rx="22" ry="3.5" fill="#3A1D2E" opacity="0.12"/>
            {/* parent torso — pear-shaped silhouette */}
            <path d="M108 122
                     Q 95 124 92 142
                     Q 90 162 96 178
                     L 120 178
                     Q 126 162 124 142
                     Q 121 124 108 122 Z" fill="#FFB778"/>
            {/* parent head */}
            <circle cx="108" cy="110" r="13" fill="#FFD9B8"/>
            {/* parent hair / cap */}
            <path d="M96 109 Q 99 96 108 95 Q 117 96 120 109 Q 112 105 108 105 Q 104 105 96 109 Z" fill="#3A1D2E" opacity="0.8"/>
            {/* parent arm reaching down to kid */}
            <path d="M122 144 Q 130 156 134 168" stroke="#FFD9B8" strokeWidth="6" strokeLinecap="round" fill="none"/>

            {/* kid duo #1 — pink */}
            <ellipse cx="142" cy="187" rx="14" ry="2.5" fill="#3A1D2E" opacity="0.12"/>
            <path d="M142 152
                     Q 134 153 132 165
                     Q 131 176 135 184
                     L 149 184
                     Q 153 176 152 165
                     Q 150 153 142 152 Z" fill="#FF89AE"/>
            <circle cx="142" cy="143" r="9" fill="#FFD9B8"/>
            {/* kid arm reaching up */}
            <path d="M134 160 Q 132 156 132 152" stroke="#FFD9B8" strokeWidth="4.5" strokeLinecap="round" fill="none"/>

            {/* — PARENT + KID DUO #2 (right of centre, lavender + yellow), mirrored — */}
            <ellipse cx="194" cy="187" rx="22" ry="3.5" fill="#3A1D2E" opacity="0.12"/>
            <path d="M194 122
                     Q 181 124 178 142
                     Q 176 162 182 178
                     L 206 178
                     Q 212 162 210 142
                     Q 207 124 194 122 Z" fill="#C49BEC"/>
            <circle cx="194" cy="110" r="13" fill="#FFD9B8"/>
            <path d="M182 109 Q 185 95 194 94 Q 203 95 206 109 Q 200 100 194 100 Q 188 100 182 109 Z" fill="#3A1D2E" opacity="0.8"/>
            {/* arm reaching down toward the other duo */}
            <path d="M180 144 Q 172 156 168 168" stroke="#FFD9B8" strokeWidth="6" strokeLinecap="round" fill="none"/>

            {/* kid duo #2 — yellow */}
            <ellipse cx="160" cy="187" rx="14" ry="2.5" fill="#3A1D2E" opacity="0.12"/>
            <path d="M160 152
                     Q 152 153 150 165
                     Q 149 176 153 184
                     L 167 184
                     Q 171 176 170 165
                     Q 168 153 160 152 Z" fill="#FFD98A"/>
            <circle cx="160" cy="143" r="9" fill="#FFD9B8"/>
            <path d="M168 160 Q 170 156 170 152" stroke="#FFD9B8" strokeWidth="4.5" strokeLinecap="round" fill="none"/>

            {/* the two kids high-five / hand-touch in the middle */}
            <circle cx="151" cy="151" r="2.6" fill="#3A1D2E" opacity="0.45"/>

            {/* tiny grass tufts on the hill */}
            <g opacity="0.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
              <path d="M58 190 v-5"/>
              <path d="M78 191 v-4"/>
              <path d="M218 191 v-5"/>
              <path d="M236 190 v-4"/>
            </g>
          </svg>

          <SHead light size={42} style={{ textAlign:'center', marginTop:26 }}>
            The park is better<br/><span style={{ fontStyle:'italic' }}>with a friend.</span>
          </SHead>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={() => go('setup')} style={{ background:SB.accent, color:'#fff', border:'none',
            borderRadius:18, padding:'18px 0', fontFamily:SB.ui, fontSize:16, fontWeight:700, cursor:'pointer',
            boxShadow:`0 10px 28px ${SB.accentSh}` }}>Get started</button>
          <button style={{ background:'rgba(255,255,255,0.55)', color:SB.ink, border:`1px solid ${SB.cardB}`,
            borderRadius:18, padding:'15px 0', fontFamily:SB.ui, fontSize:14, fontWeight:600, cursor:'pointer',
            backdropFilter:'blur(8px)' }}>I already have an account</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SETUP — tell us about your buddy
// ─────────────────────────────────────────────────────
function SSetup({ ctx }) {
  const go = ctx.go;
  const [name, setName] = aS('Talia');
  const [age, setAge]   = aS(2);
  const [loves, setLoves] = aS(['sand','climb','dog']);
  const [musts, setMusts] = aS(['shade','fenced','toddler']);
  const [loc, setLoc]   = aS(true);
  const [con, setCon]   = aS(true);
  const LOVES = [['sand','Sand'],['climb','Climbing'],['swing','Swings'],['water','Water'],['art','Art'],['dog','Dogs'],['run','Running'],['music','Music']];
  const MUSTS = [['shade','Shade'],['fenced','Fenced'],['toddler','Toddler zone'],['restrooms','Restrooms'],['soft','Soft floor'],['cafe','Café nearby']];
  const tog = (list, set, id) => set(list.includes(id) ? list.filter(x=>x!==id) : [...list, id]);

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      {/* top nav */}
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 22px 12px' }}>
        <button onClick={() => go('welcome')} style={{ background:'none', border:'none', fontSize:22, color:SB.inkSoft, cursor:'pointer' }}>‹</button>
        <div style={{ display:'flex', gap:6 }}>
          <span style={{ width:26, height:4, borderRadius:99, background:'rgba(58,29,46,0.2)' }}/>
          <span style={{ width:26, height:4, borderRadius:99, background:SB.accent }}/>
        </div>
        <button onClick={() => go('home')} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:13, fontWeight:600, color:SB.inkSoft, cursor:'pointer' }}>Skip</button>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'0 22px 16px', minHeight:0 }}>
        <SHead size={36} style={{ marginBottom:6 }}>Tell us about<br/><span style={{ fontStyle:'italic', color:SB.accent }}>your buddy.</span></SHead>
        <p style={{ margin:'0 0 22px', fontFamily:SB.ui, fontSize:14, color:SB.inkSoft, lineHeight:1.5 }}>So we show parks that actually fit. About 30 seconds.</p>

        <SLabel style={{ marginBottom:10 }}>The kid</SLabel>
        <SFrost tone="card2" radius={22} style={{ padding:18, display:'flex', flexDirection:'column', gap:18 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:54, height:54, borderRadius:16, background:SB.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.serif, fontWeight:600, fontSize:28, color:SB.ink, flexShrink:0 }}>{(name[0]||'?').toUpperCase()}</div>
            <input value={name} onChange={e=>setName(e.target.value)} style={{ flex:1, border:'none', background:'none', outline:'none', fontFamily:SB.serif, fontWeight:600, fontSize:26, color:SB.ink, borderBottom:`1px dashed ${SB.line}`, padding:'2px 0' }}/>
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
              <SLabel>Age</SLabel><span style={{ fontFamily:SB.serif, fontWeight:600, fontSize:22, color:SB.ink }}>{age}y</span>
            </div>
            <input className="sb-range" type="range" min="1" max="5" step="0.5" value={age} onChange={e=>setAge(parseFloat(e.target.value))} style={{ width:'100%' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontFamily:SB.ui, fontSize:10.5, color:SB.inkFaint }}><span>1y</span><span>2y</span><span>3y</span><span>4y</span><span>5y</span></div>
          </div>
        </SFrost>

        <SLabel style={{ margin:'24px 0 4px' }}>What they love</SLabel>
        <p style={{ margin:'0 0 12px', fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft }}>We surface parks they'll click with.</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {LOVES.map(([id,l]) => <SPill key={id} active={loves.includes(id)} onClick={()=>tog(loves,setLoves,id)} tone="sel" size="sm">{l}</SPill>)}
        </div>

        <SLabel style={{ margin:'24px 0 4px' }}>Park must-haves</SLabel>
        <p style={{ margin:'0 0 12px', fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft }}>The things that decide if you turn around.</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {MUSTS.map(([id,l]) => <SPill key={id} active={musts.includes(id)} onClick={()=>tog(musts,setMusts,id)} tone="sel" size="sm">{l}</SPill>)}
        </div>

        <SLabel style={{ margin:'24px 0 10px' }}>Make it personal</SLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <SyncRow on={loc} onClick={()=>setLoc(!loc)} icon="◍" title="Use my location" sub="Parks within walking distance · only used live"/>
          <SyncRow on={con} onClick={()=>setCon(!con)} icon="◐" title="Sync contacts" sub="See parents already on My Buddy · nothing uploaded"/>
        </div>

        {/* CTA sits at the END of the form, after every question — must
            be scrolled to before it can be tapped. */}
        <button onClick={() => go('home')} style={{ width:'100%', marginTop:28, background:SB.accent, color:'#fff', border:'none',
          borderRadius:16, padding:'16px 0', fontFamily:SB.ui, fontSize:15, fontWeight:700, cursor:'pointer',
          boxShadow:`0 8px 22px ${SB.accentSh}` }}>Find our parks →</button>
        <p style={{ textAlign:'center', margin:'10px 0 0', fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>You can change any of this later.</p>
      </div>
      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}
function SyncRow({ on, onClick, icon, title, sub }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', width:'100%',
      background:SB.card2, border:`1px solid ${on ? SB.accent : SB.cardB}`, borderRadius:16, cursor:'pointer',
      textAlign:'left', backdropFilter:'blur(20px)' }}>
      <div style={{ width:38, height:38, borderRadius:12, background: on ? SB.accent : 'rgba(255,255,255,0.7)', color: on ? '#fff' : SB.accent,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:SB.ui, fontSize:14, fontWeight:700, color:SB.ink }}>{title}</div>
        <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:2, lineHeight:1.4 }}>{sub}</div>
      </div>
      <SToggle on={on}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// HOME — who's out now (hero ring)
// ─────────────────────────────────────────────────────
function SHome({ ctx }) {
  const { go, parks, friends } = ctx;
  const out = friends.filter(f => f.here);
  const vibes = [
    { name:'Guitar', pct:80, color:SB.peach, tag:'Busy now' },
    { name:'ABC', pct:30, color:SB.green, tag:'Quiet' },
    { name:'Community', pct:55, color:SB.lilac, tag:'3 buddies' },
  ];
  // group the friends-out by park so we can say "across N parks"
  const parksWithFriends = new Set(out.map(f => f.here));
  const outAvatars = out.slice(0, 6).map((f, i) => ({
    letter: f.avatar, color: sbAvatarColors[i % sbAvatarColors.length], name: f.parent.split(' ')[0],
  }));

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="warm" mode="fade" fade={440}/>
      <SBStatus light/>
      <SBTop light/>

      {/* date eyebrow */}
      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'12px 0 0' }}>
        <SLabel light style={{ letterSpacing:'0.14em' }}>Tue · 4:12 PM · Neve Zemer</SLabel>
      </div>

      {/* HERO — buddies out, presented as avatars instead of a ring */}
      <div style={{ position:'relative', zIndex:2, padding:'14px 22px 16px', textAlign:'center' }}>
        <SHead light size={32} style={{ lineHeight:1.1 }}>
          <span style={{ fontStyle:'italic', color:SB.accent }}>{out.length} buddies</span> are out<br/>
          right now.
        </SHead>

        {/* avatar row — actual people who are out */}
        <div style={{ display:'flex', justifyContent:'center', marginTop:14 }}>
          {outAvatars.map((a, i) => (
            <div key={i} style={{
              marginLeft: i ? -10 : 0,
              border: '3px solid rgba(255,255,255,0.85)',
              borderRadius: '50%',
            }}>
              <SAvatar letter={a.letter} color={a.color} size={42}/>
            </div>
          ))}
        </div>

        <div style={{ marginTop:10, fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft }}>
          {outAvatars.slice(0, 3).map(a => a.name).join(', ')} · across {parksWithFriends.size} {parksWithFriends.size === 1 ? 'park' : 'parks'}
        </div>

        <button onClick={() => go('map')} style={{ marginTop:14, background:SB.ink, color:'#fff', border:'none',
          padding:'10px 22px', borderRadius:999, fontFamily:SB.ui, fontSize:12, fontWeight:700,
          letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer' }}>See the map →</button>
      </div>

      {/* small stat pills */}
      <div style={{ position:'relative', zIndex:2, display:'flex', gap:8, padding:'0 22px 4px', justifyContent:'center' }}>
        <div style={{ flex:1, background:'rgba(255,255,255,0.55)', border:`1px solid ${SB.cardB}`, borderRadius:14,
          padding:'10px 14px', backdropFilter:'blur(12px)', textAlign:'center' }}>
          <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:22, color:SB.ink, lineHeight:1 }}>{parks.length}</div>
          <div style={{ fontFamily:SB.ui, fontSize:10.5, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:SB.inkSoft, marginTop:4 }}>Parks live</div>
        </div>
        <div style={{ flex:1, background:'rgba(255,255,255,0.55)', border:`1px solid ${SB.cardB}`, borderRadius:14,
          padding:'10px 14px', backdropFilter:'blur(12px)', textAlign:'center' }}>
          <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:22, color:SB.ink, lineHeight:1 }}>12</div>
          <div style={{ fontFamily:SB.ui, fontSize:10.5, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:SB.inkSoft, marginTop:4 }}>In circle</div>
        </div>
      </div>

      {/* scrolling content below the hero — vibes, then park match */}
      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'0 18px 16px', minHeight:0 }}>
        {/* three-up vibes */}
        <SFrost style={{ padding:'18px 20px' }}>
          <SLabel style={{ marginBottom:12 }}>Nearby right now</SLabel>
          <div style={{ display:'flex', gap:8 }}>
            {vibes.map(v => (
              <div key={v.name} style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:15, color:SB.ink }}>{v.name}</div>
                <div style={{ height:6, borderRadius:99, margin:'9px 4px 8px', background:'rgba(58,29,46,0.08)', overflow:'hidden' }}>
                  <div style={{ width:`${v.pct}%`, height:'100%', borderRadius:99, background:v.color }}/>
                </div>
                <div style={{ fontFamily:SB.ui, fontSize:11.5, fontWeight:600, color:SB.inkSoft }}>{v.tag}</div>
              </div>
            ))}
          </div>
        </SFrost>

        {/* park-match card — the moment, given more breathing room */}
        <SFrost style={{ marginTop:18, padding:'22px 22px 18px', textAlign:'center' }} onClick={() => go('park','gan-gitara')}>
          <SLabel style={{ marginBottom:10 }}>For Talia today</SLabel>
          <div style={{ width:64, height:64, borderRadius:'50%', background:SB.accent, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="32" height="32" viewBox="0 0 38 38"><circle cx="13" cy="15" r="2.4" fill="#fff"/><circle cx="25" cy="15" r="2.4" fill="#fff"/><path d="M12 23c2 3 12 3 14 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round"/></svg>
          </div>
          <SHead size={25}>Park match</SHead>
          <p style={{ margin:'6px 0 0', fontFamily:SB.ui, fontSize:13.5, color:SB.inkSoft, lineHeight:1.5 }}>Guitar Playground is calling - 3 buddies there now, shaded, and quiet until 5.</p>
          <div style={{ marginTop:14, paddingTop:12, borderTop:`1px solid ${SB.line}`, fontFamily:SB.ui, fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:SB.accent }}>See the park →</div>
        </SFrost>
      </div>

      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

Object.assign(window, { SWelcome, SSetup, SyncRow, SHome });

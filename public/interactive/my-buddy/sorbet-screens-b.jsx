// Sorbet — screens B: Map, Park, Plan
const { useState: bS } = React;

const sbCrowdAt = (park, hour) => (park.crowdByHour ? (park.crowdByHour[hour] ?? 1) : 1);

// ─────────────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────────────
function SMap({ ctx }) {
  const { go, parks, friends } = ctx;
  const hour = 16;
  const [filter, setFilter] = bS('all');
  const filters = [['all','All parks'],['friends','Buddies here'],['fenced','Fenced'],['shade','Shade'],['quiet','Quiet now']];
  const shown = parks.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'friends') return p.friendsHere.length > 0;
    if (filter === 'quiet') return sbCrowdAt(p, hour) <= 2;
    return p.amenities.includes(filter);
  });

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      {/* greeting */}
      <div style={{ position:'relative', zIndex:2, padding:'2px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <SLabel>Tue · 4:12 PM · Neve Zemer</SLabel>
            <SHead size={28} style={{ marginTop:4 }}>Hey Mira — <span style={{ fontStyle:'italic', color:SB.accent }}>5 buddies</span> out now.</SHead>
          </div>
          <SAvatar letter="M" color={SB.accent} size={42}/>
        </div>
        <div className="sb-scroll" style={{ display:'flex', gap:7, marginTop:14, overflowX:'auto', paddingBottom:4 }}>
          {filters.map(([id,l]) => <SPill key={id} active={filter===id} onClick={()=>setFilter(id)} size="sm">{l}</SPill>)}
        </div>
      </div>

      {/* map canvas */}
      <div style={{ position:'relative', zIndex:1, flex:1, margin:'14px 14px 0', borderRadius:28, overflow:'hidden', border:`1px solid ${SB.cardB}` }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <rect width="100" height="100" fill="#FBEBDF"/>
          <path d="M-5 14 Q 30 22 50 16 T 110 30" stroke="#A8D2E8" strokeWidth="7" fill="none" opacity="0.7"/>
          {parks.map(p => <ellipse key={p.id+'b'} cx={p.coords.x} cy={p.coords.y} rx="12" ry="9" fill="#BFE3C8" opacity="0.9"/>)}
          {['M0 32 L100 32','M0 60 L100 60','M30 0 L30 100','M68 0 L68 100'].map((d,i)=><path key={i} d={d} stroke="#F3D9C4" strokeWidth="2.4" fill="none"/>)}
          {[[12,82],[22,86],[84,20],[88,70],[16,68],[78,86]].map((t,i)=><circle key={i} cx={t[0]} cy={t[1]} r="1.6" fill="#FF89AE" opacity="0.5"/>)}
        </svg>
        {/* pins */}
        {shown.map(p => {
          const lvl = sbCrowdAt(p, hour);
          const here = p.friendsHere.map(id => friends.find(f=>f.id===id)).filter(Boolean)
            .map((f,i) => ({ letter:f.avatar, color: sbAvatarColors[i % sbAvatarColors.length] }));
          return (
            <button key={p.id} onClick={()=>go('park', p.id)} style={{ position:'absolute', left:`${p.coords.x}%`, top:`${p.coords.y}%`,
              transform:'translate(-50%,-50%)', background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {here.length > 0 && <div style={{ position:'absolute', left:'50%', top:'50%', width:48, height:48, transform:'translate(-50%,-50%)', borderRadius:'50%', border:`2px solid ${SB.accent}`, animation:'sbpulse 2.6s ease-out infinite' }}/>}
              <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 9px', borderRadius:18, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(10px)', boxShadow:'0 3px 10px rgba(120,60,90,0.14)' }}>
                <span style={{ width:9, height:9, borderRadius:'50%', background: sbCrowdColor(lvl) }}/>
                {here.length ? <SAvatarStack items={here} size={18}/> : <span style={{ fontFamily:SB.ui, fontSize:10, fontWeight:700, color:SB.inkSoft }}>{p.bestFor}</span>}
              </div>
              <div style={{ fontFamily:SB.ui, fontSize:10, fontWeight:700, color:SB.ink, marginTop:3, textShadow:'0 0 4px #fff,0 0 8px #fff', whiteSpace:'nowrap' }}>{p.name}</div>
            </button>
          );
        })}
        {/* time strip */}
        <SFrost style={{ position:'absolute', left:12, right:12, bottom:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontFamily:SB.ui, fontSize:11, fontWeight:700, color:SB.inkSoft }}>NOW · 16:00</span>
          <div style={{ flex:1, height:6, borderRadius:99, background:'rgba(58,29,46,0.1)', position:'relative' }}>
            <div style={{ position:'absolute', left:'66%', top:'50%', transform:'translate(-50%,-50%)', width:16, height:16, borderRadius:'50%', background:SB.accent, boxShadow:'0 1px 4px rgba(0,0,0,0.2)' }}/>
          </div>
          <span style={{ fontFamily:SB.ui, fontSize:12, fontWeight:700, color:SB.accent }}>+2h</span>
        </SFrost>
      </div>

      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PARK DETAIL
// ─────────────────────────────────────────────────────
function SPark({ ctx, parkId }) {
  const { go, parks, friends } = ctx;
  const park = parks.find(p => p.id === parkId) || parks[0];
  const hour = 16;
  const lvl = sbCrowdAt(park, hour);
  const here = park.friendsHere.map(id => friends.find(f=>f.id===id)).filter(Boolean)
    .map((f,i) => ({ letter:f.avatar, color: sbAvatarColors[i % sbAvatarColors.length], parent:f.parent, kid:f.kid, age:f.kidAge, since:f.since }));

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="coral" mode="fade" fade={272}/>
      <SBStatus light/>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', paddingBottom:14, minHeight:0 }}>
        {/* hero */}
        <div style={{ padding:'2px 22px 0', minHeight:230, display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <button onClick={()=>go('home')} style={{ width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,0.65)', border:`1px solid ${SB.cardB}`, color:SB.ink, fontSize:20, cursor:'pointer', backdropFilter:'blur(10px)' }}>‹</button>
            <button style={{ width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,0.65)', border:`1px solid ${SB.cardB}`, color:SB.ink, fontSize:16, cursor:'pointer', backdropFilter:'blur(10px)' }}>♡</button>
          </div>
          <div style={{ marginTop:'auto', paddingTop:34 }}>
            <SLabel light>{park.neighborhood} · {park.distance}</SLabel>
            <SHead light size={46} style={{ marginTop:8 }}>{park.name}</SHead>
          </div>
        </div>

        {/* stat row */}
        <div style={{ padding:'22px 18px 0', display:'flex', gap:8 }}>
          {[['Crowd', sbCrowdLabel(lvl)],['Clean', park.cleanliness],['Buddies', here.length]].map(([l,v]) => (
            <SFrost key={l} tone="card2" radius={20} style={{ flex:1, padding:'14px 10px', textAlign:'center' }}>
              <SLabel style={{ fontSize:10 }}>{l}</SLabel>
              <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:26, color:SB.ink, marginTop:6 }}>{v}</div>
            </SFrost>
          ))}
        </div>

        <p style={{ margin:'16px 22px 0', fontFamily:SB.ui, fontSize:14.5, color:SB.ink, opacity:0.82, lineHeight:1.5 }}>{park.blurb}</p>

        {/* crowd chart */}
        <div style={{ padding:'20px 18px 0' }}>
          <SLabel style={{ marginBottom:10, paddingLeft:4 }}>Crowd through the day</SLabel>
          <SFrost tone="card2" radius={20} style={{ padding:'16px 14px 12px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:60 }}>
              {(park.crowdByHour||[]).map((v,i) => {
                const now = i === hour;
                return <div key={i} style={{ flex:1, height:`${(v/4)*100}%`, minHeight:3, borderRadius:3,
                  background: now ? SB.accent : sbCrowdColor(v), opacity: now ? 1 : 0.85, position:'relative' }}>
                  {now && <span style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontFamily:SB.ui, fontSize:9, fontWeight:800, color:SB.accent }}>NOW</span>}
                </div>;
              })}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontFamily:SB.ui, fontSize:10, color:SB.inkFaint }}><span>6a</span><span>12p</span><span>6p</span><span>10p</span></div>
          </SFrost>
        </div>

        {/* buddies */}
        <div style={{ padding:'20px 18px 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10, padding:'0 4px' }}>
            <SLabel>Buddies here · {here.length}</SLabel>
            {here.length > 0 && <span style={{ fontFamily:SB.ui, fontSize:11.5, fontWeight:700, color:SB.accent }}>Wave →</span>}
          </div>
          {here.length ? here.map((f,i) => (
            <SFrost key={i} tone="card2" radius={18} style={{ padding:'10px 12px', display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
              <SAvatar letter={f.letter} color={f.color} size={40}/>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SB.ui, fontSize:14, fontWeight:700, color:SB.ink }}>{f.parent} <span style={{ fontWeight:500, color:SB.inkSoft }}>· {f.kid}, {f.age}y</span></div>
                <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:1 }}>Beacon on · {f.since} ago</div>
              </div>
              <SPill tone="sel" size="sm" active>Say hi</SPill>
            </SFrost>
          )) : <SFrost tone="card2" radius={16} style={{ padding:14, fontFamily:SB.ui, fontSize:13, color:SB.inkSoft }}>No buddies here yet. Drop a beacon and your circle will know.</SFrost>}
        </div>
      </div>

      {/* sticky CTA — sits above the tab bar */}
      <div style={{ position:'relative', zIndex:3, padding:'12px 16px 12px',
        background:'rgba(255,255,255,0.9)', backdropFilter:'blur(24px)', borderTop:`1px solid ${SB.cardB}`, display:'flex', gap:8, flexShrink:0 }}>
        <button onClick={()=>go('plan', park.id)} style={{ flex:0.55, background:'rgba(255,255,255,0.7)', color:SB.ink, border:`1px solid ${SB.cardB}`, borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:13.5, fontWeight:700, cursor:'pointer' }}>Plan playdate</button>
        <button style={{ flex:1, background:SB.accent, color:'#fff', border:'none', borderRadius:14, padding:'15px 0', fontFamily:SB.ui, fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:`0 8px 22px ${SB.accentSh}` }}>I'm coming</button>
      </div>
      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PLAN — compose a playdate
// ─────────────────────────────────────────────────────
function SPlan({ ctx, parkId }) {
  const { go, parks, friends } = ctx;
  const [pid, setPid] = bS(parkId || parks[0].id);
  const [time, setTime] = bS('16:00');
  const [vibe, setVibe] = bS('open');
  const [inv, setInv] = bS(['noa','tom']);
  const park = parks.find(p => p.id === pid) || parks[0];
  const tog = id => setInv(v => v.includes(id) ? v.filter(x=>x!==id) : [...v, id]);

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 22px 10px' }}>
        <button onClick={()=>go('home')} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:600, color:SB.inkSoft, cursor:'pointer' }}>Cancel</button>
        <SLabel>Plan a playdate</SLabel>
        <button onClick={()=>go('planDone', pid)} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:800, color:SB.accent, cursor:'pointer' }}>Send</button>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'4px 20px 16px', minHeight:0 }}>
        {/* sentence card */}
        <SFrost tone="card2" radius={22} style={{ padding:'22px 20px' }}>
          <SLabel>The plan</SLabel>
          <div style={{ marginTop:8, fontFamily:SB.serif, fontWeight:500, fontSize:25, lineHeight:1.25, color:SB.ink }}>
            I'm heading to <span style={{ fontStyle:'italic', color:SB.accent, borderBottom:`2px dashed ${SB.accent}` }}>{park.name}</span> at <span style={{ fontStyle:'italic', color:SB.accent, borderBottom:`2px dashed ${SB.accent}` }}>{time}</span>. <span style={{ color:SB.inkSoft }}>Anyone joining?</span>
          </div>
        </SFrost>

        <SLabel style={{ margin:'20px 0 8px' }}>Park</SLabel>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {parks.map(p => <SPill key={p.id} active={p.id===pid} onClick={()=>setPid(p.id)} size="sm">{p.name}</SPill>)}
        </div>

        <SLabel style={{ margin:'20px 0 8px' }}>Time</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {['09:30','10:30','11:30','15:30','16:00','16:30','17:00','17:30'].map(t => (
            <button key={t} onClick={()=>setTime(t)} style={{ padding:'11px 0', borderRadius:12, fontFamily:SB.ui, fontSize:13, fontWeight:700,
              border:`1px solid ${time===t ? SB.accent : SB.cardB}`, background: time===t ? 'rgba(255,92,122,0.12)' : 'rgba(255,255,255,0.5)', color: time===t ? SB.accentD : SB.ink, cursor:'pointer', backdropFilter:'blur(8px)' }}>{t}</button>
          ))}
        </div>

        <SLabel style={{ margin:'20px 0 8px' }}>Who can see it</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
          {[['circle','My circle','12 parents'],['open','+ Nearby','~40'],['invite','Invitees','private']].map(([id,l,s]) => (
            <button key={id} onClick={()=>setVibe(id)} style={{ padding:'12px 8px', borderRadius:14, textAlign:'left',
              border:`1px solid ${vibe===id ? SB.accent : SB.cardB}`, background: vibe===id ? 'rgba(255,92,122,0.12)' : 'rgba(255,255,255,0.5)', cursor:'pointer', backdropFilter:'blur(8px)' }}>
              <div style={{ fontFamily:SB.ui, fontSize:12.5, fontWeight:700, color:SB.ink }}>{l}</div>
              <div style={{ fontFamily:SB.ui, fontSize:10.5, color:SB.inkSoft, marginTop:2 }}>{s}</div>
            </button>
          ))}
        </div>

        <SLabel style={{ margin:'20px 0 8px' }}>Invite specifically</SLabel>
        <SFrost tone="card2" radius={16} style={{ overflow:'hidden' }}>
          {friends.map((f,i) => (
            <div key={f.id} onClick={()=>tog(f.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', cursor:'pointer', borderTop: i ? `1px solid ${SB.line}` : 'none' }}>
              <SAvatar letter={f.avatar} color={sbAvatarColors[i % sbAvatarColors.length]} size={34}/>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SB.ui, fontSize:14, fontWeight:700, color:SB.ink }}>{f.parent}</div>
                <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft }}>{f.kid}, {f.kidAge}y</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:7, background: inv.includes(f.id) ? SB.accent : 'transparent', border:`1.5px solid ${inv.includes(f.id) ? SB.accent : SB.line}`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800 }}>{inv.includes(f.id) ? '✓' : ''}</div>
            </div>
          ))}
        </SFrost>
        <p style={{ marginTop:14, fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, lineHeight:1.5 }}>A beacon turns on when you arrive. Take it down anytime.</p>
      </div>
      <SBTabBar active="plan" onNav={(id)=>go(id)}/>
    </div>
  );
}

Object.assign(window, { SMap, SPark, SPlan, sbCrowdAt });

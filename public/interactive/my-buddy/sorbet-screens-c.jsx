// Sorbet — screens C: Buddy, Inbox, Me, Report
const { useState: cS } = React;

// ─────────────────────────────────────────────────────
// BUDDY — find a buddy
// ─────────────────────────────────────────────────────
function SBuddy({ ctx }) {
  const { go, buddies, friends } = ctx;
  const [tab, setTab] = cS('discover');
  const [waved, setWaved] = cS([]);
  const wave = id => setWaved(w => w.includes(id) ? w : [...w, id]);

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg kind="warm" mode="fade" fade={232}/>
      <SBStatus light/>
      <div style={{ position:'relative', zIndex:2, padding:'2px 22px 0' }}>
        <SHead light size={30}>Buddies for <span style={{ fontStyle:'italic' }}>Talia</span></SHead>
        <p style={{ margin:'6px 0 0', fontFamily:SB.ui, fontSize:13, color:SB.inkSoft, lineHeight:1.5 }}>Parents nearby with kids around 2y. Tap to wave — they see your invite, not your location.</p>
        <div style={{ display:'flex', gap:8, marginTop:16 }}>
          {[['discover','Discover · 3'],['circle','Circle · 12'],['requests','Requests · 1']].map(([id,l]) => (
            <button key={id} onClick={()=>setTab(id)} style={{ background:'none', border:'none', cursor:'pointer', padding:'0 0 8px',
              fontFamily:SB.ui, fontSize:12.5, fontWeight:700, color: tab===id ? SB.ink : SB.inkFaint,
              borderBottom: tab===id ? `2px solid ${SB.ink}` : '2px solid transparent' }}>{l}</button>
          ))}
        </div>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'16px 18px 24px' }}>
        {tab === 'discover' && <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {buddies.map((b,i) => (
            <SFrost key={b.id} radius={20} style={{ padding:16 }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <SAvatar letter={b.parent[0]} color={sbAvatarColors[i % sbAvatarColors.length]} size={48}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:SB.ui, fontSize:15, fontWeight:700, color:SB.ink }}>{b.parent} <span style={{ fontWeight:500, color:SB.inkSoft }}>· {b.kid}, {b.kidAge}y</span></div>
                  <div style={{ fontFamily:SB.ui, fontSize:12, color:SB.inkSoft, marginTop:2 }}>{b.neighborhood} · {b.mutual} mutual</div>
                </div>
              </div>
              <div style={{ marginTop:12, padding:'10px 12px', background:'rgba(255,255,255,0.6)', borderRadius:12, fontFamily:SB.ui, fontSize:13, color:SB.ink, lineHeight:1.5 }}>
                <span style={{ fontWeight:700, color:SB.accent }}>Plan: </span>{b.plan}
              </div>
              <div style={{ display:'flex', gap:8, marginTop:12 }}>
                <button style={{ flex:1, background:'rgba(255,255,255,0.6)', color:SB.ink, border:`1px solid ${SB.cardB}`, borderRadius:12, padding:'11px 0', fontFamily:SB.ui, fontSize:12.5, fontWeight:700, cursor:'pointer' }}>View profile</button>
                <button onClick={()=>wave(b.id)} style={{ flex:1.4, border:'none', borderRadius:12, padding:'11px 0', fontFamily:SB.ui, fontSize:12.5, fontWeight:700, cursor:'pointer',
                  background: waved.includes(b.id) ? '#FFD984' : '#FABF3D', color:SB.ink, transition:'background .15s' }}>{waved.includes(b.id) ? 'Waved ✓' : 'Wave & join'}</button>
              </div>
            </SFrost>
          ))}
          <SFrost tone="card2" radius={16} style={{ padding:'12px 14px' }}>
            <SLabel style={{ color:SB.accent }}>Why these</SLabel>
            <p style={{ margin:'6px 0 0', fontFamily:SB.ui, fontSize:12.5, color:SB.ink, lineHeight:1.5 }}>We match by age window (±6mo) and the parks Talia already loves. Nothing else is shared yet.</p>
          </SFrost>
        </div>}

        {tab === 'circle' && <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {friends.map((f,i) => (
            <SFrost key={f.id} tone="card2" radius={16} style={{ padding:'12px 14px', display:'flex', alignItems:'center', gap:12 }}>
              <SAvatar letter={f.avatar} color={sbAvatarColors[i % sbAvatarColors.length]} size={40}/>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SB.ui, fontSize:14, fontWeight:700, color:SB.ink }}>{f.parent}</div>
                <div style={{ fontFamily:SB.ui, fontSize:12, color:SB.inkSoft, marginTop:1 }}>{f.kid}, {f.kidAge}y · {f.here ? 'beacon on' : 'offline'}</div>
              </div>
              {f.here && <SPill tone="sel" size="sm" active>Here</SPill>}
            </SFrost>
          ))}
        </div>}

        {tab === 'requests' && <SFrost radius={20} style={{ padding:16 }}>
          <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
            <SAvatar letter="K" color={SB.lilac} size={44}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:SB.ui, fontSize:14.5, fontWeight:700, color:SB.ink }}>Karin (Kfir's mom, 2.5y)</div>
              <div style={{ fontFamily:SB.ui, fontSize:12, color:SB.inkSoft, marginTop:2 }}>2 mutual · met at HaYarkon last week</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            <button style={{ flex:1, background:'rgba(255,255,255,0.6)', color:SB.ink, border:`1px solid ${SB.cardB}`, borderRadius:12, padding:'11px 0', fontFamily:SB.ui, fontSize:12.5, fontWeight:700, cursor:'pointer' }}>Decline</button>
            <button style={{ flex:1.4, background:SB.accent, color:'#fff', border:'none', borderRadius:12, padding:'11px 0', fontFamily:SB.ui, fontSize:12.5, fontWeight:700, cursor:'pointer' }}>Accept</button>
          </div>
        </SFrost>}
      </div>

      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// INBOX
// ─────────────────────────────────────────────────────
function SInbox({ ctx }) {
  const { go, threads } = ctx;
  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, padding:'2px 22px 4px', display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
        <SHead size={32}>Inbox</SHead>
        <span style={{ fontFamily:SB.ui, fontSize:12.5, fontWeight:700, color:SB.accent }}>+ New</span>
      </div>
      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'12px 18px 24px', display:'flex', flexDirection:'column', gap:10 }}>
        {threads.map((t,i) => (
          <SFrost key={t.id} tone="card2" radius={18} style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:13, cursor:'pointer' }} onClick={()=>go('thread', t.id)}>
            <div style={{ width:46, height:46, borderRadius:'50%', background: t.group ? SB.lilac : sbAvatarColors[i % sbAvatarColors.length], color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.ui, fontWeight:700, fontSize:15, flexShrink:0 }}>{t.group ? `+${t.count}` : t.with[0]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8 }}>
                <span style={{ fontFamily:SB.ui, fontSize:14.5, fontWeight:700, color:SB.ink, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.with}</span>
                <span style={{ fontFamily:SB.ui, fontSize:11, color:SB.inkFaint, flexShrink:0 }}>{t.time}</span>
              </div>
              <div style={{ fontFamily:SB.ui, fontSize:13, color: t.unread ? SB.ink : SB.inkSoft, fontWeight: t.unread ? 700 : 400, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.last}</div>
            </div>
            {t.unread && <span style={{ width:9, height:9, borderRadius:'50%', background:SB.accent, flexShrink:0 }}/>}
          </SFrost>
        ))}
      </div>
      <SBTabBar active="inbox" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// THREAD — message conversation
// ─────────────────────────────────────────────────────
function SThread({ ctx, threadId }) {
  const { go, threads } = ctx;
  const t = threads.find(x => x.id === threadId) || threads[0];
  const idx = threads.indexOf(t);
  const headColor = t.group ? SB.lilac : sbAvatarColors[idx % sbAvatarColors.length];
  const [draft, setDraft] = cS('');

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>

      {/* header */}
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:12, padding:'2px 18px 10px', borderBottom:`1px solid ${SB.line}` }}>
        <button onClick={()=>go('inbox')} style={{ background:'none', border:'none', fontSize:22, color:SB.inkSoft, cursor:'pointer', padding:0 }}>‹</button>
        <div style={{ width:38, height:38, borderRadius:'50%', background: headColor, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.ui, fontWeight:700, fontSize:14 }}>{t.group ? `+${t.count}` : t.with[0]}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:SB.ui, fontSize:14.5, fontWeight:700, color:SB.ink }}>{t.with}</div>
          <div style={{ fontFamily:SB.ui, fontSize:11, color:SB.inkSoft, marginTop:1 }}>{t.group ? `${t.count} parents · last active ${t.time}` : `Last seen ${t.time}`}</div>
        </div>
        <button style={{ background:'none', border:'none', cursor:'pointer', padding:6 }} aria-label="More">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={SB.inkSoft}><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>
        </button>
      </div>

      {/* messages */}
      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'14px 16px 12px', display:'flex', flexDirection:'column', gap:8, minHeight:0 }}>
        {(t.messages || []).map((m, i) => {
          const mine = m.from === 'me';
          const showLabel = t.group && !mine && (i === 0 || (t.messages[i-1].who !== m.who) || (t.messages[i-1].from === 'me'));
          return (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
              {showLabel && <div style={{ fontFamily:SB.ui, fontSize:10.5, fontWeight:700, letterSpacing:'0.06em', color:SB.inkSoft, marginLeft:10, marginBottom:3 }}>{m.who}</div>}
              <div style={{ maxWidth:'78%', padding:'10px 14px', borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: mine ? SB.accent : 'rgba(255,255,255,0.85)', color: mine ? '#fff' : SB.ink,
                border: mine ? 'none' : `1px solid ${SB.cardB}`,
                fontFamily:SB.ui, fontSize:14, lineHeight:1.4, boxShadow: mine ? `0 4px 14px ${SB.accentSh}` : '0 1px 3px rgba(120,60,90,0.05)' }}>
                {m.text}
              </div>
              <div style={{ fontFamily:SB.ui, fontSize:10, color:SB.inkFaint, margin: mine ? '4px 4px 0 0' : '4px 0 0 4px' }}>{m.time}</div>
            </div>
          );
        })}
      </div>

      {/* composer */}
      <div style={{ position:'relative', zIndex:3, padding:'10px 14px 12px', display:'flex', alignItems:'center', gap:8,
        background:'rgba(255,255,255,0.9)', backdropFilter:'blur(24px)', borderTop:`1px solid ${SB.cardB}`, flexShrink:0 }}>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(58,29,46,0.06)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }} aria-label="Add">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SB.inkSoft} strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Message…"
          style={{ flex:1, padding:'11px 16px', borderRadius:999, border:`1px solid ${SB.line}`, background:'#fff',
            fontFamily:SB.ui, fontSize:14, color:SB.ink, outline:'none' }}/>
        <button style={{ width:38, height:38, borderRadius:'50%', background: draft ? SB.accent : 'rgba(58,29,46,0.1)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background .15s' }} aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={draft ? '#fff' : SB.inkFaint}><path d="M2 12l20-9-9 20-2.5-8.5L2 12z"/></svg>
        </button>
      </div>

      <SBTabBar active="inbox" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ME
// ─────────────────────────────────────────────────────
function SMe({ ctx }) {
  const { go, me } = ctx;
  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', paddingBottom:24 }}>
        <div style={{ padding:'4px 22px 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <SAvatar letter={me.avatar} color={SB.accent} size={58}/>
            <div>
              <SHead size={26}>{me.parent}</SHead>
              <div style={{ fontFamily:SB.ui, fontSize:12.5, color:SB.inkSoft, marginTop:2 }}>{me.neighborhood} · circle of {me.circle}</div>
            </div>
          </div>
          <SFrost tone="card2" radius={18} style={{ marginTop:18, display:'flex', overflow:'hidden' }}>
            {[[me.visitsThisMonth,'Visits','this month'],[me.circle,'In circle',''],['6','Reports','added']].map(([n,l,s],i) => (
              <div key={l} style={{ flex:1, padding:'14px 12px', borderLeft: i ? `1px solid ${SB.line}` : 'none' }}>
                <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:26, color:SB.ink, lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:SB.ui, fontSize:11, color:SB.inkSoft, marginTop:6, lineHeight:1.3 }}>{l}{s && <><br/>{s}</>}</div>
              </div>
            ))}
          </SFrost>
        </div>

        <div style={{ padding:'18px 22px 0' }}>
          <SFrost radius={20} style={{ padding:16, display:'flex', gap:14, alignItems:'flex-start' }}>
            <div style={{ width:48, height:48, borderRadius:14, background:SB.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.serif, fontWeight:600, fontSize:24, color:SB.ink, flexShrink:0 }}>{me.kid.name[0]}</div>
            <div style={{ flex:1 }}>
              <SLabel>Buddy profile</SLabel>
              <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:20, color:SB.ink, marginTop:2 }}>{me.kid.name} · {me.kid.ageLabel}</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:10 }}>
                {me.kid.loves.map(t => <span key={t} style={{ fontFamily:SB.ui, fontSize:11, fontWeight:600, padding:'4px 9px', borderRadius:999, background:'rgba(255,255,255,0.6)', color:SB.ink }}>loves {t}</span>)}
              </div>
            </div>
          </SFrost>
        </div>

        <div style={{ padding:'20px 22px 0' }}>
          <SLabel style={{ marginBottom:10 }}>Privacy</SLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[['Who can see my beacon','My circle of 12',true],['Auto-beacon at parks','Off · ask each time',false],['Show Talia\u2019s age','Year only · 2y',true]].map(([t,v,on]) => (
              <SFrost key={t} tone="card2" radius={14} style={{ padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SB.ui, fontSize:13.5, fontWeight:700, color:SB.ink }}>{t}</div>
                  <div style={{ fontFamily:SB.ui, fontSize:11.5, color:SB.inkSoft, marginTop:1 }}>{v}</div>
                </div>
                <SToggle on={on}/>
              </SFrost>
            ))}
          </div>
        </div>
      </div>
      <SBTabBar active="me" onNav={(id)=>go(id)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// REPORT — add a community report
// ─────────────────────────────────────────────────────
function SReport({ ctx, parkId }) {
  const { go, parks } = ctx;
  const park = parks.find(p => p.id === parkId) || parks[0];
  const [kind, setKind] = cS('mess');
  const [sev, setSev] = cS(1);
  const text = 'Trash overflowing near the south bench';
  const kinds = [['mess','Cleanliness','trash · spills'],['fix','Maintenance','broken · loose'],['note','Heads-up','good vibes']];

  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <SBg mode="plain"/>
      <SBStatus/>
      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 22px 12px' }}>
        <button onClick={()=>go('park', park.id)} style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:600, color:SB.inkSoft, cursor:'pointer' }}>Cancel</button>
        <SLabel>Add a report</SLabel>
        <button style={{ background:'none', border:'none', fontFamily:SB.ui, fontSize:14, fontWeight:800, color:SB.accent, cursor:'pointer' }}>Post</button>
      </div>

      <div className="sb-scroll" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'4px 20px 16px', minHeight:0 }}>
        <SFrost tone="card2" radius={16} style={{ padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontFamily:SB.ui, fontSize:13, color:SB.inkSoft }}>Reporting at <span style={{ fontWeight:700, color:SB.ink }}>{park.name}</span></span>
          <span style={{ fontFamily:SB.ui, fontSize:12, fontWeight:700, color:SB.accent }}>Change</span>
        </SFrost>

        <SLabel style={{ margin:'18px 0 8px' }}>What happened</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
          {kinds.map(([id,l,s]) => (
            <button key={id} onClick={()=>setKind(id)} style={{ padding:'12px 8px', borderRadius:14, textAlign:'left', cursor:'pointer',
              border:`1px solid ${kind===id ? SB.accent : SB.cardB}`, background: kind===id ? 'rgba(255,92,122,0.12)' : 'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)' }}>
              <div style={{ fontFamily:SB.ui, fontSize:12.5, fontWeight:700, color:SB.ink }}>{l}</div>
              <div style={{ fontFamily:SB.ui, fontSize:10.5, color:SB.inkSoft, marginTop:2 }}>{s}</div>
            </button>
          ))}
        </div>

        <SLabel style={{ margin:'18px 0 8px' }}>One sentence</SLabel>
        <SFrost tone="card2" radius={16} style={{ padding:'14px 16px', minHeight:88 }}>
          <span style={{ fontFamily:SB.serif, fontWeight:500, fontSize:18, color:SB.ink, lineHeight:1.4 }}>{text}<span style={{ color:SB.accent, animation:'sbblink 1s infinite' }}>|</span></span>
        </SFrost>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontFamily:SB.ui, fontSize:11, color:SB.inkSoft }}><span>Keep it under 140</span><span>{text.length}/140</span></div>

        <SLabel style={{ margin:'18px 0 8px' }}>Severity</SLabel>
        <div style={{ display:'flex', gap:6 }}>
          {['Just FYI','Worth knowing','Avoid'].map((s,i) => <SPill key={s} active={sev===i} onClick={()=>setSev(i)} tone="sel">{s}</SPill>)}
        </div>
      </div>
      <SBTabBar active="home" onNav={(id)=>go(id)}/>
    </div>
  );
}

Object.assign(window, { SBuddy, SInbox, SThread, SMe, SReport });

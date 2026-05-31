// My Buddy — secondary screens
// Plan, Buddies, Inbox, Me

const { useState: mbS2 } = React;

// ─────────────────────────────────────────────────────────────
// PLAN — create a playdate (compose) — also serves as the "Plan" tab
// ─────────────────────────────────────────────────────────────
function MBPlan({ ctx, prefilledPark }) {
  const { p, go, parks, friends } = ctx;
  const [parkId, setParkId] = mbS2(prefilledPark || parks[0].id);
  const [time, setTime] = mbS2('16:00');
  const [vibe, setVibe] = mbS2('open');
  const [invited, setInvited] = mbS2(['noa','tom']);

  const park = parks.find(x => x.id === parkId);
  const inviteable = friends; // include all
  const toggleInv = (id) => setInvited(inv => inv.includes(id) ? inv.filter(x => x !== id) : [...inv, id]);

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      {/* Header */}
      <div style={{ padding:'4px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={() => go('map')} style={{ background:'transparent', border:'none', fontSize:14, fontWeight:600, color:p.muted, cursor:'pointer', padding:0 }}>Cancel</button>
        <div style={{ fontSize:13, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>Plan a playdate</div>
        <button style={{ background:'transparent', border:'none', fontSize:14, fontWeight:700, color:p.primary, cursor:'pointer', padding:0 }}>Send</button>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'4px 20px 20px' }}>
        {/* Big "I'm heading to" */}
        <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:'20px 18px' }}>
          <div style={{ fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em' }}>The plan</div>
          <div style={{ marginTop:8, fontFamily:"'P22 Mackinac', Georgia, serif", fontSize:22, fontWeight:500, lineHeight:1.25, color:p.inkD, letterSpacing:'-0.02em' }}>
            I am heading to <span style={{ color:p.headline || p.primary, borderBottom:`2px dashed ${p.headline || p.primary}` }}>{park.name}</span> at <span style={{ color:p.headline || p.primary, borderBottom:`2px dashed ${p.headline || p.primary}` }}>{time}</span>. <span style={{ color:p.muted }}>Anyone joining?</span>
          </div>
        </div>

        {/* Park selector — chips */}
        <div style={{ marginTop:18, fontSize:11, color:p.muted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'"Geist Mono", monospace' }}>Park</div>
        <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }}>
          {parks.map(pk => (
            <MBPill key={pk.id} active={pk.id === parkId} onClick={() => setParkId(pk.id)} p={p} size="sm">{pk.name}</MBPill>
          ))}
        </div>

        {/* Time grid */}
        <div style={{ marginTop:18, fontSize:11, color:p.muted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'"Geist Mono", monospace' }}>Time</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6, marginTop:8 }}>
          {['09:30','10:30','11:30','15:30','16:00','16:30','17:00','17:30'].map(t => (
            <button key={t} onClick={() => setTime(t)} style={{
              padding:'10px 0', borderRadius:10, fontSize:13, fontWeight:600,
              border:`1px solid ${time === t ? (p.sel || p.primary) : p.border}`,
              background: time === t ? (p.selSoft || p.primarySoft) : p.surface,
              color: time === t ? p.inkD : p.ink, cursor:'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Visibility */}
        <div style={{ marginTop:18, fontSize:11, color:p.muted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'"Geist Mono", monospace' }}>Visibility</div>
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginTop:8,
        }}>
          {[
            { id:'circle', label:'My circle', sub:'12 parents' },
            { id:'open',   label:'Circle + nearby', sub:'~40 parents' },
            { id:'invite', label:'Just invitees', sub:'private' },
          ].map(opt => (
            <button key={opt.id} onClick={() => setVibe(opt.id)} style={{
              padding:'12px 8px', borderRadius:12, textAlign:'left',
              border:`1px solid ${vibe === opt.id ? (p.sel || p.primary) : p.border}`,
              background: vibe === opt.id ? (p.selSoft || p.primarySoft) : p.surface,
              cursor:'pointer',
            }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{opt.label}</div>
              <div style={{ fontSize:10.5, color:p.muted, marginTop:2 }}>{opt.sub}</div>
            </button>
          ))}
        </div>

        {/* Invite list */}
        <div style={{ marginTop:18, fontSize:11, color:p.muted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'"Geist Mono", monospace' }}>Invite specifically</div>
        <div style={{ marginTop:8, background:p.surface, borderRadius:14, border:`1px solid ${p.border}`, overflow:'hidden' }}>
          {inviteable.map((f, i) => (
            <div key={f.id} style={{
              display:'flex', alignItems:'center', gap:12, padding:'10px 14px',
              borderTop: i === 0 ? 'none' : `1px solid ${p.border}`,
            }} onClick={() => toggleInv(f.id)}>
              <MBAvatar letter={f.avatar} color={f.color} size={32}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, color:p.inkD, fontWeight:600, letterSpacing:'-0.01em' }}>{f.parent}</div>
                <div style={{ fontSize:11.5, color:p.muted }}>{f.kid}, {f.kidAge}y · {f.here ? `at ${parks.find(pk=>pk.id===f.here)?.name || 'park'}` : 'home'}</div>
              </div>
              <div style={{
                width:22, height:22, borderRadius:6,
                background: invited.includes(f.id) ? (p.sel || p.primary) : 'transparent',
                border: `1.5px solid ${invited.includes(f.id) ? (p.sel || p.primary) : p.border}`,
                color:p.inkD, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700,
              }}>{invited.includes(f.id) ? '✓' : ''}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop:14, fontSize:11.5, color:p.muted, lineHeight:1.5 }}>
          A beacon will turn on when you arrive. You can take it down anytime.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BUDDIES — find new friends nearby (kids same age)
// ─────────────────────────────────────────────────────────────
function MBBuddy({ ctx }) {
  const { p, go, buddies, friends, me } = ctx;
  const [tab, setTab] = mbS2('discover');
  const [waved, setWaved] = mbS2([]); // ids of buddies the user has waved at
  const toggleWave = (id) => setWaved(w => w.includes(id) ? w : [...w, id]);

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      <div style={{ padding:'4px 20px 0' }}>
        <h1 style={{ margin:'4px 0 4px', fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:26, letterSpacing:'-0.02em', color:p.inkD }}>
          Buddies for Talia
        </h1>
        <div style={{ fontSize:13, color:p.muted, lineHeight:1.5 }}>
          Parents nearby with kids around 2y. Tap to wave — they'll see your invite, not your location.
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, marginTop:18, borderBottom:`1px solid ${p.border}` }}>
          {[
            { id:'discover', label:'Discover · 3 new' },
            { id:'circle',   label:'My circle · 12' },
            { id:'requests', label:'Requests · 1' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:'10px 14px 12px', background:'transparent', border:'none',
              fontSize:12.5, fontWeight:600, cursor:'pointer',
              color: tab === t.id ? p.inkD : p.muted,
              borderBottom: tab === t.id ? `2px solid ${p.primary}` : '2px solid transparent',
              marginBottom:-1,
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'14px 20px 20px' }}>
        {tab === 'discover' && (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {buddies.map(b => (
              <div key={b.id} style={{
                background:p.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:'16px',
              }}>
                <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <MBAvatar letter={b.parent[0]} color={b.color} size={48}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>
                      {b.parent} <span style={{ color:p.muted, fontWeight:500 }}>· {b.kid}, {b.kidAge}y</span>
                    </div>
                    <div style={{ fontSize:12, color:p.muted, marginTop:2 }}>
                      {b.neighborhood} · {b.mutual} mutual {b.mutual === 1 ? 'friend' : 'friends'}
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop:12, padding:'10px 12px', background:p.soft, borderRadius:12,
                  fontSize:13, color:p.ink, lineHeight:1.5,
                }}>
                  <span style={{ fontWeight:600, color:p.primary }}>Plan: </span>
                  {b.plan}
                </div>
                <div style={{ display:'flex', gap:8, marginTop:12 }}>
                  <button style={{
                    flex:1, background:p.surface, color:p.ink, border:`1px solid ${p.border}`,
                    borderRadius:10, padding:'10px 0', fontSize:12.5, fontWeight:600, cursor:'pointer',
                  }}>View profile</button>
                  <button onClick={() => toggleWave(b.id)} style={{
                    flex:1.4,
                    background: waved.includes(b.id) ? '#FFD984' : '#FABF3D',
                    color: p.inkD, border:'none',
                    borderRadius:10, padding:'10px 0', fontSize:12.5, fontWeight:600, cursor:'pointer',
                    transition:'background 150ms ease',
                  }}>{waved.includes(b.id) ? 'Waved ✓' : 'Wave & join'}</button>
                </div>
              </div>
            ))}

            {/* age-match heuristic strip */}
            <div style={{
              background:p.accentSoft, borderRadius:14, padding:'12px 14px',
              fontSize:12.5, color:p.inkD, lineHeight:1.5,
            }}>
              <span style={{ fontFamily:'"Geist Mono", monospace', fontWeight:700, color:p.primaryD, fontSize:11, letterSpacing:'0.04em' }}>
                WHY THESE
              </span><br/>
              We match by age window (±6mo) and the parks Talia already loves. Nothing else is shared with them yet.
            </div>
          </div>
        )}

        {tab === 'circle' && (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {friends.map(f => (
              <div key={f.id} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                background:p.surface, border:`1px solid ${p.border}`, borderRadius:14,
              }}>
                <MBAvatar letter={f.avatar} color={f.color} size={40}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{f.parent}</div>
                  <div style={{ fontSize:12, color:p.muted, marginTop:1 }}>{f.kid}, {f.kidAge}y · {f.here ? 'beacon on' : 'offline'}</div>
                </div>
                {f.here && (
                  <span style={{
                    fontSize:10.5, fontWeight:700, padding:'4px 8px', borderRadius:999,
                    background:p.primarySoft, color:p.primaryD, letterSpacing:'0.04em', textTransform:'uppercase',
                  }}>Here</span>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'requests' && (
          <div style={{
            background:p.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:'16px',
          }}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <MBAvatar letter="K" color="#7E5BB0" size={44}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>Karin (Kfir's mom, 2.5y)</div>
                <div style={{ fontSize:12, color:p.muted, marginTop:2 }}>2 mutual · met at HaYarkon last week</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, marginTop:14 }}>
              <button style={{ flex:1, background:p.soft, color:p.ink, border:'none', borderRadius:10, padding:'10px 0', fontSize:12.5, fontWeight:600, cursor:'pointer' }}>Decline</button>
              <button style={{ flex:1.4, background:p.primary, color:'#fff', border:'none', borderRadius:10, padding:'10px 0', fontSize:12.5, fontWeight:600, cursor:'pointer' }}>Accept</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INBOX
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// CHAT — individual conversation view
// ─────────────────────────────────────────────────────────────
function MBChat({ ctx, thread, onBack }) {
  const { p } = ctx;
  const msgs = thread.messages || [];
  const isYesterday = thread.time === 'Yesterday';
  const dayLabel = isYesterday ? 'Yesterday' : 'Today';

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>

      {/* Header */}
      <div style={{
        padding:'8px 14px 10px', background:p.surface,
        borderBottom:`1px solid ${p.border}`,
        display:'flex', alignItems:'center', gap:10,
      }}>
        <button onClick={onBack} style={{
          width:34, height:34, borderRadius:'50%', background:p.soft,
          border:'none', cursor:'pointer', fontSize:20, color:p.inkD, lineHeight:1,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>‹</button>
        <div style={{
          width:36, height:36, borderRadius:'50%', flexShrink:0,
          background: thread.group ? p.accentSoft : p.primarySoft,
          color: thread.group ? '#7A5A1F' : p.primaryD,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:700, fontSize:13,
        }}>{thread.group ? `+${thread.count}` : thread.with[0]}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{thread.with}</div>
          {thread.group && <div style={{ fontSize:11, color:p.muted, marginTop:1 }}>4 parents · Guitar Playground</div>}
        </div>
        <span style={{ fontSize:12, color:p.primary, fontWeight:600, flexShrink:0 }}>Park →</span>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px 14px 8px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ textAlign:'center', fontSize:11, color:p.muted, fontWeight:500, margin:'2px 0 6px' }}>{dayLabel}</div>
        {msgs.map((msg, i) => {
          const isMe = msg.from === 'me';
          return (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              {!isMe && thread.group && (
                <div style={{ fontSize:11, color:p.primary, fontWeight:600, marginBottom:2, marginLeft:2 }}>
                  {msg.from.split(' ')[0]}
                </div>
              )}
              <div style={{
                maxWidth:'76%', padding:'9px 13px', fontSize:13.5, lineHeight:1.45,
                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: isMe ? p.primary : p.surface,
                color: isMe ? '#fff' : p.ink,
                border: isMe ? 'none' : `1px solid ${p.border}`,
              }}>{msg.text}</div>
              <div style={{ fontSize:10, color:p.muted, marginTop:2, marginLeft:3, marginRight:3 }}>{msg.time}</div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div style={{
        padding:'8px 12px 28px', background:p.surface,
        borderTop:`1px solid ${p.border}`,
        display:'flex', gap:8, alignItems:'center',
      }}>
        <div style={{
          flex:1, background:p.soft, borderRadius:22,
          padding:'10px 16px', fontSize:13.5, color:p.muted,
        }}>Message...</div>
        <div style={{
          width:36, height:36, borderRadius:'50%', background:p.primary, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:17, fontWeight:700, cursor:'pointer',
        }}>↑</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INBOX — thread list
// ─────────────────────────────────────────────────────────────
function MBInbox({ ctx }) {
  const { p, threads } = ctx;
  const [activeThread, setActiveThread] = mbS(null);

  if (activeThread) {
    return <MBChat ctx={ctx} thread={activeThread} onBack={() => setActiveThread(null)}/>;
  }

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      <div style={{ padding:'4px 20px 6px', display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
        <h1 style={{ margin:0, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:26, letterSpacing:'-0.02em', color:p.inkD }}>Inbox</h1>
        <span style={{ fontSize:12, color:p.primary, fontWeight:600 }}>+ New thread</span>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'10px 20px' }}>
        {threads.map(t => (
          <div key={t.id} onClick={() => setActiveThread(t)} style={{
            display:'flex', gap:12, padding:'14px 0', borderBottom:`1px solid ${p.border}`,
            alignItems:'center', cursor:'pointer',
          }}>
            <div style={{
              width:40, height:40, borderRadius:'50%',
              background: t.group ? p.accentSoft : p.primarySoft,
              color: t.group ? '#7A5A1F' : p.primaryD,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:700, fontSize:14, flexShrink:0,
            }}>{t.group ? `+${t.count}` : t.with[0]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8 }}>
                <span style={{ fontSize:14, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.with}</span>
                <span style={{ fontSize:11, color:p.muted, fontWeight:500, flexShrink:0 }}>{t.time}</span>
              </div>
              <div style={{
                fontSize:13, color: t.unread ? p.inkD : p.muted, fontWeight: t.unread ? 600 : 400,
                marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
              }}>{t.last}</div>
            </div>
            {t.unread && <span style={{ width:8, height:8, borderRadius:'50%', background:p.primary, flexShrink:0 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ME — parent + child profile
// ─────────────────────────────────────────────────────────────
function MBMe({ ctx }) {
  const { p, me } = ctx;
  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      <div style={{ flex:1, overflowY:'auto' }}>
        {/* Parent header */}
        <div style={{ padding:'4px 22px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <MBAvatar letter={me.avatar} color={p.primary} size={56}/>
            <div>
              <h1 style={{ margin:0, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:24, letterSpacing:'-0.02em', color:p.inkD }}>
                {me.parent}
              </h1>
              <div style={{ fontSize:12.5, color:p.muted, marginTop:2 }}>
                {me.neighborhood} · circle of {me.circle}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{
            marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
            background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, overflow:'hidden',
          }}>
            <Stat n={me.visitsThisMonth} l="Park visits" suff="this month" p={p}/>
            <Stat n={me.circle} l="In your circle" sep p={p}/>
            <Stat n="6" l="Reports added" sep p={p}/>
          </div>
        </div>

        {/* Child profile */}
        <div style={{ padding:'0 22px' }}>
          <div style={{
            background:p.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:'16px',
            display:'flex', gap:14, alignItems:'flex-start',
          }}>
            <div style={{
              width:48, height:48, borderRadius:14, background:p.accentSoft,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:"'P22 Mackinac', Georgia, serif", fontSize:22, fontWeight:500, color:p.inkD, letterSpacing:'-0.02em',
            }}>{me.kid.name[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>Buddy profile</div>
              <div style={{ fontSize:18, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, color:p.inkD, letterSpacing:'-0.02em', marginTop:2 }}>
                {me.kid.name} · {me.kid.ageLabel}
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
                {me.kid.loves.map(t => (
                  <span key={t} style={{
                    fontSize:11, fontWeight:600, padding:'4px 9px', borderRadius:999,
                    background:p.soft, color:p.ink, letterSpacing:'-0.01em',
                  }}>loves {t}</span>
                ))}
                <span style={{
                  fontSize:11, fontWeight:600, padding:'4px 9px', borderRadius:999,
                  background:'transparent', color:p.primary, border:`1px dashed ${p.primary}`, cursor:'pointer',
                }}>+ add</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy section */}
        <MBSectionHead title="Privacy" action="Manage →" p={p}/>
        <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', gap:8 }}>
          <PrivacyRow p={p} title="Who can see my beacon" v="My circle of 12" on/>
          <PrivacyRow p={p} title="Auto-beacon at parks" v="Off · ask each time" on={false}/>
          <PrivacyRow p={p} title="Show Talia's age to circle" v="Year only · 2y" on/>
          <PrivacyRow p={p} title="Buddy match suggestions" v="Same neighborhood · ±6mo" on/>
        </div>

        {/* Recent visits */}
        <MBSectionHead title="Recent visits" p={p}/>
        <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
          {[
            { n:'Meir Park', t:'Yesterday · 4–5 PM', w:'with Noa & Tom' },
            { n:'HaYarkon', t:'Sun · 10:30 AM',     w:'solo · added 1 report' },
            { n:'Kikar HaMedina', t:'Sat · 5–6 PM',  w:'with Ari' },
          ].map(v => (
            <div key={v.n} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 14px', background:p.surface, border:`1px solid ${p.border}`, borderRadius:12,
            }}>
              <div>
                <div style={{ fontSize:13.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{v.n}</div>
                <div style={{ fontSize:11.5, color:p.muted, marginTop:2 }}>{v.w}</div>
              </div>
              <span style={{ fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace' }}>{v.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Stat({ n, l, suff, sep, p }) {
  return (
    <div style={{
      padding:'14px 12px', borderLeft: sep ? `1px solid ${p.border}` : 'none',
    }}>
      <div style={{ fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:24, color:p.inkD, letterSpacing:'-0.02em', lineHeight:1 }}>{n}</div>
      <div style={{ fontSize:11, color:p.muted, marginTop:6, lineHeight:1.3 }}>
        {l}{suff && <><br/>{suff}</>}
      </div>
    </div>
  );
}
function PrivacyRow({ p, title, v, on }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between', gap:10,
      padding:'12px 14px', background:p.surface, border:`1px solid ${p.border}`, borderRadius:12,
    }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{title}</div>
        <div style={{ fontSize:11.5, color:p.muted, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v}</div>
      </div>
      <div style={{
        width:34, height:20, borderRadius:999, background: on ? (p.sel || p.primary) : p.border,
        position:'relative', flexShrink:0,
      }}>
        <div style={{
          position:'absolute', top:2, left: on ? 16 : 2,
          width:16, height:16, borderRadius:'50%', background:'#fff',
          boxShadow:'0 1px 2px rgba(0,0,0,0.2)', transition:'left 0.2s',
        }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Add Report — sheet (used as modal-screen)
// ─────────────────────────────────────────────────────────────
function MBReport({ ctx, parkId }) {
  const { p, go, parks } = ctx;
  const [kind, setKind] = mbS2('mess');
  const [text, setText] = mbS2('Trash overflowing near south bench');
  const park = parks.find(x => x.id === parkId) || parks[0];

  const kinds = [
    { id:'mess', label:'Cleanliness', sub:'trash · spills · safety' },
    { id:'fix',  label:'Maintenance', sub:'broken · taped · loose' },
    { id:'note', label:'Heads-up',    sub:'good vibes · advice' },
  ];

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      <div style={{ padding:'4px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={() => go('park', parkId)} style={{ background:'transparent', border:'none', fontSize:14, fontWeight:600, color:p.muted, cursor:'pointer', padding:0 }}>Cancel</button>
        <div style={{ fontSize:13, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>Add a report</div>
        <button style={{ background:'transparent', border:'none', fontSize:14, fontWeight:700, color:p.primary, cursor:'pointer', padding:0 }}>Post</button>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 20px' }}>
        <div style={{
          background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, padding:'12px 14px',
          fontSize:13, color:p.muted, display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <span>Reporting at <span style={{ color:p.inkD, fontWeight:600 }}>{park.name}</span></span>
          <span style={{ fontSize:12, color:p.primary, fontWeight:600 }}>Change</span>
        </div>

        <div style={{ marginTop:16, fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>What happened</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginTop:8 }}>
          {kinds.map(k => (
            <button key={k.id} onClick={() => setKind(k.id)} style={{
              padding:'12px 8px', borderRadius:12, textAlign:'left', cursor:'pointer',
              border:`1px solid ${kind === k.id ? (p.sel || p.primary) : p.border}`,
              background: kind === k.id ? (p.selSoft || p.primarySoft) : p.surface,
            }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{k.label}</div>
              <div style={{ fontSize:10.5, color:p.muted, marginTop:2 }}>{k.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop:16, fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>One sentence</div>
        <div style={{
          marginTop:8, padding:'14px 14px', background:p.surface, border:`1px solid ${p.border}`, borderRadius:14,
          fontSize:14, color:p.ink, lineHeight:1.5, minHeight:90,
        }}>
          {text}
          <span style={{ color:p.primary, animation:'mbblink 1s infinite' }}>|</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace' }}>
          <span>Tip: keep it under 140 chars</span>
          <span>{text.length}/140</span>
        </div>

        <div style={{ marginTop:16, fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>Severity</div>
        <div style={{ display:'flex', gap:6, marginTop:8 }}>
          {['Just FYI','Worth knowing','Avoid'].map((s,i) => (
            <MBPill key={s} active={i === 1} p={p}>{s}</MBPill>
          ))}
        </div>

        <style>{`@keyframes mbblink { 50% { opacity:0 } }`}</style>
      </div>
    </div>
  );
}

Object.assign(window, { MBPlan, MBBuddy, MBInbox, MBMe, MBReport, Stat, PrivacyRow });

// My Buddy — main screens
// All screen components export to window. Shell routes between them.

const { useState: mbS, useMemo: mbM, useEffect: mbE } = React;

// ─────────────────────────────────────────────────────────────
// Welcome / splash loader
// Trees morph (oak → pine → cypress → bush) while a progress bar fills.
// Auto-advances to the map when `go` is a real navigator.
// ─────────────────────────────────────────────────────────────
const TREE_VARIANTS = [
  // oak — round canopy
  (c) => (<g>
    <ellipse cx="0" cy="-22" rx="20" ry="17" fill={c.primary}/>
    <ellipse cx="-7" cy="-29" rx="11" ry="10" fill={c.primaryD}/>
    <ellipse cx="8"  cy="-25" rx="10" ry="9"  fill={c.primaryD}/>
    <rect x="-2" y="-7" width="4" height="14" rx="1" fill={c.ink}/>
  </g>),
  // pine — triangle stack
  (c) => (<g>
    <polygon points="-18,-6 18,-6 0,-30" fill={c.primary}/>
    <polygon points="-14,-15 14,-15 0,-35" fill={c.primaryD}/>
    <polygon points="-10,-22 10,-22 0,-38" fill={c.primary}/>
    <rect x="-2" y="-6" width="4" height="13" rx="1" fill={c.ink}/>
  </g>),
  // cypress — tall narrow
  (c) => (<g>
    <ellipse cx="0" cy="-22" rx="9" ry="20" fill={c.primary}/>
    <ellipse cx="0" cy="-22" rx="5" ry="14" fill={c.primaryD}/>
    <rect x="-2" y="-4" width="4" height="11" rx="1" fill={c.ink}/>
  </g>),
  // bush cluster
  (c) => (<g>
    <circle cx="-9" cy="-15" r="10" fill={c.primary}/>
    <circle cx="9"  cy="-17" r="10" fill={c.primary}/>
    <circle cx="0"  cy="-22" r="12" fill={c.primaryD}/>
    <rect x="-2" y="-5" width="4" height="12" rx="1" fill={c.ink}/>
  </g>),
];

function MBTree({ p, startIdx = 0, delay = 0 }) {
  const [idx, setIdx] = mbS(startIdx);
  mbE(() => {
    let interval = null;
    const start = setTimeout(() => {
      setIdx(i => (i + 1) % TREE_VARIANTS.length);
      interval = setInterval(() => {
        setIdx(i => (i + 1) % TREE_VARIANTS.length);
      }, 2200);
    }, delay);
    return () => { clearTimeout(start); if (interval) clearInterval(interval); };
  }, []);

  const colors = { primary: p.primary, primaryD: p.primaryD, ink: p.inkD };

  return (
    <svg width="84" height="92" viewBox="-25 -45 50 55" style={{
      animation: 'mbsway 4s ease-in-out infinite',
      animationDelay: `${delay - 200}ms`,
      transformOrigin: 'center bottom',
      overflow: 'visible',
    }}>
      {TREE_VARIANTS.map((V, i) => (
        <g key={i} style={{
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 0.55s ease',
          transformOrigin: 'center bottom',
        }}>{V(colors)}</g>
      ))}
    </svg>
  );
}

function MBTreeGrove({ p }) {
  return (
    <div style={{ position:'relative', width:'100%', display:'flex', justifyContent:'center', paddingBottom: 14 }}>
      {/* ground line */}
      <div style={{
        position:'absolute', bottom: 4, left:'50%', transform:'translateX(-50%)',
        width: 280, height: 6, borderRadius: 999, background: p.primarySoft,
      }}/>
      <div style={{
        position:'absolute', bottom: -6, left:'50%', transform:'translateX(-50%)',
        width: 210, height: 5, borderRadius: 999, background: p.primarySoft, opacity: 0.55,
      }}/>
      {/* trees */}
      <div style={{ display:'flex', gap: 8, alignItems:'flex-end' }}>
        <MBTree p={p} startIdx={0} delay={0}/>
        <MBTree p={p} startIdx={1} delay={500}/>
        <MBTree p={p} startIdx={2} delay={1000}/>
      </div>
    </div>
  );
}

function MBOnboarding({ ctx }) {
  const { p, go } = ctx;

  return (
    <div style={{
      height:'100%', position:'relative', overflow:'hidden',
      background: `linear-gradient(180deg, ${p.bg} 0%, ${p.primarySoft} 100%)`,
      display:'flex', flexDirection:'column',
    }}>
      <MBStatusBar p={p}/>

      {/* soft sun in the corner */}
      <div style={{
        position:'absolute', top: 70, right: -50,
        width: 160, height: 160, borderRadius:'50%',
        background:`radial-gradient(circle, ${p.accent} 0%, transparent 70%)`,
        opacity: 0.55, pointerEvents:'none',
      }}/>

      {/* Wordmark */}
      <div style={{
        padding:'22px 30px 0',
        fontFamily:'"Geist Mono", monospace',
        fontSize: 11, fontWeight: 600, letterSpacing:'0.18em',
        textTransform:'uppercase', color: p.muted,
        position:'relative', zIndex: 1,
      }}>my buddy</div>

      {/* Hero — tree grove + tagline */}
      <div style={{
        flex: 1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        position:'relative', zIndex: 1, padding:'0 24px',
      }}>
        <MBTreeGrove p={p}/>
        <h1 style={{
          margin:'56px 0 0', textAlign:'center',
          fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight: 500,
          fontSize: 34, lineHeight: 1.08, letterSpacing:'-0.025em',
          color: p.inkD,
        }}>
          The park is better<br/><em style={{
            color: p.headline || p.primary, fontStyle:'italic', fontWeight: 500,
          }}>with a friend.</em>
        </h1>
      </div>

      {/* CTA */}
      <div style={{
        padding:'0 30px 50px', position:'relative', zIndex: 1,
        display:'flex', flexDirection:'column', gap: 10,
      }}>
        <button onClick={() => go('setup')} style={{
          background: p.cta || p.primary, color:'#fff', border:'none', borderRadius: 16,
          padding:'17px 0', fontSize: 15.5, fontWeight: 600, letterSpacing:'-0.01em',
          cursor:'pointer',
          boxShadow: `0 8px 24px ${p.cta || p.primary}33`,
        }}>Get started</button>
        <button style={{
          background:'transparent', color: p.muted, border:'none',
          padding:'10px 0', fontSize: 13, fontWeight: 500, cursor:'pointer',
        }}>I already have an account</button>
      </div>

      <style>{`
        @keyframes mbsway { 0%,100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// SETUP — ask about the buddy + permissions, before the map loads
// ───────────────────────────────────────────────────────────────
function MBSetup({ ctx }) {
  const { p, go } = ctx;
  const [name, setName]       = mbS('Talia');
  const [age, setAge]         = mbS(2);
  const [loves, setLoves]     = mbS(['sand', 'climb', 'dog']);
  const [musts, setMusts]     = mbS(['shade', 'fenced', 'toddler-zone']);
  const [loc, setLoc]         = mbS(true);
  const [contacts, setContacts] = mbS(true);

  const LOVES = [
    { id:'sand',  label:'Sand' },
    { id:'climb', label:'Climbing' },
    { id:'swing', label:'Swings' },
    { id:'water', label:'Water' },
    { id:'art',   label:'Art' },
    { id:'dog',   label:'Dogs' },
    { id:'run',   label:'Running' },
    { id:'music', label:'Music' },
    { id:'books', label:'Books' },
  ];
  const MUSTS = [
    { id:'shade',         label:'Shade' },
    { id:'fenced',        label:'Fenced' },
    { id:'toddler-zone',  label:'Toddler zone' },
    { id:'restrooms',     label:'Restrooms' },
    { id:'soft-floor',    label:'Soft floor' },
    { id:'water-fountain',label:'Water fountain' },
    { id:'picnic',        label:'Picnic table' },
    { id:'cafe',          label:'Café nearby' },
  ];
  const toggle = (list, setter, id) =>
    setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column', position:'relative' }}>
      <MBStatusBar p={p}/>

      {/* Top bar: progress + back */}
      <div style={{
        padding:'4px 22px 14px', display:'flex',
        alignItems:'center', justifyContent:'space-between',
      }}>
        <button onClick={() => go('onboarding')} style={{
          background:'transparent', border:'none', padding:0, cursor:'pointer',
          fontSize:18, color:p.muted, fontWeight:500,
        }}>‹</button>
        <div style={{
          display:'flex', gap:5, alignItems:'center',
        }}>
          <span style={{ width:24, height:3, borderRadius:999, background:p.muted, opacity:0.4 }}/>
          <span style={{ width:24, height:3, borderRadius:999, background:p.primary }}/>
        </div>
        <button onClick={() => go('map')} style={{
          background:'transparent', border:'none', padding:0, cursor:'pointer',
          fontSize:13, color:p.muted, fontWeight:500,
        }}>Skip</button>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 22px 110px' }}>
        <h1 style={{
          margin:'4px 0 6px',
          fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:30,
          lineHeight:1.05, letterSpacing:'-0.025em', color:p.inkD,
        }}>Tell us about<br/><em style={{ color:p.headline || p.primary, fontStyle:'italic', fontWeight:500 }}>your buddy.</em></h1>
        <p style={{ margin:'0 0 22px', fontSize:13.5, color:p.muted, lineHeight:1.5 }}>
          So we can show you parks that actually fit. Takes about 30 seconds.
        </p>

        {/* Child profile card */}
        <MBSetupLabel p={p}>The kid</MBSetupLabel>
        <div style={{
          background:p.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:'16px',
          display:'flex', flexDirection:'column', gap:18,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{
              width:52, height:52, borderRadius:16, background:p.accentSoft,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:"'P22 Mackinac', Georgia, serif", fontSize:26, fontWeight:500,
              color:p.inkD, letterSpacing:'-0.02em', flexShrink:0,
            }}>{(name[0] || '?').toUpperCase()}</div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{
              flex:1, border:'none', background:'transparent', outline:'none',
              fontFamily:"'P22 Mackinac', Georgia, serif", fontSize:22, fontWeight:500,
              color:p.inkD, letterSpacing:'-0.02em',
              borderBottom:`1px dashed ${p.border}`, padding:'4px 0',
            }} placeholder="Buddy's name"/>
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
              <span style={{ fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>Age</span>
              <span style={{ fontSize:18, color:p.inkD, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, letterSpacing:'-0.02em' }}>{age}{age % 1 === 0 ? 'y' : 'y'}</span>
            </div>
            <input type="range" min="1" max="5" step="0.5" value={age}
              onChange={(e) => setAge(parseFloat(e.target.value))}
              style={{ width:'100%', accentColor:p.primary, margin:0 }}/>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:10.5, color:p.muted, fontFamily:'"Geist Mono", monospace' }}>
              <span>1y</span><span>2y</span><span>3y</span><span>4y</span><span>5y</span>
            </div>
          </div>
        </div>

        {/* Loves */}
        <MBSetupLabel p={p} top>What they love</MBSetupLabel>
        <p style={{ margin:'-4px 0 12px', fontSize:12.5, color:p.muted, lineHeight:1.5 }}>
          We surface parks they'll click with.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {LOVES.map(l => (
            <MBPill key={l.id} active={loves.includes(l.id)}
              onClick={() => toggle(loves, setLoves, l.id)} p={p} size="sm">{l.label}</MBPill>
          ))}
        </div>

        {/* Must-haves */}
        <MBSetupLabel p={p} top>Park must-haves</MBSetupLabel>
        <p style={{ margin:'-4px 0 12px', fontSize:12.5, color:p.muted, lineHeight:1.5 }}>
          The things that decide if you turn around.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {MUSTS.map(m => (
            <MBPill key={m.id} active={musts.includes(m.id)}
              onClick={() => toggle(musts, setMusts, m.id)} p={p} size="sm">{m.label}</MBPill>
          ))}
        </div>

        {/* Sync */}
        <MBSetupLabel p={p} top>Make it personal</MBSetupLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <MBSyncRow p={p} on={loc} onToggle={() => setLoc(!loc)}
            icon="◎" title="Use my location"
            sub="Find parks within walking distance · only used live"/>
          <MBSyncRow p={p} on={contacts} onToggle={() => setContacts(!contacts)}
            icon="◍" title="Sync contacts"
            sub="See parents already on My Buddy · nothing is uploaded"/>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position:'absolute', left:0, right:0, bottom:0,
        background:p.surface, borderTop:`1px solid ${p.border}`,
        padding:'12px 22px 26px',
      }}>
        <button onClick={() => go('map')} style={{
          width:'100%', background:p.cta || p.primary, color:'#fff', border:'none', borderRadius:14,
          padding:'15px 0', fontSize:15, fontWeight:600, letterSpacing:'-0.01em', cursor:'pointer',
          boxShadow:`0 6px 18px ${p.cta || p.primary}26`,
        }}>Find our parks →</button>
      </div>
    </div>
  );
}

function MBSetupLabel({ p, top, children }) {
  return (
    <div style={{
      fontFamily:'"Geist Mono", monospace', fontSize:11, color:p.muted,
      fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase',
      margin: top ? '24px 0 10px' : '0 0 10px',
    }}>{children}</div>
  );
}

function MBSyncRow({ p, on, onToggle, icon, title, sub }) {
  const sel = p.sel || p.primary;
  const selSoft = p.selSoft || p.primarySoft;
  return (
    <button onClick={onToggle} style={{
      display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
      background:p.surface,
      border:`1px solid ${on ? sel : p.border}`,
      borderRadius:14, cursor:'pointer', textAlign:'left', width:'100%',
      transition:'border-color 150ms ease',
    }}>
      <div style={{
        width:38, height:38, borderRadius:12, background:on ? sel : selSoft,
        color: on ? p.inkD : p.primaryD,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'"Geist Mono", monospace', fontSize:20, fontWeight:600, flexShrink:0,
      }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>{title}</div>
        <div style={{ fontSize:11.5, color:p.muted, marginTop:2, lineHeight:1.4 }}>{sub}</div>
      </div>
      <div style={{
        width:34, height:20, borderRadius:999, background: on ? sel : p.border,
        position:'relative', flexShrink:0, transition:'background 150ms ease',
      }}>
        <div style={{
          position:'absolute', top:2, left: on ? 16 : 2,
          width:16, height:16, borderRadius:'50%', background:'#fff',
          boxShadow:'0 1px 2px rgba(0,0,0,0.2)', transition:'left 0.2s',
        }}/>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAP — main hero screen
// ─────────────────────────────────────────────────────────────
function MBMap({ ctx }) {
  const { p, go, parks, friends, hour, mapStyle, setHour } = ctx;
  const [filter, setFilter] = mbS('all');
  const filters = [
    { id:'all',     label:'All parks' },
    { id:'friends', label:'Friends here' },
    { id:'fenced',  label:'Fenced' },
    { id:'shade',   label:'Shade' },
    { id:'quiet',   label:'Quiet now' },
    { id:'1-3',     label:'1–3 yrs' },
  ];

  const filteredParks = parks.filter(park => {
    if (filter === 'all') return true;
    if (filter === 'friends') return park.friendsHere.length > 0;
    if (filter === 'quiet') return crowdAt(park, hour) <= 2;
    if (filter === '1-3') return park.bestFor.startsWith('1') || park.bestFor.startsWith('2');
    return park.amenities.includes(filter);
  });

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>

      {/* Greeting + filters */}
      <div style={{ padding:'4px 20px 12px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:12, color:p.muted, fontWeight:500 }}>
              Tuesday · 4:12 PM · {ctx.me.neighborhood}
            </div>
            <h1 style={{
              margin:'2px 0 0', fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500,
              fontSize:24, letterSpacing:'-0.02em', color:p.inkD, lineHeight:1.1,
            }}>Hey Mira — <span style={{ color:p.headline || p.primary }}>{friends.filter(f=>f.here).length} buddies</span> at parks now.</h1>
          </div>
          <button onClick={() => go('me')} style={{ background:'transparent', border:'none', padding:0, cursor:'pointer' }}>
            <MBAvatar letter={ctx.me.avatar} color={p.primary} size={36}/>
          </button>
        </div>
        <div style={{ display:'flex', gap:6, marginTop:14, overflowX:'auto', marginLeft:-20, paddingLeft:20, paddingRight:20 }}>
          {filters.map(f => (
            <MBPill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)} p={p}>{f.label}</MBPill>
          ))}
        </div>
      </div>

      {/* Map canvas */}
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <MBMapCanvas parks={filteredParks} friends={friends} hour={hour} p={p} mapStyle={mapStyle} onPark={(id) => go('park', id)}/>

        {/* time-of-day strip floating */}
        <div style={{
          position:'absolute', left:14, right:14, bottom:14, padding:'10px 12px',
          background:'rgba(255,255,255,0.92)', backdropFilter:'blur(10px)',
          borderRadius:14, border:`1px solid ${p.border}`,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ fontFamily:'"Geist Mono", monospace', fontSize:11, color:p.muted, fontWeight:600 }}>
            NOW · {String(hour).padStart(2,'0')}:00
          </span>
          <div style={{ flex:1, position:'relative', height:6, background:p.soft, borderRadius:3 }}>
            <div style={{
              position:'absolute', left:`${(hour/23)*100}%`, top:'50%',
              transform:'translate(-50%,-50%)', width:14, height:14,
              borderRadius:'50%', background:p.primary, boxShadow:'0 1px 3px rgba(0,0,0,0.18)',
            }}/>
          </div>
          <button onClick={() => setHour((hour+2)%24)} style={{
            background:'transparent', border:`1px solid ${p.border}`, borderRadius:8,
            padding:'4px 8px', fontSize:11, fontWeight:600, color:p.ink, cursor:'pointer',
          }}>+2h</button>
        </div>
      </div>
    </div>
  );
}

// Inner: the actual map illustration
function MBMapCanvas({ parks, friends, hour, p, mapStyle, onPark }) {
  const ill = mapStyle === 'illustrated';
  return (
    <div style={{ position:'absolute', inset:0, background:p.map, overflow:'hidden' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
        {/* base terrain */}
        <rect x="0" y="0" width="100" height="100" fill={p.map}/>
        {/* river */}
        <path d="M-5 12 Q 30 18 50 14 T 110 26" stroke={p.mapWater} strokeWidth={ill ? 8 : 5} fill="none" opacity={ill ? 0.85 : 0.6}/>
        {/* park blobs */}
        {parks.map(park => (
          <ellipse key={park.id+'-blob'} cx={park.coords.x} cy={park.coords.y} rx={ill ? 11 : 7} ry={ill ? 8 : 5.5} fill={p.mapPark} opacity={ill ? 1 : 0.7}/>
        ))}
        {/* roads */}
        {[
          'M0 30 L100 30','M0 55 L100 55','M0 80 L100 80',
          'M30 0 L30 100','M65 0 L65 100',
        ].map((d,i) => (
          <path key={i} d={d} stroke={p.mapPath} strokeWidth={ill ? 2 : 0.8} fill="none"/>
        ))}
        {ill && (
          <>
            {/* extra texture: trees scattered */}
            {[[10,82],[20,86],[82,18],[88,68],[14,68],[78,84],[42,12]].map((t,i) => (
              <circle key={i} cx={t[0]} cy={t[1]} r="1.4" fill={p.primary} opacity="0.45"/>
            ))}
          </>
        )}
      </svg>

      {/* Pins (HTML overlay so we can render avatars) */}
      {parks.map(park => {
        const lvl = crowdAt(park, hour);
        const here = park.friendsHere.map(fid => friends.find(f => f.id === fid)).filter(Boolean);
        return (
          <button key={park.id} onClick={() => onPark(park.id)} style={{
            position:'absolute', left:`${park.coords.x}%`, top:`${park.coords.y}%`,
            transform:'translate(-50%,-50%)', background:'transparent', border:'none',
            cursor:'pointer', padding:0,
          }}>
            {/* ripple ring if friends */}
            {here.length > 0 && (
              <div style={{
                position:'absolute', left:'50%', top:'50%',
                width:46, height:46, transform:'translate(-50%,-50%)',
                borderRadius:'50%', border:`2px solid ${p.primary}`, opacity:0.35,
                animation:'mbpulse 2.6s ease-out infinite',
              }}/>
            )}
            <div style={{
              minWidth:42, padding:'4px 8px', borderRadius:18, background:p.surface,
              boxShadow:'0 2px 8px rgba(0,0,0,0.10)', border:`1px solid ${p.border}`,
              display:'flex', alignItems:'center', gap:6,
            }}>
              <MBCrowdGlyph level={lvl} color={crowdColor(lvl,p)} size={10}/>
              {here.length > 0 ? (
                <MBAvatarStack friends={here} size={18} p={p}/>
              ) : (
                <span style={{ fontSize:10, fontWeight:600, color:p.muted }}>{park.bestFor}</span>
              )}
            </div>
            <div style={{
              fontSize:10, fontWeight:600, color:p.inkD, marginTop:3,
              textShadow:`0 0 2px ${p.surface}, 0 0 6px ${p.surface}`,
              whiteSpace:'nowrap',
            }}>{park.name}</div>
          </button>
        );
      })}

      <style>{`@keyframes mbpulse { 0% { transform:translate(-50%,-50%) scale(0.8); opacity:0.45 } 100% { transform:translate(-50%,-50%) scale(1.6); opacity:0 } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Celebration illustration — two kids with arms raised
// ─────────────────────────────────────────────────────────────
function MBKidsCelebration({ p }) {
  return (
    <svg width="104" height="54" viewBox="0 0 104 54" fill="none" style={{ flexShrink:0, overflow:'visible' }}>
      {/* sparkles */}
      <text x="52" y="9"  textAnchor="middle" fontSize="10" fill={p.accent}  fontFamily="system-ui,sans-serif">✦</text>
      <text x="10" y="13" textAnchor="middle" fontSize="7"  fill={p.primary} fontFamily="system-ui,sans-serif" opacity="0.7">✦</text>
      <text x="94" y="13" textAnchor="middle" fontSize="7"  fill={p.accent}  fontFamily="system-ui,sans-serif" opacity="0.7">✦</text>

      {/* heart between kids */}
      <text x="52" y="32" textAnchor="middle" fontSize="13" fill={p.danger} fontFamily="system-ui,sans-serif">♥</text>

      {/* LEFT KID — primary green */}
      <circle cx="22" cy="15" r="8.5" fill={p.primary}/>
      <circle cx="19" cy="13.5" r="1.5" fill="white"/>
      <circle cx="25" cy="13.5" r="1.5" fill="white"/>
      <path d="M19 17 Q22 20.5 25 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="18" y="24" width="8" height="11" rx="4" fill={p.primary}/>
      <line x1="18" y1="27" x2="8"  y2="19" stroke={p.primary} strokeWidth="3" strokeLinecap="round"/>
      <line x1="26" y1="27" x2="36" y2="20" stroke={p.primary} strokeWidth="3" strokeLinecap="round"/>
      <line x1="20" y1="35" x2="16" y2="47" stroke={p.primary} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="35" x2="28" y2="47" stroke={p.primary} strokeWidth="2.5" strokeLinecap="round"/>

      {/* RIGHT KID — accent gold */}
      <circle cx="82" cy="15" r="8.5" fill={p.accent}/>
      <circle cx="79" cy="13.5" r="1.5" fill="white"/>
      <circle cx="85" cy="13.5" r="1.5" fill="white"/>
      <path d="M79 17 Q82 20.5 85 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="78" y="24" width="8" height="11" rx="4" fill={p.accent}/>
      <line x1="78" y1="27" x2="68" y2="20" stroke={p.accent} strokeWidth="3" strokeLinecap="round"/>
      <line x1="86" y1="27" x2="96" y2="19" stroke={p.accent} strokeWidth="3" strokeLinecap="round"/>
      <line x1="80" y1="35" x2="76" y2="47" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="84" y1="35" x2="88" y2="47" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PARK DETAIL
// ─────────────────────────────────────────────────────────────
function MBPark({ ctx, parkId }) {
  const { p, go, friends, hour, me } = ctx;
  const [isCommitted, setIsCommitted] = mbS(false);
  const park = ctx.parks.find(x => x.id === parkId) || ctx.parks[0];
  const lvl = crowdAt(park, hour);
  const here = park.friendsHere.map(fid => friends.find(f => f.id === fid)).filter(Boolean);

  return (
    <div style={{ height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <MBStatusBar p={p}/>
      <div style={{ flex:1, overflowY:'auto', paddingBottom:120 }}>
        {/* Header art with back */}
        <div style={{ padding:'4px 16px 0', position:'relative' }}>
          <button onClick={() => go('map')} style={{
            position:'absolute', left:24, top:14, zIndex:2,
            width:36, height:36, borderRadius:'50%', background:p.surface,
            border:`1px solid ${p.border}`, cursor:'pointer', fontSize:18, color:p.inkD,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>‹</button>
          <button style={{
            position:'absolute', right:24, top:14, zIndex:2,
            width:36, height:36, borderRadius:'50%', background:p.surface,
            border:`1px solid ${p.border}`, cursor:'pointer', fontSize:14, color:p.inkD,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>♡</button>
          <MBParkArt park={park} p={p} h={170}/>
        </div>

        {/* Title block */}
        <div style={{ padding:'18px 22px 0' }}>
          <div style={{ fontFamily:'"Geist Mono", monospace', fontSize:11, color:p.muted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em' }}>
            {park.neighborhood} · {park.distance}
          </div>
          <h1 style={{ margin:'6px 0 6px', fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, fontSize:28, letterSpacing:'-0.025em', color:p.inkD }}>
            {park.name}
          </h1>
          <p style={{ margin:0, fontSize:14, color:p.ink, opacity:0.75, lineHeight:1.5 }}>{park.blurb}</p>
        </div>

        {/* Live signals row */}
        <div style={{ padding:'18px 22px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, padding:'12px 14px' }}>
            <div style={{ fontSize:10.5, color:p.muted, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Crowd · now</div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
              <MBCrowdGlyph level={lvl} color={crowdColor(lvl,p)} size={14}/>
              <span style={{ fontSize:18, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500, color:p.inkD, letterSpacing:'-0.02em' }}>
                {crowdLabel(lvl)}
              </span>
            </div>
          </div>
          <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, padding:'12px 14px' }}>
            <div style={{ fontSize:10.5, color:p.muted, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Cleanliness</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:4 }}>
              <span style={{ fontSize:22, fontFamily:"'Montserrat', system-ui, sans-serif", fontWeight:700, color:p.inkD, letterSpacing:'-0.02em' }}>{park.cleanliness != null ? park.cleanliness.toFixed(1) : '—'}</span>
              <span style={{ fontSize:11, color:p.muted, fontWeight:500 }}>· 24 reports</span>
            </div>
          </div>
        </div>

        {/* Crowd through the day */}
        <MBSectionHead title="Crowd through the day" action="Plan around it →" p={p}/>
        <div style={{ padding:'0 22px' }}>
          <MBCrowdChart park={park} hour={hour} p={p}/>
        </div>

        {/* Buddies */}
        <MBSectionHead title={`Buddies here · ${here.length}`} action={here.length ? 'Wave →' : null} p={p}/>
        {here.length > 0 ? (
          <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', gap:8 }}>
            {here.map(f => (
              <div key={f.id} style={{
                display:'flex', alignItems:'center', gap:12,
                background:p.surface, border:`1px solid ${p.border}`,
                borderRadius:14, padding:'10px 12px',
              }}>
                <MBAvatar letter={f.avatar} color={f.color} size={38}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:p.inkD, letterSpacing:'-0.01em' }}>
                    {f.parent} <span style={{ color:p.muted, fontWeight:500 }}>· {f.kid}, {f.kidAge}y</span>
                  </div>
                  <div style={{ fontSize:11, color:p.muted, marginTop:1 }}>
                    Beacon on · {f.since} ago
                  </div>
                </div>
                <button style={{
                  background:p.primarySoft, color:p.primaryD, border:'none',
                  borderRadius:10, padding:'7px 12px', fontSize:12, fontWeight:600,
                  cursor:'pointer',
                }}>Say hi</button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding:'0 22px' }}>
            <div style={{ background:p.soft, borderRadius:14, padding:'14px', fontSize:13, color:p.muted, lineHeight:1.5 }}>
              No buddies here right now. Drop a beacon and we'll let your circle know.
            </div>
          </div>
        )}

        {/* Amenities */}
        <MBSectionHead title="Amenities" p={p}/>
        <div style={{
          padding:'0 22px', display:'grid',
          gridTemplateColumns:'repeat(4, 1fr)', gap:8,
        }}>
          {park.amenities.map(a => <MBAmenity key={a} kind={a} p={p}/>)}
        </div>

        {/* Reports */}
        <MBSectionHead title="From parents · last 24h" action="Add report →" p={p}/>
        <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', gap:8 }}>
          {park.reports.length === 0 && (
            <div style={{ background:p.soft, borderRadius:14, padding:'14px', fontSize:13, color:p.muted }}>
              All quiet. No reports today.
            </div>
          )}
          {park.reports.map(r => (
            <MBReportCard key={r.id} report={r} p={p}/>
          ))}
        </div>

        {/* Best for */}
        <div style={{ padding:'18px 22px 6px' }}>
          <div style={{ fontSize:11, color:p.muted, fontFamily:'"Geist Mono", monospace', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600 }}>Best for</div>
          <div style={{ fontSize:14, color:p.ink, marginTop:4 }}>{park.bestFor} · Talia (2y) fits this perfectly</div>
        </div>
      </div>

      {/* Sticky action */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, background:p.surface, borderTop:`1px solid ${p.border}` }}>
        {isCommitted && (
          <div style={{
            display:'flex', alignItems:'center', gap:12,
            padding:'10px 16px 8px', background:p.primarySoft,
            borderBottom:`1px solid ${p.border}`,
          }}>
            <MBKidsCelebration p={p}/>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:p.primaryD, lineHeight:1.3 }}>
                {me.kid.name} is on the way!
              </div>
              <div style={{ fontSize:11.5, color:p.muted, marginTop:2 }}>
                Your circle can see you are coming.
              </div>
            </div>
          </div>
        )}
        <div style={{ padding:'10px 16px 22px', display:'flex', gap:8 }}>
          <button onClick={() => go('plan', park.id)} style={{
            flex:0.5, background:p.surface, color:p.ink, border:`1px solid ${p.border}`,
            borderRadius:12, padding:'13px 0', fontSize:13.5, fontWeight:600, cursor:'pointer',
          }}>Plan playdate</button>
          <button onClick={() => setIsCommitted(true)} style={{
            flex:1,
            background: isCommitted ? p.primarySoft : (p.cta || p.primary),
            color: isCommitted ? p.primaryD : '#fff',
            border: isCommitted ? `1.5px solid ${p.border}` : 'none',
            borderRadius:12, padding:'13px 0', fontSize:13.5, fontWeight:600,
            cursor: isCommitted ? 'default' : 'pointer',
          }}>{isCommitted ? 'You are in ✓' : "I'm coming"}</button>
        </div>
      </div>
    </div>
  );
}

// Crowd chart — bars across 24h, highlight current
function MBCrowdChart({ park, hour, p }) {
  const data = park.crowdByHour;
  const max = 4;
  return (
    <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, padding:'14px 14px 12px' }}>
      <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:64 }}>
        {data.map((v,i) => {
          const isNow = i === hour;
          const c = isNow ? p.primary : (v >= 4 ? p.danger : v >= 3 ? p.warn : p.primarySoft);
          return (
            <div key={i} style={{
              flex:1, height:`${(v/max)*100}%`, minHeight:3,
              background:c, borderRadius:3, opacity: isNow ? 1 : (v >= 3 ? 0.85 : 0.95),
              position:'relative',
            }}>
              {isNow && (
                <span style={{
                  position:'absolute', top:-18, left:'50%', transform:'translateX(-50%)',
                  fontSize:10, fontWeight:700, color:p.primary, fontFamily:'"Geist Mono", monospace',
                }}>NOW</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:10, color:p.muted, fontFamily:'"Geist Mono", monospace' }}>
        <span>6a</span><span>10a</span><span>2p</span><span>6p</span><span>10p</span>
      </div>
    </div>
  );
}

// Report card
function MBReportCard({ report, p }) {
  const kindStyles = {
    note: { bg:p.primarySoft, fg:p.primaryD, label:'Heads-up' },
    fix:  { bg:p.accentSoft,  fg:'#7A5A1F', label:'Maintenance' },
    mess: { bg:'#FCE6E4',     fg:p.danger,  label:'Cleanliness' },
  };
  const k = kindStyles[report.kind] || kindStyles.note;
  return (
    <div style={{ background:p.surface, border:`1px solid ${p.border}`, borderRadius:14, padding:'12px 14px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
        <span style={{ fontSize:10.5, fontWeight:700, padding:'3px 8px', borderRadius:999, background:k.bg, color:k.fg, letterSpacing:'0.02em', textTransform:'uppercase' }}>{k.label}</span>
        <span style={{ fontSize:11, color:p.muted }}>{report.time}</span>
      </div>
      <div style={{ fontSize:13.5, color:p.ink, lineHeight:1.5 }}>{report.text}</div>
      <div style={{ fontSize:11, color:p.muted, marginTop:6 }}>{report.who}</div>
    </div>
  );
}

Object.assign(window, { MBOnboarding, MBSetup, MBSetupLabel, MBSyncRow, MBMap, MBPark, MBMapCanvas, MBCrowdChart, MBReportCard });

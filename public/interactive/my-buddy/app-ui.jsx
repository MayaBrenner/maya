// My Buddy — UI primitives
// Small reusable bits used across screens. Keep light — most layout is per-screen.

const { useState: mbUseState, useEffect: mbUseEffect, useRef: mbUseRef } = React;

// Status bar (custom, lighter than IOSStatusBar — fits the design system)
function MBStatusBar({ p, dark = false }) {
  const c = dark ? '#fff' : p.inkD;
  return (
    <div style={{
      height: 44, padding: '0 22px', display:'flex',
      alignItems:'center', justifyContent:'space-between',
      fontFamily:'"SF Pro Text", system-ui, sans-serif',
      fontWeight: 600, fontSize: 14, color: c, letterSpacing: '-0.01em',
    }}>
      <span>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0.5" y="6" width="3" height="4" rx="0.5" fill={c}/>
          <rect x="4.5" y="4" width="3" height="6" rx="0.5" fill={c}/>
          <rect x="8.5" y="2" width="3" height="8" rx="0.5" fill={c}/>
          <rect x="12.5" y="0" width="3" height="10" rx="0.5" fill={c}/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.2c.7 0 1.3.3 1.7.7l1.4-1.4a5.7 5.7 0 0 0-6.2 0l1.4 1.4c.4-.4 1-.7 1.7-.7Z" fill={c}/>
          <path d="M7.5 6c1.5 0 2.9.5 4 1.4L13 6a8.7 8.7 0 0 0-11 0l1.5 1.4A6.5 6.5 0 0 1 7.5 6Z" fill={c} opacity=".55"/>
          <path d="M7.5 2.8c2.4 0 4.6.8 6.4 2.2L15 3.7a11.7 11.7 0 0 0-15 0l1.1 1.3A10.4 10.4 0 0 1 7.5 2.8Z" fill={c} opacity=".25"/>
        </svg>
        <svg width="26" height="11" viewBox="0 0 26 11">
          <rect x="0.5" y="0.5" width="22" height="10" rx="2.6" fill="none" stroke={c} opacity=".4"/>
          <rect x="2" y="2" width="17" height="7" rx="1.4" fill={c}/>
          <rect x="23.4" y="3.5" width="1.5" height="4" rx="0.5" fill={c} opacity=".4"/>
        </svg>
      </div>
    </div>
  );
}

// Pill — chip used for filters, tags, vibe selection
function MBPill({ active, onClick, children, p, tone = 'default', size = 'md' }) {
  const sel = p.sel || p.ink;          // selected-chip fill (light blue in Fresh)
  const selFg = p.sel ? p.inkD : p.bg; // dark text on light-blue; else inverse
  const softSel = p.sel || p.primary;
  const softFg = p.sel ? p.inkD : '#fff';
  const tones = {
    default: { bg: active ? sel : p.surface, fg: active ? selFg : p.ink, br: active ? sel : p.border },
    soft:    { bg: active ? softSel : p.soft, fg: active ? softFg : p.ink, br: 'transparent' },
    accent:  { bg: p.accentSoft, fg: p.inkD, br: 'transparent' },
    primary: { bg: p.primary, fg: '#fff', br: p.primary },
    danger:  { bg: '#FCE6E4', fg: p.danger, br: 'transparent' },
  };
  const t = tones[tone] || tones.default;
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding: size === 'sm' ? '5px 10px' : '7px 13px',
      fontSize: size === 'sm' ? 12 : 13, fontWeight: 600,
      borderRadius: 999, border:`1px solid ${t.br}`, background: t.bg, color: t.fg,
      cursor:'pointer', whiteSpace:'nowrap', letterSpacing:'-0.01em',
    }}>{children}</button>
  );
}

// Avatar bubble — single letter, color from friend record
function MBAvatar({ letter, color, size = 28, ring }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background: color, color:'#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: size * 0.42, fontWeight: 700, letterSpacing:'-0.02em',
      boxShadow: ring ? `0 0 0 2px ${ring}, 0 0 0 4px rgba(0,0,0,0.04)` : 'none',
      flexShrink: 0,
    }}>{letter}</div>
  );
}

// Stack of overlapping avatars
function MBAvatarStack({ friends, size = 24, p }) {
  return (
    <div style={{ display:'flex' }}>
      {friends.map((f, i) => (
        <div key={f.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <MBAvatar letter={f.avatar} color={f.color} size={size} ring={p.surface} />
        </div>
      ))}
    </div>
  );
}

// Crowd glyph — one of 5 levels rendered as expanding dot pattern
function MBCrowdGlyph({ level, color = '#3F6B57', size = 14 }) {
  // level 0..4
  const dots = Math.max(1, Math.min(level + 1, 5));
  return (
    <div style={{ display:'flex', gap: 2, alignItems:'center' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{
          width: size * 0.35, height: size * 0.35, borderRadius:'50%',
          background: i < dots ? color : 'currentColor',
          opacity: i < dots ? (0.45 + i * 0.14) : 0.15,
        }}/>
      ))}
    </div>
  );
}

// Crowd label
function crowdLabel(level) {
  return ['Empty','Quiet','Easy','Busy','Packed'][level] || 'Quiet';
}
function crowdColor(level, p) {
  return [p.muted, p.primary, p.primary, p.warn, p.danger][level] || p.primary;
}

// Section header used inside screens
function MBSectionHead({ title, action, p }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'18px 20px 10px' }}>
      <h3 style={{
        margin:0, fontFamily:"'P22 Mackinac', Georgia, serif", fontWeight:500,
        fontSize:18, letterSpacing:'-0.02em', color:p.inkD,
      }}>{title}</h3>
      {action && <span style={{ fontSize:12, fontWeight:600, color:p.primary }}>{action}</span>}
    </div>
  );
}

// Tab bar — shared across all main screens
function MBTabBar({ active, onChange, p }) {
  const tabs = [
    { id:'map',     label:'Map',     icon: 'map' },
    { id:'plan',    label:'Plan',    icon: 'plan' },
    { id:'buddy',   label:'Buddies', icon: 'buddy' },
    { id:'inbox',   label:'Inbox',   icon: 'inbox' },
    { id:'me',      label:'Me',      icon: 'me' },
  ];
  return (
    <div style={{
      borderTop:`1px solid ${p.border}`, background:p.surface,
      padding:'8px 12px 20px', display:'flex', justifyContent:'space-around',
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            background:'transparent', border:'none', padding:'4px 8px', cursor:'pointer',
            color: on ? p.primary : p.muted,
          }}>
            <MBTabIcon kind={t.icon} active={on} color={on ? p.primary : p.muted}/>
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:'0.02em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
function MBTabIcon({ kind, color, active }) {
  const sw = active ? 2 : 1.6;
  switch (kind) {
    case 'map':   return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5.5 8 4l6 2 5-1.5v12L14 18l-6-2-5 1.5v-12Z" stroke={color} strokeWidth={sw} strokeLinejoin="round"/><path d="M8 4v12M14 6v12" stroke={color} strokeWidth={sw}/></svg>;
    case 'plan':  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3.5" y="5" width="15" height="13" rx="2.4" stroke={color} strokeWidth={sw}/><path d="M3.5 9h15" stroke={color} strokeWidth={sw}/><path d="M7 3v3M15 3v3" stroke={color} strokeWidth={sw} strokeLinecap="round"/></svg>;
    case 'buddy': return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="9" r="3" stroke={color} strokeWidth={sw}/><circle cx="15" cy="8" r="2.4" stroke={color} strokeWidth={sw}/><path d="M3 18c.5-2.6 2.6-4.2 5-4.2s4.5 1.6 5 4.2M14 14c2.5 0 4.5 1.4 5 3.6" stroke={color} strokeWidth={sw} strokeLinecap="round"/></svg>;
    case 'inbox': return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6.5C4 5.7 4.7 5 5.5 5h11c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H8L4.5 19v-2.5C4.2 16.3 4 16 4 15.5v-9Z" stroke={color} strokeWidth={sw} strokeLinejoin="round"/></svg>;
    case 'me':    return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8.5" r="3.4" stroke={color} strokeWidth={sw}/><path d="M4 18.5c1-3.4 4-5 7-5s6 1.6 7 5" stroke={color} strokeWidth={sw} strokeLinecap="round"/></svg>;
  }
}

// Amenity icon row
function MBAmenity({ kind, p }) {
  const map = {
    'shade':       { label:'Shade',       glyph:'☂' },
    'toddler-zone':{ label:'Toddlers',    glyph:'△' },
    'restrooms':   { label:'Restrooms',   glyph:'◫' },
    'water':       { label:'Water',       glyph:'≈' },
    'soft-floor':  { label:'Soft floor',  glyph:'▢' },
    'fenced':      { label:'Fenced',      glyph:'⫶' },
    'picnic':      { label:'Picnic',      glyph:'≡' },
    'benches':     { label:'Benches',     glyph:'─' },
    'art':         { label:'Art',         glyph:'◇' },
    'cafe':        { label:'Café',        glyph:'◯' },
    'active':      { label:'Active',      glyph:'⚡' },
    'stroller':    { label:'Stroller',    glyph:'◖' },
    'family':      { label:'Family',      glyph:'❋' },
    'quiet':       { label:'Quiet',       glyph:'○' },
  };
  const a = map[kind] || { label:kind, glyph:'·' };
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', gap:6,
      padding:'10px 6px', minWidth:60, background:p.soft, borderRadius:14,
    }}>
      <span style={{
        fontFamily:'"Geist Mono", ui-monospace, monospace',
        fontSize:18, color:p.primary, fontWeight:600,
      }}>{a.glyph}</span>
      <span style={{ fontSize:10.5, color:p.ink, fontWeight:500 }}>{a.label}</span>
    </div>
  );
}

// Subtle illustrated "park photo" placeholder — different per id
function MBParkArt({ park, p, h = 150 }) {
  const variants = {
    'tree-canopy': () => (
      <g>
        <ellipse cx="50" cy="44" rx="38" ry="18" fill={p.mapPark}/>
        <ellipse cx="35" cy="38" rx="20" ry="14" fill={p.primary} opacity=".7"/>
        <ellipse cx="62" cy="40" rx="22" ry="16" fill={p.primary} opacity=".55"/>
        <rect x="48" y="48" width="3" height="14" fill={p.inkD}/>
      </g>
    ),
    'fountain': () => (
      <g>
        <ellipse cx="50" cy="56" rx="34" ry="6" fill={p.mapWater}/>
        <circle cx="50" cy="42" r="10" fill={p.surface} stroke={p.border}/>
        <path d="M50 28 L50 42 M44 32 L44 42 M56 32 L56 42" stroke={p.primary} strokeWidth="1.6"/>
      </g>
    ),
    'tree-row': () => (
      <g>
        {[18,38,58,78].map((x,i) => (
          <g key={i}>
            <circle cx={x} cy={36} r={11} fill={p.primary} opacity={0.55 + (i%2)*0.2}/>
            <rect x={x-1} y={42} width="2" height="14" fill={p.inkD}/>
          </g>
        ))}
        <rect x="0" y="56" width="100" height="14" fill={p.mapPark}/>
      </g>
    ),
    'mural': () => (
      <g>
        <rect x="0" y="0" width="100" height="60" fill={p.accentSoft}/>
        <rect x="6" y="14" width="22" height="36" fill={p.primary}/>
        <rect x="32" y="22" width="14" height="28" fill={p.danger}/>
        <rect x="52" y="10" width="20" height="40" fill={p.accent}/>
        <rect x="76" y="20" width="18" height="30" fill={p.primaryD}/>
      </g>
    ),
    'rose': () => (
      <g>
        <rect x="0" y="50" width="100" height="20" fill={p.mapPark}/>
        <circle cx="22" cy="40" r="6" fill={p.danger}/>
        <circle cx="40" cy="36" r="7" fill={p.accent}/>
        <circle cx="58" cy="40" r="6" fill={p.danger}/>
        <circle cx="76" cy="36" r="7" fill={p.accent}/>
      </g>
    ),
  };
  const Art = variants[park.image] || variants['tree-canopy'];
  return (
    <div style={{
      width:'100%', height:h, background:p.map, position:'relative',
      borderRadius:16, overflow:'hidden',
    }}>
      <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%' }}>
        <rect x="0" y="0" width="100" height="70" fill={p.map}/>
        <Art/>
      </svg>
      <div style={{
        position:'absolute', left:12, top:12, fontFamily:'"Geist Mono", monospace',
        fontSize:10, fontWeight:600, color:p.muted, background:p.surface,
        padding:'3px 7px', borderRadius:6, opacity:0.85,
      }}>park · {park.image}</div>
    </div>
  );
}

// Helper — get current crowd from "time of day"
function crowdAt(park, hour) {
  return park.crowdByHour[hour] ?? 1;
}

// Make these globals
Object.assign(window, {
  MBStatusBar, MBPill, MBAvatar, MBAvatarStack,
  MBCrowdGlyph, crowdLabel, crowdColor,
  MBSectionHead, MBTabBar, MBAmenity, MBParkArt, crowdAt,
});

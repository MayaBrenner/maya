// Sorbet — UI kit
// Aurora-gradient + editorial-serif visual system for My Buddy.
// Display: Instrument Serif · UI: Hanken Grotesk · Accent: coral.

const SB = {
  ink:     '#3A1D2E',
  inkSoft: 'rgba(58,29,46,0.60)',
  inkFaint:'rgba(58,29,46,0.40)',
  white:   '#FFFFFF',
  accent:  '#FF5C7A',
  accentD: '#E84A68',
  accentSh:'rgba(255,92,122,0.40)',
  peach:   '#FFB778',
  pink:    '#FF89AE',
  lilac:   '#C49BEC',
  yellow:  '#FFD98A',
  yellowD: '#F2B33D',
  green:   '#4FB98A',
  sky:     '#7FB2E6',
  card:    'rgba(255,255,255,0.72)',
  card2:   'rgba(255,255,255,0.82)',
  cardSolid:'rgba(255,255,255,0.95)',
  cardB:   'rgba(255,255,255,0.7)',
  line:    'rgba(58,29,46,0.10)',
  surface: '#FBF3EF',
  surfaceB:'rgba(58,29,46,0.07)',
  serif:   '-apple-system, "SF Pro Display", "SF Pro Text", BlinkMacSystemFont, system-ui, sans-serif',
  ui:      '-apple-system, "SF Pro Text", "SF Pro Display", BlinkMacSystemFont, system-ui, sans-serif',
};

// Aurora mesh presets — soft, grainy, peach→pink→lilac family.
const SB_MESH = {
  warm:  'radial-gradient(110% 80% at 16% 12%, #FFB778 0%, transparent 48%), radial-gradient(110% 80% at 86% 10%, #FF89AE 0%, transparent 46%), radial-gradient(120% 90% at 80% 74%, #C49BEC 0%, transparent 52%), radial-gradient(110% 90% at 12% 88%, #FFD98A 0%, transparent 48%), linear-gradient(160deg, #FCE0CE, #F6D2E0)',
  cool:  'radial-gradient(110% 80% at 18% 12%, #C49BEC 0%, transparent 48%), radial-gradient(110% 80% at 84% 14%, #FF89AE 0%, transparent 46%), radial-gradient(120% 90% at 78% 78%, #FFB778 0%, transparent 52%), radial-gradient(110% 90% at 12% 86%, #FFC7DE 0%, transparent 48%), linear-gradient(160deg, #F3DCEC, #FCE0CE)',
  light: 'radial-gradient(100% 70% at 20% 8%, #FFD3A8 0%, transparent 52%), radial-gradient(100% 70% at 85% 12%, #FFCEDE 0%, transparent 48%), radial-gradient(110% 80% at 80% 82%, #E0CDF2 0%, transparent 54%), linear-gradient(160deg, #FDEFE2, #FBEAF1)',
  coral: 'radial-gradient(110% 80% at 18% 10%, #FF9E7A 0%, transparent 48%), radial-gradient(110% 80% at 84% 14%, #FF7AA6 0%, transparent 46%), radial-gradient(120% 90% at 80% 80%, #C49BEC 0%, transparent 52%), linear-gradient(160deg, #FCD9CC, #F8CFDF)',
};
function sbMesh(kind) { return SB_MESH[kind] || SB_MESH.warm; }

// One-time CSS: grain overlay, range slider, scrollbar.
if (typeof document !== 'undefined' && !document.getElementById('sb-css')) {
  const s = document.createElement('style');
  s.id = 'sb-css';
  s.textContent = `
    .sb-grain::after{content:'';position:absolute;inset:0;pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity:.06;mix-blend-mode:overlay;}
    .sb-scroll::-webkit-scrollbar{width:0;height:0;}
    .sb-range{-webkit-appearance:none;appearance:none;height:6px;border-radius:99px;background:rgba(58,29,46,0.15);outline:none;}
    .sb-range::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:#FF5C7A;cursor:pointer;box-shadow:0 2px 8px rgba(255,92,122,0.5);}
    @keyframes sbpulse{0%{transform:translate(-50%,-50%) scale(.8);opacity:.5}100%{transform:translate(-50%,-50%) scale(1.7);opacity:0}}
    @keyframes sbsway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
    @keyframes sbblink{50%{opacity:0}}
  `;
  document.head.appendChild(s);
}

// ── Background ───────────────────────────────────────
// mode: 'full'  = mesh covers the whole screen (heroes / splash)
//       'fade'  = mesh sits behind the top `fade`px of the hero, then
//                 dissolves into the plain surface (content stays readable)
//       'plain' = solid plain surface, no gradient (content-heavy screens)
function SBg({ kind = 'warm', mode = 'full', fade = 480 }) {
  return (
    <>
      <div style={{ position:'absolute', inset:0, background: SB.surface }}/>
      {mode !== 'plain' && (
        <div className="sb-grain" style={{
          position:'absolute', left:0, right:0, top:0,
          height: mode === 'fade' ? fade : '100%',
          background: sbMesh(kind),
          WebkitMaskImage: mode === 'fade' ? 'linear-gradient(180deg,#000 60%, transparent 100%)' : 'none',
          maskImage: mode === 'fade' ? 'linear-gradient(180deg,#000 60%, transparent 100%)' : 'none',
        }}/>
      )}
    </>
  );
}

// ── Status bar ───────────────────────────────────────
function SBStatus({ light = false }) {
  const c = SB.ink;
  return (
    <div style={{ height:54, padding:'0 30px', display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily:SB.ui, fontWeight:700, fontSize:16, color:c, flexShrink:0, position:'relative', zIndex:2 }}>
      <span>9:41</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="7" width="3" height="5" rx="1" fill={c}/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill={c}/><rect x="9" y="2" width="3" height="10" rx="1" fill={c}/><rect x="13.5" y="0" width="3" height="12" rx="1" fill={c}/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke={c} opacity=".5"/><rect x="2" y="2" width="18" height="8" rx="1.6" fill={c}/><rect x="23.5" y="4" width="1.6" height="4" rx="1" fill={c} opacity=".5"/></svg>
      </div>
    </div>
  );
}

// ── Frosted card ─────────────────────────────────────
function SFrost({ children, tone = 'card', radius = 26, style = {}, onClick }) {
  const bg = tone === 'solid' ? SB.cardSolid : tone === 'card2' ? SB.card2 : SB.card;
  return (
    <div onClick={onClick} style={{
      background:bg, border:`1px solid ${SB.cardB}`, borderRadius:radius,
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      boxShadow:'0 8px 24px rgba(120,60,90,0.08)', ...style,
    }}>{children}</div>
  );
}

// ── Eyebrow label ────────────────────────────────────
function SLabel({ children, light, style = {} }) {
  return <div style={{ fontFamily:SB.ui, fontWeight:700, fontSize:11, letterSpacing:'0.12em',
    textTransform:'uppercase', color: light ? 'rgba(58,29,46,0.66)' : SB.inkSoft, ...style }}>{children}</div>;
}

// ── Serif heading ────────────────────────────────────
function SHead({ children, size = 34, light, italic, style = {} }) {
  return <h1 style={{ margin:0, fontFamily:SB.serif, fontWeight:600, fontSize:size, lineHeight:1.04,
    letterSpacing:'-0.01em', color: SB.ink, fontStyle: italic ? 'italic' : 'normal', ...style }}>{children}</h1>;
}

// ── Pill / chip ──────────────────────────────────────
function SPill({ active, onClick, children, tone = 'default', size = 'md' }) {
  const tones = {
    default: { bg: active ? SB.ink : 'rgba(255,255,255,0.55)', fg: active ? '#fff' : SB.ink, br: active ? SB.ink : SB.cardB },
    sel:     { bg: active ? SB.accent : 'rgba(255,255,255,0.55)', fg: active ? '#fff' : SB.ink, br: active ? SB.accent : SB.cardB },
    light:   { bg: active ? '#fff' : 'rgba(255,255,255,0.25)', fg: active ? SB.ink : '#fff', br: 'rgba(255,255,255,0.6)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:6, fontFamily:SB.ui,
      padding: size === 'sm' ? '7px 12px' : '9px 15px', fontSize: size === 'sm' ? 12.5 : 13.5,
      fontWeight:600, borderRadius:999, border:`1px solid ${t.br}`, background:t.bg, color:t.fg,
      cursor:'pointer', whiteSpace:'nowrap', backdropFilter:'blur(8px)',
    }}>{children}</button>
  );
}

// ── Avatar ───────────────────────────────────────────
function SAvatar({ letter, color, size = 38, ring }) {
  return <div style={{ width:size, height:size, borderRadius:'50%', background:color, color:'#fff',
    display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SB.ui,
    fontSize:size*0.42, fontWeight:700, flexShrink:0, border: ring ? `3px solid ${ring}` : 'none' }}>{letter}</div>;
}
function SAvatarStack({ items, size = 40, ring = '#fff' }) {
  return <div style={{ display:'flex' }}>{items.map((f,i) => (
    <div key={i} style={{ marginLeft: i ? -12 : 0 }}><SAvatar letter={f.letter} color={f.color} size={size} ring={ring}/></div>
  ))}</div>;
}

// Map a crowd level 0..4 → sorbet color
function sbCrowdColor(level) { return [SB.inkFaint, SB.green, SB.green, SB.peach, SB.accent][level] || SB.green; }
function sbCrowdLabel(level) { return ['Empty','Quiet','Easy','Busy','Packed'][level] || 'Quiet'; }
const sbAvatarColors = [SB.peach, SB.pink, SB.lilac, SB.yellowD, SB.green, SB.sky];

// ── Tab bar ──────────────────────────────────────────
function SBTabIcon({ kind, color }) {
  const p = { fill:'none', stroke:color, strokeWidth:1.9, strokeLinejoin:'round', strokeLinecap:'round' };
  switch (kind) {
    case 'home': return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 11 12 4l8 7" {...p}/><path d="M6 10v9h12v-9" {...p}/></svg>;
    case 'plan': return <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3" {...p}/><path d="M4 9.5h16M8.5 3v4M15.5 3v4" {...p}/></svg>;
    case 'inbox':return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H9l-4 3v-3c-.6 0-1-.5-1-1V7Z" {...p}/></svg>;
    case 'me':   return <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.4" {...p}/><path d="M5 19c1-3.4 3.8-5 7-5s6 1.6 7 5" {...p}/></svg>;
  }
}
function SBTabBar({ active = 'home', onNav = () => {} }) {
  const tabs = [{ id:'home', label:'Home' }, { id:'plan', label:'Plan' }];
  const tabs2 = [{ id:'inbox', label:'Inbox' }, { id:'me', label:'Me' }];
  const Item = (t) => {
    const on = t.id === active;
    return <button key={t.id} onClick={() => onNav(t.id)} style={{ flex:1, display:'flex', flexDirection:'column',
      alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', fontFamily:SB.ui,
      fontSize:10, fontWeight:700, letterSpacing:'0.04em', color: on ? SB.accent : SB.inkFaint }}>
      <SBTabIcon kind={t.id} color={on ? SB.accent : SB.inkFaint}/>{t.label}</button>;
  };
  return (
    <div style={{ flexShrink:0, padding:'12px 18px 30px', display:'flex', alignItems:'center',
      background:'rgba(255,255,255,0.86)', backdropFilter:'blur(24px)', borderTop:`1px solid ${SB.cardB}` }}>
      {tabs.map(Item)}
      <button onClick={() => onNav('compose')} aria-label="Create" style={{ width:58, height:58, borderRadius:'50%', background:SB.accent,
        border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        boxShadow:`0 8px 20px ${SB.accentSh}`, margin:'-10px 8px 0' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
      {tabs2.map(Item)}
    </div>
  );
}

// ── Toggle ───────────────────────────────────────────
function SToggle({ on }) {
  return <div style={{ width:46, height:28, borderRadius:999, background: on ? SB.accent : 'rgba(58,29,46,0.18)',
    position:'relative', flexShrink:0, transition:'background .2s' }}>
    <div style={{ position:'absolute', top:3, left: on ? 21 : 3, width:22, height:22, borderRadius:'50%',
      background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,0.25)', transition:'left .2s' }}/></div>;
}

// ── Top bar (wordmark + icons) ───────────────────────
function SBTop({ light = true }) {
  const c = SB.ink;
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 22px 4px', flexShrink:0, position:'relative', zIndex:2 }}>
      <div style={{ fontFamily:SB.serif, fontWeight:600, fontSize:22, color:c, letterSpacing:'-0.01em' }}>My Buddy</div>
      <div style={{ display:'flex', gap:14 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19c1-3.4 3.8-5 7-5s6 1.6 7 5"/></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
      </div>
    </div>
  );
}

Object.assign(window, {
  SB, SB_MESH, sbMesh, SBg, SBStatus, SFrost, SLabel, SHead, SPill,
  SAvatar, SAvatarStack, sbCrowdColor, sbCrowdLabel, sbAvatarColors,
  SBTabBar, SBTabIcon, SToggle, SBTop,
});

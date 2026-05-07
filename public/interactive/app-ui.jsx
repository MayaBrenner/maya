// Home Again — shared UI primitives
// Brand palette: lime, orange, blue, cream, off-white, black.
// Typography: Massilia for headings, DM Sans (body), JetBrains Mono (labels).

const HA_PALETTES = {
  default: {
    bg:      '#F9F8F6',  // off-white page
    surface: '#FFFFFF',
    cream:   '#FBF5E7',  // warm card / image bg
    ink:     '#000000',
    muted:   '#6B6863',
    accent:  '#FF962C',  // orange — primary action accent
    accent2: '#D3D742',  // lime — secondary
    accent3: '#8FA6EC',  // blue — informational
    border:  '#EEEAE0',
    soft:    '#F2EEE3',
  },
  cream: {
    bg:      '#FBF5E7',
    surface: '#FFFFFF',
    cream:   '#F4ECD2',
    ink:     '#000000',
    muted:   '#6B6863',
    accent:  '#FF962C',
    accent2: '#D3D742',
    accent3: '#8FA6EC',
    border:  '#E5DEC4',
    soft:    '#F0E6CC',
  },
  bold: {
    bg:      '#F9F8F6',
    surface: '#000000',
    cream:   '#FBF5E7',
    ink:     '#FFFFFF',
    muted:   '#A8A39A',
    accent:  '#D3D742',
    accent2: '#FF962C',
    accent3: '#8FA6EC',
    border:  '#222',
    soft:    '#111',
  },
};

const HA_FONT  = '"DM Sans", system-ui, -apple-system, sans-serif';
// Massilia Medium — used everywhere we previously used Lora.
// Closest freely-loadable stand-in: Gambarino (Fontshare).
const HA_HEAD  = '"Massilia Medium", "Gambarino", Georgia, serif';
const HA_MONO  = '"Massilia Medium", "Gambarino", Georgia, serif';

function HAStatusPill({ status, palette = HA_PALETTES.default, variant = 'filled', size = 'sm' }) {
  const meta = window.HA_STATUS[status];
  if (!meta) return null;
  const padY = size === 'lg' ? 6 : 3;
  const padX = size === 'lg' ? 12 : 9;
  const fs   = size === 'lg' ? 13 : 11;
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: `${padY}px ${padX}px`,
    borderRadius: 999,
    fontFamily: HA_FONT, fontSize: fs, fontWeight: 600,
    letterSpacing: 0.2, lineHeight: 1, whiteSpace: 'nowrap',
  };
  if (variant === 'dot') {
    return (
      <span style={{ ...base, padding: 0, background: 'transparent', color: '#000' }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: meta.dot }} />
        {meta.label}
      </span>
    );
  }
  return (
    <span style={{ ...base, background: meta.bg, color: meta.fg }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: meta.dot }} />
      {meta.label}
    </span>
  );
}

// Striped placeholder
function HAImage({ tone = '#FBF5E7', accent = '#000', label = '', height = 180, radius = 14, src = null }) {
  const stripeBg = `repeating-linear-gradient(135deg, ${tone} 0 18px, ${shade(tone, -5)} 18px 36px)`;
  return (
    <div style={{
      width: '100%', height, borderRadius: radius, overflow: 'hidden',
      position: 'relative', background: src ? tone : stripeBg,
      border: `0.5px solid rgba(0,0,0,0.08)`,
    }}>
      {src ? (
        <img src={src} alt={label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
          <circle cx="72" cy="32" r="18" fill={accent} opacity="0.4" />
          <rect x="14" y="58" width="40" height="3" fill={accent} opacity="0.5" />
        </svg>
      )}
      {label && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
          <span style={{
            fontFamily: HA_MONO, fontSize: 10, letterSpacing: 0.3,
            color: '#000', background: 'rgba(255,255,255,0.7)',
            padding: '3px 7px', borderRadius: 4,
          }}>{label}</span>
        </div>
      )}
    </div>
  );
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8)  & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function HASellerStrip({ seller, palette = HA_PALETTES.default, compact = false, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: compact ? '8px 0' : '12px 0',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <div style={{
        width: compact ? 32 : 40, height: compact ? 32 : 40, borderRadius: 999,
        background: seller.bg, color: seller.bg === '#000000' ? '#fff' : '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: HA_FONT, fontSize: compact ? 12 : 13.5, fontWeight: 700, letterSpacing: 0.3,
        overflow: 'hidden',
      }}>{seller.avatar
        ? <img src={seller.avatar} alt={seller.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : seller.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: HA_FONT, fontSize: 13.5, fontWeight: 600, color: palette.ink,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{seller.name}</div>
        <div style={{
          fontFamily: HA_FONT, fontSize: 12, color: palette.muted, lineHeight: 1.35,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{seller.from} → {seller.to} · {seller.moveDate}</div>
      </div>
      {onClick && <span style={{ color: palette.muted, fontSize: 18 }}>›</span>}
    </div>
  );
}

function HAButton({ children, variant = 'primary', palette = HA_PALETTES.default, onClick, full, leading, trailing, sub }) {
  const styles = {
    primary:   { bg: palette.ink,     fg: '#fff',         border: 'transparent' },
    secondary: { bg: palette.surface, fg: palette.ink,    border: '#000' },
    ghost:     { bg: 'transparent',   fg: palette.ink,    border: palette.border },
    accent:    { bg: palette.accent,  fg: '#000',         border: 'transparent' },
    lime:      { bg: palette.accent2, fg: '#000',         border: 'transparent' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '14px 18px', borderRadius: 12,
      background: styles.bg, color: styles.fg,
      border: `1px solid ${styles.border}`,
      fontFamily: HA_FONT, fontSize: 15, fontWeight: 600, letterSpacing: 0.1,
      cursor: 'pointer', flexDirection: sub ? 'column' : 'row',
    }}>
      {leading}
      <span>{children}</span>
      {sub && <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.75, marginTop: 2 }}>{sub}</span>}
      {trailing}
    </button>
  );
}

function HALabel({ children, palette = HA_PALETTES.default, style = {} }) {
  return (
    <div style={{
      fontFamily: HA_MONO, fontSize: 10, fontWeight: 500,
      letterSpacing: 1.2, textTransform: 'uppercase', color: palette.muted,
      ...style,
    }}>{children}</div>
  );
}

function HAH1({ children, palette = HA_PALETTES.default, style = {} }) {
  return <h1 style={{ margin: 0, fontFamily: HA_HEAD, fontWeight: 500, fontSize: 24, lineHeight: 1.1, letterSpacing: -0.3, color: palette.ink, ...style }}>{children}</h1>;
}
function HAH2({ children, palette = HA_PALETTES.default, style = {} }) {
  return <h2 style={{ margin: 0, fontFamily: HA_HEAD, fontWeight: 500, fontSize: 20, lineHeight: 1.15, letterSpacing: -0.2, color: palette.ink, ...style }}>{children}</h2>;
}
function HAH3({ children, palette = HA_PALETTES.default, style = {} }) {
  return <h3 style={{ margin: 0, fontFamily: HA_HEAD, fontWeight: 500, fontSize: 16, lineHeight: 1.2, letterSpacing: -0.1, color: palette.ink, ...style }}>{children}</h3>;
}

// Wordmark — Home Again, italic accent
function HAWordmark({ palette = HA_PALETTES.default, size = 22, role }) {
  // role: 'seller' → blue "again", 'buyer' → orange "again", default → palette.accent
  const againColor =
    role === 'seller' ? '#3458D3' :
    role === 'buyer'  ? '#FF962C' :
    palette.accent;
  return (
    <span style={{
      fontFamily: HA_HEAD, fontSize: size, fontWeight: 500, letterSpacing: -0.3, color: palette.ink,
    }}>Home<span style={{ fontStyle: 'italic', color: againColor }}> again</span><span style={{ color: palette.accent, marginLeft: 1 }}>.</span></span>
  );
}

function HATabBar({ active = 'browse', onChange, palette = HA_PALETTES.default, role = 'buyer' }) {
  const middleTab = role === 'seller'
    ? { id: 'post',      label: 'Post',      icon: 'plus' }
    : { id: 'favorites', label: 'Favorites', icon: 'heart' };
  const tabs = [
    { id: 'browse',  label: 'Browse',  icon: 'grid' },
    { id: 'search',  label: 'Search',  icon: 'lens' },
    middleTab,
    { id: 'inbox',   label: 'Inbox',   icon: 'chat' },
    { id: 'me',      label: 'Me',      icon: 'dot'  },
  ];
  const Icon = ({ k, color }) => {
    const s = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (k === 'grid')  return (<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="3" width="6" height="6" rx="1.2" {...s}/><rect x="11" y="3" width="6" height="6" rx="1.2" {...s}/><rect x="3" y="11" width="6" height="6" rx="1.2" {...s}/><rect x="11" y="11" width="6" height="6" rx="1.2" {...s}/></svg>);
    if (k === 'lens')  return (<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5" {...s}/><path d="M13 13l4 4" {...s}/></svg>);
    if (k === 'plus')  return (<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" {...s}/><path d="M11 7v8M7 11h8" {...s}/></svg>);
    if (k === 'heart') return (<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 21 C 6 16 3 13 3 9 a4 4 0 0 1 8 0 a4 4 0 0 1 8 0 c 0 4 -3 7 -9 12 z" {...s}/></svg>);
    if (k === 'chat')  return (<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-4 3v-3H5a2 2 0 01-2-2V5z" {...s}/></svg>);
    if (k === 'dot')   return (<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" {...s}/><path d="M3 17c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" {...s}/></svg>);
  };
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', justifyContent: 'space-around',
      padding: '8px 8px 18px', background: palette.surface,
      borderTop: `0.5px solid ${palette.border}`,
    }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        const color = isActive ? palette.ink : palette.muted;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 4px',
          }}>
            <Icon k={t.icon} color={color}/>
            <span style={{ fontFamily: HA_FONT, fontSize: 10, fontWeight: 600, letterSpacing: 0.3, color }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Star row
function HAStars({ n = 5, size = 12, color = '#FF962C' }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i <= n ? color : 'rgba(0,0,0,0.12)'}>
          <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 8.8 3 10.5l.5-3.5L1 4.5 4.5 4z"/>
        </svg>
      ))}
    </span>
  );
}

function HAAvatar({ seller, size = 40, fontSize, style = {} }) {
  const fs = fontSize || (size <= 18 ? 8 : size <= 24 ? 10 : size <= 36 ? 12 : 14);
  const common = {
    width: size, height: size, borderRadius: 999, flexShrink: 0,
    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
    ...style,
  };
  if (seller && seller.avatar) {
    return (
      <div style={{ ...common, background: seller.bg || '#eee' }}>
        <img src={seller.avatar} alt={seller.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return (
    <div style={{
      ...common,
      background: seller && seller.bg ? seller.bg : '#eee',
      color: seller && seller.bg === '#000000' ? '#fff' : '#000',
      fontFamily: HA_FONT, fontSize: fs, fontWeight: 700, letterSpacing: 0.3,
    }}>{seller ? seller.initials : '?'}</div>
  );
}

Object.assign(window, {
  HA_PALETTES, HA_FONT, HA_HEAD, HA_MONO,
  HAStatusPill, HAImage, HASellerStrip, HAButton,
  HALabel, HAH1, HAH2, HAH3, HAWordmark, HATabBar, HAStars,
  HAAvatar,
  haShade: shade,
});

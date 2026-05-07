// Home Again — screens (part 1): browse, city-search, listing, chat
// All listings now reference sellers by sellerId; sellers come from window.HA_SELLERS.

const _F  = window.HA_FONT;
const _H  = window.HA_HEAD;
const _M  = window.HA_MONO;

function _seller(l) { return window.HA_SELLERS[l.sellerId]; }

// ─── Onboarding ───
function HAOnboarding({ ctx }) {
  const { palette, go } = ctx;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg, padding: '60px 24px 24px', boxSizing: 'border-box' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <HAWordmark palette={palette} size={26} />
        <div style={{ height: 28 }} />
        <h1 style={{
          margin: 0, fontFamily: _H, fontSize: 38, fontWeight: 500,
          lineHeight: 1.05, letterSpacing: -0.6, color: palette.ink,
        }}>Between<br/>two homes.</h1>
        <p style={{
          margin: '20px 0 0', fontFamily: _F, fontSize: 14.5, lineHeight: 1.55,
          color: palette.muted, maxWidth: 280,
        }}>A calmer marketplace for people in transit.
        Sell what you can&apos;t take. Find what you need where you&apos;re landing.</p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            ['Whole sellers, not just listings.', 'See everything one mover is selling — buy a few things, save on the trip.'],
            ['Search by city.',                   'Coming to Jerusalem? Filter to Jerusalem. Pickup is the whole point.'],
            ['Status you can trust.',             'Available, on hold, sold — and an honest "back on market" when a deal lapses.'],
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderTop: `0.5px solid ${palette.border}` }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: i === 0 ? palette.accent : i === 1 ? palette.accent3 : palette.accent2, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _F, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i+1}</span>
              <div>
                <div style={{ fontFamily: _F, fontSize: 13.5, fontWeight: 600, color: palette.ink }}>{row[0]}</div>
                <div style={{ fontFamily: _F, fontSize: 12, color: palette.muted, marginTop: 2, lineHeight: 1.5 }}>{row[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <HAButton palette={palette} variant="primary" full onClick={() => go('browse')}>Get started</HAButton>
        <HAButton palette={palette} variant="ghost" full>I have an account</HAButton>
      </div>
    </div>
  );
}

// ─── Browse feed ───
function HABrowse({ ctx }) {
  const _role = ctx.role;
  const { palette, listings, city, go, density } = ctx;
  const cols = density === 'one' ? 1 : 2;
  const filtered = city && city !== 'all'
    ? listings.filter(l => _seller(l) && _seller(l).city.toLowerCase().replace(' ', '-') === city)
    : listings;

  // Group by seller — Sellers in town first
  const sellerGroups = {};
  filtered.forEach(l => {
    if (!_seller(l)) return;
    if (!sellerGroups[l.sellerId]) sellerGroups[l.sellerId] = [];
    sellerGroups[l.sellerId].push(l);
  });
  const featuredSellers = Object.entries(sellerGroups)
    .filter(([id, ls]) => ls.length >= 2)
    .map(([id, ls]) => ({ seller: window.HA_SELLERS[id], listings: ls }))
    .slice(0, 3);

  const cityLabel = city && city !== 'all'
    ? (window.HA_CITIES.find(c => c.id === city) || { label: 'Tel Aviv' }).label
    : 'Tel Aviv';

  return (
    <div style={{ background: palette.bg, minHeight: '100%' }}>
      <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <HAWordmark palette={palette} size={20} role={_role} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={iconBtn(palette)} onClick={() => go('search')}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={palette.ink} strokeWidth="1.6"/><path d="M13 13l4 4" stroke={palette.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <button style={iconBtn(palette)}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M5 10h10M8 15h4" stroke={palette.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* Hero — large heading + city pill */}
      <div style={{ padding: '4px 16px 14px' }}>
        <h1 style={{ margin: 0, fontFamily: _H, fontSize: 30, lineHeight: 1.05, fontWeight: 500, letterSpacing: -0.5, color: palette.ink }}>
          People leaving<br/>{cityLabel.toLowerCase()}<span style={{ color: palette.accent }}>.</span>
        </h1>
        <div onClick={() => go('search')} style={{
          marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 999, background: palette.surface,
          border: `1px solid ${palette.ink}`, cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1c-2.5 0-4.5 2-4.5 4.5C2.5 8.5 7 13 7 13s4.5-4.5 4.5-7.5C11.5 3 9.5 1 7 1z" stroke="#000" strokeWidth="1.4" fill="none"/>
            <circle cx="7" cy="5.5" r="1.4" fill="#000"/>
          </svg>
          <span style={{ fontFamily: _F, fontSize: 13, fontWeight: 600, color: palette.ink }}>{cityLabel}</span>
          <span style={{ fontFamily: _F, fontSize: 12, color: palette.muted }}>· change</span>
        </div>
        <div style={{ fontFamily: _F, fontSize: 12, color: palette.muted, marginTop: 8 }}>
          {filtered.length} active listings · {Object.keys(sellerGroups).length} sellers in town
        </div>
      </div>

      {/* Featured sellers — "Whole apartments / Whole sellers" rail */}
      {featuredSellers.length > 0 && (
        <div style={{ padding: '4px 0 18px' }}>
          <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <HALabel palette={palette}>Sellers leaving soon</HALabel>
            <span style={{ fontFamily: _F, fontSize: 11, color: palette.muted }}>Buy multiple → save on transport</span>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
            {featuredSellers.map(({ seller, listings }) => (
              <div key={seller.id} onClick={() => go('seller', seller.id)} style={{
                width: 220, flexShrink: 0, background: palette.cream, borderRadius: 14,
                border: `0.5px solid ${palette.border}`, cursor: 'pointer', overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 12px 8px', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <HAAvatar seller={seller} size={32} fontSize={11} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: _F, fontSize: 12.5, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seller.name}</div>
                    <div style={{ fontFamily: _F, fontSize: 10.5, color: palette.muted }}>{seller.from} → {seller.to} · {seller.moveDate}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 12px 12px' }}>
                  {listings.slice(0, 3).map(l => (
                    <HAImage key={l.id} tone={l.imgTone} accent={l.imgAccent} src={l.image} label="" height={56} radius={6} />
                  ))}
                </div>
                <div style={{ padding: '8px 12px 12px', borderTop: `0.5px dashed ${palette.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: _F, fontSize: 11, color: palette.muted }}>{listings.length} items</span>
                  {seller.bundlePrice && (
                    <span style={{ fontFamily: _F, fontSize: 11, fontWeight: 600, color: '#000', background: palette.accent2, padding: '3px 8px', borderRadius: 999 }}>
                      Whole apt · ₪{seller.bundlePrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {window.HA_CATS.map((c, i) => (
          <span key={c.id} style={{
            padding: '7px 14px', borderRadius: 999,
            background: i === 0 ? palette.ink : palette.surface,
            color: i === 0 ? '#fff' : palette.ink,
            border: i === 0 ? 'none' : `1px solid ${palette.border}`,
            fontFamily: _F, fontSize: 12, fontWeight: 600, letterSpacing: 0.2,
            whiteSpace: 'nowrap',
          }}>{c.label}</span>
        ))}
      </div>

      {/* All listings */}
      <div style={{ padding: '0 16px 8px' }}>
        <HALabel palette={palette}>All items in {cityLabel.toLowerCase()}</HALabel>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12,
        padding: '8px 16px 16px',
      }}>
        {filtered.map(l => <HACard key={l.id} listing={l} palette={palette} cols={cols} onClick={() => go('listing', l.id)} />)}
      </div>
    </div>
  );
}

function HACard({ listing, palette, cols, onClick }) {
  const big = cols === 1;
  const seller = _seller(listing);
  return (
    <div onClick={onClick} style={{
      background: palette.surface, borderRadius: 14, overflow: 'hidden',
      border: `0.5px solid ${palette.border}`, cursor: 'pointer',
    }}>
      <div style={{ position: 'relative', filter: listing.status === 'sold' ? 'grayscale(1)' : 'none' }}>
        <HAImage tone={listing.imgTone} accent={listing.imgAccent} src={listing.image} label={listing.image ? '' : listing.cat.toLowerCase()} height={big ? 220 : 140} radius={0} />
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <HAStatusPill status={listing.status} palette={palette} />
        </div>
      </div>
      <div style={{ padding: big ? '12px 14px 14px' : '10px 12px 12px' }}>
        <div style={{
          fontFamily: _F, fontSize: big ? 15 : 13.5, fontWeight: 600,
          color: palette.ink, lineHeight: 1.25,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{listing.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontFamily: _H, fontSize: big ? 16 : 14, fontWeight: 500, color: palette.ink }}>
            ₪{listing.price.toLocaleString()}{listing.priceSuffix || ''}
          </span>
          <span style={{ fontFamily: _F, fontSize: 11, color: palette.muted }}>
            {seller ? seller.area.split(',')[0] : ''}
          </span>
        </div>
        {seller && (
          <div style={{
            marginTop: 8, paddingTop: 8, borderTop: `0.5px solid ${palette.border}`,
            fontFamily: _F, fontSize: 11, color: palette.muted,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <HAAvatar seller={seller} size={16} fontSize={8} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seller.from} → {seller.to} · {seller.moveDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Search by city ───
function HASearch({ ctx }) {
  const { palette, listings, city, setCity, go } = ctx;

  return (
    <div style={{ background: palette.bg, minHeight: '100%', padding: '14px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ ...iconBtn(palette), border: 'none', background: 'transparent' }} onClick={() => go('browse')}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
        </button>
        <div style={{
          flex: 1, height: 42, borderRadius: 999, background: palette.surface,
          border: `1px solid ${palette.ink}`,
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px',
        }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke="#000" strokeWidth="1.6"/><path d="M13 13l4 4" stroke="#000" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: _F, fontSize: 14, color: palette.ink }}>jerusalem</span>
          <span style={{ width: 1.5, height: 16, background: palette.ink, marginLeft: -2, animation: 'haBlink 1s steps(2) infinite' }} />
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <HALabel palette={palette}>Where are you landing?</HALabel>
        <p style={{ margin: '8px 0 14px', fontFamily: _F, fontSize: 12.5, color: palette.muted, lineHeight: 1.5 }}>
          Pickup is the whole point — we&apos;ll only show sellers in the city you choose.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {window.HA_CITIES.map((c) => {
            const active = city === c.id;
            return (
              <button key={c.id} onClick={() => { setCity(c.id); go('browse'); }} style={{
                textAlign: 'left', padding: '14px 14px',
                background: active ? palette.accent : palette.surface,
                color: '#000',
                border: `1px solid ${active ? '#000' : palette.border}`,
                borderRadius: 12, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontFamily: _H, fontSize: 16, fontWeight: 500, letterSpacing: -0.1 }}>{c.label}</span>
                <span style={{ fontFamily: _F, fontSize: 11, color: active ? 'rgba(0,0,0,0.7)' : palette.muted }}>
                  {c.count} {c.count === 1 ? 'seller' : 'sellers'} leaving
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <HALabel palette={palette}>Filter</HALabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {['Furniture', 'Pickup this week', 'Bundled apartments', 'Under ₪1,500'].map((f, i) => (
            <span key={f} style={{
              padding: '7px 12px', borderRadius: 999,
              background: i < 2 ? palette.ink : palette.surface,
              color: i < 2 ? '#fff' : palette.ink,
              border: i < 2 ? 'none' : `1px solid ${palette.border}`,
              fontFamily: _F, fontSize: 12, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {f}
              {i < 2 && <span style={{ opacity: 0.7 }}>×</span>}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <HALabel palette={palette}>Recent</HALabel>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
          {['oak desk', 'kitchen set jerusalem', 'noa harel', 'whole apartment rehavia'].map((q, i, a) => (
            <div key={q} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 0',
              borderBottom: i < a.length - 1 ? `0.5px solid ${palette.border}` : 'none',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v6l4 2" stroke={palette.muted} strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke={palette.muted} strokeWidth="1.4"/></svg>
              <span style={{ flex: 1, fontFamily: _F, fontSize: 13.5, color: palette.ink }}>{q}</span>
              <span style={{ color: palette.muted, fontSize: 16 }}>↗</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Listing detail ───
function HAListing({ ctx, listingId }) {
  const { palette, listings, go } = ctx;
  const l = listings.find(x => x.id === listingId) || listings[0];
  const s = _seller(l);
  const meta = window.HA_STATUS[l.status];
  const onHold = l.status === 'on-hold';
  const sold = l.status === 'sold';
  const back = l.status === 'back-on-market';

  const gallery = (l.images && l.images.length > 0) ? l.images : (l.image ? [l.image] : []);
  const [imgIdx, setImgIdx] = React.useState(0);
  React.useEffect(() => { setImgIdx(0); }, [l.id]);
  const hasMulti = gallery.length > 1;
  const activeSrc = gallery[imgIdx] || l.image;
  const prev = () => setImgIdx(i => (i - 1 + gallery.length) % gallery.length);
  const next = () => setImgIdx(i => (i + 1) % gallery.length);

  return (
    <div style={{ background: palette.bg, minHeight: '100%', paddingBottom: 100 }}>
      <div style={{ position: 'relative' }}>
        <HAImage tone={l.imgTone} accent={l.imgAccent} src={activeSrc} label={activeSrc ? '' : l.cat.toLowerCase()} height={300} radius={0} />
        <button style={{ ...iconBtn(palette), position: 'absolute', top: 12, left: 12, background: '#fff' }} onClick={() => go('browse')}>
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
        </button>
        <button style={{ ...iconBtn(palette), position: 'absolute', top: 12, right: 12, background: '#fff' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 17s-6-4-6-9a3.5 3.5 0 016-2.5A3.5 3.5 0 0116 8c0 5-6 9-6 9z" stroke={palette.ink} strokeWidth="1.6"/></svg>
        </button>
        {hasMulti && (
          <React.Fragment>
            <button onClick={prev} aria-label="Previous photo" style={{
              position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: 999, border: 'none',
              background: 'rgba(255,255,255,0.92)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}>
              <svg width="14" height="14" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={next} aria-label="Next photo" style={{
              position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: 999, border: 'none',
              background: 'rgba(255,255,255,0.92)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}>
              <svg width="14" height="14" viewBox="0 0 20 20"><path d="M8 4l7 6-7 6" stroke={palette.ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </React.Fragment>
        )}
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6 }}>
          {(hasMulti ? gallery : [1,2,3,4]).map((_, i) => (
            <span key={i} style={{ width: 22, height: 3, borderRadius: 999, background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)' }} />
          ))}
        </div>
        {hasMulti && (
          <span style={{ position: 'absolute', bottom: 12, right: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: _F, fontSize: 11, fontWeight: 600 }}>{imgIdx + 1} / {gallery.length}</span>
        )}
      </div>

      {hasMulti && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(gallery.length, 5)}, 1fr)`, gap: 4, padding: '4px 0 0' }}>
          {gallery.slice(0, 5).map((src, i) => (
            <button key={i} onClick={() => setImgIdx(i)} style={{ padding: 0, border: 'none', cursor: 'pointer', height: 64, background: '#000', overflow: 'hidden', position: 'relative', outline: i === imgIdx ? `2px solid ${palette.ink}` : 'none', outlineOffset: -2 }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: i === imgIdx ? 1 : 0.78, display: 'block' }} />
              {i === 4 && gallery.length > 5 && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _F, fontSize: 13, fontWeight: 600 }}>+{gallery.length - 5}</div>
              )}
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <HAH1 palette={palette} style={{ flex: 1 }}>{l.title}</HAH1>
          <HAStatusPill status={l.status} palette={palette} />
        </div>
        <div style={{ marginTop: 8, fontFamily: _H, fontSize: 24, fontWeight: 500, color: palette.ink }}>
          ₪{l.price.toLocaleString()}{l.priceSuffix || ''}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, fontFamily: _F, fontSize: 12, color: palette.muted, flexWrap: 'wrap' }}>
          <span>{l.dims}</span><span>·</span><span>{l.cond}</span><span>·</span><span>{l.posted}</span>
        </div>

        {(onHold || back || sold) && (
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 10,
            background: meta.bg, color: meta.fg,
            fontFamily: _F, fontSize: 12, lineHeight: 1.5,
          }}>
            {onHold && <span><b>Reserved · ends in {l.holdUntil}.</b> {l.waitlist || 0} on waitlist.</span>}
            {back && <span><b>{l.backReason}</b> — available again. First to reserve, holds it.</span>}
            {sold && <span><b>Found a new home.</b> Listing archived.</span>}
          </div>
        )}
      </div>

      {/* Seller card — opens seller page */}
      {s && (
        <div style={{ padding: '14px 18px 0' }}>
          <div onClick={() => go('seller', s.id)} style={{
            padding: 14, background: palette.cream, borderRadius: 14,
            border: `0.5px solid ${palette.border}`, cursor: 'pointer',
          }}>
            <HASellerStrip seller={s} palette={palette} />
            <div style={{ marginTop: 6, paddingTop: 10, borderTop: `0.5px dashed ${palette.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: _F, fontSize: 12.5, color: palette.ink, fontWeight: 600 }}>
                Selling {(window.HA_LISTINGS.filter(x => x.sellerId === s.id) || []).length} items in {s.city}
              </span>
              <span style={{
                padding: '5px 10px', borderRadius: 999,
                background: palette.accent2, color: '#000',
                fontFamily: _F, fontSize: 11, fontWeight: 600,
              }}>See all →</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '18px 18px 0' }}>
        <HALabel palette={palette}>From the seller</HALabel>
        <div style={{ margin: '8px 0 0', fontFamily: _F, fontSize: 14, lineHeight: 1.55, color: palette.ink, whiteSpace: 'pre-wrap' }}>
          {l.notes}
        </div>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <HALabel palette={palette}>Pickup area</HALabel>
        <div style={{
          marginTop: 8, height: 130, borderRadius: 12, position: 'relative', overflow: 'hidden',
          background: 'repeating-linear-gradient(0deg, ' + palette.soft + ' 0 24px, ' + window.haShade(palette.soft, -4) + ' 24px 25px), repeating-linear-gradient(90deg, transparent 0 24px, ' + window.haShade(palette.soft, -4) + ' 24px 25px)',
          border: `0.5px solid ${palette.border}`,
        }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: 999, background: 'rgba(255,150,44,0.16)', border: `1px dashed ${palette.accent}` }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: 999, background: palette.accent }} />
          <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: _F, fontSize: 11, color: palette.ink, background: 'rgba(255,255,255,0.85)', padding: '4px 8px', borderRadius: 4 }}>
            {s ? s.area : '—'} · exact address shared after meetup confirms
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: palette.surface, borderTop: `0.5px solid ${palette.border}`,
        padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {!sold && (
          <div style={{ display: 'flex', gap: 8 }}>
            <HAButton palette={palette} variant="secondary" full onClick={() => go('chat', l.id)}>Ask</HAButton>
            <HAButton palette={palette} variant="secondary" full onClick={() => go('meet', l.id)}>Meet</HAButton>
            <HAButton palette={palette} variant="primary"   full onClick={() => go('reserve', l.id)}>Reserve</HAButton>
          </div>
        )}
        {sold && <HAButton palette={palette} variant="ghost" full>Notify me of similar</HAButton>}
      </div>
    </div>
  );
}

// ─── Per-listing chat ───
function HAChat({ ctx, listingId }) {
  const { palette, listings, go } = ctx;
  const l = listings.find(x => x.id === listingId) || listings[0];
  const s = _seller(l);
  const messages = window.HA_CHAT_MESSAGES;

  return (
    <div style={{ background: palette.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, background: palette.surface, zIndex: 5, borderBottom: `0.5px solid ${palette.border}`, padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button style={{ ...iconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('listing', l.id)}>
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: _F, fontSize: 14, fontWeight: 600, color: palette.ink }}>{s ? s.name : '—'}</div>
            <div style={{ fontFamily: _F, fontSize: 11, color: palette.muted }}>{s ? `${s.from} → ${s.to} · ${s.moveDate}` : ''}</div>
          </div>
        </div>
        <div onClick={() => go('listing', l.id)} style={{ display: 'flex', gap: 10, padding: 8, background: palette.bg, borderRadius: 10, alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, flexShrink: 0 }}>
            <HAImage tone={l.imgTone} accent={l.imgAccent} src={l.image} label="" height={44} radius={6} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: _F, fontSize: 12.5, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
            <div style={{ fontFamily: _F, fontSize: 11, color: palette.muted }}>₪{l.price.toLocaleString()}{l.priceSuffix || ''}</div>
          </div>
          <HAStatusPill status={l.status} palette={palette} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ alignSelf: 'center', fontFamily: _F, fontSize: 11, color: palette.muted, padding: '4px 10px', background: palette.surface, borderRadius: 999, border: `0.5px solid ${palette.border}` }}>
          Today · 13:42
        </div>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '78%',
            background: m.from === 'me' ? '#FF962C' : '#8FA6EC',
            color: '#000',
            padding: '10px 14px', borderRadius: 16,
            borderTopRightRadius: m.from === 'me' ? 4 : 16,
            borderTopLeftRadius:  m.from === 'me' ? 16 : 4,
            fontFamily: _F, fontSize: 14, lineHeight: 1.4,
            border: 'none',
          }}>
            <div style={{ fontFamily: _F, fontSize: 10.5, fontWeight: 600, opacity: 0.7, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {m.from === 'me' ? 'Buyer · you' : 'Seller'}
            </div>
            {m.text}
            <div style={{ fontSize: 10, opacity: 0.6, marginTop: 3, textAlign: 'right' }}>{m.time}</div>
          </div>
        ))}
      </div>

      <div style={{ background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '10px 12px 14px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {window.HA_QUICK_REPLIES.map(q => (
            <span key={q} style={{
              padding: '7px 12px', borderRadius: 999,
              background: palette.bg, color: palette.ink,
              border: `1px solid ${palette.border}`,
              fontFamily: _F, fontSize: 12, fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>{q}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: palette.bg, borderRadius: 999, border: `1px solid ${palette.border}` }}>
          <span style={{ flex: 1, fontFamily: _F, fontSize: 14, color: palette.muted }}>Write a message…</span>
          <button style={{ width: 32, height: 32, borderRadius: 999, background: palette.accent, color: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 20 20"><path d="M3 10l14-7-4 17-4-7-6-3z" fill="#000"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function iconBtn(palette) {
  return {
    width: 36, height: 36, borderRadius: 999,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  };
}

Object.assign(window, {
  HAOnboarding, HABrowse, HACard, HASearch, HAListing, HAChat, haIconBtn: iconBtn, _haSeller: _seller,
});

// Home Again — screens (part 2): seller page, bundle, post listing, meet, reserve, handoff, inbox, my-activity

const _F2 = window.HA_FONT;
const _H2 = window.HA_HEAD;
const _M2 = window.HA_MONO;

// ─── Seller page (their journey + all listings + reviews) ───
function HASellerPage({ ctx, sellerId }) {
  const { palette, listings, go } = ctx;
  const s = window.HA_SELLERS[sellerId] || Object.values(window.HA_SELLERS)[0];
  const myListings = listings.filter((l) => l.sellerId === s.id);
  const reviews = window.HA_REVIEWS[s.id] || [];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      {/* Header banner */}
      <div style={{ position: 'relative', height: 130, background: s.bg, color: s.bg === '#000000' ? '#fff' : '#000' }}>
        <button style={{ ...window.haIconBtn(palette), position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)' }} onClick={() => go('browse')}>
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke="#000" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
        </button>
        <div style={{ position: 'absolute', bottom: -34, left: 18, width: 68, height: 68, borderRadius: 16, overflow: 'hidden', background: s.bg, color: s.bg === '#000000' ? '#fff' : '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _H2, fontSize: 24, fontWeight: 500, border: `3px solid ${palette.bg}` }}>
          {s.avatar ? <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : s.initials}
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 14, fontFamily: _F2, fontSize: 11, opacity: 0.85 }}>
          Member since {s.memberSince}
        </div>
      </div>

      <div style={{ padding: '46px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>{s.name}</h1>
        <div style={{ marginTop: 4, fontFamily: _F2, fontSize: 13, color: palette.muted, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span>{s.area}</span>
          <span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <svg width="11" height="11" viewBox="0 0 11 11"><path d="M5.5 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L5.5 8.2 2.7 9.6l.5-3.1L1 4.3l3.1-.5z" fill={palette.accent} /></svg>
            {s.rating ?? '—'} {s.reviewCount ? `(${s.reviewCount} reviews)` : ''}
          </span>
        </div>

        {/* Journey strip */}
        <div style={{ marginTop: 14, padding: 14, background: palette.cream, borderRadius: 14, border: `0.5px solid ${palette.border}` }}>
          <HALabel palette={palette}>Their chapter</HALabel>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Leaving</div>
              <div style={{ fontFamily: _H2, fontSize: 16, fontWeight: 500, color: palette.ink, marginTop: 2 }}>{s.from}</div>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: palette.accent }} />
              <span style={{ width: 22, height: 1, background: palette.ink }} />
              <span style={{ fontFamily: _F2, fontSize: 11, color: palette.ink, fontWeight: 600 }}>{s.moveDate}</span>
              <span style={{ width: 22, height: 1, background: palette.ink }} />
              <span style={{ width: 6, height: 6, borderRadius: 999, background: palette.accent2 }} />
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Going</div>
              <div style={{ fontFamily: _H2, fontSize: 16, fontWeight: 500, color: palette.ink, marginTop: 2 }}>{s.to}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: `0.5px dashed ${palette.border}`, fontFamily: _F2, fontSize: 12.5, lineHeight: 1.55, color: palette.ink }}>
            "{s.bio}"
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
          {[
          ['Items left', myListings.filter((l) => l.status === 'available' || l.status === 'back-on-market').length],
          ['Sold via Home Again', s.soldCount],
          ['Avg reply', s.avgReply]].
          map(([k, v], i) =>
          <div key={k} style={{ background: palette.surface, padding: '12px 10px', borderRadius: 10, border: `0.5px solid ${palette.border}` }}>
              <div style={{ fontFamily: _H2, fontSize: 18, fontWeight: 500, color: palette.ink }}>{v}</div>
              <div style={{ fontFamily: _F2, fontSize: 10.5, color: palette.muted, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 }}>{k}</div>
            </div>
          )}
        </div>

        {/* Whole apartment / bundle CTA */}
        {s.bundlePrice &&
        <div onClick={() => go('bundle', s.id)} style={{
          marginTop: 14, padding: 16, borderRadius: 14,
          background: palette.accent2, color: '#000', cursor: 'pointer',
          border: `1px solid #000`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <HALabel palette={{ ...palette, muted: 'rgba(0,0,0,0.7)' }}>Take the whole place</HALabel>
                <div style={{ marginTop: 8, fontFamily: _H2, fontSize: 20, fontWeight: 500, letterSpacing: -0.2 }}>
                  {myListings.length} items · ₪{s.bundlePrice.toLocaleString()}
                </div>
                <div style={{ marginTop: 4, fontFamily: _F2, fontSize: 12, lineHeight: 1.5 }}>
                  Save ₪{(myListings.reduce((sum, l) => sum + l.price, 0) - s.bundlePrice).toLocaleString()} vs buying separately. One pickup, one transport.
                </div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>→</div>
            </div>
          </div>
        }

        {/* Selling */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <HALabel palette={palette}>Selling · {myListings.length}</HALabel>
            <span style={{ fontFamily: _F2, fontSize: 11, color: palette.muted }}>Tap to add to a bundle</span>
          </div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {myListings.map((l) =>
            <div key={l.id} onClick={() => go('listing', l.id)} style={{ background: palette.surface, borderRadius: 12, overflow: 'hidden', border: `0.5px solid ${palette.border}`, cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <HAImage tone={l.imgTone} accent={l.imgAccent} src={l.image} label={l.image ? '' : l.cat.toLowerCase()} height={110} radius={0} />
                  <div style={{ position: 'absolute', top: 6, left: 6 }}>
                    <HAStatusPill status={l.status} palette={palette} />
                  </div>
                </div>
                <div style={{ padding: '8px 10px 10px' }}>
                  <div style={{ fontFamily: _F2, fontSize: 12.5, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                  <div style={{ marginTop: 2, fontFamily: _H2, fontSize: 13, fontWeight: 500, color: palette.ink }}>₪{l.price.toLocaleString()}{l.priceSuffix || ''}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <HALabel palette={palette}>Reviews · {s.reviewCount}</HALabel>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: _F2, fontSize: 12, color: palette.ink }}>
              <svg width="12" height="12" viewBox="0 0 11 11"><path d="M5.5 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L5.5 8.2 2.7 9.6l.5-3.1L1 4.3l3.1-.5z" fill={palette.accent} /></svg>
              <b>{s.rating}</b>
            </div>
          </div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviews.map((r, i) =>
            <div key={i} style={{ background: palette.surface, padding: 12, borderRadius: 10, border: `0.5px solid ${palette.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 999, background: '#FF962C', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _F2, fontSize: 10, fontWeight: 700 }}>{r.from.split(' ').map(w => w[0]).slice(0,2).join('')}</div>
                    <span style={{ fontFamily: _F2, fontSize: 12.5, fontWeight: 600, color: palette.ink }}>{r.from}</span>
                  </div>
                  <div style={{ display: 'inline-flex', gap: 1 }}>
                    {[1, 2, 3, 4, 5].map((n) =>
                  <svg key={n} width="11" height="11" viewBox="0 0 11 11"><path d="M5.5 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L5.5 8.2 2.7 9.6l.5-3.1L1 4.3l3.1-.5z" fill={n <= r.stars ? palette.accent : palette.border} /></svg>
                  )}
                  </div>
                </div>
                <div style={{ marginTop: 6, fontFamily: _F2, fontSize: 12.5, lineHeight: 1.5, color: palette.ink }}>"{r.text}"</div>
                <div style={{ marginTop: 6, fontFamily: _F2, fontSize: 11, color: palette.muted }}>For {r.item} · {r.when}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>

      <div style={{ background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px', display: 'flex', gap: 8, flexShrink: 0 }}>
        <HAButton palette={palette} variant="secondary" full>Message {s.name.split(' ')[0]}</HAButton>
        {s.bundlePrice && <HAButton palette={palette} variant="primary" full onClick={() => go('bundle', s.id)}>Bundle deal</HAButton>}
      </div>
    </div>);

}

// ─── Bundle / whole-apartment screen ───
function HABundle({ ctx, sellerId }) {
  const { palette, listings, go } = ctx;
  const s = window.HA_SELLERS[sellerId] || Object.values(window.HA_SELLERS)[0];
  const myListings = listings.filter((l) => l.sellerId === s.id);
  const total = myListings.reduce((sum, l) => sum + l.price, 0);
  const save = total - (s.bundlePrice || total);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ ...window.haIconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('seller', s.id)}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
        </button>
        <HALabel palette={palette}>Bundle from {s.name.split(' ')[0]}</HALabel>
      </div>
      <div style={{ padding: '10px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          Take the whole place,<br />save ₪{save.toLocaleString()}.
        </h1>
        <p style={{ margin: '8px 0 0', fontFamily: _F2, fontSize: 13, color: palette.muted, lineHeight: 1.55 }}>
          {s.name.split(' ')[0]} is leaving {s.from} on {s.moveDate}. Buy the {myListings.length} items together, pick up in one trip from {s.area}.
        </p>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ background: palette.surface, borderRadius: 14, border: `0.5px solid ${palette.border}`, overflow: 'hidden' }}>
          {myListings.map((l, i) =>
          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: i < myListings.length - 1 ? `0.5px solid ${palette.border}` : 'none' }}>
              <div style={{ width: 56, height: 56, flexShrink: 0 }}>
                <HAImage tone={l.imgTone} accent={l.imgAccent} src={l.image} label="" height={56} radius={8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: _F2, fontSize: 13, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, marginTop: 2 }}>{l.dims} · {l.cond}</div>
              </div>
              <div style={{ fontFamily: _H2, fontSize: 14, fontWeight: 500, color: palette.ink, textAlign: 'right' }}>
                ₪{l.price.toLocaleString()}
              </div>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: palette.accent, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '14px 18px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
        ['Items separately', `₪${total.toLocaleString()}`, palette.muted, true],
        ['Bundle discount', `– ₪${save.toLocaleString()}`, palette.ink, false],
        ['Suggested transport (shared)', '₪260', palette.ink, false]].
        map(([k, v, color, strike]) =>
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: _F2, fontSize: 13, color }}>
            <span>{k}</span>
            <span style={{ textDecoration: strike ? 'line-through' : 'none' }}>{v}</span>
          </div>
        )}
        <div style={{ borderTop: `0.5px solid ${palette.border}`, marginTop: 6, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: _F2, fontSize: 13, fontWeight: 600, color: palette.ink }}>Bundle total</span>
          <span style={{ fontFamily: _H2, fontSize: 22, fontWeight: 500, color: palette.ink }}>₪{((s.bundlePrice || total) + 260).toLocaleString()}</span>
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ padding: 12, background: palette.cream, borderRadius: 10, border: `0.5px dashed ${palette.border}`, fontFamily: _F2, fontSize: 12, lineHeight: 1.5, color: palette.ink }}>
          <b>How a bundle works.</b> 20% deposit holds all items for 48h. One meetup, one handoff, one escrow release. If anything is missing on pickup, the deposit is refunded.
        </div>
      </div>

      </div>

      <div style={{ background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px', display: 'flex', gap: 8, flexShrink: 0 }}>
        <HAButton palette={palette} variant="secondary" full>Adjust items</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('reserve')}>Reserve bundle · 20%</HAButton>
      </div>
    </div>);

}

// ─── Post listing (seller side) ───
function HAPost({ ctx }) {
  const { palette, go } = ctx;

  return (
    <div style={{ background: palette.bg, minHeight: '100%', paddingBottom: 100 }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ ...window.haIconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('browse')}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M5 15L15 5" stroke={palette.ink} strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <span style={{ fontFamily: _F2, fontSize: 13, color: palette.muted }}>Step 2 of 4</span>
        <span style={{ fontFamily: _F2, fontSize: 13, color: palette.ink, fontWeight: 600 }}>Save draft</span>
      </div>

      <div style={{ padding: '8px 18px 0' }}>
        <div style={{ height: 4, borderRadius: 999, background: palette.border, overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', background: palette.ink }} />
        </div>
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          What are you<br />letting go of?
        </h1>
        <p style={{ margin: '8px 0 0', fontFamily: _F2, fontSize: 13, color: palette.muted, lineHeight: 1.5 }}>
          Photos, a price, a few honest details. The story of why you&apos;re selling lives on your seller page.
        </p>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <HALabel palette={palette}>Photos</HALabel>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {[
            'img/whole-apt-1.png','img/whole-apt-2.png','img/whole-apt-3.png',
            'img/whole-apt-4.png','img/whole-apt-5.png','img/whole-apt-6.png','img/whole-apt-7.png'
          ].map((src, i) => (
            <div key={src} style={{ aspectRatio: '1/1', borderRadius: 8, position: 'relative', overflow: 'hidden', background: '#000' }}>
              <img src={(window.__r||(p=>p))(src)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {i === 0 && (
                <div style={{ position: 'absolute', top: 4, left: 4, padding: '2px 6px', background: '#000', color: '#fff', borderRadius: 4, fontFamily: _F2, fontSize: 9, fontWeight: 700, letterSpacing: 0.4 }}>COVER</div>
              )}
            </div>
          ))}
          <div style={{ aspectRatio: '1/1', borderRadius: 8, border: `1px dashed ${palette.border}`, background: palette.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.muted, fontFamily: _F2, fontSize: 24 }}>+</div>
        </div>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <HALabel palette={palette}>Title</HALabel>
        <div style={{ marginTop: 8, padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `1px solid ${palette.ink}`, fontFamily: _F2, fontSize: 15, color: palette.ink }}>
          Whole apartment furnitures
          <span style={{ display: 'inline-block', width: 1.5, height: 16, background: palette.ink, marginLeft: 1, verticalAlign: 'middle', animation: 'haBlink 1s steps(2) infinite' }} />
        </div>
      </div>

      <div style={{ padding: '14px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <HALabel palette={palette}>Price (₪)</HALabel>
          <div style={{ marginTop: 8, padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}`, fontFamily: _H2, fontSize: 18, fontWeight: 500, color: palette.ink }}>1,200</div>
          <span style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, marginTop: 4, display: 'block' }}>similar items: ₪900–1,400</span>
        </div>
        <div>
          <HALabel palette={palette}>Condition</HALabel>
          <div style={{ marginTop: 8, padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}`, fontFamily: _F2, fontSize: 14, color: palette.ink }}>Lightly used</div>
        </div>
      </div>

      <div style={{ padding: '14px 18px 0' }}>
        <HALabel palette={palette}>Notes from you</HALabel>
        <div style={{ marginTop: 8, padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}`, minHeight: 80, fontFamily: _F2, fontSize: 13.5, lineHeight: 1.55, color: palette.ink, whiteSpace: 'pre-line' }}>
          {`Following a move to Copenhagen, we are selling quite a few quality furniture and equipment:
a sofa,
bar stools,
office chair,
a double mattress from Polyron,
two baby beds that also convert into transitional beds,
and much more.
You can get more pictures and details in private`}
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <HALabel palette={palette}>Pickup window</HALabel>
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['This week', 'Before Mar 15', 'Flexible'].map((p, i) =>
          <span key={p} style={{
            padding: '8px 14px', borderRadius: 999,
            background: i === 1 ? palette.ink : palette.surface,
            color: i === 1 ? '#fff' : palette.ink,
            border: i === 1 ? 'none' : `1px solid ${palette.border}`,
            fontFamily: _F2, fontSize: 12, fontWeight: 600
          }}>{p}</span>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ padding: 12, background: palette.cream, borderRadius: 10, fontFamily: _F2, fontSize: 12, lineHeight: 1.5, color: palette.ink, display: 'flex', gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: palette.accent2, color: '#000', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>i</div>
          <div>This item will appear on <b>your seller page</b> alongside your 4 other listings. Buyers in {window.HA_SELLERS.maya.city} can find you by city or by browsing.</div>
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px', display: 'flex', gap: 8, marginTop: 16, zIndex: 5 }}>
        <HAButton palette={palette} variant="secondary" full>Back</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('browse')}>Continue · Pickup</HAButton>
      </div>
    </div>);

}

// ─── Meet — propose 3 slots ───
function HAMeet({ ctx, listingId }) {
  const { palette, listings, go } = ctx;
  const l = listings.find((x) => x.id === listingId) || listings[0];
  const s = window._haSeller(l);
  const slots = [
  { day: 'Wed', date: 'Mar 11', time: '18:00', dur: '20 min' },
  { day: 'Thu', date: 'Mar 12', time: '11:30', dur: '20 min' },
  { day: 'Sat', date: 'Mar 14', time: '14:00', dur: '20 min' }];


  return (
    <div style={{ background: palette.bg, minHeight: '100%', paddingBottom: 100 }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ ...window.haIconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('listing', l.id)}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
        </button>
        <HALabel palette={palette}>Propose a meetup</HALabel>
      </div>

      <div style={{ padding: '10px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          When works for you?
        </h1>
        <p style={{ margin: '6px 0 0', fontFamily: _F2, fontSize: 12.5, color: palette.muted, lineHeight: 1.5 }}>
          Suggest three slots. {s ? s.name.split(' ')[0] : 'The seller'} picks one, then you&apos;ll get the exact address.
        </p>
      </div>

      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {slots.map((sl, i) =>
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px',
          background: palette.surface, borderRadius: 14,
          border: i === 0 ? `1px solid ${palette.ink}` : `0.5px solid ${palette.border}`
        }}>
            <div style={{
            width: 50, height: 50, borderRadius: 10,
            background: i === 0 ? palette.ink : palette.cream,
            color: i === 0 ? '#fff' : palette.ink,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
              <span style={{ fontFamily: _F2, fontSize: 9, fontWeight: 700, letterSpacing: 0.6 }}>{sl.day.toUpperCase()}</span>
              <span style={{ fontFamily: _H2, fontSize: 16, fontWeight: 500, marginTop: 1 }}>{sl.date.split(' ')[1]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: _F2, fontSize: 14, fontWeight: 600, color: palette.ink }}>{sl.time}</div>
              <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted }}>{sl.date} · approx {sl.dur}</div>
            </div>
            <span style={{ width: 18, height: 18, borderRadius: 999, border: `1.5px solid ${i === 0 ? palette.ink : palette.border}`, background: i === 0 ? palette.ink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i === 0 && <span style={{ width: 6, height: 6, borderRadius: 999, background: palette.accent }} />}
            </span>
          </div>
        )}
        <button style={{
          padding: '12px 14px', background: 'transparent', border: `1px dashed ${palette.border}`,
          borderRadius: 12, fontFamily: _F2, fontSize: 13, color: palette.muted,
          textAlign: 'center', cursor: 'pointer'
        }}>+ Suggest another slot</button>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <HALabel palette={palette}>Where</HALabel>
        <div style={{ marginTop: 8, padding: 14, background: palette.cream, borderRadius: 12, border: `0.5px solid ${palette.border}` }}>
          <div style={{ fontFamily: _F2, fontSize: 13.5, color: palette.ink, fontWeight: 600 }}>{s ? s.area : '—'}</div>
          <div style={{ marginTop: 4, fontFamily: _F2, fontSize: 12, color: palette.muted, lineHeight: 1.5 }}>
            Exact address shared after the seller confirms. Bring a friend if it&apos;s a large item.
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px' }}>
        <HAButton palette={palette} variant="primary" full onClick={() => go('reserve', l.id)}>Send proposal</HAButton>
      </div>
    </div>);

}

// ─── Reserve & pay ───
function HAReserve({ ctx, listingId }) {
  const { palette, listings, go } = ctx;
  const l = listings.find((x) => x.id === listingId) || listings[0];
  const s = window._haSeller(l);
  const deposit = Math.round(l.price * 0.2);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ ...window.haIconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('listing', l.id)}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4l-7 6 7 6" stroke={palette.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
        </button>
        <HALabel palette={palette}>Reserve & pay</HALabel>
      </div>

      <div style={{ padding: '10px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          Hold it for 48 hours.
        </h1>
        <p style={{ margin: '6px 0 0', fontFamily: _F2, fontSize: 12.5, color: palette.muted, lineHeight: 1.55 }}>
          A 20% deposit takes it off the market while you sort out the meetup. Held in escrow until handoff. Full refund if the meetup doesn&apos;t happen.
        </p>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}` }}>
          <div style={{ width: 56, height: 56, flexShrink: 0 }}>
            <HAImage tone={l.imgTone} accent={l.imgAccent} src={l.image} label="" height={56} radius={8} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: _F2, fontSize: 13, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
            <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted }}>{s ? s.name : ''} · {s ? s.area : ''}</div>
          </div>
          <div style={{ fontFamily: _H2, fontSize: 16, fontWeight: 500, color: palette.ink }}>₪{l.price.toLocaleString()}{l.priceSuffix || ''}</div>
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <HALabel palette={palette}>Breakdown</HALabel>
        <div style={{ marginTop: 8, background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}`, padding: '14px 16px' }}>
          {[
          ['Deposit (20%, escrow)', `₪${deposit.toLocaleString()}`, true],
          ['Due at handoff', `₪${(l.price - deposit).toLocaleString()}`, false],
          ['Service fee', '₪0', false]].
          map(([k, v, bold]) =>
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: _F2, fontSize: 13, color: bold ? palette.ink : palette.muted, fontWeight: bold ? 600 : 400 }}>
              <span>{k}</span><span>{v}</span>
            </div>
          )}
          <div style={{ marginTop: 6, paddingTop: 10, borderTop: `0.5px solid ${palette.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: _H2, fontSize: 18, fontWeight: 500, color: palette.ink }}>
            <span>Charged today</span>
            <span>₪{deposit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <HALabel palette={palette}>Pay with</HALabel>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `1px solid ${palette.ink}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 24, borderRadius: 4, background: palette.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _M2, fontSize: 8, fontWeight: 700 }}>VISA</div>
            <div style={{ flex: 1, fontFamily: _F2, fontSize: 13, color: palette.ink }}>•••• •••• •••• 4218</div>
            <span style={{ width: 18, height: 18, borderRadius: 999, background: palette.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</span>
          </div>
          <div style={{ padding: '14px 16px', background: palette.surface, borderRadius: 12, border: `0.5px solid ${palette.border}`, display: 'flex', alignItems: 'center', gap: 12, color: palette.muted, fontFamily: _F2, fontSize: 13 }}>
            <span style={{ fontSize: 16 }}>+</span>
            Add Apple Pay / Bit
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ padding: 12, background: palette.cream, borderRadius: 10, fontFamily: _F2, fontSize: 11.5, lineHeight: 1.5, color: palette.ink }}>
          <b>How escrow works.</b> Your ₪{deposit.toLocaleString()} is held by Home Again, not the seller. Both parties confirm the handoff in-app, and the full ₪{l.price.toLocaleString()} releases to the seller. If the meetup falls through, you&apos;re refunded — no disputes.
        </div>
      </div>

      </div>

      <div style={{ background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px', flexShrink: 0 }}>
        <HAButton palette={palette} variant="primary" full onClick={() => go('handoff', l.id)}>Reserve · ₪{deposit.toLocaleString()}</HAButton>
      </div>
    </div>);

}

// ─── Handoff confirmation ───
function HAHandoff({ ctx, listingId }) {
  const { palette, listings, go } = ctx;
  const l = listings.find((x) => x.id === listingId) || listings[0];
  const s = window._haSeller(l);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ ...window.haIconBtn(palette), background: 'transparent', border: 'none' }} onClick={() => go('listing', l.id)}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M5 15L15 5" stroke={palette.ink} strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <HALabel palette={palette}>Handoff</HALabel>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: palette.accent, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#000" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 style={{ margin: '14px 0 0', fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          You&apos;re reserved.<br />Now meet, then confirm.
        </h1>
        <p style={{ margin: '8px 0 0', fontFamily: _F2, fontSize: 13, color: palette.muted, lineHeight: 1.55 }}>
          {s ? s.name.split(' ')[0] : 'Seller'} got your proposal. Once you both arrive and the item changes hands, both of you tap <b>Confirm handoff</b> here.
        </p>
      </div>

      {/* Step tracker */}
      <div style={{ padding: '20px 18px 0' }}>
        <HALabel palette={palette}>Where you are</HALabel>
        <div style={{ marginTop: 12 }}>
          {[
          { label: 'Reserved · ₪200 in escrow', sub: 'Just now', done: true, key: 'a' },
          { label: 'Meetup confirmed by seller', sub: 'Wed Mar 11, 18:00', done: true, key: 'b' },
          { label: 'Address revealed', sub: '4 Ahad Ha&apos;am, Tel Aviv', done: true, key: 'c', current: false },
          { label: 'Both confirm handoff', sub: 'Tap together at meetup', done: false, current: true, key: 'd' },
          { label: 'Escrow releases', sub: 'Full payment to seller', done: false, key: 'e' }].
          map((st, i, a) =>
          <div key={st.key} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                width: 22, height: 22, borderRadius: 999,
                background: st.done ? palette.ink : st.current ? palette.accent : 'transparent',
                border: st.done || st.current ? 'none' : `1.5px solid ${palette.border}`,
                color: st.done ? '#fff' : '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: _F2, fontSize: 11, fontWeight: 700
              }}>
                  {st.done ? '✓' : st.current ? <span style={{ width: 8, height: 8, borderRadius: 999, background: '#000' }} /> : ''}
                </div>
                {i < a.length - 1 && <div style={{ width: 1.5, flex: 1, minHeight: 28, background: palette.border, marginTop: 2 }} />}
              </div>
              <div style={{ paddingBottom: 14, flex: 1 }}>
                <div style={{ fontFamily: _F2, fontSize: 13.5, fontWeight: st.current ? 600 : 500, color: st.done || st.current ? palette.ink : palette.muted }} dangerouslySetInnerHTML={{ __html: st.label }} />
                <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, marginTop: 2 }} dangerouslySetInnerHTML={{ __html: st.sub }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '8px 18px 0' }}>
        <div style={{ padding: 14, background: palette.surface, borderRadius: 14, border: `0.5px solid ${palette.border}` }}>
          <HALabel palette={palette}>Meetup details</HALabel>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: _F2, fontSize: 13, fontWeight: 600, color: palette.ink }}>Wed, Mar 11 · 18:00</div>
              <div style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, marginTop: 2 }}>4 Ahad Ha&apos;am, Tel Aviv (Florentin)</div>
            </div>
            <span style={{ padding: '4px 8px', borderRadius: 999, background: palette.accent3, color: '#000', fontFamily: _F2, fontSize: 10, fontWeight: 700 }}>IN 2 DAYS</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <HAButton palette={palette} variant="ghost" full>Open in maps</HAButton>
            <HAButton palette={palette} variant="ghost" full>Add to calendar</HAButton>
          </div>
        </div>
      </div>

      </div>

      <div style={{ background: palette.surface, borderTop: `0.5px solid ${palette.border}`, padding: '12px 16px 16px', display: 'flex', gap: 8, flexShrink: 0 }}>
        <HAButton palette={palette} variant="secondary" full onClick={() => go('chat', l.id)}>Message</HAButton>
        <HAButton palette={palette} variant="primary" full>Confirm handoff</HAButton>
      </div>
    </div>);

}

// ─── Inbox / activity ───
function HAInbox({ ctx }) {
  const { palette, listings, go } = ctx;
  const tabs = ['Buying', 'Selling', 'Saved'];

  const items = [
  { lid: 'sofa', last: 'Maya: yes! happy to drop the price if you can pick up Saturday.', unread: 2, time: '2h', tag: 'Reserved' },
  { lid: 'desk', last: 'You: is the chair included?', unread: 0, time: '5h', tag: null },
  { lid: 'vespa', last: 'Ariel: comes with two helmets and a fresh service.', unread: 1, time: 'Yesterday', tag: 'On hold' },
  { lid: 'sublease', last: 'You: looks great — when can we view it?', unread: 0, time: 'Mar 5', tag: null },
  { lid: 'lamp', last: 'Maya: it&apos;s in the bundle now! save ₪200', unread: 0, time: 'Mar 4', tag: 'Bundle' }];


  return (
    <div style={{ background: palette.bg, minHeight: '100%' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: _H2, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>Activity</h1>
        <button style={window.haIconBtn(palette)}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={palette.ink} strokeWidth="1.6" /><path d="M13 13l4 4" stroke={palette.ink} strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div style={{ padding: '14px 18px 0', display: 'flex', gap: 6 }}>
        {tabs.map((t, i) =>
        <span key={t} style={{
          padding: '7px 14px', borderRadius: 999,
          background: i === 0 ? palette.ink : 'transparent',
          color: i === 0 ? '#fff' : palette.ink,
          border: i === 0 ? 'none' : `0.5px solid ${palette.border}`,
          fontFamily: _F2, fontSize: 12.5, fontWeight: 600
        }}>{t}</span>
        )}
      </div>

      <div style={{ padding: '14px 0 0' }}>
        {items.map((it, i) => {
          const l = listings.find((x) => x.id === it.lid) || listings[0];
          const s = window._haSeller(l);
          return (
            <div key={i} onClick={() => go('chat', l.id)} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '12px 18px',
              borderTop: `0.5px solid ${palette.border}`,
              cursor: 'pointer'
            }}>
              <div style={{ width: 52, height: 52, flexShrink: 0, position: 'relative' }}>
                <HAImage tone={l.imgTone} accent={l.imgAccent} src={l.image} label="" height={52} radius={10} />
                {it.unread > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 999, background: palette.accent2, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: _F2, fontSize: 10, fontWeight: 700, border: `2px solid ${palette.bg}` }}>{it.unread}</span>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: _F2, fontSize: 13.5, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s ? s.name : '—'} · {l.title.split('·')[0].trim()}</span>
                  <span style={{ fontFamily: _F2, fontSize: 11, color: palette.muted, flexShrink: 0 }}>{it.time}</span>
                </div>
                <div style={{ marginTop: 2, fontFamily: _F2, fontSize: 12.5, color: it.unread > 0 ? palette.ink : palette.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: it.last }} />
                {it.tag &&
                <span style={{ marginTop: 6, display: 'inline-block', padding: '3px 8px', borderRadius: 999, background: palette.cream, color: palette.ink, fontFamily: _F2, fontSize: 10.5, fontWeight: 600 }}>{it.tag}</span>
                }
              </div>
            </div>);

        })}
      </div>
    </div>);

}

Object.assign(window, { HASellerPage, HABundle, HAPost, HAMeet, HAReserve, HAHandoff, HAInbox });
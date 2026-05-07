// Home Again — Buyer profile (Me tab)
// Tabs: Negotiations · Favorites · Messages · Settings

const _Fb = window.HA_FONT;
const _Hb = window.HA_HEAD;
const _Mb = window.HA_MONO;

function HABuyerMe({ ctx, initialTab }) {
  const { palette, listings, go } = ctx;
  const [tab, setTab] = React.useState(initialTab || 'Negotiations');

  const tabs = ['Negotiations', 'Favorites', 'Messages', 'Settings'];

  // Buyer is moving _into_ Tel Aviv — pretend it's "me"
  const me = {
    name: 'Daniel Sharon',
    initials: 'DS',
    role: 'buyer',
    accent: '#FF962C', // buyer color
    landingCity: 'Tel Aviv',
    moveDate: 'Apr 14',
    saved: ['l-sofa', 'l-lamp', 'l-desk', 'l-rug', 'l-vespa'],
    activity: [
      // pipeline: chatting → reserved → won → lost
      { listingId: 'l-sofa',   stage: 'reserved',  step: 'Reserve · escrow', when: 'just now',         note: 'Meet Wed 1\u20133pm', color: palette.accent2 },
      { listingId: 'l-rug',    stage: 'meeting',   step: 'Meet \u00b7 Thu 6pm', when: '2h ago',         note: 'Slot picked',         color: palette.accent3 },
      { listingId: 'l-desk',   stage: 'asked',     step: 'Asked',            when: 'yesterday',         note: 'Awaiting reply',      color: palette.accent },
      { listingId: 'l-vespa',  stage: 'asked',     step: 'On hold queue',    when: '3d ago',            note: '#2 in line',          color: palette.accent },
      { listingId: 'l-bike',   stage: 'lost',      step: 'Sold to someone',  when: '5d ago',            note: 'Back on market \u2192 watch', color: palette.muted },
    ],
    messages: [
      { listingId: 'l-sofa',  preview: 'Lynne: Sounds good, see you Wed.',           unread: 0, time: '13:48' },
      { listingId: 'l-rug',   preview: 'Inbar: Confirmed Thu 6pm \u2014 floor 3.',   unread: 1, time: '11:12' },
      { listingId: 'l-desk',  preview: 'Inbar: Yes, the legs unscrew.',              unread: 0, time: 'yesterday' },
      { listingId: 'l-vespa', preview: 'Itai: I\u2019ll let you know if she releases it.', unread: 2, time: '3d' },
    ],
  };

  const findL = (id) => listings.find((x) => x.id === id);

  return (
    <div style={{ background: palette.bg, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ position: 'relative', height: 150, background: me.accent, color: '#000' }}>
        <button onClick={() => go('browse')} style={{
          position: 'absolute', top: 50, left: 14, width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,255,255,0.55)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18 L9 12 L15 6" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ position: 'absolute', top: 56, right: 16, fontFamily: _Mb, fontSize: 10.5, color: '#000', letterSpacing: 1.2, textTransform: 'uppercase' }}>
          Buyer \u00b7 landing in {me.landingCity}
        </div>

        {/* Avatar overlap */}
        <div style={{
          position: 'absolute', bottom: -34, left: 18, width: 68, height: 68, borderRadius: 999,
          overflow: 'hidden', background: '#fff', border: `1px solid ${palette.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: _Hb, fontSize: 22, fontWeight: 600, color: palette.ink,
        }}>{me.initials}</div>
      </div>

      {/* Identity row */}
      <div style={{ padding: '46px 18px 0' }}>
        <h1 style={{ margin: 0, fontFamily: _Hb, fontSize: 26, lineHeight: 1.1, fontWeight: 500, letterSpacing: -0.3, color: palette.ink }}>
          {me.name}
        </h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: _Mb, fontSize: 10.5, padding: '3px 8px', background: me.accent, color: '#000', borderRadius: 4, letterSpacing: 0.4 }}>BUYER</span>
          <span style={{ fontFamily: _Fb, fontSize: 12, color: palette.muted }}>Moving in \u00b7 {me.moveDate}</span>
          <span style={{ width: 3, height: 3, borderRadius: 999, background: palette.muted }} />
          <span style={{ fontFamily: _Fb, fontSize: 12, color: palette.muted }}>Verified \u00b7 phone, ID</span>
        </div>

        {/* Stat row */}
        <div style={{
          marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
          background: palette.surface, borderRadius: 14, border: `0.5px solid ${palette.border}`, overflow: 'hidden',
        }}>
          {[
            ['3', 'Ongoing'],
            ['12', 'Saved'],
            ['7', 'Past meets'],
          ].map(([n, k], i) => (
            <div key={k} style={{
              padding: '14px 12px', textAlign: 'center',
              borderLeft: i === 0 ? 'none' : `0.5px solid ${palette.border}`,
            }}>
              <div style={{ fontFamily: _Hb, fontSize: 22, fontWeight: 500, color: palette.ink }}>{n}</div>
              <div style={{ fontFamily: _Mb, fontSize: 10, color: palette.muted, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: 18, padding: '0 18px', display: 'flex', gap: 4, borderBottom: `0.5px solid ${palette.border}`, overflowX: 'auto' }}>
        {tabs.map((t) => {
          const on = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 12px', background: 'none', border: 'none',
              fontFamily: _Fb, fontSize: 13, fontWeight: 600,
              color: on ? palette.ink : palette.muted, position: 'relative',
              borderBottom: on ? `2px solid ${palette.ink}` : '2px solid transparent',
              marginBottom: -0.5, whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{t}</button>
          );
        })}
      </div>

      {/* Tab body */}
      <div style={{ padding: '14px 18px 18px' }}>
        {tab === 'Negotiations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: _Mb, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>In play \u00b7 {me.activity.filter(a => a.stage !== 'lost').length}</div>
            {me.activity.map((a, i) => {
              const l = findL(a.listingId);
              if (!l) return null;
              const seller = window.HA_GET_LISTING_SELLER(l);
              const lost = a.stage === 'lost';
              return (
                <div key={i} onClick={() => go('listing', l.id)} style={{
                  display: 'flex', gap: 12, padding: 12, background: palette.surface,
                  borderRadius: 14, border: `0.5px solid ${palette.border}`, cursor: 'pointer',
                  opacity: lost ? 0.6 : 1,
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: palette.cream, border: `0.5px solid ${palette.border}` }}>
                    {l.image
                      ? <img src={l.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: '100%' }} />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontFamily: _Hb, fontSize: 15, fontWeight: 500, color: palette.ink, lineHeight: 1.15, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                      <div style={{ fontFamily: _Mb, fontSize: 10.5, color: palette.muted, letterSpacing: 0.4 }}>{a.when}</div>
                    </div>
                    <div style={{ fontFamily: _Fb, fontSize: 11.5, color: palette.muted, marginTop: 2 }}>
                      {seller && seller.name} \u00b7 {l.cat}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <span style={{
                        fontFamily: _Mb, fontSize: 9.5, padding: '2px 6px',
                        background: a.color, color: '#000', borderRadius: 4, letterSpacing: 0.4,
                      }}>{a.step.toUpperCase()}</span>
                      <span style={{ fontFamily: _Fb, fontSize: 11.5, color: palette.ink }}>{a.note}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pickup grouping CTA */}
            <div style={{
              marginTop: 8, padding: '14px', background: palette.cream,
              border: `0.5px solid ${palette.ink}`, borderRadius: 14,
              display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: palette.accent2, border: `0.5px solid ${palette.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 7 H17 L21 11 V17 H3 Z" stroke="#000" strokeWidth="1.6" /><circle cx="7" cy="17" r="2" fill="#000"/><circle cx="17" cy="17" r="2" fill="#000"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: _Hb, fontSize: 14, fontWeight: 500, color: palette.ink, lineHeight: 1.2 }}>Group these into one trip?</div>
                <div style={{ fontFamily: _Fb, fontSize: 11.5, color: palette.muted, marginTop: 4, lineHeight: 1.4 }}>Sofa & rug are 600m apart. Save \u20aa180 on the van.</div>
              </div>
              <span style={{ fontFamily: _Fb, fontSize: 12, fontWeight: 600, color: palette.ink, padding: '8px 12px', background: palette.surface, borderRadius: 999, border: `0.5px solid ${palette.ink}` }}>Plan</span>
            </div>
          </div>
        )}

        {tab === 'Favorites' && (
          <div>
            <div style={{ fontFamily: _Mb, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Saved \u00b7 {me.saved.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {me.saved.map((id) => {
                const l = findL(id);
                if (!l) return null;
                const seller = window.HA_GET_LISTING_SELLER(l);
                return (
                  <div key={id} onClick={() => go('listing', l.id)} style={{
                    background: palette.surface, borderRadius: 14, overflow: 'hidden',
                    border: `0.5px solid ${palette.border}`, cursor: 'pointer',
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 5', background: palette.cream }}>
                      {l.image && <img src={l.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                      <div style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 999, background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 21 C 6 16 3 13 3 9 a4 4 0 0 1 8 0 a4 4 0 0 1 8 0 c 0 4 -3 7 -9 12 z" fill="#FF962C" stroke="#000" strokeWidth="1" /></svg>
                      </div>
                      {l.status !== 'available' && (
                        <div style={{ position: 'absolute', bottom: 6, left: 6, fontFamily: _Mb, fontSize: 9, padding: '2px 6px', background: '#000', color: '#fff', borderRadius: 4, letterSpacing: 0.4 }}>{l.status.toUpperCase().replace('-', ' ')}</div>
                      )}
                    </div>
                    <div style={{ padding: '10px 10px 12px' }}>
                      <div style={{ fontFamily: _Hb, fontSize: 13.5, fontWeight: 500, color: palette.ink, lineHeight: 1.2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{l.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
                        <span style={{ fontFamily: _Mb, fontSize: 10.5, color: palette.muted }}>{seller && seller.name.split(' ')[0]}</span>
                        <span style={{ fontFamily: _Hb, fontSize: 13, fontWeight: 500, color: palette.ink }}>\u20aa{l.price.toLocaleString()}{l.priceSuffix || ''}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'Messages' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: _Mb, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Threads \u00b7 {me.messages.length}</div>
            {me.messages.map((m, i) => {
              const l = findL(m.listingId);
              if (!l) return null;
              const seller = window.HA_GET_LISTING_SELLER(l);
              return (
                <div key={i} onClick={() => go('chat', l.id)} style={{
                  display: 'flex', gap: 12, padding: '12px 0',
                  borderTop: i === 0 ? 'none' : `0.5px solid ${palette.border}`, cursor: 'pointer',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: palette.cream, border: `0.5px solid ${palette.border}` }}>
                    {l.image && <img src={l.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
                      <span style={{ fontFamily: _Fb, fontSize: 13, fontWeight: 600, color: palette.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {seller && seller.name} \u00b7 <span style={{ color: palette.muted, fontWeight: 500 }}>{l.title}</span>
                      </span>
                      <span style={{ fontFamily: _Mb, fontSize: 10.5, color: palette.muted, flexShrink: 0 }}>{m.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ fontFamily: _Fb, fontSize: 12.5, color: palette.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{m.preview}</span>
                      {m.unread > 0 && (
                        <span style={{
                          minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
                          background: palette.accent, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: _Mb, fontSize: 10, fontWeight: 600,
                        }}>{m.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'Settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Landing city', me.landingCity, palette.accent3],
              ['Move-in date', me.moveDate,    palette.accent],
              ['Payment',      'Visa \u00b7 \u00b7\u00b7\u00b7\u00b7 4221', palette.accent2],
              ['Notifications','Reservations, slot changes',   palette.cream],
              ['Privacy',      'Share location 12h before meet', palette.cream],
              ['Help',         'Disputes & escrow',             palette.cream],
            ].map(([k, v, c]) => (
              <div key={k} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px', background: palette.surface,
                borderRadius: 12, border: `0.5px solid ${palette.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: c }} />
                  <div>
                    <div style={{ fontFamily: _Fb, fontSize: 13, color: palette.ink, fontWeight: 600 }}>{k}</div>
                    <div style={{ fontFamily: _Fb, fontSize: 11.5, color: palette.muted, marginTop: 2 }}>{v}</div>
                  </div>
                </div>
                <span style={{ fontFamily: _Mb, fontSize: 12, color: palette.muted }}>›</span>
              </div>
            ))}

            <div style={{ marginTop: 6, padding: '12px 14px', textAlign: 'center', fontFamily: _Mb, fontSize: 11, color: palette.muted, letterSpacing: 0.4 }}>
              Home Again \u00b7 v0.4 \u00b7 a calmer marketplace
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { HABuyerMe });

// Home Again — main app shell
// Owns navigation state. Each "screen" is a function from app-screens-*.jsx.

const { useState, useEffect, useMemo } = React;

function HAApp({
  initialScreen = 'browse',
  initialListing = 'l-sofa',
  initialSeller = 'maya',
  initialMeTab,
  role = 'buyer',
  palette,
  density = 'two',
  initialCity = 'tel-aviv',
  externalCity,
  externalSetCity,
  hideTabBar = false,
}) {
  const [screen, setScreen]       = useState(initialScreen);
  const [listingId, setListingId] = useState(initialListing);
  const [sellerId, setSellerId]   = useState(initialSeller);
  const [internalCity, setInternalCity] = useState(initialCity);

  // City can be controlled by parent (case study tweak) or local
  const city    = externalCity    !== undefined ? externalCity    : internalCity;
  const setCity = externalSetCity !== undefined ? externalSetCity : setInternalCity;

  const listings = window.HA_LISTINGS;

  const go = (s, id) => {
    setScreen(s);
    if (id !== undefined) {
      // route by screen — seller/bundle take seller IDs; others take listing IDs
      if (s === 'seller' || s === 'bundle') setSellerId(id);
      else setListingId(id);
    }
  };

  const ctx = { palette, listings, go, density, city, setCity, role };

  let body;
  switch (screen) {
    case 'onboarding':    body = <HAOnboarding ctx={ctx} />; break;
    case 's-profile':     body = <HASFProfile ctx={ctx} />; break;
    case 's-pickup-loc':  body = <HASFPickupLocation ctx={ctx} />; break;
    case 's-pickup-time': body = <HASFPickupTime ctx={ctx} />; break;
    case 's-published':   body = <HASFPublished ctx={ctx} />; break;
    case 'browse':     body = <HABrowse ctx={ctx} />; break;
    case 'search':     body = <HASearch ctx={ctx} />; break;
    case 'listing':    body = <HAListing ctx={ctx} listingId={listingId} />; break;
    case 'chat':       body = <HAChat ctx={ctx} listingId={listingId} />; break;
    case 'meet':       body = <HAMeet ctx={ctx} listingId={listingId} />; break;
    case 'reserve':    body = <HAReserve ctx={ctx} listingId={listingId} />; break;
    case 'handoff':    body = <HAHandoff ctx={ctx} listingId={listingId} />; break;
    case 'post':       body = <HAPost ctx={ctx} />; break;
    case 'seller':     body = <HASellerPage ctx={ctx} sellerId={sellerId} />; break;
    case 'bundle':     body = <HABundle ctx={ctx} sellerId={sellerId} />; break;
    case 'inbox':      body = <HAInbox ctx={ctx} />; break;
    case 'me':         body = <HABuyerMe ctx={ctx} initialTab={initialMeTab} />; break;
    default:           body = <HABrowse ctx={ctx} />;
  }

  const tabIds = role === 'seller'
    ? ['browse','search','post','inbox','me']
    : ['browse','search','favorites','inbox','me'];
  const showTabs = !hideTabBar && tabIds.includes(screen);
  const activeTab = tabIds.includes(screen) ? screen : null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg, position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {body}
      </div>
      {showTabs && (
        <HATabBar
          active={activeTab}
          onChange={(id) => {
            if (id === 'favorites') { setScreen('me'); }
            else { setScreen(id); }
          }}
          palette={palette}
          role={role}
        />
      )}
    </div>
  );
}

// Convenience wrapper: an iOS device pre-loaded with a single screen,
// for use inside design-canvas artboards.
function HAFrame({
  screen = 'browse',
  listingId = 'l-sofa',
  sellerId = 'maya',
  meTab,
  role = 'buyer',
  palette,
  density = 'two',
  city = 'tel-aviv',
  setCity,
  scale = 1,
  hideTabBar,
}) {
  const W = 390, H = 800;
  return (
    <div style={{
      transform: `scale(${scale})`, transformOrigin: 'top left',
      width: W * scale, height: H * scale,
    }}>
      <div style={{
        width: W, height: H, borderRadius: 44, overflow: 'hidden',
        position: 'relative', background: palette.bg,
        boxShadow: '0 30px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)',
      }}>
        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 24px 0', pointerEvents: 'none',
        }}>
          <span style={{ fontFamily: '-apple-system, system-ui, sans-serif', fontWeight: 600, fontSize: 14, color: palette.ink }}>9:41</span>
          <div style={{
            width: 100, height: 28, borderRadius: 16, background: '#000',
            position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
          }} />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="15" height="10" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="4" rx="0.5" fill={palette.ink}/><rect x="4" y="4" width="3" height="6" rx="0.5" fill={palette.ink}/><rect x="8" y="2" width="3" height="8" rx="0.5" fill={palette.ink}/><rect x="12" y="0" width="3" height="10" rx="0.5" fill={palette.ink}/></svg>
            <svg width="22" height="11" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke={palette.ink} strokeOpacity="0.4"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill={palette.ink}/></svg>
          </div>
        </div>

        <div style={{ position: 'absolute', inset: 0, paddingTop: 44 }}>
          <HAApp
            initialScreen={screen}
            initialListing={listingId}
            initialSeller={sellerId}
            initialMeTab={meTab}
            role={role}
            initialCity={city}
            externalCity={city}
            externalSetCity={setCity}
            palette={palette}
            density={density}
            hideTabBar={hideTabBar}
          />
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 999, background: palette.ink, opacity: 0.5, zIndex: 60,
        }} />
      </div>
    </div>
  );
}

Object.assign(window, { HAApp, HAFrame });

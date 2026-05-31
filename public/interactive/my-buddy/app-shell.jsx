// My Buddy — app shell (router)
// Screens are functions. Shell holds nav state and shared ctx.

const { useState: mbU, useMemo: mbUM } = React;

function MBApp({
  initialScreen = 'map',
  initialPark = 'meir',
  paletteId = 'sage',
  hour = 16,
  mapStyle = 'illustrated',
  externalSetHour,
  hideTabBar = false,
}) {
  const [screen, setScreen] = mbU(initialScreen);
  const [parkId, setParkId] = mbU(initialPark);
  const [internalHour, setInternalHour] = mbU(hour);
  const currentHour = externalSetHour ? hour : internalHour;
  const setHour = externalSetHour || setInternalHour;

  const p = window.MB_PALETTES[paletteId] || window.MB_PALETTES.sage;
  const parks = window.MB_PARKS;
  const friends = window.MB_FRIENDS;
  const buddies = window.MB_BUDDIES;
  const threads = window.MB_THREADS;
  const me = window.MB_ME;

  const go = (s, id) => {
    setScreen(s);
    if (id !== undefined) setParkId(id);
  };

  const ctx = { p, go, parks, friends, buddies, threads, me, hour: currentHour, mapStyle, setHour };

  let body;
  switch (screen) {
    case 'onboarding': body = <MBOnboarding ctx={ctx}/>; break;
    case 'setup':      body = <MBSetup ctx={ctx}/>; break;
    case 'map':        body = <MBMap ctx={ctx}/>; break;
    case 'park':       body = <MBPark ctx={ctx} parkId={parkId}/>; break;
    case 'plan':       body = <MBPlan ctx={ctx} prefilledPark={parkId}/>; break;
    case 'buddy':      body = <MBBuddy ctx={ctx}/>; break;
    case 'inbox':      body = <MBInbox ctx={ctx}/>; break;
    case 'me':         body = <MBMe ctx={ctx}/>; break;
    case 'report':     body = <MBReport ctx={ctx} parkId={parkId}/>; break;
    default:           body = <MBMap ctx={ctx}/>;
  }

  const tabIds = ['map','plan','buddy','inbox','me'];
  const showTabs = !hideTabBar && tabIds.includes(screen);

  return (
    <div style={{ position:'relative', height:'100%', background:p.bg, display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>{body}</div>
      {showTabs && <MBTabBar active={screen} onChange={(id) => setScreen(id)} p={p}/>}
    </div>
  );
}

// MBFrame — wraps MBApp in a phone-shaped surface (like HAFrame).
// Used inside DCArtboard cards and the live-play card.
function MBFrame({
  screen = 'map',
  parkId = 'meir',
  paletteId = 'sage',
  hour = 16,
  mapStyle = 'illustrated',
  hideTabBar = false,
  scale = 1,
  externalSetHour,
}) {
  const W = 393, H = 852;
  return (
    <div style={{
      width: W * scale, height: H * scale,
      transform: scale === 1 ? 'none' : `scale(${scale})`,
      transformOrigin: 'top left',
      position: 'relative',
    }}>
      <div style={{
        width: W, height: H,
        background: '#000',
        borderRadius: 44,
        padding: 6,
        boxShadow: '0 18px 50px rgba(20,20,20,0.18), 0 4px 14px rgba(20,20,20,0.10)',
        boxSizing: 'border-box',
      }}>
        <div style={{
          width:'100%', height:'100%', borderRadius: 38, overflow:'hidden',
          background: (window.MB_PALETTES[paletteId] || window.MB_PALETTES.sage).bg,
          position: 'relative',
        }}>
          <MBApp
            initialScreen={screen}
            initialPark={parkId}
            paletteId={paletteId}
            hour={hour}
            mapStyle={mapStyle}
            externalSetHour={externalSetHour}
            hideTabBar={hideTabBar}
          />
        </div>
      </div>
    </div>
  );
}

window.MBApp = MBApp;
window.MBFrame = MBFrame;

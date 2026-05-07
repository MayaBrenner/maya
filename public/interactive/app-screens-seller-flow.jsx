// Home Again — Seller onboarding flow
// 4 screens: profile → listing → pickup location → pickup timeline

const _Fs = window.HA_FONT;
const _Hs = window.HA_HEAD;
const _Ms = window.HA_MONO;

// ── shared progress dots ──
function HASFProgress({ step, total = 4, palette }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 4, flex: 1, borderRadius: 2,
          background: i < step ? palette.ink : i === step ? palette.accent : palette.border,
        }} />
      ))}
      <span style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, marginLeft: 6, letterSpacing: 0.6 }}>
        {String(step + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </span>
    </div>
  );
}

function HASFHeader({ palette, kicker, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{kicker}</div>
      <HAH1 palette={palette}>{title}</HAH1>
      {sub && <p style={{ margin: '8px 0 0', fontFamily: _Fs, fontSize: 13.5, lineHeight: 1.5, color: palette.muted }}>{sub}</p>}
    </div>
  );
}

function HASFField({ palette, label, value, hint, big = false, mono = false, accentBar }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{
        position: 'relative',
        padding: big ? '14px 14px' : '12px 14px',
        background: palette.surface, borderRadius: 12,
        border: `0.5px solid ${palette.border}`,
        fontFamily: mono ? _Ms : _Fs, fontSize: big ? 15 : 14, color: palette.ink,
        minHeight: big ? 56 : 'auto', whiteSpace: 'pre-line', lineHeight: 1.5,
      }}>
        {accentBar && <span style={{ position:'absolute', left:0, top:8, bottom:8, width:3, borderRadius: 2, background: accentBar }} />}
        <span style={{ paddingLeft: accentBar ? 8 : 0 }}>{value}</span>
      </div>
      {hint && <div style={{ fontFamily: _Fs, fontSize: 11.5, color: palette.muted, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

// ─── 1. Profile ───
function HASFProfile({ ctx }) {
  const { palette, go } = ctx;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 22px 24px' }}>
        <HASFProgress step={0} palette={palette} />
        <HASFHeader
          palette={palette}
          kicker="Become a seller · 1 of 4"
          title="Who's moving?"
          sub="Buyers see this on every listing. Movers with a complete profile get 3× more replies."
        />

        {/* Avatar uploader */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            overflow: 'hidden',
            border: `0.5px solid ${palette.ink}`,
          }}>
            <img src={(window.__r||(p=>p))("assets/avatar-naor.png")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontFamily: _Fs, fontSize: 13, color: palette.ink, fontWeight: 600 }}>Photo added</div>
            <div style={{ fontFamily: _Fs, fontSize: 12, color: palette.muted, marginTop: 2 }}>JPG or PNG · helps trust</div>
          </div>
        </div>

        <HASFField palette={palette} label="Display name" value="Naor Brin" />
        <HASFField palette={palette} label="One-line bio" value="Cyber analyst & dad of one. Moving to Copenhagen this summer." big />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <HASFField palette={palette} label="From" value="Tel Aviv" />
          <HASFField palette={palette} label="To" value="Copenhagen" />
        </div>

        <HASFField palette={palette} label="Move date" value="July 14, 2026" mono accentBar={palette.accent} />

        {/* Verifications */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, marginTop: 4 }}>Verify</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {[
            ['Phone number', 'Verified', true, palette.accent2],
            ['Email',         'Verified', true, palette.accent2],
            ['Government ID', 'Optional · adds a badge', false, palette.accent3],
          ].map(([k, v, done, dot]) => (
            <div key={k} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: palette.surface,
              borderRadius: 12, border: `0.5px solid ${palette.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: dot }} />
                <span style={{ fontFamily: _Fs, fontSize: 13.5, color: palette.ink }}>{k}</span>
              </div>
              <span style={{ fontFamily: _Ms, fontSize: 10.5, color: palette.muted, letterSpacing: 0.6 }}>{v}{done && ' ✓'}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px', background: palette.surface, borderTop: `0.5px solid ${palette.border}`, display: 'flex', gap: 8 }}>
        <HAButton palette={palette} variant="secondary" full>Back</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('post')}>Continue · Listing</HAButton>
      </div>
    </div>
  );
}

// ─── 2. Listing ── (use existing post screen) ──
//   we link from step 1 → 'post' which already exists.
//   step 2 here is a thin wrapper to keep the seller-flow story complete.

// ─── 3. Pickup location ───
function HASFPickupLocation({ ctx }) {
  const { palette, go } = ctx;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 22px 24px' }}>
        <HASFProgress step={2} palette={palette} />
        <HASFHeader
          palette={palette}
          kicker="Become a seller · 3 of 4"
          title="Where can buyers pick up?"
          sub="Buyers see the neighborhood until they reserve. Exact address shares 12h before the meet."
        />

        <HASFField palette={palette} label="City" value="Tel Aviv" />
        <HASFField palette={palette} label="Neighborhood (public)" value="Florentin" hint="This is what buyers see in the feed." />
        <HASFField palette={palette} label="Street address (private)" value="Levinsky 42, Apt 6" hint="Shared automatically 12 hours before pickup." accentBar={palette.accent} />

        {/* Map placeholder */}
        <div style={{ marginTop: 6, marginBottom: 14, position: 'relative', height: 160, borderRadius: 14, overflow: 'hidden', border: `0.5px solid ${palette.border}`, background: palette.cream }}>
          {/* grid lines */}
          <svg viewBox="0 0 320 160" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <pattern id="hagrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={palette.border} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="320" height="160" fill="url(#hagrid)" />
            <path d="M 0 90 Q 80 70 160 95 T 320 80" stroke={palette.muted} strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M 60 0 L 80 160" stroke={palette.muted} strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M 220 0 L 200 160" stroke={palette.muted} strokeWidth="0.8" fill="none" opacity="0.4" />
            {/* approx area circle */}
            <circle cx="160" cy="80" r="42" fill={palette.accent} opacity="0.18" />
            <circle cx="160" cy="80" r="42" fill="none" stroke={palette.ink} strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="160" cy="80" r="5" fill={palette.ink} />
          </svg>
          <div style={{ position: 'absolute', bottom: 8, left: 10, padding: '4px 8px', background: palette.surface, borderRadius: 999, border: `0.5px solid ${palette.border}`, fontFamily: _Ms, fontSize: 10, color: palette.ink, letterSpacing: 0.4 }}>Approx area · 250m</div>
        </div>

        {/* Access notes */}
        <HASFField palette={palette} label="Access notes (for the meet)" big value={`3rd floor, no elevator.\nStreet parking after 7pm.\nBuzzer 06.`} />

        {/* Help with delivery */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, marginTop: 4 }}>Help buyers</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Offer pickup help', 'I can help carry to the curb', true, palette.accent2],
            ['Accept group pickup', 'Buyers can bundle a van across my listings', true, palette.accent],
            ['Offer delivery', 'Within 5km · ₪80 flat', false, palette.accent3],
          ].map(([k, v, on, c]) => (
            <div key={k} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: palette.surface,
              borderRadius: 12, border: `0.5px solid ${palette.border}`,
            }}>
              <div>
                <div style={{ fontFamily: _Fs, fontSize: 13.5, color: palette.ink, fontWeight: 600 }}>{k}</div>
                <div style={{ fontFamily: _Fs, fontSize: 11.5, color: palette.muted, marginTop: 2 }}>{v}</div>
              </div>
              <div style={{
                width: 36, height: 22, borderRadius: 999, position: 'relative',
                background: on ? c : palette.border, transition: 'background .15s',
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: on ? 16 : 2, width: 18, height: 18,
                  borderRadius: 999, background: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px', background: palette.surface, borderTop: `0.5px solid ${palette.border}`, display: 'flex', gap: 8 }}>
        <HAButton palette={palette} variant="secondary" full onClick={() => go('post')}>Back</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('s-pickup-time')}>Continue · Timeline</HAButton>
      </div>
    </div>
  );
}

// ─── 4. Pickup timeline ───
function HASFPickupTime({ ctx }) {
  const { palette, go } = ctx;

  const days = [
    { d: 'Mon', n: '12', windows: ['18–21'] },
    { d: 'Tue', n: '13', windows: ['09–12','18–21'] },
    { d: 'Wed', n: '14', windows: [] },
    { d: 'Thu', n: '15', windows: ['18–21'] },
    { d: 'Fri', n: '16', windows: ['09–13'] },
    { d: 'Sat', n: '17', windows: [] },
    { d: 'Sun', n: '18', windows: ['10–14','18–21'] },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 22px 24px' }}>
        <HASFProgress step={3} palette={palette} />
        <HASFHeader
          palette={palette}
          kicker="Become a seller · 4 of 4"
          title="When can people pick up?"
          sub="Pick at least one window. We'll only show buyers slots that match yours — fewer back-and-forths."
        />

        {/* Hard deadline */}
        <div style={{
          padding: '14px 14px', background: palette.surface, borderRadius: 14,
          border: `0.5px solid ${palette.border}`, marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: palette.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: _Hs, fontSize: 16, color: '#000', fontWeight: 500,
              border: `0.5px solid ${palette.ink}`,
            }}>14</div>
            <div>
              <div style={{ fontFamily: _Fs, fontSize: 13.5, fontWeight: 600, color: palette.ink }}>Move-out by Jul 14</div>
              <div style={{ fontFamily: _Fs, fontSize: 11.5, color: palette.muted, marginTop: 2 }}>Items not sold by then will auto-archive.</div>
            </div>
          </div>
          <span style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.6 }}>Edit</span>
        </div>

        {/* Week grid */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Available windows · this week</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
          {days.map((day, i) => {
            const has = day.windows.length > 0;
            return (
              <div key={i} style={{
                background: has ? palette.surface : palette.bg,
                border: `0.5px solid ${has ? palette.ink : palette.border}`,
                borderRadius: 8, padding: '8px 4px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                opacity: has ? 1 : 0.5,
              }}>
                <div style={{ fontFamily: _Ms, fontSize: 9, color: palette.muted, letterSpacing: 0.4 }}>{day.d}</div>
                <div style={{ fontFamily: _Hs, fontSize: 16, color: palette.ink, fontWeight: 500 }}>{day.n}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                  {day.windows.length === 0
                    ? <span style={{ width: 14, height: 1.5, background: palette.border, borderRadius: 1 }} />
                    : day.windows.map((w, j) => (
                        <span key={j} style={{
                          fontFamily: _Ms, fontSize: 8, color: '#000',
                          padding: '1px 4px', background: j === 0 ? palette.accent : palette.accent2,
                          borderRadius: 3, letterSpacing: 0.2,
                        }}>{w}</span>
                      ))
                  }
                </div>
              </div>
            );
          })}
        </div>

        {/* Default windows */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Default repeating windows</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {[
            ['Weekday evenings', 'Mon–Thu · 18:00–21:00', true, palette.accent],
            ['Friday mornings', 'Fri · 09:00–13:00', true, palette.accent2],
            ['Sunday afternoons', 'Sun · 14:00–18:00', false, palette.accent3],
          ].map(([k, v, on, c]) => (
            <div key={k} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: palette.surface,
              borderRadius: 12, border: `0.5px solid ${palette.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: on ? c : palette.border }} />
                <div>
                  <div style={{ fontFamily: _Fs, fontSize: 13.5, color: palette.ink, fontWeight: 600 }}>{k}</div>
                  <div style={{ fontFamily: _Ms, fontSize: 10.5, color: palette.muted, marginTop: 2, letterSpacing: 0.4 }}>{v}</div>
                </div>
              </div>
              <span style={{ fontFamily: _Ms, fontSize: 10, color: on ? palette.ink : palette.muted, letterSpacing: 0.6 }}>{on ? 'ON' : 'OFF'}</span>
            </div>
          ))}
        </div>

        {/* Notice window */}
        <HASFField palette={palette} label="Minimum notice" value="Same day · let buyers ping you 4h ahead" hint="Group-pickup buyers (multiple items) need at least 24h." accentBar={palette.accent2} />
      </div>

      <div style={{ padding: '12px 16px 16px', background: palette.surface, borderTop: `0.5px solid ${palette.border}`, display: 'flex', gap: 8 }}>
        <HAButton palette={palette} variant="secondary" full onClick={() => go('s-pickup-loc')}>Back</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('s-published')}>Publish · Go live</HAButton>
      </div>
    </div>
  );
}

// ─── 5. Listing published — success ───
function HASFPublished({ ctx }) {
  const { palette, go } = ctx;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: palette.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 22px 24px' }}>

        {/* Hero check + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 18, marginBottom: 26 }}>
          <div style={{
            width: 84, height: 84, borderRadius: 999, background: palette.accent2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `0.5px solid ${palette.ink}`, marginBottom: 18,
          }}>
            <svg width="36" height="36" viewBox="0 0 32 32"><path d="M6 17 L13 24 L26 9" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>You're live</div>
          <h1 style={{ margin: 0, fontFamily: _Hs, fontSize: 30, fontWeight: 500, lineHeight: 1.1, letterSpacing: -0.4, color: palette.ink }}>Published.<br/><em style={{ fontStyle: 'italic', color: palette.accent }}>Now we wait.</em></h1>
          <p style={{ margin: '12px 24px 0', fontFamily: _Fs, fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>Buyers in Tel Aviv can see your listing now. We'll ping you the moment someone asks.</p>
        </div>

        {/* Listing recap card */}
        <div style={{ marginBottom: 18, padding: 14, background: palette.surface, borderRadius: 14, border: `0.5px solid ${palette.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `0.5px solid ${palette.border}` }}>
            <img src={(window.__r||(p=>p))("img/whole-apt-1.png")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: _Hs, fontSize: 16, color: palette.ink, fontWeight: 500, lineHeight: 1.2 }}>Whole apartment furnitures</div>
            <div style={{ fontFamily: _Ms, fontSize: 10.5, color: palette.muted, letterSpacing: 0.4, marginTop: 4 }}>FLORENTIN · TEL AVIV · 7 PHOTOS</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <span style={{ fontFamily: _Ms, fontSize: 9.5, padding: '2px 6px', background: palette.accent2, color: '#000', borderRadius: 4, letterSpacing: 0.4 }}>AVAILABLE</span>
              <span style={{ fontFamily: _Ms, fontSize: 9.5, padding: '2px 6px', background: palette.bg, color: palette.muted, borderRadius: 4, letterSpacing: 0.4, border: `0.5px solid ${palette.border}` }}>BUNDLE READY</span>
            </div>
          </div>
        </div>

        {/* Share row */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Spread the word</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
          {[
            ['Copy link', palette.accent3],
            ['WhatsApp', palette.accent2],
            ['Story', palette.accent],
            ['Mail', palette.cream],
          ].map(([k, c]) => (
            <div key={k} style={{
              padding: '14px 6px 10px', background: palette.surface,
              borderRadius: 12, border: `0.5px solid ${palette.border}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: c, border: `0.5px solid ${palette.ink}` }} />
              <span style={{ fontFamily: _Fs, fontSize: 11, color: palette.ink, fontWeight: 600 }}>{k}</span>
            </div>
          ))}
        </div>

        {/* What happens next */}
        <div style={{ fontFamily: _Ms, fontSize: 10, color: palette.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>What happens next</div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
          {[
            ['1', 'Buyers ask',           'You\u2019ll get a ping when someone wants details.', palette.accent],
            ['2', 'Pick a slot',          'They choose from the windows you set.',                palette.accent3],
            ['3', 'Reserve \u00b7 escrow','We hold the deposit until handoff.',                   palette.accent2],
            ['4', 'Handoff',              'Mark it sold from the chat. Funds release.',           palette.cream],
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderTop: i === 0 ? 'none' : `0.5px solid ${palette.border}` }}>
              <span style={{
                width: 24, height: 24, borderRadius: 6, background: row[3], color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: _Hs, fontSize: 12, fontWeight: 600, flexShrink: 0, marginTop: 2,
                border: `0.5px solid ${palette.ink}`,
              }}>{row[0]}</span>
              <div>
                <div style={{ fontFamily: _Fs, fontSize: 13.5, fontWeight: 600, color: palette.ink }}>{row[1]}</div>
                <div style={{ fontFamily: _Fs, fontSize: 12, color: palette.muted, marginTop: 2, lineHeight: 1.5 }}>{row[2]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Boost */}
        <div style={{
          padding: '14px', background: palette.cream, borderRadius: 14,
          border: `0.5px solid ${palette.ink}`, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: _Hs, fontSize: 15, fontWeight: 500, color: palette.ink, lineHeight: 1.2 }}>Boost to top of feed</div>
            <div style={{ fontFamily: _Fs, fontSize: 12, color: palette.muted, marginTop: 4, lineHeight: 1.45 }}>₪19 · 48h · usually 4–6× more replies for movers in your week.</div>
          </div>
          <span style={{
            padding: '8px 12px', background: palette.surface, borderRadius: 999,
            border: `0.5px solid ${palette.ink}`, fontFamily: _Fs, fontSize: 12, fontWeight: 600, color: palette.ink,
            whiteSpace: 'nowrap',
          }}>Boost</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px', background: palette.surface, borderTop: `0.5px solid ${palette.border}`, display: 'flex', gap: 8 }}>
        <HAButton palette={palette} variant="secondary" full onClick={() => go('post')}>Add another</HAButton>
        <HAButton palette={palette} variant="primary" full onClick={() => go('seller', 'yael')}>View my page</HAButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  HASFProfile, HASFPickupLocation, HASFPickupTime, HASFPublished,
});

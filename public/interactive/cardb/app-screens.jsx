// CarDB web app — interactive prototype · 1512×982
const { useState, useEffect } = React;

const C = {
  pink:'#F7C8DC', pinkSoft:'#FCE4EE',
  blue:'#B7DCF8', blueSoft:'#DCEEFB',
  green:'#C7EFB7', greenSoft:'#E5F7DD',
  butter:'#FFE3A8', butterSoft:'#FFF0D9',
  cream:'#FBF8F1', paper:'#FFFFFF',
  ink:'#0E0D0C', stone:'#6E6A60',
};
const FONT    = '"DM Sans",-apple-system,system-ui,sans-serif';
const DISPLAY = '"Cabinet Grotesk","Archivo",sans-serif';
const ITAL    = '"Gambarino",Georgia,serif';
const MONO    = '"JetBrains Mono",ui-monospace,monospace';

const Spark = ({ s=14, c=C.ink, style }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={style}>
    <path d="M12 2 L13.5 10.5 22 12 13.5 13.5 12 22 10.5 13.5 2 12 10.5 10.5Z" fill={c}/>
  </svg>
);

const Eyebrow = ({ children, c=C.stone, style }) => (
  <div style={{ fontSize:11, letterSpacing:1.8, textTransform:'uppercase', fontWeight:700, color:c, ...style }}>{children}</div>
);

const Chip = ({ children, on }) => (
  <span style={{
    fontSize:13, fontWeight:600, padding:'8px 16px', border:`1px solid ${C.ink}`,
    borderRadius:999, background: on ? C.ink : C.paper, color: on ? C.cream : C.ink,
  }}>{children}</span>
);

const Btn = ({ children, primary, full, onClick, bg, dis, style }) => (
  <button onClick={dis ? null : onClick} style={{
    border:`1.5px solid ${C.ink}`, borderRadius:999, padding:'13px 28px',
    background: bg || (primary ? C.ink : C.paper), color: primary ? C.cream : C.ink,
    fontFamily:FONT, fontSize:15, fontWeight:700, cursor: dis ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto', opacity: dis ? 0.5 : 1,
    boxShadow: primary ? `3px 3px 0 ${C.ink}` : 'none',
    ...style
  }}>{children}</button>
);

// ─── car silhouette illustration
const CarIcon = ({ w=180, fill=C.cream, stroke=C.ink, glass=C.blue, style }) => (
  <svg width={w} height={Math.round(w*0.56)} viewBox="0 0 180 101" fill="none" style={style}>
    <circle cx="42"  cy="78" r="15" fill={fill} stroke={stroke} strokeWidth="2.5"/>
    <circle cx="42"  cy="78" r="6"  fill={stroke}/>
    <circle cx="138" cy="78" r="15" fill={fill} stroke={stroke} strokeWidth="2.5"/>
    <circle cx="138" cy="78" r="6"  fill={stroke}/>
    <path d="M6 63 L6 54 L30 35 L62 18 L118 17 L146 28 L162 44 L168 56 L168 63 L152 63 C152 71 146 78 138 78 C130 78 124 71 124 63 L56 63 C56 71 50 78 42 78 C34 78 28 71 28 63 Z"
          fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M66 42 L76 20 L114 19 L114 42 Z" fill={glass} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M116 19 L140 28 L143 42 L116 42 Z" fill={glass} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="0" y1="93" x2="180" y2="93" stroke={stroke} strokeWidth="1.5" strokeDasharray="7 5"/>
  </svg>
);

// ─── decorative blob shape
const Blob = ({ w, h, bg, border=C.ink, rx='62% 38% 70% 30% / 50% 60% 40% 50%', style }) => (
  <div style={{ width:w, height:h, background:bg, border:`1.5px solid ${border}`, borderRadius:rx, flexShrink:0, ...style }}/>
);

// ─── small dotted ring
const Ring = ({ r=40, stroke=C.ink, dash='6 5', style }) => (
  <svg width={r*2} height={r*2} viewBox={`0 0 ${r*2} ${r*2}`} fill="none" style={style}>
    <circle cx={r} cy={r} r={r-3} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash}/>
  </svg>
);

// ─── wavy path accent
const Wave = ({ w=200, c=C.ink, style }) => (
  <svg width={w} height={24} viewBox={`0 0 ${w} 24`} fill="none" style={style}>
    <path d={`M0 12 Q${w/8} 0 ${w/4} 12 Q${w*3/8} 24 ${w/2} 12 Q${w*5/8} 0 ${w*3/4} 12 Q${w*7/8} 24 ${w} 12`}
          stroke={c} strokeWidth="1.5" fill="none"/>
  </svg>
);

// ─── browser chrome
function BrowserChrome({ url, children, onBack }) {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', background:C.paper, fontFamily:FONT }}>
      <div style={{ background:C.cream, borderBottom:`1.5px solid ${C.ink}`, display:'flex', alignItems:'center', gap:12, padding:'13px 22px', flexShrink:0 }}>
        <div style={{ display:'flex', gap:8 }}>
          {['#FF8A6F','#FFD16E','#A8E5A0'].map((col,i) => (
            <div key={i} style={{ width:13, height:13, borderRadius:'50%', background:col, border:`1px solid ${C.ink}` }}/>
          ))}
        </div>
        <div style={{ flex:1, background:C.paper, border:`1px solid ${C.ink}`, borderRadius:999, padding:'6px 18px', fontFamily:MONO, fontSize:12, color:C.stone, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ display:'inline-block', width:11, height:13, border:`1.5px solid ${C.stone}`, borderRadius:'2px 2px 0 0', borderTopWidth:7, borderBottom:'none', flexShrink:0 }}/>
          {url}
        </div>
        <div style={{ fontSize:12, color:C.stone, display:'flex', gap:10 }}>
          <span>·</span><span>Tab</span>
        </div>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>
        {onBack && (
          <button onClick={onBack} style={{
            position:'absolute', top:16, left:16, zIndex:100,
            width:36, height:36, borderRadius:'50%',
            background:C.paper, border:`1.5px solid ${C.ink}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', boxShadow:`2px 2px 0 ${C.ink}`,
            fontSize:16, color:C.ink, fontFamily:FONT,
          }}>←</button>
        )}
        {children}
      </div>
    </div>
  );
}

// ─── in-app navbar
function AppNav({ progress=0, go }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 44px', borderBottom:'1px dashed #d9d3c2', background:C.cream, flexShrink:0 }}>
      <div onClick={() => go('welcome')} style={{ cursor:'pointer', display:'flex', alignItems:'baseline' }}>
        <span style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500, fontSize:24 }}>
          Car<span style={{ fontFamily:DISPLAY, fontStyle:'normal', fontWeight:900, fontSize:24, letterSpacing:'-0.03em' }}>DB</span>
        </span>
        <sup style={{ fontFamily:FONT, fontWeight:700, fontSize:9, letterSpacing:1, marginLeft:2 }}>™</sup>
      </div>
      {progress > 0 && (
        <div style={{ flex:'0 1 520px', height:9, background:C.paper, border:`1px solid ${C.ink}`, borderRadius:999, overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', inset:'0 auto 0 0', width:`${progress}%`, background:`linear-gradient(90deg,${C.pink},${C.blue})`, borderRight:`1px solid ${C.ink}` }}/>
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:18, fontSize:14, color:C.stone }}>
        <span>Save progress</span>
        <div style={{ width:36, height:36, borderRadius:'50%', background:C.green, border:`1px solid ${C.ink}` }}/>
      </div>
    </div>
  );
}

// ─── 01 WELCOME
function Welcome({ go }) {
  return (
    <BrowserChrome url="cardb.app" onBack={null}>
      <div style={{ flex:1, display:'flex', background:C.cream, color:C.ink, overflow:'hidden', position:'relative' }}>
        {/* background blobs */}
        <Blob w={420} h={340} bg={C.pink} style={{ position:'absolute', left:-90, top:'8%', zIndex:0 }}/>
        <Blob w={300} h={260} bg={C.blue} rx="50% 50% 30% 70% / 60% 40% 60% 40%" style={{ position:'absolute', right:-60, bottom:'6%', zIndex:0 }}/>
        <Blob w={160} h={140} bg={C.butter} rx="40% 60% 55% 45% / 50% 45% 55% 50%" style={{ position:'absolute', right:'36%', top:'8%', zIndex:0, opacity:0.7 }}/>
        {/* sparks */}
        <Spark s={44} style={{ position:'absolute', top:'39%', left:'43%', zIndex:1 }}/>
        <Spark s={22} style={{ position:'absolute', top:'18%', right:'31%', zIndex:1 }}/>
        <Spark s={16} style={{ position:'absolute', bottom:'22%', left:'38%', zIndex:1 }}/>
        <Spark s={12} c={C.stone} style={{ position:'absolute', top:'14%', left:'28%', zIndex:1 }}/>
        {/* decorative rings */}
        <Ring r={48} style={{ position:'absolute', top:'55%', right:'28%', zIndex:1, opacity:0.25 }}/>
        <Ring r={28} dash="3 4" style={{ position:'absolute', top:'22%', left:'48%', zIndex:1, opacity:0.3 }}/>

        {/* left: hero */}
        <div style={{ flex:'1.1', padding:'80px 96px', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', zIndex:2 }}>
          <div>
            <h1 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:'clamp(100px,10vw,175px)', letterSpacing:'-0.045em', lineHeight:0.86, margin:0 }}>
              Car<em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>DB.</em>
            </h1>
            <p style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500, fontSize:34, margin:'12px 0 0', letterSpacing:'-0.01em' }}>
              buying with confidence.
            </p>
            <Wave w={260} style={{ margin:'18px 0 0', opacity:0.35 }}/>
            <p style={{ fontSize:20, lineHeight:1.55, maxWidth:580, margin:'18px 0 0' }}>
              CarDB helps you purchase a car even when you have zero idea about the world of cars. How fun it is to be able to filter exactly what is important to us from now on.
            </p>
          </div>
          <div>
            <Btn primary onClick={() => go('onboarding')} style={{ fontSize:18, padding:'18px 48px' }}>Start finding my car ›</Btn>
            <p style={{ fontSize:14, color:C.stone, margin:'14px 0 0' }}>~ 4 minutes · cancel anytime</p>
          </div>
        </div>

        {/* right: how it works */}
        <div style={{ flex:'0.9', padding:'80px 72px', display:'flex', alignItems:'center', background:`linear-gradient(135deg,${C.pinkSoft},${C.blueSoft})`, borderLeft:`1px solid ${C.ink}`, position:'relative', zIndex:2 }}>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:28, padding:'44px 44px', boxShadow:`7px 7px 0 ${C.ink}`, width:'100%' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
              <Eyebrow>How it works</Eyebrow>
              <Spark s={18} c={C.stone}/>
            </div>
            <ol style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:22 }}>
              {[
                ['01', C.pink,   'Answer 15 questions about your dream car.'],
                ['02', C.blue,   'Get 3–5 cars matched to your actual everyday lifestyle.'],
                ['03', C.butter, 'A real person who really knows about cars reviews your choice within 24 hours.'],
                ['04', C.green,  'Walk into a dealership with an actual understanding of what you want.'],
              ].map(([n,bg,t]) => (
                <li key={n} style={{ display:'flex', gap:16, alignItems:'flex-start', fontSize:17, lineHeight:1.45, fontWeight:500 }}>
                  <span style={{ fontFamily:MONO, fontSize:11, fontWeight:600, background:bg, border:`1px solid ${C.ink}`, borderRadius:'50%', width:32, height:32, display:'grid', placeItems:'center', flexShrink:0, marginTop:1 }}>{n}</span>
                  {t}
                </li>
              ))}
            </ol>
            <Wave w={280} style={{ marginTop:28, opacity:0.3 }}/>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ─── 02 ONBOARDING — single scrollable page
function Onboarding({ go }) {
  const [ans, setAns] = useState({
    budget: 25000, condition: null, adults: null, everyday: [],
    roads: null, parking: [], gear: [], mustHave: [], dealBreakers: [], colour: null,
  });

  const pick = (key, val) => setAns(a => ({ ...a, [key]: val }));
  const tog  = (key, val) => setAns(a => ({
    ...a, [key]: (a[key]||[]).includes(val) ? a[key].filter(x=>x!==val) : [...(a[key]||[]),val],
  }));

  const answered = [
    true,
    ans.condition !== null,
    ans.adults !== null,
    ans.everyday.length > 0,
    ans.roads !== null,
    ans.parking.length > 0,
    ans.gear.length > 0,
    ans.mustHave.length > 0,
    ans.dealBreakers.length > 0,
    ans.colour !== null,
  ];
  const doneCount = answered.filter(Boolean).length;
  const progress  = Math.round((doneCount / 10) * 100);
  const sliderPct = Math.round(((ans.budget - 10000) / 70000) * 100);

  const EM = { fontFamily:ITAL, fontStyle:'italic', fontWeight:500 };
  const QH = { fontFamily:DISPLAY, fontWeight:900, fontSize:26, letterSpacing:'-0.02em', lineHeight:1.1, margin:'0 0 4px' };
  const QP = { fontSize:13, color:C.stone, margin:'0 0 14px', lineHeight:1.4 };

  const Opts = ({ aKey, opts, multi, cols=2 }) => (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:10 }}>
      {opts.map(opt => {
        const on = multi ? (ans[aKey]||[]).includes(opt) : ans[aKey]===opt;
        return (
          <div key={opt} onClick={() => multi ? tog(aKey,opt) : pick(aKey,opt)} style={{
            background: on ? C.blue : C.paper, border:`1.5px solid ${C.ink}`,
            borderRadius:12, padding:'12px 16px', fontSize:13, fontWeight:600, lineHeight:1.3,
            cursor:'pointer', boxShadow: on ? `3px 3px 0 ${C.ink}` : 'none',
            transform: on ? 'translate(-1px,-1px)' : 'none', transition:'transform 80ms',
          }}>{opt}</div>
        );
      })}
    </div>
  );

  const Section = ({ id, n, title, sub, children }) => {
    const done = answered[n - 1];
    return (
      <div id={id} style={{
        background: C.paper, border: `1.5px solid ${C.ink}`,
        borderRadius: 20, padding: '24px 28px', marginBottom: 14,
        boxShadow: done ? `3px 3px 0 ${C.ink}` : 'none',
        transition: 'border-color 150ms, box-shadow 150ms',
      }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
          <div>
            <div style={{ fontFamily:MONO, fontSize:10, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:C.stone, marginBottom:5 }}>Q{String(n).padStart(2,'0')}</div>
            <div style={QH}>{title}</div>
            {sub && <div style={QP}>{sub}</div>}
          </div>
          {done && <div style={{ width:26, height:26, borderRadius:'50%', background:C.ink, border:`1.5px solid ${C.ink}`, display:'grid', placeItems:'center', flexShrink:0, fontSize:12, marginTop:2, color:C.cream }}>✓</div>}
        </div>
        {children}
      </div>
    );
  };

  const NAV_LABELS = ['Budget range','New or used','Adults riding','Everyday drive','City or highway','Car-park check','My car hobbies','Must-have features','Deal-breakers','Colour preference'];

  return (
    <BrowserChrome url="cardb.app/onboarding" onBack={() => go('welcome')}>
      <AppNav progress={progress} go={go}/>
      <div style={{ flex:1, display:'flex', overflow:'hidden', background:C.cream, color:C.ink }}>

        {/* left nav */}
        <aside style={{ width:248, background:C.pinkSoft, borderRight:`1px solid ${C.ink}`, padding:'22px 14px 22px 16px', display:'flex', flexDirection:'column', gap:3, flexShrink:0, overflowY:'auto' }}>
          <Eyebrow style={{ marginBottom:10, paddingLeft:4 }}>Questions · {doneCount}/10</Eyebrow>
          {NAV_LABELS.map((label, i) => {
            const n = i + 1, done = answered[i];
            return (
              <div key={n}
                onClick={() => { const el = document.getElementById(`q${n}`); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); }}
                style={{
                  display:'flex', alignItems:'center', gap:10, fontSize:12.5, padding:'7px 10px', borderRadius:10,
                  cursor:'pointer', color: done ? C.stone : C.ink,
                  textDecoration: done ? 'line-through' : 'none', textDecorationColor:'#bdb6a6',
                }}>
                <span style={{
                  width:20, height:20, borderRadius:'50%', border:`1px solid ${C.ink}`, flexShrink:0,
                  background: done ? C.green : C.paper,
                  color: C.ink,
                  display:'grid', placeItems:'center', fontSize:9, fontFamily:MONO, fontWeight:600,
                }}>{done ? '✓' : String(n).padStart(2,'0')}</span>
                {label}
              </div>
            );
          })}
          <div style={{ marginTop:'auto', paddingTop:16 }}>
            <button onClick={() => go('results')} style={{
              width:'100%', background:'none', border:`1px dashed ${C.stone}`, cursor:'pointer',
              fontSize:12, color:C.stone, fontFamily:FONT, padding:'9px 0', borderRadius:999,
            }}>Skip for now →</button>
          </div>
        </aside>

        {/* main scrollable */}
        <main style={{ flex:1, padding:'28px 40px 48px', overflowY:'auto' }}>

          <Section id="q1" n={1} title={<>What's your <em style={EM}>budget?</em></>} sub="Drag to set your total budget — not monthly.">
            <div style={{ marginBottom:4 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:C.stone, marginBottom:8 }}>
                <span>$10k</span><span>$80k</span>
              </div>
              <input type="range" min={10000} max={80000} step={1000} value={ans.budget}
                onChange={e => pick('budget', Number(e.target.value))}
                className="cardb-slider"
                style={{ width:'100%', cursor:'pointer', display:'block' }}
              />
              <div style={{ marginTop:12, display:'flex', alignItems:'baseline', gap:8 }}>
                <span style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:44, letterSpacing:'-0.03em' }}>${ans.budget.toLocaleString()}</span>
                <span style={{ fontSize:13, color:C.stone }}>total budget</span>
              </div>
            </div>
          </Section>

          <Section id="q2" n={2} title={<>New, <em style={EM}>used,</em> or either?</>} sub="Used opens 3× more options at the same budget.">
            <Opts aKey="condition" cols={1} opts={['New only — I want the full warranty & latest tech','Used — happy to save on depreciation','Either — show me the best overall value']}/>
          </Section>

          <Section id="q3" n={3} title={<>How many adults <em style={EM}>ride regularly?</em></>} sub="Sets cabin and seatbelt requirements.">
            <Opts aKey="adults" cols={5} opts={['1','2','3','4','5+']}/>
          </Section>

          <Section id="q4" n={4} title={<>Your <em style={EM}>everyday</em> drive.</>} sub="Pick all that apply.">
            <Opts aKey="everyday" multi opts={['School run, twice a day','Commuting alone, mostly','Groceries with kids','Long highway trips','Stop-and-go city traffic','Working from car']}/>
          </Section>

          <Section id="q5" n={5} title={<>City or <em style={EM}>highway?</em></>} sub="Determines whether a hybrid actually saves you money.">
            <Opts aKey="roads" cols={3} opts={['Mostly city','Both','Mostly highway']}/>
          </Section>

          <Section id="q6" n={6} title={<>The <em style={EM}>car-park</em> reality check.</>} sub="Parking is the #1 source of daily friction.">
            <Opts aKey="parking" multi opts={['Tight city streets — parallel park daily','Mall and supermarket lots','My home garage is a tight squeeze','Plenty of space — not a concern','Reverse into a tight bay regularly']}/>
          </Section>

          <Section id="q7" n={7} title={<>My car <em style={EM}>hobbies.</em></>} sub="My car is loaded by?">
            <Opts aKey="gear" multi cols={2} opts={['Bikes or surfboard','Camping or hiking gear','Beach essentials','None of these']}/>
          </Section>

          <Section id="q8" n={8} title={<>Must-have <em style={EM}>features.</em></>} sub="Cars missing any of these won't appear in your results.">
            <Opts aKey="mustHave" multi opts={['Safety tech (blind spot, AEB, lane assist)','Great fuel economy','Large boot / cargo space','Apple CarPlay & Android Auto','Sunroof or panoramic roof','Low long-term running costs']}/>
          </Section>

          <Section id="q9" n={9} title={<>Any <em style={EM}>deal-breakers?</em></>} sub="These permanently remove cars from your results.">
            <Opts aKey="dealBreakers" multi opts={['No manual gearbox','No diesel','No hybrid or electric','No white cars','No small or compact cars',"None — I'm completely open"]}/>
          </Section>

          <Section id="q10" n={10} title={<>Colour <em style={EM}>preference?</em></>} sub="Colour affects resale by ~8%. It also just matters.">
            <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
              {[['White','#F0EFED'],['Silver','#C4C4C4'],['Grey','#7A7A7A'],['Black','#1A1A1A'],['Blue','#4472A8'],['Red','#B54040'],['Green','#3F7A52'],["Don't mind",C.butter]].map(([name,col]) => {
                const on = ans.colour === name;
                return (
                  <div key={name} onClick={() => pick('colour', name)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, cursor:'pointer' }}>
                    <div style={{ width:52, height:52, borderRadius:'50%', background:col, border:`2px solid ${on ? C.ink : '#CCC'}`, boxShadow: on ? `3px 3px 0 ${C.ink}` : 'none', transform: on ? 'translate(-1px,-1px)' : 'none', transition:'transform 80ms' }}/>
                    <span style={{ fontSize:11, fontWeight: on ? 700 : 500, color: on ? C.ink : C.stone }}>{name}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Btn primary onClick={() => go('thinking')} style={{ width:'100%', fontSize:16, padding:'16px 0' }}>
            Show my matches ›
          </Btn>
        </main>

        {/* right rail */}
        <aside style={{ width:248, background:C.blueSoft, borderLeft:`1px solid ${C.ink}`, padding:'22px 20px', display:'flex', flexDirection:'column', gap:14, flexShrink:0 }}>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:16 }}>
            <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:14, marginBottom:6 }}>Your AI is listening</div>
            <div style={{ fontSize:12, color:C.stone, lineHeight:1.5 }}>
              Answered <b style={{ color:C.ink }}>{doneCount}</b> of 10. Narrowing from 240 cars.
            </div>
          </div>
          <div style={{ marginTop:'auto', background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:18, textAlign:'center' }}>
            <div style={{ width:76, height:76, borderRadius:'50%', background:`radial-gradient(circle,${C.pink} 0%,${C.blue} 60%,transparent 75%)`, margin:'4px auto 10px', animation:'cardbPulse 2.4s ease-in-out infinite' }}/>
            <div style={{ fontFamily:MONO, fontSize:11, color:C.stone }}>Building your profile</div>
          </div>
        </aside>
      </div>
      <style>{`
        @keyframes cardbPulse{0%,100%{transform:scale(0.85);opacity:0.85}50%{transform:scale(1.08);opacity:1}}
        .cardb-slider{-webkit-appearance:none;appearance:none;height:5px;border-radius:999px;background:linear-gradient(90deg,#0E0D0C ${sliderPct}%,#E0DDD5 ${sliderPct}%);outline:none;border:none;width:100%}
        .cardb-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#0E0D0C;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.28);cursor:pointer}
        .cardb-slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#0E0D0C;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.28);cursor:pointer;border:none}
      `}</style>
    </BrowserChrome>
  );
}

// ─── 03 THINKING
function Thinking({ go }) {
  useEffect(() => { const t = setTimeout(() => go('results'), 2400); return () => clearTimeout(t); }, []);
  return (
    <BrowserChrome url="cardb.app/matching" onBack={() => go('onboarding')}>
      <div style={{ flex:1, background:C.cream, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:32, fontFamily:FONT, color:C.ink, position:'relative', overflow:'hidden' }}>
        <Blob w={320} h={280} bg={C.pinkSoft} style={{ position:'absolute', left:-80, top:'5%', zIndex:0 }}/>
        <Blob w={240} h={200} bg={C.blueSoft} rx="50% 50% 30% 70% / 60% 40% 60% 40%" style={{ position:'absolute', right:-60, bottom:'10%', zIndex:0 }}/>
        <Ring r={36} dash="5 5" style={{ position:'absolute', top:'15%', right:'22%', opacity:0.3, zIndex:1 }}/>
        <Spark s={18} c={C.stone} style={{ position:'absolute', top:'20%', left:'24%', opacity:0.5, zIndex:1 }}/>
        <Spark s={12} c={C.stone} style={{ position:'absolute', bottom:'25%', right:'26%', opacity:0.4, zIndex:1 }}/>
        <div style={{ position:'relative', width:240, height:240, display:'grid', placeItems:'center', zIndex:2 }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:`radial-gradient(circle,${C.pink} 0%,${C.blue} 55%,transparent 75%)`, animation:'cardbPulse 2.4s ease-in-out infinite' }}/>
          <Spark s={52} style={{ position:'relative', zIndex:1 }}/>
        </div>
        <div style={{ textAlign:'center' }}>
          <h2 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:48, letterSpacing:'-0.025em', lineHeight:1, margin:'0 0 10px' }}>
            Matching your <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>240</em> options.
          </h2>
          <p style={{ fontSize:17, color:C.stone, margin:0, lineHeight:1.55, maxWidth:480 }}>
            Translating your everyday into specs, ruling out cars that don't fit, and ranking what's left.
          </p>
        </div>
        <div style={{ fontFamily:MONO, fontSize:15, color:C.stone, lineHeight:1.9, textAlign:'center' }}>
          <div>· cabin space — 5 adults</div>
          <div>· trunk — 2 car-seats + groceries</div>
          <div>· parking — self-park required</div>
          <div>· fuel — under $180 / month</div>
        </div>
      </div>
      <style>{`@keyframes cardbPulse{0%,100%{transform:scale(0.85);opacity:0.85}50%{transform:scale(1.08);opacity:1}}`}</style>
    </BrowserChrome>
  );
}

// ─── 04 RESULTS
const CARS = [
  { id:'hatch', pct:94, name:'The reliable hatchback', meta:'Compact · 4-door · 2024 · Hybrid', price:26400, ribbon:'Top match', bg:C.pinkSoft, img:'mazda3.webp', reasons:['Fits 5 adults comfortably for the school run','Self-parks — your tight city-park concern','Hybrid: ~52 mpg combined'] },
  { id:'cross', pct:88, name:'The roomy crossover',    meta:'Mid-size · 5-door · 2023 · Hybrid', price:31900, bg:C.blueSoft,   img:'crossover.avif', reasons:['Big trunk for groceries + a stroller','Higher seat height — easier for parents','Slightly thirstier in the city'] },
  { id:'sedan', pct:81, name:'The sensible sedan',     meta:'Compact · 4-door · 2022 · Used',   price:19200, bg:C.greenSoft,  img:'sedan.png',       reasons:['Lowest total cost of ownership in the list','Plenty of trunk for two car-seats + bags','No hybrid option in this trim'] },
  { id:'suv',   pct:76, name:'The weekend-friendly SUV',meta:'Mid · 5-door · 2024 · Hybrid',    price:34800, bg:C.butterSoft, img:'suv.webp',        reasons:['Best for the gear & dog combo','Tight in your usual parking spot','Stretches the budget by ~12%'] },
];

function Results({ go, set }) {
  const [hovered, setHovered] = useState(null);
  return (
    <BrowserChrome url="cardb.app/results — your matches, ranked" onBack={() => go('onboarding')}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.cream, color:C.ink, fontFamily:FONT, overflow:'hidden' }}>
        <div style={{ padding:'24px 48px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px dashed #d9d3c2', flexShrink:0 }}>
          <div>
            <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:34, letterSpacing:'-0.02em', lineHeight:1 }}>
              Your <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>matches.</em>
            </div>
            <div style={{ fontSize:14, color:C.stone, marginTop:6 }}>Based on 15 answers · refreshed just now · <b style={{ color:C.ink }}>4 of 240 cars</b></div>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'flex-end' }}>
            {['All','New','Used','Hybrid','Under $30k','5-seater','+ Add filter'].map((t,i) => (
              <Chip key={i} on={i===0}>{t}</Chip>
            ))}
          </div>
        </div>
        <div style={{ flex:1, padding:'28px 48px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:22, overflowY:'auto' }}>
          {CARS.map((car,i) => (
            <div key={car.id} onClick={() => { set({ carId:car.id }); go('detail'); }}
              onMouseEnter={() => setHovered(car.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:22, overflow:'hidden',
                display:'flex', flexDirection:'column', cursor:'pointer',
                boxShadow: hovered===car.id ? `5px 5px 0 ${C.ink}` : 'none',
                transform: hovered===car.id ? 'translate(-2px,-2px)' : 'none',
                transition:'box-shadow 120ms, transform 120ms',
              }}>
              <div style={{ aspectRatio:'16/10', background:car.bg, borderBottom:`1.5px solid ${C.ink}`, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                {car.img ? (
                  <img src={car.img} alt={car.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center bottom', position:'relative', zIndex:1 }}/>
                ) : (<>
                  <Blob w={90} h={80} bg={C.paper} rx="50% 50% 40% 60% / 55% 45% 55% 45%" style={{ position:'absolute', bottom:-24, right:-20, opacity:0.5 }}/>
                  <Spark s={14} c={C.ink} style={{ position:'absolute', top:14, right:40, opacity:0.5 }}/>
                  <CarIcon w={150} fill={C.paper} glass={C.blueSoft} style={{ position:'relative', zIndex:1 }}/>
                </>)}
                <div style={{ position:'absolute', top:10, left:10, background:C.ink, color:C.cream, fontFamily:DISPLAY, fontWeight:900, fontSize:20, padding:'6px 11px', borderRadius:10, letterSpacing:'-0.02em', display:'flex', alignItems:'baseline', gap:2 }}>
                  {car.pct}<span style={{ fontSize:11, fontWeight:600 }}>%</span>
                </div>
                {car.ribbon && (
                  <div style={{ position:'absolute', top:10, right:10, background:C.green, border:`1px solid ${C.ink}`, borderRadius:999, padding:'4px 9px', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' }}>{car.ribbon}</div>
                )}
              </div>
              <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:8, flex:1 }}>
                <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:20, lineHeight:1.05, letterSpacing:'-0.01em' }}>{car.name}</div>
                <div style={{ fontSize:13, color:C.stone }}>{car.meta}</div>
                <ul style={{ margin:'4px 0 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:5 }}>
                  {car.reasons.map((r,j) => (
                    <li key={j} style={{ fontSize:13, lineHeight:1.4, display:'flex', gap:7, alignItems:'flex-start' }}>
                      <span style={{ color:C.ink, fontSize:10, marginTop:3 }}>✦</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderTop:`1px solid ${C.ink}`, padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:18 }}>${car.price.toLocaleString()}</span>
                <span style={{ background:C.pink, border:`1px solid ${C.ink}`, borderRadius:999, padding:'5px 12px', fontSize:12, fontWeight:700 }}>View ›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// ─── 05 CAR DETAIL (2-column)
function Detail({ go, state }) {
  const car = CARS.find(c => c.id === state.carId) || CARS[0];
  return (
    <BrowserChrome url={`cardb.app/match/${car.id}`} onBack={() => go('results')}>
      <AppNav progress={0} go={go}/>
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1.3fr 1fr', overflow:'hidden', fontFamily:FONT, color:C.ink }}>
        <div style={{ padding:'36px 48px', borderRight:'1px dashed #d9d3c2', display:'flex', flexDirection:'column', gap:20, background:C.cream, overflowY:'auto' }}>
          <div style={{ fontSize:13, color:C.stone }}>Your matches <b style={{ color:C.ink }}>›</b> {car.name}</div>
          <h2 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:56, letterSpacing:'-0.025em', lineHeight:1, margin:0 }}>
            {car.name.replace(/^The /,'').replace(/ \w+$/,'')}<br/>
            <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>{car.name.split(' ').pop()}.</em>
          </h2>
          <div style={{ aspectRatio:'16/8', border:`1.5px solid ${C.ink}`, borderRadius:22, background:car.bg, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            {car.img ? (
              <img src={car.img} alt={car.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center bottom', position:'relative', zIndex:1 }}/>
            ) : (<>
              <Blob w={180} h={160} bg={C.paper} rx="50% 50% 40% 60% / 55% 45% 55% 45%" style={{ position:'absolute', bottom:-50, right:-40, opacity:0.45 }}/>
              <Blob w={120} h={100} bg={C.paper} rx="40% 60% 50% 50% / 45% 55% 45% 55%" style={{ position:'absolute', top:-30, left:-30, opacity:0.35 }}/>
              <Ring r={56} style={{ position:'absolute', top:20, right:24, opacity:0.2 }}/>
              <Spark s={20} style={{ position:'absolute', bottom:24, left:48, opacity:0.5 }}/>
              <CarIcon w={300} fill={C.paper} glass={C.blueSoft} style={{ position:'relative', zIndex:1 }}/>
            </>)}
            <div style={{ position:'absolute', top:14, left:16, background:C.ink, color:C.cream, fontFamily:DISPLAY, fontWeight:900, fontSize:26, padding:'8px 16px', borderRadius:14, display:'flex', alignItems:'baseline', gap:3 }}>
              {car.pct}<span style={{ fontSize:12, fontWeight:600 }}>% match</span>
            </div>
          </div>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:20, padding:'22px 24px' }}>
            <Eyebrow style={{ marginBottom:14 }}>Why we matched you · in plain language</Eyebrow>
            <ol style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:14 }}>
              {car.reasons.map((r,i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'30px 1fr', gap:14, fontSize:15, lineHeight:1.5, alignItems:'start' }}>
                  <span style={{ background:C.green, border:`1px solid ${C.ink}`, borderRadius:'50%', width:30, height:30, display:'grid', placeItems:'center', fontFamily:MONO, fontSize:11, fontWeight:600 }}>0{i+1}</span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ padding:'36px', background:`linear-gradient(180deg,${C.pinkSoft},${C.blueSoft})`, display:'flex', flexDirection:'column', gap:20, overflowY:'auto' }}>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:20, overflow:'hidden' }}>
            <div style={{ background:C.ink, color:C.cream, padding:'10px 18px', fontSize:11, letterSpacing:1.8, textTransform:'uppercase', fontWeight:700 }}>Specs · translated</div>
            {[
              ['Cabin space','5 adults, comfortable'],
              ['Trunk','2 car-seats + groceries'],
              ['Parking','Self-parks · 4.2m+ ok'],
              ['Fuel use','~52 mpg combined'],
              ['Powertrain','Hybrid (no plug)'],
              ['Insurance','Low (group 14)'],
              ['5-yr ownership','$32,000 est.'],
            ].map(([k,v],i,a) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'13px 18px', borderBottom: i<a.length-1 ? '1px dashed #d9d3c2' : 'none', fontSize:14 }}>
                <span style={{ color:C.stone }}>{k}</span><span style={{ fontWeight:700 }}>{v}</span>
              </div>
            ))}
          </div>

          <div onClick={() => go('expert')} style={{ background:C.ink, color:C.cream, borderRadius:20, padding:'22px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', border:`1.5px solid ${C.ink}`, cursor:'pointer' }}>
            <div>
              <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:24, lineHeight:1.1 }}>
                Want a real human<br/><em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500, color:C.green }}>to confirm this?</em>
              </div>
              <div style={{ fontSize:13, color:'#bdb6a6', marginTop:6 }}>An advisor reviews your top 3 in &lt;24h.</div>
            </div>
            <div style={{ background:C.green, color:C.ink, borderRadius:'50%', width:52, height:52, display:'grid', placeItems:'center', fontSize:22, fontWeight:700, border:`1.5px solid ${C.cream}`, flexShrink:0 }}>›</div>
          </div>
          <Btn onClick={() => go('results')} bg={C.paper} style={{ width:'100%', textAlign:'center' }}>← Compare with another match</Btn>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ─── 06/07/08 EXPERT
function Expert({ go, state, set }) {
  const stage = state.expertStage || 'send';

  const ProfileCard = ({ withQuote }) => (
    <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:22, padding:'24px 24px', display:'flex', gap:20, alignItems:'flex-start', boxShadow:`5px 5px 0 ${C.ink}` }}>
      <div style={{ width:100, height:100, borderRadius:'50%', border:`1.5px solid ${C.ink}`, background:'radial-gradient(circle at 35% 30%,#FFD9C2 0%,#E89C77 60%,#A26747 100%)', flexShrink:0 }}/>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:28, letterSpacing:'-0.01em' }}>Noa Berger</div>
        <div style={{ fontSize:14, color:C.stone, margin:'3px 0 10px' }}>Independent advisor · 11 years · ex-fleet buyer</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {['VETTED','NO DEALER PAY','~6h avg','★ 4.9 / 248 reviews'].map(t => (
            <span key={t} style={{ fontSize:11, fontWeight:700, letterSpacing:'0.04em', background:C.green, border:`1px solid ${C.ink}`, borderRadius:999, padding:'4px 10px' }}>{t}</span>
          ))}
        </div>
        {withQuote && (
          <p style={{ margin:'12px 0 0', fontSize:14, lineHeight:1.5, color:C.stone }}>
            "I'll look at your top three with the lens of your everyday — not the spec sheet. If any are wrong for you, I'll say so."
          </p>
        )}
      </div>
    </div>
  );

  const StagesList = ({ active }) => {
    const stages = [['Shortlist confirmed','2 min ago'],['Sent to advisor','just now'],['Advisor reviewing your picks','~ 6 hours'],['Response delivered','expected today'],['You confirm or revisit','']];
    const activeIdx = active==='send' ? 1 : active==='reviewing' ? 2 : 4;
    return (
      <div style={{ border:`1.5px solid ${C.ink}`, borderRadius:16, overflow:'hidden', background:C.paper }}>
        {stages.map(([label,when],i) => {
          const done=i<activeIdx, curr=i===activeIdx;
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'15px 18px', borderBottom:i<stages.length-1?`1px solid ${C.ink}`:'none', background:curr?C.blueSoft:(done?C.greenSoft:C.paper), fontWeight:curr?700:500, fontSize:14 }}>
              <span style={{ width:16, height:16, borderRadius:'50%', border:`1.5px solid ${C.ink}`, background:done?C.green:(curr?C.blue:C.paper), boxShadow:curr?`0 0 0 5px rgba(183,220,248,0.6)`:'none', flexShrink:0 }}/>
              {label}
              <span style={{ marginLeft:'auto', color:C.stone, fontSize:12 }}>{when}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (stage === 'send') {
    return (
      <BrowserChrome url="cardb.app/expert/handoff" onBack={() => go('detail')}>
        <AppNav progress={0} go={go}/>
        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden', fontFamily:FONT, color:C.ink }}>
          <div style={{ padding:'44px 56px', background:C.cream, display:'flex', flexDirection:'column', gap:22, borderRight:'1px dashed #d9d3c2', overflowY:'auto' }}>
            <Eyebrow>Step 03 · expert review</Eyebrow>
            <h2 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:54, lineHeight:0.95, letterSpacing:'-0.025em', margin:0 }}>
              Send your shortlist<br/>to a <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>real person.</em>
            </h2>
            <p style={{ fontSize:16, color:C.ink, maxWidth:480, lineHeight:1.5, margin:0 }}>
              An advisor reviews your three picks within 24 hours, calls out anything the AI missed, and sends back a confidence-graded recommendation.
            </p>
            <StagesList active="send"/>
            <p style={{ fontSize:14, color:C.stone, lineHeight:1.5, margin:0 }}>
              Average advisor response time: <b style={{ color:C.ink }}>8 hours.</b> We'll email you the moment it's back.
            </p>
          </div>
          <div style={{ padding:'44px 48px', background:C.pinkSoft, display:'flex', flexDirection:'column', gap:18, overflowY:'auto' }}>
            <ProfileCard withQuote/>
            <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:18, padding:20 }}>
              <Eyebrow style={{ marginBottom:10 }}>Shortlist · 3 cars</Eyebrow>
              <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {CARS.slice(0,3).map(c => (
                  <li key={c.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:14, fontWeight:600, borderBottom:'1px dashed #d9d3c2', paddingBottom:8 }}>
                    {c.name}<span style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:16 }}>{c.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div onClick={() => set({ expertStage:'reviewing' })} style={{ background:C.ink, color:C.cream, borderRadius:16, padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}>
              <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:18 }}>Send shortlist to Noa · 24h max</div>
              <div style={{ background:C.green, color:C.ink, borderRadius:'50%', width:42, height:42, display:'grid', placeItems:'center', fontSize:18, fontWeight:700 }}>→</div>
            </div>
          </div>
        </div>
      </BrowserChrome>
    );
  }

  if (stage === 'reviewing') {
    return (
      <BrowserChrome url="cardb.app/expert/awaiting" onBack={() => set({ expertStage:'send' })}>
        <AppNav progress={0} go={go}/>
        <ExpertReviewing set={set}/>
      </BrowserChrome>
    );
  }

  return (
    <BrowserChrome url="cardb.app/expert/response" onBack={() => go('results')}>
      <AppNav progress={0} go={go}/>
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden', fontFamily:FONT, color:C.ink }}>
        <div style={{ padding:'44px 56px', background:C.greenSoft, display:'flex', flexDirection:'column', gap:20, borderRight:'1px dashed #d9d3c2', overflowY:'auto' }}>
          <Eyebrow>Noa's recommendation</Eyebrow>
          <h2 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:52, lineHeight:0.95, letterSpacing:'-0.025em', margin:0 }}>
            Go with the <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>hatchback.</em>
          </h2>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:18, padding:20 }}>
            <Eyebrow style={{ marginBottom:12 }}>Confidence · ranked</Eyebrow>
            {[['Hatchback',9,C.green,'Right car · I\'d commit.'],['Crossover',7,C.blue,'Good runner-up · pricier insurance.'],['Sedan',5,C.pink,'OK · but the trunk geometry is tight.']].map(([n,s,bg,note]) => (
              <div key={n} style={{ background:bg, border:`1px solid ${C.ink}`, borderRadius:14, padding:'13px 16px', marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, fontWeight:700 }}>
                  {n}<span style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:18 }}>{s}/10</span>
                </div>
                <div style={{ fontSize:13, marginTop:3 }}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:20, fontSize:15, lineHeight:1.5 }}>
            <Eyebrow style={{ marginBottom:8 }}>Note from Noa</Eyebrow>
            <p style={{ margin:0 }}>"I checked the local listings — the hybrid LX with the safety pack is your sweet spot. <em style={{ fontFamily:ITAL, fontStyle:'italic' }}>Don't</em> pay over <b>$27,200</b>. Skip the paint protection package — pure markup."</p>
          </div>
        </div>
        <div style={{ padding:'44px 48px', background:C.pinkSoft, display:'flex', flexDirection:'column', gap:18, overflowY:'auto' }}>
          <ProfileCard/>
          <Btn primary full onClick={() => go('brief')} style={{ marginTop:'auto' }}>Generate dealership brief ›</Btn>
          <Btn onClick={() => go('results')} bg={C.paper} full>← Back to results</Btn>
        </div>
      </div>
    </BrowserChrome>
  );
}

function ExpertReviewing({ set }) {
  useEffect(() => { const t = setTimeout(() => set({ expertStage:'response' }), 2400); return () => clearTimeout(t); }, []);
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:C.blueSoft, gap:28, fontFamily:FONT, color:C.ink }}>
      <div style={{ position:'relative', width:220, height:220, display:'grid', placeItems:'center' }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:`radial-gradient(circle,${C.blue} 0%,${C.pink} 60%,transparent 75%)`, animation:'cardbPulse 2.4s ease-in-out infinite' }}/>
        <div style={{ position:'relative', width:110, height:110, borderRadius:'50%', border:`1.5px solid ${C.ink}`, background:'radial-gradient(circle at 35% 30%,#FFD9C2 0%,#E89C77 60%,#A26747 100%)' }}/>
      </div>
      <h2 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:44, letterSpacing:'-0.02em', lineHeight:1, margin:0, textAlign:'center' }}>
        Noa is reviewing<br/>your <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>three picks.</em>
      </h2>
      <p style={{ fontSize:17, color:C.stone, textAlign:'center', maxWidth:440, margin:0, lineHeight:1.5 }}>
        We'll notify you the moment the response is ready. Average ~6 hours.
      </p>
      <style>{`@keyframes cardbPulse{0%,100%{transform:scale(0.85);opacity:0.85}50%{transform:scale(1.08);opacity:1}}`}</style>
    </div>
  );
}

// ─── 09 DEALERSHIP BRIEF
function Brief({ go }) {
  return (
    <BrowserChrome url="cardb.app/brief/the-reliable-hatchback" onBack={() => go('expert')}>
      <AppNav progress={0} go={go}/>
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 0.95fr', overflow:'hidden', fontFamily:FONT, color:C.ink }}>
        <div style={{ padding:'40px 48px', background:C.cream, display:'flex', flexDirection:'column', gap:20, borderRight:'1px dashed #d9d3c2', overflowY:'auto' }}>
          <Eyebrow>Step 04 · dealership brief</Eyebrow>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:'30px 32px', flex:1, display:'flex', flexDirection:'column', gap:14, position:'relative' }}>
            <div style={{ position:'absolute', top:18, right:18, width:42, height:42, border:`1.5px solid ${C.ink}`, borderRadius:'50%', background:C.green, display:'grid', placeItems:'center' }}>
              <svg width="18" height="14" viewBox="0 0 18 14"><path d="M1 7l5 5L17 1" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontFamily:MONO, fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:C.stone }}>CarDB · prep brief · v1 · ready to print</div>
            <h3 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:38, lineHeight:0.95, letterSpacing:'-0.02em', margin:0 }}>
              Walking into<br/>the <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>dealership.</em>
            </h3>
            <CarIcon w={200} fill={C.greenSoft} glass={C.blue} style={{ margin:'8px 0 0' }}/>
            {[['Fair price range','$25,800 — $27,200',true],['Recommended trim','Hybrid LX · base + safety pack',false],['Confidence (advisor)','High · 9/10',false]].map(([k,v,big]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:14, borderBottom:'1px dashed #d9d3c2', padding:'10px 0', alignItems:'center' }}>
                <span style={{ color:C.stone }}>{k}</span>
                <b style={{ fontFamily:big?DISPLAY:FONT, fontWeight:900, fontSize:big?16:14, textAlign:'right' }}>{v}</b>
              </div>
            ))}
            <div style={{ fontSize:11, letterSpacing:1.6, textTransform:'uppercase', fontWeight:700, color:C.stone, marginTop:6 }}>Ask · five questions worth asking</div>
            <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
              {["What is the actual on-the-road price including delivery and all mandatory fees?","Can I see the same trim with only the safety pack — no other upsells?","What is the residual value estimate at 3 years and 5 years?","Is the hybrid warranty transferable if I sell within the warranty period?","What's the first scheduled service and what does it cover?"].map((q,i) => (
                <li key={i} style={{ fontSize:13.5, lineHeight:1.45, display:'flex', gap:10 }}>
                  <span style={{ fontWeight:700 }}>›</span><span>{q}</span>
                </li>
              ))}
            </ul>
            <div style={{ fontSize:11, letterSpacing:1.6, textTransform:'uppercase', fontWeight:700, color:C.stone, marginTop:4 }}>Watch · 3 things to refuse</div>
            <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
              {['Paint protection packages — low value, high markup.','Extended warranty before the maker\'s warranty starts.','Dealer-installed accessories you didn\'t ask for.'].map((t,i) => (
                <li key={i} style={{ fontSize:13.5, lineHeight:1.45, display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ background:C.butter, border:`1px solid ${C.ink}`, borderRadius:'50%', width:20, height:20, display:'inline-grid', placeItems:'center', fontWeight:900, fontSize:10, flexShrink:0, marginTop:1 }}>!</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ padding:'40px 44px', background:C.greenSoft, display:'flex', flexDirection:'column', gap:18, overflowY:'auto' }}>
          <h4 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:30, letterSpacing:'-0.01em', margin:0 }}>
            Take <em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>with you.</em>
          </h4>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[['📱','Send to phone','Tap to text yourself a link'],['🖨','Print the brief','PDF formatted for A4 / Letter'],['💬','Share with partner','Send a read-only copy']].map(([ic,t,sub],i) => (
              <div key={i} style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:'18px 22px', display:'flex', alignItems:'center', gap:18, cursor:'pointer' }}>
                <div style={{ width:42, height:42, borderRadius:'50%', border:`1.5px solid ${C.ink}`, display:'grid', placeItems:'center', flexShrink:0, fontSize:18, background:[C.pink,C.blue,C.butter][i] }}>{ic}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:600 }}>{t}</div>
                  <div style={{ fontSize:13, color:C.stone, marginTop:3 }}>{sub}</div>
                </div>
                <div style={{ marginLeft:'auto', color:C.stone, fontSize:22 }}>›</div>
              </div>
            ))}
          </div>
          <div style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:16, padding:22, marginTop:'auto' }}>
            <div style={{ fontSize:11, letterSpacing:1.6, textTransform:'uppercase', fontWeight:700, color:C.stone, marginBottom:10 }}>Recommended config</div>
            {[['Exterior','Pearl White'],['Interior','Charcoal cloth'],['Pack','Safety pack only'],['Skip','Paint protection / mats']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, fontWeight:600, padding:'8px 0', borderBottom:'1px dashed #d9d3c2' }}>
                <div style={{ width:22, height:22, borderRadius:5, border:`1px solid ${C.ink}`, background:C.blue, flexShrink:0 }}/>
                <span style={{ color:C.stone, fontSize:12, width:64 }}>{k}</span>
                {v}
              </div>
            ))}
          </div>
          <Btn primary full onClick={() => go('sent')}>Send to my phone ›</Btn>
          <Btn full bg={C.paper} onClick={() => go('welcome')}>Restart for a new car</Btn>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ─── 10 SENT — final confirmation
function Sent({ go }) {
  return (
    <BrowserChrome url="cardb.app/brief/sent" onBack={() => go('brief')}>
      <div style={{ flex:1, display:'flex', background:C.cream, color:C.ink, fontFamily:FONT, overflow:'hidden', position:'relative' }}>

        {/* decorative bg */}
        <Blob w={380} h={320} bg={C.greenSoft} style={{ position:'absolute', left:-80, top:'5%', zIndex:0 }}/>
        <Blob w={260} h={220} bg={C.butter} rx="50% 50% 30% 70% / 60% 40% 60% 40%" style={{ position:'absolute', right:-50, bottom:'8%', zIndex:0 }}/>
        <Blob w={140} h={120} bg={C.pinkSoft} rx="40% 60% 55% 45% / 50% 45% 55% 50%" style={{ position:'absolute', right:'38%', top:'6%', zIndex:0, opacity:0.8 }}/>
        <Spark s={36} style={{ position:'absolute', top:'38%', left:'44%', zIndex:1 }}/>
        <Spark s={20} c={C.stone} style={{ position:'absolute', top:'16%', right:'32%', zIndex:1 }}/>
        <Spark s={14} c={C.stone} style={{ position:'absolute', bottom:'20%', left:'36%', zIndex:1, opacity:0.5 }}/>
        <Ring r={44} style={{ position:'absolute', top:'58%', right:'26%', zIndex:1, opacity:0.2 }}/>
        <Ring r={26} dash="3 4" style={{ position:'absolute', top:'20%', left:'50%', zIndex:1, opacity:0.25 }}/>

        {/* left — hero */}
        <div style={{ flex:'1.15', padding:'72px 88px', display:'flex', flexDirection:'column', justifyContent:'center', gap:32, position:'relative', zIndex:2 }}>

          {/* checkmark */}
          <div style={{ width:72, height:72, borderRadius:'50%', background:C.ink, display:'grid', placeItems:'center', border:`1.5px solid ${C.ink}`, boxShadow:`4px 4px 0 ${C.stone}` }}>
            <svg width="30" height="24" viewBox="0 0 30 24"><path d="M2 12 L11 21 L28 2" stroke={C.cream} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          <div>
            <h1 style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:'clamp(72px,7vw,120px)', letterSpacing:'-0.045em', lineHeight:0.88, margin:'0 0 16px' }}>
              You're<br/><em style={{ fontFamily:ITAL, fontStyle:'italic', fontWeight:500 }}>ready.</em>
            </h1>
            <p style={{ fontSize:20, lineHeight:1.5, maxWidth:500, margin:0, color:C.stone }}>
              Your CarDB brief is on its way to your phone. Walk into the dealership knowing more than they expect.
            </p>
          </div>

          {/* car summary pill */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:16, background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:999, padding:'14px 24px', alignSelf:'flex-start', boxShadow:`3px 3px 0 ${C.ink}` }}>
            <CarIcon w={64} fill={C.greenSoft} glass={C.blue}/>
            <div>
              <div style={{ fontFamily:DISPLAY, fontWeight:900, fontSize:18, letterSpacing:'-0.01em' }}>The reliable hatchback</div>
              <div style={{ fontSize:13, color:C.stone, marginTop:2 }}>Fair price · $25,800 – $27,200</div>
            </div>
          </div>

          <div style={{ display:'flex', gap:12 }}>
            <Btn onClick={() => go('welcome')} style={{ fontSize:14 }}>Start over for a new car</Btn>
          </div>
        </div>

        {/* right — what's next */}
        <div style={{ flex:'0.85', padding:'72px 64px', display:'flex', alignItems:'center', background:`linear-gradient(150deg,${C.greenSoft},${C.cream})`, borderLeft:`1px solid ${C.ink}`, position:'relative', zIndex:2 }}>
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:20 }}>

            <Eyebrow>What's in your brief</Eyebrow>

            {[
              [C.green,  '✓', 'Fair price range',     '$25,800 – $27,200 · don\'t go above'],
              [C.blue,   '›', 'Recommended trim',     'Hybrid LX · safety pack only'],
              [C.butter, '!', 'Things to refuse',     'Paint protection, extended warranty, dealer accessories'],
              [C.pink,   '?', '5 questions to ask',   'On-road price, residual value, warranty transfer'],
            ].map(([bg, icon, title, detail]) => (
              <div key={title} style={{ background:C.paper, border:`1.5px solid ${C.ink}`, borderRadius:18, padding:'18px 22px', display:'flex', gap:16, alignItems:'flex-start' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:bg, border:`1.5px solid ${C.ink}`, display:'grid', placeItems:'center', fontWeight:900, fontSize:16, flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:3 }}>{title}</div>
                  <div style={{ fontSize:13, color:C.stone, lineHeight:1.4 }}>{detail}</div>
                </div>
              </div>
            ))}

            <Wave w={260} style={{ marginTop:4, opacity:0.3 }}/>
            <p style={{ fontSize:13, color:C.stone, margin:0, lineHeight:1.5 }}>
              Advisor confidence: <b style={{ color:C.ink }}>9/10</b> · reviewed by Noa Berger
            </p>
          </div>
        </div>

      </div>
    </BrowserChrome>
  );
}

// ─── MACBOOK AIR FRAME
function MacbookAir({ children }) {
  // Base edge-to-edge (1512px); lid 56px inset each side
  const SCREEN_W = 1372, SCREEN_H = 858; // 16:10
  const LID_W    = 1400, LID_H    = 892; // 22px top bezel, 12px bottom bezel
  const BASE_W   = 1512, BASE_H   = 72;
  const HINGE_H  = 8;
  // Scale app content (designed at 1512×982) to fit inside screen
  const SCALE    = SCREEN_H / 982;                           // 0.8737
  const SCALED_W = Math.round(1512 * SCALE);                 // 1321
  const ML       = Math.round((SCREEN_W - SCALED_W) / 2);   // 26

  return (
    <div style={{
      width:1512, height:982,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden', userSelect:'none',
    }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>

        {/* Lid */}
        <div style={{
          width:LID_W, height:LID_H, position:'relative',
          background:'linear-gradient(165deg,#D8D4CF 0%,#C2BEB9 55%,#B6B2AD 100%)',
          borderRadius:'14px 14px 2px 2px',
          boxShadow:'0 -4px 24px rgba(0,0,0,0.18),0 2px 8px rgba(0,0,0,0.16),inset 0 1px 0 rgba(255,255,255,0.45)',
          border:'1px solid rgba(0,0,0,0.22)',
        }}>
          {/* Camera */}
          <div style={{
            position:'absolute', top:11, left:'50%', transform:'translateX(-50%)',
            width:8, height:8, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 35%,#2A2A2A,#0A0A0A)',
            boxShadow:'0 0 0 1.5px #1A1818',
          }}/>
          {/* Screen */}
          <div style={{
            position:'absolute',
            top:22, left:(LID_W - SCREEN_W) / 2,
            width:SCREEN_W, height:SCREEN_H,
            background:'#060606', borderRadius:4, overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', top:0, left:ML,
              width:1512, height:982,
              transform:`scale(${SCALE})`,
              transformOrigin:'top left',
            }}>
              {children}
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div style={{
          width:BASE_W, height:HINGE_H,
          background:'linear-gradient(180deg,#787470 0%,#A4A09B 55%,#B0ACA7 100%)',
          boxShadow:'0 3px 10px rgba(0,0,0,0.32)',
        }}/>

        {/* Base */}
        <div style={{
          width:BASE_W, height:BASE_H,
          background:'linear-gradient(180deg,#BABAB5 0%,#C6C2BD 35%,#B2AEA9 100%)',
          borderRadius:'0 0 8px 8px',
          border:'1px solid rgba(0,0,0,0.18)', borderTop:'none',
          boxShadow:'0 6px 28px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.12)',
          position:'relative',
        }}>
          {/* Keyboard hint */}
          <div style={{ position:'absolute', top:10, left:180, right:180, height:24, background:'rgba(0,0,0,0.09)', borderRadius:5 }}/>
          {/* Trackpad */}
          <div style={{
            position:'absolute', bottom:9, left:'50%', transform:'translateX(-50%)',
            width:240, height:32,
            background:'rgba(0,0,0,0.09)', borderRadius:7,
            border:'1px solid rgba(0,0,0,0.12)',
          }}/>
        </div>
      </div>
    </div>
  );
}

// ─── ROUTER
function CarDBApp({ start = 'welcome' }) {
  const [screen, setScreen] = useState(start);
  const [state, setState] = useState({ budget:350, everyday:[0,2], carId:'hatch', expertStage:'send' });
  const set = patch => setState(s => ({ ...s, ...patch }));
  const go  = s => { setScreen(s); if (s==='expert') set({ expertStage:'send' }); };
  const map = { welcome:Welcome, onboarding:Onboarding, thinking:Thinking, results:Results, detail:Detail, expert:Expert, brief:Brief, sent:Sent };
  const Comp = map[screen] || Welcome;
  return (
    <MacbookAir>
      <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column' }}>
        <Comp go={go} state={state} set={set}/>
      </div>
    </MacbookAir>
  );
}

window.CarDBApp = CarDBApp;

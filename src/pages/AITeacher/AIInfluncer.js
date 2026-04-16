import { useState, useRef, useEffect } from "react";
import {
  Steps, Form, Input, Select, Button, Tag, Slider, Progress,
  Row, Col, Divider, Tooltip, Badge, Switch, Spin
} from "antd";
import {
  UserOutlined, BulbOutlined, SoundOutlined, EditOutlined,
  ThunderboltOutlined, HeartOutlined, BookOutlined, SmileOutlined,
  StarOutlined, PlayCircleOutlined, DownloadOutlined, SaveOutlined,
  ReloadOutlined, CopyOutlined, CalendarOutlined, FireOutlined,
  RocketOutlined, ArrowRightOutlined, CheckCircleOutlined,
  AudioOutlined, FileTextOutlined, InstagramOutlined,
  LinkedinOutlined, PictureOutlined, HistoryOutlined,
  LoadingOutlined, SendOutlined, GlobalOutlined
} from "@ant-design/icons";

// ── Design Tokens ─────────────────────────────────────────────────
const C = {
  bg:       "#0A0B0F",
  surface:  "#111318",
  card:     "#161B26",
  border:   "#1E2535",
  accent:   "#6C63FF",
  accentAlt:"#FF6584",
  gold:     "#F5A623",
  green:    "#2ECC71",
  text:     "#E8EAF0",
  muted:    "#636B80",
  dim:      "#2A3142",
};

const FONT_DISPLAY = "'DM Serif Display', Georgia, serif";
const FONT_BODY    = "'DM Sans', system-ui, sans-serif";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  body { background: ${C.bg}; color: ${C.text}; font-family: ${FONT_BODY}; }

  .studio-wrap { min-height: 100vh; background: ${C.bg}; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.surface}; }
  ::-webkit-scrollbar-thumb { background: ${C.accent}40; border-radius: 4px; }

  /* Ant overrides */
  .ant-steps-item-title { color: ${C.text} !important; font-family: ${FONT_BODY} !important; font-size: 13px !important; }
  .ant-steps-item-description { color: ${C.muted} !important; font-size: 11px !important; }
  .ant-steps-item-process .ant-steps-item-icon { background: ${C.accent} !important; border-color: ${C.accent} !important; }
  .ant-steps-item-finish .ant-steps-item-icon { background: ${C.green}20 !important; border-color: ${C.green} !important; }
  .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon { color: ${C.green} !important; }
  .ant-steps-item-wait .ant-steps-item-icon { background: ${C.dim} !important; border-color: ${C.border} !important; }
  .ant-steps-item-wait .ant-steps-icon { color: ${C.muted} !important; }
  .ant-steps-item-tail::after { background-color: ${C.border} !important; }
  .ant-steps-item-finish .ant-steps-item-tail::after { background-color: ${C.accent}60 !important; }

  .ant-input, .ant-select-selector, .ant-input-affix-wrapper {
    background: ${C.dim} !important; border-color: ${C.border} !important;
    color: ${C.text} !important; border-radius: 8px !important;
    font-family: ${FONT_BODY} !important;
  }
  .ant-input::placeholder, .ant-select-selection-placeholder { color: ${C.muted} !important; }
  .ant-input:focus, .ant-input:hover, .ant-select-selector:focus, .ant-select-focused .ant-select-selector {
    border-color: ${C.accent} !important; box-shadow: 0 0 0 2px ${C.accent}25 !important;
  }
  .ant-select-arrow { color: ${C.muted} !important; }
  .ant-select-dropdown { background: #1A2035 !important; border: 1px solid ${C.border} !important; border-radius: 10px !important; }
  .ant-select-item { color: ${C.text} !important; font-family: ${FONT_BODY} !important; }
  .ant-select-item-option-active, .ant-select-item-option-selected { background: ${C.accent}20 !important; }
  .ant-form-item-label > label { color: ${C.muted} !important; font-family: ${FONT_BODY} !important; font-size: 12px !important; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
  .ant-slider-rail { background: ${C.dim} !important; }
  .ant-slider-track { background: ${C.accent} !important; }
  .ant-slider-handle { border-color: ${C.accent} !important; background: ${C.accent} !important; }

  /* Tabs */
  .studio-tabs { display: flex; gap: 0; border-bottom: 1px solid ${C.border}; margin-bottom: 0; }
  .studio-tab { padding: 14px 24px; cursor: pointer; font-family: ${FONT_BODY}; font-size: 13px; font-weight: 500; color: ${C.muted}; border-bottom: 2px solid transparent; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
  .studio-tab:hover { color: ${C.text}; }
  .studio-tab.active { color: ${C.accent}; border-bottom-color: ${C.accent}; }

  /* Cards */
  .s-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; }
  .s-card-hover { transition: border-color 0.2s, box-shadow 0.2s; }
  .s-card-hover:hover { border-color: ${C.accent}50; box-shadow: 0 0 20px ${C.accent}10; }

  /* Tone chips */
  .tone-chip { cursor: pointer; padding: 10px 16px; border-radius: 10px; border: 1.5px solid ${C.border}; background: ${C.dim}; color: ${C.muted}; font-size: 13px; font-family: ${FONT_BODY}; font-weight: 500; display: flex; align-items: center; gap: 8px; transition: all 0.2s; user-select: none; }
  .tone-chip:hover { border-color: ${C.accent}60; color: ${C.text}; }
  .tone-chip.selected { border-color: ${C.accent}; background: ${C.accent}18; color: ${C.accent}; }

  /* Content type card */
  .ctype-card { cursor: pointer; padding: 16px; border-radius: 12px; border: 1.5px solid ${C.border}; background: ${C.dim}; text-align: center; transition: all 0.22s; }
  .ctype-card:hover { border-color: ${C.accent}60; transform: translateY(-2px); }
  .ctype-card.selected { border-color: ${C.accent}; background: ${C.accent}15; box-shadow: 0 4px 20px ${C.accent}20; transform: translateY(-2px); }

  /* Objective chips */
  .obj-chip { cursor: pointer; padding: 8px 18px; border-radius: 30px; border: 1.5px solid ${C.border}; background: ${C.dim}; color: ${C.muted}; font-size: 12px; font-family: ${FONT_BODY}; font-weight: 600; letter-spacing: 0.5px; transition: all 0.2s; }
  .obj-chip:hover { border-color: ${C.gold}60; color: ${C.text}; }
  .obj-chip.selected { border-color: ${C.gold}; background: ${C.gold}18; color: ${C.gold}; }

  /* Hook style chips */
  .hook-chip { cursor: pointer; padding: 7px 14px; border-radius: 8px; border: 1.5px solid ${C.border}; background: ${C.dim}; color: ${C.muted}; font-size: 12px; font-family: ${FONT_BODY}; transition: all 0.2s; }
  .hook-chip:hover { border-color: ${C.accentAlt}60; color: ${C.text}; }
  .hook-chip.selected { border-color: ${C.accentAlt}; background: ${C.accentAlt}18; color: ${C.accentAlt}; }

  /* Buttons */
  .btn-primary { background: linear-gradient(135deg, ${C.accent}, #8B83FF) !important; border: none !important; border-radius: 10px !important; font-family: ${FONT_BODY} !important; font-weight: 600 !important; height: 44px !important; color: #fff !important; transition: all 0.2s !important; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px ${C.accent}40 !important; }
  .btn-ghost { background: ${C.dim} !important; border: 1px solid ${C.border} !important; border-radius: 10px !important; font-family: ${FONT_BODY} !important; font-weight: 500 !important; height: 44px !important; color: ${C.muted} !important; transition: all 0.2s !important; }
  .btn-ghost:hover { border-color: ${C.accent}60 !important; color: ${C.text} !important; }
  .btn-gold { background: linear-gradient(135deg, ${C.gold}, #E8920A) !important; border: none !important; border-radius: 10px !important; font-family: ${FONT_BODY} !important; font-weight: 600 !important; height: 44px !important; color: #fff !important; }
  .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px ${C.gold}40 !important; }

  /* Output section */
  .output-block { background: ${C.dim}; border: 1px solid ${C.border}; border-radius: 10px; padding: 16px; position: relative; }
  .output-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 8px; }
  .output-text { font-size: 14px; color: ${C.text}; line-height: 1.7; font-family: ${FONT_BODY}; }

  /* Voice waveform animation */
  @keyframes wave { 0%,100%{height:8px} 50%{height:28px} }
  .wave-bar { display: inline-block; width: 3px; border-radius: 3px; background: ${C.accent}; margin: 0 1.5px; animation: wave 1.2s ease-in-out infinite; }

  /* Pulse */
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulse { animation: pulse 2s ease-in-out infinite; }

  /* Fade in */
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.4s ease both; }

  /* Progress bar */
  .ant-progress-bg { background: linear-gradient(90deg, ${C.accent}, #8B83FF) !important; }

  /* Voice speed slider label */
  .speed-label { font-size: 11px; color: ${C.muted}; font-family: ${FONT_BODY}; }

  /* Sidebar persona card */
  .persona-preview { background: linear-gradient(135deg, ${C.accent}18, ${C.accentAlt}10); border: 1px solid ${C.accent}40; border-radius: 14px; padding: 20px; }

  /* Textarea override */
  textarea.ant-input { resize: none !important; }

  /* Section heading */
  .sec-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 14px; }

  /* Audio player */
  .audio-bar { height: 6px; background: ${C.dim}; border-radius: 3px; overflow: hidden; cursor: pointer; }
  .audio-fill { height: 100%; background: linear-gradient(90deg, ${C.accent}, ${C.accentAlt}); border-radius: 3px; transition: width 0.1s linear; }

  /* Nav */
  .sidebar { width: 220px; min-height: 100vh; background: ${C.surface}; border-right: 1px solid ${C.border}; padding: 24px 16px; display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-family: ${FONT_BODY}; font-size: 13px; font-weight: 500; color: ${C.muted}; transition: all 0.18s; }
  .nav-item:hover { background: ${C.dim}; color: ${C.text}; }
  .nav-item.active { background: ${C.accent}18; color: ${C.accent}; }
  .nav-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.6; }
`;

// ── Tone options ─────────────────────────────────────────────────
const TONES = [
  { key:"professional", label:"Professional", icon:<StarOutlined/>, color:"#6C63FF" },
  { key:"bold",         label:"Bold",         icon:<ThunderboltOutlined/>, color:"#FF6584" },
  { key:"emotional",    label:"Emotional",    icon:<HeartOutlined/>, color:"#E74C3C" },
  { key:"educational",  label:"Educational",  icon:<BookOutlined/>, color:"#3498DB" },
  { key:"storytelling", label:"Storytelling", icon:<EditOutlined/>, color:"#F5A623" },
  { key:"funny",        label:"Funny",        icon:<SmileOutlined/>, color:"#2ECC71" },
];

const CONTENT_TYPES = [
  { key:"reel",      label:"Reel",          icon:<InstagramOutlined/>, desc:"15–90s video" },
  { key:"linkedin",  label:"LinkedIn Post", icon:<LinkedinOutlined/>,  desc:"Professional post" },
  { key:"carousel",  label:"Carousel",      icon:<PictureOutlined/>,   desc:"Swipe slides" },
  { key:"story",     label:"Story",         icon:<HistoryOutlined/>,   desc:"24hr ephemeral" },
];

const OBJECTIVES = ["Educate","Sell","Engage","Story"];
const HOOK_STYLES = ["Controversial","Emotional","Curiosity","Data-Driven","Humour"];
const LANGUAGES = ["English","Hindi","Tamil","Telugu","Bengali","Marathi","Punjabi","Kannada"];
const VOICE_TONES = ["Male – Deep","Male – Energetic","Female – Warm","Female – Bold","Neutral – Clear","Young – Upbeat"];
const INDUSTRIES = ["Tech & SaaS","Finance & Investment","Health & Wellness","Education","Real Estate","Fashion & Lifestyle","Food & Beverage","Marketing","Law","Fitness"];
const CITIES = ["Mumbai","Delhi","Bangalore","Chennai","Hyderabad","Kolkata","Pune","Ahmedabad","Jaipur","Dubai","Singapore","London","New York"];

// ── Fake generated output ─────────────────────────────────────────
const SAMPLE_OUTPUT = {
  hook: "Most founders are building for the wrong market — and they don't even know it.",
  script: `Here's what nobody tells you about B2B sales in 2025:\n\nThe top 1% of closers don't sell features. They sell transformation.\n\nWhile everyone else is pitching ROI decks and demo calls, the best founders are asking one question: "What does your life look like 6 months after this works?"\n\nThat's it. That's the entire shift.\n\nWhen you move from features → outcomes → identity, your close rate doesn't double. It triples.\n\nI've seen this work across 400+ SaaS companies. The pattern is identical.\n\nSave this. You'll thank me in Q4.`,
  caption: "The sales playbook nobody teaches you 🔥\n\nMost founders pitch features. Top 1% pitch transformation.\n\nHere's the framework that helped 400+ SaaS companies 3x their close rate 👇",
  hashtags: "#SaaS #FounderLife #B2BSales #StartupGrowth #SalesStrategy #Entrepreneurship #BusinessGrowth #LinkedInTips",
  cta: "Follow for daily strategies that move the needle. Drop '🔥' if this hits different.",
};

// ── Waveform ──────────────────────────────────────────────────────
function Waveform({ playing }) {
  const bars = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div style={{ display:"flex", alignItems:"center", height:36, gap:0 }}>
      {bars.map(i => (
        <div key={i} className="wave-bar"
          style={{
            height: playing ? undefined : `${4 + Math.sin(i*0.7)*10 + 8}px`,
            animationDelay: `${i*0.05}s`,
            animationPlayState: playing ? "running" : "paused",
            opacity: playing ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

// ── Output block ──────────────────────────────────────────────────
function OutputBlock({ label, content, accent = C.accent, mono = false }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(content); setCopied(true); setTimeout(()=>setCopied(false),1500); };
  return (
    <div className="output-block fade-up" style={{ borderLeft: `3px solid ${accent}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div className="output-label" style={{ color: accent }}>{label}</div>
        <Tooltip title={copied?"Copied!":"Copy"}>
          <button onClick={copy} style={{ background:"none", border:"none", cursor:"pointer", color: copied ? C.green : C.muted, fontSize:13, display:"flex", alignItems:"center", gap:4, padding:0 }}>
            {copied ? <CheckCircleOutlined/> : <CopyOutlined/>}
          </button>
        </Tooltip>
      </div>
      <div className="output-text" style={{ fontFamily: mono ? "monospace" : FONT_BODY, whiteSpace:"pre-wrap", fontSize:13 }}>
        {content}
      </div>
    </div>
  );
}

// ── Step 1: Basic Identity ────────────────────────────────────────
function Step1({ data, onChange }) {
  const update = (k,v) => onChange({ ...data, [k]:v });
  return (
    <div className="fade-up">
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:C.text, marginBottom:6 }}>Build Your Persona</div>
        <div style={{ fontSize:13, color:C.muted }}>Define your influencer identity — this shapes every piece of content we generate.</div>
      </div>
      <Row gutter={[20,0]}>
        <Col xs={24} md={12}>
          <Form.Item label="Influencer Name">
            <Input prefix={<UserOutlined style={{ color:C.muted }}/>} placeholder="e.g. Arjun Mehta" value={data.name||""} onChange={e=>update("name",e.target.value)} size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Industry">
            <Select placeholder="Select your industry" value={data.industry||undefined} onChange={v=>update("industry",v)} size="large" style={{ width:"100%" }}>
              {INDUSTRIES.map(i=><Select.Option key={i} value={i}>{i}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="City / Region">
            <Select placeholder="Where are you based?" value={data.city||undefined} onChange={v=>update("city",v)} size="large" style={{ width:"100%" }}>
              {CITIES.map(c=><Select.Option key={c} value={c}>{c}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Target Audience">
            <Input placeholder="e.g. Early-stage SaaS founders, 25–40" value={data.audience||""} onChange={e=>update("audience",e.target.value)} size="large" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Main Goal">
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[
                { key:"lead_gen",  label:"Lead Generation", icon:<RocketOutlined/> },
                { key:"authority", label:"Build Authority",  icon:<StarOutlined/> },
                { key:"brand",     label:"Brand Awareness",  icon:<FireOutlined/> },
              ].map(g=>(
                <div key={g.key} className={`tone-chip ${data.goal===g.key?"selected":""}`}
                  style={{ flex:"1 1 140px", justifyContent:"center", padding:"14px 12px" }}
                  onClick={()=>update("goal",g.key)}>
                  <span style={{ fontSize:16 }}>{g.icon}</span>
                  <span style={{ fontWeight:600 }}>{g.label}</span>
                </div>
              ))}
            </div>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

// ── Step 2: Tone & Personality ────────────────────────────────────
function Step2({ data, onChange }) {
  const toggle = (key) => {
    const cur = data.tones||[];
    const next = cur.includes(key) ? cur.filter(t=>t!==key) : [...cur,key];
    onChange({ ...data, tones: next });
  };
  return (
    <div className="fade-up">
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:C.text, marginBottom:6 }}>Tone & Personality</div>
        <div style={{ fontSize:13, color:C.muted }}>Select up to 3 tones. These define how your content feels to your audience.</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        {TONES.map(t=>{
          const sel = (data.tones||[]).includes(t.key);
          return (
            <div key={t.key} className={`tone-chip ${sel?"selected":""}`}
              style={{ justifyContent:"flex-start", padding:"16px 18px", borderColor: sel ? t.color : undefined, background: sel ? `${t.color}15` : undefined, color: sel ? t.color : undefined }}
              onClick={()=>toggle(t.key)}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{t.label}</div>
              </div>
            </div>
          );
        })}
      </div>
      {(data.tones||[]).length > 0 && (
        <div style={{ marginTop:20, padding:"14px 18px", background:C.dim, borderRadius:10, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, color:C.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>Your Tone Mix</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {(data.tones||[]).map(k=>{
              const t = TONES.find(x=>x.key===k);
              return <Tag key={k} style={{ background:`${t.color}20`, borderColor:`${t.color}50`, color:t.color, borderRadius:20, fontFamily:FONT_BODY, fontSize:12 }}>{t.label}</Tag>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Step 3: Language & Voice ──────────────────────────────────────
function Step3({ data, onChange }) {
  const update = (k,v) => onChange({ ...data, [k]:v });
  return (
    <div className="fade-up">
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:C.text, marginBottom:6 }}>Language & Voice</div>
        <div style={{ fontSize:13, color:C.muted }}>Configure how your content sounds — connected to Sarvam TTS for voice generation.</div>
      </div>
      <Row gutter={[20,0]}>
        <Col xs={24} md={12}>
          <Form.Item label="Content Language">
            <Select placeholder="Choose language" value={data.language||undefined} onChange={v=>update("language",v)} size="large" style={{ width:"100%" }}
              suffixIcon={<GlobalOutlined style={{ color:C.muted }}/>}>
              {LANGUAGES.map(l=><Select.Option key={l} value={l}>{l}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Voice Tone (Sarvam TTS)">
            <Select placeholder="Select voice character" value={data.voiceTone||undefined} onChange={v=>update("voiceTone",v)} size="large" style={{ width:"100%" }}
              suffixIcon={<AudioOutlined style={{ color:C.muted }}/>}>
              {VOICE_TONES.map(v=><Select.Option key={v} value={v}>{v}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <div style={{ marginTop:4, padding:"20px", background:C.dim, borderRadius:12, border:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <div>
                <div style={{ fontFamily:FONT_BODY, fontWeight:600, color:C.text, fontSize:14 }}>Sarvam TTS Integration</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>Powers multilingual AI voice for your content</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:C.green }} className="pulse"/>
                <span style={{ fontSize:12, color:C.green, fontWeight:600 }}>Connected</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {["Hindi","Tamil","English","Bengali"].map(l=>(
                <div key={l} style={{ padding:"6px 14px", background:`${C.accent}15`, border:`1px solid ${C.accent}30`, borderRadius:20, fontSize:12, color:C.accent, fontFamily:FONT_BODY }}>
                  {l}
                </div>
              ))}
              <div style={{ padding:"6px 14px", background:C.card, border:`1px solid ${C.border}`, borderRadius:20, fontSize:12, color:C.muted, fontFamily:FONT_BODY }}>+4 more</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

// ── Content Studio ────────────────────────────────────────────────
function ContentStudio({ persona }) {
  const [contentType, setContentType] = useState("reel");
  const [topic, setTopic]             = useState("");
  const [objective, setObjective]     = useState("Educate");
  const [length, setLength]           = useState(60);
  const [hookStyle, setHookStyle]     = useState("Curiosity");
  const [generating, setGenerating]   = useState(false);
  const [output, setOutput]           = useState(null);

  const generate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setOutput(null);
    setTimeout(() => { setGenerating(false); setOutput(SAMPLE_OUTPUT); }, 2200);
  };

  return (
    <div style={{ display:"flex", gap:24, alignItems:"flex-start" }}>
      {/* Input Panel */}
      <div style={{ flex:"0 0 380px" }}>
        <div className="s-card" style={{ padding:24 }}>
          <div style={{ fontFamily:FONT_DISPLAY, fontSize:18, color:C.text, marginBottom:4 }}>Content Studio</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:22 }}>Configure your content parameters</div>

          {/* Content Type */}
          <div className="sec-label">Content Type</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:22 }}>
            {CONTENT_TYPES.map(ct=>(
              <div key={ct.key} className={`ctype-card ${contentType===ct.key?"selected":""}`} onClick={()=>setContentType(ct.key)}>
                <div style={{ fontSize:24, color:contentType===ct.key?C.accent:C.muted, marginBottom:6 }}>{ct.icon}</div>
                <div style={{ fontSize:13, fontWeight:600, color:contentType===ct.key?C.text:C.muted }}>{ct.label}</div>
                <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{ct.desc}</div>
              </div>
            ))}
          </div>

          {/* Topic */}
          <div className="sec-label">Topic</div>
          <Input.TextArea
            placeholder="e.g. Why most founders fail at B2B sales in 2025..."
            value={topic} onChange={e=>setTopic(e.target.value)}
            autoSize={{ minRows:3, maxRows:5 }} style={{ marginBottom:20 }}
          />

          {/* Objective */}
          <div className="sec-label">Objective</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
            {OBJECTIVES.map(o=>(
              <div key={o} className={`obj-chip ${objective===o?"selected":""}`} onClick={()=>setObjective(o)}>{o}</div>
            ))}
          </div>

          <Divider style={{ borderColor:C.border, margin:"0 0 20px" }} />

          {/* Advanced */}
          <div className="sec-label">Advanced Options</div>

          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:C.muted }}>Content Length</span>
              <span style={{ fontSize:13, color:C.accent, fontWeight:600 }}>{length}s</span>
            </div>
            <Slider min={15} max={180} step={15} value={length} onChange={setLength}
              marks={{ 15:"15s", 60:"60s", 90:"90s", 180:"3m" }}
              style={{ marginBottom:8 }} />
          </div>

          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:12, color:C.muted, marginBottom:10 }}>Hook Style</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {HOOK_STYLES.map(h=>(
                <div key={h} className={`hook-chip ${hookStyle===h?"selected":""}`} onClick={()=>setHookStyle(h)}>{h}</div>
              ))}
            </div>
          </div>

          <Button className="btn-primary" block size="large" onClick={generate} disabled={!topic.trim()}>
            {generating
              ? <><Spin indicator={<LoadingOutlined style={{ color:"#fff",fontSize:14 }}/>} /> &nbsp; Generating…</>
              : <><ThunderboltOutlined /> &nbsp; Generate Content</>
            }
          </Button>
        </div>

        {/* Persona preview */}
        {persona.name && (
          <div className="persona-preview" style={{ marginTop:16 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:C.accent, textTransform:"uppercase", marginBottom:10 }}>Active Persona</div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:16, color:C.text, marginBottom:6 }}>{persona.name}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {persona.industry && <Tag style={{ background:`${C.accent}20`, borderColor:`${C.accent}40`, color:C.accent, borderRadius:20, fontSize:11 }}>{persona.industry}</Tag>}
              {persona.city && <Tag style={{ background:`${C.accentAlt}20`, borderColor:`${C.accentAlt}40`, color:C.accentAlt, borderRadius:20, fontSize:11 }}>{persona.city}</Tag>}
              {(persona.tones||[]).slice(0,2).map(t=>{
                const tone = TONES.find(x=>x.key===t);
                return <Tag key={t} style={{ background:`${tone.color}20`, borderColor:`${tone.color}40`, color:tone.color, borderRadius:20, fontSize:11 }}>{tone.label}</Tag>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Output Panel */}
      <div style={{ flex:1 }}>
        {!output && !generating && (
          <div style={{ height:400, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:`${C.accent}15`, border:`2px solid ${C.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, color:`${C.accent}60` }}>
              <FileTextOutlined/>
            </div>
            <div style={{ fontFamily:FONT_BODY, fontSize:14, color:C.muted, textAlign:"center" }}>
              Configure your content on the left<br/>and hit <strong style={{ color:C.text }}>Generate</strong> to see the magic
            </div>
          </div>
        )}

        {generating && (
          <div style={{ height:400, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
            <div style={{ position:"relative" }}>
              <Progress type="circle" percent={75} size={80}
                strokeColor={{ "0%":C.accent, "100%":"#8B83FF" }}
                trailColor={C.dim} format={()=><ThunderboltOutlined style={{ fontSize:24, color:C.accent }}/>}
              />
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:FONT_BODY, fontSize:14, color:C.text, marginBottom:4 }}>Crafting your content…</div>
              <div style={{ fontSize:12, color:C.muted }}>AI is analyzing your persona and topic</div>
            </div>
          </div>
        )}

        {output && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <div>
                <div style={{ fontFamily:FONT_DISPLAY, fontSize:18, color:C.text }}>Generated Content</div>
                <div style={{ fontSize:12, color:C.muted }}>{contentType.charAt(0).toUpperCase()+contentType.slice(1)} · {objective} · {hookStyle} hook · {length}s</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Button className="btn-ghost" size="small" icon={<ReloadOutlined/>} onClick={generate}>Regenerate</Button>
                <Button className="btn-ghost" size="small" icon={<CalendarOutlined/>}>Save to Calendar</Button>
              </div>
            </div>

            <OutputBlock label="🪝 Hook" content={output.hook} accent={C.accentAlt} />
            <OutputBlock label="📜 Full Script" content={output.script} accent={C.accent} />
            <OutputBlock label="✍️ Caption" content={output.caption} accent={C.gold} />
            <OutputBlock label="# Hashtags" content={output.hashtags} accent={C.green} mono />

            <div className="output-block fade-up" style={{ borderLeft:`3px solid ${C.accent}` }}>
              <div className="output-label" style={{ color:C.accent }}>🎯 CTA</div>
              <div className="output-text">{output.cta}</div>
            </div>

            <Button className="btn-primary" size="large" icon={<SendOutlined/>} style={{ marginTop:4 }}>
              Export to Voice Studio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Voice Studio ──────────────────────────────────────────────────
function VoiceStudio({ persona }) {
  const [script, setScript]       = useState(SAMPLE_OUTPUT.script);
  const [voice, setVoice]         = useState(undefined);
  const [speed, setSpeed]         = useState(1.0);
  const [pitch, setPitch]         = useState(0);
  const [generating, setGen]      = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playing, setPlaying]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const timerRef                  = useRef(null);

  const generate = () => {
    setGen(true);
    setGenerated(false);
    setTimeout(() => { setGen(false); setGenerated(true); }, 2500);
  };

  const togglePlay = () => {
    if (!generated) return;
    if (playing) {
      clearInterval(timerRef.current);
      setPlaying(false);
    } else {
      setPlaying(true);
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(timerRef.current); setPlaying(false); return 0; }
          return p + 0.5;
        });
      }, 80);
    }
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div style={{ display:"flex", gap:24, alignItems:"flex-start" }}>
      {/* Left: Controls */}
      <div style={{ flex:"0 0 340px" }}>
        <div className="s-card" style={{ padding:24 }}>
          <div style={{ fontFamily:FONT_DISPLAY, fontSize:18, color:C.text, marginBottom:4 }}>Voice Studio</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:22 }}>Powered by Sarvam TTS · Multilingual AI voices</div>

          <div className="sec-label">Script Preview</div>
          <Input.TextArea value={script} onChange={e=>setScript(e.target.value)}
            autoSize={{ minRows:6, maxRows:12 }} style={{ marginBottom:22, fontSize:13 }} />

          <div className="sec-label">Voice Selection</div>
          <Select placeholder="Choose a voice character" value={voice||undefined}
            onChange={v=>setVoice(v)} size="large" style={{ width:"100%", marginBottom:20 }}
            suffixIcon={<AudioOutlined style={{ color:C.muted }}/>}>
            {VOICE_TONES.map(v=><Select.Option key={v} value={v}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <SoundOutlined style={{ color:C.accent }}/>
                <span>{v}</span>
              </div>
            </Select.Option>)}
          </Select>

          <div style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:C.muted }}>Speed</span>
              <span style={{ fontSize:13, color:C.accent, fontWeight:600 }}>{speed.toFixed(1)}x</span>
            </div>
            <Slider min={0.5} max={2} step={0.1} value={speed} onChange={setSpeed}
              marks={{ 0.5:"0.5x", 1:"1x", 1.5:"1.5x", 2:"2x" }} />
          </div>

          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:C.muted }}>Pitch</span>
              <span style={{ fontSize:13, color:C.accent, fontWeight:600 }}>{pitch > 0 ? `+${pitch}` : pitch}</span>
            </div>
            <Slider min={-5} max={5} step={1} value={pitch} onChange={setPitch}
              marks={{ "-5":"Low", 0:"Normal", 5:"High" }} />
          </div>

          <Button className="btn-gold" block size="large" onClick={generate} disabled={!script.trim()}>
            {generating
              ? <><Spin indicator={<LoadingOutlined style={{ color:"#fff",fontSize:14 }}/>}/> &nbsp;Generating Audio…</>
              : <><SoundOutlined/> &nbsp;Generate Audio</>
            }
          </Button>
        </div>
      </div>

      {/* Right: Player & Output */}
      <div style={{ flex:1 }}>
        {/* Audio Player Card */}
        <div className="s-card" style={{ padding:28, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
            <div>
              <div style={{ fontFamily:FONT_DISPLAY, fontSize:16, color:C.text }}>Audio Preview</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>
                {voice || "No voice selected"} · {speed.toFixed(1)}x speed
              </div>
            </div>
            {generated && (
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:C.green }}/>
                <span style={{ fontSize:12, color:C.green, fontWeight:600 }}>Ready</span>
              </div>
            )}
          </div>

          {/* Waveform display */}
          <div style={{
            background:C.dim, borderRadius:12, padding:"20px 24px",
            display:"flex", alignItems:"center", gap:20, marginBottom:18,
            border:`1px solid ${C.border}`,
            opacity: generated ? 1 : 0.4,
          }}>
            <button onClick={togglePlay} disabled={!generated}
              style={{ width:48, height:48, borderRadius:"50%", background:playing?C.accentAlt:C.accent, border:"none", cursor:generated?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#fff", flexShrink:0, transition:"all 0.2s" }}>
              {playing ? "⏸" : "▶"}
            </button>
            <div style={{ flex:1 }}>
              <Waveform playing={playing} />
              <div className="audio-bar" style={{ marginTop:8 }}>
                <div className="audio-fill" style={{ width:`${progress}%` }}/>
              </div>
            </div>
            <span style={{ fontSize:12, color:C.muted, flexShrink:0, fontFamily:"monospace" }}>
              {Math.floor(progress*0.48/60).toString().padStart(2,"0")}:{Math.floor(progress*0.48%60).toString().padStart(2,"0")} / 0:48
            </span>
          </div>

          {!generated && !generating && (
            <div style={{ textAlign:"center", padding:"12px 0", fontSize:13, color:C.muted }}>
              Generate audio to preview your voice
            </div>
          )}

          {generating && (
            <div style={{ textAlign:"center", padding:"12px 0" }}>
              <Progress percent={60} showInfo={false} strokeColor={{ "0%":C.gold,"100%":"#E8920A" }} trailColor={C.dim} />
              <div style={{ fontSize:12, color:C.muted, marginTop:8 }}>Synthesizing voice with Sarvam TTS…</div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="s-card" style={{ padding:24 }}>
          <div style={{ fontFamily:FONT_BODY, fontWeight:600, fontSize:14, color:C.text, marginBottom:16 }}>Export Options</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            {[
              { icon:<DownloadOutlined/>, label:"Download MP3",        desc:"High quality 320kbps",        color:C.accent,    disabled:!generated },
              { icon:<InstagramOutlined/>, label:"Export to Reel",     desc:"Direct to editor",            color:C.accentAlt, disabled:!generated },
              { icon:<SaveOutlined/>,     label:"Save to Library",     desc:"Access anytime",              color:C.gold,      disabled:!generated },
            ].map(ex=>(
              <button key={ex.label} disabled={ex.disabled}
                style={{ background:ex.disabled?C.dim:`${ex.color}12`, border:`1px solid ${ex.disabled?C.border:`${ex.color}40`}`, borderRadius:12, padding:"16px 14px", cursor:ex.disabled?"not-allowed":"pointer", text:"left", transition:"all 0.2s", opacity:ex.disabled?0.5:1 }}
                onMouseEnter={e=>{ if(!ex.disabled) e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ fontSize:20, color:ex.color, marginBottom:8 }}>{ex.icon}</div>
                <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:3 }}>{ex.label}</div>
                <div style={{ fontSize:11, color:C.muted }}>{ex.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language note */}
        {persona.language && (
          <div style={{ marginTop:16, padding:"12px 18px", background:`${C.accent}10`, border:`1px solid ${C.accent}30`, borderRadius:10, display:"flex", alignItems:"center", gap:10 }}>
            <GlobalOutlined style={{ color:C.accent, fontSize:14 }}/>
            <span style={{ fontSize:12, color:C.muted }}>
              Voice will be generated in <strong style={{ color:C.text }}>{persona.language}</strong> using <strong style={{ color:C.accent }}>Sarvam TTS</strong> · {persona.voiceTone || "Default voice"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Persona Builder Wizard ────────────────────────────────────────
function PersonaBuilder({ onComplete }) {
  const [step, setStep]       = useState(0);
  const [persona, setPersona] = useState({});

  const steps = [
    { title:"Basic Identity",    desc:"Name & niche",       icon:<UserOutlined/> },
    { title:"Tone & Personality",desc:"How you communicate",icon:<BulbOutlined/> },
    { title:"Language & Voice",  desc:"Sarvam TTS config",  icon:<SoundOutlined/> },
  ];

  const isValid = () => {
    if (step===0) return persona.name && persona.industry;
    if (step===1) return (persona.tones||[]).length > 0;
    if (step===2) return persona.language;
    return true;
  };

  const next = () => { if (step < 2) setStep(step+1); else onComplete(persona); };
  const prev = () => { if (step > 0) setStep(step-1); };

  return (
    <div>
      {/* Steps */}
      <div style={{ marginBottom:32 }}>
        <Steps current={step} items={steps.map((s,i)=>({ title:s.title, description:s.desc, icon: i < step ? <CheckCircleOutlined/> : s.icon }))} />
      </div>

      {/* Step content */}
      <div style={{ minHeight:360 }}>
        <Form layout="vertical" style={{ "--ant-form-item-margin-bottom":"18px" }}>
          {step===0 && <Step1 data={persona} onChange={setPersona} />}
          {step===1 && <Step2 data={persona} onChange={setPersona} />}
          {step===2 && <Step3 data={persona} onChange={setPersona} />}
        </Form>
      </div>

      {/* Nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:28, paddingTop:20, borderTop:`1px solid ${C.border}` }}>
        <Button className="btn-ghost" size="large" onClick={prev} disabled={step===0}>← Back</Button>
        <div style={{ display:"flex", gap:8 }}>
          {steps.map((_,i)=>(
            <div key={i} style={{ width: i===step?24:6, height:6, borderRadius:3, background: i<=step?C.accent:C.dim, transition:"all 0.3s" }}/>
          ))}
        </div>
        <Button className="btn-primary" size="large" onClick={next} disabled={!isValid()}>
          {step===2 ? "Finish & Launch →" : "Next →"}
        </Button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────
const TABS = [
  { key:"persona", label:"Persona Builder", icon:<UserOutlined/> },
  { key:"content", label:"Content Studio",  icon:<BulbOutlined/> },
  { key:"voice",   label:"Voice Studio",    icon:<SoundOutlined/> },
];

export default function AppAITeacher() {
  const [activeTab, setActiveTab] = useState("persona");
  const [persona, setPersona]     = useState({});
  const [personaDone, setPersonaDone] = useState(false);

  const handlePersonaDone = (p) => {
    setPersona(p);
    setPersonaDone(true);
    setActiveTab("content");
  };

  return (
    <div className="studio-wrap">
      <style>{GLOBAL_CSS}</style>

      <div style={{ display:"flex", minHeight:"100vh" }}>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Logo */}
          <div style={{ marginBottom:32 }}>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, color:C.text, letterSpacing:0.5 }}>
              <span style={{ color:C.accent }}>Influence</span>AI
            </div>
            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Content Intelligence Platform</div>
          </div>

          {/* Nav */}
          {TABS.map(t=>(
            <div key={t.key} className={`nav-item ${activeTab===t.key?"active":""}`}
              onClick={()=>setActiveTab(t.key)}>
              {t.icon}
              <span>{t.label}</span>
              {t.key==="content" && personaDone && (
                <div style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:C.green }}/>
              )}
            </div>
          ))}

          <div style={{ flex:1 }}/>

          {/* Persona quick info */}
          {personaDone && (
            <div style={{ padding:"14px", background:C.card, borderRadius:10, border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:6 }}>Active Persona</div>
              <div style={{ fontFamily:FONT_DISPLAY, fontSize:14, color:C.text, marginBottom:4 }}>{persona.name}</div>
              <div style={{ fontSize:11, color:C.muted }}>{persona.industry}</div>
              {persona.language && <div style={{ fontSize:11, color:C.accent, marginTop:4 }}>{persona.language} · {(persona.voiceTone||"").split("–")[0].trim()}</div>}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Top bar */}
          <div style={{ padding:"20px 32px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.surface }}>
            <div>
              <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, color:C.text }}>
                {activeTab==="persona" && "Persona Builder"}
                {activeTab==="content" && "Content Studio"}
                {activeTab==="voice"   && "Voice Studio"}
              </div>
              <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>
                {activeTab==="persona" && "Define your influencer identity in 3 steps"}
                {activeTab==="content" && "Generate platform-ready content from your persona"}
                {activeTab==="voice"   && "Convert scripts to multilingual AI voice"}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {personaDone && activeTab!=="persona" && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px", background:`${C.green}15`, border:`1px solid ${C.green}40`, borderRadius:20 }}>
                  <CheckCircleOutlined style={{ color:C.green, fontSize:12 }}/>
                  <span style={{ fontSize:12, color:C.green, fontWeight:600 }}>{persona.name}</span>
                </div>
              )}
              <div style={{ width:36, height:36, borderRadius:"50%", background:C.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:"#fff", fontWeight:700, fontFamily:FONT_DISPLAY }}>
                {persona.name?.charAt(0) || "?"}
              </div>
            </div>
          </div>

          {/* Page Body */}
          <div style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>
            {activeTab==="persona" && (
              <div style={{ maxWidth:720, margin:"0 auto" }}>
                {personaDone ? (
                  <div className="fade-up">
                    <div style={{ textAlign:"center", marginBottom:28 }}>
                      <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
                      <div style={{ fontFamily:FONT_DISPLAY, fontSize:24, color:C.text, marginBottom:6 }}>Persona Ready!</div>
                      <div style={{ fontSize:13, color:C.muted }}>Your influencer identity has been configured. Head to Content Studio to start creating.</div>
                    </div>
                    <div className="persona-preview">
                      <Row gutter={[20,16]}>
                        {[
                          { label:"Name",       val: persona.name },
                          { label:"Industry",   val: persona.industry },
                          { label:"City",       val: persona.city },
                          { label:"Audience",   val: persona.audience },
                          { label:"Goal",       val: ({"lead_gen":"Lead Generation","authority":"Build Authority","brand":"Brand Awareness"})[persona.goal] },
                          { label:"Language",   val: persona.language },
                          { label:"Voice",      val: persona.voiceTone },
                        ].filter(x=>x.val).map(x=>(
                          <Col xs={12} sm={8} key={x.label}>
                            <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:4 }}>{x.label}</div>
                            <div style={{ fontSize:13, color:C.text, fontWeight:500 }}>{x.val}</div>
                          </Col>
                        ))}
                      </Row>
                      {(persona.tones||[]).length>0 && (
                        <div style={{ marginTop:16 }}>
                          <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:8 }}>Tones</div>
                          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                            {persona.tones.map(k=>{
                              const t=TONES.find(x=>x.key===k);
                              return <Tag key={k} style={{ background:`${t.color}20`, borderColor:`${t.color}50`, color:t.color, borderRadius:20, fontFamily:FONT_BODY }}>{t.label}</Tag>;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", gap:12, marginTop:20 }}>
                      <Button className="btn-ghost" size="large" style={{ flex:1 }} onClick={()=>setPersonaDone(false)}>Edit Persona</Button>
                      <Button className="btn-primary" size="large" style={{ flex:2 }} onClick={()=>setActiveTab("content")}>
                        Go to Content Studio <ArrowRightOutlined/>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <PersonaBuilder onComplete={handlePersonaDone} />
                )}
              </div>
            )}

            {activeTab==="content" && (
              <ContentStudio persona={persona} />
            )}

            {activeTab==="voice" && (
              <VoiceStudio persona={persona} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
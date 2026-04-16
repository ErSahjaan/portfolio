import { useState, useCallback, useRef, useEffect } from "react";
import {
  Layout, Button, Typography, Row, Col, Space, Slider, Tag, Modal,
  Tabs, Radio, Tooltip, message, Divider, Badge, Card, Statistic,
  Upload, InputNumber, Grid
} from "antd";
import {
  StarFilled, UploadOutlined, SaveOutlined, ShoppingCartOutlined,
  EyeOutlined, ArrowRightOutlined, BoldOutlined, ItalicOutlined,
  FontSizeOutlined, LeftOutlined, RightOutlined, CloseOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

/* ─────────── TOKENS ─────────── */
const C = {
  ebony: "#0a0806", ivory: "#f8f4ee", parchment: "#ede5d4",
  gold: "#c9962a", goldlt: "#e8b84b", golddk: "#8a6518",
  rust: "#c0370a", sage: "#2d4228", slate: "#1c2330", smoke: "#8a7d6e",
};

/* ─────────── DATA ─────────── */
const SHIRT_COLORS = [
  { c: "#f8f4ee", name: "Ivory" }, { c: "#0a0806", name: "Ebony" },
  { c: "#c0370a", name: "Rust" },  { c: "#185FA5", name: "Navy" },
  { c: "#2d4228", name: "Forest" },{ c: "#534AB7", name: "Royal" },
  { c: "#993556", name: "Berry" }, { c: "#5F5E5A", name: "Slate" },
  { c: "#c9962a", name: "Gold" },  { c: "#e8b84b", name: "Amber" },
  { c: "#ede5d4", name: "Sand" },  { c: "#ffffff", name: "White" },
];

const FONTS = [
  { label: "Playfair", value: "'Playfair Display',serif" },
  { label: "Outfit",   value: "'Outfit',sans-serif" },
  { label: "Georgia",  value: "Georgia,serif" },
  { label: "Mono",     value: "'Courier New',monospace" },
];

const TEXT_COLORS = [
  "#0a0806","#f8f4ee","#c9962a","#c0370a","#185FA5","#2d4228","#993556","#534AB7",
];

const SHIRT_TYPES = [
  { key:"classic", label:"Classic Tee", note:"Half sleeve crew neck" },
  { key:"full", label:"Full Sleeve", note:"Long sleeves for cooler days" },
  { key:"collar", label:"Collar Polo", note:"Structured polo-style collar" },
];

const PLACEMENTS = [
  { key:"chest",      label:"Chest Centre", x:140,y:248,w:120,h:110 },
  { key:"left-chest", label:"Left Chest",   x:118,y:252,w:68, h:60  },
  { key:"full-front", label:"Full Front",   x:98, y:235,w:204,h:165 },
  { key:"back",       label:"Full Back",    x:98, y:248,w:204,h:155 },
  { key:"sleeve",     label:"Left Sleeve",  x:35, y:188,w:60, h:44  },
  { key:"neck",       label:"Neck Label",   x:152,y:108,w:96, h:52  },
];

const SIZES = ["XS","S","M","L","XL","2XL","3XL"];

const PRESETS = [
  "Brand Logo","बिल्कुल सही","EST. 2024","Made with ♥","Team Name","بِسْمِ اللَّهِ",
];

const GALLERY = [
  { idx:0,  cat:"brand",    badge:"Popular", badgeColor:C.rust,
    name:"Minimal Brand Mark",    tag:"Brand Identity · Black",
    color:"#0a0806", preset:"ATELIER",
    desc:"Clean geometric diamond emblem with gold Atelier wordmark. Perfect for premium brand merchandise, corporate gifts, and executive teams.",
    specs:[["Style","Geometric / Minimal"],["Shirt","Ebony Black"],["Print","DTG Gold Ink"],["Placement","Chest Centre"],["Best for","Brand merchandise"]] },
  { idx:1,  cat:"spiritual", badge:"New",     badgeColor:C.goldlt,
    name:"Islamic Calligraphy",   tag:"Spiritual · Navy",
    color:"#1c2330", preset:"بِسْمِ اللَّهِ",
    desc:"Bismillah in elegant Arabic script with crescent and star motif. Beautifully executed for Eid, Ramadan, and community events.",
    specs:[["Style","Calligraphy / Script"],["Shirt","Midnight Navy"],["Print","DTG Precision"],["Placement","Chest Centre"],["Best for","Eid, Ramadan gifts"]] },
  { idx:2,  cat:"sport",    badge:"Hot",     badgeColor:C.rust,
    name:"Sports Team Jersey",    tag:"Sport & Fan · Rust Red",
    color:"#c0370a", preset:"THUNDER F.C.",
    desc:"Bold lightning bolt with team name — designed for impact on the pitch, in the stands, and everywhere in between.",
    specs:[["Style","Bold / Graphic"],["Shirt","Rust Red"],["Print","Screen Print"],["Placement","Full Front"],["Best for","Sports teams, fan clubs"]] },
  { idx:3,  cat:"event",    badge:"New",     badgeColor:C.goldlt,
    name:"Wedding Keepsake",      tag:"Events · Sand / Ivory",
    color:"#ede5d4", preset:"Riya & Arjun",
    desc:"Elegant floral wreath with couple's names and wedding date. A cherished memento for family and guests.",
    specs:[["Style","Romantic / Floral"],["Shirt","Ivory Sand"],["Print","DTG Full Colour"],["Placement","Chest Centre"],["Best for","Weddings, anniversaries"]] },
  { idx:4,  cat:"brand",    badge:"",        badgeColor:"",
    name:"Tech Corporate",        tag:"Brand · Navy Blue",
    color:"#185FA5", preset:"TECHVENTURE",
    desc:"Developer-inspired code bracket with bold brand name. Instantly recognisable for startup teams, hackathons, and launch events.",
    specs:[["Style","Tech / Modern"],["Shirt","Navy Blue"],["Print","DTG"],["Placement","Chest Centre"],["Best for","Tech startups, dev teams"]] },
  { idx:5,  cat:"art",      badge:"Limited", badgeColor:"#534AB7",
    name:"Vintage Heritage Badge", tag:"Art & Type · Dark Brown",
    color:"#2d1a06", preset:"Heritage 1947",
    desc:"Timeless oval badge with gold filigree detail and heritage year. For brands with history, or those who want to look like they have one.",
    specs:[["Style","Vintage / Badge"],["Shirt","Dark Tobacco"],["Print","DTG Gold"],["Placement","Chest Centre"],["Best for","Heritage brands, gifts"]] },
  { idx:6,  cat:"spiritual", badge:"",        badgeColor:"",
    name:"Navratri Festive",      tag:"Spiritual · Berry Rose",
    color:"#993556", preset:"NAVRATRI",
    desc:"Sacred mandala geometry with festive gold tones on rich berry. Perfect for Navratri dandiya nights, Diwali celebrations and pooja events.",
    specs:[["Style","Mandala / Sacred"],["Shirt","Berry Rose"],["Print","DTG Full Colour"],["Placement","Chest Centre"],["Best for","Navratri, Diwali, Pooja"]] },
  { idx:7,  cat:"sport",    badge:"",        badgeColor:"",
    name:"Marathon Runner",       tag:"Sport · Forest Green",
    color:"#2d4228", preset:"MARATHON 42",
    desc:"Kinetic road-trail graphic with race bib number detail. Customise the number, distance and team name.",
    specs:[["Style","Sport / Kinetic"],["Shirt","Forest Green"],["Print","DTG"],["Placement","Chest Centre"],["Best for","Running clubs, marathons"]] },
  { idx:8,  cat:"art",      badge:"Trending", badgeColor:C.goldlt,
    name:"Minimalist Quote",      tag:"Art & Type · Ivory White",
    color:"#f8f4ee", preset:"Made in India, worn worldwide.",
    desc:'"Made in India, worn worldwide." — Clean editorial typography on ivory cotton. Replace with your own quote or business tagline.',
    specs:[["Style","Editorial / Quote"],["Shirt","Ivory White"],["Print","DTG Black"],["Placement","Chest Centre"],["Best for","Quotes, mottos, NGOs"]] },
  { idx:9,  cat:"event",    badge:"Seasonal", badgeColor:"#534AB7",
    name:"Eid Mubarak",           tag:"Events · Royal Purple",
    color:"#534AB7", preset:"Eid Mubarak",
    desc:"Lantern motif with scattered stars and dual-script Eid greeting. A beautiful gift for family and community celebrations.",
    specs:[["Style","Festive / Bilingual"],["Shirt","Royal Purple"],["Print","DTG Gold"],["Placement","Chest Centre"],["Best for","Eid gifts, community events"]] },
  { idx:10, cat:"friends",  badge:"Viral",   badgeColor:C.rust,
    name:"Best Friends… Unfortunately 😏", tag:"Friends · Ebony Black",
    color:"#0a0806", preset:"Best friends… unfortunately\nMd Jeki Ahmad 😏",
    desc:'"Best friends… unfortunately 😏 — Md Jeki Ahmad." The most honest friendship shirt ever made. Dark humour, real love. Personalise with your own name.',
    specs:[["Style","Witty / Bold Quote"],["Shirt","Ebony Black"],["Print","DTG Gold + White"],["Placement","Chest Centre"],["Best for","Bestie gifts, squads, duos"]] },
  { idx:11, cat:"friends",  badge:"Trending", badgeColor:C.goldlt,
    name:"Ride or Die",           tag:"Friends · Rust Red",
    color:"#c0370a", preset:"RIDE OR DIE\nSince Day One 🔥",
    desc:'"Ride or Die — Since Day One." The infinity symbol says what words can\'t. Bold, unapologetic, made for the friend who\'d help you move a body.',
    specs:[["Style","Bold / Graphic"],["Shirt","Rust Red"],["Print","Screen Print"],["Placement","Chest Centre"],["Best for","Best friends, gang sets"]] },
  { idx:12, cat:"friends",  badge:"Couples", badgeColor:"#993556",
    name:"Couple Goals",          tag:"Couple · Berry Pink",
    color:"#993556", preset:"You & Me\nAgainst the World 💑",
    desc:'"You & Me Against the World." Interlocking rings, His & Hers tag, pure romance. Order as a matching pair for the most iconic couple look.',
    specs:[["Style","Romantic / Couple"],["Shirt","Berry Pink"],["Print","DTG Full Colour"],["Placement","Chest Centre"],["Best for","Couples, anniversaries, Valentine's"]] },
  { idx:13, cat:"friends",  badge:"Fan Fave", badgeColor:"#534AB7",
    name:"The Chaotic Bestie 💀", tag:"Friends · Royal Purple",
    color:"#534AB7", preset:"THE CHAOTIC BESTIE\nProfessionally Unhinged 💀\nMd Jeki Ahmad",
    desc:'"The Chaotic Bestie — Professionally Unhinged." For the one who always goes too far but somehow makes everything better. Customise the name tag.',
    specs:[["Style","Humour / Typography"],["Shirt","Royal Purple"],["Print","DTG White + Gold"],["Placement","Chest Centre"],["Best for","Funny gifts, birthdays, squads"]] },
  { idx:14, cat:"friends",  badge:"New",     badgeColor:C.goldlt,
    name:"Squad Goals Unlocked 🤝", tag:"Friends · Forest Green",
    color:"#2d4228", preset:"SQUAD\nGoals Unlocked 🤝\nJeki · Ahmad · Riya · Priya\nClass of 2024 ✦",
    desc:'"Squad Goals Unlocked 🤝" — with your whole crew\'s names. Four stick figures, name list, Class of 2024 detail. The perfect group set for any reunion.',
    specs:[["Style","Squad / Group"],["Shirt","Forest Green"],["Print","DTG"],["Placement","Chest Centre"],["Best for","Group sets, reunions, class tees"]] },
];

const GALLERY_SHIRT_TYPES = {
  0:"collar",
  1:"full",
  2:"classic",
  3:"collar",
  4:"collar",
  5:"full",
  6:"classic",
  7:"full",
  8:"classic",
  9:"full",
  10:"classic",
  11:"full",
  12:"collar",
  13:"classic",
  14:"full",
};

GALLERY.forEach((item) => {
  item.shirtType = GALLERY_SHIRT_TYPES[item.idx] || "classic";
  const typeLabel = (SHIRT_TYPES.find(type => type.key === item.shirtType) || SHIRT_TYPES[0]).label;
  item.specs = [
    item.specs[0],
    item.specs[1],
    ["Type", typeLabel],
    ...item.specs.slice(2),
  ];
});

const GALLERY_CATS = [
  { key:"all",      label:"All Designs" },
  { key:"friends",  label:"👯 Friends & Besties" },
  { key:"brand",    label:"Brand" },
  { key:"spiritual",label:"Spiritual" },
  { key:"event",    label:"Event" },
  { key:"sport",    label:"Sport" },
  { key:"art",      label:"Art" },
];

const PROOF = [
  { num:"2,400+", lbl:"Orders Delivered" },
  { num:"500+",   lbl:"Design Options" },
  { num:"4.9 ★",  lbl:"Average Rating" },
  { num:"48h",    lbl:"Dispatch Time" },
  { num:"100%",   lbl:"Combed Cotton" },
];

/* ─────────── HELPERS ─────────── */
function wrapText(text, maxWidth, fontSize, letterSpacing = 0) {
  const charW = fontSize * 0.58 + letterSpacing;
  const charsPerLine = Math.max(1, Math.floor(maxWidth / charW));
  const lines = [];
  text.split("\n").forEach(paragraph => {
    const words = paragraph.split(" ");
    let current = "";
    words.forEach(word => {
      const test = current ? current + " " + word : word;
      if (test.length <= charsPerLine) { current = test; }
      else {
        if (current) lines.push(current.trim());
        let w = word;
        while (w.length > charsPerLine) { lines.push(w.slice(0, charsPerLine)); w = w.slice(charsPerLine); }
        current = w;
      }
    });
    if (current.trim()) lines.push(current.trim());
  });
  return lines;
}

function getShirtShape(type, small = false) {
  const shapes = {
    classic: small
      ? {
          body:"M36 48 L10 95 L42 105 L42 182 L138 182 L138 105 L170 95 L144 48 L118 35 C115 56 65 56 62 35 Z",
          collar:"M62 35 C65 56 115 56 118 35 L126 39 C123 62 57 62 54 39Z",
          slL:"M10 95 L36 48 L46 51 L22 100Z",
          slR:"M144 48 L170 95 L158 100 L134 51Z",
          hem:"M42 182 L138 182",
          sizeY:200,
        }
      : {
          body:"M80 108 L22 218 L93 239 L93 415 L307 415 L307 239 L378 218 L320 108 L270 80 C264 126 136 126 130 80 Z",
          collar:"M130 80 C136 126 264 126 270 80 L286 90 C280 138 120 138 114 90 Z",
          slL:"M22 218 L80 108 L107 116 L56 230 Z",
          slR:"M320 108 L378 218 L344 230 L293 116 Z",
          hem:"M93 239 L307 239",
          sizeY:450,
        },
    full: small
      ? {
          body:"M44 50 L18 84 L34 95 L28 182 L56 182 L60 106 L120 106 L124 182 L152 182 L146 95 L162 84 L136 50 L114 36 C111 55 69 55 66 36 Z",
          collar:"M66 36 C70 54 110 54 114 36 L121 40 C118 58 62 58 59 40 Z",
          slL:"M18 84 L7 171 L27 177 L34 95 Z",
          slR:"M162 84 L173 171 L153 177 L146 95 Z",
          cuffL:"M7 171 L27 177 L24 186 L6 180 Z",
          cuffR:"M173 171 L153 177 L156 186 L174 180 Z",
          hem:"M56 182 L124 182",
          sizeY:200,
        }
      : {
          body:"M96 112 L46 188 L78 214 L65 414 L122 414 L130 240 L270 240 L278 414 L335 414 L322 214 L354 188 L304 112 L256 82 C250 120 150 120 144 82 Z",
          collar:"M144 82 C150 118 250 118 256 82 L270 90 C264 126 136 126 130 90 Z",
          slL:"M46 188 L24 390 L62 404 L78 214 Z",
          slR:"M354 188 L376 390 L338 404 L322 214 Z",
          cuffL:"M24 390 L62 404 L56 420 L20 408 Z",
          cuffR:"M376 390 L338 404 L344 420 L380 408 Z",
          hem:"M122 414 L278 414",
          sizeY:448,
        },
    collar: small
      ? {
          body:"M36 49 L12 92 L43 104 L43 182 L137 182 L137 104 L168 92 L144 49 L120 38 L113 46 L106 62 L74 62 L67 46 L60 38 Z",
          collar:"M67 46 L76 38 L90 55 L104 38 L113 46 L103 66 L77 66 Z",
          placket:"M84 66 L96 66 L98 92 L82 92 Z",
          slL:"M12 92 L36 49 L45 53 L24 99 Z",
          slR:"M144 49 L168 92 L156 99 L135 53 Z",
          hem:"M43 182 L137 182",
          sizeY:200,
        }
      : {
          body:"M80 110 L28 210 L94 238 L94 415 L306 415 L306 238 L372 210 L320 110 L276 85 L260 102 L243 136 L157 136 L140 102 L124 85 Z",
          collar:"M140 102 L162 82 L200 124 L238 82 L260 102 L234 150 L166 150 Z",
          placket:"M186 150 L214 150 L220 214 L180 214 Z",
          slL:"M28 210 L80 110 L104 120 L58 228 Z",
          slR:"M320 110 L372 210 L342 228 L296 120 Z",
          hem:"M94 415 L306 415",
          sizeY:450,
        },
  };

  return shapes[type] || shapes.classic;
}

/* ─────────── SHIRT SVG ─────────── */
function ShirtSVG({ shirtColor, shirtType = "classic", text, font, textColor, fontSize, letterSpacing, bold, italic, uppercase, placement, mode, logoSrc, logoSize, small }) {
  const p = PLACEMENTS.find(pl => pl.key === placement) || PLACEMENTS[0];
  const scale = small ? 180/400 : 1;
  const vb = small ? "0 0 180 220" : "0 0 400 460";
  const W = small ? 140 : "100%";

  // Scale placement for small
  const sp = small ? {
    x: p.x * scale, y: p.y * scale * (220/460),
    w: p.w * scale, h: p.h * scale * (220/460),
  } : p;

  const cx = sp.x + sp.w / 2;
  let fs = small ? Math.max(4, fontSize * scale * (220/460)) : fontSize;
  let lines = mode === "text" && text
    ? wrapText(uppercase ? text.toUpperCase() : text, sp.w, fs, letterSpacing)
    : [];

  // Auto-shrink
  const maxLines = Math.max(1, Math.floor(sp.h / (fs * 1.45)));
  while (lines.length > maxLines && fs > 4) { fs -= 1; lines = wrapText(uppercase ? text.toUpperCase() : text, sp.w, fs, letterSpacing); }

  const lineH = fs * 1.45;
  const totalH = lines.length * lineH;
  const startY = sp.y + (sp.h - totalH) / 2 + fs * 0.85;

  const S = getShirtShape(shirtType, small);

  const logoW = sp.w * (logoSize/100);
  const logoH = sp.h * (logoSize/100);

  return (
    <svg viewBox={vb} width={W} style={{ maxWidth: small ? undefined : 480, filter:"drop-shadow(0 12px 28px rgba(0,0,0,0.2))" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`fab${small?'s':'l'}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
          <line x1="4" y1="0" x2="0" y2="4" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
        </pattern>
        {!small && <filter id="ss"><feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="rgba(0,0,0,0.22)"/></filter>}
      </defs>
      <g filter={small ? undefined : "url(#ss)"}>
        <path d={S.body} fill={shirtColor}/>
        <path d={S.body} fill={`url(#fab${small?'s':'l'})`}/>
      </g>
      <path d={S.collar} fill="rgba(0,0,0,0.07)"/>
      <path d={S.slL} fill="rgba(0,0,0,0.07)"/>
      <path d={S.slR} fill="rgba(0,0,0,0.07)"/>
      {S.placket && <path d={S.placket} fill="rgba(255,255,255,0.08)" stroke="rgba(0,0,0,0.12)" strokeWidth={small ? "0.6" : "1"}/>}
      {S.cuffL && <path d={S.cuffL} fill="rgba(0,0,0,0.1)"/>}
      {S.cuffR && <path d={S.cuffR} fill="rgba(0,0,0,0.1)"/>}
      {S.hem && <path d={S.hem} stroke="rgba(0,0,0,0.04)" strokeWidth="1" fill="none"/>}

      {/* DESIGN AREA */}
      {mode === "text" && text && lines.map((line, i) => (
        <text key={i} x={cx} y={startY + i * lineH} textAnchor="middle"
          fontFamily={font} fontSize={fs} fill={textColor} letterSpacing={letterSpacing}
          fontWeight={bold ? "700" : "400"} fontStyle={italic ? "italic" : "normal"}>
          {line}
        </text>
      ))}
      {mode === "logo" && logoSrc && (
        <image href={logoSrc} x={sp.x + (sp.w - logoW)/2} y={sp.y + (sp.h - logoH)/2} width={logoW} height={logoH} preserveAspectRatio="xMidYMid meet"/>
      )}
      {mode === "text" && !text && (
        <>
          <rect x={sp.x} y={sp.y} width={sp.w} height={sp.h} rx="3" fill="none" stroke="rgba(201,150,42,0.22)" strokeWidth="1" strokeDasharray="5 4"/>
          <text x={cx} y={sp.y + sp.h/2 - 6} textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize={small?7:10} fill="rgba(201,150,42,0.4)" letterSpacing="2">DESIGN ZONE</text>
          {!small && <text x={cx} y={sp.y + sp.h/2 + 10} textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="8" fill="rgba(201,150,42,0.22)" letterSpacing="1">Start typing ↙</text>}
        </>
      )}
      {!small && <text x="200" y={S.sizeY} textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="8" fill="rgba(0,0,0,0.12)" letterSpacing="2">SIZE M</text>}
    </svg>
  );
}

/* ─────────── GALLERY SHIRT (predefined designs) ─────────── */
function GalleryShirtSVG({ idx, shirtColor, shirtType = "classic" }) {
  const designs = {
    0: ( // Minimal Brand Mark
      <>
        <polygon points="90,88 104,107 90,126 76,107" fill="none" stroke="#c9962a" strokeWidth="1.5"/>
        <polygon points="90,95 98,107 90,119 82,107" fill="#c9962a" opacity="0.2"/>
        <text x="90" y="141" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="8" fill="#c9962a" letterSpacing="4" fontWeight="700">ATELIER</text>
        <text x="90" y="152" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(201,150,42,0.5)" letterSpacing="3">EST · 2024</text>
      </>
    ),
    1: ( // Islamic Calligraphy
      <>
        <path d="M90 84 A16 16 0 1 1 90 116 A11 11 0 1 0 90 84Z" fill="none" stroke="#c9962a" strokeWidth="1.2"/>
        <text x="90" y="132" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#c9962a" letterSpacing="1" fontStyle="italic">بِسْمِ اللَّهِ</text>
        <text x="90" y="144" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(201,150,42,0.45)" letterSpacing="3">IN THE NAME OF GOD</text>
      </>
    ),
    2: ( // Sports
      <>
        <polygon points="97,88 83,113 91,113 83,138" fill="none" stroke="#fff" strokeWidth="1.2"/>
        <polygon points="83,113 91,113 83,138 97,113 89,113" fill="#fff" opacity="0.85"/>
        <text x="90" y="152" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="10" fill="#fff" letterSpacing="3" fontWeight="900">THUNDER</text>
        <text x="90" y="163" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.55)" letterSpacing="3">F.C. · 2024</text>
      </>
    ),
    3: ( // Wedding
      <>
        <circle cx="90" cy="108" r="22" fill="none" stroke="#c9962a" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6"/>
        <path d="M85,102 C85,97 79,97 79,103 C79,110 90,116 90,116 C90,116 101,110 101,103 C101,97 95,97 95,102Z" fill="#c9962a" opacity="0.7"/>
        <text x="90" y="132" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="8" fill="#8a6518" letterSpacing="2" fontStyle="italic">Riya &amp; Arjun</text>
        <text x="90" y="142" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(138,101,24,0.6)" letterSpacing="2">12·12·24</text>
      </>
    ),
    4: ( // Tech
      <>
        <text x="74" y="116" fontFamily="Courier New,monospace" fontSize="22" fill="#fff" fontWeight="700" opacity="0.9">&lt;/&gt;</text>
        <text x="90" y="131" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="8" fill="rgba(255,255,255,0.9)" letterSpacing="3" fontWeight="600">TECHVENTURE</text>
        <text x="90" y="142" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(255,255,255,0.4)" letterSpacing="2">BUILD · SHIP · GROW</text>
      </>
    ),
    5: ( // Vintage
      <>
        <ellipse cx="90" cy="110" rx="33" ry="26" fill="none" stroke="#c9962a" strokeWidth="1"/>
        <ellipse cx="90" cy="110" rx="28" ry="21" fill="none" stroke="rgba(201,150,42,0.3)" strokeWidth="0.5"/>
        <text x="90" y="103" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="6" fill="rgba(201,150,42,0.6)" letterSpacing="3">SINCE</text>
        <text x="90" y="116" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="14" fill="#c9962a" fontWeight="900">1947</text>
        <text x="90" y="125" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(201,150,42,0.55)" letterSpacing="3">ORIGINAL</text>
        <text x="90" y="145" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="9" fill="#c9962a" letterSpacing="2" fontStyle="italic">Heritage</text>
      </>
    ),
    6: ( // Navratri
      <>
        <circle cx="90" cy="107" r="26" fill="none" stroke="rgba(255,215,100,0.5)" strokeWidth="0.8"/>
        <circle cx="90" cy="107" r="18" fill="none" stroke="rgba(255,215,100,0.4)" strokeWidth="0.6"/>
        <circle cx="90" cy="107" r="9" fill="rgba(255,215,100,0.15)" stroke="rgba(255,215,100,0.5)" strokeWidth="0.8"/>
        <text x="90" y="143" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="9" fill="#ffd764" letterSpacing="2" fontWeight="700">NAVRATRI</text>
        <text x="90" y="155" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(255,215,100,0.5)" letterSpacing="2">JAI MATA DI</text>
      </>
    ),
    7: ( // Marathon
      <>
        <path d="M60 170 Q90 115 120 70" stroke="rgba(201,150,42,0.3)" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M60 170 Q90 115 120 70" stroke="rgba(201,150,42,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 3"/>
        <rect x="78" y="100" width="24" height="20" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <text x="90" y="115" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="11" fill="#c9962a" fontWeight="900">42</text>
        <text x="90" y="135" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="8" fill="#fff" letterSpacing="3" fontWeight="600">MARATHON</text>
        <text x="90" y="147" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(201,150,42,0.55)" letterSpacing="2">RUN YOUR STORY</text>
      </>
    ),
    8: ( // Minimalist Quote
      <>
        <text x="68" y="96" fontFamily="'Playfair Display',serif" fontSize="28" fill="rgba(201,150,42,0.18)" fontWeight="900">"</text>
        <text x="90" y="110" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="8" fill="#0a0806" letterSpacing="1" fontStyle="italic">Made in India,</text>
        <text x="90" y="121" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="8" fill="#0a0806" letterSpacing="1" fontStyle="italic">worn worldwide.</text>
        <line x1="68" y1="127" x2="112" y2="127" stroke="rgba(201,150,42,0.35)" strokeWidth="0.7"/>
        <text x="90" y="139" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="rgba(10,8,6,0.4)" letterSpacing="2.5">PROUDLY INDIAN</text>
      </>
    ),
    9: ( // Eid
      <>
        <circle cx="68" cy="87" r="1" fill="#ffd764" opacity="0.7"/>
        <circle cx="114" cy="93" r="1.5" fill="#ffd764" opacity="0.6"/>
        <rect x="83" y="91" width="14" height="18" rx="3" fill="none" stroke="#ffd764" strokeWidth="1" opacity="0.8"/>
        <line x1="90" y1="91" x2="90" y2="87" stroke="#ffd764" strokeWidth="0.8"/>
        <text x="90" y="124" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="10" fill="#ffd764" letterSpacing="1" fontWeight="700">Eid Mubarak</text>
        <text x="90" y="136" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,215,100,0.5)" letterSpacing="2">عِيدٌ مُبَارَكٌ</text>
      </>
    ),
    10: ( // Best Friends
      <>
        <path d="M82,84 C82,78 74,78 74,85 C74,92 90,101 90,101 C90,101 87,94 87,90 L93,90 C93,94 90,101 90,101 C90,101 106,92 106,85 C106,78 98,78 98,84Z" fill="none" stroke="#c9962a" strokeWidth="1.2" opacity="0.9"/>
        <line x1="90" y1="89" x2="90" y2="101" stroke="#c9962a" strokeWidth="1" strokeDasharray="2 1" opacity="0.6"/>
        <text x="90" y="113" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="9.5" fill="#f8f4ee" fontWeight="900" letterSpacing="0.5">Best friends…</text>
        <text x="90" y="124" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="6" fill="rgba(201,150,42,0.65)" letterSpacing="2" fontStyle="italic">unfortunately</text>
        <rect x="58" y="128" width="64" height="15" rx="2" fill="rgba(201,150,42,0.1)" stroke="rgba(201,150,42,0.35)" strokeWidth="0.6"/>
        <text x="90" y="139" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="7" fill="#c9962a" letterSpacing="1" fontWeight="600">Md Jeki Ahmad</text>
        <text x="90" y="155" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="12">😏</text>
        <line x1="55" y1="161" x2="90" y2="161" stroke="rgba(201,150,42,0.2)" strokeWidth="0.5"/>
        <line x1="90" y1="161" x2="125" y2="161" stroke="rgba(201,150,42,0.2)" strokeWidth="0.5"/>
      </>
    ),
    11: ( // Ride or Die
      <>
        <path d="M72,103 C72,97 78,94 84,97 C90,100 90,106 96,106 C102,106 108,103 108,97 C108,91 102,88 96,91 C90,94 90,100 84,100 C78,100 72,97 72,103Z" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
        <text x="90" y="118" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="11" fill="#fff" fontWeight="900" letterSpacing="1">RIDE OR DIE</text>
        <text x="90" y="129" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.5)" letterSpacing="3">SINCE DAY ONE</text>
        <text x="90" y="143" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.75)" letterSpacing="1">Jeki &amp; the Crew</text>
        <text x="90" y="158" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="10">🔥</text>
      </>
    ),
    12: ( // Couple Goals
      <>
        <circle cx="83" cy="97" r="10" fill="none" stroke="rgba(255,215,150,0.8)" strokeWidth="1.2"/>
        <circle cx="97" cy="97" r="10" fill="none" stroke="rgba(255,215,150,0.8)" strokeWidth="1.2"/>
        <text x="90" y="117" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="9" fill="#ffd79a" fontWeight="700" fontStyle="italic">You &amp; Me</text>
        <text x="90" y="128" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,215,150,0.5)" letterSpacing="3">AGAINST THE WORLD</text>
        <rect x="60" y="133" width="24" height="10" rx="5" fill="rgba(255,215,150,0.15)" stroke="rgba(255,215,150,0.3)" strokeWidth="0.5"/>
        <text x="72" y="141" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="#ffd79a">HIS</text>
        <rect x="96" y="133" width="24" height="10" rx="5" fill="rgba(255,215,150,0.15)" stroke="rgba(255,215,150,0.3)" strokeWidth="0.5"/>
        <text x="108" y="141" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5" fill="#ffd79a">HERS</text>
        <text x="90" y="158" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="12">💑</text>
      </>
    ),
    13: ( // Chaotic Bestie
      <>
        <rect x="56" y="85" width="68" height="21" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
        <text x="90" y="100" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="10" fill="#fff" fontWeight="900" letterSpacing="1">THE CHAOTIC</text>
        <text x="90" y="115" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="9" fill="#c9962a" fontWeight="700" letterSpacing="1">BESTIE</text>
        <text x="90" y="127" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)" letterSpacing="2">PROFESSIONALLY UNHINGED</text>
        <rect x="64" y="132" width="52" height="13" rx="2" fill="rgba(201,150,42,0.12)" stroke="rgba(201,150,42,0.35)" strokeWidth="0.6"/>
        <text x="90" y="142" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="6.5" fill="#c9962a" letterSpacing="0.5" fontWeight="600">Md Jeki Ahmad</text>
        <text x="90" y="158" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="12">💀</text>
      </>
    ),
    14: ( // Squad Goals
      <>
        <circle cx="68" cy="88" r="4" fill="rgba(201,150,42,0.75)"/>
        <line x1="68" y1="92" x2="68" y2="100" stroke="rgba(201,150,42,0.75)" strokeWidth="1.5"/>
        <circle cx="80" cy="86" r="4" fill="rgba(201,150,42,0.75)"/>
        <line x1="80" y1="90" x2="80" y2="100" stroke="rgba(201,150,42,0.75)" strokeWidth="1.5"/>
        <circle cx="100" cy="86" r="4" fill="rgba(201,150,42,0.75)"/>
        <line x1="100" y1="90" x2="100" y2="100" stroke="rgba(201,150,42,0.75)" strokeWidth="1.5"/>
        <circle cx="112" cy="88" r="4" fill="rgba(201,150,42,0.75)"/>
        <line x1="112" y1="92" x2="112" y2="100" stroke="rgba(201,150,42,0.75)" strokeWidth="1.5"/>
        <text x="90" y="115" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="12" fill="#f8f4ee" fontWeight="900" letterSpacing="2">SQUAD</text>
        <text x="90" y="126" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(201,150,42,0.6)" letterSpacing="3">GOALS UNLOCKED</text>
        <text x="90" y="137" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.55)" letterSpacing="1">Jeki · Ahmad · Riya · Priya</text>
        <text x="90" y="150" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="12">🤝</text>
      </>
    ),
  };

  const paths = getShirtShape(shirtType, true);

  return (
    <svg viewBox="0 0 180 220" width="140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`gf${idx}`} width="3" height="3" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="3" y2="3" stroke="rgba(0,0,0,0.05)" strokeWidth="0.4"/>
        </pattern>
      </defs>
      <path d={paths.body} fill={shirtColor}/>
      <path d={paths.body} fill={`url(#gf${idx})`}/>
      <path d={paths.collar} fill="rgba(0,0,0,0.07)"/>
      <path d={paths.slL} fill="rgba(0,0,0,0.07)"/>
      <path d={paths.slR} fill="rgba(0,0,0,0.07)"/>
      {paths.placket && <path d={paths.placket} fill="rgba(255,255,255,0.08)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6"/>}
      {paths.cuffL && <path d={paths.cuffL} fill="rgba(0,0,0,0.1)"/>}
      {paths.cuffR && <path d={paths.cuffR} fill="rgba(0,0,0,0.1)"/>}
      {designs[idx]}
    </svg>
  );
}

/* ─────────── GALLERY CARD ─────────── */
function GalleryCard({ item, onUse, onPreview }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0e0b07" : "#060402",
        border: "none", borderRight: `1px solid rgba(201,150,42,0.08)`,
        borderBottom: `1px solid rgba(201,150,42,0.08)`,
        cursor: "pointer", transition: "background 0.3s", position: "relative",
      }}
    >
      {item.badge && (
        <div style={{
          position:"absolute", top:10, right:10,
          background: item.badgeColor, color: ["#e8b84b","#ffd764"].includes(item.badgeColor) ? C.ebony : "#fff",
          fontSize:9, letterSpacing:2, textTransform:"uppercase", padding:"3px 7px", fontWeight:700, zIndex:2,
        }}>{item.badge}</div>
      )}
      <div style={{ padding:"20px 16px 14px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateY(-6px) scale(1.04)" : "none", marginBottom:10 }}>
          <GalleryShirtSVG idx={item.idx} shirtColor={item.color} shirtType={item.shirtType}/>
        </div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:700, color:C.ivory, marginBottom:3, textAlign:"center", lineHeight:1.3 }}>{item.name}</div>
        <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:C.smoke, marginBottom:10, textAlign:"center" }}>{item.tag}</div>
        <div style={{ fontSize:9, letterSpacing:1.5, textTransform:"uppercase", color:C.gold, marginBottom:10, textAlign:"center" }}>
          {(SHIRT_TYPES.find(type => type.key === item.shirtType) || SHIRT_TYPES[0]).label}
        </div>
        <div style={{ display:"flex", gap:6, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition:"all 0.25s", width:"100%" }}>
          <button onClick={() => onUse(item)} style={{ flex:1, background:C.gold, border:"none", color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", padding:"6px 0", cursor:"pointer", fontWeight:700 }}>
            Use This →
          </button>
          <button onClick={() => onPreview(item)} style={{ background:"none", border:`1px solid rgba(201,150,42,0.3)`, color:C.gold, fontFamily:"Outfit,sans-serif", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", padding:"6px 10px", cursor:"pointer", whiteSpace:"nowrap" }}>
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── MAIN APP ─────────── */
export default function PrintCraft() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const sectionPadX = isMobile ? 16 : 40;
  const sectionPadY = isMobile ? 52 : 72;
  const controlPad = isMobile ? 16 : 22;

  // Studio state
  const [shirtColor, setShirtColor] = useState("#f8f4ee");
  const [shirtType, setShirtType] = useState("classic");
  const [text, setText] = useState("PrintCraft");
  const [font, setFont] = useState("'Playfair Display',serif");
  const [textColor, setTextColor] = useState("#0a0806");
  const [fontSize, setFontSize] = useState(13);
  const [letterSpacing, setLetterSpacing] = useState(2);
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [placement, setPlacement] = useState("chest");
  const [mode, setMode] = useState("text");
  const [logoSrc, setLogoSrc] = useState(null);
  const [logoSize, setLogoSize] = useState(55);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [heroShirtColor, setHeroShirtColor] = useState("#f8f4ee");
  const [heroView, setHeroView] = useState("front");

  // Gallery
  const [galCat, setGalCat] = useState("all");
  const [lbItem, setLbItem] = useState(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const studioRef = useRef(null);
  const galleryRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior:"smooth" });

  // Pricing
  const ppp = qty >= 50 ? 299 : qty >= 10 ? 449 : 599;
  const deliv = (ppp * qty) >= 999 ? 0 : 79;
  const total = ppp * qty + deliv;
  const bulkHint = qty >= 50 ? "Best rate applied ✓" : qty >= 10 ? "Bundle rate applied ✓" : "Order 10+ for ₹449/pc · 50+ for ₹299/pc";

  const handleLogoUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => { setLogoSrc(e.target.result); messageApi.success("Logo uploaded ✓"); };
    reader.readAsDataURL(file);
    return false;
  };

  const applyPreset = (t) => { setText(t); setMode("text"); messageApi.info(`Preset applied: ${t.split("\n")[0]}`); };

  const openLightbox = (item) => {
    const idx = GALLERY.findIndex(g => g.idx === item.idx);
    setLbIdx(idx); setLbItem(GALLERY[idx]); setLbOpen(true);
  };
  const shiftLb = (dir) => {
    const next = (lbIdx + dir + GALLERY.length) % GALLERY.length;
    setLbIdx(next); setLbItem(GALLERY[next]);
  };

  const applyGalleryDesign = (item) => {
    applyPreset(item.preset);
    setShirtColor(item.color);
    setShirtType(item.shirtType || "classic");
    setLbOpen(false);
    scrollTo(studioRef);
  };

  const saveDesign = () => {
    setSavedDesigns(prev => [...prev, { id: Date.now(), text: text.slice(0,20), shirtColor, textColor, shirtType }]);
    messageApi.success("Design saved ✓");
  };

  const placeOrder = () => messageApi.success(`Order placed! ${qty} × ${size} ${(SHIRT_TYPES.find(type => type.key === shirtType) || SHIRT_TYPES[0]).label} @ ₹${ppp}/pc ✓`);

  const filteredGallery = galCat === "all" ? GALLERY : GALLERY.filter(g => g.cat === galCat);

  // Global styles injected once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@200;300;400;500;600&display=swap');
      body { background: #0a0806 !important; font-family: 'Outfit', sans-serif !important; }
      .pc-ant .ant-btn { font-family: 'Outfit', sans-serif; letter-spacing: 1.5px; text-transform: uppercase; font-size: 11px; }
      .pc-ant .ant-slider-track { background: #c9962a !important; }
      .pc-ant .ant-slider-handle { border-color: #c9962a !important; }
      .pc-ant .ant-radio-button-wrapper-checked { background: rgba(201,150,42,0.12) !important; border-color: rgba(201,150,42,0.45) !important; color: #c9962a !important; }
      .pc-ant .ant-radio-button-wrapper { background: none !important; border-color: rgba(201,150,42,0.2) !important; color: #8a7d6e !important; font-size: 11px; letter-spacing: 1px; }
      .pc-ant .ant-tabs-tab { color: #8a7d6e !important; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; }
      .pc-ant .ant-tabs-tab-active .ant-tabs-tab-btn { color: #c9962a !important; }
      .pc-ant .ant-tabs-ink-bar { background: #c9962a !important; }
      .pc-ant .ant-input, .pc-ant .ant-input-number { background: rgba(255,255,255,0.04) !important; border-color: rgba(201,150,42,0.2) !important; color: #f8f4ee !important; font-family: 'Outfit', sans-serif; }
      .pc-ant .ant-input:focus, .pc-ant .ant-input-number:focus { border-color: #c9962a !important; box-shadow: none !important; }
      .pc-ant .ant-input::placeholder { color: #8a7d6e !important; }
      .pc-ant textarea.ant-input { background: rgba(255,255,255,0.04) !important; color: #f8f4ee !important; }
      .pc-ant .ant-upload-drag { background: none !important; border-color: rgba(201,150,42,0.3) !important; }
      .pc-ant .ant-upload-drag:hover { border-color: #c9962a !important; background: rgba(201,150,42,0.04) !important; }
      .pc-mq { overflow: hidden; background: #c9962a; padding: 8px 0; }
      .pc-mq-track { display: flex; animation: pcmq 22s linear infinite; white-space: nowrap; }
      @keyframes pcmq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .pc-mq-item { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #0a0806; font-weight: 600; padding: 0 32px; }
      .pc-gcard-grid { display: grid; grid-template-columns: repeat(5,1fr); }
      .pc-filter-row { display:flex; justify-content:center; flex-wrap:wrap; gap:0; margin-bottom:36px; }
      .pc-chip-scroll { display:flex; flex-wrap:wrap; gap:8px; }
      .pc-preview-modes { display:flex; }
      .pc-footer-meta { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
      @media(max-width:1100px){ .pc-gcard-grid { grid-template-columns: repeat(3,1fr); } }
      @media(max-width:700px){
        .pc-gcard-grid { grid-template-columns: 1fr; }
        .pc-filter-row {
          justify-content:flex-start;
          flex-wrap:nowrap;
          overflow-x:auto;
          padding:0 16px 6px;
          margin:0 -16px 28px;
          scrollbar-width:none;
        }
        .pc-filter-row::-webkit-scrollbar { display:none; }
        .pc-filter-row button { flex:0 0 auto; white-space:nowrap; }
        .pc-chip-scroll {
          flex-wrap:nowrap;
          overflow-x:auto;
          padding-bottom:6px;
          scrollbar-width:none;
        }
        .pc-chip-scroll::-webkit-scrollbar { display:none; }
        .pc-chip-scroll > * { flex:0 0 auto; }
        .pc-preview-modes { width:100%; justify-content:center; flex-wrap:wrap; }
        .pc-footer-meta { flex-direction:column; align-items:flex-start; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /* ── SECTIONS ─────────────────────────── */

  const goldBtn = (label, onClick, ghost=false) => (
    <button onClick={onClick} style={{
      background: ghost ? "none" : C.gold, border: ghost ? `1px solid rgba(255,255,255,0.2)` : "none",
      color: ghost ? C.ivory : C.ebony, fontFamily:"Outfit,sans-serif", fontSize:isMobile ? 10 : 11,
      letterSpacing:isMobile ? "2px" : "2.5px", textTransform:"uppercase", padding:isMobile ? "13px 18px" : "12px 28px", cursor:"pointer",
      fontWeight:600, transition:"all 0.2s", width:isMobile ? "100%" : "auto", minHeight:44,
    }}>{label}</button>
  );

  const sectionEyebrow = (label) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:12 }}>
      <div style={{ width:24, height:1, background:C.gold }}/>
      <span style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", color:C.gold }}>{label}</span>
      <div style={{ width:24, height:1, background:C.gold }}/>
    </div>
  );

  const ctrlLabel = (label) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
      <div style={{ width:16, height:1, background:C.gold }}/>
      <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.gold }}>{label}</span>
    </div>
  );

  return (
    <div className="pc-ant" style={{ fontFamily:"Outfit,sans-serif", background:C.ebony, minHeight:"100vh", color:C.ivory }}>
      {contextHolder}

      {/* MARQUEE */}
      <div className="pc-mq">
        <div className="pc-mq-track">
          {["100% Combed Cotton","DTG Precision Print","Made to Order","Pan-India Delivery","Bulk Orders Welcome","Brand Logos","Religious Artwork","Event Merchandise","48h Dispatch",
            "100% Combed Cotton","DTG Precision Print","Made to Order","Pan-India Delivery","Bulk Orders Welcome","Brand Logos","48h Dispatch"].map((t,i)=>(
            <span key={i} className="pc-mq-item">{t} <span style={{opacity:0.35}}>✦</span></span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:isMobile ? "flex-start" : "center", flexWrap:"wrap", gap:isMobile ? 12 : 20, padding:isMobile ? "14px 16px" : "16px 40px", borderBottom:`1px solid rgba(201,150,42,0.15)`, background:"rgba(10,8,6,0.97)", position:"sticky", top:0, zIndex:100 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile ? 18 : 22, fontWeight:700, letterSpacing:isMobile ? 2 : 3, color:C.ivory, textTransform:"uppercase", lineHeight:1 }}>
            Print<span style={{color:C.gold}}>Craft</span>
          </div>
          <div style={{ fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.smoke, marginTop:2 }}>Premium Atelier · Est. 2024</div>
        </div>
        {screens.md && (
          <Space size={32}>
            {[["Design Studio",studioRef],["Gallery",galleryRef]].map(([label,ref])=>(
              <span key={label} onClick={()=>scrollTo(ref)} style={{ fontSize:10, letterSpacing:"2.5px", textTransform:"uppercase", color:C.smoke, cursor:"pointer", transition:"color 0.2s" }}
                onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.smoke}>{label}</span>
            ))}
          </Space>
        )}
        <Space wrap style={{ width:isMobile ? "100%" : "auto", justifyContent:isMobile ? "space-between" : "flex-end" }}>
          <button onClick={()=>scrollTo(studioRef)} style={{ background:"none", border:`1px solid rgba(201,150,42,0.4)`, color:C.gold, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:isMobile ? 1.5 : 2, textTransform:"uppercase", padding:isMobile ? "11px 14px" : "8px 18px", cursor:"pointer", minHeight:44, flex:isMobile ? 1 : "none" }}>Open Studio</button>
          <button onClick={()=>scrollTo(studioRef)} style={{ background:C.gold, border:"none", color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:"8px 18px", cursor:"pointer", fontWeight:700 }}>Start Order →</button>
        </Space>
      </div>

      {/* HERO */}
      <div style={{ display:"grid", gridTemplateColumns: screens.md ? "1fr 1fr" : "1fr", minHeight:isMobile ? "auto" : "88vh", overflow:"hidden" }}>
        {/* Left */}
        <div style={{ background:C.ebony, padding: screens.md ? "80px 56px 64px" : "40px 16px 32px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-60, left:-60, width:220, height:220, borderRadius:"50%", border:`1px solid rgba(201,150,42,0.07)` }}/>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28, fontSize:10, letterSpacing:4, textTransform:"uppercase", color:C.gold }}>
            <div style={{width:28,height:1,background:C.gold}}/>Premium Print-on-Demand Atelier
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.8rem,5vw,5rem)", fontWeight:900, lineHeight:1.05, color:C.ivory, margin:"0 0 18px" }}>
            Your story,<br/>
            <span style={{color:C.gold,fontStyle:"italic"}}>worn</span> with<br/>
            <span style={{WebkitTextStroke:`1px rgba(201,150,42,0.5)`,color:"transparent"}}>pride.</span>
          </h1>
          <p style={{ fontSize:isMobile ? 14 : 15, color:C.smoke, lineHeight:isMobile ? 1.75 : 1.85, maxWidth:400, marginBottom:isMobile ? 24 : 36, fontWeight:300 }}>
            Fully customisable T-shirts for brands, believers, teams and dreamers. Design live — see your creation on the shirt before you order.
          </p>
          <Space wrap direction={isMobile ? "vertical" : "horizontal"} style={{marginBottom:isMobile ? 28 : 48, width:isMobile ? "100%" : "auto"}}>
            {goldBtn("Open Design Studio", ()=>scrollTo(studioRef))}
            {goldBtn("View Gallery", ()=>scrollTo(galleryRef), true)}
          </Space>
          <div style={{ display:"flex", gap:isMobile ? 16 : 32, paddingTop:isMobile ? 20 : 28, borderTop:`1px solid rgba(255,255,255,0.06)`, flexWrap:"wrap" }}>
            {[["4.9★ Rating","2,400+ verified orders"],["48h Dispatch","Pan-India delivery"],["100% Cotton","Quality guaranteed"]].map(([val,lbl])=>(
              <div key={val} style={{ display:"flex", alignItems:"center", gap:10, width:isMobile ? "100%" : "auto" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(201,150,42,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>⬡</div>
                <div>
                  <div style={{fontSize:13,fontWeight:500,color:C.ivory}}>{val}</div>
                  <div style={{fontSize:11,color:C.smoke}}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right — shirt showcase */}
        <div style={{ background:C.parchment, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", minHeight:isMobile ? 420 : "auto", padding:isMobile ? "28px 16px 34px" : 0 }}>
            <div style={{ position:"absolute", inset:0, opacity:0.035, backgroundImage:"repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,#000 0,#000 1px,transparent 1px,transparent 12px)" }}/>
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center" }}>
              <Space wrap style={{marginBottom:20, justifyContent:"center"}}>
                {["front","back","both"].map(v=>(
                  <button key={v} onClick={()=>setHeroView(v)} style={{ background: heroView===v ? C.gold : "none", border:`1px solid ${heroView===v?C.gold:"rgba(10,8,6,0.2)"}`, color: heroView===v ? C.ebony : "rgba(10,8,6,0.45)", fontFamily:"Outfit,sans-serif", fontSize:9, letterSpacing:"2.5px", textTransform:"uppercase", padding:"7px 16px", cursor:"pointer", fontWeight:500 }}>
                    {v}
                  </button>
                ))}
              </Space>
              <ShirtSVG shirtColor={heroShirtColor} shirtType="collar" text="PrintCraft" font="'Playfair Display',serif" textColor="#c9962a"
                fontSize={13} letterSpacing={2} bold italic={false} uppercase={false} placement="chest" mode="text" logoSrc={null} logoSize={55} small={isMobile}/>
              <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:C.golddk, opacity:0.7, marginTop:10 }}>
                Now with classic, full sleeve and collar options
              </div>
              <Space wrap style={{marginTop:14, justifyContent:"center"}}>
                {SHIRT_COLORS.slice(0,8).map(({c,name})=>(
                  <Tooltip key={c} title={name}>
                    <div onClick={()=>setHeroShirtColor(c)} style={{ width:20, height:20, borderRadius:"50%", background:c, border:`2px solid ${heroShirtColor===c?C.golddk:"transparent"}`, cursor:"pointer", transform: heroShirtColor===c?"scale(1.2)":"none", transition:"all 0.2s" }}/>
                  </Tooltip>
                ))}
              </Space>
              <div style={{ background:C.gold, color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:isMobile ? 11 : 12, fontWeight:700, letterSpacing:1, padding:isMobile ? "8px 14px" : "6px 18px", marginTop:14, textAlign:"center" }}>
                From ₹499 · Free delivery above ₹999
              </div>
            </div>
          </div>
      </div>

      {/* PROOF STRIP */}
      <div style={{ background:C.slate, padding:isMobile ? "20px 16px" : "28px 40px", display:"flex", justifyContent:isMobile ? "flex-start" : "space-around", alignItems:"center", flexWrap:"wrap", gap:isMobile ? 16 : 20, borderTop:`1px solid rgba(201,150,42,0.15)`, borderBottom:`1px solid rgba(201,150,42,0.15)` }}>
        {PROOF.map(({num,lbl})=>(
          <div key={num} style={{textAlign:"center", flex:isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto"}}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile ? 28 : 34, fontWeight:700, color:C.gold, lineHeight:1 }}>{num}</div>
            <div style={{ fontSize:10, letterSpacing:"2.5px", textTransform:"uppercase", color:C.smoke, marginTop:4 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* LIVE DESIGN STUDIO */}
      <div ref={studioRef} id="studio" style={{ background:"#080604", padding:`${sectionPadY}px 0`, borderTop:`1px solid rgba(201,150,42,0.12)` }}>
        <div style={{ textAlign:"center", padding:`0 ${sectionPadX}px`, marginBottom:isMobile ? 28 : 40 }}>
          {sectionEyebrow("Live Design Studio")}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:C.ivory, lineHeight:1.15, margin:"0 0 12px" }}>
            Design it. <em style={{fontStyle:"italic",color:C.gold}}>See it live.</em> Order it.
          </h2>
          <p style={{ fontSize:13, color:C.smoke, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
            Type your text, upload your logo, pick colours and fonts — watch your T-shirt come to life in real time before placing your order.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns: screens.lg ? "360px 1fr" : "1fr", maxWidth:1200, margin:"0 auto", border:`1px solid rgba(201,150,42,0.15)`, background:"rgba(201,150,42,0.03)" }}>
          {/* CONTROLS */}
          <div style={{ background:"#0d0a07", borderRight:`1px solid rgba(201,150,42,0.12)`, overflowY:"auto", maxHeight:isMobile ? "none" : 780, order:isMobile ? 2 : 1 }}>

            {/* Shirt Colour */}
            <div style={{ borderBottom:`1px solid rgba(201,150,42,0.08)`, padding:controlPad }}>
              {ctrlLabel("Shirt Colour")}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
                {SHIRT_COLORS.map(({c,name})=>(
                  <Tooltip key={c} title={name}>
                    <div onClick={()=>{ setShirtColor(c); messageApi.info(`Colour: ${name}`); }}
                      style={{ aspectRatio:"1", borderRadius:4, background:c, border:`2px solid ${shirtColor===c?C.gold:"transparent"}`, cursor:"pointer", transform:shirtColor===c?"scale(0.92)":"none", transition:"all 0.2s", position:"relative" }}>
                      {shirtColor===c && <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"rgba(255,255,255,0.9)",fontWeight:700}}>✓</span>}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div style={{ borderBottom:`1px solid rgba(201,150,42,0.08)`, padding:controlPad }}>
              {ctrlLabel("T-Shirt Type")}
              <div style={{ display:"grid", gap:8 }}>
                {SHIRT_TYPES.map(type=>(
                  <button key={type.key} onClick={()=>{ setShirtType(type.key); messageApi.info(`T-shirt type: ${type.label}`); }}
                    style={{ background: shirtType===type.key?"rgba(201,150,42,0.12)":"none", border:`1px solid ${shirtType===type.key?"rgba(201,150,42,0.45)":"rgba(201,150,42,0.18)"}`, color: shirtType===type.key?C.ivory:C.smoke, padding:"10px 12px", cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}>
                    <div style={{ fontSize:11, letterSpacing:1.2, textTransform:"uppercase", color: shirtType===type.key?C.gold:"inherit", marginBottom:4 }}>
                      {type.label}
                    </div>
                    <div style={{ fontSize:11, color:C.smoke, lineHeight:1.5 }}>
                      {type.note}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Type */}
            <div style={{ borderBottom:`1px solid rgba(201,150,42,0.08)`, padding:controlPad }}>
              {ctrlLabel("Design Type")}
              <Tabs activeKey={mode} onChange={setMode} size="small" items={[
                { key:"text", label:"Text / Quote",
                  children: (
                    <div>
                      <textarea rows={2} value={text} onChange={e=>setText(e.target.value)}
                        className="ant-input" placeholder="Type your text, brand name or quote…"
                        style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(201,150,42,0.2)`, color:C.ivory, fontFamily:"Outfit,sans-serif", fontSize:13, padding:"10px 14px", resize:"none", outline:"none", marginBottom:12 }}/>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, marginBottom:8 }}>Font Style</div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
                        {FONTS.map(f=>(
                          <button key={f.value} onClick={()=>setFont(f.value)} style={{ background: font===f.value?"rgba(201,150,42,0.1)":"none", border:`1px solid ${font===f.value?"rgba(201,150,42,0.4)":"rgba(201,150,42,0.18)"}`, color: font===f.value?C.ivory:C.smoke, padding:"7px 0", cursor:"pointer", fontSize:11, fontFamily:f.value, transition:"all 0.2s" }}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, marginBottom:8 }}>Text Colour</div>
                      <Space wrap className="pc-chip-scroll" style={{marginBottom:12, width:"100%"}}>
                        {TEXT_COLORS.map(tc=>(
                          <div key={tc} onClick={()=>setTextColor(tc)} style={{ width:24, height:24, borderRadius:"50%", background:tc, border:`2px solid ${textColor===tc?C.gold:"transparent"}`, cursor:"pointer", transform:textColor===tc?"scale(1.15)":"none", transition:"all 0.2s" }}/>
                        ))}
                      </Space>
                      <Row gutter={8} style={{marginBottom:8}}>
                        <Col span={24}>
                          <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, marginBottom:4 }}>Font size: {fontSize}px</div>
                          <Slider min={6} max={22} value={fontSize} onChange={setFontSize} style={{margin:"0 0 10px"}}/>
                        </Col>
                        <Col span={24}>
                          <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, marginBottom:4 }}>Letter spacing: {letterSpacing}px</div>
                          <Slider min={0} max={10} value={letterSpacing} onChange={setLetterSpacing}/>
                        </Col>
                      </Row>
                      <Space wrap className="pc-chip-scroll" style={{ width:"100%" }}>
                        {[["B",bold,setBold,"bold"],["I",italic,setItalic,"italic"],["AA",uppercase,setUppercase,"caps"]].map(([label,val,setter])=>(
                          <button key={label} onClick={()=>setter(!val)} style={{ background:val?"rgba(201,150,42,0.12)":"none", border:`1px solid ${val?"rgba(201,150,42,0.4)":"rgba(201,150,42,0.18)"}`, color:val?C.ivory:C.smoke, width:36, height:32, cursor:"pointer", fontSize:11, fontWeight:"bold", transition:"all 0.2s" }}>
                            {label}
                          </button>
                        ))}
                      </Space>
                    </div>
                  )
                },
                { key:"logo", label:"Upload Logo",
                  children: (
                    <div>
                      <Upload.Dragger beforeUpload={handleLogoUpload} showUploadList={false} accept="image/*" style={{marginBottom:12}}>
                        <div style={{padding:"16px 0",textAlign:"center"}}>
                          <UploadOutlined style={{fontSize:24,color:C.gold,marginBottom:8,display:"block"}}/>
                          <div style={{fontSize:11,color:C.smoke}}>Drop file or <span style={{color:C.gold,fontWeight:500}}>click to browse</span></div>
                          <div style={{fontSize:10,color:C.smoke,marginTop:4}}>PNG, JPG, SVG — any size</div>
                        </div>
                      </Upload.Dragger>
                      {logoSrc && <img src={logoSrc} alt="Logo" style={{maxHeight:60,maxWidth:"100%",objectFit:"contain",border:`1px solid rgba(201,150,42,0.2)`,padding:4,display:"block",margin:"0 auto 10px"}}/>}
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, marginBottom:4 }}>Logo size: {logoSize}%</div>
                      <Slider min={20} max={90} value={logoSize} onChange={setLogoSize}/>
                    </div>
                  )
                },
                { key:"preset", label:"Presets",
                  children: (
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {PRESETS.map(p=>(
                        <button key={p} onClick={()=>applyPreset(p)} style={{ background:"none", border:`1px solid rgba(201,150,42,0.2)`, color:C.smoke, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:1, padding:"10px 0", cursor:"pointer", transition:"all 0.2s", textAlign:"center" }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,150,42,0.2)";e.currentTarget.style.color=C.smoke}}>
                          {p}
                        </button>
                      ))}
                    </div>
                  )
                },
              ]}/>
            </div>

            {/* Placement */}
            <div style={{ borderBottom:`1px solid rgba(201,150,42,0.08)`, padding:controlPad }}>
              {ctrlLabel("Print Placement")}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {PLACEMENTS.map(pl=>(
                  <button key={pl.key} onClick={()=>setPlacement(pl.key)} style={{ background: placement===pl.key?"rgba(201,150,42,0.12)":"none", border:`1px solid ${placement===pl.key?"rgba(201,150,42,0.45)":"rgba(201,150,42,0.18)"}`, color: placement===pl.key?C.gold:C.smoke, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:1, textTransform:"uppercase", padding:"8px 0", cursor:"pointer", transition:"all 0.2s" }}>
                    {pl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ borderBottom:`1px solid rgba(201,150,42,0.08)`, padding:controlPad }}>
              {ctrlLabel("Size")}
              <Space wrap className="pc-chip-scroll" style={{ width:"100%" }}>
                {SIZES.map(s=>(
                  <button key={s} onClick={()=>setSize(s)} style={{ background: size===s?C.gold:"none", border:`1px solid ${size===s?C.gold:"rgba(201,150,42,0.2)"}`, color: size===s?C.ebony:C.smoke, fontFamily:"Outfit,sans-serif", fontSize:11, letterSpacing:1, padding:"5px 10px", cursor:"pointer", fontWeight: size===s?700:400, transition:"all 0.2s", minWidth:40, textAlign:"center" }}>
                    {s}
                  </button>
                ))}
              </Space>
              <div style={{ fontSize:10, color:C.smoke, marginTop:8 }}>Size chart available at checkout</div>
            </div>

            {/* Qty & Order */}
            <div style={{ padding:controlPad }}>
              {ctrlLabel("Quantity & Order")}
              <Space wrap style={{marginBottom:8}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:36,height:36,background:"rgba(201,150,42,0.1)",border:`1px solid rgba(201,150,42,0.2)`,color:C.gold,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
                <InputNumber min={1} max={999} value={qty} onChange={v=>setQty(v||1)} style={{width:72,textAlign:"center"}}/>
                <button onClick={()=>setQty(q=>q+1)} style={{ width:36,height:36,background:"rgba(201,150,42,0.1)",border:`1px solid rgba(201,150,42,0.2)`,color:C.gold,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
              </Space>
              <div style={{ fontSize:10, color:"rgba(201,150,42,0.5)", marginBottom:14, letterSpacing:0.5 }}>{bulkHint}</div>
              <div style={{ background:"rgba(201,150,42,0.06)", border:`1px solid rgba(201,150,42,0.2)`, padding:14, marginBottom:14 }}>
                {[["Price per piece",`₹${ppp}`],["Quantity",`× ${qty}`],["Delivery",deliv===0?"Free ✓":`₹${deliv}`]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:11, letterSpacing:1, color:C.smoke }}>{k}</span>
                    <span style={{ fontSize:13, color:C.ivory, fontWeight:500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:10, borderTop:`1px solid rgba(201,150,42,0.15)` }}>
                  <span style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:C.gold }}>Total</span>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:C.gold }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button onClick={placeOrder} style={{ width:"100%", background:C.gold, border:"none", color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:11, letterSpacing:"2.5px", textTransform:"uppercase", padding:14, cursor:"pointer", fontWeight:700, marginBottom:8 }}>
                Place Order →
              </button>
              <button onClick={saveDesign} style={{ width:"100%", background:"none", border:`1px solid rgba(201,150,42,0.3)`, color:C.gold, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:10, cursor:"pointer" }}>
                <SaveOutlined style={{marginRight:6}}/>Save Design
              </button>
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div style={{ background:C.parchment, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", padding:isMobile ? "20px 14px 14px" : "24px 20px 16px", position:"relative", overflow:"hidden", minHeight:isMobile ? 420 : 780, order:isMobile ? 1 : 2 }}>
            <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,#000 0,#000 1px,transparent 1px,transparent 12px)" }}/>
            <div style={{ position:"absolute", top:18, left:"50%", transform:"translateX(-50%)", fontSize:9, letterSpacing:isMobile ? 2 : 3, textTransform:"uppercase", color:C.golddk, opacity:0.6, whiteSpace:"nowrap" }}>
              LIVE PREVIEW — UPDATES AS YOU DESIGN
            </div>
            <Space wrap className="pc-preview-modes" style={{ marginBottom:18, marginTop:28, position:"relative", zIndex:2 }}>
              {["Front","Back","Flat Lay"].map(v=>(
                <button key={v} style={{ background:"none", border:`1px solid rgba(10,8,6,0.2)`, color:"rgba(10,8,6,0.45)", fontFamily:"Outfit,sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", padding:"6px 14px", cursor:"pointer" }}>{v}</button>
              ))}
            </Space>
            <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:C.golddk, opacity:0.75, marginBottom:12, position:"relative", zIndex:2, textAlign:"center" }}>
              {(SHIRT_TYPES.find(type => type.key === shirtType) || SHIRT_TYPES[0]).label}
            </div>
            <div style={{ width:"100%", display:"flex", justifyContent:"center", position:"relative", zIndex:2 }}>
              <ShirtSVG shirtColor={shirtColor} shirtType={shirtType} text={text} font={font} textColor={textColor}
                fontSize={fontSize} letterSpacing={letterSpacing} bold={bold} italic={italic}
                uppercase={uppercase} placement={placement} mode={mode} logoSrc={logoSrc} logoSize={logoSize} small={isMobile}/>
            </div>

            {/* Saved designs */}
            {savedDesigns.length > 0 && (
              <div style={{ width:"100%", marginTop:20, background:"#0d0a07", borderTop:`1px solid rgba(201,150,42,0.1)`, padding:"12px 16px", position:"relative", zIndex:2 }}>
                <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.smoke, marginBottom:10 }}>Saved Designs</div>
                <Space>
                  {savedDesigns.map(d=>(
                    <Tooltip key={d.id} title={d.text}>
                      <div style={{ width:56, height:56, border:`1px solid rgba(201,150,42,0.25)`, background:d.shirtColor, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:8, color:d.textColor, fontWeight:700, textAlign:"center", padding:2, overflow:"hidden" }}>
                        <span>{d.text.slice(0,8)}</span>
                        <span style={{ fontSize:7, color:C.gold, marginTop:4, letterSpacing:0.5 }}>
                          {(SHIRT_TYPES.find(type => type.key === d.shirtType) || SHIRT_TYPES[0]).label.replace(" Tee","")}
                        </span>
                      </div>
                    </Tooltip>
                  ))}
                </Space>
              </div>
            )}
            <div style={{ fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase", color:C.smoke, opacity:0.6, marginTop:10, position:"relative", zIndex:2 }}>
              Live preview — not to scale
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE GALLERY */}
      <div ref={galleryRef} id="gallery" style={{ background:"#060402", padding:`${sectionPadY}px ${sectionPadX}px`, borderTop:`1px solid rgba(201,150,42,0.1)` }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          {sectionEyebrow("Sample Gallery")}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:700, color:C.ivory, lineHeight:1.15, margin:"0 0 12px" }}>
            10+ Expert Designs — <em style={{fontStyle:"italic",color:C.gold}}>Yours to Inspire</em>
          </h2>
          <p style={{ fontSize:13, color:C.smoke, maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>
            Every design is print-ready. Click any card to preview full size, then use it as your starting point.
          </p>
        </div>

        {/* Filter */}
        <div className="pc-filter-row">
          {GALLERY_CATS.map(cat=>(
            <button key={cat.key} onClick={()=>setGalCat(cat.key)} style={{ background: galCat===cat.key?"rgba(201,150,42,0.12)":"none", border:`1px solid ${galCat===cat.key?"rgba(201,150,42,0.45)":"rgba(201,150,42,0.18)"}`, borderRight: cat.key===GALLERY_CATS[GALLERY_CATS.length-1].key?"1px solid rgba(201,150,42,0.18)":"none", color: galCat===cat.key?C.gold:C.smoke, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:"8px 18px", cursor:"pointer", transition:"all 0.2s", fontWeight: galCat===cat.key?600:400 }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Friends highlight */}
        {(galCat === "all" || galCat === "friends") && (
          <div style={{ maxWidth:1200, margin:"0 auto 0", borderTop: galCat!=="friends"?"none":"none" }}>
            {galCat === "all" && (
              <div style={{ background:"rgba(201,150,42,0.04)", border:`1px solid rgba(201,150,42,0.12)`, padding:isMobile ? "18px 16px" : "20px 28px", marginBottom:24, display:"flex", alignItems:isMobile ? "flex-start" : "center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:C.gold, marginBottom:4 }}>Friends & Besties Collection</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile ? 16 : 18, fontWeight:700, color:C.ivory, lineHeight:1.4 }}>
                    Because every <em style={{color:C.gold,fontStyle:"italic"}}>squad</em> deserves a shirt that says it out loud
                  </div>
                </div>
                <button onClick={()=>setGalCat("friends")} style={{ background:"none", border:`1px solid rgba(201,150,42,0.3)`, color:C.gold, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:isMobile ? "11px 16px" : "8px 18px", cursor:"pointer", width:isMobile ? "100%" : "auto", minHeight:isMobile ? 44 : "auto" }}>
                  View All Friends Designs →
                </button>
              </div>
            )}
          </div>
        )}

        <div className="pc-gcard-grid" style={{ maxWidth:1200, margin:"0 auto", border:`1px solid rgba(201,150,42,0.08)` }}>
          {filteredGallery.map(item=>(
            <GalleryCard key={item.idx} item={item} onUse={applyGalleryDesign} onPreview={openLightbox}/>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:28 }}>
          <p style={{ fontSize:11, color:C.smoke, letterSpacing:1.5 }}>Each design is fully customisable — change text, colours and placement in the studio above</p>
        </div>
      </div>

      {/* PRICING */}
      <div style={{ background:C.ebony, padding:`${sectionPadY}px ${sectionPadX}px` }} id="pricing">
        <div style={{ textAlign:"center", marginBottom:48 }}>
          {sectionEyebrow("Pricing")}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:700, color:C.ivory, margin:0 }}>
            Transparent pricing, <em style={{fontStyle:"italic",color:C.gold}}>zero surprises</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: screens.md?"repeat(3,1fr)":"1fr", gap:1, background:"rgba(201,150,42,0.1)", maxWidth:1050, margin:"0 auto" }}>
          {[
            { badge:"Essential", badgeSolid:false, name:"Single Piece", price:599, unit:"/piece", moq:"No minimum order · 1 piece onwards",
              feats:["Any design, front or back placement","180 GSM combed cotton","DTG full-colour printing","48h dispatch after approval","Basic QC inspection","Pan-India delivery"],
              btn:"ghost", btnLabel:"Design & Order →" },
            { badge:"Most popular", badgeSolid:true, name:"Event Bundle", price:449, unit:"/piece", moq:"Minimum 10 pieces · Save 25%",
              feats:["2 designs — front + back printing","220 GSM premium combed cotton","DTG or screen printing (your choice)","36h priority dispatch","3-point QC + digital print proof","Tissue-wrapped branded packaging"],
              btn:"solid", btnLabel:"Order Bundle →", featured:true },
            { badge:"Wholesale", badgeSolid:false, name:"Atelier Volume", price:299, unit:"/piece", moq:"Minimum 50 pieces · Best value",
              feats:["Unlimited design placements","240 GSM heavyweight cotton","Screen printing — richest quality","Dedicated account manager","Full QC batch inspection report","Custom branded packaging included"],
              btn:"ghost", btnLabel:"Get a Quote →" },
          ].map(plan=>(
            <div key={plan.name} style={{ background: plan.featured?"#0f0c07":C.ebony, padding:isMobile ? "28px 18px" : "36px 28px", position:"relative" }}>
              {plan.featured && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:C.gold }}/>}
              <div style={{ display:"inline-block", fontSize:9, letterSpacing:"2.5px", textTransform:"uppercase", padding:"4px 12px", marginBottom:18, fontWeight:600, background: plan.badgeSolid?C.gold:"rgba(201,150,42,0.08)", color: plan.badgeSolid?C.ebony:C.gold, border: plan.badgeSolid?"none":`1px solid rgba(201,150,42,0.2)` }}>{plan.badge}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:C.ivory, marginBottom:4 }}>{plan.name}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4, margin:"18px 0 8px", flexWrap:"wrap" }}>
                <span style={{ fontSize:14, color:C.gold, alignSelf:"flex-start", marginTop:8 }}>₹</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile ? 42 : 52, fontWeight:900, color:C.ivory, lineHeight:1 }}>{plan.price}</span>
                <span style={{ fontSize:11, color:C.smoke }}>{plan.unit}</span>
              </div>
              <div style={{ fontSize:11, color:"rgba(201,150,42,0.6)", marginBottom:22 }}>{plan.moq}</div>
              <Divider style={{ borderColor:"rgba(255,255,255,0.05)", margin:"0 0 22px" }}/>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 28px", display:"flex", flexDirection:"column", gap:10 }}>
                {plan.feats.map(f=>(
                  <li key={f} style={{ fontSize:12, color:C.smoke, display:"flex", alignItems:"flex-start", gap:8, lineHeight:1.5 }}>
                    <span style={{ fontSize:7, color:C.gold, flexShrink:0, marginTop:4 }}>◆</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>scrollTo(studioRef)} style={{ width:"100%", padding:13, fontFamily:"Outfit,sans-serif", fontSize:10, letterSpacing:"2.5px", textTransform:"uppercase", cursor:"pointer", fontWeight:600, background: plan.btn==="solid"?C.gold:"none", border: plan.btn==="solid"?"none":`1px solid rgba(201,150,42,0.3)`, color: plan.btn==="solid"?C.ebony:C.gold, transition:"all 0.25s" }}>
                {plan.btnLabel}
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", fontSize:11, color:C.smoke, marginTop:28 }}>All prices inclusive of GST · Free delivery on orders above ₹999 · Reprint guaranteed on quality issues</p>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background:"#080604", padding:`${sectionPadY}px ${sectionPadX}px`, borderTop:`1px solid rgba(201,150,42,0.1)` }}>
        <div style={{ textAlign:"center", marginBottom:0 }}>
          {sectionEyebrow("Testimonials")}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:700, color:C.ivory, margin:0 }}>
            Worn with <em style={{fontStyle:"italic",color:C.gold}}>pride</em> across India
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: screens.md?"repeat(3,1fr)":"1fr", gap:1, background:"rgba(201,150,42,0.08)", maxWidth:1100, margin:"48px auto 0" }}>
          {[
            { text:"We ordered 200 T-shirts with our mosque's calligraphy for Eid. Every single piece was perfect — the Urdu script was razor-sharp, the cotton felt luxurious.", name:"Maulana Arshad Qureshi", role:"Community Trust · Patna, Bihar" },
            { text:"Our startup team of 30 received matching branded tees within 3 days. The colour accuracy on our logo was flawless. We've reordered three times since.", name:"Priya Mehta", role:"Founder · TechVenture, Bangalore" },
            { text:"I've used many print services. PrintCraft is in a different league. The fabric weight, the packaging, the quality check — it all feels like a premium product house.", name:"Rajiv Sharma", role:"Brand Director · Delhi NCR" },
          ].map(t=>(
            <div key={t.name} style={{ background:"#080604", padding:isMobile ? "28px 18px" : "36px 28px", position:"relative" }}>
              <div style={{ display:"flex", gap:3, marginBottom:14 }}>
                {[1,2,3,4,5].map(s=><StarFilled key={s} style={{fontSize:10,color:C.gold}}/>)}
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:64, color:"rgba(201,150,42,0.12)", lineHeight:1, marginBottom:8, fontWeight:900 }}>"</div>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontStyle:"italic", color:"#bfae98", lineHeight:1.75, marginBottom:28 }}>{t.text}</p>
              <div style={{ width:24, height:"1.5px", background:C.gold, marginBottom:16 }}/>
              <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:C.ivory, fontWeight:500 }}>{t.name}</div>
              <div style={{ fontSize:10, color:C.smoke, marginTop:3 }}>{t.role}</div>
              <div style={{ position:"absolute", top:isMobile ? 16 : 24, right:isMobile ? 16 : 24, fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(201,150,42,0.5)", border:`1px solid rgba(201,150,42,0.2)`, padding:"3px 8px" }}>Verified</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:C.gold, padding:isMobile ? "56px 16px" : "80px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, left:"50%", transform:"translateX(-50%)", width:300, height:300, borderRadius:"50%", border:"1px solid rgba(0,0,0,0.08)" }}/>
        <div style={{ fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"rgba(10,8,6,0.55)", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
          <div style={{width:20,height:1,background:"rgba(10,8,6,0.4)"}}/>Ready to begin?<div style={{width:20,height:1,background:"rgba(10,8,6,0.4)"}}/>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:900, color:C.ebony, lineHeight:1.1, marginBottom:16, position:"relative", zIndex:1 }}>
          Your <em style={{fontStyle:"italic"}}>perfect</em> tee<br/>is one click away.
        </h2>
        <p style={{ fontSize:14, color:"rgba(10,8,6,0.6)", maxWidth:440, margin:"0 auto 28px", lineHeight:1.75, position:"relative", zIndex:1 }}>
          Upload your logo, share your vision, or pick from our collection. We handle everything from there.
        </p>
        <Space wrap direction={isMobile ? "vertical" : "horizontal"} justify="center" style={{position:"relative",zIndex:1, width:isMobile ? "100%" : "auto"}}>
          <button onClick={()=>scrollTo(studioRef)} style={{ background:C.ebony, border:"none", color:C.ivory, fontFamily:"Outfit,sans-serif", fontSize:11, letterSpacing:"2.5px", textTransform:"uppercase", padding:isMobile ? "14px 18px" : "14px 32px", cursor:"pointer", fontWeight:600, width:isMobile ? "100%" : "auto", minHeight:48 }}>
            Open Design Studio →
          </button>
          <button style={{ background:"none", border:"2px solid rgba(10,8,6,0.3)", color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:isMobile ? "14px 18px" : "14px 28px", cursor:"pointer", fontWeight:500, width:isMobile ? "100%" : "auto", minHeight:48 }}>
            Speak to Our Team
          </button>
        </Space>
      </div>

      {/* FOOTER */}
      <div style={{ background:"#050402", padding:isMobile ? "44px 16px 24px" : "56px 40px 24px", borderTop:`1px solid rgba(201,150,42,0.08)` }}>
        <Row gutter={[48,32]} style={{marginBottom:isMobile ? 32 : 48}}>
          <Col xs={24} md={8}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:C.ivory, marginBottom:4 }}>Print<span style={{color:C.gold}}>Craft</span></div>
            <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.smoke, marginBottom:16 }}>Premium Atelier · Est. 2024</div>
            <p style={{ fontSize:12, color:C.smoke, lineHeight:1.7, maxWidth:230 }}>Bespoke print-on-demand T-shirts crafted for brands, believers, and bold identities.</p>
          </Col>
          {[["Collections",["Brand identity","Sacred & spiritual","Sports & fan wear","Event & occasion","Typography & verse"]],["Services",["Design studio","Bulk & wholesale","Corporate orders","NGO programme","Reseller partner"]],["Company",["Our story","Quality promise","Contact us","Privacy policy"]]].map(([title,links])=>(
            <Col xs={12} md={4} key={title}>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.gold, marginBottom:18 }}>{title}</div>
              {links.map(l=><div key={l} style={{ fontSize:12, color:C.smoke, marginBottom:10, cursor:"pointer", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.ivory} onMouseLeave={e=>e.target.style.color=C.smoke}>{l}</div>)}
            </Col>
          ))}
        </Row>
        <div className="pc-footer-meta" style={{ borderTop:`1px solid rgba(255,255,255,0.04)`, paddingTop:24 }}>
          <span style={{ fontSize:10, color:"#3a3228" }}>© 2026 PrintCraft. All rights reserved.</span>
          <span style={{ fontSize:10, color:C.gold, letterSpacing:1 }}>Crafted with pride in India ◆</span>
        </div>
      </div>

      {/* LIGHTBOX */}
      <Modal open={lbOpen} onCancel={()=>setLbOpen(false)} footer={null} width={isMobile ? "calc(100vw - 24px)" : 680} closeIcon={<CloseOutlined style={{color:C.smoke}}/>}
        styles={{ content:{ background:"#0d0a07", border:`1px solid rgba(201,150,42,0.2)`, padding:0, borderRadius:0 }, mask:{ background:"rgba(0,0,0,0.88)" } }}>
        {lbItem && (
          <div style={{ display:"grid", gridTemplateColumns: screens.md?"1fr 1fr":"1fr" }}>
            <div style={{ background:C.parchment, display:"flex", alignItems:"center", justifyContent:"center", padding:isMobile ? "28px 16px" : "40px 24px", position:"relative", overflow:"hidden", minHeight:isMobile ? 240 : 320 }}>
              <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 10px)" }}/>
              <GalleryShirtSVG idx={lbItem.idx} shirtColor={lbItem.color} shirtType={lbItem.shirtType}/>
              <button onClick={()=>shiftLb(-1)} style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", background:"rgba(10,8,6,0.7)", border:`1px solid rgba(201,150,42,0.2)`, color:C.gold, width:32, height:32, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}><LeftOutlined/></button>
              <button onClick={()=>shiftLb(1)} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"rgba(10,8,6,0.7)", border:`1px solid rgba(201,150,42,0.2)`, color:C.gold, width:32, height:32, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}><RightOutlined/></button>
            </div>
            <div style={{ padding:isMobile ? "22px 16px" : "28px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.gold, marginBottom:8 }}>Design {lbIdx+1} of {GALLERY.length}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:C.ivory, marginBottom:8, lineHeight:1.2 }}>{lbItem.name}</div>
                <p style={{ fontSize:12, color:C.smoke, lineHeight:1.65, marginBottom:18 }}>{lbItem.desc}</p>
                <div>
                  {lbItem.specs.map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 0", borderBottom:`1px solid rgba(255,255,255,0.04)` }}>
                      <span style={{color:C.smoke}}>{k}</span>
                      <span style={{color:C.ivory,fontWeight:500}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>applyGalleryDesign(lbItem)} style={{ width:"100%", background:C.gold, border:"none", color:C.ebony, fontFamily:"Outfit,sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:14, cursor:"pointer", fontWeight:700, marginTop:24 }}>
                Use This Design in Studio →
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

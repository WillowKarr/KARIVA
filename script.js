:root{
  --bg: #0B0F0D;
  --bg-2:#0F1512;

  --surface: rgba(255,255,255,.06);
  --surface-2: rgba(255,255,255,.09);
  --stroke: rgba(255,255,255,.12);

  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.70);
  --muted-2: rgba(255,255,255,.56);

  --light: #F2F3F4;
  --darkText:#0B0F0D;

  --accent:#C9FF57;
  --accent-2:#B8F04C;

  --radius: 12px;
  --radius-sm: 9px;
  --radius-xs: 7px;

  --shadow: 0 18px 60px rgba(0,0,0,.45);
  --shadow-soft: 0 10px 30px rgba(0,0,0,.28);

  --container: 1160px;

  --t-fast: 140ms;
  --t-med: 220ms;
  --t-slow: 420ms;

  --ease: cubic-bezier(.16,1,.3,1);
}

@media (prefers-reduced-motion: reduce){
  :root{ --t-fast: 1ms; --t-med: 1ms; --t-slow: 1ms; }
}

*{ box-sizing:border-box; }

/* курсор скрыт везде */
html, body, *{ cursor: none !important; }

html,body{ height:100%; }

body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: var(--text);
  overflow-x:hidden;

  /* единый фон сайта без стыков */
  background:
    radial-gradient(1400px 900px at 70% -10%, rgba(201,255,87,.10), transparent 58%),
    radial-gradient(900px 700px at 10% 10%, rgba(255,255,255,.04), transparent 55%),
    linear-gradient(180deg, #0B0F0D 0%, #0C120F 35%, #0B0F0D 100%);
}

/* тач: возвращаем стандартный курсор, убираем кастомный */
@media (hover: none), (pointer: coarse){
  html, body, *{ cursor: auto !important; }
  .cursor, .cursor-follower{ display:none !important; }
}

img{ max-width:100%; display:block; }
a{ color:inherit; text-decoration:none; }
button{ font:inherit; color:inherit; }

.skip-link{
  position:absolute; left:-999px; top:auto;
  width:1px; height:1px; overflow:hidden;
}
.skip-link:focus{
  left:16px; top:16px; width:auto; height:auto;
  padding:10px 14px;
  border-radius: 10px;
  background: var(--light);
  color: var(--darkText);
  z-index: 9999;
}

.anchor{ position: relative; top:-86px; }

.container{
  width: min(var(--container), calc(100% - 40px));
  margin: 0 auto;
}

.section{
  padding: clamp(72px, 7vw, 128px) 0;
}
.section--tight{
  padding: clamp(64px, 6vw, 104px) 0;
}
.section--dark{
  border-top: 1px solid rgba(255,255,255,.06);
  border-bottom: 1px solid rgba(255,255,255,.06);
}

/* (6) больше отступов после заголовков */
.section__head{
  margin-bottom: clamp(28px, 3.2vw, 54px);
}
.section__head--onDark{ margin-bottom: clamp(20px, 3vw, 44px); }
.section__head--onAccent{ margin-bottom: clamp(22px, 3vw, 48px); }

.header{
  position: fixed;
  inset: 14px 0 auto 0;
  z-index: 1200;
  pointer-events: none;
}
.header__inner{
  pointer-events: auto;
  width: min(var(--container), calc(100% - 24px));
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 18px;

  padding: 12px 18px;

  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(16,22,18,.55);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 35px rgba(0,0,0,.28);
}

.brand{
  display:flex;
  align-items:center;
  justify-content:center;
  width: 46px;
  height: 34px;
  border-radius: 999px;
  overflow:hidden;
}
.brand__img{
  width:auto;
  height: 22px;
  object-fit: contain;
  filter: brightness(1.05) contrast(1.05);
}

.nav__list{
  display:flex;
  align-items:center;
  gap: 30px;
  padding:0; margin:0;
  list-style:none;
}

.nav__link{
  color: var(--text);
  font-weight: 750;
  font-size: 13px;
  letter-spacing: .10em;
  text-transform: uppercase;
  opacity: .88;
  position: relative;
  padding: 12px 8px;
  transition: color var(--t-fast) var(--ease), opacity var(--t-fast) var(--ease);
}

.nav__link::after{
  content:"";
  position:absolute;
  left: 50%;
  bottom: 4px;
  width: 0%;
  height: 2px;
  background: var(--accent);
  transform: translateX(-50%);
  transition: width var(--t-med) var(--ease);
  border-radius: 2px;
}
.nav__link:hover{
  color: var(--accent);
  opacity: 1;
}
.nav__link:hover::after{ width: 72%; }

.nav__link:focus-visible{
  outline: 2px solid rgba(201,255,87,.6);
  outline-offset: 6px;
  border-radius: 10px;
}

.burger{
  width: 46px; height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  display:none;
  align-items:center;
  justify-content:center;
  gap: 6px;
  flex-direction: column;
}
.burger span{
  width: 18px; height: 2px;
  background: rgba(255,255,255,.88);
  border-radius: 999px;
  transition: transform var(--t-med) var(--ease), opacity var(--t-med) var(--ease);
}
.burger.is-open span:nth-child(1){ transform: translateY(8px) rotate(45deg); }
.burger.is-open span:nth-child(2){ opacity: 0; }
.burger.is-open span:nth-child(3){ transform: translateY(-8px) rotate(-45deg); }

.nav-overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 1100;
}

@media (max-width: 820px){
  .burger{ display:flex; }
  .nav{
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: min(520px, calc(100% - 24px));
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(16,22,18,.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 24px 70px rgba(0,0,0,.55);
    padding: 14px;
    display:none;
    z-index: 1150;
  }
  .nav.is-open{ display:block; }
  .nav__list{ flex-direction: column; gap: 10px; }
  .nav__link{
    display:block;
    padding: 12px 14px;
    border-radius: 12px;
    text-align:center;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
  }
  .nav__link::after{ display:none; }
}

/* Typography */
.h2{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.08;
  font-size: clamp(34px, 4.6vw, 56px);
  margin: 0;
}
.h2--dark{ color: var(--darkText); }
.h2--white{ color: rgba(255,255,255,.96); }

.eyebrow{
  margin: 0 0 10px;
  color: var(--muted);
  letter-spacing: .12em;
  text-transform: uppercase;
  font-size: 12px;
}
.text{ margin: 0 0 14px; max-width: 62ch; color: var(--muted); }
.text--muted{ color: var(--muted-2); }

/* HERO */
.hero{
  position: relative;
  min-height: 100svh;
  display:flex;
  align-items:center;
  padding-top: 96px;
}
.hero__bg{
  position:absolute;
  inset:0;
  background:
    linear-gradient(180deg, rgba(11,15,13,.25), rgba(11,15,13,.92)),
    url("homebgpc.gif") center/cover no-repeat;
  filter: saturate(0.9) contrast(1.06);
  transform: translateZ(0);
}
@media (max-width: 820px){
  .hero__bg{
    background:
      linear-gradient(180deg, rgba(11,15,13,.35), rgba(11,15,13,.95)),
      url("homebgmob.gif") center/cover no-repeat;
    background-position: 50% 20%;
  }
}
.hero__grid{
  position: relative;
  z-index: 1;
  display:grid;
  grid-template-columns: 1.05fr .95fr;
  gap: clamp(18px, 4vw, 56px);
  align-items: end;
}
.hero__col--left{ display:grid; gap: 10px; }
.hero__titleWrap{ max-width: 18ch; }
.hero__title{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.02;
  font-size: clamp(40px, 5.8vw, 72px);
  margin: 0;
}
.hero__meta{
  display:flex;
  align-items:center;
  gap: 12px;
  margin-top: 4px;
}
.hero__metaLine{
  width: 44px;
  height: 2px;
  background: rgba(201,255,87,.9);
  border-radius: 2px;
}
.hero__metaText{
  margin:0;
  letter-spacing: .10em;
  text-transform: uppercase;
  font-size: 12px;
  color: rgba(255,255,255,.78);
}

.hero__col--right{
  display:grid;
  gap: 18px;
  justify-items: start;
}
.hero__lead{
  margin:0;
  max-width: 60ch;
  color: rgba(255,255,255,.80);
  font-size: clamp(16px, 2vw, 19px);
}
.hero__actions{
  display:flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* (4) больше пространства между текстом/кнопками и строкой IDENTITY... */
.hero__sideCard{ margin-top: clamp(18px, 3vw, 40px); }

.hero__sideCard{
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(12px);
  padding: 14px 14px;
}
.hero__sideCardInner{
  display:flex;
  align-items:center;
  gap: 8px;
}
.hero__dot{
  width: 6px; height: 6px;
  border-radius: 2px;
  background: rgba(201,255,87,.9);
  box-shadow: 0 0 0 6px rgba(201,255,87,.08);
}
.hero__sideText{
  font-size: 12px;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: rgba(255,255,255,.72);
}
@media (max-width: 980px){
  .hero__grid{ grid-template-columns: 1fr; align-items: start; }
  .hero__sideCard{ width: 100%; }
}

/* Buttons */
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
  height: 44px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-weight: 800;
  letter-spacing: .02em;
  font-size: 14px;
  border: 1px solid transparent;
  transition:
    transform var(--t-fast) var(--ease),
    background var(--t-fast) var(--ease),
    border-color var(--t-fast) var(--ease),
    color var(--t-fast) var(--ease),
    filter var(--t-fast) var(--ease);
  will-change: transform;
}
.btn--primary{
  background: rgba(255,255,255,.10);
  border-color: rgba(255,255,255,.14);
}
.btn--primary:hover{
  transform: translateY(-1px);
  background: rgba(201,255,87,.14);
  border-color: rgba(201,255,87,.30);
}
.btn--secondary{
  background: transparent;
  border-color: rgba(255,255,255,.16);
}
.btn--secondary:hover{
  transform: translateY(-1px);
  border-color: rgba(201,255,87,.35);
  color: rgba(255,255,255,.96);
}
.btn:hover{ filter: saturate(1.15); }

/* ABOUT */
.about{
  display:grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: clamp(18px, 4vw, 56px);
  align-items: start;
}
@media (max-width: 920px){
  .about{ grid-template-columns: 1fr; }
}
.about__media{ margin:0; }
.about__img{
  width:100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: var(--radius);
}
.about__important{
  margin: 18px 0 16px;
  font-weight: 900;
  font-size: clamp(18px, 2.1vw, 22px);
  color: rgba(255,255,255,.92);
  letter-spacing: -0.01em;
}

/* bullets fireflies */
.pixel-list{
  list-style:none;
  margin: 0 0 16px;
  padding: 0;
  display:grid;
  gap: 10px;
  max-width: 62ch;
}
.pixel-list li{
  position: relative;
  padding-left: 22px;
  color: var(--muted);
}
.pixel{
  position:absolute;
  left:0;
  top: .62em;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(201,255,87,.10);
  transform: translateY(-50%);
}
.fireflies .pixel{ animation: firefly 2.6s var(--ease) infinite; }
.fireflies li:nth-child(2) .pixel{ animation-delay: .2s; }
.fireflies li:nth-child(3) .pixel{ animation-delay: .45s; }
.fireflies li:nth-child(4) .pixel{ animation-delay: .7s; }

@keyframes firefly{
  0%   { transform: translate(-1px, -50%); opacity: .88; }
  25%  { transform: translate(2px, calc(-50% - 2px)); opacity: 1; }
  50%  { transform: translate(1px, calc(-50% + 2px)); opacity: .9; }
  75%  { transform: translate(-2px, calc(-50% - 1px)); opacity: 1; }
  100% { transform: translate(-1px, -50%); opacity: .88; }
}
@media (prefers-reduced-motion: reduce){
  .fireflies .pixel{ animation: none; }
}

/* (5) PATH green section */
.section--path{
  background: var(--accent);
  color: var(--darkText);
}
.section--path .reveal{ /* reveal внутри зеленого */
  transition-delay: var(--d, 0ms);
}
.timeline--accent{ margin-top: 6px; }

.timeline__grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 1080px){ .timeline__grid{ grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 620px){ .timeline__grid{ grid-template-columns: 1fr; } }

.tcard{
  border-radius: var(--radius);
  border: 1px solid rgba(11,15,13,.18);
  background: rgba(255,255,255,.35);
  backdrop-filter: blur(12px);
  padding: 18px 18px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0,0,0,.18);
}
.tcard__meta{
  margin:0 0 10px;
  color: rgba(11,15,13,.85);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 900;
}
.tcard__title{
  margin:0 0 10px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 16px;
  letter-spacing: -0.01em;
  font-weight: 800;
  color: rgba(11,15,13,.95);
}
.tcard__text{
  margin:0;
  color: rgba(11,15,13,.78);
  font-size: 15px;
  line-height: 1.6;
}

.timeline__grid--stack .tcard{ z-index: var(--z, 1); }
.tcard{ transform: translateX(-18px); }

/* (5) glitch animation хаотичная */
.tcard--glitch{
  animation: glitchJitter 2.9s steps(2, end) infinite;
}
.tcard--glitch::before,
.tcard--glitch::after{
  content:"";
  position:absolute;
  inset:-2px;
  background: linear-gradient(90deg, rgba(11,15,13,.18), transparent 35%, rgba(11,15,13,.12));
  opacity: 0;
  mix-blend-mode: multiply;
  pointer-events:none;
}
.tcard--glitch::before{ transform: translateX(-2px); }
.tcard--glitch::after{ transform: translateX(2px); }

@keyframes glitchJitter{
  0%   { filter: none; transform: translateX(-18px) translateY(0); }
  18%  { filter: none; }
  20%  { transform: translateX(-16px) translateY(-1px); }
  21%  { transform: translateX(-18px) translateY(0); }
  47%  { filter: none; }
  50%  { filter: contrast(1.05) saturate(1.02); }
  51%  { }
  52%  { }
  53%  { }
  55%  { transform: translateX(-20px) translateY(1px); }
  56%  { transform: translateX(-18px) translateY(0); }
  78%  { }
  80%  { transform: translateX(-19px) translateY(-1px); }
  81%  { transform: translateX(-18px) translateY(0); }
  100% { filter: none; }
}
@media (prefers-reduced-motion: reduce){
  .tcard--glitch{ animation: none; }
}

/* HELP */
.help{
  display:grid;
  gap: 12px;
  max-width: 980px;
}
.help-card{
  position: relative;
  display:grid;
  grid-template-columns: 160px 1fr;
  gap: 18px;
  align-items:center;

  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.12);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  backdrop-filter: blur(14px);
  padding: 18px 18px;
  box-shadow: 0 22px 70px rgba(0,0,0,.28);
  z-index: var(--z, 1);
  overflow: visible;
}
.help-card__media{
  width: 170px;
  height: 110px;
  border-radius: var(--radius);
  background: rgba(201,255,87,.08);
  border: 1px solid rgba(201,255,87,.18);
  transform: translateX(-18px);
}
.help-card__media img{
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius: inherit;
}
.help-card__body .text{ margin: 0; }
.card-title{
  margin: 0 0 10px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.01em;
}
.card-title--on-dark{ color: rgba(255,255,255,.94); }

@media (max-width: 740px){
  .help-card{ grid-template-columns: 1fr; }
  .help-card__media{ transform: none; width: 100%; height: 140px; }
}

/* (8) WHY full screen + orbit cards */
.whyScreen{
  position: relative;
  min-height: 100svh;
  display:flex;
  align-items:center;
  overflow:hidden;
}
.whyScreen__bg{
  position:absolute;
  inset:0;
  opacity: .24;
  /* ВСТАВЬТЕ СЮДА НАЗВАНИЕ GIF */
  background: url("matrix.gif") center/cover no-repeat;
  filter: contrast(1.08) saturate(.9);
}
.whyScreen::after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(900px 700px at 50% 50%, rgba(201,255,87,.12), transparent 60%),
    linear-gradient(180deg, rgba(11,15,13,.50), rgba(11,15,13,.92));
  pointer-events:none;
}
.whyScreen__inner{
  position: relative;
  z-index: 1;
  width: min(var(--container), calc(100% - 40px));
}
.whyScreen__center{
  max-width: 72ch;
}
.whyScreen__lead{
  margin: 18px 0 0;
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.65;
  color: rgba(255,255,255,.82);
  max-width: 70ch;
}

.orbit{
  position: relative;
  margin-top: clamp(18px, 5vw, 60px);
  height: min(520px, 52vh);
  width: 100%;
}
.orbitCard{
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(320px, 70vw);
  transform:
    translate(-50%, -50%)
    rotate(var(--a))
    translateX(min(240px, 26vw))
    rotate(calc(var(--a) * -1));
}
.orbitCard__inner{
  padding: 22px 22px; /* (8) больше свободного пространства внутри */
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(14px);
  box-shadow: 0 22px 70px rgba(0,0,0,.35);
  color: rgba(255,255,255,.88);
  font-weight: 700;
  line-height: 1.45;
}

/* “лёгкое перемещение” как буллеты */
.floaty{
  animation: floaty 3.6s var(--ease) infinite;
}
.orbitCard:nth-child(2){ animation-delay: .2s; }
.orbitCard:nth-child(3){ animation-delay: .45s; }
.orbitCard:nth-child(4){ animation-delay: .7s; }
.orbitCard:nth-child(5){ animation-delay: .9s; }

@keyframes floaty{
  0%   { transform:
    translate(-50%, -50%)
    rotate(var(--a))
    translateX(min(240px, 26vw))
    rotate(calc(var(--a) * -1))
    translate(0px, 0px); }
  35%  { transform:
    translate(-50%, -50%)
    rotate(var(--a))
    translateX(min(240px, 26vw))
    rotate(calc(var(--a) * -1))
    translate(6px, -5px); }
  70%  { transform:
    translate(-50%, -50%)
    rotate(var(--a))
    translateX(min(240px, 26vw))
    rotate(calc(var(--a) * -1))
    translate(-5px, 6px); }
  100% { transform:
    translate(-50%, -50%)
    rotate(var(--a))
    translateX(min(240px, 26vw))
    rotate(calc(var(--a) * -1))
    translate(0px, 0px); }
}
@media (prefers-reduced-motion: reduce){
  .floaty{ animation: none; }
}

/* mobile: превращаем “круг” в аккуратный стек-список */
@media (max-width: 760px){
  .orbit{
    height: auto;
    display:grid;
    gap: 12px;
  }
  .orbitCard{
    position: static;
    transform: none !important;
    width: 100%;
  }
  .orbitCard__inner{ padding: 18px; }
}

/* PROCESS */
.steps{
  display:grid;
  gap: 10px;
  max-width: 980px;
}
.step{
  display:grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  align-items:start;

  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(12px);
  padding: 16px 18px;
  position: relative;
  overflow: visible;
}
.step__num{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  font-size: 64px;
  color: rgba(201,255,87,.95);
  transform: translate(-18px, -10px);
}
@media (max-width: 560px){
  .step{ grid-template-columns: 90px 1fr; }
  .step__num{ font-size: 54px; transform: translate(-12px, -8px); }
}

/* PORTFOLIO */
.cases-grid{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}
.case-card{
  grid-column: span 4;
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.03);
  overflow:hidden;
  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.case-card:hover{
  transform: translateY(-2px);
  border-color: rgba(201,255,87,.22);
}
@media (max-width: 1080px){ .case-card{ grid-column: span 6; } }
@media (max-width: 720px){ .case-card{ grid-column: span 12; } }

.case-card__media{
  width: 100%;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  position: relative;
  display:block;
}
.case-card__media img{
  width: 100%;
  height: 380px;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--t-slow) var(--ease);
}
.case-card:hover .case-card__media img{ transform: scale(1.05); }

.case-card__cta{
  position:absolute;
  right: 12px;
  bottom: 12px;
  display:flex;
  justify-content:flex-end;
}
.case-card__ctaBtn{
  height: 42px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: var(--darkText);
  font-weight: 900;
  letter-spacing: .02em;
  display:inline-flex;
  align-items:center;
  gap: 10px;
  border: 1px solid rgba(11,15,13,.18);
  transition: filter var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}
.case-card__ctaBtn:hover{
  transform: translateY(-1px);
  filter: saturate(1.15);
}

.case-card__body{ padding: 14px 14px 16px; }
.case-card__title{
  margin: 0 0 8px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 850;
  font-size: 19px;
  letter-spacing: -0.01em;
}
.case-card__desc{ margin: 0; color: var(--muted-2); line-height: 1.55; }

/* MODAL (10) фиксируем страницу, скроллим только контент кейса */
.modal{
  position: fixed;
  inset: 0;
  z-index: 2000;
  display:none;
}
.modal.is-open{ display:block; }
.modal__backdrop{
  position:absolute;
  inset:0;
  background: rgba(0,0,0,.88);
}
.modal__dialog{
  position: relative;
  height: 100%;
  display:flex;
  flex-direction: column;
  overflow: hidden; /* важно */
}

/* (11) крестик всегда на месте */
.modal__top{
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 2100;
}
.icon-btn{
  width: 44px; height: 44px;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(10px);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: background var(--t-fast) var(--ease), color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}

/* (12) hover: салатово зеленым, а сами становятся черными */
.icon-btn:hover{
  background: var(--accent);
  border-color: rgba(11,15,13,.18);
  color: var(--darkText);
}

/* медиа часть 90% */
.modal__media{
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  gap: 14px;
  position: relative;
  z-index: 2;
}
.modal__media--tall{
  height: 90vh;
  min-height: 420px;
}

.case-hero{
  width: min(1200px, calc(100% - 120px));
  height: 100%;
  position: relative;
}
.slider{
  width: 100%;
  height: 100%;
  overflow:hidden;
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.03);
}
.slider__track{
  display:flex;
  height: 100%;
  transform: translateX(0%);
  transition: transform var(--t-slow) var(--ease);
  will-change: transform;
}
.slide{ min-width: 100%; height: 100%; }
.slide img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* стрелки */
.nav-btn{
  width: 44px; height: 44px;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(10px);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: background var(--t-fast) var(--ease), color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.nav-btn:hover{
  background: var(--accent);
  border-color: rgba(11,15,13,.18);
  color: var(--darkText);
}

/* кнопка читать поверх изображения */
.case-hero__read{
  position:absolute;
  right: 14px;
  bottom: 14px;
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: var(--darkText);
  font-weight: 900;
  letter-spacing: .02em;
  border: 1px solid rgba(11,15,13,.18);
  display:inline-flex;
  align-items:center;
  gap: 10px;
  transition: filter var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}
.case-hero__read:hover{
  transform: translateY(-1px);
  filter: saturate(1.15);
}

@media (max-width: 720px){
  .nav-btn{ display:none; }
  .case-hero{ width: 100%; }
}

/* (10) скролл только внутри контента */
.modal__content{
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 18px 0 28px;
  display:grid;
  gap: 12px;
  position: relative;
  z-index: 2;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* высота = остаток экрана (100vh - 90vh - отступы) */
  height: calc(100vh - 90vh - 22px);
  min-height: 120px;
}
@media (max-height: 720px){
  .modal__media--tall{ height: 86vh; }
  .modal__content{ height: calc(100vh - 86vh - 22px); }
}

.modal__title{
  margin:0;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: clamp(20px, 2.6vw, 28px);
}
.modal__tags{
  display:flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag{
  height: 30px;
  display:inline-flex;
  align-items:center;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.05);
  font-size: 12px;
  font-weight: 900;
}
.modal__desc{
  margin:0;
  color: rgba(255,255,255,.76);
  max-width: 90ch;
}
body.modal-open{ overflow:hidden; }

/* CTA */
.section--cta{
  position: relative;
  overflow: hidden;
}
.cta__bg{
  position:absolute;
  inset:0;
  opacity: .22;
  /* ВСТАВЬТЕ СЮДА НАЗВАНИЕ GIF */
  background: url("grey-pixels.gif") center/cover no-repeat;
  filter: contrast(1.05);
}
.section--cta::after{
  content:"";
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(11,15,13,.62), rgba(11,15,13,.90));
  pointer-events:none;
}
.cta{ margin-top: 10px; position: relative; z-index: 1; }

/* плашка */
.cta-card{
  background: var(--light);
  color: var(--darkText);
  border-radius: calc(var(--radius) + 6px);
  padding: clamp(12px, 2.2vw, 18px);
  display:grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 18px;
  align-items: stretch;
  box-shadow: 0 30px 90px rgba(0,0,0,.35);
}
@media (max-width: 860px){
  .cta-card{ grid-template-columns: 1fr; }
}

.cta-text{
  margin: 0;
  color: rgba(11,15,13,.78);
  max-width: 70ch;
}

/* (14) фиксируем вертикальный ритм: текст сверху, кнопки снизу */
.cta-leftLayout{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
}
@media (max-width: 860px){
  .cta-leftLayout{ min-height: auto; gap: 18px; }
}

.cta-actions--spaced{
  display:flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.btn--tg{
  background: rgba(11,15,13,.92);
  border-color: rgba(11,15,13,.92);
  color: var(--light);
}
.btn--darkStroke{
  border-color: rgba(11,15,13,.22);
  color: rgba(11,15,13,.92);
}
.btn--darkStroke:hover{
  border-color: rgba(11,15,13,.30);
  background: rgba(11,15,13,.06);
}

.cta-photoFull{
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 240px;
  border-radius: var(--radius);
  overflow: hidden;
}
.cta-photoFull img{
  width:100%;
  height:100%;
  object-fit: cover;
}
.cta-photoFull__fade{
  position:absolute;
  inset:0;
  background: linear-gradient(90deg, rgba(242,243,244,1) 0%, rgba(242,243,244,.65) 35%, rgba(242,243,244,0) 70%);
  pointer-events:none;
}
.cta-overlayText{
  position:absolute;
  right: 14px;
  bottom: 14px;
  text-align:right;
  color: rgba(242,243,244,.96);
  text-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.cta-overlayText__name{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.01em;
  font-size: 18px;
}
.cta-overlayText__role{
  font-size: 12px;
  letter-spacing: .10em;
  text-transform: uppercase;
  opacity: .92;
}

/* FOOTER */
.footer{
  background: var(--accent);
  color: var(--darkText);
  padding: 34px 0;
}
.footer__inner{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.footer__contacts{ display:grid; gap: 10px; }
.footer__link{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  font-weight: 850;
}
.footer__social{
  margin-top: 12px;
  display:flex;
  gap: 10px;
}
.social{
  width: 42px; height: 42px;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(11,15,13,.18);
  background: rgba(11,15,13,.06);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: transform var(--t-fast) var(--ease), background var(--t-fast) var(--ease), filter var(--t-fast) var(--ease);
}
.social:hover{ transform: translateY(-1px); filter: saturate(1.15); }
.footer__logo{ height: 22px; width:auto; object-fit: contain; }

/* Reveal animations */
.reveal{
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity var(--t-slow) var(--ease),
    transform var(--t-slow) var(--ease);
  transition-delay: var(--d, 0ms);
  will-change: transform, opacity;
}
.reveal[data-reveal="lr"]{ transform: translateX(-22px); }
.in-view{ opacity: 1; transform: translateY(0); }
.in-view[data-reveal="lr"]{ transform: translateX(0); }

@media (prefers-reduced-motion: reduce){
  .reveal{ opacity: 1; transform: none; transition: none; }
}

/* Custom cursor square rounded */
.cursor,
.cursor-follower{
  position: fixed;
  left: 0; top: 0;
  pointer-events:none;
  transform: translate(-50%, -50%);
  z-index: 3000;
  mix-blend-mode: difference;
}
.cursor{
  width: 10px;
  height: 10px;
  background: rgba(255,255,255,.92);
  border-radius: 3px;
}
.cursor-follower{
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255,255,255,.85);
  border-radius: 6px;
  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
body.cursor-hover .cursor-follower{
  border-color: rgba(201,255,87,.95);
}

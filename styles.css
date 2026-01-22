/* styles.css */

/* =========================
   TOKENS
========================= */
:root{
  --bg: #0B0F0D;
  --bg-2:#0F1512;
  --surface: rgba(255,255,255,.06);
  --surface-2: rgba(255,255,255,.09);
  --stroke: rgba(255,255,255,.12);

  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.70);
  --muted-2: rgba(255,255,255,.56);

  --light: #F2F3F4;             /* бело-серый вместо молочного */
  --light-2:#E7EAEC;
  --darkText:#0B0F0D;

  --accent:#C9FF57;             /* светло-жёлто-зелёный, не кислотный */
  --accent-2:#B8F04C;

  --radius: 14px;
  --radius-sm: 10px;
  --radius-xs: 8px;

  --shadow: 0 18px 60px rgba(0,0,0,.45);
  --shadow-soft: 0 10px 30px rgba(0,0,0,.28);

  --container: 1120px;

  --t-fast: 140ms;
  --t-med: 220ms;
  --t-slow: 420ms;

  --ease: cubic-bezier(.16,1,.3,1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  :root{ --t-fast: 1ms; --t-med: 1ms; --t-slow: 1ms; }
}

/* =========================
   BASE
========================= */
*{ box-sizing:border-box; }
html,body{ height:100%; }

body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: var(--text);
  background: radial-gradient(1200px 900px at 70% -10%, rgba(201,255,87,.12), transparent 55%),
              radial-gradient(900px 700px at 10% 10%, rgba(255,255,255,.05), transparent 55%),
              var(--bg);
  overflow-x:hidden;
}

img{ max-width:100%; display:block; }

a{ color:inherit; text-decoration:none; }
button{ font:inherit; color:inherit; }

/* a11y */
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

.anchor{ position: relative; top:-84px; }

/* =========================
   LAYOUT
========================= */
.container{
  width: min(var(--container), calc(100% - 40px));
  margin: 0 auto;
}

.section{
  padding: clamp(64px, 7vw, 120px) 0;
}

.section--tight{
  padding: clamp(56px, 6vw, 96px) 0;
}

.section--dark{
  background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.00));
  border-top: 1px solid rgba(255,255,255,.06);
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.section--accent{
  background: transparent;
}

.section__head{
  margin-bottom: clamp(22px, 3vw, 40px);
}
.section__head--center{ text-align:center; }

.h2{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.08;
  font-size: clamp(34px, 4.6vw, 56px);
  margin: 0;
}
.h2--dark{ color: var(--darkText); }

.h3{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 600;
  margin: 0 0 18px;
  font-size: clamp(22px, 2.4vw, 28px);
  letter-spacing: -0.01em;
}

.eyebrow{
  margin: 0 0 10px;
  color: var(--muted);
  letter-spacing: .12em;
  text-transform: uppercase;
  font-size: 12px;
}

.text{ margin: 0 0 14px; max-width: 62ch; color: var(--muted); }
.text--muted{ color: var(--muted-2); }

/* =========================
   HEADER
========================= */
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

  padding: 10px 12px;
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
  width: 42px;
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
  gap: 22px;
  padding:0; margin:0;
  list-style:none;
}
.nav__link{
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .10em;
  text-transform: uppercase;
  opacity: .88;
  transition: opacity var(--t-fast) var(--ease);
}
.nav__link:hover{ opacity: 1; }
.nav__link:focus-visible{
  outline: 2px solid rgba(201,255,87,.6);
  outline-offset: 6px;
  border-radius: 10px;
}

.burger{
  width: 44px; height: 40px;
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

/* mobile nav */
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
  .nav__list{
    flex-direction: column;
    gap: 10px;
  }
  .nav__link{
    display:block;
    padding: 12px 14px;
    border-radius: 12px;
    text-align:center;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
  }
}

/* =========================
   HERO
========================= */
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
    linear-gradient(180deg, rgba(11,15,13,.35), rgba(11,15,13,.88)),
    url("homebgpc.gif") center/cover no-repeat;
  filter: saturate(0.9) contrast(1.05);
  transform: translateZ(0);
}
@media (max-width: 820px){
  .hero__bg{
    background:
      linear-gradient(180deg, rgba(11,15,13,.40), rgba(11,15,13,.92)),
      url("homebgmob.gif") center/cover no-repeat;
    background-position: 50% 20%;
  }
}

.hero__content{ position: relative; z-index: 1; }
.hero__title{
  margin: 0 0 14px;
  max-width: 18ch;
}
.hero__lead{
  margin: 0 0 26px;
  max-width: 66ch;
  color: rgba(255,255,255,.80);
  font-size: clamp(16px, 2vw, 19px);
}

.hero__actions{
  display:flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* =========================
   BUTTONS
========================= */
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
  height: 44px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  letter-spacing: .02em;
  font-size: 14px;
  border: 1px solid transparent;
  transition: transform var(--t-fast) var(--ease), background var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
  will-change: transform;
}
.btn:focus-visible{
  outline: 2px solid rgba(201,255,87,.7);
  outline-offset: 3px;
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

/* =========================
   ABOUT
========================= */
.about{
  display:grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: clamp(18px, 4vw, 56px);
  align-items: start;
}
@media (max-width: 920px){
  .about{ grid-template-columns: 1fr; }
}

.about__media{
  margin:0;
  border-radius: var(--radius);
  overflow:hidden;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.03);
  box-shadow: var(--shadow-soft);
}
.about__img{
  width:100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform var(--t-slow) var(--ease);
}
.about__media:hover .about__img{ transform: scale(1.04); }

.about__body .text{ max-width: 64ch; }

/* pixel bullets */
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
  padding-left: 18px;
  color: var(--muted);
}
.pixel-list li::before{
  content:"";
  width: 8px; height: 8px;
  border-radius: 2px;
  background: var(--accent);
  position:absolute;
  left:0;
  top: 0.6em;
  transform: translateY(-50%);
  box-shadow: 0 0 0 4px rgba(201,255,87,.08);
}

/* Timeline */
.timeline{ margin-top: clamp(40px, 5vw, 76px); }
.timeline__grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 1080px){
  .timeline__grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 620px){
  .timeline__grid{ grid-template-columns: 1fr; }
}
.tcard{
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(10px);
  padding: 18px 18px 20px;
}
.tcard__meta{
  margin:0 0 10px;
  color: rgba(201,255,87,.9);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}
.tcard__title{
  margin:0 0 8px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-size: 16px;
  letter-spacing: -0.01em;
}
.tcard__text{
  margin:0;
  color: var(--muted-2);
  font-size: 15px;
  line-height: 1.6;
}

/* =========================
   GLASS STACK (Help)
========================= */
.stack{
  position: relative;
  display:grid;
  gap: 12px;
  max-width: 980px;
}
.glass-card{
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.12);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  backdrop-filter: blur(14px);
  padding: clamp(18px, 2.2vw, 22px);
  box-shadow: 0 22px 70px rgba(0,0,0,.28);
  position: relative;
  z-index: var(--z, 1);
}
.glass-card::after{
  content:"";
  position:absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events:none;
  background: radial-gradient(700px 220px at 25% 0%, rgba(201,255,87,.10), transparent 60%);
  opacity: .8;
  mix-blend-mode: screen;
}
.card-title{
  margin: 0 0 10px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 650;
  font-size: 18px;
  letter-spacing: -0.01em;
}
.card-title--on-dark{ color: rgba(255,255,255,.94); }

/* =========================
   WHY (Accent panel)
========================= */
.accent-panel{
  background: var(--light);
  color: var(--darkText);
  border-radius: calc(var(--radius) + 6px);
  padding: clamp(18px, 3vw, 34px);
  box-shadow: 0 30px 90px rgba(0,0,0,.35);
  position: relative;
  overflow:hidden;
}
.accent-panel::before{
  content:"";
  position:absolute;
  inset:0;
  background: radial-gradient(800px 260px at 25% 0%, rgba(201,255,87,.45), transparent 55%);
  opacity: .55;
  pointer-events:none;
}
.accent-panel__head{
  display:flex;
  align-items:flex-end;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.accent-chip{
  display:inline-flex;
  align-items:center;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11,15,13,.08);
  border: 1px solid rgba(11,15,13,.12);
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  font-size: 11px;
}
.check-list{
  margin: 18px 0 0;
  padding: 0;
  list-style:none;
  display:grid;
  gap: 10px;
  position: relative;
  z-index: 1;
  max-width: 72ch;
}
.check-list li{
  padding-left: 26px;
  position: relative;
  font-size: 16px;
  line-height: 1.65;
}
.check-list li::before{
  content:"";
  position:absolute;
  left:0; top: .55em;
  width: 12px; height: 12px;
  border-radius: 3px;
  background: var(--accent-2);
  transform: translateY(-50%);
}

/* =========================
   PROCESS
========================= */
.steps{
  display:grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-width: 980px;
}
.step{
  display:grid;
  grid-template-columns: 88px 1fr;
  gap: 16px;
  align-items:start;

  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(12px);
  padding: 16px 18px;
}
@media (max-width: 560px){
  .step{ grid-template-columns: 70px 1fr; }
}
.step__num{
  display:flex;
  flex-direction: column;
  align-items:flex-start;
  gap: 2px;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
  font-size: 34px;
  color: rgba(201,255,87,.95);
  user-select:none;
}
.step__body .text{ margin: 0; max-width: 70ch; }

/* =========================
   PORTFOLIO GRID
========================= */
.gallery-grid{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.gallery-item{
  grid-column: span 6;
  display:flex;
  flex-direction: column;
  text-align:left;

  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.03);
  overflow:hidden;

  padding: 0;
  cursor: pointer;

  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
  will-change: transform;
}
.gallery-item:hover{
  transform: translateY(-2px);
  border-color: rgba(201,255,87,.22);
  background: rgba(255,255,255,.04);
}
.gallery-item:focus-visible{
  outline: 2px solid rgba(201,255,87,.65);
  outline-offset: 4px;
}

.image-container{
  width:100%;
  aspect-ratio: 4/5;
  overflow:hidden;
  background: rgba(255,255,255,.02);
}
.image-container img{
  width:100%; height:100%;
  object-fit: cover;
  transition: transform var(--t-slow) var(--ease);
  transform: scale(1.01);
}
.gallery-item:hover .image-container img{ transform: scale(1.06); }

.item-info{
  padding: 16px 16px 18px;
  display:grid;
  gap: 8px;
}
.item-title{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 650;
  letter-spacing: .02em;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(255,255,255,.92);
}
.item-description{
  color: var(--muted-2);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 980px){
  .gallery-item{ grid-column: span 12; }
}

/* =========================
   MODAL (fullscreen)
========================= */
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
  background: rgba(0,0,0,.86);
}

.modal__dialog{
  position: relative;
  height: 100%;
  display:flex;
  flex-direction: column;
}

.modal__top{
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
}

.icon-btn{
  width: 44px; height: 44px;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(10px);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.icon-btn:hover{ transform: translateY(-1px); border-color: rgba(201,255,87,.28); }
.icon-btn:focus-visible{
  outline: 2px solid rgba(201,255,87,.65);
  outline-offset: 3px;
}

.modal__media{
  height: min(62vh, 720px);
  min-height: 320px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 20px;
  gap: 14px;
  position: relative;
  z-index: 2;
}

.slider{
  width: min(1200px, calc(100% - 120px));
  height: 100%;
  overflow:hidden;
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.03);
}
@media (max-width: 720px){
  .slider{ width: 100%; }
  .modal__media{ padding: 18px; }
}

.slider__track{
  display:flex;
  height: 100%;
  transform: translateX(0%);
  transition: transform var(--t-slow) var(--ease);
  will-change: transform;
}
.slide{
  min-width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(0,0,0,.12);
}
.slide img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.nav-btn{
  width: 44px; height: 44px;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(10px);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.nav-btn:hover{ transform: translateY(-1px); border-color: rgba(201,255,87,.28); }
.nav-btn:focus-visible{
  outline: 2px solid rgba(201,255,87,.65);
  outline-offset: 3px;
}
@media (max-width: 720px){
  .nav-btn{ display:none; } /* свайпы на телефоне */
}

.modal__content{
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 16px 0 28px;
  display:grid;
  gap: 12px;
  position: relative;
  z-index: 2;
}
.modal__head{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}
.modal__title{
  margin:0;
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 700;
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
  font-weight: 700;
  letter-spacing: .02em;
  color: rgba(255,255,255,.86);
}
.modal__desc{
  margin:0;
  color: rgba(255,255,255,.76);
  max-width: 90ch;
}

/* body lock when modal open */
body.modal-open{ overflow:hidden; }

/* =========================
   FINAL CTA
========================= */
.cta{ margin-top: 10px; }
.cta-card{
  background: var(--light);
  color: var(--darkText);
  border-radius: calc(var(--radius) + 8px);
  padding: clamp(16px, 3vw, 26px);
  display:grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 18px;
  align-items: center;
  box-shadow: 0 30px 90px rgba(0,0,0,.35);
}
@media (max-width: 860px){
  .cta-card{ grid-template-columns: 1fr; }
}
.cta-text{
  margin: 0 0 16px;
  color: rgba(11,15,13,.78);
  max-width: 70ch;
}
.cta-actions{
  display:flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cta-card .btn--primary{
  background: rgba(11,15,13,.92);
  border-color: rgba(11,15,13,.92);
  color: var(--light);
}
.cta-card .btn--primary:hover{
  background: rgba(11,15,13,.86);
  transform: translateY(-1px);
}
.cta-card .btn--secondary{
  border-color: rgba(11,15,13,.18);
  color: rgba(11,15,13,.90);
}
.cta-card .btn--secondary:hover{
  border-color: rgba(11,15,13,.32);
}

.cta-card__right{
  display:grid;
  justify-items: end;
  gap: 10px;
}
@media (max-width: 860px){
  .cta-card__right{ justify-items: start; }
}
.cta-photo{
  width: min(220px, 45vw);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(11,15,13,.12);
}
.cta-mini{
  display:grid;
  gap: 2px;
}
.cta-mini__name{
  font-family: Sora, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 700;
}
.cta-mini__role{
  font-size: 12px;
  color: rgba(11,15,13,.66);
  letter-spacing: .08em;
  text-transform: uppercase;
}

/* =========================
   FOOTER (accent)
========================= */
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
.footer__contacts{
  display:grid;
  gap: 10px;
}
.footer__link{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: .01em;
}
.footer__link i{ width: 18px; }
.footer__link:hover{ text-decoration: underline; }

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
  transition: transform var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}
.social:hover{
  transform: translateY(-1px);
  background: rgba(11,15,13,.10);
}
.footer__brand{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width: 140px;
  height: 52px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(11,15,13,.18);
  background: rgba(11,15,13,.06);
}
.footer__logo{
  height: 22px;
  width:auto;
  object-fit: contain;
}

/* =========================
   REVEALS (IntersectionObserver)
========================= */
.reveal{
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity var(--t-slow) var(--ease),
    transform var(--t-slow) var(--ease);
  transition-delay: var(--d, 0ms);
}
.in-view{
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce){
  .reveal{ opacity: 1; transform: none; transition: none; }
}

/* =========================
   CURSOR (square rounded)
========================= */
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
  border-radius: 4px;
}

.cursor-follower{
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255,255,255,.85);
  border-radius: 7px;
  transition: transform var(--t-fast) var(--ease), width var(--t-fast) var(--ease), height var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}

body.cursor-hover .cursor{
  width: 12px; height: 12px;
}
body.cursor-hover .cursor-follower{
  transform: translate(-50%, -50%) scale(0.92);
  border-color: rgba(201,255,87,.9);
}

@media (hover: none), (pointer: coarse){
  .cursor, .cursor-follower{ display:none; }
  body{ cursor:auto; }
}

/* =========================
   UTIL
========================= */
[data-glass]{}

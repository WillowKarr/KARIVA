/* ==========================================================================
   ДЕКОРАТИВНЫЕ «СЛУЧАЙНОСТИ»
   --------------------------------------------------------------------------
   Маленькие рисованные знаки на полях. Они не случайные — каждый задан здесь,
   поэтому композиция всегда одинаковая и аккуратная.

   Ключ (about, career, …) — в каком блоке лежит знак.
   type   — star, sparkle, asterisk, arrow, cross, underline, loop, tick,
            element:<файл из src/assets/elements>, piece:<файл из src/assets/collage>,
            page:<текст маленькой подписи-номера страницы>
   x, y   — позиция в % от блока;  size — ширина в px
   rot    — поворот;  opacity — прозрачность 0…1
   delay  — задержка появления в мс
   anim   — draw (дорисовывается), twinkle (мерцает), lift (бумажка приподнимается),
            sway (колышется), none
   color  — 'ink', 'orange', 'emerald', 'white' (по умолчанию ink)
   mobile — false, чтобы спрятать на телефоне
   ========================================================================== */

export const decor = {
  about: [
    { type: 'arrow', x: 44, y: 18, size: 90, rot: 12, anim: 'draw', delay: 200, mobile: false },
    { type: 'sparkle', x: 94, y: 8, size: 22, anim: 'twinkle', delay: 400 },
    { type: 'page:02', x: 96, y: 2, size: 40, mobile: false },
    { type: 'element:paperclip', x: 20, y: 3, size: 70, rot: -80, anim: 'lift', delay: 300 },
  ],
  career: [
    { type: 'star', x: 94, y: 0, size: 34, anim: 'twinkle', delay: 0 },
    { type: 'cross', x: 95, y: 88, size: 18, opacity: 0.7, anim: 'draw', delay: 600, mobile: false },
  ],
  programs: [
    { type: 'asterisk', x: 93, y: 4, size: 30, anim: 'twinkle', delay: 200 },
    { type: 'tick', x: 1, y: 90, size: 26, anim: 'draw', delay: 400, mobile: false },
    { type: 'page:03', x: 3, y: 2, size: 40, mobile: false },
  ],
  albums: [
    { type: 'element:safety-pin', x: 46, y: 1, size: 80, rot: 12, anim: 'lift', delay: 100, mobile: false },
    { type: 'sparkle', x: 3, y: 48, size: 20, anim: 'twinkle', delay: 300 },
  ],
  contact: [
    { type: 'loop', x: 58, y: 30, size: 200, rot: -6, anim: 'draw', delay: 200, color: 'orange', mobile: false },
    { type: 'star', x: 90, y: 12, size: 40, anim: 'twinkle', delay: 500 },
    { type: 'piece:piece-19', x: 70, y: 70, size: 260, rot: -3, opacity: 0.9, anim: 'lift', delay: 0, mobile: false },
  ],
  footer: [
    { type: 'sparkle', x: 60, y: 22, size: 18, anim: 'twinkle', delay: 400, color: 'white' },
    { type: 'underline', x: 4, y: 58, size: 180, anim: 'draw', delay: 200, color: 'white', mobile: false },
  ],
  pageHead: [
    { type: 'star', x: 86, y: 18, size: 44, anim: 'twinkle', delay: 300 },
    { type: 'arrow', x: 62, y: 70, size: 110, rot: 8, anim: 'draw', delay: 500, mobile: false },
    { type: 'element:paperclip', x: 4, y: 8, size: 64, rot: 10, anim: 'lift', delay: 200, mobile: false },
  ],
  grid: [
    { type: 'cross', x: -1.5, y: 6, size: 16, opacity: 0.6, mobile: false },
    { type: 'sparkle', x: 99, y: 40, size: 18, anim: 'twinkle', delay: 200, mobile: false },
    { type: 'asterisk', x: -2, y: 70, size: 22, anim: 'twinkle', delay: 600, mobile: false },
  ],
};

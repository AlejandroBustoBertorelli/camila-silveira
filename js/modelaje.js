const strip = document.querySelector('.strip');
const prev = document.querySelector('.carousel .prev');
const next = document.querySelector('.carousel .next');
const step = () => strip.querySelector('.ph').getBoundingClientRect().width + 12;
const go = d => strip.scrollBy({ left: d * step() * (window.innerWidth > 760 ? 2 : 1), behavior: 'smooth' });

function updateArrows() {
  const max = strip.scrollWidth - strip.clientWidth;
  prev.hidden = strip.scrollLeft <= 4;
  next.hidden = strip.scrollLeft >= max - 4;
}
prev.addEventListener('click', () => go(-1));
next.addEventListener('click', () => go(1));
let t;
strip.addEventListener('scroll', () => { updateArrows(); clearTimeout(t); t = setTimeout(updateArrows, 150); }, { passive: true });
strip.addEventListener('scrollend', updateArrows);
window.addEventListener('resize', updateArrows);
window.addEventListener('load', updateArrows);
updateArrows();
strip.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(1);
  if (e.key === 'ArrowLeft') go(-1);
});

/* ampliar fotos */
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
const photos = [...document.querySelectorAll('img.zoom')];
let current = 0, opener = null;

function show(i) {
  current = (i + photos.length) % photos.length;
  lbImg.src = photos[current].src;
  lbImg.alt = photos[current].alt;
}
function open(i) {
  opener = document.activeElement;
  show(i);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lb.querySelector('.lb-close').focus();
}
function close() {
  lb.hidden = true;
  document.body.style.overflow = '';
  if (opener) opener.focus();
}
photos.forEach((p, i) => {
  p.tabIndex = 0;
  p.addEventListener('click', () => open(i));
  p.addEventListener('keydown', e => { if (e.key === 'Enter') open(i); });
});
lb.querySelector('.lb-close').addEventListener('click', close);
lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft') show(current - 1);
});

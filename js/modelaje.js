const strip = document.querySelector('.strip');
const step = () => strip.querySelector('.ph').getBoundingClientRect().width + 12;
const go = d => strip.scrollBy({ left: d * step() * (window.innerWidth > 760 ? 2 : 1), behavior: 'smooth' });
document.querySelector('.prev').addEventListener('click', () => go(-1));
document.querySelector('.next').addEventListener('click', () => go(1));
strip.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(1);
  if (e.key === 'ArrowLeft') go(-1);
});

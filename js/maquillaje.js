const btns = document.querySelectorAll('.swatches button');
btns.forEach(b => b.addEventListener('click', () => {
  document.documentElement.style.setProperty('--accent', b.style.getPropertyValue('--c'));
  btns.forEach(x => x.setAttribute('aria-pressed', x === b));
}));

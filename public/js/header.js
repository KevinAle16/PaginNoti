// Menú lateral
const menuBtn = document.getElementById('menuBtn');
const menuTextBtn = document.getElementById('menuTextBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenu = document.getElementById('closeMenu');

function openMenu() {
  sideMenu.classList.add('active');
  menuOverlay.classList.add('active');
  document.body.classList.add('body-menu-open');
}
function closeSideMenu() {
  sideMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.classList.remove('body-menu-open');
}
menuBtn.addEventListener('click', openMenu);
menuTextBtn.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeSideMenu);
menuOverlay.addEventListener('click', closeSideMenu);

// News ticker
window.addEventListener('DOMContentLoaded', () => {
  const ticker = document.getElementById('newsTicker');
  if (!ticker) return;
  // Wrap all children in a ticker-content div
  const content = document.createElement('div');
  content.className = 'ticker-content';
  while (ticker.firstChild) {
    content.appendChild(ticker.firstChild);
  }
  ticker.appendChild(content);
});
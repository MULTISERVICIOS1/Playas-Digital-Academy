/* app.js - menú, registro simple, validaciones y pequeño feedback UI */

// menú responsive
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');
if(btnMenu){
  btnMenu.addEventListener('click', () => {
    const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
    btnMenu.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
  });
}

// registro (simulación con localStorage)
const formRegistro = document.getElementById('form-registro');
if(formRegistro){
  formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value;
    const status = document.getElementById('registro-status');

    // validaciones simples
    if(!nombre || !email || pass.length < 6){
      status.textContent = 'Complete los campos correctamente (contraseña >= 6).';
      return;
    }

    const user = { nombre, email, created: new Date().toISOString() };
    localStorage.setItem('pda_user', JSON.stringify(user));
    status.textContent = 'Cuenta creada correctamente ✔';
    setTimeout(()=> status.textContent = '', 4000);
    formRegistro.reset();
  });
}

// contacto (simulación)
const formContacto = document.getElementById('form-contacto');
if(formContacto){
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('contacto-status');
    status.textContent = 'Enviando mensaje...';
    setTimeout(()=> {
      status.textContent = 'Mensaje enviado ✔';
      formContacto.reset();
      setTimeout(()=> status.textContent = '', 3500);
    }, 900);
  });
}

// registrar service worker con ruta dinámica (funciona en GitHub Pages y local)
if('serviceWorker' in navigator){
  // detect base path (si está en subruta como /Playas-Digital-Academy/)
  const base = document.querySelector('link[rel="manifest"]')?.getAttribute('href') || 'manifest.json';
  // obtener path de base (/ o /Playas-Digital-Academy/)
  const pathParts = location.pathname.split('/').filter(Boolean);
  let basePath = '/';
  if(pathParts.length > 0){
    // si la app está en subruta (ej: /Playas-Digital-Academy/...), usar ese scope
    const repo = pathParts[0];
    basePath = `/${repo}/`;
  }
  const swPath = `${basePath}service-worker.js`;

  navigator.serviceWorker.register(swPath)
    .then(()=> console.log('Service Worker registrado en', swPath))
    .catch(err => console.warn('Error registrando SW', err));
}
// FILTROS DE CURSOS
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.curso-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    
    cards.forEach(card => {
      const category = card.dataset.category;
      card.style.display =
        filter === "all" || filter === category ? "block" : "none";
    });
  });
});

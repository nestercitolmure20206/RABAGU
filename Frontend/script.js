// Catálogo de productos artesanales
const productos = [
  {
    id: 1,
    nombre: "Carteras",
    artesana: "Por María Gutiérrez",
    precio: "C$ 100",
    imagen: "img/carteras.jpg"
  },
  {
    id: 2,
    nombre: "Alfarería de barro",
    artesana: "Por Juana López",
    precio: "C$ 500",
    imagen: "img/jarrones-de-barro.jpg"
  },
  {
    id: 3,
    nombre: "Muñecas de tusa",
    artesana: "Por Ana Martínez",
    precio: "C$ 180",
    imagen: "img/mugnecas-de-tusa.jpg"
  },
  {
    id: 4,
    nombre: "Hamacas",
    artesana: "Por Colectivo Sutiaba",
    precio: "C$ 600",
    imagen: "img/hamacas.jpg"
  },
  {
    id: 5,
    nombre: "Jarrones de madera",
    artesana: "Por Carmen Ruíz",
    precio: "C$ 400",
    imagen: "img/jarrones-de-madera.jpg"
  },
  {
    id: 6,
    nombre: "Tarros encurtidos",
    artesana: "Por Lucía Mendoza",
    precio: "C$ 90",
    imagen: "img/tarros-encurtidos.jpg"
  }
];

// Cargar productos en la pantalla
function cargarProductos() {
  const container = document.getElementById('product-grid');
  container.innerHTML = '';

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="product-img">
      <h4 class="product-title">${prod.nombre}</h4>
      <p class="artisan-name">${prod.artesana}</p>
      <div class="product-footer">
        <span class="price">${prod.precio}</span>
        <button class="like-btn" onclick="toggleLike(this)">🤍</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Alternar Me Gusta
function toggleLike(btn) {
  if (btn.textContent === '🤍') {
    btn.textContent = '❤️';
  } else {
    btn.textContent = '🤍';
  }
}

// Inicializar cuando cargue el documento
document.addEventListener('DOMContentLoaded', cargarProductos);
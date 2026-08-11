// Catálogo de productos artesanales
const productos = [
  {
    id: 1,
    nombre: "Huipil Bordado a Mano",
    artesana: "Por María Gutiérrez",
    precio: "C$ 1,200",
    imagen: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    nombre: "Vasija de Barro Tradicional",
    artesana: "Por Juana López",
    precio: "C$ 450",
    imagen: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    nombre: "Jardín en Maceta de Cerámica",
    artesana: "Por Ana Martínez",
    precio: "C$ 300",
    imagen: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    nombre: "Aceite Corporal Orgánico",
    artesana: "Por Colectivo Sutiaba",
    precio: "C$ 250",
    imagen: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    nombre: "Hamaca Tejida Artesanal",
    artesana: "Por Carmen Ruíz",
    precio: "C$ 1,800",
    imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    nombre: "Cesta de Palma Tejida",
    artesana: "Por Lucía Mendoza",
    precio: "C$ 350",
    imagen: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=500&q=80"
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
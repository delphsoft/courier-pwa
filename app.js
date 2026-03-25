let map, marker;
let pedidos = [
  { id: "001", direccion: "Av. Colón 1234, Nueva Córdoba", cliente: "María López", estado: "pendiente", lat: -31.415, lng: -64.185 },
  { id: "002", direccion: "Obispo Trejo 567, Centro", cliente: "Carlos Gómez", estado: "en-camino", lat: -31.425, lng: -64.190 }
];

// Inicializar mapa
function initMap() {
  map = L.map('map').setView([-31.4201, -64.1888], 14);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  marker = L.marker([-31.4201, -64.1888], { draggable: true }).addTo(map)
    .bindPopup('<b>Tu posición actual</b>').openPopup();
}

// Renderizar lista de pedidos
function renderPedidos() {
  const container = document.getElementById('lista-pedidos');
  container.innerHTML = '';
  
  pedidos.forEach((pedido, index) => {
    const card = document.createElement('div');
    card.className = `pedido-card ${pedido.estado}`;
    card.innerHTML = `
      <strong>#${pedido.id}</strong> - ${pedido.direccion}<br>
      <small>Cliente: ${pedido.cliente}</small><br>
      <span class="estado">${pedido.estado.toUpperCase()}</span>
      <button onclick="marcarEntregado(${index})" style="margin-top:8px; width:100%; padding:8px;">Marcar Entregado + Foto</button>
    `;
    container.appendChild(card);
  });
  
  document.getElementById('pedidos-count').textContent = `(${pedidos.length})`;
}

// Marcar como entregado + foto
window.marcarEntregado = function(index) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  
  input.onchange = () => {
    pedidos[index].estado = 'entregado';
    renderPedidos();
    alert(`✅ Pedido #${pedidos[index].id} marcado como ENTREGADO\nFoto guardada correctamente`);
  };
  input.click();
};

// Simular movimiento (tracking)
document.getElementById('btn-simular').addEventListener('click', () => {
  let count = 0;
  const interval = setInterval(() => {
    if (count > 8) { clearInterval(interval); return; }
    const newLat = -31.4201 + (Math.random() * 0.01 - 0.005);
    const newLng = -64.1888 + (Math.random() * 0.01 - 0.005);
    marker.setLatLng([newLat, newLng]);
    map.setView([newLat, newLng], 15);
    count++;
  }, 800);
});

document.getElementById('btn-ubicacion').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      marker.setLatLng([lat, lng]);
      map.setView([lat, lng], 16);
      alert('Ubicación actualizada en tiempo real');
    });
  }
});

// Iniciar todo
window.onload = () => {
  initMap();
  renderPedidos();
};

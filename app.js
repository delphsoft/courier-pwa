let map, marker;

// Inicializar mapa con Leaflet (no requiere API Key)
function initMap() {
  map = L.map('map').setView([-31.4201, -64.1888], 14);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  marker = L.marker([-31.4201, -64.1888]).addTo(map)
    .bindPopup('Tu ubicación actual').openPopup();
}

// Actualizar ubicación
document.getElementById('btn-ubicacion').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      
      map.setView([lat, lng], 16);
      marker.setLatLng([lat, lng]);
      marker.bindPopup('¡Estás aquí!').openPopup();
      
      alert(`Ubicación actualizada correctamente\nLat: ${lat.toFixed(5)}\nLng: ${lng.toFixed(5)}`);
    }, () => {
      alert("No se pudo obtener tu ubicación. Activa el GPS.");
    });
  }
});

// Foto de entrega
document.getElementById('btn-foto').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  
  input.onchange = () => {
    alert("✅ Foto guardada correctamente\nPedido marcado como ENTREGADO");
    // Aquí luego puedes subir la foto a un servidor
  };
  input.click();
});

// Cargar pedidos de ejemplo
const pedidos = [
  {id: "001", dir: "Av. Colón 1234, Nueva Córdoba", cliente: "María López"},
  {id: "002", dir: "Obispo Trejo 567, Centro", cliente: "Carlos Gómez"}
];

const ul = document.getElementById('lista-pedidos');
pedidos.forEach(p => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>#${p.id}</strong><br>${p.dir}<br><small>Cliente: ${p.cliente}</small>`;
  ul.appendChild(li);
});

window.onload = initMap;

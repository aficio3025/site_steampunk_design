

let cart = JSON.parse(localStorage.getItem('productos') || "[]");
//let total = (localStorage.getItem('total') || "[]");


//let cart = [];
let precio = 0;
//let total = [];

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
   const button = card.querySelector('button');
   const productTitle = card.querySelector('h5').textContent;
   // Find the price element: first check for proper '.sp-price' class, fallback to any text containing a dollar sign
   let productPriceString = "0";
   const priceElement = card.querySelector('.sp-price');

   if (priceElement) {
      // Limpiamos el texto para quedarnos solo con el número (maneja $, U$S, etc.)
      productPriceString = priceElement.textContent.replace(/[^0-9.]/g, '').trim();
   } else {
      // Fallback for old layouts
      const textElements = card.querySelectorAll('p');
      textElements.forEach(p => {
         if (p.textContent.includes('$')) {
            productPriceString = p.textContent.replace(/[^0-9.]/g, '').trim();
         }
      });
   }

   const productPrice = parseFloat(productPriceString) || 0;


   button.addEventListener('click', () => {
      const product = {
         title: productTitle,
         price: productPrice,
         cantidad: 1
      };

      cart.push(product);

      // Calcular el total directamente desde los artículos del carrito en lugar de mantener una variable separada
      let newTotal = 0;
      cart.forEach(item => {
         newTotal += item.price * item.cantidad;
      });

      localStorage.setItem('productos', JSON.stringify(cart));
      localStorage.setItem('total', newTotal);

      // Actualizar el span de conteo correctamente en todos los elementos activos
      const countElements = document.getElementsByClassName('count');
      for (let i = 0; i < countElements.length; i++) {
         countElements[i].innerText = cart.length;
      }

      const cartCountElements = document.getElementsByClassName('cart-count');
      for (let i = 0; i < cartCountElements.length; i++) {
         cartCountElements[i].innerText = cart.length;
      }


   });
});


function handleCart() {
   const cart = JSON.parse(localStorage.getItem('productos')) || [];
   let total = localStorage.getItem('total') || 0;

   const carritoContainer = document.getElementById('itemProducts');
   if (!carritoContainer) return;
   
   // Limpiar el contenedor antes de renderizar para evitar duplicados
   carritoContainer.innerHTML = '';

   if (cart.length === 0) {
      carritoContainer.innerHTML = '<p class="empty-cart-msg">No hay artefactos en su inventario.</p>';
      return;
   }

   const tabla = document.createElement('table');
   tabla.className = 'sp-cart-table';

   let encabezado = `
     <thead>
       <tr>
         <th>Artefacto</th>
         <th>Cantidad</th>
         <th>Valor (U$S)</th>
       </tr>
     </thead>
   `;

   let cuerpo = '<tbody>';
   cart.forEach(producto => {
      cuerpo += `
       <tr>
         <td><strong>${producto.title}</strong></td>
         <td>${producto.cantidad}</td>
         <td>U$S ${producto.price}</td>
       </tr>
     `;
   });

   cuerpo += '</tbody>';

   tabla.innerHTML = encabezado + cuerpo;

   carritoContainer.appendChild(tabla);

   let precioFinal = document.createElement('div');
   precioFinal.className = 'sp-cart-total';
   precioFinal.innerText = `Inversión Total: U$S ${total}`;

   carritoContainer.appendChild(precioFinal);
}

function limpiarCarrito() {
   if (confirm("¿Está seguro de que desea vaciar su inventario?")) {
      cart = [];

      const carritoContainer = document.getElementById('itemProducts');
      if (carritoContainer) carritoContainer.innerHTML = '<p class="empty-cart-msg">Cargando inventario...</p>';

      localStorage.removeItem('productos');
      localStorage.removeItem('total');

      updateCartCount();
      if (document.getElementById('itemProducts')) {
         handleCart();
      }
   }
}


// Función para actualizar el conteo del carrito en la barra de navegación
function updateCartCount() {
   const cartItems = JSON.parse(localStorage.getItem('productos')) || [];
   const countElements = document.getElementsByClassName('count');
   for (let i = 0; i < countElements.length; i++) {
      countElements[i].innerText = cartItems.length;
   }
   // También actualizar el conteo en la nueva interfaz de usuario steampunk (si está presente)
   const cartCountElements = document.getElementsByClassName('cart-count');
   for (let i = 0; i < cartCountElements.length; i++) {
      cartCountElements[i].innerText = cartItems.length;
   }
}

// Generador de humo ambiental de fondo
function addSmokeEffect() {
   // Asegurarse de que no exista ya
   if (document.querySelector('.sp-smoke-overlay')) return;

   const overlay = document.createElement('div');
   overlay.className = 'sp-smoke-overlay';

   let particlesHtml = '';
   for (let i = 0; i < 6; i++) {
      particlesHtml += '<div class="sp-smoke-particle"></div>';
   }

   overlay.innerHTML = particlesHtml;

   // Prepend al cuerpo para que se mantenga detrás de todo
   if (document.body.firstChild) {
      document.body.insertBefore(overlay, document.body.firstChild);
   } else {
      document.body.appendChild(overlay);
   }
}

// Integración con WhatsApp
function enviarWhatsApp() {
   const cartItems = JSON.parse(localStorage.getItem('productos')) || [];
   const total = localStorage.getItem('total') || 0;

   if (cartItems.length === 0) {
      alert("Agregue artefactos a su inventario primero para proceder.");
      return;
   }

   let mensaje = "Hola, me comunicaba para confirmar la adquisición de los siguientes artefactos de Steampunk Design:\n\n";

   cartItems.forEach(item => {
      mensaje += `Artefacto: ${item.title}\n   Cantidad: ${item.cantidad}\n   Valor unitario: U$S ${item.price}\n\n`;
   });

   mensaje += `*Inversión Total: U$S ${total}*\n\n¡Muchas gracias!`;

   const url = "https://wa.me/5491165150614?text=" + encodeURIComponent(mensaje);
   window.open(url, "_blank");
}

// Lógica de la Palanca Steampunk
function initPowerLever() {
   const lever = document.getElementById('mainPowerLever');
   if (!lever) return;

   // Cargar estado inicial
   const isPowerOff = localStorage.getItem('power-off') === 'true';
   if (isPowerOff) {
      document.body.classList.add('power-off');
   }

   lever.addEventListener('click', () => {
      const newState = document.body.classList.toggle('power-off');
      localStorage.setItem('power-off', newState);

      // Crear efecto de ráfaga de vapor cerca de la palanca
      createSteamBurst(lever);

      // Crear efecto de rayo/eléctrico
      createLightningEffect(lever);

      // Log a la consola para depuración (opcional)
      console.log("Master Power: " + (newState ? "OFF" : "ON"));
   });
}

function createLightningEffect(element) {
   const rect = element.getBoundingClientRect();
   const centerX = rect.left + rect.width / 2;
   const centerY = rect.top + rect.height / 2;

   // 1. Destello de pantalla con clase pro
   const flash = document.createElement('div');
   flash.className = 'lightning-flash flash-anim';
   document.body.appendChild(flash);
   setTimeout(() => flash.remove(), 450);

   // 2. Chispas y partículas (¡Al usuario le gustaron estas!)
   for (let i = 0; i < 40; i++) {
      createSpark(centerX, centerY);
   }
}

function createSpark(x, y) {
   const spark = document.createElement('div');
   spark.className = 'spark';

   const angle = Math.random() * Math.PI * 2;
   const velocity = 5 + Math.random() * 15;
   const vx = Math.cos(angle) * velocity;
   const vy = Math.sin(angle) * velocity;

   spark.style.left = x + 'px';
   spark.style.top = y + 'px';

   document.body.appendChild(spark);

   let posX = x;
   let posY = y;
   let opacity = 1;

   const animate = () => {
      posX += vx;
      posY += vy;
      opacity -= 0.05;

      spark.style.left = posX + 'px';
      spark.style.top = posY + 'px';
      spark.style.opacity = opacity;

      if (opacity > 0) {
         requestAnimationFrame(animate);
      } else {
         spark.remove();
      }
   };

   requestAnimationFrame(animate);
}

function createSteamBurst(element) {
   const rect = element.getBoundingClientRect();
   const burst = document.createElement('div');
   burst.className = 'steam-burst';

   // Posicionar cerca de la palanca
   burst.style.left = (rect.left - 20) + 'px';
   burst.style.top = (rect.top - 20) + 'px';

   document.body.appendChild(burst);

   // Eliminar después de que termine la animación
   setTimeout(() => {
      burst.remove();
   }, 1000);
}

// Llamar al cargar
window.onload = () => {
    addSmokeEffect();
    updateCartCount();
    initPowerLever(); 
    if (document.getElementById('itemProducts')) {
        handleCart();
    }
};


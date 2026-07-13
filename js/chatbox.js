// chatbox.js - Lógica del Chatbox Steampunk (Prototipo Frontend)

// 1. Inyectar el HTML del Chatbox
const chatboxHTML = `
        <div class="sp-chat-container">
            <button class="sp-chat-btn" id="spChatBtn" aria-label="Abrir Asistente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,2C6.48,2 2,6.48 2,12C2,13.78 2.47,15.45 3.28,16.91L2,22L7.26,20.78C8.7,21.56 10.3,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C10.5,20 9.08,19.66 7.82,19.06L7.4,18.81L3.6,19.82L4.65,16.14L4.38,15.7C3.5,14.6 3,13.34 3,12C3,7.03 7.03,3 12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,20 12,20M16,11V13H8V11H16M14,7V9H10V7H14M14,15V17H10V15H14Z" />
                </svg>
            </button>
            <div class="sp-chat-window" id="spChatWindow">
                <div class="sp-chat-header">
                    <h3 class="sp-chat-header-title">
                        <span>⚙</span> Asistente de Ventas
                    </h3>
                    <button class="sp-chat-close" id="spChatClose">&times;</button>
                </div>
                <div class="sp-chat-messages" id="spChatMessages">
                    <div class="sp-chat-msg bot">
                        ¡Hola! 😊 Soy tu asistente de Steampunk Design. ¿En qué puedo ayudarte hoy?
                        <div class="sp-chat-options">
                            <button class="sp-chat-option-btn" onclick="spSendQuickReply('💡 Iluminación')">💡 Iluminación</button>
                            <button class="sp-chat-option-btn" onclick="spSendQuickReply('⏱️ Relojes')">⏱️ Relojes</button>
                            <button class="sp-chat-option-btn" onclick="spSendQuickReply('⚙️ Decoración')">⚙️ Decoración</button>
                            <button class="sp-chat-option-btn" onclick="spSendQuickReply('🎩 Accesorios')">🎩 Accesorios</button>
                        </div>
                    </div>
                </div>
                <div class="sp-chat-input-area">
                    <input type="text" class="sp-chat-input" id="spChatInput" placeholder="Escribe tu mensaje aquí..." autocomplete="off">
                    <button class="sp-chat-send" id="spChatSend">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

document.body.insertAdjacentHTML('beforeend', chatboxHTML);

// 2. Elementos del DOM
const chatBtn = document.getElementById('spChatBtn');
const chatWindow = document.getElementById('spChatWindow');
const chatClose = document.getElementById('spChatClose');
const chatInput = document.getElementById('spChatInput');
const chatSend = document.getElementById('spChatSend');
const chatMessages = document.getElementById('spChatMessages');

// 3. Event Listeners
chatBtn.addEventListener('click', () => {
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
    } else {
        chatWindow.classList.add('active');
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Añadir mensaje del usuario
    addMessage(text, 'user');
    chatInput.value = '';

    // Simular respuesta de la IA (retraso para parecer natural)
    setTimeout(() => {
        const response = simulateAIResponse(text);
        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `sp-chat-msg ${sender}`;
    msgDiv.innerHTML = text; // Permite inyectar links HTML en la respuesta
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll al final
}

// 4. Funciones de Utilidad para Opciones Rápidas
window.spSendQuickReply = function (text) {
    chatInput.value = text;
    handleSend();
};

function createOptionsHTML(options) {
    let html = '<div class="sp-chat-options">';
    options.forEach(opt => {
        html += `<button class="sp-chat-option-btn" onclick="spSendQuickReply('${opt}')">${opt}</button>`;
    });
    html += '</div>';
    return html;
}

function getProductCardHTML(id, product) {
    // Ajustar ruta de imagen si es necesario (asumimos que estamos en la carpeta /page/)
    const imgPath = product.imagenPrincipal;
    return `
        <div class="sp-chat-product-card" style="margin-top: 10px; border: 1px solid #b87333; border-radius: 8px; padding: 10px; background: rgba(0,0,0,0.5); border-left: 4px solid #b87333;">
            <img src="${imgPath}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px; border: 1px solid #3d2616;">
            <div style="font-weight: 700; color: #fbdc8d; font-size: 0.95em; line-height: 1.2; margin-bottom: 4px;">${product.titulo}</div>
            <div style="color: #e0d0c1; font-size: 0.8em; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.descripcionCorta}</div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #fbdc8d; font-weight: 700; font-size: 1em;">U$S ${product.precio}</span>
                <a href="./detalles.html?id=${id}" class="sp-chat-view-btn" style="background: #b87333; color: white; padding: 4px 10px; border-radius: 4px; text-decoration: none; font-size: 0.8em; font-weight: 600; transition: background 0.2s;">Ver detalle</a>
            </div>
        </div>
    `;
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// 5. Lógica de Simulación de IA (El "Cerebro" Frontend)
function simulateAIResponse(userInput) {
    const input = normalizeText(userInput);
    const whatsappLink = '<a href="https://wa.me/5491165150614?text=Hola%20quiero%20info" target="_blank" style="display: inline-flex; align-items: center; background: #25D366; color: white; padding: 4px 10px; border-radius: 20px; text-decoration: none; font-weight: 600; font-size: 0.9em; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.4); border: 1px solid #1da851;">Contactar Asesor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg></a>';

    // Acceder a la base de datos de productos (asume que productos_data.js se carga antes)
    const db = window.productosDB || {};

    // Priorización de reglas: Las más específicas primero

    // 1. Escalamiento a soporte / Dudas directas
    if (input.includes('humano') || input.includes('asesor') || input.includes('persona') || input.includes('contacto') || input.includes('whatsapp') || input.includes('problema')) {
        return `Te entiendo. Para una atención más personalizada y resolver todas tus dudas, te recomiendo ${whatsappLink}. ¡Están listos para ayudarte!`;
    }

    // 2. Ubicación y Local Físico / Showroom
    if (input.includes('donde estan') || input.includes('ubicacion') || input.includes('local') || input.includes('showroom') || input.includes('direccion') || input.includes('retiro') || input.includes('sucursal')) {
        return `Actualmente somos una tienda online, no contamos con un showroom físico abierto al público, pero hacemos envíos seguros a todo el país. Si necesitás ver fotos o videos en detalle de alguna pieza, podés ${whatsappLink}.`;
    }

    // 3. Envíos, pagos, cambios, garantía
    if (input.includes('envio') || input.includes('enviar') || input.includes('pago') || input.includes('tarjeta') || input.includes('cambio') || input.includes('garantia')) {
        return `¡Claro! Hacemos envíos y aceptamos diversos medios de pago. Todos nuestros artefactos tienen garantía de forja. Para detalles específicos sobre costos o métodos, te sugiero ${whatsappLink}.`;
    }

    // 4. Materiales y Autenticidad (El Valor de la Marca)
    if (input.includes('material') || input.includes('de que esta hecho') || input.includes('plastico') || input.includes('bronce') || input.includes('cobre') || input.includes('real') || input.includes('original') || input.includes('antiguo')) {
        return `Nuestras piezas están forjadas a mano utilizando materiales nobles: bronce, cobre, vidrio y maderas duras. Además, muchas incorporan piezas mecánicas reales y antigüedades (como magnetos de 1920 o máquinas de escribir). No usamos imitaciones plásticas. ¿Te interesa alguna pieza en particular?`;
    }

    // 5. Stock, Fabricación a Pedido y Tiempos
    if (input.includes('stock') || input.includes('a pedido') || input.includes('personalizado') || input.includes('custom') || input.includes('cuanto tarda') || input.includes('demora')) {
        return `Al ser piezas de diseño y ensambladas de manera artesanal, algunas están listas para enviar y otras pueden tener un pequeño tiempo de fabricación. También podemos tomar pedidos personalizados. Para confirmar el stock exacto de una pieza, te sugiero ${whatsappLink}.`;
    }

    // 6. Funcionamiento Técnico (Iluminación y Relojes)
    if (input.includes('enchufe') || input.includes('pilas') || input.includes('220v') || input.includes('voltaje') || input.includes('corriente') || input.includes('funciona') || input.includes('led') || input.includes('lamparita') || input.includes('bombilla')) {
        return `La mayoría de nuestras lámparas se conectan a corriente estándar (220v) y utilizan lámparas de filamento LED estilo vintage, para mantener la estética sin calentar. Los relojes mecánicos son a cuerda (no llevan pilas). ¿De qué producto te gustaría saber el detalle técnico?`;
    }

    // 7. Descuentos y Ventas Mayoristas
    if (input.includes('descuento') || input.includes('promocion') || input.includes('mayorista') || input.includes('por mayor') || input.includes('cantidad')) {
        return `Nuestras piezas son de edición muy limitada por su trabajo artesanal, por lo que no solemos hacer ventas mayoristas masivas. Sin embargo, si buscás decorar todo un ambiente (como un bar o estudio), podemos armar un presupuesto especial. ¡Escribinos por WhatsApp para charlarlo!`;
    }

    // 8. Mantenimiento y Cuidados
    if (input.includes('limpia') || input.includes('limpiar') || input.includes('mantenimiento') || input.includes('oxida') || input.includes('cuidado')) {
        return `El bronce y el cobre con el tiempo adquieren una pátina natural que realza su aspecto 'steampunk'. Si preferís mantenerlos brillantes, basta con usar un paño seco y limpia-metales suave. Las partes de madera ya vienen tratadas. ¡Están hechas para durar toda la vida!`;
    }

    // 9. Recomendaciones específicas y Listado de Productos
    if (input.includes('iluminacion') || input.includes('luz') || input.includes('lamparas')) {
        let intro = "Contamos con una colección exclusiva de iluminación artesanal. Aquí tienes algunas de nuestras piezas más destacadas:";
        let productCards = "";
        const ids = ['lampara-airship', 'lampara-arana', 'lampara-magneto'];
        ids.forEach(id => { if (db[id]) productCards += getProductCardHTML(id, db[id]); });
        let footer = `<br>Si buscás algo más específico o un diseño a medida, podés ${whatsappLink}.`;
        let options = createOptionsHTML(['Volver atrás', '⏱️ Relojes', '⚙️ Decoración', '🎩 Accesorios']);
        return intro + productCards + footer + options;
    }

    if (input.includes('reloj') || input.includes('tiempo')) {
        let intro = "El tiempo es una obra de arte en nuestra forja. Mira estos modelos mecánicos a cuerda:";
        let productCards = "";
        const ids = ['reloj-flor', 'reloj-cupula', 'reloj-pared'];
        ids.forEach(id => { if (db[id]) productCards += getProductCardHTML(id, db[id]); });
        let footer = `<br>¿Te gustaría ver algún otro modelo? O si preferís, podés ${whatsappLink}.`;
        let options = createOptionsHTML(['Volver atrás', '💡 Iluminación', '⚙️ Decoración', '🎩 Accesorios']);
        return intro + productCards + footer + options;
    }

    if (input.includes('decoracion') || input.includes('adorno') || input.includes('funcional')) {
        let intro = "Nuestras piezas decorativas fusionan utilidad y estética victoriana:";
        let productCards = "";
        const ids = ['parlante-bluetooth', 'soporte-celular', 'terrario'];
        ids.forEach(id => { if (db[id]) productCards += getProductCardHTML(id, db[id]); });
        let footer = `<br>Cada pieza es única. Para consultas sobre stock o personalización: ${whatsappLink}.`;
        let options = createOptionsHTML(['Volver atrás', '💡 Iluminación', '⏱️ Relojes', '🎩 Accesorios']);
        return intro + productCards + footer + options;
    }

    if (input.includes('accesorio') || input.includes('antiparra') || input.includes('sombrero') || input.includes('pulsera')) {
        let intro = "Completa tu estilo con nuestros accesorios forjados a mano:";
        let productCards = "";
        const ids = ['antiparra-steampunk', 'sombrero-bombin', 'reloj-pulsera'];
        ids.forEach(id => { if (db[id]) productCards += getProductCardHTML(id, db[id]); });
        let footer = `<br>¿Buscás algo más? Consultanos directamente por ${whatsappLink}.`;
        let options = createOptionsHTML(['Volver atrás', '💡 Iluminación', '⏱️ Relojes', '⚙️ Decoración']);
        return intro + productCards + footer + options;
    }

    if (input.includes('precio') || input.includes('cuanto cuesta') || input.includes('valor')) {
        return `Los precios varían según la complejidad del artefacto, ya que cada pieza es única y hecha a mano. Van desde pequeñas piezas accesibles hasta grandes lámparas de colección.<br><br>Si querés presupuesto exacto o ver si hay promociones vigentes, podés ${whatsappLink}.` + createOptionsHTML(['Volver atrás']);
    }

    if (input.includes('volver atras') || input.includes('menu') || input.includes('inicio')) {
        let options = createOptionsHTML(['💡 Iluminación', '⏱️ Relojes', '⚙️ Decoración', '🎩 Accesorios']);
        return `¡Perfecto! Volvemos al inicio. ¿En qué sección te gustaría navegar ahora?` + options;
    }

    if (input.includes('no se') || input.includes('duda') || input.includes('recomendacion') || input.includes('cual elegir')) {
        let options = createOptionsHTML(['💡 Iluminación', '⏱️ Relojes', '⚙️ Decoración', '💬 Hablar con Asesor']);
        return `Te entiendo, es normal dudar con tantas piezas únicas 😊.<br><br>¿Prefieres empezar por algo funcional como iluminación o relojes, o buscas algo puramente decorativo?` + options;
    }

    // 10. Saludos y Cortesía básica (Al final para que no sobreescriba frases como "hola cuanto cuesta")
    if (input.includes('hola') || input.includes('buenas') || input.includes('buen dia') || input.includes('gracias') || input.includes('chau') || input.includes('adios')) {
        let options = createOptionsHTML(['💡 Iluminación', '⏱️ Relojes', '⚙️ Decoración', '🎩 Accesorios', '📦 Envíos y Pagos']);
        return `¡Hola! Qué gusto tenerte en Steampunk Design. ¿En qué te puedo ayudar hoy?` + options;
    }

    // 11. Default / Genérico
    let options = createOptionsHTML(['💡 Iluminación', '⏱️ Relojes', '⚙️ Decoración', '🎩 Accesorios', '💬 Contactar Asesor']);
    return `¡Qué interesante! Cada uno de nuestros artefactos cuenta una historia diferente.<br><br>Para poder guiarte mejor, ¿estás buscando algo funcional (como iluminación o relojes) o algo puramente decorativo/accesorios?` + options;
}



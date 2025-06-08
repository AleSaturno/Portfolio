let menuVisible = false;
// Funcion que oculta o muestra el menu

const mostrarOcultarMenu = () =>{
    if(menuVisible){
        document.getElementById('nav').classList = '';
        menuVisible = false;
    }else{
        document.getElementById('nav').classList = 'responsive';
        menuVisible = true;
    }
};

const seleccionar = () =>{
    //ocultar el menu una vez que selecciono una opcion
    document.getElementById('nav').classList ='';
    menuVisible = false;
}


// Configuración del Intersection Observer para animaciones
const configurarAnimaciones = () => {
    const observerOptions = {
        threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las habilidades
    document.querySelectorAll('.skill').forEach(skill => {
        observer.observe(skill);
    });
    // Observar todas las tarjetas de curriculum
    document.querySelectorAll('.curriculum-card').forEach(card => {
        observer.observe(card);
    });
    // Observar todas las tarjetas de proyecto
    document.querySelectorAll('.proyecto-card').forEach(card => {
        observer.observe(card);
    });
    // NO observar el formulario de contacto, su visibilidad se maneja aparte
};

// Inicializar animaciones y tooltips cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    configurarAnimaciones();
    animarSeccionSobremi();
    inicializarTooltips();
    // Efecto onda en botón de CV
    const btnDescargar = document.getElementById('descargarCv');
    if (btnDescargar) {
        btnDescargar.addEventListener('click', (e) => {
            crearEfectoOnda(e, btnDescargar);
        });
    }
    // Mostrar el formulario de contacto inmediatamente al cargar
    var contactForm = document.querySelector('.contact-form');
    if (contactForm && !contactForm.classList.contains('visible')) {
        contactForm.classList.add('visible');
    }
    const contactFormEl = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = contactFormEl ? contactFormEl.querySelector('button[type="submit"]') : null;
    if (contactFormEl && submitButton) {
        contactFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
            statusMessage.innerHTML = '<p>Enviando mensaje, por favor espere...</p>';
            statusMessage.classList.remove('hidden', 'success', 'error');
            statusMessage.classList.add('sending');
            fetch(contactFormEl.action, {
                method: 'POST',
                body: new FormData(contactFormEl),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return { success: true };
                } else {
                    throw new Error('Error en el envío del formulario');
                }
            }).then(data => {
                if (data.success) {
                    statusMessage.innerHTML = '<p>¡Mensaje enviado con éxito! Te contactaré pronto.</p>';
                    statusMessage.classList.remove('sending');
                    statusMessage.classList.add('success');
                    contactFormEl.reset();
                } else {
                    throw new Error('Error en el envío del formulario');
                }
            }).catch(error => {
                statusMessage.innerHTML = '<p>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>';
                statusMessage.classList.remove('sending');
                statusMessage.classList.add('error');
            }).finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje <i class="fa-solid fa-paper-plane"></i>';
                setTimeout(() => {
                    statusMessage.classList.add('hidden');
                }, 5000);
            });
        });
    }
});

// Función para manejar la animación de la sección Sobre Mí
const animarSeccionSobremi = () => {
  const sobremi = document.querySelector('.sobremi');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sobremi.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(sobremi);
};

// Función para el efecto de ondas en el botón
const crearEfectoOnda = (e, elemento) => {
  const rect = elemento.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  elemento.appendChild(ripple);
  
  // Eliminar el elemento después de la animación
  setTimeout(() => {
    ripple.remove();
  }, 1000);
};

// Función para inicializar los tooltips de intereses
const inicializarTooltips = () => {
  const intereses = document.querySelectorAll('.interes');

  intereses.forEach(interes => {
    let tooltip = null;

    const showTooltip = (e) => {
      tooltip = document.createElement('div');
      tooltip.className = 'interes-tooltip';
      tooltip.textContent = interes.getAttribute('aria-label');
      document.body.appendChild(tooltip);
      const rect = interes.getBoundingClientRect();
      tooltip.style.position = 'absolute';
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
      tooltip.style.left = `${rect.left + (interes.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;
      tooltip.style.pointerEvents = 'none';
      tooltip.style.zIndex = '9999';
    };

    const hideTooltip = () => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    };

    interes.addEventListener('mouseenter', showTooltip);
    interes.addEventListener('mouseleave', hideTooltip);
    interes.addEventListener('focus', showTooltip);
    interes.addEventListener('blur', hideTooltip);
  });
};

// Función para manejar la descarga del CV
document.getElementById('descargarCv').addEventListener('click', (e) => {
  // Prevenir el comportamiento por defecto
  e.preventDefault();
  
  // Crear efecto de ondas
  crearEfectoOnda(e, e.currentTarget);
  
  // Añadir clase de animación
  const btn = e.currentTarget;
  btn.classList.add('descargando');
  
  // Simular carga y luego descargar
  setTimeout(() => {
    let a = document.createElement('a');
    a.href = 'https://drive.google.com/uc?export=download&id=1iFzZCl0SVv5I6_TF9slbw-l9fRPUnL4D';
    a.download = 'CV_Alejandro_Saturno.pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Restaurar botón
    setTimeout(() => {
      btn.classList.remove('descargando');
    }, 500);
  }, 1000);
});

// Inicializar eventos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar animaciones
  animarSeccionSobremi();
  inicializarTooltips();
  
  // Añadir efecto de ondas al botón de descarga
  const btnDescargar = document.getElementById('descargarCv');
  if (btnDescargar) {
    btnDescargar.addEventListener('click', (e) => {
      crearEfectoOnda(e, btnDescargar);
    });
  }
});




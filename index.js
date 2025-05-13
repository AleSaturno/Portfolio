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


//Funcion que aplica las animaciones de las habilidades
const efectoHabilidades = () =>{
    let skills = document.getElementById('skills');
    let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName('progreso');
        habilidades[0].classList.add('javascript');
        habilidades[1].classList.add('htmlcss');
        habilidades[2].classList.add('reactredux');
        habilidades[3].classList.add('nodepost');
        habilidades[4].classList.add('nexttypetail');
        habilidades[5].classList.add('comunicacion');
        habilidades[6].classList.add('trabajoenequipo');
        habilidades[7].classList.add('creactividad');
        habilidades[8].classList.add('dedicacion');
        habilidades[9].classList.add('proactivo');
        
    }
}
//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = () =>{
    efectoHabilidades();
}


//Funcion que logra descargar un CV
document.getElementById('descargarCv').addEventListener('click', () => {
    let a = document.createElement('a');
    a.href = 'https://drive.google.com/uc?export=download&id=1iFzZCl0SVv5I6_TF9slbw-l9fRPUnL4D'; // La URL de tu CV
    a.download = 'CV AlejandroSaturno.pdf'; // El nombre predeterminado para el archivo descargado
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado');

            // Deshabilitar el botón y mostrar "Enviando..."
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            // Mostrar mensaje de "Enviando..."
            statusMessage.innerHTML = '<p>Enviando mensaje, por favor espere...</p>';
            statusMessage.classList.remove('hidden', 'success', 'error');
            statusMessage.classList.add('sending');

            // Enviar el formulario
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                console.log('Tipo de respuesta:', response.headers.get('content-type'));
                if (response.ok) {
                    // Asumimos que una respuesta OK significa que el mensaje se envió correctamente
                    return { success: true };
                } else {
                    throw new Error('Error en el envío del formulario');
                }
            }).then(data => {
                if (data.success) {
                    statusMessage.innerHTML = '<p>¡Mensaje enviado con éxito! Te contactaré pronto.</p>';
                    statusMessage.classList.remove('sending');
                    statusMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error('Error en el envío del formulario');
                }
            }).catch(error => {
                console.error('Error detallado:', error);
                statusMessage.innerHTML = '<p>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>';
                statusMessage.classList.remove('sending');
                statusMessage.classList.add('error');
            }).finally(() => {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje <i class="fa-solid fa-paper-plane"></i>';
                
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    statusMessage.classList.add('hidden');
                }, 5000);
            });
        });
    } else {
        console.error('Elementos del formulario no encontrados');
    }
});


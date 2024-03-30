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
    a.href = 'https://drive.google.com/uc?export=download&id=1jXF_ro-3ECBt-sXIw8SAbqwSYUrcF294'; // La URL de tu CV
    a.download = 'CV AlejandroSaturno.pdf'; // El nombre predeterminado para el archivo descargado
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
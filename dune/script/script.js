/////////////////////* ------ MENU BURGER ------ *///////////////////////


let menu = "desactive";

$("label").click(function(){
    if (menu == "active"){
        $("#navMenu").animate({
            left : "-25vw",
        });
        menu = "desactive";
    } else {
        $("#navMenu").animate({
            left : "0vw",
        });
        menu = "active";
    }
});


/////////////////////* ------ EFFET PARALLAX ------*//////////////////////


window.addEventListener('scroll', function(){
    let scrollPosition = window.pageYOffset;
    let limit = $(".parallax").offsetTop + $(".parallax").offsetHeight; 
    if (scrollPosition > $(".parallax").offsetTop && scrollPosition <= limit){
        $(".parallax").css("background-position-y:"+ (50 - 10*scrollPosition/limit) +"%") ;   
    }else{
        $(".parallax").css("background-position-y: 50%");    
    }
});

////////////////////* ------ LECTEUR YOUTUBE -------*////////////////////

let etatLecteur;
function lecteurPret(event) {
    // event.target = lecteur
    event.target.setVolume(50);
}

function changementLecteur(event) {
    // event.data = état du lecteur
    etatLecteur = event.data;
}
let lecteur;
let lecteurVI1;
let lecteurVI2;
function onYouTubeIframeAPIReady() {
    lecteur = new YT.Player("videoYT", {
        height: "390",
        width: "640",
        videoId: "n9xhJrPXop4",
        playerVars: {
        color: "white",
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0
    },
    events: {
    onReady: lecteurPret,
    onStateChange: changementLecteur
    }
    });
    lecteurVI1 = new YT.Player("videoYTVI1", {
        height: "100%",
        width: "100%",
        videoId: "n9xhJrPXop4",
        playerVars: {
        color: "white",
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0
    },
    events: {
    onReady: lecteurPret,
    }
    });
    lecteurVI2 = new YT.Player("videoYTVI2", {
        height: "100%",
        width: "100%",
        videoId: "f55sJUD68jI",
        playerVars: {
        color: "white",
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0
    },
    events: {
    onReady: lecteurPret,
    }
    });
}
// Hauteur de la vidéo
const hauteurVideo = $("#videoYT").height();
// Position Y de la vidéo
const posYVideo = $("#videoYT").offset().top;
// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;
// Gestion du défilement
$(window).scroll(function () {
    // Récupération de la valeur du défilement vertical
    const scroll = $(window).scrollTop();

    // Classe permettant l'exécution du CSS
    $("#videoYT").toggleClass(
        "scroll",
        etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
    );
});


////////////////////* ------ CARROUSEL ------ *////////////////////


let index = 0;

$('.spanCarou').click(function () {
    let indexN = $('.spanCarou').index(this);
    $('.divPersoCarou').eq(index).fadeOut(700).end().eq(indexN).fadeIn(700);
    index = indexN;
});

$('.Next').click(function (){
    if (index === 10){
        let indexN = 0;
        $('.divPersoCarou').eq(index).fadeOut(700).end().eq(indexN).fadeIn(700);
        index = indexN;
    } else {
        let indexN = index + 1;
        $('.divPersoCarou').eq(index).fadeOut(700).end().eq(indexN).fadeIn(700);
        index = indexN;
    }
});

$('.Prev').click(function (){
    if (index === 0){
        let indexN = 10;
        $('.divPersoCarou').eq(index).fadeOut(700).end().eq(indexN).fadeIn(700);
        index = indexN;
    } else {
        let indexN = index -1;
        $('.divPersoCarou').eq(index).fadeOut(700).end().eq(indexN).fadeIn(700);
        index = indexN;
    }
});


////////////////////* ------ CARROUSEL 2 ------ *////////////////////


let indexVI = 0;

$('.spanCarouVI').click(function () {
    let indexNVI = $('.spanCarouVI').index(this);
    $('.divPersoCarouVI').eq(indexVI).fadeOut(700).end().eq(indexNVI).fadeIn(700);
    indexVI = indexNVI;
});

$('.NextVI').click(function (){
    if (indexVI === 10){
        let indexNVI = 0;
        $('.divPersoCarouVI').eq(indexVI).fadeOut(700).end().eq(indexNVI).fadeIn(700);
        indexVI = indexNVI;
    } else {
        let indexNVI = indexVI + 1;
        $('.divPersoCarouVI').eq(indexVI).fadeOut(700).end().eq(indexNVI).fadeIn(700);
        indexVI = indexNVI;
    }
});

$('.PrevVI').click(function (){
    if (indexVI === 0){
        let indexNVI = 10;
        $('.divPersoCarouVI').eq(indexVI).fadeOut(700).end().eq(indexNVI).fadeIn(700);
        indexVI = indexNVI;
    } else {
        let indexNVI = indexVI -1;
        $('.divPersoCarouVI').eq(indexVI).fadeOut(700).end().eq(indexNVI).fadeIn(700);
        indexVI = indexNVI;
    }
});


////////////////////* ------ CARTE ------ *////////////////////


let lati= 47.2608333;
let long= 2.4188888888888886;

// Création de la carte, vide à ce stade
let carte = L.map('carteImg', {
    center: [lati, long], // Position carte
    zoom: 5,
    minZoom: 4,
    maxZoom: 19,
});



// Ajout des tuiles (ici OpenStreetMap)
// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);
  
// Ajout de l'échelle

function onEachFeature(features, layer){
    if (features.properties && features.properties.NOM_ETABLISSEMENT && features.properties.ECRANS && features.properties.FAUTEUILS) {
        layer.bindPopup(features.properties.NOM_ETABLISSEMENT+"<br>Salles - "+features.properties.ECRANS+"<br>Fauteuils - "+features.properties.FAUTEUILS);
    }
}

L.geoJSON(dataCinema, {
    onEachFeature: onEachFeature
}).addTo(carte);


function positionSucces(position) {
    // Injection du résultat dans du texte
    lati = Math.round(1000 * position.coords.latitude) / 1000;
    long = Math.round(1000 * position.coords.longitude) / 1000;
    $('.pPosition').text(`Latitude: ${lati}°, Longitude: ${long}°`);
    carte.flyTo({lat: lati,lng: long},11);
};

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
    // Cas d'usage du switch !
    let natureErreur;
    switch (erreurPosition.code) {
      case erreurPosition.TIMEOUT:
        // Attention, durée par défaut de récupération des coordonnées infini
        natureErreur = 'La géolocalisation prends trop de temps...';
        break;
      case erreurPosition.PERMISSION_DENIED:
        natureErreur = 'Vous n\'avez pas autorisé la géolocalisation.';
        break;
      case erreurPosition.POSITION_UNAVAILABLE:
        natureErreur = 'Votre position n\'a pu être déterminée.';
        break;
      default:
        natureErreur = 'Une erreur inattendue s\'est produite.';
    }
    // Injection du texte
    $('.pPosition').text(natureErreur);
}
  
// Récupération des coordonnées au clic sur le bouton
$('.bPosition').click(function () {
    // Support de la géolocalisation
    if ('geolocation' in navigator) {
      // Support = exécution du callback selon le résultat
      navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000,
      });
    } else {
      // Non support = injection de texte
      $('.pPosition').text('La géolocalisation n\'est pas supportée par votre navigateur');
    }
});
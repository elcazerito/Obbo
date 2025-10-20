let locText = document.getElementById('loc');

function updateLocText(){
    let loc = getCookie('localisation');
    switch(loc){
        case 'none' : locText.innerText = 'Localisation : Fantôme'; break;
        case 'approx' : locText.innerText = 'Localisation : Approx'; break;
        case 'exact' : locText.innerText = 'Localisation : Exacte'; break;
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    preloadCookies("locationRequest.html");
    SetLight();
    updateLocText();
});

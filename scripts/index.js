const toggleLocation = document.getElementById("toggleLocation");
const locationForm = document.getElementById("locationForm");
const locationOverlay = document.getElementById("overlay");
const localisationRadios = document.querySelectorAll('input[name="localisation"]');
const submitBtn = document.getElementById("submit");

startCamera();
snapButton.addEventListener("click", takePhoto);
submitBtn.addEventListener("click", ()=>{
    const selectedValue = getSelectedLocalisation();
    if(!selectedValue) alert("Veuillez sélectionner une localisation !");
    else{
        setCookie("localisation", selectedValue);
        if(selectedValue === "none") toggleLocation.checked = false;
        locationFormAltern();
    }
});

toggleLocation.addEventListener('change', ()=>{
    if(toggleLocation.checked) locationFormAltern();
    else setCookie("localisation", "none");
});

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe("","map.html");
}, false);

document.addEventListener('DOMContentLoaded', ()=>{
    if(getCookie("localisation") != "none") toggleLocation.checked = true;
})
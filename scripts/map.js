let light = document.getElementById('light');
let locationForm = document.getElementById('locationForm');
let submit = document.getElementById('SubmitBtn');

function getLocalisation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                var map;
                if (getCookie('localisation') === 'exact') {
                    map = L.map('map').setView([lat, lng], 18);

                    (async () => {
                        const adresse = await getAdresse(lat, lng);

                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(`Vous êtes ici : ${adresse}}`)
                            .openPopup();
                    })();


                } else if (getCookie('localisation') === 'approx') {
                    map = L.map('map').setView([lat, lng], 15);

                    (async () => {
                        const ville = await getVille(lat, lng);

                        L.circle([lat, lng], { radius: 500 })
                            .addTo(map)
                            .bindPopup("Vous êtes dans cette zone : " + ville)
                            .openPopup();
                    })();

                } else map = L.map('map').setView([48.85, 2.35], 12);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                }).addTo(map);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("Utilisateur a refusé la géolocalisation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Position non disponible.");
                        break;
                    case error.TIMEOUT:
                        console.log("Temps d'attente dépassé.");
                        break;
                    default:
                        console.log("Erreur inconnue.");
                }
            }
        );
    }
}

function getAdresse(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    return fetch(url, {
        headers: { "User-Agent": "MonApplication/1.0 (monemail@example.com)" }
    })
        .then(response => response.json())
        .then(data => {
            return data.display_name;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de l’adresse :", error);
        });
}

function getVille(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    return fetch(url, {
        headers: { "User-Agent": "MonApplication/1.0 (monemail@example.com)" }
    })
        .then(response => response.json())
        .then(data => {
            const address = data.address;
            return address.city || address.town || address.village || address.municipality || "Ville inconnue";
        });
}

function SetLight() {
    switch (getCookie('localisation')) {
        case 'none': light.classList.add('bg-stone-300');
        case 'approx': light.classList.add('bg-orange-500');
        case 'exact': light.classList.add('bg-lime-500');
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe("index.html");
}, false);

getLocalisation();
SetLight();
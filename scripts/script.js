const video = document.getElementById("video");

const snapButton = document.getElementById("snapButton");

const canvas = document.getElementById("canvas");

const flash = document.getElementById("flash");

const image = localStorage.getItem("capturedImage");

let touchStartX = 0;
let touchEndX = 0;

let stream = null;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Erreur caméra : " + err.message);
  }
}

function takePhoto() {
  if (!stream) return;
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  localStorage.setItem("capturedImage", canvas.toDataURL("image/png"));
  window.location.href = "result.html";
}

function locationFormAltern(){
  if(locationForm.classList.contains("hidden")){
    locationForm.classList.remove("hidden");
    locationOverlay.classList.remove("hidden");
  }
  else{
    locationForm.classList.add("hidden");
    locationOverlay.classList.add("hidden");
  }
}

function getSelectedLocalisation() {
    for (const radio of localisationRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function downloadImage() {
  const image = localStorage.getItem("capturedImage");

  if (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = "screenshot_" + Date.now() + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else window.location.href = "index.html";
}

function handleSwipe(leftLocation, rightLocation) {
  const minDistance = 50;
  if (touchEndX < touchStartX - minDistance && leftLocation != null && leftLocation != "") {
    window.location.href = leftLocation;
  } else if (touchEndX > touchStartX + minDistance && rightLocation != null & rightLocation != "") {
    window.location.href = rightLocation;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function setCookie(name, value) {
  const dateExpiration = new Date();
  dateExpiration.setDate(dateExpiration.getDate() + 1);
  document.cookie = `${name}=${value}; expires=${dateExpiration.toUTCString()}; path=/`;
}

function SetLight() {
    switch (getCookie('localisation')) {
        case 'none': light.classList.add('bg-stone-300');
        case 'approx': light.classList.add('bg-orange-500');
        case 'exact': light.classList.add('bg-lime-500');
    }
}

function preloadCookies(loc) {
  if (!getCookie("localisation")) location.href = loc;
}

const sharePopUp = document.getElementById("sharePopUp");
const options = document.getElementById("resultOptions");

function showSharePopUp() {
  sharePopUp.classList.remove("hidden");
  options.classList.add("hidden");
}

function closeSharePopUp(){
    sharePopUp.classList.add("hidden");
    options.classList.remove("hidden");
}

function retakePhoto() {
  localStorage.removeItem("capturedImage");
  window.location.href = "index.html";
}

document.body.style.backgroundImage = `url(${image})`;
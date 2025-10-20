function preloadCookies() {
  if (!getCookie("localisation")) location.href = 'source/locationRequest.html';
}

document.addEventListener("DOMContentLoaded", preloadCookies);
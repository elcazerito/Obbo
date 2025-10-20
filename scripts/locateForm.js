document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("locationForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const choice = document.querySelector('input[name="localisation"]:checked');

    if (choice) {
        setCookie('localisation', choice.value);
        window.location.href = '../index.html';
    } else {
      alert("Veuillez choisir une option avant de continuer.");
    }
  });
});

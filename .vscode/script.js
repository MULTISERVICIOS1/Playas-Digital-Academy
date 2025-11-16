document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("formStatus").innerText = "Enviando...";

    setTimeout(() => {
        document.getElementById("formStatus").innerText = "Mensaje enviado correctamente ✔️";
    }, 1500);
});

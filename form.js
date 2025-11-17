document.getElementById("form-contacto").addEventListener("submit", function(e){
    e.preventDefault();

    const btn = document.querySelector("button");
    const mensaje = document.getElementById("mensaje-estado");

    btn.innerText = "Enviando...";

    emailjs.sendForm("service_aw1x8t4", "template_c1bdq5i", this)
        .then(() => {
            mensaje.innerText = "Mensaje enviado correctamente ✔";
            btn.innerText = "Enviar";
            this.reset();
        })
        .catch(() => {
            mensaje.innerText = "Error al enviar ❌";
            btn.innerText = "Enviar";
        });
});

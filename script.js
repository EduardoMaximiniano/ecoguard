document.addEventListener("DOMContentLoaded", function() {
            const btnDenuncia = document.getElementById("btn-ir-denuncia");

            if (btnDenuncia) {
                btnDenuncia.addEventListener("click", function() {
                    window.location.href = "denuncia/denuncia.html"; 
                });
            }
        });
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const forgotPassword = document.getElementById("forgotPassword");
    const remember = document.getElementById("remember");
    const loginMessage = document.getElementById("loginMessage");
    const useDemo = document.getElementById("useDemo");


    // ==========================================
    // DATOS DE ACCESO
    // ==========================================

    const DEMO_EMAIL = "cine@cinemax.com";
    const DEMO_PASSWORD = "12345";


    // ==========================================
    // COMPROBAR SI YA EXISTE UNA SESIÓN
    // ==========================================

    const session = localStorage.getItem("cinemax_session");

    if (session) {
        window.location.href = "pagina2.html";
        return;
    }


    // ==========================================
    // MOSTRAR / OCULTAR CONTRASEÑA
    // ==========================================

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "👁️";

        }

    });


    // ==========================================
    // CUENTA DEMO
    // ==========================================

    useDemo.addEventListener("click", () => {

        emailInput.value = DEMO_EMAIL;
        passwordInput.value = DEMO_PASSWORD;

        emailInput.focus();

        showMessage(
            "Cuenta demo cargada. Puedes iniciar sesión.",
            "success"
        );

    });


    // ==========================================
    // OLVIDÉ MI CONTRASEÑA
    // ==========================================

    forgotPassword.addEventListener("click", () => {

        showMessage(
            "Para esta versión sin base de datos, utiliza la cuenta demo: cine@cinemax.com / 12345",
            "info"
        );

    });


    // ==========================================
    // LOGIN
    // ==========================================

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();


        if (email === "" || password === "") {

            showMessage(
                "Completa todos los campos.",
                "error"
            );

            return;
        }


        if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {

            showMessage(
                "Correo o contraseña incorrectos.",
                "error"
            );

            passwordInput.value = "";

            return;
        }


        // ======================================
        // CREAR SESIÓN
        // ======================================

        const user = {
            name: "Nicolas",
            email: email,
            loginDate: new Date().toISOString()
        };


        localStorage.setItem(
            "cinemax_session",
            JSON.stringify(user)
        );


        if (remember.checked) {

            localStorage.setItem(
                "cinemax_remember",
                "true"
            );

        }


        showMessage(
            "Inicio de sesión correcto. Entrando a CineMax...",
            "success"
        );


        // ======================================
        // REDIRECCIÓN
        // ======================================

        setTimeout(() => {

            window.location.href = "pagina2.html";

        }, 700);

    });


    // ==========================================
    // MOSTRAR MENSAJES
    // ==========================================

    function showMessage(message, type) {

        loginMessage.textContent = message;

        loginMessage.className = "login-message " + type;


        setTimeout(() => {

            loginMessage.textContent = "";

            loginMessage.className = "login-message";

        }, 5000);

    }

});
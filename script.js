

const movies = [

    {
        id: "el-ultimo-viaje",
        title: "El último viaje",
        genre: "Acción",
        rating: 4.8,
        duration: "2h 18min",
        year: 2026,
        age: "+12",
        description:
            "Una increíble aventura llena de acción, misterio y emoción. Un grupo de exploradores emprende el viaje más peligroso de sus vidas.",
        icon: "🚀",
        featured: true
    },

    {
        id: "noche-sin-regreso",
        title: "Noche sin regreso",
        genre: "Terror",
        rating: 4.6,
        duration: "1h 52min",
        year: 2026,
        age: "+16",
        description:
            "Una noche aparentemente normal se convierte en una pesadilla cuando un grupo de amigos descubre que no están solos.",
        icon: "👻",
        featured: false
    },

    {
        id: "amor-en-paris",
        title: "Amor en París",
        genre: "Drama",
        rating: 4.7,
        duration: "2h 05min",
        year: 2026,
        age: "+12",
        description:
            "Dos personas de mundos completamente diferentes se encuentran en París y descubren que el amor puede aparecer cuando menos lo esperan.",
        icon: "❤️",
        featured: false
    },

    {
        id: "mision-imposible",
        title: "Misión Imposible",
        genre: "Acción",
        rating: 4.9,
        duration: "2h 25min",
        year: 2026,
        age: "+15",
        description:
            "Una misión secreta llevará a nuestros protagonistas al límite en una carrera contra el tiempo.",
        icon: "💥",
        featured: false
    },

    {
        id: "risas-de-verano",
        title: "Risas de verano",
        genre: "Comedia",
        rating: 4.3,
        duration: "1h 45min",
        year: 2026,
        age: "TP",
        description:
            "Una divertida historia sobre amistad, vacaciones y una serie de situaciones completamente inesperadas.",
        icon: "😂",
        featured: false
    },

    {
        id: "guardianes-del-universo",
        title: "Guardianes del universo",
        genre: "Animación",
        rating: 4.9,
        duration: "1h 58min",
        year: 2026,
        age: "TP",
        description:
            "Un pequeño grupo de héroes deberá salvar el universo mientras descubre el verdadero significado de la amistad.",
        icon: "🌌",
        featured: false
    },

    {
        id: "la-ultima-promesa",
        title: "La última promesa",
        genre: "Drama",
        rating: 4.5,
        duration: "2h 12min",
        year: 2026,
        age: "+12",
        description:
            "Una historia emocionante sobre familia, decisiones difíciles y una promesa que cambiará varias vidas.",
        icon: "🎭",
        featured: false
    },

    {
        id: "el-despertar",
        title: "El despertar",
        genre: "Terror",
        rating: 4.4,
        duration: "1h 49min",
        year: 2026,
        age: "+18",
        description:
            "Después de años abandonado, un antiguo edificio vuelve a abrir sus puertas y despierta algo que nunca debió salir.",
        icon: "🕯️",
        featured: false
    }

];


/* =========================================================
   3. VARIABLES GLOBALES
========================================================= */

let currentMovie = movies[0];

let selectedSeats = [];

let selectedDate = "Hoy";

let selectedTime = "7:30 PM";

let currentGenre = "all";

let reservations =
    JSON.parse(localStorage.getItem("cinemaxReservations")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("cinemaxUser")) || null;


/* =========================================================
   4. ELEMENTOS DEL DOM
========================================================= */

const loginPage =
    document.getElementById("loginPage");

const app =
    document.getElementById("app");

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");

const togglePassword =
    document.getElementById("togglePassword");

const useDemo =
    document.getElementById("useDemo");

const forgotPassword =
    document.getElementById("forgotPassword");

const globalSearch =
    document.getElementById("globalSearch");

const movieSearch =
    document.getElementById("movieSearch");

const homeMovieGrid =
    document.getElementById("homeMovieGrid");

const movieGrid =
    document.getElementById("movieGrid");

const upcomingGrid =
    document.getElementById("upcomingGrid");

const movieEmpty =
    document.getElementById("movieEmpty");

const seatMap =
    document.getElementById("seatMap");

const selectedSeatsContainer =
    document.getElementById("selectedSeats");

const seatCount =
    document.getElementById("seatCount");

const summaryTotal =
    document.getElementById("summaryTotal");

const summaryTicketCount =
    document.getElementById("summaryTicketCount");

const confirmBooking =
    document.getElementById("confirmBooking");

const ticketsContainer =
    document.getElementById("ticketsContainer");

const ticketBadge =
    document.getElementById("ticketBadge");

const movieModal =
    document.getElementById("movieModal");

const confirmationModal =
    document.getElementById("confirmationModal");

const notificationPanel =
    document.getElementById("notificationPanel");

const toast =
    document.getElementById("toast");


/* =========================================================
   5. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeApplication();

});


function initializeApplication() {

    renderHomeMovies();

    renderMovies();

    renderUpcomingMovies();

    createSeatMap();

    renderTickets();

    updateReservationBadge();

    setupNavigation();

    setupMovieFilters();

    setupSearch();

    setupLogin();

    setupBooking();

    setupModals();

    setupNotifications();

    setupLogout();

    setupMobileMenu();

    setupPromotion();

    setupSectionButtons();

    updateUserInterface();


    if (currentUser) {

        showApp();

    } else {

        showLogin();

    }

}


/* =========================================================
   6. LOGIN
========================================================= */

function setupLogin() {

    if (!loginForm) return;


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            emailInput.value.trim().toLowerCase();

        const password =
            passwordInput.value;


        if (
            email === DEMO_EMAIL &&
            password === DEMO_PASSWORD
        ) {

            loginMessage.textContent =
                "✓ Inicio de sesión correcto";

            loginMessage.className =
                "login-message success";


            currentUser = {

                name: "Nicolas",

                email: DEMO_EMAIL

            };


            localStorage.setItem(
                "cinemaxUser",
                JSON.stringify(currentUser)
            );


            setTimeout(function () {

                showApp();

                showToast(
                    "Bienvenido",
                    "Has iniciado sesión correctamente."
                );

            }, 500);


        } else {

            loginMessage.textContent =
                "✕ Correo o contraseña incorrectos";

            loginMessage.className =
                "login-message error";

        }

    });


    /* Mostrar contraseña */

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (
                    passwordInput.type === "password"
                ) {

                    passwordInput.type = "text";

                    togglePassword.textContent = "🙈";

                } else {

                    passwordInput.type = "password";

                    togglePassword.textContent = "👁";

                }

            }
        );

    }


    /* Usar cuenta demo */

    if (useDemo) {

        useDemo.addEventListener(
            "click",
            function () {

                emailInput.value = DEMO_EMAIL;

                passwordInput.value = DEMO_PASSWORD;

                loginMessage.textContent =
                    "Datos de prueba cargados";

                loginMessage.className =
                    "login-message success";

            }
        );

    }


    /* Recuperar contraseña */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function () {

                showToast(
                    "Recuperación",
                    "Esta versión es una demostración. La recuperación de contraseña no está conectada a un servidor."
                );

            }
        );

    }

}


/* =========================================================
   7. MOSTRAR LOGIN / APP
========================================================= */

function showLogin() {

    if (loginPage) {

        loginPage.style.display = "flex";

    }

    if (app) {

        app.style.display = "none";

    }

}


function showApp() {

    if (loginPage) {

        loginPage.style.display = "none";

    }

    if (app) {

        app.style.display = "flex";

    }

    updateUserInterface();

}


/* =========================================================
   8. INFORMACIÓN DEL USUARIO
========================================================= */

function updateUserInterface() {

    if (!currentUser) return;


    const elements = {

        sidebarUserName:
            document.getElementById("sidebarUserName"),

        sidebarUserEmail:
            document.getElementById("sidebarUserEmail"),

        topbarUserName:
            document.getElementById("topbarUserName"),

        profileName:
            document.getElementById("profileName"),

        profileEmail:
            document.getElementById("profileEmail"),

        profileNameInput:
            document.getElementById("profileNameInput"),

        profileEmailInput:
            document.getElementById("profileEmailInput")

    };


    if (elements.sidebarUserName) {

        elements.sidebarUserName.textContent =
            currentUser.name;

    }


    if (elements.sidebarUserEmail) {

        elements.sidebarUserEmail.textContent =
            currentUser.email;

    }


    if (elements.topbarUserName) {

        elements.topbarUserName.textContent =
            currentUser.name;

    }


    if (elements.profileName) {

        elements.profileName.textContent =
            currentUser.name;

    }


    if (elements.profileEmail) {

        elements.profileEmail.textContent =
            currentUser.email;

    }


    if (elements.profileNameInput) {

        elements.profileNameInput.value =
            currentUser.name;

    }


    if (elements.profileEmailInput) {

        elements.profileEmailInput.value =
            currentUser.email;

    }

}


/* =========================================================
   9. CARTELERA
========================================================= */

function renderHomeMovies() {

    if (!homeMovieGrid) return;


    const featuredMovies =
        movies.filter(movie => !movie.featured).slice(0, 6);


    homeMovieGrid.innerHTML =
        featuredMovies
            .map(createMovieCard)
            .join("");

}


function renderMovies(
    searchTerm = "",
    genre = currentGenre
) {

    if (!movieGrid) return;


    let filteredMovies = movies;


    if (genre !== "all") {

        filteredMovies =
            filteredMovies.filter(
                movie => movie.genre === genre
            );

    }


    if (searchTerm.trim() !== "") {

        const search =
            searchTerm.toLowerCase();

        filteredMovies =
            filteredMovies.filter(
                movie =>
                    movie.title
                        .toLowerCase()
                        .includes(search)
            );

    }


    if (filteredMovies.length === 0) {

        movieGrid.innerHTML = "";

        movieEmpty.style.display = "block";

        return;

    }


    movieEmpty.style.display = "none";


    movieGrid.innerHTML =
        filteredMovies
            .map(createMovieCard)
            .join("");

}


function createMovieCard(movie) {

    return `

        <article class="movie-card"
            data-movie-id="${movie.id}">

            <div class="movie-poster">

                <div class="movie-poster-icon">
                    ${movie.icon}
                </div>

                <span class="movie-rating">
                    ⭐ ${movie.rating}
                </span>

                <span class="movie-age">
                    ${movie.age}
                </span>

                <div class="movie-overlay">

                    <button
                        class="movie-details-button"
                        data-movie-details="${movie.id}">
                        Ver detalles
                    </button>

                </div>

            </div>


            <div class="movie-card-content">

                <span class="movie-card-genre">
                    ${movie.genre}
                </span>

                <h3>
                    ${movie.title}
                </h3>

                <div class="movie-card-meta">

                    <span>
                        🕐 ${movie.duration}
                    </span>

                    <span>
                        ${movie.year}
                    </span>

                </div>


                <button
                    class="movie-book-button"
                    data-book-movie="${movie.id}">

                    Comprar entrada

                    <span>
                        →
                    </span>

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   10. PRÓXIMAMENTE
========================================================= */

function renderUpcomingMovies() {

    if (!upcomingGrid) return;


    const upcomingMovies = [

        {
            title: "Horizonte",
            genre: "Ciencia ficción",
            icon: "🌌"
        },

        {
            title: "El campeón",
            genre: "Drama",
            icon: "🏆"
        },

        {
            title: "Zona prohibida",
            genre: "Acción",
            icon: "🔥"
        }

    ];


    upcomingGrid.innerHTML =
        upcomingMovies.map(movie => `

            <div class="upcoming-card">

                <div class="upcoming-poster">
                    ${movie.icon}
                </div>

                <div>

                    <span>
                        PRÓXIMAMENTE
                    </span>

                    <h3>
                        ${movie.title}
                    </h3>

                    <p>
                        ${movie.genre}
                    </p>

                </div>

            </div>

        `).join("");

}


/* =========================================================
   11. EVENTOS DE PELÍCULAS
========================================================= */

document.addEventListener("click", function (event) {


    /* Detalles */

    const detailsButton =
        event.target.closest(
            "[data-movie-details]"
        );


    if (detailsButton) {

        const movieId =
            detailsButton.dataset.movieDetails;

        openMovieDetails(movieId);

        return;

    }


    /* Comprar */

    const bookButton =
        event.target.closest(
            "[data-book-movie]"
        );


    if (bookButton) {

        const movieId =
            bookButton.dataset.bookMovie;

        startBooking(movieId);

        return;

    }


    /* Hero */

    const heroBook =
        event.target.closest(".hero-book");


    if (heroBook) {

        const movieId =
            heroBook.dataset.movie;

        startBooking(movieId);

    }

});


/* =========================================================
   12. DETALLES DE PELÍCULA
========================================================= */

function openMovieDetails(movieId) {

    const movie =
        movies.find(
            item => item.id === movieId
        );


    if (!movie) return;


    currentMovie = movie;


    setText("modalGenre", movie.genre);

    setText("modalTitle", movie.title);

    setText("modalRating", `⭐ ${movie.rating}`);

    setText(
        "modalDescription",
        movie.description
    );

    setText(
        "modalDuration",
        movie.duration
    );

    setText(
        "modalYear",
        movie.year
    );

    setText(
        "modalAge",
        movie.age
    );


    const modalPoster =
        document.getElementById("modalPoster");


    if (modalPoster) {

        modalPoster.textContent =
            movie.icon;

    }


    movieModal.style.display = "flex";

}


function setupModals() {

    const closeMovieModal =
        document.getElementById("closeMovieModal");

    const modalBookButton =
        document.getElementById("modalBookButton");

    const closeConfirmation =
        document.getElementById("closeConfirmation");

    const viewTickets =
        document.getElementById("viewTickets");


    if (closeMovieModal) {

        closeMovieModal.addEventListener(
            "click",
            function () {

                movieModal.style.display = "none";

            }
        );

    }


    if (modalBookButton) {

        modalBookButton.addEventListener(
            "click",
            function () {

                movieModal.style.display = "none";

                startBooking(currentMovie.id);

            }
        );

    }


    if (closeConfirmation) {

        closeConfirmation.addEventListener(
            "click",
            function () {

                confirmationModal.style.display = "none";

            }
        );

    }


    if (viewTickets) {

        viewTickets.addEventListener(
            "click",
            function () {

                confirmationModal.style.display = "none";

                switchSection("tickets");

                renderTickets();

            }
        );

    }


    window.addEventListener(
        "click",
        function (event) {

            if (event.target === movieModal) {

                movieModal.style.display = "none";

            }

            if (
                event.target === confirmationModal
            ) {

                confirmationModal.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   13. FILTROS
========================================================= */

function setupMovieFilters() {

    const genreButtons =
        document.querySelectorAll(
            ".genre-filter"
        );


    genreButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                genreButtons.forEach(
                    item =>
                        item.classList.remove("active")
                );


                this.classList.add("active");


                currentGenre =
                    this.dataset.genre;


                renderMovies(
                    movieSearch
                        ? movieSearch.value
                        : "",
                    currentGenre
                );

            }
        );

    });

}


/* =========================================================
   14. BÚSQUEDA
========================================================= */

function setupSearch() {


    if (movieSearch) {

        movieSearch.addEventListener(
            "input",
            function () {

                renderMovies(
                    this.value,
                    currentGenre
                );

            }
        );

    }


    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const search =
                        this.value.trim();

                    switchSection("movies");

                    if (movieSearch) {

                        movieSearch.value =
                            search;

                    }

                    renderMovies(
                        search,
                        currentGenre
                    );

                }

            }
        );

    }

}


/* =========================================================
   15. NAVEGACIÓN
========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            function () {

                const section =
                    this.dataset.section;

                switchSection(section);

            }
        );

    });

}


function switchSection(section) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(item => {

        item.classList.remove(
            "active-section"
        );

    });


    const target =
        document.getElementById(
            `${section}Section`
        );


    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.classList.remove("active");


        if (
            item.dataset.section === section
        ) {

            item.classList.add("active");

        }

    });


    if (section === "tickets") {

        renderTickets();

    }


    closeSidebar();

}


/* =========================================================
   16. BOTONES DE SECCIONES
========================================================= */

function setupSectionButtons() {

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-section-target]"
                );


            if (!button) return;


            const section =
                button.dataset.sectionTarget;


            switchSection(section);

        }
    );

}


/* =========================================================
   17. RESERVA
========================================================= */

function startBooking(movieId) {

    const movie =
        movies.find(
            item => item.id === movieId
        );


    if (!movie) return;


    currentMovie = movie;

    selectedSeats = [];

    selectedDate = "Hoy";

    selectedTime = "7:30 PM";


    updateBookingInformation();

    resetDateAndTimeButtons();

    createSeatMap();

    updateSeatSummary();

    switchSection("booking");

}


function setupBooking() {

    const backToMovies =
        document.getElementById("backToMovies");


    if (backToMovies) {

        backToMovies.addEventListener(
            "click",
            function () {

                switchSection("movies");

            }
        );

    }


    const dateButtons =
        document.querySelectorAll(
            ".date-option"
        );


    dateButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                dateButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add("active");


                selectedDate =
                    this.dataset.date;


                updateBookingInformation();

            }
        );

    });


    const timeButtons =
        document.querySelectorAll(
            ".time-option"
        );


    timeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                timeButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add("active");


                selectedTime =
                    this.dataset.time;


                updateBookingInformation();

            }
        );

    });


    if (confirmBooking) {

        confirmBooking.addEventListener(
            "click",
            confirmReservation
        );

    }

}


/* =========================================================
   18. INFORMACIÓN DE RESERVA
========================================================= */

function updateBookingInformation() {

    setText(
        "bookingMovieTitle",
        currentMovie.title
    );

    setText(
        "bookingGenre",
        currentMovie.genre
    );

    setText(
        "bookingDate",
        selectedDate
    );

    setText(
        "bookingTime",
        selectedTime
    );

    setText(
        "bookingRoom",
        "Sala 3"
    );


    setText(
        "summaryMovieTitle",
        currentMovie.title
    );

    setText(
        "summaryDate",
        selectedDate
    );

    setText(
        "summaryTime",
        selectedTime
    );

    setText(
        "summaryRoom",
        "Sala 3"
    );


    const posters = [

        "bookingPoster",
        "summaryPoster"

    ];


    posters.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                currentMovie.icon;

        }

    });

}


/* =========================================================
   19. REINICIAR FECHA/HORA
========================================================= */

function resetDateAndTimeButtons() {

    const dateButtons =
        document.querySelectorAll(
            ".date-option"
        );


    dateButtons.forEach(
        item => item.classList.remove("active")
    );


    const firstDate =
        document.querySelector(
            ".date-option"
        );


    if (firstDate) {

        firstDate.classList.add("active");

    }


    const timeButtons =
        document.querySelectorAll(
            ".time-option"
        );


    timeButtons.forEach(
        item => item.classList.remove("active")
    );


    const defaultTime =
        document.querySelector(
            '[data-time="7:30 PM"]'
        );


    if (defaultTime) {

        defaultTime.classList.add("active");

    }

}


/* =========================================================
   20. CREAR MAPA DE ASIENTOS
========================================================= */

function createSeatMap() {

    if (!seatMap) return;


    seatMap.innerHTML = "";


    const rows = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G"
    ];


    const occupiedSeats = [

        "A3",
        "A6",
        "B2",
        "B5",
        "C4",
        "D3",
        "E5",
        "F1",
        "F6",
        "G4"

    ];


    rows.forEach(row => {

        const rowElement =
            document.createElement("div");

        rowElement.className =
            "seat-row";


        const rowLabel =
            document.createElement("span");

        rowLabel.className =
            "seat-row-label";

        rowLabel.textContent =
            row;


        rowElement.appendChild(rowLabel);


        for (let number = 1; number <= 8; number++) {

            const seatId =
                `${row}${number}`;


            const seat =
                document.createElement("button");

            seat.type = "button";

            seat.className = "seat";

            seat.dataset.seat = seatId;

            seat.textContent = number;


            /* Asientos premium */

            if (
                (
                    row === "F" ||
                    row === "G"
                ) &&
                number >= 3 &&
                number <= 6
            ) {

                seat.classList.add("premium");

            }


            /* Ocupados */

            if (
                occupiedSeats.includes(seatId)
            ) {

                seat.classList.add(
                    "occupied"
                );

                seat.disabled = true;

            }


            seat.addEventListener(
                "click",
                function () {

                    toggleSeat(
                        seatId,
                        seat
                    );

                }
            );


            rowElement.appendChild(seat);

        }


        seatMap.appendChild(rowElement);

    });

}


/* =========================================================
   21. SELECCIONAR / DESELECCIONAR ASIENTO
========================================================= */

function toggleSeat(seatId, seatElement) {

    const index =
        selectedSeats.indexOf(seatId);


    if (index === -1) {

        selectedSeats.push(seatId);

        seatElement.classList.add(
            "selected"
        );

    } else {

        selectedSeats.splice(index, 1);

        seatElement.classList.remove(
            "selected"
        );

    }


    updateSeatSummary();

}


/* =========================================================
   22. RESUMEN DE ASIENTOS
========================================================= */

function updateSeatSummary() {

    if (!selectedSeatsContainer) return;


    selectedSeatsContainer.innerHTML = "";


    if (selectedSeats.length === 0) {

        selectedSeatsContainer.innerHTML = `

            <p class="no-seats">
                Selecciona tus asientos
            </p>

        `;

    } else {

        selectedSeats
            .sort()
            .forEach(seat => {

                const tag =
                    document.createElement("span");

                tag.className =
                    "selected-seat-tag";

                tag.textContent =
                    seat;


                selectedSeatsContainer.appendChild(
                    tag
                );

            });

    }


    const total =
        calculateTotal();


    setText(
        "seatCount",
        selectedSeats.length
    );


    setText(
        "summaryTicketCount",
        `× ${selectedSeats.length}`
    );


    setText(
        "summaryTotal",
        total.toLocaleString("es-CO")
    );


    if (confirmBooking) {

        confirmBooking.disabled =
            selectedSeats.length === 0;

    }

}


/* =========================================================
   23. CALCULAR TOTAL
========================================================= */

function calculateTotal() {

    let total = 0;


    selectedSeats.forEach(seatId => {

        const row =
            seatId.charAt(0);

        const isPremium =
            row === "F" ||
            row === "G";


        total += isPremium
            ? PRICE_PREMIUM
            : PRICE_GENERAL;

    });


    return total;

}


/* =========================================================
   24. CONFIRMAR RESERVA
========================================================= */

function confirmReservation() {

    if (selectedSeats.length === 0) {

        showToast(
            "Selecciona un asiento",
            "Debes seleccionar al menos un asiento."
        );

        return;

    }


    const total =
        calculateTotal();


    const code =
        generateReservationCode();


    const reservation = {

        id: Date.now(),

        code: code,

        movieId: currentMovie.id,

        movieTitle: currentMovie.title,

        movieIcon: currentMovie.icon,

        genre: currentMovie.genre,

        date: selectedDate,

        time: selectedTime,

        room: "Sala 3",

        seats: [...selectedSeats],

        total: total,

        createdAt:
            new Date().toLocaleString("es-CO")

    };


    reservations.push(reservation);


    localStorage.setItem(
        "cinemaxReservations",
        JSON.stringify(reservations)
    );


    updateConfirmationModal(
        reservation
    );


    confirmationModal.style.display =
        "flex";


    selectedSeats = [];


    createSeatMap();

    updateSeatSummary();

    renderTickets();

    updateReservationBadge();

}


/* =========================================================
   25. GENERAR CÓDIGO
========================================================= */

function generateReservationCode() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    return `CMX-${random}`;

}


/* =========================================================
   26. MODAL DE CONFIRMACIÓN
========================================================= */

function updateConfirmationModal(
    reservation
) {

    setText(
        "confirmationMovie",
        reservation.movieTitle
    );


    setText(
        "confirmationDate",
        `${reservation.date} · ${reservation.time}`
    );


    setText(
        "confirmationRoom",
        reservation.room
    );


    setText(
        "confirmationSeats",
        reservation.seats.join(", ")
    );


    setText(
        "confirmationTotal",
        `$${reservation.total.toLocaleString("es-CO")}`
    );


    setText(
        "reservationCode",
        reservation.code
    );


    const poster =
        document.getElementById(
            "confirmationPoster"
        );


    if (poster) {

        poster.textContent =
            reservation.movieIcon;

    }

}


/* =========================================================
   27. MIS ENTRADAS
========================================================= */

function renderTickets() {

    if (!ticketsContainer) return;


    if (reservations.length === 0) {

        ticketsContainer.innerHTML = `

            <div class="empty-tickets">

                <div class="empty-ticket-icon">
                    🎟️
                </div>

                <h2>
                    No tienes entradas todavía
                </h2>

                <p>
                    Compra una entrada y aparecerá
                    aquí automáticamente.
                </p>

                <button
                    class="primary-button"
                    data-section-target="movies">

                    Explorar cartelera

                </button>

            </div>

        `;

        return;

    }


    ticketsContainer.innerHTML =
        reservations
            .slice()
            .reverse()
            .map(createTicketCard)
            .join("");

}


/* =========================================================
   28. TARJETA DE ENTRADA
========================================================= */

function createTicketCard(
    reservation
) {

    return `

        <article
            class="ticket-card">

            <div class="ticket-card-poster">
                ${reservation.movieIcon}
            </div>


            <div class="ticket-card-main">

                <div class="ticket-card-top">

                    <span>
                        RESERVA CONFIRMADA
                    </span>

                    <strong>
                        ${reservation.code}
                    </strong>

                </div>


                <h2>
                    ${reservation.movieTitle}
                </h2>


                <div class="ticket-card-details">

                    <div>

                        <small>
                            FECHA
                        </small>

                        <strong>
                            📅 ${reservation.date}
                        </strong>

                    </div>


                    <div>

                        <small>
                            HORA
                        </small>

                        <strong>
                            🕐 ${reservation.time}
                        </strong>

                    </div>


                    <div>

                        <small>
                            SALA
                        </small>

                        <strong>
                            🏢 ${reservation.room}
                        </strong>

                    </div>


                    <div>

                        <small>
                            ASIENTOS
                        </small>

                        <strong>
                            💺 ${reservation.seats.join(", ")}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="ticket-card-price">

                <small>
                    TOTAL
                </small>

                <strong>
                    $${reservation.total.toLocaleString("es-CO")}
                </strong>

                <button
                    class="delete-ticket"
                    data-delete-ticket="${reservation.id}">

                    Eliminar

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   29. ELIMINAR ENTRADA
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const deleteButton =
            event.target.closest(
                "[data-delete-ticket]"
            );


        if (!deleteButton) return;


        const id =
            Number(
                deleteButton.dataset.deleteTicket
            );


        reservations =
            reservations.filter(
                reservation =>
                    reservation.id !== id
            );


        localStorage.setItem(
            "cinemaxReservations",
            JSON.stringify(reservations)
        );


        renderTickets();

        updateReservationBadge();


        showToast(
            "Entrada eliminada",
            "La reserva se eliminó de tu historial."
        );

    }
);


/* =========================================================
   30. BADGE DE ENTRADAS
========================================================= */

function updateReservationBadge() {

    if (!ticketBadge) return;


    if (reservations.length === 0) {

        ticketBadge.style.display =
            "none";

    } else {

        ticketBadge.style.display =
            "inline-flex";

        ticketBadge.textContent =
            reservations.length;

    }

}


/* =========================================================
   31. NOTIFICACIONES
========================================================= */

function setupNotifications() {

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                notificationPanel.style.display =
                    notificationPanel.style.display ===
                    "none"
                        ? "block"
                        : "none";

            }
        );

    }


    if (closeNotifications) {

        closeNotifications.addEventListener(
            "click",
            function () {

                notificationPanel.style.display =
                    "none";

            }
        );

    }

}


/* =========================================================
   32. LOGOUT
========================================================= */

function setupLogout() {

    const logoutButtons = [

        document.getElementById(
            "sidebarLogout"
        ),

        document.getElementById(
            "cerrarSesion"
        )

    ];


    logoutButtons.forEach(button => {

        if (!button) return;


        button.addEventListener(
            "click",
            function () {

                logout();

            }
        );

    });

}


function logout() {

    currentUser = null;


    localStorage.removeItem(
        "cinemaxUser"
    );


    selectedSeats = [];


    if (loginForm) {

        loginForm.reset();

    }


    if (loginMessage) {

        loginMessage.textContent = "";

    }


    showLogin();


    showToast(
        "Sesión cerrada",
        "Has cerrado sesión correctamente."
    );

}


/* =========================================================
   33. MENÚ MÓVIL
========================================================= */

function setupMobileMenu() {

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!mobileMenu || !sidebar) return;


    mobileMenu.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


function closeSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );

    }

}


/* =========================================================
   34. PROMOCIÓN
========================================================= */

function setupPromotion() {

    const promotionButton =
        document.getElementById(
            "promotionButton"
        );


    if (promotionButton) {

        promotionButton.addEventListener(
            "click",
            function () {

                switchSection("movies");

            }
        );

    }

}


/* =========================================================
   35. TOAST
========================================================= */

function showToast(
    title,
    message
) {

    if (!toast) return;


    setText(
        "toastTitle",
        title
    );


    setText(
        "toastMessage",
        message
    );


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.cinemaxToastTimeout
    );


    window.cinemaxToastTimeout =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            4000
        );

}


const closeToast =
    document.getElementById(
        "closeToast"
    );


if (closeToast) {

    closeToast.addEventListener(
        "click",
        function () {

            toast.classList.remove(
                "show"
            );

        }
    );

}


/* =========================================================
   36. UTILIDAD PARA TEXTO
========================================================= */

function setText(
    id,
    text
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = text;

    }

}


/* =========================================================
   37. TECLA ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        if (movieModal) {

            movieModal.style.display =
                "none";

        }


        if (confirmationModal) {

            confirmationModal.style.display =
                "none";

        }


        if (notificationPanel) {

            notificationPanel.style.display =
                "none";

        }


        closeSidebar();

    }
);


/* =========================================================
   38. PREVENIR ERRORES DE FORMULARIOS
========================================================= */

document.addEventListener(
    "submit",
    function (event) {

        const form =
            event.target;


        if (
            form &&
            form.id !== "loginForm"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   39. EFECTO DE SCROLL EN TOPBAR
========================================================= */

const mainContent =
    document.querySelector(
        ".main-content"
    );


if (mainContent) {

    mainContent.addEventListener(
        "scroll",
        function () {

            const topbar =
                document.querySelector(
                    ".topbar"
                );


            if (!topbar) return;


            if (this.scrollTop > 20) {

                topbar.classList.add(
                    "scrolled"
                );

            } else {

                topbar.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* =========================================================
   40. FINAL
========================================================= */

console.log(
    "🎬 CineMax iniciado correctamente."
);

console.log(
    "👤 Usuario demo:",
    DEMO_EMAIL
);

console.log(
    "🔑 Contraseña demo:",
    DEMO_PASSWORD
);


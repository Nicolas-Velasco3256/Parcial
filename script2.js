document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // CONFIGURACIÓN
    // ==================================================

    const PRICE = 15000;
    const MAX_SEATS = 8;


    // ==================================================
    // DATOS DE PELÍCULAS
    // ==================================================

    const movies = [

        {
            id: "el-ultimo-viaje",
            title: "El Último Viaje",
            genre: "Acción",
            rating: "8.9",
            year: "2026",
            duration: "2h 08min",
            age: "+13",
            poster: "🚀",
            description:
                "Una aventura que llevará a nuestros protagonistas al límite. Una misión inesperada cambiará sus vidas para siempre.",
            featured: true,
            upcoming: false
        },

        {
            id: "sombras-de-noche",
            title: "Sombras de Noche",
            genre: "Terror",
            rating: "8.4",
            year: "2026",
            duration: "1h 52min",
            age: "+16",
            poster: "👻",
            description:
                "Una familia se muda a una antigua casa donde comienzan a ocurrir sucesos inexplicables.",
            upcoming: false
        },

        {
            id: "corazones-en-paris",
            title: "Corazones en París",
            genre: "Drama",
            rating: "8.7",
            year: "2026",
            duration: "2h 01min",
            age: "+13",
            poster: "🗼",
            description:
                "Dos personas se encuentran por casualidad en París y descubren que el amor puede aparecer cuando menos lo esperan.",
            upcoming: false
        },

        {
            id: "risas-de-verano",
            title: "Risas de Verano",
            genre: "Comedia",
            rating: "8.1",
            year: "2026",
            duration: "1h 45min",
            age: "+7",
            poster: "😂",
            description:
                "Un grupo de amigos emprende el viaje más desastroso y divertido de sus vidas.",
            upcoming: false
        },

        {
            id: "guardianes-del-tiempo",
            title: "Guardianes del Tiempo",
            genre: "Acción",
            rating: "9.1",
            year: "2026",
            duration: "2h 15min",
            age: "+13",
            poster: "⏳",
            description:
                "Un grupo de héroes debe proteger el pasado para evitar que el futuro desaparezca.",
            upcoming: false
        },

        {
            id: "mundo-de-colores",
            title: "Mundo de Colores",
            genre: "Animación",
            rating: "8.8",
            year: "2026",
            duration: "1h 38min",
            age: "Todos",
            poster: "🌈",
            description:
                "Una aventura animada llena de amistad, magia y personajes inolvidables.",
            upcoming: false
        },

        {
            id: "el-ultimo-reino",
            title: "El Último Reino",
            genre: "Acción",
            rating: "8.6",
            year: "2026",
            duration: "2h 20min",
            age: "+16",
            poster: "⚔️",
            description:
                "Un guerrero deberá regresar a su reino para enfrentarse al enemigo que destruyó su hogar.",
            upcoming: false
        },

        {
            id: "codigo-cero",
            title: "Código Cero",
            genre: "Drama",
            rating: "8.3",
            year: "2026",
            duration: "1h 57min",
            age: "+13",
            poster: "💻",
            description:
                "Un programador descubre información que puede cambiar el mundo y debe decidir qué hacer con ella.",
            upcoming: false
        },

        {
            id: "aventura-galactica",
            title: "Aventura Galáctica",
            genre: "Animación",
            rating: "9.0",
            year: "2027",
            duration: "1h 49min",
            age: "Todos",
            poster: "🌌",
            description:
                "Una nueva aventura intergaláctica llegará próximamente a CineMax.",
            upcoming: true
        },

        {
            id: "la-gran-mision",
            title: "La Gran Misión",
            genre: "Acción",
            rating: "8.8",
            year: "2027",
            duration: "2h 05min",
            age: "+13",
            poster: "🎯",
            description:
                "Una misión imposible pondrá a prueba a un equipo de especialistas.",
            upcoming: true
        }

    ];


    // ==================================================
    // ESTADO
    // ==================================================

    let selectedMovie = null;

    let selectedDate = null;

    let selectedTime = null;

    let selectedSeats = [];

    let currentGenre = "all";


    // ==================================================
    // ELEMENTOS
    // ==================================================

    const sidebar = document.getElementById("sidebar");

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".page-section");

    const movieGrid =
        document.getElementById("movieGrid");

    const homeMovieGrid =
        document.getElementById("homeMovieGrid");

    const upcomingGrid =
        document.getElementById("upcomingGrid");

    const movieSearch =
        document.getElementById("movieSearch");

    const globalSearch =
        document.getElementById("globalSearch");

    const movieEmpty =
        document.getElementById("movieEmpty");


    // ==================================================
    // COMPROBAR SESIÓN
    // ==================================================

    const session =
        localStorage.getItem("cinemax_session");


    if (!session) {

        window.location.href = "index.html";

        return;

    }


    let currentUser;

    try {

        currentUser = JSON.parse(session);

    } catch {

        localStorage.removeItem("cinemax_session");

        window.location.href = "index.html";

        return;

    }


    // ==================================================
    // MOSTRAR DATOS DEL USUARIO
    // ==================================================

    const welcomeName =
        document.getElementById("welcomeName");

    const topUserName =
        document.getElementById("topUserName");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileNameInput =
        document.getElementById("profileNameInput");

    const profileEmailInput =
        document.getElementById("profileEmailInput");


    const userName =
        currentUser.name || "Nicolas";

    const userEmail =
        currentUser.email || "cine@cinemax.com";


    welcomeName.textContent = userName;

    topUserName.textContent = userName;

    profileName.textContent = userName;

    profileEmail.textContent = userEmail;

    profileNameInput.value = userName;

    profileEmailInput.value = userEmail;


    // ==================================================
    // NAVEGACIÓN
    // ==================================================

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            showSection(section);

            sidebar.classList.remove("sidebar-open");

        });

    });


    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.section;

                showSection(section);

            });

        });


    function showSection(sectionId) {

        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const selectedSection =
            document.getElementById(sectionId);


        if (selectedSection) {

            selectedSection.classList.add(
                "active-section"
            );

        }


        navItems.forEach(item => {

            item.classList.remove("active");


            if (
                item.dataset.section === sectionId
            ) {

                item.classList.add("active");

            }

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (sectionId === "tickets") {

            renderTickets();

        }

    }


    // ==================================================
    // MENÚ MÓVIL
    // ==================================================

    const mobileMenu =
        document.getElementById("mobileMenu");


    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle(
            "sidebar-open"
        );

    });


    // ==================================================
    // RENDERIZAR PELÍCULA
    // ==================================================

    function movieCard(movie) {

        return `

            <article
                class="movie-card"
                data-movie-id="${movie.id}"
            >

                <div class="movie-poster">

                    <span class="poster-emoji">
                        ${movie.poster}
                    </span>

                    <span class="movie-rating">
                        ⭐ ${movie.rating}
                    </span>

                    <span class="movie-age">
                        ${movie.age}
                    </span>

                </div>


                <div class="movie-card-content">

                    <span class="movie-genre">
                        ${movie.genre}
                    </span>

                    <h3>
                        ${movie.title}
                    </h3>


                    <div class="movie-details">

                        <span>
                            ${movie.year}
                        </span>

                        <span>
                            ${movie.duration}
                        </span>

                    </div>


                    <div class="movie-card-actions">

                        <button
                            class="details-button"
                            data-action="details"
                            data-id="${movie.id}"
                        >
                            Ver detalles
                        </button>

                        <button
                            class="book-small-button"
                            data-action="book"
                            data-id="${movie.id}"
                        >
                            🎟️
                        </button>

                    </div>

                </div>

            </article>

        `;

    }


    // ==================================================
    // HOME
    // ==================================================

    function renderHomeMovies() {

        const normalMovies =
            movies
                .filter(movie => !movie.upcoming)
                .slice(0, 6);


        homeMovieGrid.innerHTML =
            normalMovies
                .map(movieCard)
                .join("");


        const upcomingMovies =
            movies
                .filter(movie => movie.upcoming);


        upcomingGrid.innerHTML =
            upcomingMovies
                .map(movieCard)
                .join("");

    }


    // ==================================================
    // TODAS LAS PELÍCULAS
    // ==================================================

    function renderMovies() {

        const search =
            movieSearch.value
                .trim()
                .toLowerCase();


        const filtered =
            movies.filter(movie => {

                const matchesSearch =
                    movie.title
                        .toLowerCase()
                        .includes(search);


                const matchesGenre =
                    currentGenre === "all" ||
                    movie.genre === currentGenre;


                return matchesSearch &&
                    matchesGenre &&
                    !movie.upcoming;

            });


        movieGrid.innerHTML =
            filtered
                .map(movieCard)
                .join("");


        movieEmpty.classList.toggle(
            "hidden",
            filtered.length !== 0
        );

    }


    renderHomeMovies();

    renderMovies();


    // ==================================================
    // BÚSQUEDA
    // ==================================================

    movieSearch.addEventListener(
        "input",
        renderMovies
    );


    globalSearch.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }


            const value =
                globalSearch.value.trim();


            showSection("movies");


            movieSearch.value = value;

            renderMovies();

        }
    );


    // ==================================================
    // FILTROS DE GÉNERO
    // ==================================================

    document
        .querySelectorAll(".genre-filter")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".genre-filter"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    currentGenre =
                        button.dataset.genre;


                    renderMovies();

                }
            );

        });


    // ==================================================
    // BOTONES DE PELÍCULAS
    // ==================================================

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) {
                return;
            }


            const movie =
                movies.find(
                    movie =>
                        movie.id ===
                        button.dataset.id
                );


            if (!movie) {
                return;
            }


            if (
                button.dataset.action ===
                "details"
            ) {

                openMovieModal(movie);

            }


            if (
                button.dataset.action ===
                "book"
            ) {

                openBooking(movie);

            }

        }
    );


    // ==================================================
    // MODAL PELÍCULA
    // ==================================================

    const movieModal =
        document.getElementById("movieModal");

    const closeMovieModal =
        document.getElementById(
            "closeMovieModal"
        );


    function openMovieModal(movie) {

        selectedMovie = movie;


        document.getElementById(
            "modalPoster"
        ).textContent = movie.poster;


        document.getElementById(
            "modalGenre"
        ).textContent = movie.genre;


        document.getElementById(
            "modalTitle"
        ).textContent = movie.title;


        document.getElementById(
            "modalRating"
        ).textContent =
            `⭐ ${movie.rating}`;


        document.getElementById(
            "modalDuration"
        ).textContent =
            movie.duration;


        document.getElementById(
            "modalYear"
        ).textContent =
            movie.year;


        document.getElementById(
            "modalAge"
        ).textContent =
            movie.age;


        document.getElementById(
            "modalDescription"
        ).textContent =
            movie.description;


        movieModal.classList.add("show");

    }


    closeMovieModal.addEventListener(
        "click",
        () => {

            movieModal.classList.remove(
                "show"
            );

        }
    );


    document
        .getElementById("modalBookButton")
        .addEventListener(
            "click",
            () => {

                movieModal.classList.remove(
                    "show"
                );


                if (selectedMovie) {

                    openBooking(
                        selectedMovie
                    );

                }

            }
        );


    // ==================================================
    // HERO
    // ==================================================

    document
        .getElementById("heroBookButton")
        .addEventListener(
            "click",
            () => {

                const movie =
                    movies.find(
                        movie =>
                            movie.id ===
                            "el-ultimo-viaje"
                    );


                openBooking(movie);

            }
        );


    // ==================================================
    // ABRIR RESERVA
    // ==================================================

    function openBooking(movie) {

        selectedMovie = movie;

        selectedDate = null;

        selectedTime = null;

        selectedSeats = [];


        showSection("bookingSection");


        document.getElementById(
            "bookingPoster"
        ).textContent =
            movie.poster;


        document.getElementById(
            "bookingGenre"
        ).textContent =
            movie.genre;


        document.getElementById(
            "bookingMovieTitle"
        ).textContent =
            movie.title;


        document.getElementById(
            "summaryPoster"
        ).textContent =
            movie.poster;


        document.getElementById(
            "summaryMovieTitle"
        ).textContent =
            movie.title;


        document.getElementById(
            "summaryDate"
        ).textContent =
            "Selecciona una fecha";


        document.getElementById(
            "summaryTime"
        ).textContent =
            "Selecciona un horario";


        document.getElementById(
            "bookingRoom"
        ).textContent =
            "Sala 1";


        document.getElementById(
            "summaryRoom"
        ).textContent =
            "Sala 1";


        renderDates();

        renderTimes();

        renderSeats();

        updateSummary();

    }


    // ==================================================
    // FECHAS
    // ==================================================

    function getDates() {

        const dates = [];

        const today =
            new Date();


        for (let i = 0; i < 7; i++) {

            const date =
                new Date(today);


            date.setDate(
                today.getDate() + i
            );


            dates.push(date);

        }


        return dates;

    }


    function renderDates() {

        const container =
            document.getElementById(
                "dateOptions"
            );


        container.innerHTML = "";


        getDates().forEach(
            (date, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "date-button";


                const dayNames = [
                    "DOM",
                    "LUN",
                    "MAR",
                    "MIÉ",
                    "JUE",
                    "VIE",
                    "SÁB"
                ];


                button.innerHTML = `

                    <span>
                        ${index === 0
                            ? "HOY"
                            : dayNames[
                                date.getDay()
                              ]}
                    </span>

                    <strong>
                        ${date.getDate()}
                    </strong>

                    <small>
                        ${date.toLocaleDateString(
                            "es-CO",
                            {
                                month: "short"
                            }
                        )}
                    </small>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".date-button"
                            )
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


                        button.classList.add(
                            "active"
                        );


                        selectedDate =
                            date;


                        selectedSeats = [];


                        renderSeats();

                        updateSummary();

                    }
                );


                container.appendChild(
                    button
                );

            }
        );

    }


    // ==================================================
    // HORARIOS
    // ==================================================

    function renderTimes() {

        const container =
            document.getElementById(
                "timeOptions"
            );


        container.innerHTML = "";


        const times = [
            "1:30 PM",
            "3:45 PM",
            "5:30 PM",
            "7:15 PM",
            "9:30 PM"
        ];


        times.forEach(time => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "time-button";


            button.textContent =
                time;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".time-button"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    selectedTime =
                        time;


                    selectedSeats = [];


                    renderSeats();

                    updateSummary();

                }
            );


            container.appendChild(
                button
            );

        });

    }


    // ==================================================
    // ASIENTOS
    // ==================================================

    function getOccupiedSeats() {

        const occupied = new Set();


        // Algunos asientos ocupados inicialmente
        const defaultOccupied = [
            "A3",
            "A4",
            "B5",
            "B6",
            "C2",
            "C3",
            "D7",
            "D8",
            "E4",
            "F6"
        ];


        defaultOccupied.forEach(
            seat =>
                occupied.add(seat)
        );


        // Reservas anteriores
        const tickets =
            getTickets();


        tickets.forEach(ticket => {

            if (
                ticket.movieId ===
                selectedMovie?.id &&
                ticket.dateKey ===
                formatDateKey(selectedDate) &&
                ticket.time ===
                selectedTime
            ) {

                ticket.seats.forEach(
                    seat =>
                        occupied.add(seat)
                );

            }

        });


        return occupied;

    }


    function renderSeats() {

        const seatMap =
            document.getElementById(
                "seatMap"
            );


        seatMap.innerHTML = "";


        const rows =
            ["A", "B", "C", "D", "E", "F"];


        const occupied =
            getOccupiedSeats();


        rows.forEach(row => {

            const rowElement =
                document.createElement(
                    "div"
                );


            rowElement.className =
                "seat-row";


            const rowLabel =
                document.createElement(
                    "span"
                );


            rowLabel.className =
                "row-label";


            rowLabel.textContent =
                row;


            rowElement.appendChild(
                rowLabel
            );


            for (
                let number = 1;
                number <= 10;
                number++
            ) {

                const seatId =
                    `${row}${number}`;


                const seat =
                    document.createElement(
                        "button"
                    );


                seat.type = "button";

                seat.className =
                    "seat";


                seat.textContent =
                    number;


                seat.dataset.seat =
                    seatId;


                // Asientos premium
                if (
                    row === "E" ||
                    row === "F"
                ) {

                    seat.classList.add(
                        "premium"
                    );

                }


                // Ocupado
                if (
                    occupied.has(seatId)
                ) {

                    seat.classList.add(
                        "occupied"
                    );

                    seat.disabled = true;

                }


                // Seleccionado
                if (
                    selectedSeats.includes(
                        seatId
                    )
                ) {

                    seat.classList.add(
                        "selected"
                    );

                }


                seat.addEventListener(
                    "click",
                    () => {

                        toggleSeat(
                            seatId,
                            seat
                        );

                    }
                );


                rowElement.appendChild(
                    seat
                );

            }


            seatMap.appendChild(
                rowElement
            );

        });

    }


    function toggleSeat(
        seatId,
        seatElement
    ) {

        if (
            selectedSeats.includes(
                seatId
            )
        ) {

            selectedSeats =
                selectedSeats.filter(
                    seat =>
                        seat !== seatId
                );


            seatElement.classList.remove(
                "selected"
            );


        } else {

            if (
                selectedSeats.length >=
                MAX_SEATS
            ) {

                showToast(
                    "Límite alcanzado",
                    `Puedes seleccionar máximo ${MAX_SEATS} asientos.`
                );

                return;

            }


            selectedSeats.push(
                seatId
            );


            seatElement.classList.add(
                "selected"
            );

        }


        updateSummary();

    }


    // ==================================================
    // RESUMEN
    // ==================================================

    function updateSummary() {

        const ticketCount =
            document.getElementById(
                "summaryTicketCount"
            );


        const selectedSeatsElement =
            document.getElementById(
                "selectedSeats"
            );


        const totalElement =
            document.getElementById(
                "summaryTotal"
            );


        ticketCount.textContent =
            selectedSeats.length;


        selectedSeatsElement.textContent =
            selectedSeats.length
                ? selectedSeats.join(", ")
                : "—";


        totalElement.textContent =
            formatMoney(
                selectedSeats.length *
                PRICE
            );


        const summaryDate =
            document.getElementById(
                "summaryDate"
            );


        const summaryTime =
            document.getElementById(
                "summaryTime"
            );


        if (selectedDate) {

            summaryDate.textContent =
                formatDateLong(
                    selectedDate
                );

        }


        if (selectedTime) {

            summaryTime.textContent =
                selectedTime;

        }

    }


    // ==================================================
    // VOLVER
    // ==================================================

    document
        .getElementById("backToMovies")
        .addEventListener(
            "click",
            () => {

                showSection("movies");

            }
        );


    // ==================================================
    // CONFIRMAR RESERVA
    // ==================================================

    document
        .getElementById("confirmBooking")
        .addEventListener(
            "click",
            () => {

                if (!selectedMovie) {

                    showToast(
                        "Error",
                        "No has seleccionado una película."
                    );

                    return;

                }


                if (!selectedDate) {

                    showToast(
                        "Selecciona una fecha",
                        "Debes seleccionar el día de la función."
                    );

                    return;

                }


                if (!selectedTime) {

                    showToast(
                        "Selecciona un horario",
                        "Debes seleccionar el horario."
                    );

                    return;

                }


                if (
                    selectedSeats.length === 0
                ) {

                    showToast(
                        "Selecciona tus asientos",
                        "Debes elegir al menos un asiento."
                    );

                    return;

                }


                const code =
                    generateReservationCode();


                const ticket = {

                    id:
                        Date.now(),

                    code:
                        code,

                    movieId:
                        selectedMovie.id,

                    movie:
                        selectedMovie.title,

                    poster:
                        selectedMovie.poster,

                    genre:
                        selectedMovie.genre,

                    date:
                        formatDateLong(
                            selectedDate
                        ),

                    dateKey:
                        formatDateKey(
                            selectedDate
                        ),

                    time:
                        selectedTime,

                    room:
                        "Sala 1",

                    seats:
                        [...selectedSeats],

                    total:
                        selectedSeats.length *
                        PRICE,

                    createdAt:
                        new Date().toISOString()

                };


                const tickets =
                    getTickets();


                tickets.push(ticket);


                localStorage.setItem(
                    "cinemax_tickets",
                    JSON.stringify(tickets)
                );


                showConfirmation(
                    ticket
                );


                selectedSeats = [];

            }
        );


    // ==================================================
    // CONFIRMACIÓN
    // ==================================================

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    function showConfirmation(ticket) {

        document.getElementById(
            "confirmationPoster"
        ).textContent =
            ticket.poster;


        document.getElementById(
            "confirmationMovie"
        ).textContent =
            ticket.movie;


        document.getElementById(
            "confirmationDate"
        ).textContent =
            ticket.date;


        document.getElementById(
            "confirmationRoom"
        ).textContent =
            ticket.room;


        document.getElementById(
            "confirmationSeats"
        ).textContent =
            "Asientos: " +
            ticket.seats.join(", ");


        document.getElementById(
            "reservationCode"
        ).textContent =
            ticket.code;


        document.getElementById(
            "confirmationTotal"
        ).textContent =
            formatMoney(
                ticket.total
            );


        confirmationModal.classList.add(
            "show"
        );

    }


    document
        .getElementById("closeConfirmation")
        .addEventListener(
            "click",
            () => {

                confirmationModal.classList.remove(
                    "show"
                );


                renderSeats();

                updateSummary();

            }
        );


    document
        .getElementById("viewTickets")
        .addEventListener(
            "click",
            () => {

                confirmationModal.classList.remove(
                    "show"
                );


                renderTickets();

                showSection(
                    "tickets"
                );

            }
        );


    // ==================================================
    // TICKETS
    // ==================================================

    function getTickets() {

        const data =
            localStorage.getItem(
                "cinemax_tickets"
            );


        if (!data) {
            return [];
        }


        try {

            return JSON.parse(data);

        } catch {

            return [];

        }

    }


    function renderTickets() {

        const container =
            document.getElementById(
                "ticketsContainer"
            );


        const tickets =
            getTickets();


        if (tickets.length === 0) {

            container.innerHTML = `

                <div class="tickets-empty">

                    <span>🎟️</span>

                    <h2>
                        Todavía no tienes entradas
                    </h2>

                    <p>
                        Reserva una película para verla aparecer aquí.
                    </p>

                    <button
                        class="primary-button"
                        id="goToMoviesButton"
                    >
                        Explorar películas
                    </button>

                </div>

            `;


            document
                .getElementById(
                    "goToMoviesButton"
                )
                .addEventListener(
                    "click",
                    () => {

                        showSection(
                            "movies"
                        );

                    }
                );


            return;

        }


        container.innerHTML =
            tickets
                .slice()
                .reverse()
                .map(ticket => `

                    <article class="ticket-card">

                        <div class="ticket-poster">

                            ${ticket.poster}

                        </div>


                        <div class="ticket-main">

                            <span class="movie-genre">
                                ${ticket.genre}
                            </span>

                            <h3>
                                ${ticket.movie}
                            </h3>


                            <div class="ticket-info">

                                <span>
                                    📅 ${ticket.date}
                                </span>

                                <span>
                                    🕐 ${ticket.time}
                                </span>

                                <span>
                                    🎦 ${ticket.room}
                                </span>

                            </div>


                            <div class="ticket-seats">

                                <strong>
                                    Asientos:
                                </strong>

                                ${ticket.seats.join(", ")}

                            </div>

                        </div>


                        <div class="ticket-side">

                            <span>
                                CÓDIGO
                            </span>

                            <strong>
                                ${ticket.code}
                            </strong>

                            <small>
                                ${formatMoney(
                                    ticket.total
                                )}
                            </small>

                        </div>

                    </article>

                `)
                .join("");

    }


    // ==================================================
    // PERFIL
    // ==================================================

    document
        .getElementById("saveProfile")
        .addEventListener(
            "click",
            () => {

                const newName =
                    profileNameInput.value.trim();


                const newEmail =
                    profileEmailInput.value
                        .trim()
                        .toLowerCase();


                if (!newName || !newEmail) {

                    showToast(
                        "Datos incompletos",
                        "Completa todos los campos."
                    );

                    return;

                }


                currentUser.name =
                    newName;


                currentUser.email =
                    newEmail;


                localStorage.setItem(
                    "cinemax_session",
                    JSON.stringify(
                        currentUser
                    )
                );


                welcomeName.textContent =
                    newName;


                topUserName.textContent =
                    newName;


                profileName.textContent =
                    newName;


                profileEmail.textContent =
                    newEmail;


                showToast(
                    "Perfil actualizado",
                    "Tus datos se guardaron correctamente."
                );

            }
        );


    // ==================================================
    // CERRAR SESIÓN
    // ==================================================

    document
        .getElementById("sidebarLogout")
        .addEventListener(
            "click",
            () => {

                const confirmLogout =
                    confirm(
                        "¿Seguro que quieres cerrar sesión?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "cinemax_session"
                );


                window.location.href =
                    "index.html";

            }
        );


    // ==================================================
    // NOTIFICACIONES
    // ==================================================

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );


    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );


    notificationButton.addEventListener(
        "click",
        () => {

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    closeNotifications.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );


    // ==================================================
    // TOAST
    // ==================================================

    const toast =
        document.getElementById("toast");


    const closeToast =
        document.getElementById(
            "closeToast"
        );


    function showToast(
        title,
        message
    ) {

        document.getElementById(
            "toastTitle"
        ).textContent =
            title;


        document.getElementById(
            "toastMessage"
        ).textContent =
            message;


        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 4500);

    }


    closeToast.addEventListener(
        "click",
        () => {

            toast.classList.remove(
                "show"
            );

        }
    );


    // ==================================================
    // CERRAR MODALES HACIENDO CLICK AFUERA
    // ==================================================

    window.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                movieModal
            ) {

                movieModal.classList.remove(
                    "show"
                );

            }


            if (
                event.target ===
                confirmationModal
            ) {

                confirmationModal.classList.remove(
                    "show"
                );

            }

        }
    );


    // ==================================================
    // ESCAPE
    // ==================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                movieModal.classList.remove(
                    "show"
                );


                confirmationModal.classList.remove(
                    "show"
                );


                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    // ==================================================
    // FUNCIONES AUXILIARES
    // ==================================================

    function formatMoney(value) {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        ).format(value);

    }


    function formatDateKey(date) {

        if (!date) {
            return "";
        }


        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    function formatDateLong(date) {

        if (!date) {
            return "—";
        }


        return date.toLocaleDateString(
            "es-CO",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }


    function generateReservationCode() {

        const letters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


        let code =
            "CMX-";


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            code +=
                letters[
                    Math.floor(
                        Math.random() *
                        letters.length
                    )
                ];

        }


        code += "-";


        code +=
            Math.floor(
                1000 +
                Math.random() *
                9000
            );


        return code;

    }


    // ==================================================
    // INICIALIZACIÓN
    // ==================================================

    renderTickets();

});
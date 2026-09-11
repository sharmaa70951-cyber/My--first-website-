const ACCESS_TOKEN = 9337b42f49166a7db60c29bb99b03fb5

const searchInput = document.getElementById("searchInput");
const movieContainer = document.querySelector(".movie-container");
const noResults = document.getElementById("noResults");

let timer;

searchInput.addEventListener("input", () => {
    clearTimeout(timer);

    const query = searchInput.value.trim();

    if (!query) {
        movieContainer.innerHTML = "";
        noResults.style.display = "none";
        return;
    }

    timer = setTimeout(() => {
        searchMovies(query);
    }, 400);
});

async function searchMovies(query) {
    try {
        movieContainer.innerHTML =
            `<p style="text-align:center;">🔎 Search हो रहा है...</p>`;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=hi-IN&include_adult=false`,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const results = data.results.filter(
            item => item.media_type === "movie" || item.media_type === "tv"
        );

        displayMovies(results);

    } catch (error) {
        console.error(error);

        movieContainer.innerHTML =
            `<p style="text-align:center;">
                ❌ API से data नहीं आया।<br>
                Console में error check करें।
            </p>`;
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = "";

    if (movies.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    movies.forEach(movie => {
        const title = movie.title || movie.name || "Unknown";
        const date = movie.release_date || movie.first_air_date || "";
        const year = date ? date.substring(0, 4) : "N/A";

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster";

        const rating = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "N/A";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${poster}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>

                <p class="details">
                    ${year} • ${movie.media_type === "tv" ? "TV" : "Movie"}
                </p>

                <p class="rating">
                    ⭐ ${rating}/10
                </p>

                <a
                    href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}"
                    target="_blank"
                    class="trailer-btn">
                    ▶ Watch Trailer
                </a>
            </div>
        `;

        movieContainer.appendChild(card);
    });
}

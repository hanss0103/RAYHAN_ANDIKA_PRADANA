

document.addEventListener('DOMContentLoaded', function () {
    const minta = localStorage.getItem('searchMinta'); // Mengambil permintaan Pencarian dari localStorage
    if (minta) {
        document.getElementById('searchInput').value = minta;
        searchAnime(minta);
    }
    // Menambahkan event untuk form dengan id='searchForm' untuk menangani event submit.
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); //Mencegah form dari pengiriman default.
        const newMinta = document.getElementById('searchInput').value;
        localStorage.setItem('searchMinta', newMinta);
        searchAnime(newMinta); // memulai pencarian anime 
    });
});

// Mengirimkan permintaan GET ke API Jikan untuk mencari anime berdasarkan permintaan 
function searchAnime(minta) {
    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(minta)}`) 
        .then(response => response.json())
        .then(data => {
            const filteredAnime = data.data.filter(anime => {
                const rating = anime.rating;
                return rating !== 'R+ - Mild Nudity' && rating !== 'Rx - Hentai';
                // Memfilter hasil pencarian untuk mengecualikan anime dengan rating 'R+ - Mild Nudity' dan 'Rx - Hentai'
            });
            displayResults(filteredAnime); // menampilkan hasil pencarian.
        })
        .catch(error => console.error('Error:', error));
}

// Menghapus semua elemen anak dari elemen id results untuk membersihkan hasil pencarian sebelumnya.
function clearResults() {
    const container = document.getElementById('results');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Menampilkan Hasil Pencarian
function displayResults(animeList) {
    const container = document.getElementById('results');
    clearResults(); // membersihkan results / hasil sebelumnya

    animeList.map(anime => {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');
        img.src = anime.images.jpg.image_url;
        const judul = document.createElement('h4');
        judul.innerText = anime.title;
        judul.style.cursor = "pointer";
        judul.addEventListener('click', () => {
            // Tampilkan detail anime
            detail.style.display = 'block';
            // Simpan data anime ke localStorage saat judul diklik
            localStorage.setItem('pilihAnime', JSON.stringify(anime)); // menyimpan data secara lokal di komputer pengguna dalam bentuk key-value pairs.
            window.location.href = "../HTML/detail.html";         // mengubah objek a (yang berisi data anime) menjadi string JSON.
        });
        const an = document.createElement('a');
        an.setAttribute('href', `../HTML/trailer.html?id=${anime.mal_id}`);
        an.innerText = "Watch Trailer";
        const a = document.createElement('a');
        a.setAttribute('href', anime.url);
        const detail = document.createElement('div');
        detail.style.display = 'none'; // Sembunyikan detail anime pada awalnya

        const type = document.createElement('h4');
        type.innerText = 'Type : ' + anime.type;
        const status = document.createElement('h4');
        status.innerText = 'Status : ' + anime.status;
        const score = document.createElement('h4');
        score.innerText = 'Score : ' + anime.score;
        const producer = document.createElement('h4');
        producer.innerText = 'Producer : ' + anime.producers.map(prod => prod.name).join(', ');
        const episodes = document.createElement('h4');
        episodes.innerText = 'Total Episodes : ' + anime.episodes;
        const duration = document.createElement('h4');
        duration.innerText = 'Duration : ' + anime.duration;
        const genres = document.createElement('h4');
        genres.innerText = 'Genres : ' + anime.genres.map(genre => genre.name).join(', ');
        const sinopsis = document.createElement('p');
        sinopsis.innerText = 'Synopsis : ' + anime.synopsis;

        detail.appendChild(score);
        detail.appendChild(producer);
        detail.appendChild(episodes);
        detail.appendChild(duration);
        detail.appendChild(sinopsis);
        detail.appendChild(genres);
        figcaption.appendChild(an);
        figcaption.appendChild(judul);
        figure.appendChild(a);
        a.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(detail);
        container.appendChild(figure);
    });
};

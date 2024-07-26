

// Event listener untuk menghapus riwayat pencarian ketika halaman di-reload
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchInput').value = ''; // Membersihkan input form
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const minta = document.getElementById('searchInput').value;
    localStorage.setItem('searchMinta', minta);
    window.location.href = 'search.html';
});



// API UNTUK SEASON SEKARANG
const seasonNow = 'https://api.jikan.moe/v4/seasons/now';

fetch(seasonNow) // Mengirimkan permintaan GET ke URL yang diberikan.
    .then((response) => response.json())
    .then((res) => {
        const p = res.data;
        console.log(res);
        p.map((a) => {
            const season = document.querySelector('.season');
            const figure = document.createElement('figure');
            const figcaption = document.createElement('figcaption');
            const img = document.createElement('img');
            img.setAttribute('src', a.images.jpg.image_url);
            const judul = document.createElement('h4');
            judul.innerText = a.titles[0].title;
            judul.style.cursor = "pointer";
            // Ketika judul diklik, data anime disimpan di localStorage
            judul.addEventListener('click', () => {
                // Tampilkan detail anime
                detail.style.display = 'block';
                // Simpan data anime ke localStorage saat judul diklik
                localStorage.setItem('pilihAnime', JSON.stringify(a)); // menyimpan data secara lokal di komputer pengguna dalam bentuk key-value pairs.
                window.location.href = "../HTML/detail.html";         // mengubah objek a (yang berisi data anime) menjadi string JSON.
            });
            const an = document.createElement('a');
            an.setAttribute('href', `../HTML/trailer.html?id=${a.mal_id}`);
            an.innerText = "Watch Trailer";
            an.addEventListener('click', () => {
                localStorage.setItem('api', JSON.stringify(a.mal_id));
            });
            const an1 = document.createElement('a');
            an1.setAttribute('href', a.url);
            const detail = document.createElement('div');
            detail.style.display = 'none'; // Sembunyikan detail anime pada awalnya
            const type = document.createElement('h4');
            type.innerText = 'Type : ' + a.type;
            const status = document.createElement('h4');
            status.innerText = 'Status : ' + a.status;
            const score = document.createElement('h4');
            score.innerText = 'Score : ' + a.score;
            const producer = document.createElement('h4');
            producer.innerText = 'Producer : ' + a.producers.map(prod => prod.name).join(', ');
            const episodes = document.createElement('h4');
            episodes.innerText = 'Total Episodes : ' + a.episodes;
            const duration = document.createElement('h4');
            duration.innerText = 'Duration : ' + a.duration;
            const genres = document.createElement('h4');
            genres.innerText = 'Genres : ' + a.genres.map(genre => genre.name).join(', ');
            const sinopsis = document.createElement('p');
            sinopsis.innerText = 'Synopsis : ' + a.synopsis;

            detail.appendChild(score);
            detail.appendChild(producer);
            detail.appendChild(episodes);
            detail.appendChild(duration);
            detail.appendChild(sinopsis);
            detail.appendChild(genres);
            figcaption.appendChild(an);
            figcaption.appendChild(judul);
            figure.appendChild(an1);
            an1.appendChild(img);
            figure.appendChild(figcaption);
            figcaption.appendChild(detail);
            season.appendChild(figure);
        })
    });
//--------------------------------------------------



// API UNTUK RECOMENDED
// API INI HANYA UNTUK MENAMPILKAN REKOMENDASI ANIME YANG AKAN MENGARAH LANGSUNG KE WEB MAL
const recom = 'https://api.jikan.moe/v4/recommendations/anime';

fetch(recom) // Mengirimkan permintaan GET ke URL yang diberikan.
    .then((response) => response.json())
    .then((res) => {
        const p = res.data;
        console.log(res);
        p.forEach((recommendation, index) => {
            const recomend = document.querySelector('.recomend');
            recommendation.entry.forEach((entry, entryIndex) => {  // digunakan untuk mendapatkan indeks dari setiap entry dalam rekomendasi.
                const figure = document.createElement('figure');
                const figcaption = document.createElement('figcaption');
                const img = document.createElement('img');
                img.setAttribute('src', entry.images.jpg.image_url);
                const judul = document.createElement('h4');
                judul.innerText = entry.title;
                const a = document.createElement('a');
                a.setAttribute('href', entry.url);

                figure.appendChild(a);
                a.appendChild(img);
                a.appendChild(figcaption);
                figcaption.appendChild(judul);
                recomend.appendChild(figure);
            });
        });
    });
//--------------------------------------------------



// API UNTUK ANIME UPCOMING
const upcoming = 'https://api.jikan.moe/v4/seasons/upcoming';

fetch(upcoming)
    .then((response) => response.json())
    .then((res) => {
        const p = res.data;
        console.log(res);
        p.map((c) => {
            const upcom = document.querySelector('.upcoming');
            const figure = document.createElement('figure');
            const figcaption = document.createElement('figcaption');
            const img = document.createElement('img');
            img.setAttribute('src', c.images.jpg.image_url);
            const judul = document.createElement('h4');
            judul.innerText = c.titles[0].title;
            judul.style.cursor = "pointer";
            // Ketika judul diklik, data anime disimpan di localStorage
            judul.addEventListener('click', () => {
                // Tampilkan detail anime
                detail.style.display = 'block';
                // Simpan data anime ke localStorage saat judul diklik
                localStorage.setItem('pilihAnime', JSON.stringify(c)); // menyimpan data secara lokal di komputer pengguna dalam bentuk key-value pairs.
                window.location.href = "../HTML/detail.html";         // mengubah objek a (yang berisi data anime) menjadi string JSON.
            });
            const an = document.createElement('a');
            an.setAttribute('href', `../HTML/trailer.html?id=${c.mal_id}`);
            an.innerText = "Watch Trailer";
            const a = document.createElement('a');
            a.setAttribute('href', c.url);
            const detail = document.createElement('div');
            detail.style.display = 'none'; // Sembunyikan detail anime pada awalnya

            const type = document.createElement('h4');
            type.innerText = 'Type : ' + c.type;
            const status = document.createElement('h4');
            status.innerText = 'Status : ' + c.status;
            const score = document.createElement('h4');
            score.innerText = 'Score : ' + c.score;
            const producer = document.createElement('h4');
            producer.innerText = 'Producer : ' + c.producers.map(prod => prod.name).join(', ');
            const episodes = document.createElement('h4');
            episodes.innerText = 'Total Episodes : ' + c.episodes;
            const duration = document.createElement('h4');
            duration.innerText = 'Duration : ' + c.duration;
            const genres = document.createElement('h4');
            genres.innerText = 'Genres : ' + c.genres.map(genre => genre.name).join(', ');
            const sinopsis = document.createElement('p');
            sinopsis.innerText = 'Synopsis : ' + c.synopsis;

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
            upcom.appendChild(figure);
        });
    });

// -----------------------------------------------------



// API UNTUK TOP ANIME

const topp = 'https://api.jikan.moe/v4/top/anime';

fetch(topp)
    .then((response) => response.json())
    .then((res) => {
        const p = res.data;
        console.log(res);
        const top = document.querySelector('.top');

        p.map((d, index) => {
            const figure = document.createElement('figure');
            const figcaption = document.createElement('figcaption');
            const img = document.createElement('img');
            img.setAttribute('src', d.images.jpg.image_url);

            const judul = document.createElement('h4');
            judul.innerText = `${index + 1}. ${d.titles[0].title}`; // Menampilkan urutan top anime dengan mengambil index dari data api
            judul.style.cursor = "pointer";

            // Ketika judul diklik, data anime disimpan di localStorage
            judul.addEventListener('click', () => {
                // Tampilkan detail anime
                detail.style.display = 'block';
                // Simpan data anime ke localStorage saat judul diklik
                localStorage.setItem('pilihAnime', JSON.stringify(d));
                window.location.href = "../HTML/detail.html";
            });

            const an = document.createElement('a');
            an.setAttribute('href', `../HTML/trailer.html?id=${d.mal_id}`);
            an.innerText = "Watch Trailer";
            const an1 = document.createElement('a');
            an1.setAttribute('href', d.url);

            const detail = document.createElement('div');
            detail.style.display = 'none'; // Sembunyikan detail anime pada awalnya

            const type = document.createElement('h4');
            type.innerText = 'Type : ' + d.type;
            const status = document.createElement('h4');
            status.innerText = 'Status : ' + d.status;
            const score = document.createElement('h4');
            score.innerText = 'Score : ' + d.score;
            const producer = document.createElement('h4');
            producer.innerText = 'Producer : ' + d.producers.map(prod => prod.name).join(', ');
            const episodes = document.createElement('h4');
            episodes.innerText = 'Total Episodes : ' + d.episodes;
            const duration = document.createElement('h4');
            duration.innerText = 'Duration : ' + d.duration;
            const genres = document.createElement('h4');
            genres.innerText = 'Genres : ' + d.genres.map(genre => genre.name).join(', ');
            const sinopsis = document.createElement('p');
            sinopsis.innerText = 'Synopsis : ' + d.synopsis;

            detail.appendChild(score);
            detail.appendChild(producer);
            detail.appendChild(episodes);
            detail.appendChild(duration);
            detail.appendChild(sinopsis);
            detail.appendChild(genres);
            figcaption.appendChild(an);
            figcaption.appendChild(judul);
            figure.appendChild(an1);
            an1.appendChild(img);
            figure.appendChild(figcaption);
            figcaption.appendChild(detail);
            top.appendChild(figure);
        });
    });
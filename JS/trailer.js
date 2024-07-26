

const full = 'https://api.jikan.moe/v4/anime/';

// Mengambil ID dari Parameter URL
const urlParam = new URLSearchParams(location.search); // untuk mengambil parameter query dari URL saat ini
const id = urlParam.get('id'); // menyimpannya ke dalam variabel id
console.log(id); // debugging

// Memeriksa Jika ID Ada
if (id) {
    const fullURL = `${full}${id}/full`; // Mengirimkan permintaan GET ke URL API untuk mendapatkan data anime lengkap
    fetch(fullURL)
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            const anime = res.data;
            const trailer = document.getElementById('trailer');
            const titleElement = document.getElementById('judul');
            if (anime && anime.trailer && anime.trailer.embed_url) {
                trailer.src = anime.trailer.embed_url;
            } else {
                trailer.textContent = "Trailer not available for this anime.";
                alert("Trailer not available for this anime.");
            }
            if (anime && anime.titles[0].title) {
                titleElement.textContent = anime.titles[0].title;
            } else {
                titleElement.textContent = "Title not available.";
            }
        })
        .catch((error) => {
            console.error("Error fetching anime data:", error);
            const titleElement = document.getElementById('judul');
            titleElement.textContent = "Error loading title.";
        });
} else {
    console.log("ID not found in URL parameters.");
    const titleElement = document.getElementById('judul');
    titleElement.textContent = "ID not found.";
}


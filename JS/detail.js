
// Menambahkan event listener yang akan dijalankan saat seluruh konten halaman telah dimuat.
document.addEventListener("DOMContentLoaded", () => {
  // Ambil data anime dari localStorage
  const pilihAnime = JSON.parse(localStorage.getItem('pilihAnime'));

  // Jika tidak ada data, kembali ke halaman utama
  if (!pilihAnime) {
    window.location.href = "../HTML/index.html";
    return;
  }

  // Tampilkan data anime di halaman dengan mengambil id
  document.getElementById('anime-image').setAttribute('src', pilihAnime.images.jpg.image_url);
  document.getElementById('anime-title').innerText = pilihAnime.titles[0].title;
  document.getElementById('anime-score').innerText = 'Score : ' + pilihAnime.score;
  document.getElementById('anime-producer').innerText = 'Producer : ' + pilihAnime.producers.map(prod => prod.name).join(', ');
  document.getElementById('anime-type').innerText = 'Type : ' + pilihAnime.type;
  document.getElementById('anime-status').innerText = 'Status : ' + pilihAnime.status;
  document.getElementById('anime-episodes').innerText = 'Total Episodes : ' + pilihAnime.episodes;
  document.getElementById('anime-duration').innerText = 'Duration : ' + pilihAnime.duration;
  document.getElementById('anime-genres').innerText = 'Genres : ' + pilihAnime.genres.map(genre => genre.name).join(', ');
  document.getElementById('anime-synopsis').innerText = 'Synopsis : ' + pilihAnime.synopsis;
  
  // menambahkan elemen a untuk trailer di detail
  const an = document.createElement('a');
  an.setAttribute('href', `../HTML/trailer.html?id=${pilihAnime.mal_id}`);
  an.innerText = "Watch Trailer";
  
  const trailerCont = document.getElementById('trailer-container');
  trailerCont.appendChild(an);
});



/* UNTUK HEADER SAAT SCROLL KE BAWAH */
window.addEventListener('scroll',() =>{
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);//Mengecek apakah posisi vertikal scroll lebih besar dari 0
})
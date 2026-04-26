// Menyimpan referensi elemen form ke dalam variabel
const formEkskul = document.getElementById('form-ekskul');

// Menyimpan referensi wadah daftar siswa ke dalam variabel
const listPeserta = document.getElementById('list-peserta');

// Menyimpan referensi elemen pesan error ke dalam variabel
const errorMsg = document.getElementById('error-msg');

// Menambahkan pendengar kejadian saat form dikirim/ditekan tombol daftar
formEkskul.addEventListener('submit', function(event) {
    // Mencegah browser melakukan reload halaman secara default
    event.preventDefault();

    // ==============================================
    // MENGAMBIL NILAI DARI FORM (SUDAH COCOK SEMUA)
    // ==============================================
    const nama = document.getElementById('namaSiswa').value.trim();
    const nisn = document.getElementById('nisn').value.trim();
    const ekskul = document.getElementById('pilihanEkskul').value;
    
    // ✅ AMBIL DATA DARI DROPDOWN KELAS
    const kelas = document.getElementById('kelas').value;
    
    // ✅ AMBIL DATA DARI INPUT NO HP/WA
    const nohp = document.getElementById('nohp').value; 

    // ==============================================
    // MEMBUAT NAMA OTOMATIS HURUF BESAR
    // ==============================================
    const namaFix = nama.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // ==============================================
    // VALIDASI PANJANG DAN ISI NISN
    // ==============================================
    if(nisn.length !== 10 || isNaN(nisn)) {
        errorMsg.textContent = "NISN tidak valid! Harus berjumlah 10 digit angka.";
        errorMsg.classList.replace('error-hidden', 'error-visible');
        return;
    }

    errorMsg.classList.replace('error-visible', 'error-hidden');
    errorMsg.textContent = "";

    // Mencari elemen teks "Belum ada siswa..."
    const emptyState = document.querySelector('.empty-list');
    if (emptyState) emptyState.remove();

    // ==============================================
    // MEMBUAT ELEMEN KARTU SISWA BARU
    // ==============================================
    const cardSiswa = document.createElement('div');
    cardSiswa.classList.add('card-siswa');

    // ==============================================
    // MEMBERIKAN WARNA BACKGROUND BERDASARKAN PILIHAN
    // ==============================================
    switch(ekskul) {
        case 'Pramuka':
            cardSiswa.classList.add('bg-pramuka');
            break;
        case 'Palang Merah Remaja (PMR)':
            cardSiswa.classList.add('bg-pmr');
            break;
        case 'Klub Coding & Robotik':
            cardSiswa.classList.add('bg-coding');
            break;
        case 'Jurnalistik':
            cardSiswa.classList.add('bg-coding'); // Pakai warna biru juga
            break;
        default:
            break;
    }

    // ==============================================
    // MENGISI KARTU DENGAN DATA LENGKAP
    // ==============================================
    cardSiswa.innerHTML = `
        <h4>${namaFix}</h4>
        <p><strong>NISN:</strong> ${nisn}</p>
        <p><strong>Kelas:</strong> ${kelas}</p>  
        <p><strong>WhatsApp:</strong> ${nohp}</p> 
        <p><strong>Ekstrakurikuler:</strong> ${ekskul}</p>
        <button class="btn-hapus">Batalkan Pendaftaran / Hapus</button>
    `;

    // ==============================================
    // FUNGSI TOMBOL HAPUS KARTU
    // ==============================================
    const btnHapus = cardSiswa.querySelector('.btn-hapus');
    btnHapus.addEventListener('click', function() {
        cardSiswa.remove();
    });

    // Memasukkan kartu siswa yang sudah jadi ke dalam daftar
    listPeserta.appendChild(cardSiswa);

    // ==============================================
    // EFEK LOVE MUNCUL KETIKA DATA MASUK
    // ==============================================
    const love = document.createElement('span');
    love.innerHTML = "💖";
    love.style.position = "absolute";
    love.style.fontSize = "30px";
    love.style.animation = "lovePop 0.8s ease-out";
    cardSiswa.appendChild(love);

    // Menghapus elemen love setelah animasi selesai
    setTimeout(() => love.remove(), 800);

    // Mengosongkan atau mereset kolom input form
    formEkskul.reset();
});
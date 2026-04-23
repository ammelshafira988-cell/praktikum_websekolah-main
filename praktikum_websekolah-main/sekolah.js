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

    // Mengambil nilai input nama dan menghapus spasi berlebih
    const nama = document.getElementById('namaSiswa').value.trim();
    // Mengambil nilai input NISN dan menghapus spasi berlebih
    const nisn = document.getElementById('nisn').value.trim();
    // Mengambil nilai pilihan ekstrakurikuler dari dropdown
    const ekskul = document.getElementById('pilihanEkskul').value;

    // ==============================================
    // TANTANGAN 1: VALIDASI PANJANG DAN ISI NISN
    // ==============================================
    // Mengecek apakah panjang karakter NISN BUKAN 10 ATAU bukan angka
    if(nisn.length !== 10 || isNaN(nisn)) {
        // Menampilkan pesan error sesuai instruksi
        errorMsg.textContent = "NISN tidak valid! Harus berjumlah 10 digit angka.";
        // Mengubah class agar pesan error terlihat di layar
        errorMsg.classList.replace('error-hidden', 'error-visible');
        // Menghentikan proses selanjutnya agar data tidak masuk
        return;
    }

    // Menyembunyikan pesan error jika data valid
    errorMsg.classList.replace('error-visible', 'error-hidden');
    // Mengosongkan teks error
    errorMsg.textContent = "";

    // Mencari elemen teks "Belum ada siswa..."
    const emptyState = document.querySelector('.empty-list');
    // Jika elemen tersebut ada, maka hapus dari tampilan
    if (emptyState) emptyState.remove();

    // ==============================================
    // MEMBUAT ELEMEN KARTU SISWA BARU
    // ==============================================
    // Membuat elemen div baru untuk wadah kartu siswa
    const cardSiswa = document.createElement('div');
    // Memberikan class utama pada kartu
    cardSiswa.classList.add('card-siswa');


    // ==============================================
    // TANTANGAN 2: MEMBERIKAN WARNA BACKGROUND BERDASARKAN PILIHAN
    // ==============================================
    // Mengecek nilai ekstrakurikuler menggunakan switch case
    switch(ekskul) {
        case 'Pramuka':
            // Jika Pramuka, tambah class background warna COKLAT
            cardSiswa.classList.add('bg-pramuka');
            break;
        case 'Palang Merah Remaja (PMR)':
            // Jika PMR, tambah class background warna MERAH MUDA
            cardSiswa.classList.add('bg-pmr');
            break;
        case 'Klub Coding & Robotik':
            // Jika Coding, tambah class background warna BIRU MUDA
            cardSiswa.classList.add('bg-coding');
            break;
        // Kondisi jika tidak ada yang cocok
        default:
            break;
    }

    // Mengisi struktur HTML ke dalam kartu siswa
    cardSiswa.innerHTML = `
        <h4>${nama}</h4>
        <p><strong>NISN:</strong> ${nisn}</p>
        <p><strong>Ekstrakurikuler:</strong> ${ekskul}</p>
        <button class="btn-hapus">Batalkan Pendaftaran / Hapus</button>
    `;

    // ==============================================
    // TANTANGAN 3: FUNGSI TOMBOL HAPUS KARTU
    // ==============================================
    // Mencari tombol hapus yang baru saja dibuat di dalam kartu
    const btnHapus = cardSiswa.querySelector('.btn-hapus');
    
    // Menambahkan pendengar kejadian saat tombol hapus diklik
    btnHapus.addEventListener('click', function() {
        // Menghapus elemen kartu siswa tersebut dari halaman web
        cardSiswa.remove();
    });

    // Memasukkan kartu siswa yang sudah jadi ke dalam daftar
    listPeserta.appendChild(cardSiswa);

    // Mengosongkan atau mereset kolom input form
    formEkskul.reset();
});
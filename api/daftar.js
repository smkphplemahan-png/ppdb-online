// =======================
// URL KARTU (RENDER HTML JADI GAMBAR)
// =======================
const urlKartu = "https://ppdb-online-ashy.vercel.app/kartu.html?" +
"nama=" + encodeURIComponent(data.nama) +
"&nomor=" + nomor +
"&ttl=" + encodeURIComponent(data.tempat + ", " + data.tanggal) +
"&nisn=" + data.nisn +
"&nik=" + data.nik +
"&sekolah=" + encodeURIComponent(data.sekolah) +
"&jurusan=" + encodeURIComponent(data.jurusan);

// 🔥 ubah jadi gambar
const imageUrl = "https://image.thum.io/get/width/800/crop/800/" + urlKartu;


// =======================
// KIRIM WA
// =======================
await fetch("https://api.fonnte.com/send", {
  method: "POST",
  headers: {
    "Authorization": "cSpu1xCv44Ge8HCLsGBN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    target: wa,
    message:
      "Halo " + data.nama + "\n\n" +
      "Pendaftaran berhasil ✅\n\n" +
      "No: " + nomor + "\n\n" +
      "📄 Kartu ada di bawah ini",

    url: imageUrl   // 🔥 INI KUNCINYA
  })
});

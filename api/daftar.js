export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    // =====================
    // FORMAT NOMOR
    // =====================
    const nomor = "2027" + Math.floor(1000 + Math.random() * 9000);

    // =====================
    // FORMAT WA
    // =====================
    let wa = String(data.wa).replace(/\D/g, "");
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    // =====================
    // LINK KARTU
    // =====================
    const urlKartu =
      "https://ppdb-online-ashy.vercel.app/kartu.html?" +
      "nama=" + encodeURIComponent(data.nama) +
      "&nomor=" + nomor +
      "&ttl=" + encodeURIComponent(data.tempat + ", " + data.tanggal) +
      "&nisn=" + data.nisn +
      "&nik=" + data.nik +
      "&sekolah=" + encodeURIComponent(data.sekolah) +
      "&jurusan=" + encodeURIComponent(data.jurusan);

    // =====================
    // RENDER JADI GAMBAR
    // =====================
    const imageUrl =
      "https://image.thum.io/get/width/800/crop/800/" + urlKartu;

    // =====================
    // KIRIM WA
    // =====================
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "cSpu1xCv44Ge8HCLsGBN",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: wa,
        message:
          "Halo " + data.nama + "\n\n" +
          "Pendaftaran berhasil ✅\n\n" +
          "No: " + nomor + "\n\n" +
          "📄 Kartu terlampir di bawah ini",

        file: imageUrl, // 🔥 FIX DI SINI
        filename: nomor + ".jpg",
      }),
    });

    const result = await response.json();
    console.log(result);

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
}

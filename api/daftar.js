export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const data = req.body;

    const nomor = "2027" + Math.floor(1000 + Math.random() * 9000);

    let wa = String(data.wa).replace(/\D/g, "");
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    const urlKartu =
      "https://ppdb-online-ashy.vercel.app/kartu.html?" +
      "nama=" + encodeURIComponent(data.nama) +
      "&nomor=" + nomor +
      "&ttl=" + encodeURIComponent(data.tempat + ", " + data.tanggal) +
      "&nisn=" + data.nisn +
      "&nik=" + data.nik +
      "&sekolah=" + encodeURIComponent(data.sekolah) +
      "&jurusan=" + encodeURIComponent(data.jurusan);

    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "cSpu1xCv44Ge8HCLsGBN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: wa,
        message:
`Halo ${data.nama}

Pendaftaran berhasil ✅
No: ${nomor}

📄 Kartu Anda:
${urlKartu}`
      })
    });

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

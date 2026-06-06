export default async function handler(req, res) {

  try {

    const data = req.body;

    const nomor = "2027" + Math.floor(1000 + Math.random() * 9000);

    // 🔥 FORMAT WA (WAJIB BENAR)
    let wa = String(data.wa).replace(/\D/g, "");
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    // =========================
    // PESAN
    // =========================
    const pesan = `Halo ${data.nama}

Pendaftaran berhasil ✅
No: ${nomor}

Cek kartu:
https://ppdb-anda.vercel.app/kartu?nama=${encodeURIComponent(data.nama)}&nomor=${nomor}`;

    // =========================
    // KIRIM WA (FIX)
    // =========================
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": "ISI_TOKEN_FONNTE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: wa,
        message: pesan
      })
    });

    const result = await response.json();

    console.log(result); // 🔥 LIHAT DI LOG VERCEL

    res.status(200).json({
      success: true,
      wa: wa,
      fonnte: result
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.toString()
    });

  }
}
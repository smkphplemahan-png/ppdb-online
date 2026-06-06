export default async function handler(req, res) {

  try {
    // 🔥 hanya terima POST
    if (req.method !== "POST") {
      return res.status(405).json({ status: "method not allowed" });
    }

    const data = req.body;

    // 🔥 ambil data
    const nama = data.nama || "-";
    let wa = data.wa || "";

    // 🔥 format nomor WA
    wa = String(wa).replace(/\D/g, '');
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    const nomor = "2027" + Math.floor(Math.random() * 10000);

    const pesan =
`Halo ${nama}

Pendaftaran berhasil ✅

No: ${nomor}

SMK PUTRA HARAPAN`;

    const token = "cSpu1xCv44Ge8HCLsGBN"; // token kamu

    // 🔥 pakai axios bawaan (lebih stabil)
    const axios = require("axios");

    await axios.post("https://api.fonnte.com/send", null, {
      headers: {
        Authorization: token
      },
      params: {
        target: wa,
        message: pesan
      }
    });

    return res.status(200).json({
      status: "ok",
      wa: wa
    });

  } catch (error) {
    console.log("ERROR API:", error);

    return res.status(500).json({
      status: "error",
      message: error.toString()
    });
  }
}

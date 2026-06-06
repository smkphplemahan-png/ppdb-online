export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ status: "method not allowed" });
  }

  const data = req.body;

  const nama = data.nama;
  let wa = data.wa;

  // 🔥 FORMAT WA
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

  const token = "cSpu1xCv44Ge8HCLsGBN"; // 🔥 token kamu

  try {

    // 🔥 FIX: pakai fetch versi node
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        target: wa,
        message: pesan
      })
    });

    const result = await response.text(); // 🔥 jangan json dulu
    console.log(result);

    return res.status(200).json({
      status: "ok",
      wa: wa,
      fonnte: result
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.toString()
    });
  }
}

export default async function handler(req, res) {

  // 🔥 HANDLE CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔥 HANDLE PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const data = req.body;

    let wa = String(data.wa).replace(/\D/g, '');
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    const pesan =
      "Halo " + data.nama + "\n\n" +
      "Pendaftaran berhasil ✅\n\n" +
      "Terima kasih.";

    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": "cSpu1xCv44Ge8HCLsGBN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: wa,
        message: pesan
      })
    });

    const result = await response.json();

    return res.status(200).json({
      status: "ok",
      result: result
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error" });
  }
}

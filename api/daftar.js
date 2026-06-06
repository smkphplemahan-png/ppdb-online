export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    // 🔥 FIX: pastikan body ada
    const data = req.body || {};

    if (!data.nama) {
      return res.status(400).json({ error: "Data tidak masuk" });
    }

    const nomor = "2027" + Math.floor(1000 + Math.random() * 9000);

    const urlKartu =
      "https://ppdb-online-ashy.vercel.app/kartu.html?" +
      "nama=" + encodeURIComponent(data.nama || "") +
      "&nomor=" + nomor +
      "&ttl=" + encodeURIComponent((data.tempat || "") + ", " + (data.tanggal || "")) +
      "&nisn=" + (data.nisn || "") +
      "&nik=" + (data.nik || "") +
      "&sekolah=" + encodeURIComponent(data.sekolah || "") +
      "&jurusan=" + encodeURIComponent(data.jurusan || "");

    console.log("DATA MASUK:", data);

    return res.status(200).json({
      status: "ok",
      nomor: nomor,
      kartu: urlKartu
    });

  } catch (err) {
    console.error("ERROR FIX:", err);
    return res.status(500).json({
      error: "SERVER CRASH",
      detail: err.message
    });
  }
}

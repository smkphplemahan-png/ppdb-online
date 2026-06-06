export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const data = req.body;

    // =====================
    // NOMOR
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
    // FOTO (UPLOAD KE CLOUDINARY)
    // =====================
    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/dldub7baw/image/upload`,
      {
        method: "POST",
        body: new URLSearchParams({
          file: data.foto,
          upload_preset: "ppdb_upload"
        })
      }
    );

    const uploadResult = await upload.json();
    const fotoUrl = uploadResult.secure_url;

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
      "&jurusan=" + encodeURIComponent(data.jurusan) +
      "&foto=" + encodeURIComponent(fotoUrl);

    // =====================
    // PDF (PASTIKAN API KEY SUDAH DIGANTI)
    // =====================
    const pdfUrl =
      "https://api.html2pdf.app/v1/generate?" +
      "url=" + encodeURIComponent(urlKartu) +
      "&apiKey=YOxhkHNaoViEp8mIFhq2NRb20gktwj5eeUIEfqBfxHQmc4Gs4pGPcSvkTeB840vL" +
      "&delay=2000";

    // =====================
    // KIRIM WA
    // =====================
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

📄 Kartu PDF terlampir`,
        file: pdfUrl,
        filename: nomor + ".pdf"
      })
    });

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const data = fields;
    const file = files.foto[0];

    const nomor = "2027" + Math.floor(1000 + Math.random() * 9000);

    let wa = String(data.wa).replace(/\D/g, "");
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    // 🔥 UPLOAD FOTO
    const fd = new FormData();
    fd.append("file", fs.createReadStream(file.filepath));
    fd.append("upload_preset", "ppdb_upload");

    const upload = await fetch(
      "https://api.cloudinary.com/v1_1/dldub7baw/image/upload",
      { method: "POST", body: fd }
    );

    const up = await upload.json();
    const fotoUrl = up.secure_url;

    // 🔥 LINK KARTU
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

    // 🔥 PDF
    const pdfUrl =
      "https://api.html2pdf.app/v1/generate?" +
      "url=" + encodeURIComponent(urlKartu) +
      "&apiKey=APIKEY_KAMU";

    // 🔥 KIRIM WA
    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "TOKEN_KAMU",
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

    res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
}

export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const data = req.body;

    // FORMAT WA
    let wa = String(data.wa).replace(/\D/g, '');
    if (!wa.startsWith("62")) {
      wa = "62" + wa.replace(/^0/, "");
    }

    // NOMOR
    const nomor = "2027" + Math.floor(1000 + Math.random()*9000);

    // LOGO
    const logoSekolah = "https://drive.google.com/uc?export=download&id=1zP9m8KlOnrCmq5G7AGrIeKXu76JrzBNP";
    const logoDinas = "https://drive.google.com/uc?export=download&id=1UdJW2JnQRQmy2ZROZGfoZ5hUa-VJFFwm";

    // QR
    const qr = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + nomor;

    // HTML KARTU
    const html = `
    <html>
    <body style="font-family:Arial;padding:20px">

    <div style="width:700px;border:3px solid #0a7d3b;padding:15px;background:#f5fff8">

    <table width="100%">
    <tr>
    <td width="20%"><img src="${logoDinas}" width="80"></td>

    <td align="center">
    <div style="font-size:24px;font-weight:bold;color:#0a7d3b">KARTU PENDAFTARAN</div>
    <div style="font-size:20px;font-weight:bold;color:#0a7d3b">SMK PUTRA HARAPAN</div>
    <div style="font-size:16px;color:#0a7d3b">2027/2028</div>
    </td>

    <td width="20%" align="right">
    <img src="${logoSekolah}" width="80">
    </td>
    </tr>
    </table>

    <br>

    <table width="100%" border="1" cellpadding="10">
    <tr>

    <td width="70%">
    <b>No:</b> ${nomor}<br><br>
    <b>Nama:</b> ${data.nama}<br>
    <b>TTL:</b> ${data.tempat}, ${data.tanggal}<br>
    <b>NISN:</b> ${data.nisn}<br>
    <b>NIK:</b> ${data.nik}<br>
    <b>Sekolah:</b> ${data.sekolah}<br>
    <b>Jurusan:</b> ${data.jurusan}
    </td>

    <td align="center">
    <div style="width:120px;height:150px;border:2px solid #000">
    FOTO
    </div>
    </td>

    </tr>
    </table>

    <br>

    <table width="100%">
    <tr>
    <td><img src="${qr}" width="120"></td>
    <td align="right"><b style="color:orange">Menunggu Verifikasi</b></td>
    </tr>
    </table>

    </div>
    </body>
    </html>
    `;

    // KIRIM WA (TEXT DULU)
    const response = await fetch("https://api.fonnte.com/send", {
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
        "No: " + nomor
      })
    });

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error" });
  }
}

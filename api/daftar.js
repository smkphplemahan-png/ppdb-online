import https from "https";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ status: "method not allowed" });
  }

  try {

    const data = req.body;

    const nama = data.nama || "-";
    let wa = data.wa || "";

    // 🔥 FORMAT NOMOR WA
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

    const postData = new URLSearchParams({
      target: wa,
      message: pesan
    }).toString();

    const options = {
      hostname: "api.fonnte.com",
      path: "/send",
      method: "POST",
      headers: {
        "Authorization": "cSpu1xCv44Ge8HCLsGBN",
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postData.length
      }
    };

    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", chunk => {
        data += chunk;
      });

      response.on("end", () => {
        console.log("Fonnte:", data);

        return res.status(200).json({
          status: "ok",
          result: data
        });
      });
    });

    request.on("error", (error) => {
      console.log("ERROR:", error);
      return res.status(500).json({ status: "error" });
    });

    request.write(postData);
    request.end();

  } catch (err) {
    console.log("CATCH ERROR:", err);
    return res.status(500).json({ status: "error" });
  }
}

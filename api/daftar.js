<script>
const form = document.getElementById("form");
const loading = document.getElementById("loading");
const btn = document.getElementById("btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    nama: formData.get("nama"),
    tempat: formData.get("tempat"),
    tanggal: formData.get("tanggal"),
    nisn: formData.get("nisn"),
    nik: formData.get("nik"),
    sekolah: formData.get("sekolah"),
    wa: formData.get("wa"),
    jurusan: formData.get("jurusan")
  };

  loading.style.display = "block";
  btn.disabled = true;

  try {

    const res = await fetch("/api/daftar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // 🔥 FIX PENTING
    const text = await res.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Response bukan JSON: " + text);
    }

    loading.style.display = "none";
    btn.disabled = false;

    if (!res.ok) {
      throw new Error(result.error || "Server error");
    }

    if (result.status === "ok") {
      alert("✅ Pendaftaran berhasil!");
      form.reset();
    } else {
      alert("❌ " + result.error);
    }

  } catch (err) {
    loading.style.display = "none";
    btn.disabled = false;

    // 🔥 tampilkan error asli
    alert("❌ " + err.message);
  }
});
</script>

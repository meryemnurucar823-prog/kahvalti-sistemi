function kaydet() {

    const isim = document.getElementById("name").value;

    if (isim.trim() === "") {
        document.getElementById("mesaj").innerText =
            "Lütfen adınızı ve soyadınızı yazın.";
        return;
    }

    const gunler = [
        ["Pazartesi", "pazartesi"],
        ["Salı", "sali"],
        ["Çarşamba", "carsamba"],
        ["Perşembe", "persembe"],
        ["Cuma", "cuma"]
    ];

    let secilenGunler = [];

    gunler.forEach(function(gun) {

        const checkbox = document.getElementById(gun[1]);

        if (checkbox.checked) {
            secilenGunler.push(gun[0]);
        }

    });

    if (secilenGunler.length === 0) {
        document.getElementById("mesaj").innerText =
            "En az bir gün seçmelisin.";
        return;
    }

    // Daha önce kaydedilmiş kayıtları al
    let kayitlar =
        JSON.parse(localStorage.getItem("kahvaltiKayitlari")) || [];

    // Yeni kaydı oluştur
    const yeniKayit = {
        isim: isim.trim(),
        gunler: secilenGunler
    };

    // Yeni kaydı listeye ekle
    kayitlar.push(yeniKayit);

    // LocalStorage'a kaydet
    localStorage.setItem(
        "kahvaltiKayitlari",
        JSON.stringify(kayitlar)
    );

    document.getElementById("mesaj").innerText =
        "✅ " + isim + ", tercihiniz kaydedildi!";

    // Formu temizle
    document.getElementById("name").value = "";

    document.getElementById("pazartesi").checked = false;
    document.getElementById("sali").checked = false;
    document.getElementById("carsamba").checked = false;
    document.getElementById("persembe").checked = false;
    document.getElementById("cuma").checked = false;

    console.log("Çalışan:", isim);
    console.log("Kahvaltı günleri:", secilenGunler);
    console.log("Tüm kayıtlar:", kayitlar);
}
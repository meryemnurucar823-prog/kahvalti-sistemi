const gunler = [
    ["Pazartesi", "pazartesi"],
    ["Salı", "sali"],
    ["Çarşamba", "carsamba"],
    ["Perşembe", "persembe"],
    ["Cuma", "cuma"]
];

const kayitlar =
    JSON.parse(localStorage.getItem("kahvaltiKayitlari")) || [];

const sonuclar = document.getElementById("sonuclar");

gunler.forEach(function(gun) {

    const kisiler = kayitlar.filter(function(kisi) {
        return kisi.gunler.includes(gun[0]);
    });

    const kutu = document.createElement("div");

    kutu.className = "day";

    let isimler = "";

    if (kisiler.length === 0) {
        isimler = "Henüz kayıt yok";
    } else {
        isimler = kisiler
            .map(function(kisi) {
                return kisi.isim;
            })
            .join(", ");
    }

    kutu.innerHTML = `
        <div>
            <strong>${gun[0]}</strong>
            <br>
            <small>${isimler}</small>
        </div>

        <strong>🍳 ${kisiler.length} kişi</strong>
    `;

    sonuclar.appendChild(kutu);
});
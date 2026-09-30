const SUPABASE_URL = "https://undacyotamlcxkuoxoka.supabase.co";

const SUPABASE_KEY = "SENİN_PUBLISHABLE_KEYİN";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

function haftaninBaslangici() {
    const tarih = new Date();
    const gun = tarih.getDay();

    const fark = gun === 0 ? -6 : 1 - gun;

    tarih.setDate(tarih.getDate() + fark);

    return tarih.toISOString().split("T")[0];
}

async function kaydet() {

    const isim = document.getElementById("name").value.trim();

    if (isim === "") {
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

    const { error } = await supabaseClient
        .from("kahvalti_kayitlari")
        .insert([
            {
                isim: isim,
                gunler: secilenGunler,
                hafta_baslangic: haftaninBaslangici()
            }
        ]);

    if (error) {
        console.error(error);

        document.getElementById("mesaj").innerText =
            "❌ Kayıt sırasında bir hata oluştu.";

        return;
    }

    document.getElementById("mesaj").innerText =
        "✅ " + isim + ", tercihiniz kaydedildi!";

    document.getElementById("name").value = "";

    document.getElementById("pazartesi").checked = false;
    document.getElementById("sali").checked = false;
    document.getElementById("carsamba").checked = false;
    document.getElementById("persembe").checked = false;
    document.getElementById("cuma").checked = false;
}

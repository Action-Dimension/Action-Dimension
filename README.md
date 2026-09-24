# Minifal — Fandom, Wiki ve Market Portalı

Action Dimension'ın bağımsız yeniden yapımı olan **Minifal** için resmi tasarım diline (renkler, tipografi, neo-brutalist ink bordürleri, sert gölgeler, splat desenleri) bire bir sadık kalarak hazırlanmış interaktif topluluk ve wiki portalı.

---

## 🌟 Öne Çıkan Özellikler

1. **Bire Bir Özgün Tasarım Dili:**
   - Minifal'in orijinal renk paleti (`--sand-deep`, `--sand`, `--ink`, `--teal`, `--orange`, `--gold`, `--olive`)
   - Neo-brutalist bordürler (`2px solid var(--ink)`), sert gölgeler (`4px 4px 0`, `6px 6px 0`) ve dinamik tıklama fizikleri
   - Orijinal "Archivo" ve "Instrument Sans" tipografisi
   - 3D derinlikli Minifal vektör logosu ve boya sıçraması (splat) desenleri

2. **Kapsamlı Oyun İçi Veritabanı:**
   - 🔫 **Silahlar (Weapons):** Paintball tabancaları, hafif makineliler, hücum tüfekleri, pompalılar, keskin nişancı tüfekleri ve deneysel plazma topları
   - ⚙️ **Modkitler (Attachments):** Hızlı tetik, yüksek basınç valfi, boya haznesi genişletici, dürbün ve modkit sökücü
   - 🛡️ **Zırhlar (Armor):** Çaylak yeleğinden ağır juggernaut ve çeviklik zırhlarına kadar koruma ve hız değerleri
   - 🎭 **Maskeler ve Kıyafetler:** Siber gaz maskesi, kitsune tilki maskesi, kapüşonlular, siberpunk ceketler
   - 🛋️ **Mobilyalar ve Ev Planları:** Sebastian'ın mimari ev planları, 4 yöne dönebilen ve renkleri değiştirilebilen ev eşyaları
   - 🧪 **Potionlar:** Maçlık ve kalıcı stat güçlendirici iksirler

3. **Canlı Market ve Fiyat Değişim Grafiği (Cash & Crystal):**
   - Oyundaki iki resmi para birimi: **Cash (Altın Para)** çoğu eşya için, **Crystal (Yeşil Taş)** ise özel ve nadir eşyalar için kullanılır
   - 2. el oyuncu pazarındaki tüm eşyaların güncel Cash ve Crystal fiyatları
   - 24 saatlik değişim oranları (% artış ve azalışlar)
   - **İnteraktif Zaman Çizelgesi Grafiği:** Seçilen herhangi bir eşyanın son 4 aydaki fiyat dalgalanmasını gösteren dinamik SVG eğrisi ve fare ile üzerine gelindiğinde çalışan bilgi balonu (tooltip)

4. **Boss Rehberi & Savaş Hasar Simülatörü:**
   - **Commander (4016 HP):** Minifal NPC Survival modunun (Game Type 4) baş düşmanı ve can havuzu
   - **Light Machine Gun (12 Hasar):** Mermi başına net 12 hasar veren temel hafif makineli
   - **İnteraktif Hasar Hesaplayıcısı:** Seçilen silahlarla Commander'ı alt etmek için gereken mermi ve şarjör sayısını canlı hesaplar (ör. LMG ile 335 mermi); interaktif "Test Ateşi" ile can barını simüle eder

5. **Paintball Maç Sonu Düşme İhtimali (Falling Rate):**
   - Şimdilik **"Pasif / Gelecek Sezonda Açılacak"** mührüyle kilitli önizleme sistemi
   - Yaygın (%60), Nadir (%25), Ender (%11.5) ve Epik/Efsanevi (%3.5) düşme havuzları

---

## 📁 Dosya Yapısı

```
minifal/
├── index.html                           # Fandom & Wiki Eşya Kataloğu ve Canlı Market
├── harita.html                          # Şehir Haritası, Oyunlar ve NPC Satıcıları
├── evler.html                           # Emlak Ajansı ve 3D İnteraktif Ev Tasarımcısı
├── boss.html                            # Cyborg Boss Rehberi ve Hasar Simülatörü
├── anasayfa.html                        # Orijinal Minifal Ana Sayfası
├── anasayfa_files/                      # Ana sayfa statik varlıkları
├── hesabim_files/                       # Statik varlıklar (logolar ve ikonlar)
├── hikayemiz.html                       # Orijinal Hikâye Sayfası
├── hikayemiz_files/                     # Hikâye sayfası statik varlıkları
├── css/
│   └── fandom.css                       # Bire bir Minifal tasarım dili ve CSS stilleri
├── js/
│   ├── fandom-data.js                   # Statik veritabanı (El ile kolayca düzenlenebilir)
│   └── fandom.js                        # Arama, filtreleme, modal ve grafik motoru
├── img/
│   ├── minifal_logo.png                 # Orijinal 3D Minifal Logosu
│   ├── items/                           # Oyun içi şeffaf eşya ve silah görselleri
│   └── enemies/                         # Cyborg Commander ve Soldier modelleri
└── README.md
```

---

## ✏️ Verileri El İle Düzenleme (Statik Sistem)

Tüm eşyalar, fiyatlar ve geçmiş veriler `js/fandom-data.js` dosyasında temiz bir JavaScript nesnesi (`MINIFAL_DATABASE`) olarak tutulmaktadır.

### Yeni Eşya Eklemek veya Fiyat Güncellemek:

`js/fandom-data.js` dosyasını açıp ilgili kategori dizisine (örneğin `weapons` veya `modkits`) yeni bir nesne ekleyebilirsiniz:

```javascript
{
    id: "wep-09",
    name: "Örnek Yeni Silah",
    category: "weapons",
    subType: "Tüfek",
    rarity: "rare",
    rarityName: "Ender",
    price: 1500,
    priceHistory: [
        { date: "Haz 2026", price: 1200 },
        { date: "Tem 2026", price: 1350 },
        { date: "Ağu 2026", price: 1420 },
        { date: "Eyl 2026", price: 1500 }
    ],
    change24h: 5.6,
    modkitSlots: 3,
    stats: { damage: 45, fireRate: 70, range: 75, reload: 65, capacity: 30 },
    description: "Yeni eklenen boya silahının açıklaması.",
    source: "2. El Pazar"
}
```

---

## 🚀 Çalıştırma

Bu proje tamamen **statik** bir web sitesidir.
- `index.html` dosyasına çift tıklayarak tarayıcınızda doğrudan açabilir,
- Ya da bir yerel sunucuyla görüntüleyebilirsiniz:
  ```bash
  npx serve
  ```
- Ayrıca **GitHub Pages** üzerinden tek tıkla canlı yayına alınabilir (`Settings -> Pages -> Deploy from a branch: main`).
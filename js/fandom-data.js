/**
 * ==============================================================================
 * MINIFAL FANDOM & WIKI - STATİK VERİTABANI
 * ==============================================================================
 * Bu dosya Minifal oyunundaki tüm eşyaları, market fiyatlarını ve geçmiş değişimlerini
 * el ile kolayca düzenleyebileceğiniz statik bir sistem olarak tutar.
 * 
 * Yeni bir eşya eklemek veya fiyat güncellemek için aşağıdaki ilgili kategori dizisine
 * (Array) yeni bir nesne ekleyebilir veya mevcut olanın değerlerini değiştirebilirsiniz.
 * ==============================================================================
 */

const MINIFAL_DATABASE = {
    // Sürüm ve son güncelleme bilgisi
    meta: {
        gameVersion: "0.0.55",
        lastUpdated: "2026-09-22",
        currency: "Minifal Altını",
        currencySymbol: "₼",
        totalItemsCount: 465,
        totalWeapons: 33,
        totalArmor: 8,
        totalModkits: 15,
        totalFurniture: 116
    },

    // Kategori Tanımları ve İkonları
    categories: [
        { id: "all", name: "Tüm Eşyalar", icon: "🌐", color: "ink", count: 32, desc: "Minifal evrenindeki tüm eşyaların ortak kataloğu." },
        { id: "weapons", name: "Silahlar", icon: "🔫", color: "orange", count: 33, desc: "Paintball sahasında kullanılan hafif, ağır ve özel boya silahları." },
        { id: "modkits", name: "Modkitler", icon: "⚙️", color: "teal", count: 15, desc: "Silahların hasar, hız ve menzilini artıran geliştirme modülleri." },
        { id: "armor", name: "Zırhlar", icon: "🛡️", color: "gold", count: 8, desc: "Maçlarda boya hasarını engelleyen taktik yelekler ve kıyafetler." },
        { id: "masks", name: "Maskeler & Kıyafet", icon: "🎭", color: "olive", count: 465, desc: "Şehirde tarzını yansıtan maskeler, ceketler ve aksesuarlar." },
        { id: "furniture", name: "Mobilyalar & Ev", icon: "🛋️", color: "sand", count: 116, desc: "Sebastian'dan alınan ev planları ve odayı döşeyen mobilyalar." },
        { id: "potions", name: "Potionlar", icon: "🧪", color: "teal", count: 12, desc: "Geçici ve kalıcı stat güçlendirmeleri sağlayan iksirler." },
        { id: "market", name: "Market Fiyatları", icon: "📈", color: "gold", count: 50, desc: "2. el pazarındaki canlı fiyatlar ve zaman içindeki değişim grafikleri." },
        { id: "drops", name: "Falling Rate (Pasif)", icon: "🎯", color: "orange", count: 0, desc: "Paintball maç sonu düşme ihtimalleri (Şimdilik pasif)." }
    ],

    // 1. SILAHLAR (WEAPONS)
    weapons: [
        {
            id: "wep-01",
            name: "Standart Boya Tabancası",
            category: "weapons",
            subType: "Tabanca",
            rarity: "common",
            rarityName: "Başlangıç",
            price: 150,
            priceHistory: [
                { date: "Haz 2026", price: 140 },
                { date: "Tem 2026", price: 150 },
                { date: "Ağu 2026", price: 160 },
                { date: "Eyl 2026", price: 150 }
            ],
            change24h: 0.0,
            modkitSlots: 1,
            stats: { damage: 18, fireRate: 60, range: 45, reload: 85, capacity: 20 },
            description: "Şehre yeni adım atan her oyuncunun ilk boya silahı. Güvenilir, dengeli ve hafif.",
            source: "Başlangıç Hediyesi / Silahçı",
            compatibleModkits: ["Hızlı Tetik", "Hafif Namlu"]
        },
        {
            id: "wep-02",
            name: "Akrep SMG (Scorpion)",
            category: "weapons",
            subType: "Hafif Makineli",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 680,
            priceHistory: [
                { date: "Haz 2026", price: 550 },
                { date: "Tem 2026", price: 610 },
                { date: "Ağu 2026", price: 640 },
                { date: "Eyl 2026", price: 680 }
            ],
            change24h: 6.2,
            modkitSlots: 2,
            stats: { damage: 24, fireRate: 92, range: 50, reload: 75, capacity: 45 },
            description: "Yakın mesafede rakibi boyaya boğan seri atışlı popüler hafif makineli tabanca.",
            source: "Paintball Mağarası Satıcısı",
            compatibleModkits: ["Hızlı Tetik", "Genişletilmiş Hazne", "Dengeleyici Dipçik"]
        },
        {
            id: "wep-03",
            name: "Fırtına Hücum Tüfeği",
            category: "weapons",
            subType: "Tüfek",
            rarity: "rare",
            rarityName: "Ender",
            price: 1450,
            priceHistory: [
                { date: "Haz 2026", price: 1100 },
                { date: "Tem 2026", price: 1250 },
                { date: "Ağu 2026", price: 1380 },
                { date: "Eyl 2026", price: 1450 }
            ],
            change24h: 5.1,
            modkitSlots: 3,
            stats: { damage: 42, fireRate: 74, range: 75, reload: 68, capacity: 32 },
            description: "Orta ve uzun menzilde kusursuz isabet sunan dengeli turnuva tüfeği.",
            source: "Seviye 15 Ödülü / 2. El Market",
            compatibleModkits: ["Yüksek Basınç Valfi", "Optik Dürbün", "Genişletilmiş Namlu", "Hızlı Şarjör Kiti"]
        },
        {
            id: "wep-04",
            name: "Barut Keskin Nişancı (Gunpowder)",
            category: "weapons",
            subType: "Keskin Nişancı",
            rarity: "epic",
            rarityName: "Epik",
            price: 3200,
            priceHistory: [
                { date: "Haz 2026", price: 3800 },
                { date: "Tem 2026", price: 3500 },
                { date: "Ağu 2026", price: 3300 },
                { date: "Eyl 2026", price: 3200 }
            ],
            change24h: -3.0,
            modkitSlots: 4,
            stats: { damage: 95, fireRate: 22, range: 98, reload: 35, capacity: 6 },
            description: "Tek atışta rakip kalkanını çökerten yüksek basınçlı efsanevi boya tüfeği.",
            source: "Ölüm Maçı Turnuva Kasası",
            compatibleModkits: ["Keskin Nişancı Dürbünü", "Yüksek Basınç Valfi", "Ağır Boya Tüpü", "Dengeleyici Dipçik"]
        },
        {
            id: "wep-05",
            name: "Pompalı Püskürtücü (Splat Shotgun)",
            category: "weapons",
            subType: "Pompalı",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 890,
            priceHistory: [
                { date: "Haz 2026", price: 780 },
                { date: "Tem 2026", price: 820 },
                { date: "Ağu 2026", price: 860 },
                { date: "Eyl 2026", price: 890 }
            ],
            change24h: 3.5,
            modkitSlots: 2,
            stats: { damage: 85, fireRate: 35, range: 32, reload: 50, capacity: 8 },
            description: "Geniş alana dağılan boya saçmaları ile dar koridorları tek başına temizleyen pompalı.",
            source: "Silahçı Viktor",
            compatibleModkits: ["Geniş Ağızlı Namlu", "Hızlı Kurma Kiti"]
        },
        {
            id: "wep-06",
            name: "Plazma Boya Topu",
            category: "weapons",
            subType: "Ağır Silah",
            rarity: "legendary",
            rarityName: "Efsanevi",
            price: 7500,
            priceHistory: [
                { date: "Haz 2026", price: 6200 },
                { date: "Tem 2026", price: 6900 },
                { date: "Ağu 2026", price: 7200 },
                { date: "Eyl 2026", price: 7500 }
            ],
            change24h: 4.2,
            modkitSlots: 5,
            stats: { damage: 110, fireRate: 48, range: 88, reload: 40, capacity: 50 },
            description: "Cyborg Saldırısı modunda bosslara karşı kullanılan deneysel enerji destekli boya topu.",
            source: "Cyborg Boss Zafer Sandığı",
            compatibleModkits: ["Aşırı Yükleme Reaktörü", "Yüksek Basınç Valfi", "Dengeleyici Dipçik", "Boya Haznesi Genişletici", "Optik Dürbün"]
        },
        {
            id: "wep-07",
            name: "Çiftli Boya Tabancası (Dual Splat)",
            category: "weapons",
            subType: "Çift El",
            rarity: "rare",
            rarityName: "Ender",
            price: 1800,
            priceHistory: [
                { date: "Haz 2026", price: 1950 },
                { date: "Tem 2026", price: 1900 },
                { date: "Ağu 2026", price: 1840 },
                { date: "Eyl 2026", price: 1800 }
            ],
            change24h: -2.1,
            modkitSlots: 3,
            stats: { damage: 45, fireRate: 88, range: 40, reload: 60, capacity: 40 },
            description: "İki elde iki tabanca ile yüksek hareket kabiliyeti ve yoğun baskı ateşi sağlar.",
            source: "Bayrak Kapmaca Şampiyonu",
            compatibleModkits: ["Hızlı Tetik", "Hafif Namlu", "Hızlı Şarjör Kiti"]
        },
        {
            id: "wep-08",
            name: "Ağır Minigun Püskürtücü",
            category: "weapons",
            subType: "Ağır Makineli",
            rarity: "epic",
            rarityName: "Epik",
            price: 4900,
            priceHistory: [
                { date: "Haz 2026", price: 4200 },
                { date: "Tem 2026", price: 4600 },
                { date: "Ağu 2026", price: 4800 },
                { date: "Eyl 2026", price: 4900 }
            ],
            change24h: 2.0,
            modkitSlots: 4,
            stats: { damage: 32, fireRate: 100, range: 60, reload: 25, capacity: 150 },
            description: "Ateş etmeye başlamadan önce namluyu döndürür; saniyede 15 boya kapsülü fırlatır.",
            source: "2. El Market Müzayedesi",
            compatibleModkits: ["Dev Hazne Kiti", "Soğutma Ceketi", "Dengeleyici Dipçik", "Yüksek Basınç Valfi"]
        }
    ],

    // 2. MODKITLER (WEAPON UPGRADE KITS)
    modkits: [
        {
            id: "mod-01",
            name: "Hızlı Tetik Kiti (Rapid Trigger)",
            category: "modkits",
            rarity: "rare",
            rarityName: "Ender",
            price: 720,
            priceHistory: [
                { date: "Haz 2026", price: 600 },
                { date: "Tem 2026", price: 650 },
                { date: "Ağu 2026", price: 700 },
                { date: "Eyl 2026", price: 720 }
            ],
            change24h: 2.8,
            slotCost: 1,
            effects: "+18% Atış Hızı, -5% İsabet",
            compatibility: "Tabancalar, Hafif Makineli, Tüfekler",
            description: "Tetik mekanizmasını hafifleterek basışlar arasındaki bekleme süresini minimize eder.",
            isRemover: false
        },
        {
            id: "mod-02",
            name: "Yüksek Basınç Valfi (Pressure Valve)",
            category: "modkits",
            rarity: "epic",
            rarityName: "Epik",
            price: 1350,
            priceHistory: [
                { date: "Haz 2026", price: 1150 },
                { date: "Tem 2026", price: 1220 },
                { date: "Ağu 2026", price: 1290 },
                { date: "Eyl 2026", price: 1350 }
            ],
            change24h: 4.6,
            slotCost: 1,
            effects: "+22% Boya Hasarı, +10% Menzil",
            compatibility: "Tüm Silahlar",
            description: "Kapsülün çıkış hızını artırarak çarpma anında daha geniş ve sert boya patlaması oluşturur.",
            isRemover: false
        },
        {
            id: "mod-03",
            name: "Boya Haznesi Genişletici",
            category: "modkits",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 450,
            priceHistory: [
                { date: "Haz 2026", price: 420 },
                { date: "Tem 2026", price: 430 },
                { date: "Ağu 2026", price: 440 },
                { date: "Eyl 2026", price: 450 }
            ],
            change24h: 2.2,
            slotCost: 1,
            effects: "+50% Şarjör Kapasitesi",
            compatibility: "Tüm Silahlar",
            description: "Daha büyük kapasiteli boya tüpü monte edilmesini sağlar, sık şarjör değiştirme derdine son verir.",
            isRemover: false
        },
        {
            id: "mod-04",
            name: "Keskin Nişancı Optik Dürbünü",
            category: "modkits",
            rarity: "rare",
            rarityName: "Ender",
            price: 980,
            priceHistory: [
                { date: "Haz 2026", price: 920 },
                { date: "Tem 2026", price: 940 },
                { date: "Ağu 2026", price: 960 },
                { date: "Eyl 2026", price: 980 }
            ],
            change24h: 2.1,
            slotCost: 1,
            effects: "+35% Menzil, +25% İsabet, -10% Görüş Alanı",
            compatibility: "Tüfekler, Keskin Nişancılar",
            description: "Uzak mesafedeki hedefleri net görmek için 4x büyütmeli optik vizör.",
            isRemover: false
        },
        {
            id: "mod-05",
            name: "Modkit Sökücü (Kit Remover)",
            category: "modkits",
            rarity: "common",
            rarityName: "Gereç",
            price: 250,
            priceHistory: [
                { date: "Haz 2026", price: 250 },
                { date: "Tem 2026", price: 250 },
                { date: "Ağu 2026", price: 250 },
                { date: "Eyl 2026", price: 250 }
            ],
            change24h: 0.0,
            slotCost: 0,
            effects: "Silaha takılı bir modkiti hasarsız geri söker.",
            compatibility: "Tüm Silahlar",
            description: "Silaha önceden takılmış bir modkiti envantere hasarsız döndüren usta aleti.",
            isRemover: true
        },
        {
            id: "mod-06",
            name: "Dengeleyici Dipçik",
            category: "modkits",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 520,
            priceHistory: [
                { date: "Haz 2026", price: 490 },
                { date: "Tem 2026", price: 500 },
                { date: "Ağu 2026", price: 510 },
                { date: "Eyl 2026", price: 520 }
            ],
            change24h: 1.9,
            slotCost: 1,
            effects: "-30% Geri Tepme, +15% Seri Atış İsabeti",
            compatibility: "Makineliler, Ağır Silahlar, Tüfekler",
            description: "Sürekli ateş ederken namlunun yukarı kaymasını engelleyen ergonomik omuzluk.",
            isRemover: false
        }
    ],

    // 3. ZIRHLAR (ARMOR)
    armor: [
        {
            id: "arm-01",
            name: "Çaylak Paintball Yeleği",
            category: "armor",
            rarity: "common",
            rarityName: "Başlangıç",
            price: 180,
            priceHistory: [
                { date: "Haz 2026", price: 180 },
                { date: "Tem 2026", price: 180 },
                { date: "Ağu 2026", price: 180 },
                { date: "Eyl 2026", price: 180 }
            ],
            change24h: 0.0,
            defense: 25,
            speedModifier: "0%",
            durability: 100,
            description: "Temel sünger takviyeli boya emici yelek. Hareketi engellemez.",
            source: "Başlangıç Ekipmanı"
        },
        {
            id: "arm-02",
            name: "Taktik Hücum Zırhı",
            category: "armor",
            rarity: "rare",
            rarityName: "Ender",
            price: 1100,
            priceHistory: [
                { date: "Haz 2026", price: 980 },
                { date: "Tem 2026", price: 1020 },
                { date: "Ağu 2026", price: 1080 },
                { date: "Eyl 2026", price: 1100 }
            ],
            change24h: 1.8,
            defense: 60,
            speedModifier: "-3%",
            durability: 250,
            description: "Gövde ve omuzları kaplayan polimer plakalarla darbe enerjisini emer.",
            source: "Paintball Turnuva Ödülü"
        },
        {
            id: "arm-03",
            name: "Boya Kalkanı Yelek (Splatter Shield)",
            category: "armor",
            rarity: "rare",
            rarityName: "Ender",
            price: 1650,
            priceHistory: [
                { date: "Haz 2026", price: 1400 },
                { date: "Tem 2026", price: 1520 },
                { date: "Ağu 2026", price: 1600 },
                { date: "Eyl 2026", price: 1650 }
            ],
            change24h: 3.1,
            defense: 75,
            speedModifier: "-5%",
            durability: 320,
            description: "Özel su geçirmez nanoteknoloji boyanın yapışmasını önler ve hasarı kırar.",
            source: "Viktor'un Atölyesi"
        },
        {
            id: "arm-04",
            name: "Ağır Juggernaut Zırhı",
            category: "armor",
            rarity: "legendary",
            rarityName: "Efsanevi",
            price: 5400,
            priceHistory: [
                { date: "Haz 2026", price: 6200 },
                { date: "Tem 2026", price: 5900 },
                { date: "Ağu 2026", price: 5600 },
                { date: "Eyl 2026", price: 5400 }
            ],
            change24h: -3.5,
            defense: 120,
            speedModifier: "-15%",
            durability: 600,
            description: "Ağır makineli ateşi altında bile ayakta kalan çelik takviyeli dev tank zırhı.",
            source: "Cyborg Saldırısı Hard Mode"
        },
        {
            id: "arm-05",
            name: "Çeviklik Koşum Takımı (Agility Harness)",
            category: "armor",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 780,
            priceHistory: [
                { date: "Haz 2026", price: 700 },
                { date: "Tem 2026", price: 730 },
                { date: "Ağu 2026", price: 760 },
                { date: "Eyl 2026", price: 780 }
            ],
            change24h: 2.6,
            defense: 40,
            speedModifier: "+8%",
            durability: 180,
            description: "Hafif karbon ipliklerle dokunmuş, bayrak taşıyıcıları için hız artırıcı koşum.",
            source: "Bayrak Kapmaca Ligi"
        }
    ],

    // 4. MASKELER & KIYAFETLER (MASKS, OUTFITS & WEARABLES - 465 PIECES)
    masks: [
        {
            id: "msk-01",
            name: "Siber Gaz Maskesi",
            category: "masks",
            subType: "Maske",
            rarity: "epic",
            rarityName: "Epik",
            price: 2400,
            priceHistory: [
                { date: "Haz 2026", price: 1800 },
                { date: "Tem 2026", price: 2100 },
                { date: "Ağu 2026", price: 2300 },
                { date: "Eyl 2026", price: 2400 }
            ],
            change24h: 4.3,
            slot: "Yüz / Maske",
            description: "Neon yeşil filtreli retro fütüristik gaz maskesi. Şehirdeki en havalı maskelerden biri.",
            popularity: "Çok Yüksek"
        },
        {
            id: "msk-02",
            name: "Neon Hayalet Maskesi (Phantom)",
            category: "masks",
            subType: "Maske",
            rarity: "legendary",
            rarityName: "Efsanevi",
            price: 6200,
            priceHistory: [
                { date: "Haz 2026", price: 4900 },
                { date: "Tem 2026", price: 5400 },
                { date: "Ağu 2026", price: 5900 },
                { date: "Eyl 2026", price: 6200 }
            ],
            change24h: 5.0,
            slot: "Yüz / Maske",
            description: "Karanlıkta turkuaz ve altın rengi parlayan nadir koleksiyonluk hayalet maskesi.",
            popularity: "Efsanevi"
        },
        {
            id: "msk-03",
            name: "Geleneksel Kitsune Tilki Maskesi",
            category: "masks",
            subType: "Maske",
            rarity: "rare",
            rarityName: "Ender",
            price: 1750,
            priceHistory: [
                { date: "Haz 2026", price: 1600 },
                { date: "Tem 2026", price: 1680 },
                { date: "Ağu 2026", price: 1720 },
                { date: "Eyl 2026", price: 1750 }
            ],
            change24h: 1.7,
            slot: "Yüz / Maske",
            description: "El yapımı kırmızı desenli porselen tilki maskesi.",
            popularity: "Yüksek"
        },
        {
            id: "msk-04",
            name: "Paintball Tam Yüz Kaskı",
            category: "masks",
            subType: "Kask",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 640,
            priceHistory: [
                { date: "Haz 2026", price: 580 },
                { date: "Tem 2026", price: 600 },
                { date: "Ağu 2026", price: 620 },
                { date: "Eyl 2026", price: 640 }
            ],
            change24h: 3.2,
            slot: "Kafa / Kask",
            description: "Termal çift lensli sis yapmayan profesyonel paintball saha kaskı.",
            popularity: "Standart"
        },
        {
            id: "msk-05",
            name: "Graffiti Boyacı Kapüşonlusu (Hoodie)",
            category: "masks",
            subType: "Ceket",
            rarity: "rare",
            rarityName: "Ender",
            price: 1250,
            priceHistory: [
                { date: "Haz 2026", price: 1100 },
                { date: "Tem 2026", price: 1180 },
                { date: "Ağu 2026", price: 1220 },
                { date: "Eyl 2026", price: 1250 }
            ],
            change24h: 2.5,
            slot: "Gövde / Üst",
            description: "Boya lekeleriyle bezeli salaş sokak stili hoodie.",
            popularity: "Yüksek"
        },
        {
            id: "msk-06",
            name: "Siberpunk Deri Ceket",
            category: "masks",
            subType: "Ceket",
            rarity: "epic",
            rarityName: "Epik",
            price: 3100,
            priceHistory: [
                { date: "Haz 2026", price: 2700 },
                { date: "Tem 2026", price: 2900 },
                { date: "Ağu 2026", price: 3000 },
                { date: "Eyl 2026", price: 3100 }
            ],
            change24h: 3.3,
            slot: "Gövde / Üst",
            description: "Yüksek yakalı, turkuaz dikiş detaylı ve kabartma logolu özel tasarım ceket.",
            popularity: "Çok Yüksek"
        },
        {
            id: "msk-07",
            name: "Retro Arcade Spor Ayakkabı",
            category: "masks",
            subType: "Ayakkabı",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 580,
            priceHistory: [
                { date: "Haz 2026", price: 540 },
                { date: "Tem 2026", price: 560 },
                { date: "Ağu 2026", price: 570 },
                { date: "Eyl 2026", price: 580 }
            ],
            change24h: 1.7,
            slot: "Ayak / Ayakkabı",
            description: "Kalın tabanlı, altın ve siyah renk bloklu 90'lar esintili sneaker.",
            popularity: "Orta"
        }
    ],

    // 5. MOBİLYALAR & EV SİSTEMİ (116 FURNITURE & SEBASTIAN'S HOME PLANS)
    furniture: [
        {
            id: "fur-01",
            name: "Kadife Retro Koltuk (4 Renk)",
            category: "furniture",
            subType: "Oturma Grubu",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 420,
            priceHistory: [
                { date: "Haz 2026", price: 380 },
                { date: "Tem 2026", price: 400 },
                { date: "Ağu 2026", price: 410 },
                { date: "Eyl 2026", price: 420 }
            ],
            change24h: 2.4,
            rotatable: "4 Yön",
            colorOptions: ["Kum Sarısı", "Turkuaz Deniz", "Mürekkep Siyah", "Zeytin Yeşili"],
            description: "Düzenleyicide rengi değiştirilebilen ve 4 yöne çevrilebilen klasik ev koltuğu.",
            source: "Mobilyacıdan Satın Alınır"
        },
        {
            id: "fur-02",
            name: "Neon Oyun Masası & Çift Monitör",
            category: "furniture",
            subType: "Masa",
            rarity: "rare",
            rarityName: "Ender",
            price: 1350,
            priceHistory: [
                { date: "Haz 2026", price: 1100 },
                { date: "Tem 2026", price: 1200 },
                { date: "Ağu 2026", price: 1300 },
                { date: "Eyl 2026", price: 1350 }
            ],
            change24h: 3.8,
            rotatable: "4 Yön",
            colorOptions: ["RGB Neon", "Siyah Karbon"],
            description: "RGB aydınlatmalı profesyonel oyuncu masası.",
            source: "Mobilyacıdan Satın Alınır"
        },
        {
            id: "fur-03",
            name: "Vintage Pikap & Plak Standı",
            category: "furniture",
            subType: "Dekorasyon",
            rarity: "rare",
            rarityName: "Ender",
            price: 890,
            priceHistory: [
                { date: "Haz 2026", price: 800 },
                { date: "Tem 2026", price: 840 },
                { date: "Ağu 2026", price: 870 },
                { date: "Eyl 2026", price: 890 }
            ],
            change24h: 2.3,
            rotatable: "2 Yön",
            colorOptions: ["Ceviz Ağacı", "Meşe"],
            description: "Eve gelen misafirler için nostaljik arka plan müziği çalar.",
            source: "Antikacı / Mobilyacı"
        },
        {
            id: "fur-04",
            name: "Action Dimension Mini Arcade Makinesi",
            category: "furniture",
            subType: "Oyun Makinesi",
            rarity: "legendary",
            rarityName: "Efsanevi",
            price: 4800,
            priceHistory: [
                { date: "Haz 2026", price: 3900 },
                { date: "Tem 2026", price: 4300 },
                { date: "Ağu 2026", price: 4600 },
                { date: "Eyl 2026", price: 4800 }
            ],
            change24h: 4.3,
            rotatable: "4 Yön",
            colorOptions: ["Klasik Sarı", "Neon Mor"],
            description: "Eve yerleştirilen ve arkadaşlarınla mini tenis oynamanı sağlayan çalışan arcade kabini.",
            source: "Sebastian Gizli Görevi"
        },
        {
            id: "fur-05",
            name: "Sebastian Ev Planı: Çatı Katı Dairesi",
            category: "furniture",
            subType: "Ev Planı",
            rarity: "epic",
            rarityName: "Epik",
            price: 2500,
            priceHistory: [
                { date: "Haz 2026", price: 2500 },
                { date: "Tem 2026", price: 2500 },
                { date: "Ağu 2026", price: 2500 },
                { date: "Eyl 2026", price: 2500 }
            ],
            change24h: 0.0,
            rotatable: "Sabit Plan",
            colorOptions: ["Geniş Salon + Teras"],
            description: "Şehir manzaralı iki katlı tavanı yüksek ferah çatı katı mimari planı.",
            source: "Sebastian Emlak Ofisi"
        }
    ],

    // 6. POTIONLAR & TÜKETİM EŞYALARI (POTIONS & CONSUMABLES)
    potions: [
        {
            id: "pot-01",
            name: "Çita Hız İksiri (Speed Potion)",
            category: "potions",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 120,
            priceHistory: [
                { date: "Haz 2026", price: 100 },
                { date: "Tem 2026", price: 110 },
                { date: "Ağu 2026", price: 115 },
                { date: "Eyl 2026", price: 120 }
            ],
            change24h: 4.3,
            duration: "1 Maç (10 Dk)",
            effect: "+20% Koşu Hızı ve Çeviklik",
            description: "Paintball'da bayrağı kapıp kaçarken veya kurşunlardan kaçarken anlık hız patlaması sağlar."
        },
        {
            id: "pot-02",
            name: "Büyük XP Güçlendirici İksir",
            category: "potions",
            rarity: "rare",
            rarityName: "Ender",
            price: 350,
            priceHistory: [
                { date: "Haz 2026", price: 420 },
                { date: "Tem 2026", price: 390 },
                { date: "Ağu 2026", price: 360 },
                { date: "Eyl 2026", price: 350 }
            ],
            change24h: -2.8,
            duration: "2 Saat",
            effect: "+100% Maç ve Sohbet XP Kazancı",
            description: "Seviye atlayarak yeni silah ve kıyafet kilitlerini hızla açmak için kullanılır."
        },
        {
            id: "pot-03",
            name: "Kristal Enerji Potionı",
            category: "potions",
            rarity: "epic",
            rarityName: "Epik",
            price: 650,
            priceHistory: [
                { date: "Haz 2026", price: 500 },
                { date: "Tem 2026", price: 560 },
                { date: "Ağu 2026", price: 610 },
                { date: "Eyl 2026", price: 650 }
            ],
            change24h: 6.5,
            duration: "Kalıcı Stat",
            effect: "+5 Kalıcı Karakter Canı",
            description: "Minifal simyagerleri tarafından üretilen nadir kalıcı dayanıklılık artırıcı."
        },
        {
            id: "pot-04",
            name: "Neon Parıltı Boya İksiri",
            category: "potions",
            rarity: "uncommon",
            rarityName: "Nadir",
            price: 180,
            priceHistory: [
                { date: "Haz 2026", price: 150 },
                { date: "Tem 2026", price: 160 },
                { date: "Ağu 2026", price: 175 },
                { date: "Eyl 2026", price: 180 }
            ],
            change24h: 2.8,
            duration: "24 Saat",
            effect: "Karakterin arkasında neon boya izi bırakır",
            description: "Şehir merkezinde dolaşırken tüm oyuncuların dikkatini çeken ışıltılı estetik aura."
        }
    ],

    // 7. PAINTBALL FALLING RATE (DÜŞME İHTİMALİ & ORANLARI) - ŞİMDİLİK PASİF / PREVIEW
    fallingRates: {
        status: "passive", // İstediğiniz gibi pasif
        statusText: "Şimdilik Pasif — Gelecek Sezonda Açılacak",
        notice: "Paintball maç sonu ganimet sistemi geliştirme aşamasındadır. Aşağıdaki düşme oranları (Falling Rate) ve kategori havuzu önizleme amaçlıdır.",
        tiers: [
            {
                tier: "Yaygın (Common)",
                rate: "60.0%",
                color: "sand",
                items: ["Standart Boya Tabancası", "Çaylak Paintball Yeleği", "Boya Kapsülü Paketi", "Hız İksiri"]
            },
            {
                tier: "Nadir (Uncommon)",
                rate: "25.0%",
                color: "teal",
                items: ["Akrep SMG", "Pompalı Püskürtücü", "Boya Haznesi Genişletici", "Çeviklik Koşum Takımı"]
            },
            {
                tier: "Ender (Rare)",
                rate: "11.5%",
                color: "gold",
                items: ["Fırtına Hücum Tüfeği", "Hızlı Tetik Kiti", "Taktik Hücum Zırhı", "Kitsune Tilki Maskesi"]
            },
            {
                tier: "Epik & Efsanevi (Epic / Legendary)",
                rate: "3.5%",
                color: "orange",
                items: ["Barut Keskin Nişancı", "Plazma Boya Topu", "Neon Hayalet Maskesi", "Ağır Juggernaut Zırhı"]
            }
        ]
    }
};

// Node ortamında dışa aktarma (testler ve otomasyon için)
if (typeof module !== "undefined" && module.exports) {
    module.exports = MINIFAL_DATABASE;
}

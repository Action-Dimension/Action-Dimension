/**
 * ==============================================================================
 * MINIFAL FANDOM & WIKI - STATİK VERİTABANI
 * ==============================================================================
 * Oyun içi para birimleri:
 * - Cash: Sarı altın sikke (Çoğu eşya Cash ile alınır)
 * - Crystal: Parlak yeşil kristal taş (Bazı özel ve nadir eşyalar Crystal ile alınır)
 * ==============================================================================
 */

const MINIFAL_DATABASE = {
    // Sürüm ve para birimleri
    meta: {
        gameVersion: "0.0.55",
        lastUpdated: "2026-09-22",
        currencies: {
            cash: { name: "Cash", icon: "./img/cash_coin_trans.png", desc: "Temel pazar ve dükkan para birimi" },
            crystal: { name: "Crystal", icon: "./img/crystal_gem_trans.png", desc: "Özel ve seçkin eşyalar için kristal" }
        },
        totalItemsCount: 465,
        totalWeapons: 48,
        totalArmor: 16,
        totalModkits: 21,
        totalFurniture: 116
    },

    // Kategori Tanımları
    categories: [
        { id: "all", name: "Tüm Eşyalar", icon: "🌐", color: "ink", count: 48, desc: "Minifal evrenindeki tüm eşyaların ortak kataloğu." },
        { id: "weapons", name: "Silahlar", icon: "🔫", color: "orange", count: 24, desc: "Paintball sahasında kullanılan hafif, ağır ve özel boya silahları." },
        { id: "armor", name: "Zırhlar & Kalkanlar", icon: "🛡️", color: "gold", count: 12, desc: "Maçlarda boya hasarını engelleyen taktik yelekler, kalkanlar ve robotik zırhlar." },
        { id: "modkits", name: "Modkitler", icon: "⚙️", color: "teal", count: 8, desc: "Silahların hasar, hız ve menzilini artıran geliştirme modülleri ve sökücüler." },
        { id: "potions", name: "Taktik Çantalar", icon: "🧪", color: "teal", count: 7, desc: "Can ve cephane ikmal paketleri, hız ve çeviklik güçlendiriciler." },
        { id: "masks", name: "Kıyafet & Maske", icon: "🎭", color: "olive", count: 465, desc: "Şehirde tarzını yansıtan maskeler, tişörtler, şortlar ve ceketler." },
        { id: "furniture", name: "Mobilyalar & Ev", icon: "🛋️", color: "sand", count: 116, desc: "Sebastian'dan alınan ev planları ve odayı döşeyen mobilyalar." },
        { id: "market", name: "Market Fiyatları", icon: "📈", color: "gold", count: 50, desc: "2. el pazarındaki canlı fiyatlar ve zaman içindeki değişim grafikleri." },
        { id: "drops", name: "Falling Rate (Pasif)", icon: "🎯", color: "orange", count: 0, desc: "Paintball maç sonu düşme ihtimalleri (Şimdilik pasif)." }
    ],

    // 1. SILAHLAR (WEAPONS)
    weapons: [
        {
            id: "wep-light-machine-gun",
            name: "Light Machine Gun",
            category: "weapons",
            subType: "Hafif Makineli (LMG)",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/light_machine_gun_trans.png",
            currency: "cash",
            price: 1770,
            marketRange: "1.650 - 2.100 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 1600 },
                { date: "Tem 2026", price: 1680 },
                { date: "Ağu 2026", price: 1720 },
                { date: "Eyl 2026", price: 1770 }
            ],
            change24h: 2.9,
            modkitSlots: 3,
            stats: { damage: 12, fireRate: 92, range: 62, reload: 45, capacity: 60 },
            description: "Hızlı atış temposu ve istikrarlı geri tepmesiyle öne çıkan resmi Minifal hafif makineli boya tüfeği. Mermi başına tam 12 hasar verir. Örneğin 4016 cana sahip bir Commander'ı düşürmek için tam 335 mermi isabeti gerekir.",
            source: "Dükkan / 1.770 Cash",
            combatBenchmark: "12 Hasar / Mermi · 4016 Canlı Commander'a karşı 335 isabet",
            compatibleModkits: ["Hızlı Tetik Kiti", "Boya Haznesi Genişletici", "Paintball Mod Kit"]
        },
        {
            id: "wep-heavy-machine-gun",
            name: "Heavy Machine Gun",
            category: "weapons",
            subType: "Ağır Makineli (HMG)",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/heavy_machine_gun_trans.png",
            currency: "crystal",
            price: 92,
            marketRange: "85 - 105 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 80 },
                { date: "Tem 2026", price: 85 },
                { date: "Ağu 2026", price: 90 },
                { date: "Eyl 2026", price: 92 }
            ],
            change24h: 2.2,
            modkitSlots: 4,
            stats: { damage: 24, fireRate: 85, range: 75, reload: 35, capacity: 100 },
            description: "Geniş tambur şarjörlü ve ağır namlulu Crystal makineli tüfeği. Yoğun baskı ateşi açar.",
            source: "Dükkan / 92 Crystal",
            combatBenchmark: "24 Hasar / Mermi · 4016 Canlı Commander'a karşı 168 isabet",
            compatibleModkits: ["Dev Hazne Kiti", "Paintball Mod Kit"]
        },
        {
            id: "wep-assault-rifle",
            name: "Assault Rifle",
            category: "weapons",
            subType: "Hücum Tüfeği",
            rarity: "common",
            rarityName: "Standart",
            image: "./img/items/assault_rifle_trans.png",
            currency: "cash",
            price: 276,
            marketRange: "250 - 320 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 250 },
                { date: "Tem 2026", price: 260 },
                { date: "Ağu 2026", price: 270 },
                { date: "Eyl 2026", price: 276 }
            ],
            change24h: 2.2,
            modkitSlots: 2,
            stats: { damage: 18, fireRate: 75, range: 65, reload: 55, capacity: 30 },
            description: "Dengeli atış hızı ve geri tepmesiyle Paintball sahalarının en popüler temel piyade tüfeği.",
            source: "Dükkan / 276 Cash",
            combatBenchmark: "18 Hasar / Mermi · 4016 Canlı Commander'a karşı 224 isabet",
            compatibleModkits: ["Hızlı Tetik Kiti", "Paintball Mod Kit"]
        },
        {
            id: "wep-hunting-rifle",
            name: "Hunting Rifle",
            category: "weapons",
            subType: "Av Tüfeği",
            rarity: "common",
            rarityName: "Standart",
            image: "./img/items/hunting_rifle_trans.png",
            currency: "cash",
            price: 306,
            marketRange: "280 - 340 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 280 },
                { date: "Tem 2026", price: 290 },
                { date: "Ağu 2026", price: 300 },
                { date: "Eyl 2026", price: 306 }
            ],
            change24h: 2.0,
            modkitSlots: 2,
            stats: { damage: 32, fireRate: 45, range: 80, reload: 50, capacity: 10 },
            description: "Uzun menzilli ve tek tek atış yapan ahşap kundaklı klasik av tüfeği.",
            source: "Dükkan / 306 Cash",
            combatBenchmark: "32 Hasar / Mermi · 4016 Canlı Commander'a karşı 126 isabet",
            compatibleModkits: ["Keskin Nişancı Dürbünü", "Paintball Mod Kit"]
        },
        {
            id: "wep-assault-shotgun",
            name: "Assault Shotgun",
            category: "weapons",
            subType: "Otomatik Pompalı",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/assault_shotgun_trans.png",
            currency: "cash",
            price: 528,
            marketRange: "490 - 580 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 480 },
                { date: "Tem 2026", price: 500 },
                { date: "Ağu 2026", price: 515 },
                { date: "Eyl 2026", price: 528 }
            ],
            change24h: 2.5,
            modkitSlots: 3,
            stats: { damage: 65, fireRate: 50, range: 35, reload: 40, capacity: 8 },
            description: "Yakın mesafede geniş boya saçması püskürten seri atışlı saldırı pompalısı.",
            source: "Dükkan / 528 Cash",
            combatBenchmark: "65 Hasar / Vuruş · 4016 Canlı Commander'a karşı 62 isabet",
            compatibleModkits: ["Geniş Namlu", "Paintball Mod Kit"]
        },
        {
            id: "wep-double-barrel",
            name: "Double Barrel",
            category: "weapons",
            subType: "Çifte Pompalı",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/double_barrel_trans.png",
            currency: "cash",
            price: 468,
            marketRange: "420 - 500 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 430 },
                { date: "Tem 2026", price: 450 },
                { date: "Ağu 2026", price: 460 },
                { date: "Eyl 2026", price: 468 }
            ],
            change24h: 1.7,
            modkitSlots: 2,
            stats: { damage: 95, fireRate: 30, range: 25, reload: 30, capacity: 2 },
            description: "İki namludan aynı anda boya kapsülü patlatan yıkıcı yakın dövüş çifte silahı.",
            source: "Dükkan / 468 Cash",
            combatBenchmark: "95 Hasar / Çift Vuruş · 4016 Canlı Commander'a karşı 43 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-sniper-rifle",
            name: "Sniper Rifle",
            category: "weapons",
            subType: "Keskin Nişancı",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/sniper_rifle_trans.png",
            currency: "cash",
            price: 2256,
            marketRange: "2.000 - 2.500 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 2100 },
                { date: "Tem 2026", price: 2180 },
                { date: "Ağu 2026", price: 2220 },
                { date: "Eyl 2026", price: 2256 }
            ],
            change24h: 1.6,
            modkitSlots: 3,
            stats: { damage: 85, fireRate: 25, range: 95, reload: 40, capacity: 5 },
            description: "Yüksek büyütmeli dürbünüyle uzak mesafeden hedefleri tam isabetle vuran keskin nişancı tüfeği.",
            source: "Dükkan / 2.256 Cash",
            combatBenchmark: "85 Hasar / Mermi · 4016 Canlı Commander'a karşı 48 isabet",
            compatibleModkits: ["Keskin Nişancı Dürbünü", "Paintball Mod Kit"]
        },
        {
            id: "wep-grenade-launcher",
            name: "Grenade Launcher",
            category: "weapons",
            subType: "Bombaatar",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/grenade_launcher_trans.png",
            currency: "cash",
            price: 2808,
            marketRange: "2.600 - 3.100 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 2550 },
                { date: "Tem 2026", price: 2680 },
                { date: "Ağu 2026", price: 2750 },
                { date: "Eyl 2026", price: 2808 }
            ],
            change24h: 2.1,
            modkitSlots: 3,
            stats: { damage: 110, fireRate: 20, range: 50, reload: 35, capacity: 4 },
            description: "Tamburlu boya bombası fırlatıcı. Siper arkasındaki rakipleri topluca boyar.",
            source: "Dükkan / 2.808 Cash",
            combatBenchmark: "110 Hasar / Bomba · 4016 Canlı Commander'a karşı 37 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-spray-thrower",
            name: "Spray Thrower",
            category: "weapons",
            subType: "Boya Püskürtücü",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/spray_thrower_trans.png",
            currency: "crystal",
            price: 132,
            marketRange: "120 - 150 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 115 },
                { date: "Tem 2026", price: 122 },
                { date: "Ağu 2026", price: 128 },
                { date: "Eyl 2026", price: 132 }
            ],
            change24h: 3.1,
            modkitSlots: 4,
            stats: { damage: 15, fireRate: 98, range: 30, reload: 60, capacity: 120 },
            description: "İki yüksek basınçlı boya tüpüyle sürekli boya püskürten alev makinesi benzeri özel silah.",
            source: "Dükkan / 132 Crystal",
            combatBenchmark: "15 Hasar / Sürekli Akış · 4016 Canlı Commander'a karşı 268 isabet",
            compatibleModkits: ["Yüksek Basınç Valfi", "Paintball Mod Kit"]
        },
        {
            id: "wep-scoped-assault-rifle",
            name: "Scoped Assault Rifle",
            category: "weapons",
            subType: "Dürbünlü Hücum Tüfeği",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/scoped_assault_rifle_trans.png",
            currency: "crystal",
            price: 110,
            marketRange: "95 - 125 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 95 },
                { date: "Tem 2026", price: 102 },
                { date: "Ağu 2026", price: 108 },
                { date: "Eyl 2026", price: 110 }
            ],
            change24h: 1.8,
            modkitSlots: 4,
            stats: { damage: 22, fireRate: 70, range: 85, reload: 50, capacity: 30 },
            description: "Taktik optik dürbün takılı özel Crystal hücum tüfeği. Orta ve uzak mesafede yüksek isabet sunar.",
            source: "Dükkan / 110 Crystal",
            combatBenchmark: "22 Hasar / Mermi · 4016 Canlı Commander'a karşı 183 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-paint-wave-launcher",
            name: "Paint Wave Launcher",
            category: "weapons",
            subType: "Dalga Fırlatıcı",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/paint_wave_launcher_trans.png",
            currency: "cash",
            price: 7320,
            marketRange: "6.900 - 8.200 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 6800 },
                { date: "Tem 2026", price: 7050 },
                { date: "Ağu 2026", price: 7200 },
                { date: "Eyl 2026", price: 7320 }
            ],
            change24h: 1.6,
            modkitSlots: 5,
            stats: { damage: 90, fireRate: 35, range: 55, reload: 45, capacity: 8 },
            description: "Düz bir hat üzerinde devasa boya dalgaları fırlatan üst düzey deneysel paintball silahı.",
            source: "Dükkan / 7.320 Cash",
            combatBenchmark: "90 Hasar / Dalga · 4016 Canlı Commander'a karşı 45 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-heavy-rocket",
            name: "Heavy Rocket",
            category: "weapons",
            subType: "Ağır Roketatar",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/heavy_rocket_trans.png",
            currency: "crystal",
            price: 120,
            marketRange: "110 - 135 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 105 },
                { date: "Tem 2026", price: 112 },
                { date: "Ağu 2026", price: 118 },
                { date: "Eyl 2026", price: 120 }
            ],
            change24h: 1.7,
            modkitSlots: 4,
            stats: { damage: 140, fireRate: 15, range: 85, reload: 25, capacity: 2 },
            description: "Zırhlı hedefleri ve barikatları paramparça eden ağır kalibreli Crystal roketatar.",
            source: "Dükkan / 120 Crystal",
            combatBenchmark: "140 Hasar / Roket · 4016 Canlı Commander'a karşı 29 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-scoped-rocket-launcher",
            name: "Scoped Rocket Launcher",
            category: "weapons",
            subType: "Dürbünlü Roketatar",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/scoped_rocket_launcher_trans.png",
            currency: "crystal",
            price: 86,
            marketRange: "75 - 95 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 75 },
                { date: "Tem 2026", price: 80 },
                { date: "Ağu 2026", price: 84 },
                { date: "Eyl 2026", price: 86 }
            ],
            change24h: 2.3,
            modkitSlots: 3,
            stats: { damage: 115, fireRate: 20, range: 90, reload: 30, capacity: 3 },
            description: "Optik hedefleme dürbünüyle roketleri tam isabetle hedefe ulaştıran roketatar.",
            source: "Dükkan / 86 Crystal",
            combatBenchmark: "115 Hasar / Roket · 4016 Canlı Commander'a karşı 35 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-full-automatic-pistol",
            name: "Full Automatic Pistol",
            category: "weapons",
            subType: "Tam Otomatik Tabanca",
            rarity: "common",
            rarityName: "Standart",
            image: "./img/items/full_automatic_pistol_trans.png",
            currency: "cash",
            price: 156,
            marketRange: "140 - 180 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 140 },
                { date: "Tem 2026", price: 148 },
                { date: "Ağu 2026", price: 152 },
                { date: "Eyl 2026", price: 156 }
            ],
            change24h: 2.6,
            modkitSlots: 2,
            stats: { damage: 10, fireRate: 90, range: 40, reload: 70, capacity: 20 },
            description: "Tetik çekili tutulduğunda seri boya mermileri sıkan hafif ve hızlı yan silah.",
            source: "Dükkan / 156 Cash",
            combatBenchmark: "10 Hasar / Mermi · 4016 Canlı Commander'a karşı 402 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-mini-smg",
            name: "Mini SMG",
            category: "weapons",
            subType: "Kompakt SMG",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/mini_smg_trans.png",
            currency: "cash",
            price: 852,
            marketRange: "780 - 920 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 780 },
                { date: "Tem 2026", price: 810 },
                { date: "Ağu 2026", price: 835 },
                { date: "Eyl 2026", price: 852 }
            ],
            change24h: 2.0,
            modkitSlots: 3,
            stats: { damage: 14, fireRate: 95, range: 45, reload: 65, capacity: 35 },
            description: "Son derece hafif gövdesiyle hızlı koşarken nişan almayı kolaylaştıran kompakt makineli tabanca.",
            source: "Dükkan / 852 Cash",
            combatBenchmark: "14 Hasar / Mermi · 4016 Canlı Commander'a karşı 287 isabet",
            compatibleModkits: ["Hızlı Tetik Kiti", "Paintball Mod Kit"]
        },
        {
            id: "wep-smg-crystal",
            name: "SMG",
            category: "weapons",
            subType: "Hafif Makineli",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/smg_crystal_trans.png",
            currency: "crystal",
            price: 46,
            marketRange: "40 - 55 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 40 },
                { date: "Tem 2026", price: 42 },
                { date: "Ağu 2026", price: 45 },
                { date: "Eyl 2026", price: 46 }
            ],
            change24h: 2.2,
            modkitSlots: 3,
            stats: { damage: 16, fireRate: 88, range: 50, reload: 60, capacity: 40 },
            description: "Crystal karşılığında alınan dayanıklı ve seri standart hafif makineli tüfek.",
            source: "Dükkan / 46 Crystal",
            combatBenchmark: "16 Hasar / Mermi · 4016 Canlı Commander'a karşı 251 isabet",
            compatibleModkits: ["Paintball Mod Kit"]
        },
        {
            id: "wep-mortar-strike",
            name: "Mortar Strike",
            category: "weapons",
            subType: "Taktik Hava Desteği",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/mortar_strike_trans.png",
            currency: "cash",
            price: 11460,
            marketRange: "10.500 - 12.800 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 10200 },
                { date: "Tem 2026", price: 10800 },
                { date: "Ağu 2026", price: 11200 },
                { date: "Eyl 2026", price: 11460 }
            ],
            change24h: 2.3,
            modkitSlots: 0,
            stats: { damage: 250, fireRate: 5, range: 100, reload: 10, capacity: 1 },
            description: "İşaretlenen koordinata gökten ağır boya havanı yağdıran telsiz çağrı cihazı.",
            source: "Dükkan / 11.460 Cash",
            combatBenchmark: "250 Hasar / Havan Atışı · 4016 Canlı Commander'a karşı 17 isabet",
            compatibleModkits: []
        },
        {
            id: "wep-napalm-strike",
            name: "Napalm Strike",
            category: "weapons",
            subType: "Taktik Napalm Desteği",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/napalm_strike_trans.png",
            currency: "crystal",
            price: 128,
            marketRange: "115 - 145 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 110 },
                { date: "Tem 2026", price: 118 },
                { date: "Ağu 2026", price: 124 },
                { date: "Eyl 2026", price: 128 }
            ],
            change24h: 3.2,
            modkitSlots: 0,
            stats: { damage: 300, fireRate: 5, range: 100, reload: 10, capacity: 1 },
            description: "Belirlenen hatta geniş boya ateşi yayan napalm uçak bombardımanı çağrısı.",
            source: "Dükkan / 128 Crystal",
            combatBenchmark: "300 Hasar / Bombardıman · 4016 Canlı Commander'a karşı 14 isabet",
            compatibleModkits: []
        },
        {
            id: "wep-infiltrator-shotgun",
            name: "Infiltrator Shotgun",
            category: "weapons",
            subType: "Pompalı Tüfek",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/infiltrator_shotgun_trans.png",
            currency: "cash",
            price: 5800,
            marketRange: "5.000 - 25.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 5000 },
                { date: "Tem 2026", price: 5500 },
                { date: "Ağu 2026", price: 5800 },
                { date: "Eyl 2026", price: 10000 }
            ],
            change24h: 5.4,
            modkitSlots: 3,
            stats: { damage: 85, fireRate: 40, range: 45, reload: 65, capacity: 12 },
            description: "Döner tamburlu şarjörü ve kırmızı gövde şeridiyle yakın mesafede yüksek dağılımlı boya hasarı vuran Infiltrator serisi pompalı tüfek.",
            source: "2. El Market / Paintball Kasası",
            compatibleModkits: ["Hızlı Tetik Kiti", "Geniş Namlu", "Paintball Mod Kit"]
        },
        {
            id: "wep-infiltrator-sniper",
            name: "Infiltrator Sniper",
            category: "weapons",
            subType: "Keskin Nişancı",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/infiltrator_sniper_trans.png",
            currency: "cash",
            price: 9000,
            marketRange: "7.520 - 18.920 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 7520 },
                { date: "Tem 2026", price: 7920 },
                { date: "Ağu 2026", price: 9000 },
                { date: "Eyl 2026", price: 10920 }
            ],
            change24h: 21.3,
            modkitSlots: 4,
            stats: { damage: 98, fireRate: 20, range: 100, reload: 40, capacity: 6 },
            description: "Yüksek büyütmeli optik dürbünlü, uzun namlulu Infiltrator keskin nişancı tüfeği. Haritanın bir ucundan rakibi tek atışta boyar.",
            source: "2. El Market / Turnuva Ödülü",
            compatibleModkits: ["Keskin Nişancı Dürbünü", "Yüksek Basınç Valfi", "Dengeleyici Dipçik", "Paintball Mod Kit"]
        },
        {
            id: "wep-cyborg-minigun",
            name: "Cyborg Minigun",
            category: "weapons",
            subType: "Ağır Makineli",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/cyborg_minigun_trans.png",
            currency: "cash",
            price: 25900,
            marketRange: "23.200 - 25.900 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 21000 },
                { date: "Tem 2026", price: 23200 },
                { date: "Ağu 2026", price: 24500 },
                { date: "Eyl 2026", price: 25900 }
            ],
            change24h: 5.7,
            modkitSlots: 5,
            stats: { damage: 45, fireRate: 98, range: 68, reload: 30, capacity: 180 },
            description: "Neon yeşil enerji çekirdeği ve turuncu gövdesiyle Cyborg Saldırısı modunun en güçlü döner namlulu ağır boya makinelisi.",
            source: "Cyborg Boss Zafer Sandığı",
            compatibleModkits: ["Dev Hazne Kiti", "Yüksek Basınç Valfi", "Dengeleyici Dipçik", "Paintball Mod Kit"]
        },
        {
            id: "wep-cyborg-rocketeer",
            name: "Cyborg Rocketeer",
            category: "weapons",
            subType: "Roketatar",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/cyborg_rocketeer_trans.png",
            currency: "cash",
            price: 33200,
            marketRange: "29.000 - 33.200 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 28000 },
                { date: "Tem 2026", price: 30500 },
                { date: "Ağu 2026", price: 32000 },
                { date: "Eyl 2026", price: 33200 }
            ],
            change24h: 3.75,
            modkitSlots: 5,
            stats: { damage: 120, fireRate: 15, range: 90, reload: 25, capacity: 4 },
            description: "Ağır plazma roketi fırlatan deneysel fütüristik silah. Geniş alana boya patlaması yayarak tüm takımı etkisiz hale getirir.",
            source: "Cyborg Etkinlik Görevi",
            compatibleModkits: ["Boya Haznesi Genişletici", "Yüksek Basınç Valfi", "Paintball Mod Kit"]
        },
        {
            id: "wep-rocket-launcher",
            name: "Rocket Launcher",
            category: "weapons",
            subType: "Ağır Silah",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/rocket_launcher_trans.png",
            currency: "cash",
            price: 3066,
            marketRange: "3.000 - 3.500 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 3000 },
                { date: "Tem 2026", price: 3020 },
                { date: "Ağu 2026", price: 3040 },
                { date: "Eyl 2026", price: 3066 }
            ],
            change24h: 2.0,
            modkitSlots: 2,
            stats: { damage: 90, fireRate: 25, range: 70, reload: 35, capacity: 6 },
            description: "Gri gövdeli askeri boya roketi fırlatıcısı. Barikat arkasındaki rakipleri temizlemek için ideal.",
            source: "Dükkan / 3.066 Cash",
            compatibleModkits: ["Hızlı Doldurma", "Paintball Mod Kit"]
        }
    ],

    // 2. ZIRHLAR & KALKANLAR (ARMOR)
    armor: [
        {
            id: "arm-dark",
            name: "Dark Armor",
            category: "armor",
            subType: "Karanlık Zırh (En Üst Seviye)",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/dark_armor_trans.png",
            currency: "crystal",
            price: 210,
            marketRange: "195 - 240 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 180 },
                { date: "Tem 2026", price: 195 },
                { date: "Ağu 2026", price: 205 },
                { date: "Eyl 2026", price: 210 }
            ],
            change24h: 2.4,
            defense: 95,
            speedModifier: "+8%",
            durability: 320,
            description: "Siyah açılı kompozit levhaları ve kırmızı parlayan vizörüyle Minifal'ın en güçlü savunma zırhı.",
            source: "Dükkan / 210 Crystal"
        },
        {
            id: "arm-crystal",
            name: "Crystal Armor",
            category: "armor",
            subType: "Elit Kristal Zırh",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/crystal_armor_trans.png",
            currency: "crystal",
            price: 118,
            marketRange: "110 - 130 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 105 },
                { date: "Tem 2026", price: 110 },
                { date: "Ağu 2026", price: 115 },
                { date: "Eyl 2026", price: 118 }
            ],
            change24h: 2.6,
            defense: 90,
            speedModifier: "+5%",
            durability: 280,
            description: "Geometrik fütüristik kristal kaskı ve hafif zırh panelleriyle hem yüksek koruma hem de hız katar.",
            source: "Dükkan / 118 Crystal"
        },
        {
            id: "arm-ninja",
            name: "Ninja Armor",
            category: "armor",
            subType: "Gölge Ninja Zırhı",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/ninja_armor_trans.png",
            currency: "crystal",
            price: 60,
            marketRange: "55 - 70 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 50 },
                { date: "Tem 2026", price: 55 },
                { date: "Ağu 2026", price: 58 },
                { date: "Eyl 2026", price: 60 }
            ],
            change24h: 3.4,
            defense: 50,
            speedModifier: "+15%",
            durability: 160,
            description: "Kafa bandanası ve hafif kumaş zırhıyla oyuncuya sahada olağanüstü hareket hızı ve çeviklik sağlar.",
            source: "Dükkan / 60 Crystal"
        },
        {
            id: "arm-steam",
            name: "Steam Armor",
            category: "armor",
            subType: "Buharlı Zırh",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/steam_armor_trans.png",
            currency: "crystal",
            price: 44,
            marketRange: "40 - 52 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 38 },
                { date: "Tem 2026", price: 40 },
                { date: "Ağu 2026", price: 42 },
                { date: "Eyl 2026", price: 44 }
            ],
            change24h: 4.7,
            defense: 75,
            speedModifier: "-5%",
            durability: 220,
            description: "Pirinç vanaları, sivri kaskı ve buhar filtreleriyle ağır steampunk tarzı taktik zırh.",
            source: "Dükkan / 44 Crystal"
        },
        {
            id: "arm-cyber",
            name: "Cyber Armor",
            category: "armor",
            subType: "Siber Zırh",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/cyber_armor_trans.png",
            currency: "crystal",
            price: 46,
            marketRange: "42 - 55 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 40 },
                { date: "Tem 2026", price: 43 },
                { date: "Ağu 2026", price: 45 },
                { date: "Eyl 2026", price: 46 }
            ],
            change24h: 2.2,
            defense: 70,
            speedModifier: "+2%",
            durability: 200,
            description: "Turuncu-siyah çizgili sibernetik gövde zırhı ve parlayan kaskı ile darbelere karşı dirençlidir.",
            source: "Dükkan / 46 Crystal"
        },
        {
            id: "arm-marine",
            name: "Marine Armor",
            category: "armor",
            subType: "Deniz Piyadesi Zırhı",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/marine_armor_trans.png",
            currency: "crystal",
            price: 20,
            marketRange: "18 - 25 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 18 },
                { date: "Tem 2026", price: 19 },
                { date: "Ağu 2026", price: 20 },
                { date: "Eyl 2026", price: 20 }
            ],
            change24h: 0.0,
            defense: 60,
            speedModifier: "+0%",
            durability: 180,
            description: "Izgara vizörlü ve oksijen tüplü taktik deniz piyadesi üniforması.",
            source: "Dükkan / 20 Crystal"
        },
        {
            id: "arm-large-shield",
            name: "Large Paint Shield",
            category: "armor",
            subType: "Büyük Boya Kalkanı",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/large_paint_shield_trans.png",
            currency: "crystal",
            price: 40,
            marketRange: "35 - 48 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 35 },
                { date: "Tem 2026", price: 38 },
                { date: "Ağu 2026", price: 40 },
                { date: "Eyl 2026", price: 40 }
            ],
            change24h: 0.0,
            defense: 85,
            speedModifier: "-10%",
            durability: 350,
            description: "Geniş gövdesiyle gelen tüm paintball saçmalarını ve roket şarapnellerini bloke eden ağır kalkan.",
            source: "Dükkan / 40 Crystal"
        },
        {
            id: "arm-small-shield",
            name: "Small Paint Shield",
            category: "armor",
            subType: "Küçük Boya Kalkanı",
            rarity: "uncommon",
            rarityName: "Nadir",
            image: "./img/items/small_paint_shield_trans.png",
            currency: "cash",
            price: 2946,
            marketRange: "2.700 - 3.200 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 2800 },
                { date: "Tem 2026", price: 2880 },
                { date: "Ağu 2026", price: 2910 },
                { date: "Eyl 2026", price: 2946 }
            ],
            change24h: 1.2,
            defense: 45,
            speedModifier: "-2%",
            durability: 200,
            description: "Tek elle taşınabilen çevik taktik boya kalkanı.",
            source: "Dükkan / 2.946 Cash"
        },
        {
            id: "arm-commando",
            name: "Commando Armor",
            category: "armor",
            subType: "Taktik Zırh",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/commando_armor_trans.png",
            currency: "cash",
            price: 44900,
            marketRange: "43.000 - 46.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 38000 },
                { date: "Tem 2026", price: 41000 },
                { date: "Ağu 2026", price: 43500 },
                { date: "Eyl 2026", price: 44900 }
            ],
            change24h: 3.2,
            defense: 88,
            speedModifier: "+0%",
            durability: 250,
            description: "Gelişmiş komando taktik yeleği ve kaskı.",
            source: "2. El Market / Özel Sandık"
        },
        {
            id: "arm-hellbringer",
            name: "Hellbringer Armor",
            category: "armor",
            subType: "Ağır Zırh",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/hellbringer_armor_trans.png",
            currency: "cash",
            price: 7000,
            marketRange: "6.400 - 13.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 6400 },
                { date: "Tem 2026", price: 6700 },
                { date: "Ağu 2026", price: 6900 },
                { date: "Eyl 2026", price: 7000 }
            ],
            change24h: 1.4,
            defense: 78,
            speedModifier: "-4%",
            durability: 210,
            description: "Karanlık ve alev motifli ağır hücum zırhı.",
            source: "2. El Market / Sezonluk Etkinlik"
        }
    ],

    // 3. MODKİTLER & SÖKÜCÜLER (MODKITS)
    modkits: [
        {
            id: "mod-remover",
            name: "Paintball Mod Remover",
            category: "modkits",
            subType: "Mod Sökücü Alet Çantası",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_mod_remover_trans.png",
            currency: "crystal",
            price: 6,
            marketRange: "5 - 8 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 5 },
                { date: "Tem 2026", price: 6 },
                { date: "Ağu 2026", price: 6 },
                { date: "Eyl 2026", price: 6 }
            ],
            change24h: 0.0,
            effects: "Silaha takılı tüm modkitleri silaha ve parçaya zarar vermeden anında söker.",
            slotCost: "0 Yuva",
            compatibility: "Tüm Modkit Yuvalı Silahlar",
            description: "Siyah alet çantası ve kırmızı-turuncu aşağı ok simgeli resmi mod sökücü alet kiti. Silah kombinasyonlarınızı dilediğiniz gibi değiştirmenize olanak tanır.",
            source: "Dükkan / 6 Crystal"
        },
        {
            id: "mod-kit-636",
            name: "Paintball Mod Kit of Penetration - Small",
            category: "modkits",
            subType: "Paintball Yükseltme Kiti",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_636_trans.png",
            currency: "cash",
            price: 636,
            marketRange: "600 - 680 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 600 },
                { date: "Tem 2026", price: 620 },
                { date: "Ağu 2026", price: 630 },
                { date: "Eyl 2026", price: 636 }
            ],
            change24h: 1.0,
            effects: "[İsabetlilik Bonusu 2] Bu mod kiti isabetliliğini arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            slotCost: "1 Yuva",
            compatibility: "Paintball Silahları",
            description: "[KÜÇÜK KİT] [İsabetlilik Bonusu 2] Bu mod kiti isabetliliğini arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            source: "Dükkan / 636 Cash"
        },
        {
            id: "mod-kit-606",
            name: "Paintball Mod Kit of Brutality - Small",
            category: "modkits",
            subType: "Paintball Yükseltme Kiti",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_606_trans.png",
            currency: "cash",
            price: 606,
            marketRange: "580 - 640 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 580 },
                { date: "Tem 2026", price: 595 },
                { date: "Ağu 2026", price: 600 },
                { date: "Eyl 2026", price: 606 }
            ],
            change24h: 1.0,
            effects: "[Hasar Bonusu 2] Bu mod kiti hasarı arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            slotCost: "1 Yuva",
            compatibility: "Paintball Silahları",
            description: "[KÜÇÜK KİT] [Hasar Bonusu 2] Bu mod kiti hasarı arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            source: "Dükkan / 606 Cash"
        },
        {
            id: "mod-kit-588",
            name: "Paintball Mod Kit of Fury - Small",
            category: "modkits",
            subType: "Paintball Yükseltme Kiti",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_588_trans.png",
            currency: "cash",
            price: 588,
            marketRange: "550 - 620 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 560 },
                { date: "Tem 2026", price: 575 },
                { date: "Ağu 2026", price: 580 },
                { date: "Eyl 2026", price: 588 }
            ],
            change24h: 1.4,
            effects: "[Atış Hızı Bonusu 30] Bu mod kiti atış hızını arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            slotCost: "1 Yuva",
            compatibility: "Paintball Silahları",
            description: "[KÜÇÜK KİT] [Atış Hızı Bonusu 30] Bu mod kiti atış hızını arttırmak için paintball silahlarında kullanılabilir. Tek kullanımlık.",
            source: "Dükkan / 588 Cash"
        },
        {
            id: "mod-kit-570",
            name: "Paintball Mod Kit of Madness - Small",
            category: "modkits",
            subType: "Paintball Yükseltme Kiti",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_570_trans.png",
            currency: "cash",
            price: 570,
            marketRange: "540 - 600 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 540 },
                { date: "Tem 2026", price: 555 },
                { date: "Ağu 2026", price: 565 },
                { date: "Eyl 2026", price: 570 }
            ],
            change24h: 0.9,
            effects: "[Mermi Hızı Bonusu 2] Bu mod kiti paintball silahlarının mermi hızını arttırmak için kullanılır. Tek kullanımlık.",
            slotCost: "1 Yuva",
            compatibility: "Paintball Silahları",
            description: "[KÜÇÜK KİT] [Mermi Hızı Bonusu 2] Bu mod kiti paintball silahlarının mermi hızını arttırmak için kullanılır. Tek kullanımlık.",
            source: "Dükkan / 570 Cash"
        },
        {
            id: "mod-kit-522",
            name: "Paintball Mod Kit of Endurance - Small",
            category: "modkits",
            subType: "Paintball Yükseltme Kiti",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_522_trans.png",
            currency: "cash",
            price: 522,
            marketRange: "500 - 550 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 500 },
                { date: "Tem 2026", price: 510 },
                { date: "Ağu 2026", price: 518 },
                { date: "Eyl 2026", price: 522 }
            ],
            change24h: 0.8,
            effects: "[Şarjör Kapasitesi Bonusu 2] Bu mod kiti silahların şarjör kapasitesini arttırmak için kullanılır. Tek kullanımlık.",
            slotCost: "1 Yuva",
            compatibility: "Paintball Silahları",
            description: "[KÜÇÜK KİT] [Şarjör Kapasitesi Bonusu 2] Bu mod kiti silahların şarjör kapasitesini arttırmak için kullanılır. Tek kullanımlık.",
            source: "Dükkan / 522 Cash"
        },
        {
            id: "mod-paintball-green",
            name: "Paintball Mod Kit (Green)",
            category: "modkits",
            subType: "Özel Modkit",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/paintball_modkit_green_trans.png",
            currency: "cash",
            price: 10000,
            marketRange: "5.272 - 75.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 5272 },
                { date: "Tem 2026", price: 7800 },
                { date: "Ağu 2026", price: 9500 },
                { date: "Eyl 2026", price: 10000 }
            ],
            change24h: 5.2,
            effects: "Hasar +%20, Mermi Dağılımı -%35",
            slotCost: "2 Yuva",
            compatibility: "Tüm Boya Silahları",
            description: "Yeşil neon detaylı üst düzey turnuva kiti.",
            source: "2. El Market / Özel Etkinlik"
        },
        {
            id: "mod-paintball-orange",
            name: "Paintball Mod Kit (Orange)",
            category: "modkits",
            subType: "Özel Modkit",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_orange_trans.png",
            currency: "cash",
            price: 10500,
            marketRange: "10.001 - 11.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 9800 },
                { date: "Tem 2026", price: 10001 },
                { date: "Ağu 2026", price: 10200 },
                { date: "Eyl 2026", price: 10500 }
            ],
            change24h: 2.9,
            effects: "Atış Hızı +%25",
            slotCost: "1 Yuva",
            compatibility: "Tüm Boya Silahları",
            description: "Turuncu turnuva kiti.",
            source: "2. El Market / Dükkan"
        }
    ],

    // 4. TAKTİK ÇANTALAR & POTIONLAR
    potions: [
        {
            id: "pack-small-health",
            name: "Small Health Pack",
            category: "potions",
            subType: "Sağlık Çantası",
            rarity: "common",
            rarityName: "Standart",
            image: "./img/items/small_health_pack_trans.png",
            currency: "cash",
            price: 390,
            marketRange: "360 - 420 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 360 },
                { date: "Tem 2026", price: 380 },
                { date: "Ağu 2026", price: 385 },
                { date: "Eyl 2026", price: 390 }
            ],
            change24h: 1.3,
            duration: "Anlık Kullanım",
            effect: "+150 Can Yenileme",
            description: "Gri kutu üzerinde yeşil haç simgeli kompakt saha ilk yardım çantası.",
            source: "Dükkan / 390 Cash"
        },
        {
            id: "pack-small-supply",
            name: "Small Supply Pack",
            category: "potions",
            subType: "İkmal Çantası",
            rarity: "common",
            rarityName: "Standart",
            image: "./img/items/small_supply_pack_trans.png",
            currency: "cash",
            price: 450,
            marketRange: "400 - 490 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 400 },
                { date: "Tem 2026", price: 420 },
                { date: "Ağu 2026", price: 440 },
                { date: "Eyl 2026", price: 450 }
            ],
            change24h: 2.2,
            duration: "Anlık Kullanım",
            effect: "+3 Şarjör Cephane Yenileme",
            description: "Aktif silahın boya mermilerini anında yenileyen taktik cephane çantası.",
            source: "Dükkan / 450 Cash"
        },
        {
            id: "pack-large-health",
            name: "Large Health Pack",
            category: "potions",
            subType: "Büyük Sağlık Çantası",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/large_health_pack_trans.png",
            currency: "crystal",
            price: 20,
            marketRange: "18 - 25 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 18 },
                { date: "Tem 2026", price: 19 },
                { date: "Ağu 2026", price: 20 },
                { date: "Eyl 2026", price: 20 }
            ],
            change24h: 0.0,
            duration: "Anlık + 15sn Kalkan",
            effect: "+500 Can Yenileme & Geçici Koruma",
            description: "Büyük kulplu ve yeşil logolu profesyonel sağlık çantası.",
            source: "Dükkan / 20 Crystal"
        },
        {
            id: "pack-large-supply",
            name: "Large Supply Pack",
            category: "potions",
            subType: "Büyük İkmal Çantası",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/large_supply_pack_trans.png",
            currency: "crystal",
            price: 20,
            marketRange: "18 - 25 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 18 },
                { date: "Tem 2026", price: 19 },
                { date: "Ağu 2026", price: 20 },
                { date: "Eyl 2026", price: 20 }
            ],
            change24h: 0.0,
            duration: "Anlık",
            effect: "Tüm Silah Cephanelerini Tamamen Doldurur",
            description: "Envanterdeki tüm silahların boya haznelerini sonuna kadar doldurur.",
            source: "Dükkan / 20 Crystal"
        },
        {
            id: "pack-combo",
            name: "Combo Pack",
            category: "potions",
            subType: "Kombo Taktik Çantası",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/combo_pack_trans.png",
            currency: "crystal",
            price: 98,
            marketRange: "90 - 110 Crystal",
            priceHistory: [
                { date: "Haz 2026", price: 88 },
                { date: "Tem 2026", price: 92 },
                { date: "Ağu 2026", price: 95 },
                { date: "Eyl 2026", price: 98 }
            ],
            change24h: 3.1,
            duration: "Anlık + 30sn",
            effect: "Tam Can + Tam Cephane + %20 Hız Bonusu",
            description: "Hem canı hem mermiyi sonuna kadar doldurup oyuncuya sürat veren nihai saha çantası.",
            source: "Dükkan / 98 Crystal"
        },
        {
            id: "pot-dex-med",
            name: "Dexterity Potion - Medium",
            category: "potions",
            subType: "İksir",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/dexterity_potion_trans.png",
            currency: "cash",
            price: 2748,
            marketRange: "2.500 - 2.800 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 2500 },
                { date: "Tem 2026", price: 2600 },
                { date: "Ağu 2026", price: 2700 },
                { date: "Eyl 2026", price: 2748 }
            ],
            change24h: 1.8,
            duration: "3 Maç",
            effect: "Nişan Sabitleme +%25",
            description: "Orta boy çeviklik ve refleks iksiri.",
            source: "2. El Market"
        },
        {
            id: "pot-agi-med",
            name: "Agility Potion - Medium",
            category: "potions",
            subType: "İksir",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/agility_potion_trans.png",
            currency: "cash",
            price: 3748,
            marketRange: "3.400 - 3.900 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 3400 },
                { date: "Tem 2026", price: 3550 },
                { date: "Ağu 2026", price: 3680 },
                { date: "Eyl 2026", price: 3748 }
            ],
            change24h: 1.8,
            duration: "3 Maç",
            effect: "Koşu Sürati +%18",
            description: "Orta boy koşu ve hareketlilik iksiri.",
            source: "2. El Market"
        }
    ],

    // 5. MASKELER & KIYAFETLER (MASKS)
    masks: [
        {
            id: "app-white-tshirt",
            name: "White Tshirt",
            category: "masks",
            subType: "Üst Giyim",
            rarity: "common",
            rarityName: "Klasik",
            image: "./img/items/white_tshirt_trans.png",
            currency: "cash",
            price: 500,
            marketRange: "450 - 550 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 450 },
                { date: "Tem 2026", price: 480 },
                { date: "Ağu 2026", price: 500 },
                { date: "Eyl 2026", price: 500 }
            ],
            change24h: 0.0,
            description: "Rahat kesim klasik beyaz Minifal tişörtü.",
            source: "Şehir Mağazası / 500 Cash"
        },
        {
            id: "app-yellow-shorts",
            name: "Yellow Shorts",
            category: "masks",
            subType: "Alt Giyim",
            rarity: "common",
            rarityName: "Klasik",
            image: "./img/items/yellow_shorts_trans.png",
            currency: "cash",
            price: 500,
            marketRange: "450 - 550 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 450 },
                { date: "Tem 2026", price: 480 },
                { date: "Ağu 2026", price: 500 },
                { date: "Eyl 2026", price: 500 }
            ],
            change24h: 0.0,
            description: "Canlı sarı renkte rahat kesim spor şort.",
            source: "Şehir Mağazası / 500 Cash"
        }
    ],

    // 6. MOBİLYALAR VE EV (FURNITURE)
    furniture: [
        {
            id: "furn-01",
            name: "Kadife Retro Koltuk",
            category: "furniture",
            subType: "Oturma Grubu",
            rarity: "uncommon",
            rarityName: "Dekoratif",
            currency: "cash",
            price: 1850,
            marketRange: "1.700 - 2.000 Cash",
            priceHistory: [
                { date: "Haz 2026", price: 1600 },
                { date: "Tem 2026", price: 1750 },
                { date: "Ağu 2026", price: 1800 },
                { date: "Eyl 2026", price: 1850 }
            ],
            change24h: 2.8,
            rotatable: "4 Yönlü",
            colorOptions: ["Hardal Sarısı", "Orman Yeşili", "Kiremit"],
            description: "Oturma odaları için rahat, 4 yöne çevrilebilen vintage koltuk.",
            source: "Sebastian Ev Dekoru"
        },
        {
            id: "furn-02",
            name: "Cam Sehpalı Çalışma Masası",
            category: "furniture",
            subType: "Masa",
            rarity: "common",
            rarityName: "Temel",
            currency: "cash",
            price: 950,
            priceHistory: [
                { date: "Haz 2026", price: 900 },
                { date: "Tem 2026", price: 920 },
                { date: "Ağu 2026", price: 950 },
                { date: "Eyl 2026", price: 950 }
            ],
            change24h: 0.0,
            rotatable: "4 Yönlü",
            colorOptions: ["Füme Cam", "Şeffaf"],
            description: "Sebastian'ın planlarına göre üretilmiş minimalist çalışma masası.",
            source: "Mobilya Atölyesi"
        }
    ],

    // 7. DÜŞME ORANLARI ÖNİZLEMESİ (FALLING RATE PREVIEW - PASİF)
    fallingRatePreview: {
        status: "passive",
        statusText: "Şimdilik Pasif / Yeni Sezonda Açılacak",
        tiers: [
            {
                tier: "Yaygın (Common)",
                rate: "60.0%",
                color: "sand",
                items: ["White Tshirt", "Yellow Shorts", "Assault Rifle", "Hunting Rifle", "Small Health Pack"]
            },
            {
                tier: "Nadir (Uncommon)",
                rate: "25.0%",
                color: "teal",
                items: ["Assault Shotgun", "Double Barrel", "Mini SMG", "Small Paint Shield", "Kadife Retro Koltuk"]
            },
            {
                tier: "Ender (Rare)",
                rate: "11.5%",
                color: "gold",
                items: ["Light Machine Gun", "Sniper Rifle", "Grenade Launcher", "Paintball Mod Kit (Omega)", "Dexterity Potion - Medium"]
            },
            {
                tier: "Epik & Efsanevi",
                rate: "3.5%",
                color: "orange",
                items: ["Heavy Machine Gun", "Paint Wave Launcher", "Dark Armor", "Crystal Armor", "Combo Pack", "Napalm Strike"]
            }
        ]
    },

    // 8. BOSS VE NPC BİRİMLERİ (GAME TYPE 4: SURVIVAL)
    bosses: [
        {
            id: "boss-commander",
            name: "Cyborg Commander",
            inGameName: "Cyborg Commander",
            tier: "Boss / Lider",
            title: "Cyborg & NPC Baş Düşmanı (Game Type 4 Boss)",
            hp: 4016,
            maxHp: 4016,
            armorType: "Ağır Sibernetik Komuta Zırhı",
            weapon: "Ağır Plazma Paintball Topu (Green Tank Heavy Gun)",
            visor: "Yeşil Neon Hedefleme Vizörü",
            gameMode: "Game Type 4: Survival / Cyborg Assault",
            image: "./img/items/cyborg_commander_trans.png",
            avatar: "./img/items/cyborg_commander_avatar.png",
            glowColor: "#00E676",
            description: "Minifal savaş meydanının resmi NPC baş düşmanı (Game Type 4 Boss). Tam 4.016 Can (HP) barı, yeşil neon hedefleme vizörü ve ağır paintball topu donanımına sahiptir. Tek başına devrilmesi neredeyse imkansızdır; takım halinde organize baskı ateşi ve ağır makineli tüfek gerektirir.",
            combatBenchmark: {
                referenceWeapon: "Light Machine Gun",
                damagePerBullet: 12,
                bulletsToDefeat: 335,
                formulaText: "4016 Can / 12 Hasar = 334.6 (Yaklaşık 335 Mermi)"
            }
        },
        {
            id: "enemy-soldier",
            name: "Cyborg Soldier",
            inGameName: "Cyborg Soldier",
            tier: "Piyade Birliği",
            title: "Cyborg Piyade Düşmanı (Game Type 4 Minion)",
            hp: 250,
            maxHp: 250,
            armorType: "Hafif Taktik Sibernetik Zırh",
            weapon: "Seri Atışlı Paintball Tüfeği (Green Box Scope)",
            visor: "Kırmızı Dörtlü Gece / Termal Görüş Vizörü",
            gameMode: "Game Type 4: Survival / Cyborg Assault",
            image: "./img/items/cyborg_soldier_trans.png",
            avatar: "./img/items/cyborg_soldier_avatar.png",
            glowColor: "#FF3D00",
            description: "Cyborg Commander'a eşlik eden ve Survival modunda dalgalar halinde hücum eden taktik sibernetik piyadeler. Kırmızı dörtlü göz vizörleri ve çevik hareket kabiliyetleriyle oyuncuları kuşatırlar.",
            combatBenchmark: {
                referenceWeapon: "Assault Rifle",
                damagePerBullet: 18,
                bulletsToDefeat: 14,
                formulaText: "250 Can / 18 Hasar = 13.8 (Yaklaşık 14 Mermi)"
            }
        }
    ]
};

// Node ortamında dışa aktarma
if (typeof module !== "undefined" && module.exports) {
    module.exports = MINIFAL_DATABASE;
}

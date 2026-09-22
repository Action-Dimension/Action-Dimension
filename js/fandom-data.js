/**
 * ==============================================================================
 * MINIFAL FANDOM & WIKI - STATİK VERİTABANI
 * ==============================================================================
 * Oyun içi market ekran görüntülerinden çıkarılan gerçek eşyalar,
 * görseller ve gerçek pazar fiyatları ile yapılandırılmıştır.
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

    // Kategori Tanımları
    categories: [
        { id: "all", name: "Tüm Eşyalar", icon: "🌐", color: "ink", count: 20, desc: "Minifal evrenindeki tüm eşyaların ortak kataloğu." },
        { id: "weapons", name: "Silahlar", icon: "🔫", color: "orange", count: 33, desc: "Paintball sahasında kullanılan hafif, ağır ve özel boya silahları." },
        { id: "modkits", name: "Modkitler", icon: "⚙️", color: "teal", count: 15, desc: "Silahların hasar, hız ve menzilini artıran geliştirme modülleri." },
        { id: "armor", name: "Zırhlar", icon: "🛡️", color: "gold", count: 8, desc: "Maçlarda boya hasarını engelleyen taktik yelekler ve kıyafetler." },
        { id: "masks", name: "Kıyafet & Maske", icon: "🎭", color: "olive", count: 465, desc: "Şehirde tarzını yansıtan maskeler, tişörtler, şortlar ve ceketler." },
        { id: "furniture", name: "Mobilyalar & Ev", icon: "🛋️", color: "sand", count: 116, desc: "Sebastian'dan alınan ev planları ve odayı döşeyen mobilyalar." },
        { id: "potions", name: "Potionlar", icon: "🧪", color: "teal", count: 12, desc: "Geçici ve kalıcı stat güçlendirmeleri sağlayan iksirler." },
        { id: "market", name: "Market Fiyatları", icon: "📈", color: "gold", count: 50, desc: "2. el pazarındaki canlı fiyatlar ve zaman içindeki değişim grafikleri." },
        { id: "drops", name: "Falling Rate (Pasif)", icon: "🎯", color: "orange", count: 0, desc: "Paintball maç sonu düşme ihtimalleri (Şimdilik pasif)." }
    ],

    // 1. SILAHLAR (WEAPONS)
    weapons: [
        {
            id: "wep-infiltrator-shotgun",
            name: "Infiltrator Shotgun",
            category: "weapons",
            subType: "Pompalı Tüfek",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/infiltrator_shotgun_trans.png",
            price: 5800,
            marketRange: "5.000 ₼ - 25.000 ₼",
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
            price: 9000,
            marketRange: "7.520 ₼ - 18.920 ₼",
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
            price: 25900,
            marketRange: "23.200 ₼ - 25.900 ₼",
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
            subType: "Roketatatar",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/cyborg_rocketeer_trans.png",
            price: 33200,
            marketRange: "29.000 ₼ - 33.200 ₼",
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
            price: 3366,
            marketRange: "3.100 ₼ - 3.500 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 3000 },
                { date: "Tem 2026", price: 3200 },
                { date: "Ağu 2026", price: 3300 },
                { date: "Eyl 2026", price: 3366 }
            ],
            change24h: 2.0,
            modkitSlots: 2,
            stats: { damage: 90, fireRate: 25, range: 70, reload: 35, capacity: 6 },
            description: "Gri gövdeli askeri boya roketi fırlatıcısı. Barikat arkasındaki rakipleri temizlemek için ideal.",
            source: "Silahçı Viktor",
            compatibleModkits: ["Hızlı Doldurma", "Paintball Mod Kit"]
        },
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
        }
    ],

    // 2. MODKITLER (WEAPON UPGRADE KITS)
    modkits: [
        {
            id: "mod-paintball-green",
            name: "Paintball Mod Kit (Green)",
            category: "modkits",
            subType: "Ekipman Çantası",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/paintball_modkit_green_trans.png",
            price: 10000,
            marketRange: "5.272 ₼ - 75.000 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 5272 },
                { date: "Tem 2026", price: 7272 },
                { date: "Ağu 2026", price: 10000 },
                { date: "Eyl 2026", price: 40212 }
            ],
            change24h: 302.1,
            slotCost: 1,
            effects: "+25% Ateş Hızı, +15% Menzil, Özel Boya Efekti",
            compatibility: "Tüm Silahlar",
            description: "Sarı auralı zeytin yeşili askeri alet çantası. Silahlara özel taktik boya modülleri ekler.",
            isRemover: false
        },
        {
            id: "mod-paintball-orange",
            name: "Paintball Mod Kit (Orange)",
            category: "modkits",
            subType: "Ekipman Çantası",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/paintball_modkit_orange_trans.png",
            price: 11000,
            marketRange: "10.001 ₼ - 11.000 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 9200 },
                { date: "Tem 2026", price: 9800 },
                { date: "Ağu 2026", price: 10001 },
                { date: "Eyl 2026", price: 11000 }
            ],
            change24h: 9.9,
            slotCost: 1,
            effects: "+30% Boya Hasarı, +20% Kalkan Kırma",
            compatibility: "Tüm Silahlar",
            description: "Kızıl auralı turuncu boya geliştirme kiti. Çarpışma anında hasarı katlar.",
            isRemover: false
        },
        {
            id: "mod-05",
            name: "Modkit Sökücü (Kit Remover)",
            category: "modkits",
            subType: "Gereç",
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
        }
    ],

    // 3. ZIRHLAR (ARMOR)
    armor: [
        {
            id: "arm-commando",
            name: "Commando Armor",
            category: "armor",
            subType: "Taktik Kamuflaj",
            rarity: "legendary",
            rarityName: "Efsanevi",
            image: "./img/items/commando_armor_trans.png",
            price: 44900,
            marketRange: "43.000 ₼ - 46.000 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 39000 },
                { date: "Tem 2026", price: 42000 },
                { date: "Ağu 2026", price: 43000 },
                { date: "Eyl 2026", price: 44900 }
            ],
            change24h: 4.4,
            defense: 110,
            speedModifier: "+5%",
            durability: 500,
            description: "Kırmızı kafa bantlı, kamuflaj desenli efsanevi komando zırhı. Yüksek boya direnci ve hız artışı sağlar.",
            source: "2. El Market / Seçkin Lig Ödülü"
        },
        {
            id: "arm-hellbringer",
            name: "Hellbringer Armor",
            category: "armor",
            subType: "Ağır Kask & Zırh",
            rarity: "epic",
            rarityName: "Epik",
            image: "./img/items/hellbringer_armor_trans.png",
            price: 7000,
            marketRange: "6.400 ₼ - 13.000 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 6400 },
                { date: "Tem 2026", price: 6500 },
                { date: "Ağu 2026", price: 7000 },
                { date: "Eyl 2026", price: 8500 }
            ],
            change24h: 21.4,
            defense: 80,
            speedModifier: "-4%",
            durability: 350,
            description: "Geometrik fütüristik kaskı ve lav desenli parlak maskesiyle öne çıkan popüler Hellbringer zırhı.",
            source: "2. El Market / Turnuva Kasası"
        },
        {
            id: "arm-01",
            name: "Çaylak Paintball Yeleği",
            category: "armor",
            subType: "Temel Yelek",
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
        }
    ],

    // 4. MASKELER & KIYAFETLER (MASKS & CLOTHING)
    masks: [
        {
            id: "wear-white-tshirt",
            name: "White Tshirt",
            category: "masks",
            subType: "Tişört",
            rarity: "common",
            rarityName: "Klasik",
            image: "./img/items/white_tshirt_trans.png",
            price: 500,
            marketRange: "500 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 500 },
                { date: "Tem 2026", price: 500 },
                { date: "Ağu 2026", price: 500 },
                { date: "Eyl 2026", price: 500 }
            ],
            change24h: 0.0,
            slot: "Gövde / Üst",
            description: "Tertemiz sade beyaz kısa kollu pamuklu tişört. Her türlü pantolon ve şort kombinine uyar.",
            popularity: "Temel Gardırop"
        },
        {
            id: "wear-yellow-shorts",
            name: "Yellow Shorts",
            category: "masks",
            subType: "Şort",
            rarity: "common",
            rarityName: "Klasik",
            image: "./img/items/yellow_shorts_trans.png",
            price: 500,
            marketRange: "500 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 500 },
                { date: "Tem 2026", price: 500 },
                { date: "Ağu 2026", price: 500 },
                { date: "Eyl 2026", price: 500 }
            ],
            change24h: 0.0,
            slot: "Bacak / Şort",
            description: "Yaz günleri ve tenis maçları için parlak sarı renkli rahat spor şort.",
            popularity: "Temel Gardırop"
        },
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
        }
    ],

    // 5. POTIONLAR (POTIONS)
    potions: [
        {
            id: "pot-dexterity",
            name: "Dexterity Potion - Medium",
            category: "potions",
            subType: "Beceriklilik İksiri",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/dexterity_potion_trans.png",
            price: 2748,
            marketRange: "2.400 ₼ - 2.800 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 2400 },
                { date: "Tem 2026", price: 2550 },
                { date: "Ağu 2026", price: 2650 },
                { date: "Eyl 2026", price: 2748 }
            ],
            change24h: 3.7,
            duration: "30 Dakika",
            effect: "+15% Nişan İsabeti, +10% Şarjör Hızı",
            description: "Açık mavi cam şişe içinde parlayan altın sarısı iksir. Boya atışlarının isabetini yükseltir."
        },
        {
            id: "pot-agility",
            name: "Agility Potion - Medium",
            category: "potions",
            subType: "Çeviklik İksiri",
            rarity: "rare",
            rarityName: "Ender",
            image: "./img/items/agility_potion_trans.png",
            price: 3748,
            marketRange: "3.200 ₼ - 3.800 ₼",
            priceHistory: [
                { date: "Haz 2026", price: 3200 },
                { date: "Tem 2026", price: 3450 },
                { date: "Ağu 2026", price: 3600 },
                { date: "Eyl 2026", price: 3748 }
            ],
            change24h: 4.1,
            duration: "30 Dakika",
            effect: "+25% Koşu Hızı, +15% Zıplama Çevikliği",
            description: "Gök mavisi şişede parlayan mor iksir. Paintball sahasında kurşunlardan sıyrılmayı kolaylaştırır."
        }
    ],

    // 6. MOBİLYALAR (FURNITURE)
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
        }
    ],

    // 7. PAINTBALL FALLING RATE
    fallingRates: {
        status: "passive",
        statusText: "Şimdilik Pasif — Gelecek Sezonda Açılacak",
        notice: "Paintball maç sonu ganimet sistemi geliştirme aşamasındadır. Aşağıdaki düşme oranları (Falling Rate) ve kategori havuzu önizleme amaçlıdır.",
        tiers: [
            {
                tier: "Yaygın (Common)",
                rate: "60.0%",
                color: "sand",
                items: ["White Tshirt", "Yellow Shorts", "Standart Boya Tabancası", "Çaylak Paintball Yeleği"]
            },
            {
                tier: "Nadir (Uncommon)",
                rate: "25.0%",
                color: "teal",
                items: ["Rocket Launcher", "Kadife Retro Koltuk", "Paintball Mod Kit (Orange)"]
            },
            {
                tier: "Ender (Rare)",
                rate: "11.5%",
                color: "gold",
                items: ["Infiltrator Shotgun", "Hellbringer Armor", "Dexterity Potion - Medium", "Agility Potion - Medium"]
            },
            {
                tier: "Epik & Efsanevi",
                rate: "3.5%",
                color: "orange",
                items: ["Infiltrator Sniper", "Cyborg Minigun", "Cyborg Rocketeer", "Commando Armor", "Paintball Mod Kit (Green)"]
            }
        ]
    }
};

// Node ortamında dışa aktarma
if (typeof module !== "undefined" && module.exports) {
    module.exports = MINIFAL_DATABASE;
}

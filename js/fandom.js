/**
 * ==============================================================================
 * MINIFAL FANDOM & WIKI - ARAYÜZ VE İNTERAKTİF MANTIK
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Durum (State)
    const state = {
        activeCategory: "all",
        searchQuery: "",
        sortBy: "featured",
        selectedChartItem: "wep-03", // Başlangıçta Fırtına Hücum Tüfeği seçili
        activeModalItem: null
    };

    // DOM Elemanları
    const itemsGrid = document.getElementById("items-grid");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
    const categoryNav = document.getElementById("category-nav");
    const resultsCount = document.getElementById("results-count");
    const modalOverlay = document.getElementById("item-modal");
    const modalContent = document.getElementById("modal-content-body");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const chartSelect = document.getElementById("chart-item-select");
    const chartSvg = document.getElementById("price-chart-svg");
    const chartTooltip = document.getElementById("chart-tooltip");
    const marketTableBody = document.getElementById("market-table-body");

    // Tüm eşyaları düz bir diziye topla
    function getAllItems() {
        const list = [
            ...MINIFAL_DATABASE.weapons,
            ...MINIFAL_DATABASE.modkits,
            ...MINIFAL_DATABASE.armor,
            ...(MINIFAL_DATABASE.sports || []),
            ...MINIFAL_DATABASE.masks,
            ...MINIFAL_DATABASE.furniture,
            ...MINIFAL_DATABASE.potions
        ];
        return list;
    }

    // Kategoriye ve filtreye göre eşyaları getir
    function getFilteredItems() {
        let items = getAllItems();

        // Kategori filtresi
        if (state.activeCategory !== "all") {
            items = items.filter(item => item.category === state.activeCategory);
        }

        // Arama filtresi
        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            items = items.filter(item =>
                item.name.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query)) ||
                (item.subType && item.subType.toLowerCase().includes(query)) ||
                (item.rarityName && item.rarityName.toLowerCase().includes(query))
            );
        }

        // Sıralama
        if (state.sortBy === "price-asc") {
            items.sort((a, b) => a.price - b.price);
        } else if (state.sortBy === "price-desc") {
            items.sort((a, b) => b.price - a.price);
        } else if (state.sortBy === "name-asc") {
            items.sort((a, b) => a.name.localeCompare(b.name, "tr"));
        } else if (state.sortBy === "change-desc") {
            items.sort((a, b) => (b.change24h || 0) - (a.change24h || 0));
        }

        return items;
    }

    // Eşya kartı ikonu belirleme (Gerçek görsel varsa görseli bas)
    function getItemIcon(item) {
        if (item.image) {
            return `<img src="${item.image}" alt="${item.name}" class="item-real-img" loading="lazy">`;
        }
        switch (item.category) {
            case "weapons": return "🔫";
            case "modkits": return "⚙️";
            case "armor": return "🛡️";
            case "sports": return "🎾";
            case "masks": return item.subType === "Maske" ? "🎭" : item.subType === "Ceket" ? "🧥" : "👟";
            case "furniture": return item.subType === "Ev Planı" ? "📜" : "🛋️";
            case "potions": return "🧪";
            default: return "📦";
        }
    }

    // Fiyat ve Para Birimi Formatlayıcı (Cash & Crystal)
    function renderPriceHtml(item, isLarge = false) {
        const isCrystal = item.currency === "crystal";
        const iconSrc = isCrystal ? "./img/crystal_gem_trans.png" : "./img/cash_coin_trans.png";
        const label = isCrystal ? "Crystal" : "Cash";
        const iconStyle = isLarge ? "width:20px; height:15px;" : "width:17px; height:13px;";
        return `<span class="curr-badge ${isCrystal ? 'curr-badge--crystal' : ''}">
            <img src="${iconSrc}" class="curr-icon" style="${iconStyle}" alt="${label}">
            ${item.price.toLocaleString('tr-TR')}
            <small>${label}</small>
        </span>`;
    }

    // Kartları Render Et
    function renderCards() {
        const items = getFilteredItems();
        if (resultsCount) {
            resultsCount.textContent = `${items.length} eşya listeleniyor`;
        }

        if (items.length === 0) {
            itemsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; background: var(--sand); border: var(--edge); border-radius: var(--radius-lg); box-shadow: var(--lift-1);">
                    <p style="font-size: 32px; margin-bottom: 8px;">🔍</p>
                    <h3 style="font-family: var(--font-display); font-size: 20px; margin: 0 0 8px;">Sonuç Bulunamadı</h3>
                    <p style="color: var(--ink-dim); margin: 0;">"${state.searchQuery}" ile eşleşen bir eşya bulunamadı. Lütfen arama kriterlerinizi kontrol edin.</p>
                </div>
            `;
            return;
        }

        itemsGrid.innerHTML = items.map(item => {
            const icon = getItemIcon(item);
            const rarityClass = `rarity-${item.rarity || 'common'}`;

            // Mini stat barları
            let statBarsHtml = '';
            if (item.stats) {
                statBarsHtml = `
                    <div class="item-stat-bars">
                        <div class="stat-row">
                            <span>Hasar</span>
                            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${item.stats.damage}%;"></div></div>
                        </div>
                        <div class="stat-row">
                            <span>Hız</span>
                            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${item.stats.fireRate}%; background: var(--teal);"></div></div>
                        </div>
                    </div>
                `;
            } else if (item.slotCost !== undefined) {
                statBarsHtml = `
                    <div class="item-stat-bars">
                        <div class="stat-row">
                            <span>Slot Bedeli</span>
                            <span style="color: var(--teal);">${item.slotCost === 0 ? 'Bedelsiz (Sökücü)' : item.slotCost + ' Yuva'}</span>
                        </div>
                    </div>
                `;
            } else if (item.defense) {
                statBarsHtml = `
                    <div class="item-stat-bars">
                        <div class="stat-row">
                            <span>Zırh Koruması</span>
                            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${Math.min(100, item.defense)}%; background: var(--gold);"></div></div>
                        </div>
                    </div>
                `;
            }

            return `
                <article class="item-card" data-id="${item.id}">
                    <div class="item-card-header">
                        <div class="item-icon-box">${icon}</div>
                        <span class="rarity-pill ${rarityClass}">${item.rarityName || 'Standart'}</span>
                    </div>
                    <h3 class="item-card-title">${item.name}</h3>
                    <p class="item-card-desc">${item.description || ''}</p>
                    ${statBarsHtml}
                    <div class="item-card-footer">
                        <div class="price-display">
                            <span class="price-label">Fiyat</span>
                            <span class="price-amount">${renderPriceHtml(item)}</span>
                        </div>
                        <button class="details-btn" type="button">Detaylar</button>
                    </div>
                </article>
            `;
        }).join('');

        // Kart tıklama dinleyicileri
        document.querySelectorAll(".item-card").forEach(card => {
            card.addEventListener("click", () => {
                const id = card.getAttribute("data-id");
                openItemModal(id);
            });
        });
    }

    // Modal açma
    // Modal açma (Bire Bir Minifal Oyun İçi "EŞYA AYRINTILARI" Düzeni)
    function openItemModal(itemId) {
        const item = getAllItems().find(i => i.id === itemId);
        if (!item) return;

        state.activeModalItem = item;

        // Fiyat ve Para Birimi
        const isCrystal = item.currency === "crystal";
        const coinIconSrc = isCrystal ? "./img/crystal_gem_trans.png" : "./img/cash_coin_trans.png";
        const currencyName = isCrystal ? "Crystal" : "Cash";
        const formattedPrice = item.price ? item.price.toLocaleString("tr-TR") : "0";

        // Eşya Türü
        const itemType = item.inGameType || (item.category === "armor" ? "Paintball Zırhı" : (item.category === "weapons" ? "Paintball Gereci" : (item.category === "modkits" ? "Paintball Mod Kiti" : "Paintball Eşyası")));

        // Satıcı veya Bonus Satırı
        let metaHtml = '';
        if (item.seller) {
            metaHtml = `<div class="game-item-meta">Satıcı: ${item.seller}</div>`;
        }
        if (item.bonusText) {
            metaHtml += `<div class="game-item-meta" style="${item.seller ? 'margin-top:4px;' : ''}">${item.bonusText}</div>`;
        } else if (item.isShield && item.description) {
            metaHtml += `<div class="game-item-meta" style="margin-top:10px; max-width: 320px; line-height: 1.35;">${item.description}</div>`;
        } else if (!item.seller && item.description && item.category !== "weapons" && item.inGameType !== "Paintball Gereci") {
            metaHtml += `<div class="game-item-meta">${item.description}</div>`;
        }

        // İstatistikler (Kalkanlar veya Silahlar / Paintball Gereci)
        let statsHtml = '';
        if (item.isShield) {
            const blockFill = item.blockAngle !== undefined ? item.blockAngle : 33;
            statsHtml = `
                <div class="game-stats-container">
                    <!-- Sol Kolon: Bloke Açısı ve 2 Boş Bar -->
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="width:72px;">Bloke Açısı</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${blockFill}%;"></div>
                            </div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="width:72px; visibility:hidden;">Bloke Açısı</span>
                            <div class="game-stat-bar-trough"></div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="width:72px; visibility:hidden;">Bloke Açısı</span>
                            <div class="game-stat-bar-trough"></div>
                        </div>
                    </div>

                    <!-- Sağ Kolon: 3 Boş Bar (Oyun İçi Sabit Grid Düzeni) -->
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="visibility:hidden;">İsabet</span>
                            <div class="game-stat-bar-trough"></div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="visibility:hidden;">İsabet</span>
                            <div class="game-stat-bar-trough"></div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name" style="visibility:hidden;">İsabet</span>
                            <div class="game-stat-bar-trough"></div>
                        </div>
                    </div>
                </div>
            `;
        } else if (item.category === "weapons" || item.inGameType === "Paintball Gereci" || item.stats) {
            // 6 temel oyun içi stat (Hasar, Atış Hızı, Cephane, Hız, İsabet, Dürbün)
            const dmg = item.stats?.damage !== undefined ? item.stats.damage : 50;
            const rate = item.stats?.fireRate !== undefined ? item.stats.fireRate : 50;
            const ammo = item.stats?.ammo !== undefined ? item.stats.ammo : Math.min(100, Math.round(((item.stats?.capacity || 30) / 100) * 100));
            const speed = item.stats?.speed !== undefined ? item.stats.speed : Math.max(20, Math.min(100, 100 - Math.round(dmg * 0.25)));
            const acc = item.stats?.accuracy !== undefined ? item.stats.accuracy : (item.stats?.range || 80);
            const scope = item.stats?.scope !== undefined ? item.stats.scope : (item.name.toLowerCase().includes("sniper") || item.name.toLowerCase().includes("scoped") ? 100 : 0);

            // Modkit Yuvaları (Eklentiler) - Sadece yuvası olan silahlarda gösterilir
            const slotsCount = item.modkitSlots !== undefined ? item.modkitSlots : 2;
            const equipped = item.equippedModkits || [];
            let eklentilerRowHtml = '';
            if (slotsCount > 0) {
                let slotsHtml = '';
                for (let i = 0; i < slotsCount; i++) {
                    if (equipped[i]) {
                        slotsHtml += `<div class="game-slot-cell is-equipped" data-slot="${i}" title="Takılı Modkit: ${item.name} Güçlendirici"><img src="${equipped[i]}" class="game-slot-img" alt="Modkit"></div>`;
                    } else {
                        slotsHtml += `<div class="game-slot-cell is-empty" data-slot="${i}" title="Boş Eklenti Yuvası (Takmak için tıkla)"></div>`;
                    }
                }
                eklentilerRowHtml = `
                    <div class="game-stat-item">
                        <span class="game-stat-name">Eklentiler</span>
                        <div class="game-slots-wrapper">
                            ${slotsHtml}
                        </div>
                    </div>
                `;
            }

            statsHtml = `
                <div class="game-stats-container">
                    <!-- Sol Kolon -->
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div class="game-stat-item">
                            <span class="game-stat-name">Hasar</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${dmg}%;"></div>
                            </div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name">Atış Hızı</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${rate}%;"></div>
                            </div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name">Cephane</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${ammo}%;"></div>
                            </div>
                        </div>
                        ${eklentilerRowHtml}
                    </div>

                    <!-- Sağ Kolon -->
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div class="game-stat-item">
                            <span class="game-stat-name">Hız</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${speed}%;"></div>
                            </div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name">İsabet</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${acc}%;"></div>
                            </div>
                        </div>
                        <div class="game-stat-item">
                            <span class="game-stat-name">Dürbün</span>
                            <div class="game-stat-bar-trough">
                                <div class="game-stat-bar-fill" style="width: ${scope}%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Buton Metni:
        // 1. item.inGameAction varsa onu kullan (ör. "Bu eşyayı al", "Pazara Koy")
        // 2. item.seller varsa (2. el pazar ilanı) -> "Satın Al"
        // 3. Dükkan / Kristal eşyası ise -> "Bu eşyayı al"
        const actionLabel = item.inGameAction || (item.seller ? "Satın Al" : "Bu eşyayı al");

        // İnceleme / Önizleme ikonu (Görsel 2'deki gibi pazara koy / envanter eşyalarında mevcuttur)
        const inspectHtml = (item.inGameAction === "Pazara Koy") ? `
            <button type="button" class="game-inspect-btn" id="game-inspect-btn" title="Tam Ekran / Odak İnceleme">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#756b54" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"/>
                </svg>
            </button>
        ` : '';

        // Görsel URL'si ve Para Birimi İkonu
        const previewImgSrc = item.image || "./img/items/light_machine_gun_trans.png";
        const coinIconClass = isCrystal ? "game-crystal-icon" : "game-coin-icon";

        modalContent.innerHTML = `
            <!-- Üst Eşya Bilgileri ve Sağdaki Yüzen Eşya Görseli -->
            <div class="game-item-top">
                <h4 class="game-item-name">${item.name}</h4>
                <div class="game-item-price-row">
                    <span>Fiyatı: ${formattedPrice} ${currencyName}</span>
                    <img src="${coinIconSrc}" class="${coinIconClass}" alt="${currencyName}">
                </div>
                <div class="game-item-type">${itemType}</div>
                ${metaHtml}
                <img src="${previewImgSrc}" alt="${item.name}" class="game-item-float-img" id="game-float-img" title="Büyütmek için tıkla">
            </div>

            <!-- Orta Bölüm: Silah İstatistikleri veya Ek Bilgiler -->
            ${statsHtml}

            <!-- Alt Kısım: İnceleme İkonu ve Buton -->
            <div class="game-modal-footer">
                ${inspectHtml}
                <button type="button" class="game-action-btn" id="game-action-btn">${actionLabel}</button>
            </div>

            <!-- Bildirim Balonu -->
            <div class="game-modal-toast" id="game-modal-toast"></div>

            <!-- Opsiyonel Açılır Pazar Grafiği & Detaylı Wiki Çekmecesi -->
            <a class="game-wiki-toggle" id="game-wiki-toggle">▾ Pazar Fiyat Geçmişi & Wiki Notları</a>
            <div class="game-wiki-drawer" id="game-wiki-drawer">
                <div style="font-size:12.5px; color:#3a3224; line-height:1.45; margin-bottom:10px;">
                    <b>Eşya Tanımı:</b> ${item.description || 'Detaylı wiki kaydı bulunmamaktadır.'}
                </div>
                ${item.priceHistory && item.priceHistory.length > 0 ? `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <span style="font-size:11px; font-weight:800; color:#5c5138; text-transform:uppercase;">Son 4 Ay Fiyat Değişimi:</span>
                        <button type="button" id="modal-view-chart-btn" style="background:#240c04; color:#fff; border:none; border-radius:6px; font-size:11px; font-weight:700; padding:4px 8px; cursor:pointer;">Ana Grafikte Aç 📈</button>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        ${item.priceHistory.map(ph => `
                            <div style="flex:1; min-width:70px; background:#fff8ea; border:1px solid #c9bea3; border-radius:6px; padding:4px 6px; text-align:center;">
                                <span style="font-size:10px; color:#7a6f56; display:block;">${ph.date}</span>
                                <b style="font-size:12px; color:#240c04;">${ph.price.toLocaleString('tr-TR')}</b>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        modalOverlay.classList.add("is-open");

        // Etkileşimler
        const actionBtn = document.getElementById("game-action-btn");
        const toast = document.getElementById("game-modal-toast");
        const inspectBtn = document.getElementById("game-inspect-btn");
        const floatImg = document.getElementById("game-float-img");
        const wikiToggle = document.getElementById("game-wiki-toggle");
        const wikiDrawer = document.getElementById("game-wiki-drawer");
        const modalChartBtn = document.getElementById("modal-view-chart-btn");

        function showToast(msg) {
            if (!toast) return;
            toast.textContent = msg;
            toast.classList.add("is-shown");
            setTimeout(() => {
                toast.classList.remove("is-shown");
            }, 2200);
        }

        // Satın Al / Bu eşyayı al / Pazara Koy Butonu
        if (actionBtn) {
            actionBtn.addEventListener("click", () => {
                if (actionLabel === "Satın Al") {
                    showToast(`✓ ${item.name} (${formattedPrice} ${currencyName}) pazardan satın alındı!`);
                } else if (actionLabel === "Bu eşyayı al") {
                    showToast(`✓ ${item.name} (${formattedPrice} ${currencyName}) dükkandan alındı!`);
                } else {
                    showToast(`✓ ${item.name} başarıyla pazara konuldu!`);
                }
            });
        }

        // Kadraj / Büyütme
        let isZoomed = false;
        function toggleZoom() {
            isZoomed = !isZoomed;
            if (floatImg) {
                if (isZoomed) {
                    floatImg.style.transform = "scale(1.8) translateY(20px)";
                    floatImg.style.zIndex = "20";
                    showToast("🔍 İnceleme Modu Açıldı");
                } else {
                    floatImg.style.transform = "none";
                    floatImg.style.zIndex = "auto";
                }
            }
        }
        if (inspectBtn) inspectBtn.addEventListener("click", toggleZoom);
        if (floatImg) floatImg.addEventListener("click", toggleZoom);

        // Modkit Yuvalarına Tıklama (Tak / Çıkar İnteraktivitesi)
        modalContent.querySelectorAll(".game-slot-cell").forEach(slot => {
            slot.addEventListener("click", () => {
                const isEq = slot.classList.contains("is-equipped");
                if (isEq) {
                    slot.classList.remove("is-equipped");
                    slot.classList.add("is-empty");
                    slot.innerHTML = '';
                    showToast("⚙️ Modkit söküldü.");
                } else {
                    slot.classList.remove("is-empty");
                    slot.classList.add("is-equipped");
                    slot.innerHTML = '<img src="./img/items/paintball_modkit_588_trans.png" class="game-slot-img" alt="Modkit">';
                    showToast("⚙️ Modkit takıldı (+Bonus aktif)!");
                }
            });
        });

        // Wiki Çekmecesi Aç/Kapa
        if (wikiToggle && wikiDrawer) {
            wikiToggle.addEventListener("click", () => {
                const isOpen = wikiDrawer.classList.toggle("is-open");
                wikiToggle.textContent = isOpen ? "▴ Detaylı Wiki Bilgisini Gizle" : "▾ Pazar Fiyat Geçmişi & Wiki Notları";
            });
        }

        // Ana Grafikte İncele
        if (modalChartBtn) {
            modalChartBtn.addEventListener("click", () => {
                modalOverlay.classList.remove("is-open");
                state.selectedChartItem = item.id;
                if (chartSelect) chartSelect.value = item.id;
                renderChart();
                const marketSection = document.getElementById("market-section");
                if (marketSection) marketSection.scrollIntoView({ behavior: "smooth" });
            });
        }
    }

    // Modalı kapat
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
            modalOverlay.classList.remove("is-open");
        });
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove("is-open");
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("is-open")) {
            modalOverlay.classList.remove("is-open");
        }
    });

    // 2. FİYAT GEÇMİŞİ İNTERAKTİF GRAFİĞİ (SVG CHART)
    function populateChartSelect() {
        if (!chartSelect) return;
        const allItems = getAllItems().filter(i => i.priceHistory && i.priceHistory.length > 0);
        chartSelect.innerHTML = allItems.map(item => {
            const curTag = item.currency === 'crystal' ? '💎 Crystal' : '🪙 Cash';
            return `
                <option value="${item.id}" ${item.id === state.selectedChartItem ? 'selected' : ''}>
                    ${item.name} (${item.price.toLocaleString('tr-TR')} ${curTag})
                </option>
            `;
        }).join('');

        chartSelect.addEventListener("change", (e) => {
            state.selectedChartItem = e.target.value;
            renderChart();
        });
    }

    function renderChart() {
        if (!chartSvg) return;
        const item = getAllItems().find(i => i.id === state.selectedChartItem);
        if (!item || !item.priceHistory || item.priceHistory.length === 0) return;

        const data = item.priceHistory;
        const width = 800;
        const height = 220;
        const paddingLeft = 60;
        const paddingRight = 40;
        const paddingTop = 25;
        const paddingBottom = 40;

        const prices = data.map(d => d.price);
        const minPrice = Math.floor(Math.min(...prices) * 0.85);
        const maxPrice = Math.ceil(Math.max(...prices) * 1.15);
        const priceRange = maxPrice - minPrice || 1;

        const plotWidth = width - paddingLeft - paddingRight;
        const plotHeight = height - paddingTop - paddingBottom;

        // X ve Y hesaplamaları
        const points = data.map((d, index) => {
            const x = paddingLeft + (index / (data.length - 1)) * plotWidth;
            const y = paddingTop + plotHeight - ((d.price - minPrice) / priceRange) * plotHeight;
            return { x, y, date: d.date, price: d.price };
        });

        // Çizgi ve Alan Yolları
        const linePathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPathD = `${linePathD} L ${points[points.length - 1].x} ${paddingTop + plotHeight} L ${points[0].x} ${paddingTop + plotHeight} Z`;

        // SVG Izgara Çizgileri ve Eksenler
        let gridHtml = '';
        const gridSteps = 4;
        const curLabel = item.currency === 'crystal' ? 'Cry' : 'Cash';
        for (let i = 0; i <= gridSteps; i++) {
            const yVal = paddingTop + (i / gridSteps) * plotHeight;
            const pVal = Math.round(maxPrice - (i / gridSteps) * priceRange);
            gridHtml += `
                <line x1="${paddingLeft}" y1="${yVal}" x2="${width - paddingRight}" y2="${yVal}" class="chart-grid-line" />
                <text x="${paddingLeft - 10}" y="${yVal + 4}" text-anchor="end" class="chart-axis-text">${pVal.toLocaleString('tr-TR')} ${curLabel}</text>
            `;
        }

        // X Ekseni Tarihleri
        let xAxisHtml = points.map(p => `
            <text x="${p.x}" y="${height - 15}" text-anchor="middle" class="chart-axis-text">${p.date}</text>
            <line x1="${p.x}" y1="${paddingTop}" x2="${p.x}" y2="${paddingTop + plotHeight}" stroke="rgba(46,42,24,0.06)" />
        `).join('');

        // Noktalar
        let pointsHtml = points.map((p, idx) => `
            <circle cx="${p.x}" cy="${p.y}" r="6" class="chart-point" data-idx="${idx}" />
        `).join('');

        chartSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        chartSvg.innerHTML = `
            <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--orange)" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="var(--orange)" stop-opacity="0.0" />
                </linearGradient>
            </defs>
            ${gridHtml}
            ${xAxisHtml}
            <path d="${areaPathD}" fill="url(#chartGrad)" />
            <path d="${linePathD}" class="chart-path" />
            ${pointsHtml}
        `;

        // Noktalara hover ile tooltip
        const circles = chartSvg.querySelectorAll(".chart-point");
        circles.forEach(circle => {
            circle.addEventListener("mouseenter", (e) => {
                const idx = parseInt(circle.getAttribute("data-idx"));
                const p = points[idx];
                const rect = chartSvg.getBoundingClientRect();
                const scaleX = rect.width / width;
                const scaleY = rect.height / height;

                if (chartTooltip) {
                    const iconImg = item.currency === 'crystal'
                        ? '<img src="./img/crystal_gem_trans.png" style="width:14px;height:11px;vertical-align:middle;margin-right:3px;" alt="Crystal">'
                        : '<img src="./img/cash_coin_trans.png" style="width:14px;height:12px;vertical-align:middle;margin-right:3px;" alt="Cash">';
                    const curName = item.currency === 'crystal' ? 'Crystal' : 'Cash';
                    chartTooltip.innerHTML = `<b>${p.date}</b>: ${iconImg} ${p.price.toLocaleString('tr-TR')} ${curName}`;
                    chartTooltip.style.left = `${p.x * scaleX}px`;
                    chartTooltip.style.top = `${p.y * scaleY}px`;
                    chartTooltip.style.opacity = "1";
                }
            });

            circle.addEventListener("mouseleave", () => {
                if (chartTooltip) chartTooltip.style.opacity = "0";
            });
        });
    }

    // 3. MARKET TABLOSUNU DOLDUR
    function renderMarketTable() {
        if (!marketTableBody) return;
        const items = getAllItems().filter(i => i.priceHistory && i.priceHistory.length > 0);

        marketTableBody.innerHTML = items.map(item => {
            const icon = getItemIcon(item);
            const change = item.change24h || 0;
            const trendClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
            const trendIcon = change > 0 ? '▲ +' : change < 0 ? '▼ ' : '— ';

            return `
                <tr data-id="${item.id}" style="cursor:pointer;">
                    <td>
                        <div class="item-cell">
                            <span class="item-mini-icon">${icon}</span>
                            <div>
                                <b style="font-family:var(--font-display); font-size:14px;">${item.name}</b>
                                <span style="display:block; font-size:11.5px; color:var(--ink-dim);">${item.subType || item.rarityName || ''}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="rarity-pill rarity-${item.rarity || 'common'}">${item.rarityName || 'Standart'}</span>
                    </td>
                    <td>
                        ${renderPriceHtml(item)}
                    </td>
                    <td>
                        <span class="trend-badge ${trendClass}">${trendIcon}${change}%</span>
                    </td>
                    <td>
                        <button type="button" class="details-btn" onclick="event.stopPropagation();">Grafik</button>
                    </td>
                </tr>
            `;
        }).join('');

        marketTableBody.querySelectorAll("tr").forEach(row => {
            row.addEventListener("click", () => {
                const id = row.getAttribute("data-id");
                state.selectedChartItem = id;
                if (chartSelect) chartSelect.value = id;
                renderChart();
                const chartBox = document.querySelector(".chart-box");
                if (chartBox) chartBox.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        });
    }

    // 4. ETKİLEŞİM DİNLEYİCİLERİ
    // Kategori Sekmeleri
    if (categoryNav) {
        categoryNav.querySelectorAll(".cat-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                categoryNav.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");
                state.activeCategory = btn.getAttribute("data-cat");

                // Eğer Market seçildiyse Market bölümüne kaydır
                if (state.activeCategory === "market") {
                    const mSec = document.getElementById("market-section");
                    if (mSec) mSec.scrollIntoView({ behavior: "smooth" });
                } else if (state.activeCategory === "drops") {
                    const dSec = document.getElementById("falling-rate-section");
                    if (dSec) dSec.scrollIntoView({ behavior: "smooth" });
                } else {
                    renderCards();
                    const filterPanel = document.querySelector(".filter-panel");
                    if (filterPanel) filterPanel.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }

    // Arama Girişi
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value;
            renderCards();
        });
    }

    // Sıralama Seçimi
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            state.sortBy = e.target.value;
            renderCards();
        });
    }

    // 5. BOSS & DÜŞMAN REHBERİ VE HASAR SİMÜLATÖRÜ (CYBORG COMMANDER 4016 HP & CYBORG SOLDIER 250 HP)
    function initBossCalculator() {
        const weaponSelect = document.getElementById("boss-weapon-select");
        const dmgDisplay = document.getElementById("calc-dmg-display");
        const hitsDisplay = document.getElementById("calc-hits-display");
        const hitsLabel = document.getElementById("calc-hits-label");
        const magDisplay = document.getElementById("calc-mag-display");
        const fireBtn = document.getElementById("btn-fire-test");
        const fireDmgSpan = document.getElementById("btn-fire-dmg");
        const resetBtn = document.getElementById("btn-reset-hp");
        const resetHpValSpan = document.getElementById("btn-reset-hp-val");
        const hpValSpan = document.getElementById("commander-hp-val");
        const hpMaxSpan = document.getElementById("commander-hp-max");
        const hpFillBar = document.getElementById("commander-hp-fill");
        const tipBox = document.getElementById("calc-benchmark-text");
        
        // Düşman Profil Elemanları
        const avatarImg = document.getElementById("boss-avatar-img");
        const hpTag = document.getElementById("boss-hp-tag");
        const nameEl = document.getElementById("boss-name");
        const nametagPreview = document.getElementById("boss-nametag-preview");
        const typeBadge = document.getElementById("boss-type-badge");
        const equipTags = document.getElementById("boss-equipment-tags");
        const descEl = document.getElementById("boss-desc");
        const modeBadge = document.getElementById("boss-mode-badge");
        const switchBtns = document.querySelectorAll(".enemy-switch-btn");

        if (!weaponSelect || !MINIFAL_DATABASE.bosses) return;

        let activeEnemyId = "boss-commander";
        let activeEnemy = MINIFAL_DATABASE.bosses.find(b => b.id === activeEnemyId) || MINIFAL_DATABASE.bosses[0];
        let currentHp = activeEnemy.maxHp;

        function setTargetEnemy(enemyId) {
            const found = MINIFAL_DATABASE.bosses.find(b => b.id === enemyId);
            if (!found) return;

            activeEnemyId = enemyId;
            activeEnemy = found;
            currentHp = activeEnemy.maxHp;

            // Sekmeleri güncelle
            switchBtns.forEach(btn => {
                const isTarget = btn.getAttribute("data-target") === enemyId;
                btn.classList.toggle("active", isTarget);
                btn.setAttribute("aria-selected", isTarget ? "true" : "false");
            });

            // Profil kartını güncelle
            if (avatarImg) {
                avatarImg.src = activeEnemy.image;
                avatarImg.alt = activeEnemy.name;
            }
            if (hpTag) hpTag.textContent = `CAN: ${activeEnemy.maxHp.toLocaleString("tr-TR")} HP`;
            if (nameEl) nameEl.textContent = activeEnemy.name;
            if (nametagPreview) nametagPreview.textContent = activeEnemy.inGameName || activeEnemy.name;
            if (typeBadge) typeBadge.textContent = activeEnemy.title;
            if (descEl) descEl.textContent = activeEnemy.description;
            if (modeBadge) modeBadge.textContent = activeEnemy.gameMode || "Game Type 4: Survival";

            if (equipTags) {
                if (activeEnemy.id === "boss-commander") {
                    equipTags.innerHTML = `
                        <span class="boss-tag">🛡️ Ağır Komuta Zırhı</span>
                        <span class="boss-tag">🔫 Ağır Paintball Topu</span>
                        <span class="boss-tag boss-tag--green">🟢 Yeşil Neon Vizör</span>
                    `;
                } else {
                    equipTags.innerHTML = `
                        <span class="boss-tag">🛡️ Hafif Taktik Zırh</span>
                        <span class="boss-tag">🔫 Seri Paintball Tüfeği</span>
                        <span class="boss-tag boss-tag--red">🔴 Kırmızı Termal Vizör</span>
                    `;
                }
            }

            // Can çubuğunu sıfırla
            if (hpValSpan) hpValSpan.textContent = activeEnemy.maxHp.toLocaleString("tr-TR");
            if (hpMaxSpan) hpMaxSpan.textContent = activeEnemy.maxHp.toLocaleString("tr-TR");
            if (resetHpValSpan) resetHpValSpan.textContent = activeEnemy.maxHp.toLocaleString("tr-TR");
            if (hpFillBar) {
                hpFillBar.style.width = "100%";
                hpFillBar.style.background = activeEnemy.glowColor || "var(--orange)";
            }

            if (hitsLabel) hitsLabel.textContent = `${activeEnemy.name} İçin Gereken Vuruş`;

            updateCalculations();
        }

        function updateCalculations() {
            const opt = weaponSelect.options[weaponSelect.selectedIndex];
            const dmg = parseInt(opt.value, 10) || 12;
            const cap = parseInt(opt.getAttribute("data-cap"), 10) || 60;
            const wName = opt.getAttribute("data-name") || "Silah";

            const hitsNeeded = Math.ceil(activeEnemy.maxHp / dmg);
            const magsNeeded = (hitsNeeded / cap).toFixed(1);

            if (dmgDisplay) dmgDisplay.textContent = `${dmg} Hasar`;
            if (hitsDisplay) hitsDisplay.textContent = `${hitsNeeded} Mermi`;
            if (magDisplay) magDisplay.textContent = `~${magsNeeded} Şarjör (${cap}'lık)`;
            if (fireDmgSpan) fireDmgSpan.textContent = dmg;

            if (tipBox) {
                if (activeEnemy.id === "boss-commander") {
                    if (wName === "Light Machine Gun") {
                        tipBox.innerHTML = `💡 <b>Resmi Minifal Ölçütü:</b> 12 hasar veren <b>Light Machine Gun</b> ile 4.016 canı olan <b>Cyborg Commander</b>'ı indirmek için tam <b>335 isabetli mermi</b> gerekir (4016 ÷ 12 ≈ 334.6).`;
                    } else {
                        tipBox.innerHTML = `💡 <b>Hesaplama:</b> ${dmg} hasar veren <b>${wName}</b> ile 4.016 canı olan <b>Cyborg Commander</b>'ı devirmek için <b>${hitsNeeded} isabetli mermi</b> gerekir.`;
                    }
                } else {
                    if (wName === "Assault Rifle") {
                        tipBox.innerHTML = `💡 <b>Piyade Karşılaşması:</b> 18 hasar veren <b>Assault Rifle</b> ile 250 canı olan <b>Cyborg Soldier</b>'ı düşürmek için <b>14 isabetli mermi</b> yeterlidir (250 ÷ 18 ≈ 13.8).`;
                    } else {
                        tipBox.innerHTML = `💡 <b>Hesaplama:</b> ${dmg} hasar veren <b>${wName}</b> ile 250 canı olan <b>Cyborg Soldier</b>'ı düşürmek için <b>${hitsNeeded} isabetli mermi</b> gerekir.`;
                    }
                }
            }
        }

        // Sekme Değişimi Dinleyicileri
        switchBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-target");
                if (target) setTargetEnemy(target);
            });
        });

        weaponSelect.addEventListener("change", updateCalculations);

        if (fireBtn) {
            fireBtn.addEventListener("click", () => {
                const opt = weaponSelect.options[weaponSelect.selectedIndex];
                const dmg = parseInt(opt.value, 10) || 12;

                currentHp = Math.max(0, currentHp - dmg);
                const pct = (currentHp / activeEnemy.maxHp) * 100;

                if (hpValSpan) hpValSpan.textContent = currentHp.toLocaleString("tr-TR");
                if (hpFillBar) hpFillBar.style.width = `${pct}%`;

                if (currentHp <= 0) {
                    fireBtn.textContent = `🏆 ${activeEnemy.name} Düştü! Zafer!`;
                } else {
                    fireBtn.innerHTML = `💥 -${dmg} Vuruldu! (Kalan: ${currentHp.toLocaleString("tr-TR")} HP)`;
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                currentHp = activeEnemy.maxHp;
                if (hpValSpan) hpValSpan.textContent = activeEnemy.maxHp.toLocaleString("tr-TR");
                if (hpFillBar) hpFillBar.style.width = "100%";
                const opt = weaponSelect.options[weaponSelect.selectedIndex];
                const dmg = parseInt(opt.value, 10) || 12;
                if (fireBtn) fireBtn.innerHTML = `💥 Test Ateşi Aç (-<span id="btn-fire-dmg">${dmg}</span> Hasar)`;
            });
        }

        setTargetEnemy("boss-commander");
    }

    
    // ==============================================================================
    // HARİTA, MEKÂNLAR VE SATICILAR (NPC) FONKSİYONLARI
    // ==============================================================================
    function renderHaritaAndLocations() {
        const locsGrid = document.getElementById("harita-locs-grid");
        if (!locsGrid || !MINIFAL_DATABASE.mapData) return;

        const locs = MINIFAL_DATABASE.mapData.locations || [];
        locsGrid.innerHTML = locs.map(loc => {
            const hasNpcs = loc.npcs && loc.npcs.length > 0;
            const npcBadges = hasNpcs 
                ? loc.npcs.map(n => `<span class="loc-npc-pill">🏷️ ${n}</span>`).join(" ")
                : (loc.id === "loc-4" ? `<span class="loc-npc-pill" style="background:#E0F2FE; color:#0369A1; border-color:#38BDF8;">🛋️ 115 Mobilya</span>` : "");

            return `
                <div class="loc-card">
                    <div>
                        <div class="loc-card-top">
                            <h4 class="loc-name">${loc.name}</h4>
                            <span class="loc-badge">${hasNpcs ? loc.npcs.length + " Satıcı" : "Bölge"}</span>
                        </div>
                        <p class="loc-desc">${loc.desc}</p>
                    </div>
                    <div>
                        ${npcBadges}
                    </div>
                </div>
            `;
        }).join("");
    }

    function renderVendors() {
        const vendorsGrid = document.getElementById("vendors-grid");
        if (!vendorsGrid || !MINIFAL_DATABASE.vendors) return;

        vendorsGrid.innerHTML = MINIFAL_DATABASE.vendors.map(v => {
            let actionBtnText = "Detayları Gör";
            let actionAttr = "";

            if (v.id === "vendor-mason") {
                actionBtnText = "🏡 Evleri Gez & Tasarla";
                actionAttr = 'data-action="goto-houses"';
            } else if (v.id === "vendor-hunter") {
                actionBtnText = "🎾 Spor & Tenis Eşyaları";
                actionAttr = 'data-action="filter-sports"';
            } else if (v.id === "vendor-tobias") {
                actionBtnText = "🎪 Eğlence & Oyuncak Eşyaları";
                actionAttr = 'data-action="filter-toys"';
            } else if (v.id === "vendor-vincent") {
                actionBtnText = "📦 İkinci El Pazarı";
                actionAttr = 'data-action="filter-vintage"';
            }

            return `
                <div class="vendor-card" id="${v.id}">
                    <div class="vendor-avatar-wrap">
                        <img src="${v.avatar}" alt="${v.name}" class="vendor-avatar-img">
                        <span class="vendor-loc-tag">📍 ${v.location}</span>
                    </div>
                    <div class="vendor-body">
                        <h4 class="vendor-name">${v.name}</h4>
                        <span class="vendor-role">${v.role}</span>
                        <div class="vendor-quote">"${v.dialogue}"</div>
                        <span class="vendor-wares-title">Satılan Öne Çıkanlar:</span>
                        <ul class="vendor-wares-list">
                            ${v.itemsForSale.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                        <button type="button" class="vendor-action-btn" ${actionAttr}>${actionBtnText}</button>
                    </div>
                </div>
            `;
        }).join("");

        // Satıcı buton tıklama olayları
        vendorsGrid.querySelectorAll(".vendor-action-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.getAttribute("data-action");
                if (action === "goto-houses") {
                    const target = document.getElementById("evler-section");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                } else if (action === "filter-sports") {
                    state.activeCategory = "sports";
                    updateActiveCategoryButton("sports");
                    renderCards();
                    const katalog = document.getElementById("katalog");
                    if (katalog) katalog.scrollIntoView({ behavior: "smooth" });
                } else if (action === "filter-toys" || action === "filter-vintage") {
                    state.activeCategory = "furniture";
                    updateActiveCategoryButton("furniture");
                    renderCards();
                    const katalog = document.getElementById("katalog");
                    if (katalog) katalog.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    function updateActiveCategoryButton(cat) {
        if (!categoryNav) return;
        categoryNav.querySelectorAll(".cat-btn").forEach(btn => {
            if (btn.getAttribute("data-cat") === cat) {
                btn.classList.add("is-active");
            } else {
                btn.classList.remove("is-active");
            }
        });
    }

    // ==============================================================================
    // EMLAK VE EVLER FONKSİYONLARI
    // ==============================================================================
    function renderHouses() {
        const housesGrid = document.getElementById("houses-grid");
        if (!housesGrid || !MINIFAL_DATABASE.houses) return;

        housesGrid.innerHTML = MINIFAL_DATABASE.houses.map(h => {
            const isCrystal = h.currency === "crystal";
            const coinIcon = isCrystal ? "./img/crystal_gem_trans.png" : "./img/cash_coin_trans.png";

            return `
                <div class="house-card" data-house-id="${h.id}">
                    <div class="house-preview-wrap" data-blueprint-full="${h.fullCard}" title="Büyütmek için tıklayın">
                        <img src="${h.blueprint}" alt="${h.name}" class="house-blueprint-preview">
                        <div class="house-price-tag">
                            <img src="${coinIcon}" style="width:16px;height:16px;object-fit:contain;" alt="">
                            <span>${h.formattedPrice}</span>
                        </div>
                    </div>
                    <div class="house-body">
                        <h4 class="house-name">${h.name}</h4>
                        <div class="house-rooms-pills">
                            ${h.rooms.map(r => `<span class="room-tag">${r}</span>`).join("")}
                        </div>
                        <p class="house-desc">${h.description}</p>
                        <div class="house-actions-row">
                            <button type="button" class="btn-house-view" data-blueprint-full="${h.fullCard}">
                                🔍 Planı Büyüt
                            </button>
                            <button type="button" class="btn-house-design" data-select-house="${h.id}">
                                🛋️ Bu Evi Tasarla
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        // Planı büyütme modal dinleyicileri
        housesGrid.querySelectorAll("[data-blueprint-full]").forEach(el => {
            el.addEventListener("click", () => {
                const fullImg = el.getAttribute("data-blueprint-full");
                if (fullImg) openHouseModal(fullImg);
            });
        });

        // "Bu Evi Tasarla" butonları
        housesGrid.querySelectorAll("[data-select-house]").forEach(btn => {
            btn.addEventListener("click", () => {
                const houseId = btn.getAttribute("data-select-house");
                if (window.designerSwitchRoom) {
                    window.designerSwitchRoom(houseId);
                }
                const designerSec = document.getElementById("tasarimci-section");
                if (designerSec) designerSec.scrollIntoView({ behavior: "smooth" });
            });
        });
    }

    function openHouseModal(imgSrc) {
        if (!modalOverlay || !modalContent) return;
        modalContent.innerHTML = `
            <div style="text-align:center; padding:10px;">
                <img src="${imgSrc}" alt="Ev Planı" style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
                <div style="margin-top:14px;">
                    <a href="#tasarimci-section" onclick="document.getElementById('item-modal').classList.remove('is-open')" class="btn-mason-tour" style="display:inline-block;">
                        🛋️ Bu Evi Tasarımcıda Aç
                    </a>
                </div>
            </div>
        `;
        modalOverlay.classList.add("is-open");
        modalOverlay.setAttribute("aria-hidden", "false");
    }

    // ==============================================================================
    // İNTERAKTİF EV TASARIMCISI VE ODA PLANLAYICI MANTIĞI
    // ==============================================================================
    function initRoomDesigner() {
        const stage = document.getElementById("furniture-stage");
        const viewport = document.getElementById("room-viewport");
        const blueprintImg = document.getElementById("room-blueprint-img");
        const roomLabel = document.getElementById("active-room-label");
        const paletteList = document.getElementById("palette-items-list");
        const paletteSearch = document.getElementById("palette-search");
        const catPills = document.getElementById("palette-cat-pills");
        const counterSpan = document.getElementById("palette-counter");

        const cashTotalSpan = document.getElementById("designer-cash-total");
        const crystalTotalSpan = document.getElementById("designer-crystal-total");
        const countSpan = document.getElementById("designer-item-count");

        const roomButtons = document.querySelectorAll(".room-btn");
        const clearBtn = document.getElementById("btn-clear-room");
        const sampleBtn = document.getElementById("btn-sample-layout");
        const saveBtn = document.getElementById("btn-save-layout");
        const loadBtn = document.getElementById("btn-load-layout");

        if (!stage || !viewport) return;

        // Tasarımcı Durumu (Designer State)
        const designerState = {
            activeRoom: "house-kucuk",
            activePaletteCat: "all",
            paletteQuery: "",
            placedItems: [], // { id, furnId, x, y, flipped, zIndex }
            selectedItem: null,
            draggedItem: null,
            dragOffset: { x: 0, y: 0 },
            nextZ: 10
        };

        const roomBlueprints = {
            "house-kucuk": { name: "Küçük Oda", src: "./img/houses/house_kucuk_oda.png" },
            "house-orta": { name: "Orta Boy Oda", src: "./img/houses/house_orta_oda.png" },
            "house-buyuk": { name: "Büyük Oda", src: "./img/houses/house_buyuk_oda.png" },
            "house-teras": { name: "Teras Katı", src: "./img/houses/house_teras_kati.png" }
        };

        // Dışarıdan oda değişimini çağırmak için global referans
        window.designerSwitchRoom = function(roomId) {
            if (!roomBlueprints[roomId]) return;
            designerState.activeRoom = roomId;

            roomButtons.forEach(b => {
                if (b.getAttribute("data-room") === roomId) b.classList.add("active");
                else b.classList.remove("active");
            });

            blueprintImg.src = roomBlueprints[roomId].src;
            if (roomLabel) roomLabel.textContent = `Seçili Oda: ${roomBlueprints[roomId].name}`;
        };

        // Oda Seçici Butonları
        roomButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const r = btn.getAttribute("data-room");
                window.designerSwitchRoom(r);
            });
        });

        // Mobilya Paletini Render Et
        function renderPalette() {
            let furnList = MINIFAL_DATABASE.furniture || [];

            // Kategori filtreleme
            if (designerState.activePaletteCat !== "all") {
                furnList = furnList.filter(f => f.furnCategory === designerState.activePaletteCat);
            }

            // Arama filtreleme
            if (designerState.paletteQuery.trim()) {
                const q = designerState.paletteQuery.toLowerCase();
                furnList = furnList.filter(f =>
                    f.name.toLowerCase().includes(q) ||
                    (f.trName && f.trName.toLowerCase().includes(q)) ||
                    (f.subType && f.subType.toLowerCase().includes(q))
                );
            }

            if (counterSpan) counterSpan.textContent = `${furnList.length} Eşya`;

            if (furnList.length === 0) {
                paletteList.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--ink-dim);font-size:12px;">Eşya bulunamadı.</div>`;
                return;
            }

            paletteList.innerHTML = furnList.map(item => {
                const isCrystal = item.currency === "crystal";
                const coin = isCrystal ? "./img/crystal_gem_trans.png" : "./img/cash_coin_trans.png";
                return `
                    <div class="palette-item-card" data-furn-id="${item.id}" title="${item.name} (${item.trName || ""})">
                        <img src="${item.image}" alt="${item.name}" class="palette-item-thumb">
                        <span class="palette-item-name">${item.name}</span>
                        <span class="palette-item-trname">${item.trName || item.subType}</span>
                        <span class="palette-item-price">
                            <img src="${coin}" style="width:13px;height:13px;object-fit:contain;" alt="">
                            ${item.price.toLocaleString("tr-TR")}
                        </span>
                        <button type="button" class="palette-add-btn" data-add-furn="${item.id}">+ Ekle</button>
                    </div>
                `;
            }).join("");

            // Tıklayınca odaya ekleme
            paletteList.querySelectorAll("[data-add-furn]").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const fId = btn.getAttribute("data-add-furn");
                    addFurnitureToStage(fId);
                });
            });

            // Kartın kendisine tıklayınca da ekleme
            paletteList.querySelectorAll(".palette-item-card").forEach(card => {
                card.addEventListener("click", () => {
                    const fId = card.getAttribute("data-furn-id");
                    addFurnitureToStage(fId);
                });
            });
        }

        // Kategori Hapları Dinleyicisi
        if (catPills) {
            catPills.querySelectorAll(".p-cat-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    catPills.querySelectorAll(".p-cat-btn").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    designerState.activePaletteCat = btn.getAttribute("data-pcat");
                    renderPalette();
                });
            });
        }

        // Palet Arama Girişi
        if (paletteSearch) {
            paletteSearch.addEventListener("input", (e) => {
                designerState.paletteQuery = e.target.value;
                renderPalette();
            });
        }

        // Odaya Mobilya Ekle
        function addFurnitureToStage(furnId, customX = null, customY = null, flipped = false) {
            const furn = (MINIFAL_DATABASE.furniture || []).find(f => f.id === furnId);
            if (!furn) return;

            const stageRect = stage.getBoundingClientRect();
            const stageW = (stageRect && stageRect.width > 100) ? stageRect.width : 520;
            const stageH = (stageRect && stageRect.height > 100) ? stageRect.height : 440;
            const defaultX = customX !== null ? customX : Math.round(stageW / 2 - 35 + (Math.random() * 40 - 20));
            const defaultY = customY !== null ? customY : Math.round(stageH / 2 - 35 + (Math.random() * 40 - 20));

            const instanceId = "placed-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
            designerState.nextZ += 1;

            const placedObj = {
                id: instanceId,
                furnId: furn.id,
                name: furn.name,
                trName: furn.trName,
                price: furn.price,
                currency: furn.currency,
                image: furn.image,
                x: defaultX,
                y: defaultY,
                flipped: flipped,
                zIndex: designerState.nextZ
            };

            designerState.placedItems.push(placedObj);
            renderPlacedItemDom(placedObj);
            updateBudget();
            selectItem(instanceId);
        }

        // Yerleştirilen Eşyanın DOM Elemanını Oluştur
        function renderPlacedItemDom(item) {
            const el = document.createElement("div");
            el.className = "placed-item";
            el.id = item.id;
            el.style.left = `${item.x}px`;
            el.style.top = `${item.y}px`;
            el.style.zIndex = item.zIndex;
            el.style.transform = item.flipped ? "scaleX(-1)" : "none";

            el.innerHTML = `
                <div class="placed-item-gizmo">
                    <button type="button" class="gizmo-btn gizmo-btn--flip" title="Döndür / Çevir">🔄</button>
                    <button type="button" class="gizmo-btn gizmo-btn--up" title="Öne Getir">⬆️</button>
                    <button type="button" class="gizmo-btn gizmo-btn--down" title="Arkaya Gönder">⬇️</button>
                    <button type="button" class="gizmo-btn gizmo-btn--del" title="Sil">🗑️</button>
                </div>
                <img src="${item.image}" alt="${item.name}">
            `;

            // Gizmo Aksiyonları
            const flipBtn = el.querySelector(".gizmo-btn--flip");
            const upBtn = el.querySelector(".gizmo-btn--up");
            const downBtn = el.querySelector(".gizmo-btn--down");
            const delBtn = el.querySelector(".gizmo-btn--del");

            flipBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                item.flipped = !item.flipped;
                el.style.transform = item.flipped ? "scaleX(-1)" : "none";
            });

            upBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                designerState.nextZ += 1;
                item.zIndex = designerState.nextZ;
                el.style.zIndex = item.zIndex;
            });

            downBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                item.zIndex = Math.max(1, item.zIndex - 1);
                el.style.zIndex = item.zIndex;
            });

            delBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                removePlacedItem(item.id);
            });

            // Tıklama ve Sürükleme Başlatma
            el.addEventListener("pointerdown", (e) => {
                // Gizmo butonlarına tıklandıysa sürükleme yapma
                if (e.target.closest(".placed-item-gizmo")) return;
                e.stopPropagation();

                selectItem(item.id);
                designerState.draggedItem = item;
                const rect = el.getBoundingClientRect();
                designerState.dragOffset = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };

                el.setPointerCapture(e.pointerId);
            });

            el.addEventListener("pointermove", (e) => {
                if (designerState.draggedItem && designerState.draggedItem.id === item.id) {
                    const stageRect = stage.getBoundingClientRect();
                    let newX = e.clientX - stageRect.left - designerState.dragOffset.x;
                    let newY = e.clientY - stageRect.top - designerState.dragOffset.y;

                    // Tuval sınırları
                    newX = Math.max(0, Math.min(newX, stageRect.width - 50));
                    newY = Math.max(0, Math.min(newY, stageRect.height - 50));

                    item.x = Math.round(newX);
                    item.y = Math.round(newY);

                    el.style.left = `${item.x}px`;
                    el.style.top = `${item.y}px`;
                }
            });

            el.addEventListener("pointerup", (e) => {
                if (designerState.draggedItem && designerState.draggedItem.id === item.id) {
                    designerState.draggedItem = null;
                    try { el.releasePointerCapture(e.pointerId); } catch(err) {}
                }
            });

            stage.appendChild(el);
        }

        function selectItem(instanceId) {
            designerState.selectedItem = instanceId;
            stage.querySelectorAll(".placed-item").forEach(el => {
                if (el.id === instanceId) el.classList.add("is-selected");
                else el.classList.remove("is-selected");
            });
        }

        function removePlacedItem(instanceId) {
            const idx = designerState.placedItems.findIndex(i => i.id === instanceId);
            if (idx !== -1) {
                designerState.placedItems.splice(idx, 1);
            }
            const dom = document.getElementById(instanceId);
            if (dom) dom.remove();
            if (designerState.selectedItem === instanceId) designerState.selectedItem = null;
            updateBudget();
        }

        // Sahneye boş tıklanınca seçimi kaldır
        viewport.addEventListener("pointerdown", (e) => {
            if (!e.target.closest(".placed-item")) {
                designerState.selectedItem = null;
                stage.querySelectorAll(".placed-item").forEach(el => el.classList.remove("is-selected"));
            }
        });

        // Bütçe Hesaplaması
        function updateBudget() {
            let totalCash = 0;
            let totalCrystal = 0;

            designerState.placedItems.forEach(item => {
                if (item.currency === "crystal") {
                    totalCrystal += item.price;
                } else {
                    totalCash += item.price;
                }
            });

            if (cashTotalSpan) cashTotalSpan.textContent = `${totalCash.toLocaleString("tr-TR")} Cash`;
            if (crystalTotalSpan) crystalTotalSpan.textContent = `${totalCrystal.toLocaleString("tr-TR")} Crystal`;
            if (countSpan) countSpan.textContent = `${designerState.placedItems.length} Eşya`;
        }

        // Temizle Butonu
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (designerState.placedItems.length === 0) return;
                if (confirm("Odadaki tüm mobilyaları kaldırmak istediğinize emin misiniz?")) {
                    designerState.placedItems = [];
                    designerState.selectedItem = null;
                    stage.innerHTML = "";
                    updateBudget();
                }
            });
        }

        // Örnek Yerleşim Butonu
        if (sampleBtn) {
            sampleBtn.addEventListener("click", () => {
                stage.innerHTML = "";
                designerState.placedItems = [];
                designerState.selectedItem = null;

                const stageRect = stage.getBoundingClientRect();
                const cx = stageRect.width || 600;
                const cy = stageRect.height || 500;

                // Seçili odaya göre zengin örnek yerleşim
                if (designerState.activeRoom === "house-kucuk") {
                    addFurnitureToStage("furn-single-bed", cx * 0.18, cy * 0.58);
                    addFurnitureToStage("furn-small-nightstand", cx * 0.36, cy * 0.62);
                    addFurnitureToStage("furn-classic-armchair", cx * 0.55, cy * 0.45);
                    addFurnitureToStage("furn-32-lcd-tv", cx * 0.65, cy * 0.28);
                    addFurnitureToStage("furn-fridge", cx * 0.72, cy * 0.52);
                    addFurnitureToStage("furn-simple-large-rug", cx * 0.38, cy * 0.42);
                    addFurnitureToStage("furn-desk-lamp", cx * 0.38, cy * 0.55);
                } else if (designerState.activeRoom === "house-orta") {
                    addFurnitureToStage("furn-double-bed", cx * 0.15, cy * 0.55);
                    addFurnitureToStage("furn-nightstand-tray", cx * 0.32, cy * 0.58);
                    addFurnitureToStage("furn-classic-large-couch", cx * 0.48, cy * 0.38);
                    addFurnitureToStage("furn-double-coffee-table", cx * 0.52, cy * 0.50);
                    addFurnitureToStage("furn-42-lcd-tv", cx * 0.68, cy * 0.25);
                    addFurnitureToStage("furn-audio-system", cx * 0.78, cy * 0.28);
                    addFurnitureToStage("furn-bookshelves", cx * 0.35, cy * 0.22);
                    addFurnitureToStage("furn-thin-floor-lamp", cx * 0.45, cy * 0.25);
                } else if (designerState.activeRoom === "house-buyuk") {
                    addFurnitureToStage("furn-double-bed", cx * 0.16, cy * 0.45);
                    addFurnitureToStage("furn-large-wardrobe", cx * 0.08, cy * 0.30);
                    addFurnitureToStage("furn-fancy-large-couch", cx * 0.42, cy * 0.35);
                    addFurnitureToStage("furn-fancy-armchair", cx * 0.34, cy * 0.52);
                    addFurnitureToStage("furn-large-dinner-table", cx * 0.62, cy * 0.48);
                    addFurnitureToStage("furn-52-lcd-tv", cx * 0.58, cy * 0.22);
                    addFurnitureToStage("furn-high-speaker", cx * 0.68, cy * 0.22);
                    addFurnitureToStage("furn-striped-med-rug", cx * 0.44, cy * 0.45);
                    addFurnitureToStage("furn-deck-chair", cx * 0.12, cy * 0.68);
                } else {
                    // Teras Katı
                    addFurnitureToStage("furn-double-bed", cx * 0.18, cy * 0.32);
                    addFurnitureToStage("furn-transparent-large-couch", cx * 0.45, cy * 0.35);
                    addFurnitureToStage("furn-transparent-armchair", cx * 0.38, cy * 0.50);
                    addFurnitureToStage("furn-piano", cx * 0.70, cy * 0.25);
                    addFurnitureToStage("furn-52-lcd-tv", cx * 0.55, cy * 0.18);
                    addFurnitureToStage("furn-billiards-table", cx * 0.68, cy * 0.55);
                    addFurnitureToStage("furn-small-fountain", cx * 0.42, cy * 0.68);
                    addFurnitureToStage("furn-trampoline", cx * 0.22, cy * 0.65);
                }
            });
        }

        // Tasarımı Kaydet (LocalStorage)
        if (saveBtn) {
            saveBtn.addEventListener("click", () => {
                const savePayload = {
                    room: designerState.activeRoom,
                    items: designerState.placedItems.map(i => ({
                        furnId: i.furnId,
                        x: i.x,
                        y: i.y,
                        flipped: i.flipped,
                        zIndex: i.zIndex
                    }))
                };
                localStorage.setItem("minifal_room_design", JSON.stringify(savePayload));
                alert("✨ Tasarımınız tarayıcınıza başarıyla kaydedildi!");
            });
        }

        // Kayıtlı Tasarımı Yükle
        if (loadBtn) {
            loadBtn.addEventListener("click", () => {
                const raw = localStorage.getItem("minifal_room_design");
                if (!raw) {
                    alert("Kayıtlı bir tasarım bulunamadı. Önce bir tasarım kaydedin.");
                    return;
                }
                try {
                    const data = JSON.parse(raw);
                    if (data.room) window.designerSwitchRoom(data.room);

                    stage.innerHTML = "";
                    designerState.placedItems = [];
                    designerState.selectedItem = null;

                    if (Array.isArray(data.items)) {
                        data.items.forEach(it => {
                            addFurnitureToStage(it.furnId, it.x, it.y, it.flipped);
                        });
                    }
                    alert("📂 Kayıtlı tasarımınız başarıyla yüklendi!");
                } catch(err) {
                    alert("Tasarım yüklenirken bir hata oluştu.");
                }
            });
        }

        // İlk palet renderı
        renderPalette();

        // Başlangıçta odayı boş bırakmamak için örnek yerleşimi otomatik yükle
        setTimeout(() => {
            if (sampleBtn) sampleBtn.click();
        }, 150);
    }

    // Pencere yeniden boyutlandırıldığında grafiği güncelle
    window.addEventListener("resize", () => {
        renderChart();
    });

    // Başlangıç Çalıştırması
    populateChartSelect();
    renderChart();
    renderMarketTable();
    renderCards();
    initBossCalculator();
    renderHaritaAndLocations();
    renderVendors();
    renderHouses();
    initRoomDesigner();
});

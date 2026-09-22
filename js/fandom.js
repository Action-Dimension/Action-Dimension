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
    function openItemModal(itemId) {
        const item = getAllItems().find(i => i.id === itemId);
        if (!item) return;

        const icon = getItemIcon(item);
        const rarityClass = `rarity-${item.rarity || 'common'}`;

        let detailsSpecificHtml = '';
        if (item.category === "weapons") {
            detailsSpecificHtml = `
                <h4 class="modal-section-title">Silah İstatistikleri</h4>
                <div class="modal-stat-grid">
                    <div class="modal-stat-item"><span class="modal-stat-label">Hasar</span><span class="modal-stat-value">${item.stats.damage} Hasar</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Atış Hızı</span><span class="modal-stat-value">${item.stats.fireRate}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Menzil</span><span class="modal-stat-value">${item.stats.range} m</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Şarjör</span><span class="modal-stat-value">${item.stats.capacity}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Modkit Yuvası</span><span class="modal-stat-value" style="color:var(--teal);">${item.modkitSlots} Yuva</span></div>
                </div>
                ${item.combatBenchmark ? `<p style="font-size:12.5px; color:var(--orange); font-weight:800; margin:8px 0 0;">⚔️ Savaş Notu: ${item.combatBenchmark}</p>` : ''}
                <h4 class="modal-section-title">Uyumlu Modkitler</h4>
                <p style="font-size: 13.5px; color: var(--ink); margin: 0;">${item.compatibleModkits ? item.compatibleModkits.join(", ") : "Standart Modkitler"}</p>
            `;
        } else if (item.category === "modkits") {
            detailsSpecificHtml = `
                <h4 class="modal-section-title">Modkit Etkileri</h4>
                <div class="modal-stat-grid">
                    <div class="modal-stat-item"><span class="modal-stat-label">Etki</span><span class="modal-stat-value" style="color:var(--orange);">${item.effects}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Yuva İhtiyacı</span><span class="modal-stat-value">${item.slotCost}</span></div>
                </div>
                <h4 class="modal-section-title">Uyumlu Silah Tipleri</h4>
                <p style="font-size: 13.5px; color: var(--ink); margin: 0;">${item.compatibility}</p>
            `;
        } else if (item.category === "armor") {
            detailsSpecificHtml = `
                <h4 class="modal-section-title">Zırh Değerleri</h4>
                <div class="modal-stat-grid">
                    <div class="modal-stat-item"><span class="modal-stat-label">Zırh Koruma</span><span class="modal-stat-value">${item.defense}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Hız Değişimi</span><span class="modal-stat-value">${item.speedModifier}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Dayanıklılık</span><span class="modal-stat-value">${item.durability} DP</span></div>
                </div>
            `;
        } else if (item.category === "furniture") {
            detailsSpecificHtml = `
                <h4 class="modal-section-title">Ev Düzenleme Bilgisi</h4>
                <div class="modal-stat-grid">
                    <div class="modal-stat-item"><span class="modal-stat-label">Döndürme</span><span class="modal-stat-value">${item.rotatable}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Kaynak</span><span class="modal-stat-value">${item.source}</span></div>
                </div>
                <h4 class="modal-section-title">Renk Seçenekleri</h4>
                <p style="font-size: 13.5px; color: var(--ink): margin: 0;">${item.colorOptions ? item.colorOptions.join(", ") : "Standart Renk"}</p>
            `;
        } else if (item.category === "potions") {
            detailsSpecificHtml = `
                <h4 class="modal-section-title">İksir Etkisi</h4>
                <div class="modal-stat-grid">
                    <div class="modal-stat-item"><span class="modal-stat-label">Etki Süresi</span><span class="modal-stat-value">${item.duration}</span></div>
                    <div class="modal-stat-item"><span class="modal-stat-label">Karakter Bonusu</span><span class="modal-stat-value" style="color:var(--teal);">${item.effect}</span></div>
                </div>
            `;
        }

        // Fiyat geçmişi mini tablosu
        let priceHistoryHtml = '';
        if (item.priceHistory && item.priceHistory.length > 0) {
            const histIcon = item.currency === 'crystal' ? './img/crystal_gem_trans.png' : './img/cash_coin_trans.png';
            priceHistoryHtml = `
                <h4 class="modal-section-title">Zaman İçindeki Fiyat Değişimi</h4>
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
                    ${item.priceHistory.map(ph => `
                        <div style="flex:1; min-width:80px; background:var(--sand-input); border:1.5px solid var(--ink); border-radius:8px; padding:6px 10px; text-align:center;">
                            <span style="font-size:11px; color:var(--ink-dim); display:block;">${ph.date}</span>
                            <b style="font-family:var(--font-display); font-size:13px; display:inline-flex; align-items:center; justify-content:center; gap:3px;">
                                <img src="${histIcon}" style="width:15px;height:12px;" alt="">
                                ${ph.price.toLocaleString('tr-TR')}
                            </b>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        modalContent.innerHTML = `
            <div class="modal-top-bar" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(46,42,24,0.25); padding-bottom:10px; margin-bottom:16px;">
                <span style="font-family:var(--font-display); font-size:17px; font-weight:900; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink); text-shadow:1px 1px 0 rgba(255,255,255,0.9);">EŞYA AYRINTILARI</span>
            </div>
            <div class="modal-head">
                <div class="modal-icon">${icon}</div>
                <div>
                    <h2 class="modal-title">${item.name}</h2>
                    <span class="rarity-pill ${rarityClass}">${item.rarityName || 'Standart'}</span>
                    <span style="margin-left: 8px; font-size: 13px; color: var(--ink-dim); font-weight: 700;">${item.subType || ''}</span>
                    <div style="margin-top: 6px; font-size: 14px; font-weight: 700; color: var(--ink);">
                        Fiyatı: <span style="font-family:var(--font-display); font-weight:900;">${item.price.toLocaleString('tr-TR')} ${item.currency === 'crystal' ? 'Crystal' : 'Cash'}</span>
                        <img src="${item.currency === 'crystal' ? './img/crystal_gem_trans.png' : './img/cash_coin_trans.png'}" style="width:18px; height:15px; vertical-align:middle; margin-left:4px;" alt="">
                    </div>
                </div>
            </div>
            <div style="background:var(--sand-input); border:1.5px solid var(--ink); border-radius:10px; padding:12px 14px; margin-bottom:16px;">
                <b style="font-size:12px; color:var(--ink-dim); display:block; text-transform:uppercase; margin-bottom:4px;">Eşya Bilgisi:</b>
                <p style="color: var(--ink); font-size: 14px; line-height: 1.5; margin: 0; font-weight: 600;">${item.description || ''}</p>
            </div>
            ${detailsSpecificHtml}
            ${priceHistoryHtml}
            <div style="margin-top: 24px; padding-top: 16px; border-top: 2px dashed rgba(46,42,24,0.2); display: flex; align-items: center; justify-content: space-between; flex-wrap:wrap; gap:10px;">
                <div>
                    <span style="font-size:11px; color:var(--ink-dim); text-transform:uppercase; font-weight:700;">Güncel Pazar Fiyatı</span>
                    <div style="margin-top: 2px;">${renderPriceHtml(item, true)}</div>
                    ${item.marketRange ? `<span style="display:block; font-size:12px; color:var(--orange); font-weight:700; margin-top:4px;">Pazar İlan Aralığı: ${item.marketRange}</span>` : ''}
                </div>
                <div style="display:flex; gap:8px;">
                    <button id="view-on-chart-btn" type="button" class="cat-btn is-active" style="padding: 8px 14px;">Grafikte İncele 📈</button>
                    <button type="button" class="btn-fire" style="padding: 8px 16px; background:#3D1800; color:#FFF; border-radius:8px; font-weight:800; border:1.5px solid var(--ink); box-shadow:2px 2px 0 var(--ink);">Bu eşyayı al</button>
                </div>
            </div>
        `;

        modalOverlay.classList.add("is-open");

        const viewChartBtn = document.getElementById("view-on-chart-btn");
        if (viewChartBtn) {
            viewChartBtn.addEventListener("click", () => {
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

    // 5. BOSS REHBERİ & HASAR HESAPLAYICISI (COMMANDER 4016 CAN & LIGHT MACHINE GUN 12 HASAR)
    function initBossCalculator() {
        const weaponSelect = document.getElementById("boss-weapon-select");
        const dmgDisplay = document.getElementById("calc-dmg-display");
        const hitsDisplay = document.getElementById("calc-hits-display");
        const magDisplay = document.getElementById("calc-mag-display");
        const fireBtn = document.getElementById("btn-fire-test");
        const fireDmgSpan = document.getElementById("btn-fire-dmg");
        const resetBtn = document.getElementById("btn-reset-hp");
        const hpValSpan = document.getElementById("commander-hp-val");
        const hpFillBar = document.getElementById("commander-hp-fill");
        const tipBox = document.getElementById("calc-benchmark-text");

        if (!weaponSelect) return;

        const maxHp = 4016;
        let currentHp = 4016;

        function updateCalculations() {
            const opt = weaponSelect.options[weaponSelect.selectedIndex];
            const dmg = parseInt(opt.value, 10) || 12;
            const cap = parseInt(opt.getAttribute("data-cap"), 10) || 60;
            const wName = opt.getAttribute("data-name") || "Silah";

            const hitsNeeded = Math.ceil(maxHp / dmg);
            const magsNeeded = (hitsNeeded / cap).toFixed(1);

            if (dmgDisplay) dmgDisplay.textContent = `${dmg} Hasar`;
            if (hitsDisplay) hitsDisplay.textContent = `${hitsNeeded} Mermi`;
            if (magDisplay) magDisplay.textContent = `~${magsNeeded} Şarjör (${cap}'lık)`;
            if (fireDmgSpan) fireDmgSpan.textContent = dmg;

            if (tipBox) {
                if (wName === "Light Machine Gun") {
                    tipBox.innerHTML = `💡 <b>Resmi Minifal Ölçütü:</b> 12 hasar veren <b>Light Machine Gun</b> ile 4016 canı olan <b>Commander</b>'ı indirmek için tam <b>335 isabetli mermi</b> gerekir (4016 ÷ 12 ≈ 334.6).`;
                } else {
                    tipBox.innerHTML = `💡 <b>Hesaplama:</b> ${dmg} hasar veren <b>${wName}</b> ile 4016 canı olan <b>Commander</b>'ı devirmek için <b>${hitsNeeded} isabetli mermi</b> gerekir.`;
                }
            }
        }

        weaponSelect.addEventListener("change", updateCalculations);

        if (fireBtn) {
            fireBtn.addEventListener("click", () => {
                const opt = weaponSelect.options[weaponSelect.selectedIndex];
                const dmg = parseInt(opt.value, 10) || 12;

                currentHp = Math.max(0, currentHp - dmg);
                const pct = (currentHp / maxHp) * 100;

                if (hpValSpan) hpValSpan.textContent = currentHp.toLocaleString("tr-TR");
                if (hpFillBar) hpFillBar.style.width = `${pct}%`;

                if (currentHp <= 0) {
                    fireBtn.textContent = "🏆 Commander Düştü! Zafer!";
                } else {
                    fireBtn.innerHTML = `💥 -${dmg} Vuruldu! (Kalan: ${currentHp.toLocaleString("tr-TR")} HP)`;
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                currentHp = maxHp;
                if (hpValSpan) hpValSpan.textContent = maxHp.toLocaleString("tr-TR");
                if (hpFillBar) hpFillBar.style.width = "100%";
                const opt = weaponSelect.options[weaponSelect.selectedIndex];
                const dmg = parseInt(opt.value, 10) || 12;
                if (fireBtn) fireBtn.innerHTML = `💥 Test Ateşi Aç (-<span id="btn-fire-dmg">${dmg}</span> Hasar)`;
            });
        }

        updateCalculations();
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
});

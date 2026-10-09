

(function () {
    'use strict';

    if (window.nirmanThemeSwitcherInitialized || document.getElementById('nirman-switcher-container')) {
        return;
    }
    window.nirmanThemeSwitcherInitialized = true;

    const colorPalettes = [
        { name: 'Imperial Gold (Default)', hex: '#dfa938', hoverHex: '#f0ba4a' },
        { name: 'Sapphire Blue', hex: '#1e70eb', hoverHex: '#3b82f6' },
        { name: 'Emerald Green', hex: '#10b981', hoverHex: '#34d399' },
        { name: 'Terracotta Orange', hex: '#e0672e', hoverHex: '#f97316' },
        { name: 'Crimson Modern', hex: '#e11d48', hoverHex: '#f43f5e' }
    ];

    const currentPath = window.location.pathname.toLowerCase();
    const isInCreativeModernDir = currentPath.includes('creative%20modern%20theme') || currentPath.includes('creative modern theme');
    const isInNirmanDir = currentPath.includes('nirman%20consultants.html') || currentPath.includes('nirman consultants.html');

    let currentHome = 'luxury';
    if (isInCreativeModernDir) {
        currentHome = 'modern';
    } else if (currentPath.includes('-4.html') || currentPath.includes('theme-contemporary.html')) {
        currentHome = 'engineering';
    } else if (currentPath.includes('-3.html') || currentPath.includes('theme-modern.html')) {
        currentHome = 'modern';
    } else {
        currentHome = 'luxury';
    }

    let pageType = 'home';
    let isDetail = false;
    if (currentPath.includes('about')) {
        pageType = 'about';
    } else if (currentPath.includes('service')) {
        pageType = 'service';
        if (currentPath.includes('detail')) isDetail = true;
    } else if (currentPath.includes('project')) {
        pageType = 'project';
        if (currentPath.includes('detail')) isDetail = true;
    } else if (currentPath.includes('client')) {
        pageType = 'clients';
    } else if (currentPath.includes('faq')) {
        pageType = 'faq';
    } else if (currentPath.includes('contact')) {
        pageType = 'contact';
    }

    function getThemeUrl(themeKey) {
        if (isInCreativeModernDir) {
            if (themeKey === 'modern') {
                if (pageType === 'home') return 'index.html';
                if (pageType === 'service') return isDetail ? 'service-details.html' : 'service.html';
                if (pageType === 'project') return isDetail ? 'project-details.html' : 'project.html';
                return pageType + '.html';
            } else if (themeKey === 'luxury') {
                const targetBase = '../Nirman Consultants.html/';
                if (pageType === 'home') return targetBase + 'index.html';
                if (pageType === 'service') return targetBase + (isDetail ? 'service-details.html' : 'service.html');
                if (pageType === 'project') return targetBase + (isDetail ? 'project-details.html' : 'project.html');
                return targetBase + pageType + '.html';
            } else if (themeKey === 'engineering') {
                const targetBase = '../Nirman Consultants.html/';
                if (pageType === 'home') return targetBase + 'theme-contemporary.html';
                return targetBase + pageType + '-4.html';
            }
        } else {
            if (themeKey === 'luxury') {
                if (pageType === 'home') return 'index.html';
                if (pageType === 'service') return isDetail ? 'service-details.html' : 'service.html';
                if (pageType === 'project') return isDetail ? 'project-details.html' : 'project.html';
                return pageType + '.html';
            } else if (themeKey === 'modern') {
                const targetBase = '../Creative Modern Theme/';
                if (pageType === 'home') return targetBase + 'index.html';
                if (pageType === 'service') return targetBase + (isDetail ? 'service-details.html' : 'service.html');
                if (pageType === 'project') return targetBase + (isDetail ? 'project-details.html' : 'project.html');
                return targetBase + pageType + '.html';
            } else if (themeKey === 'engineering') {
                if (pageType === 'home') return 'theme-contemporary.html';
                return pageType + '-4.html';
            }
        }
        return 'index.html';
    }

    function initSwitcher() {
        if (document.getElementById('nirman-switcher-container')) return;

        const styleTag = document.createElement('style');
        styleTag.id = 'nirman-theme-switcher-styles';
        styleTag.textContent = `
        
        .nirman-switcher-toggle {
            position: fixed;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: #141414;
            border: 2px solid var(--theme, #dfa938);
            border-right: none;
            border-radius: 12px 0 0 12px;
            color: var(--theme, #dfa938);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 99998;
            box-shadow: -4px 6px 20px rgba(0, 0, 0, 0.6);
            transition: all 0.3s ease;
        }

        .nirman-switcher-toggle:hover {
            background: var(--theme, #dfa938);
            color: #111111;
            padding-right: 6px;
        }

        .nirman-switcher-toggle i {
            font-size: 22px;
            animation: nirmanCogSpin 6s linear infinite;
        }

        @keyframes nirmanCogSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        
        .nirman-switcher-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 99998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.35s ease;
        }

        .nirman-switcher-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        
        .nirman-switcher-panel {
            position: fixed;
            top: 0;
            right: -380px;
            width: 360px;
            max-width: 90vw;
            height: 100vh;
            background: #121212;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: -10px 0 35px rgba(0, 0, 0, 0.85);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: inherit;
        }

        .nirman-switcher-panel.active {
            right: 0;
        }

        
        .nirman-switcher-header {
            padding: 20px 24px;
            background: #181818;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .nirman-switcher-header h5 {
            margin: 0;
            font-size: 17px;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nirman-switcher-close {
            background: transparent;
            border: none;
            color: #999999;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            border-radius: 6px;
            transition: all 0.2s ease;
        }

        .nirman-switcher-close:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
        }

        
        .nirman-switcher-body {
            padding: 24px;
            overflow-y: auto;
            flex: 1;
        }

        .nirman-switcher-section {
            margin-bottom: 28px;
        }

        .nirman-switcher-section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #888888;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        
        .nirman-theme-card {
            display: block;
            background: #1c1c1c;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 14px 16px;
            margin-bottom: 12px;
            text-decoration: none;
            transition: all 0.25s ease;
        }

        .nirman-theme-card:hover {
            border-color: var(--theme, #dfa938);
            background: #242424;
            transform: translateY(-2px);
        }

        .nirman-theme-card.active {
            border-color: var(--theme, #dfa938);
            background: rgba(223, 169, 56, 0.08);
            box-shadow: 0 0 0 1px var(--theme, #dfa938);
        }

        .nirman-theme-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
        }

        .nirman-theme-card-title {
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
        }

        .nirman-theme-card-badge {
            font-size: 11px;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .nirman-theme-card-badge.current {
            background: var(--theme, #dfa938);
            color: #111111;
        }

        .nirman-theme-card-badge.view {
            background: rgba(255, 255, 255, 0.1);
            color: #aaaaaa;
        }

        .nirman-theme-card-desc {
            font-size: 12px;
            color: #888888;
            margin: 0;
            line-height: 1.4;
        }

        
        .nirman-color-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
        }

        .nirman-color-btn {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 8px;
            border: 2px solid rgba(255, 255, 255, 0.15);
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            padding: 0;
        }

        .nirman-color-btn:hover {
            transform: scale(1.1);
            border-color: #ffffff;
        }

        .nirman-color-btn.active {
            border-color: #ffffff;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
        }

        .nirman-color-btn.active::after {
            content: "✓";
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 14px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        
        .nirman-switcher-footer {
            padding: 16px 24px;
            background: #181818;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            text-align: center;
        }

        .nirman-reset-btn {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: rgba(255, 255, 255, 0.7);
            padding: 8px 18px;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
        }

        .nirman-reset-btn:hover {
            border-color: var(--theme, #dfa938);
            color: #ffffff;
        }
        `;
        document.head.appendChild(styleTag);

        const panelHTML = `
        <!-- Floating Gear Button -->
        <div class="nirman-switcher-toggle" id="nirmanSwitcherToggle" title="Theme & Layout Settings">
            <i class="fas fa-cog"></i>
        </div>

        <!-- Backdrop Overlay -->
        <div class="nirman-switcher-overlay" id="nirmanSwitcherOverlay"></div>

        <!-- Slide-out Settings Panel -->
        <div class="nirman-switcher-panel" id="nirmanSwitcherPanel">
            <div class="nirman-switcher-header">
                <h5><i class="fas fa-palette text-warning"></i> Theme & Layouts</h5>
                <button class="nirman-switcher-close" id="nirmanSwitcherClose" title="Close Panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="nirman-switcher-body">
                <!-- Section 1: Theme Layouts -->
                <div class="nirman-switcher-section">
                    <div class="nirman-switcher-section-title">
                        <i class="fas fa-layer-group"></i> Website Theme Styles
                    </div>

                    <!-- Theme 1: Luxury Dark Theme -->
                    <a href="${getThemeUrl('luxury')}" class="nirman-theme-card ${currentHome === 'luxury' ? 'active' : ''}">
                        <div class="nirman-theme-card-header">
                            <h6 class="nirman-theme-card-title">Luxury Dark Theme</h6>
                            <span class="nirman-theme-card-badge ${currentHome === 'luxury' ? 'current' : 'view'}">
                                ${currentHome === 'luxury' ? 'Active' : 'Switch'}
                            </span>
                        </div>
                        <p class="nirman-theme-card-desc">Signature dark luxury aesthetic with imperial gold architectural accents & project highlights.</p>
                    </a>

                    <!-- Theme 2: Creative Modern Theme -->
                    <a href="${getThemeUrl('modern')}" class="nirman-theme-card ${currentHome === 'modern' ? 'active' : ''}">
                        <div class="nirman-theme-card-header">
                            <h6 class="nirman-theme-card-title">Creative Modern Theme</h6>
                            <span class="nirman-theme-card-badge ${currentHome === 'modern' ? 'current' : 'view'}">
                                ${currentHome === 'modern' ? 'Active' : 'Switch'}
                            </span>
                        </div>
                        <p class="nirman-theme-card-desc">Clean modern aesthetic inspired by Oraxis, featuring dedicated service & project detail showcases.</p>
                    </a>

                    <!-- Theme 3: Contemporary Engineering Theme -->
                    <a href="${getThemeUrl('engineering')}" class="nirman-theme-card ${currentHome === 'engineering' ? 'active' : ''}">
                        <div class="nirman-theme-card-header">
                            <h6 class="nirman-theme-card-title">Contemporary Engineering Theme</h6>
                            <span class="nirman-theme-card-badge ${currentHome === 'engineering' ? 'current' : 'view'}">
                                ${currentHome === 'engineering' ? 'Active' : 'Switch'}
                            </span>
                        </div>
                        <p class="nirman-theme-card-desc">Structured engineering design featuring key project metrics, NBC/IS standards & service cards.</p>
                    </a>
                </div>

                <!-- Section 2: Accent Color Palette -->
                <div class="nirman-switcher-section">
                    <div class="nirman-switcher-section-title">
                        <i class="fas fa-brush"></i> Accent Color Palette
                    </div>
                    <div class="nirman-color-grid" id="nirmanColorGrid"></div>
                </div>
            </div>

            <div class="nirman-switcher-footer">
                <button class="nirman-reset-btn" id="nirmanResetBtn">
                    <i class="fas fa-undo-alt me-1"></i> Reset to Imperial Gold
                </button>
            </div>
        </div>
        `;

        const switcherContainer = document.createElement('div');
        switcherContainer.id = 'nirman-switcher-container';
        switcherContainer.innerHTML = panelHTML;
        document.body.appendChild(switcherContainer);

        const toggleBtn = document.getElementById('nirmanSwitcherToggle');
        const panel = document.getElementById('nirmanSwitcherPanel');
        const overlay = document.getElementById('nirmanSwitcherOverlay');
        const closeBtn = document.getElementById('nirmanSwitcherClose');
        const colorGrid = document.getElementById('nirmanColorGrid');
        const resetBtn = document.getElementById('nirmanResetBtn');

        function openPanel() {
            panel.classList.add('active');
            overlay.classList.add('active');
        }

        function closePanel() {
            panel.classList.remove('active');
            overlay.classList.remove('active');
        }

        if (toggleBtn) toggleBtn.addEventListener('click', openPanel);
        if (closeBtn) closeBtn.addEventListener('click', closePanel);
        if (overlay) overlay.addEventListener('click', closePanel);

        function applyAccentColor(hexColor) {
            document.documentElement.style.setProperty('--theme', hexColor);
            document.documentElement.style.setProperty('--theme-2', hexColor);
            localStorage.setItem('nirman_accent_color', hexColor);

            const allColorBtns = document.querySelectorAll('.nirman-color-btn');
            allColorBtns.forEach(btn => {
                if (btn.getAttribute('data-color').toLowerCase() === hexColor.toLowerCase()) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        const savedColor = localStorage.getItem('nirman_accent_color') || '#dfa938';

        colorPalettes.forEach(item => {
            const btn = document.createElement('button');
            btn.className = `nirman-color-btn ${item.hex.toLowerCase() === savedColor.toLowerCase() ? 'active' : ''}`;
            btn.style.backgroundColor = item.hex;
            btn.setAttribute('data-color', item.hex);
            btn.setAttribute('title', item.name);
            btn.addEventListener('click', () => {
                applyAccentColor(item.hex);
            });
            colorGrid.appendChild(btn);
        });

        if (savedColor && savedColor !== '#dfa938') {
            applyAccentColor(savedColor);
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                applyAccentColor('#dfa938');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwitcher);
    } else {
        initSwitcher();
    }
})();

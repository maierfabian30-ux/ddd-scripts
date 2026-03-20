(function() {

  /* ════════════════════════════════
     EINSTELLUNGEN
  ════════════════════════════════ */
  var POPUP_DELAY    = 30;
  var COOLDOWN_DAYS  = 7;
  var SUBSCRIBED_KEY = 'ddd_nl_sub';
  var BREVO_URL      = 'BREVO_URL_HIER_EINTRAGEN';

  /* ════════════════════════════════
     CSS INJIZIEREN
  ════════════════════════════════ */
  var css = `
    header, .header, .site-header, .main-header,
    nav.navbar, #masthead, #header,
    [class*="go-header"], [class*="goheader"],
    [class*="header-wrap"], [id*="go-header"],
    footer, .footer, .site-footer, .main-footer,
    #footer, #colophon,
    [class*="go-footer"], [class*="gofooter"],
    [id*="go-footer"], [class*="footer-wrap"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
    }

    body { padding-top: 72px !important; }

    #ddd-nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 99999; height: 72px;
      display: flex; align-items: center; padding: 0 6%;
      background: rgba(15,35,24,0.97);
      backdrop-filter: blur(16px);
      box-shadow: 0 2px 32px rgba(0,0,0,0.25);
      border-bottom: 1px solid rgba(200,169,110,0.12);
      font-family: 'Gill Sans','Gill Sans MT','Trebuchet MS','Segoe UI',Optima,Candara,sans-serif;
    }
    #ddd-nav::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 100%; height: 2px;
      background: linear-gradient(90deg, #c8a96e, rgba(200,169,110,0.1) 60%, transparent);
    }
    #ddd-nav .nav-logo { flex-shrink: 0; margin-right: auto; display: flex; align-items: center; text-decoration: none; }
    #ddd-nav .nav-logo img { height: 40px; width: auto; filter: brightness(0) invert(1); }
    #ddd-nav .nav-links { display: flex; align-items: center; gap: 6px; list-style: none; margin: 0; padding: 0; }
    #ddd-nav .nav-links a {
      display: block; font-size: 13px; font-weight: 500; letter-spacing: 0.06em;
      color: rgba(255,255,255,0.75); text-decoration: none;
      padding: 8px 14px; border-radius: 8px;
      transition: color 0.2s, background 0.2s; white-space: nowrap;
    }
    #ddd-nav .nav-links a:hover { color: #fff; background: rgba(255,255,255,0.07); }
    #ddd-nav .nav-links a.nav-active { color: #fff; }
    #ddd-nav .nav-cta {
      display: inline-flex; align-items: center; gap: 8px;
      margin-left: 20px; padding: 10px 22px; border-radius: 100px;
      background: linear-gradient(135deg, #c8a96e 0%, #b8935a 100%);
      color: #0f2318 !important; font-size: 13px; font-weight: 700;
      letter-spacing: 0.05em; text-decoration: none !important;
      white-space: nowrap; flex-shrink: 0;
      box-shadow: 0 4px 16px rgba(200,169,110,0.3);
      transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
    }
    #ddd-nav .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,169,110,0.45); filter: brightness(1.08); }
    #ddd-nav .nav-cta svg { width: 14px; height: 14px; }
    #ddd-nav .nav-burger {
      display: none; flex-direction: column; justify-content: center;
      gap: 5px; width: 36px; height: 36px;
      background: none; border: none; cursor: pointer;
      padding: 4px; margin-left: 16px; flex-shrink: 0;
    }
    #ddd-nav .nav-burger span {
      display: block; height: 2px; border-radius: 2px;
      background: rgba(255,255,255,0.85);
      transition: transform 0.3s, opacity 0.3s;
    }
    #ddd-nav .nav-burger span:nth-child(2) { width: 70%; }
    #ddd-nav .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    #ddd-nav .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    #ddd-nav .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    #ddd-nav .nav-mobile {
      display: none; position: fixed;
      top: 72px; left: 0; right: 0;
      background: rgba(12,28,18,0.98); backdrop-filter: blur(20px);
      padding: 24px 6% 32px;
      border-bottom: 1px solid rgba(200,169,110,0.15);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 99998;
      transform: translateY(-10px); opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    #ddd-nav .nav-mobile.open { transform: translateY(0); opacity: 1; }
    #ddd-nav .nav-mobile ul { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 4px; }
    #ddd-nav .nav-mobile ul a {
      display: block; padding: 13px 16px; border-radius: 10px;
      font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.75);
      text-decoration: none; transition: background 0.2s, color 0.2s;
    }
    #ddd-nav .nav-mobile ul a:hover { background: rgba(255,255,255,0.07); color: #fff; }
    #ddd-nav .nav-mobile .nav-mobile-cta {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 16px; border-radius: 14px;
      background: linear-gradient(135deg, #c8a96e, #b8935a);
      color: #0f2318; font-size: 15px; font-weight: 700; text-decoration: none;
      box-shadow: 0 4px 20px rgba(200,169,110,0.3);
    }
    #ddd-nav .nav-mobile .nav-mobile-cta svg { width: 16px; height: 16px; }
    @media (max-width: 780px) {
      #ddd-nav .nav-links, #ddd-nav .nav-cta { display: none !important; }
      #ddd-nav .nav-burger { display: flex; }
      #ddd-nav .nav-mobile.open { display: block; }
    }

    #ddd-footer {
      position: relative; width: 100%;
      background: #1a3a2a; overflow: hidden;
      font-family: 'Gill Sans','Gill Sans MT','Trebuchet MS','Segoe UI',Optima,Candara,sans-serif;
    }
    #ddd-footer::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse 60% 80% at 100% 0%, rgba(45,90,61,0.4) 0%, transparent 55%);
    }
    #ddd-footer .f-grid-bg {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
      background-image: linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);
      background-size: 80px 80px;
    }
    #ddd-footer .f-topline {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg,#c8a96e,rgba(200,169,110,0.2) 60%,transparent);
    }
    #ddd-footer .f-main {
      padding: 72px 7% 56px; position: relative; z-index: 1;
      display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr;
      gap: 48px; max-width: 1200px; margin: 0 auto;
    }
    #ddd-footer .f-logo { height: 36px; width: auto; margin-bottom: 20px; display: block; filter: brightness(0) invert(1); }
    #ddd-footer .f-brand-text { font-size: 13px; font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.45); margin-bottom: 24px; }
    #ddd-footer .f-links { display: flex; flex-direction: column; gap: 10px; }
    #ddd-footer .f-link { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
    #ddd-footer .f-link:hover { color: #c8a96e; }
    #ddd-footer .f-link svg { width: 14px; height: 14px; color: #52a86e; flex-shrink: 0; }
    #ddd-footer .f-col-title { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #c8a96e; margin-bottom: 18px; display: block; }
    #ddd-footer .f-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
    #ddd-footer .f-col ul a { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; display: flex; align-items: center; gap: 7px; }
    #ddd-footer .f-col ul a:hover { color: rgba(255,255,255,0.9); }
    #ddd-footer .f-col ul a::before { content: ''; display: block; width: 4px; height: 4px; border-radius: 50%; background: rgba(200,169,110,0.4); flex-shrink: 0; }
    #ddd-footer .f-hours { display: flex; flex-direction: column; gap: 8px; }
    #ddd-footer .f-hour-row { display: flex; justify-content: space-between; gap: 16px; }
    #ddd-footer .f-hour-day { font-size: 12px; color: rgba(255,255,255,0.45); }
    #ddd-footer .f-hour-time { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.65); text-align: right; }
    #ddd-footer .f-divider { position: relative; z-index: 1; height: 1px; background: rgba(255,255,255,0.07); margin: 0 7%; }
    #ddd-footer .f-bottom { position: relative; z-index: 1; padding: 24px 7%; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    #ddd-footer .f-copy { font-size: 12px; color: rgba(255,255,255,0.3); }
    #ddd-footer .f-copy span { color: #c8a96e; }
    #ddd-footer .f-bottom-links { display: flex; align-items: center; gap: 24px; }
    #ddd-footer .f-bottom-links a { font-size: 12px; color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s; }
    #ddd-footer .f-bottom-links a:hover { color: rgba(255,255,255,0.7); }
    #ddd-footer .f-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.12); }
    @media (max-width: 900px) { #ddd-footer .f-main { grid-template-columns: 1fr 1fr; gap: 36px; } }
    @media (max-width: 560px) {
      #ddd-footer .f-main { grid-template-columns: 1fr; padding: 56px 6% 40px; }
      #ddd-footer .f-bottom { flex-direction: column; align-items: flex-start; padding: 20px 6%; }
    }

    #ddd-popup-overlay {
      position: fixed; inset: 0; z-index: 999999;
      background: rgba(10,20,14,0.75); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
      opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
    }
    #ddd-popup-overlay.visible { opacity: 1; pointer-events: all; }
    #ddd-popup {
      position: relative; width: 100%; max-width: 520px;
      background: #fff; border-radius: 24px; overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.35);
      transform: translateY(24px) scale(0.97);
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
      font-family: 'Gill Sans','Gill Sans MT','Trebuchet MS','Segoe UI',Optima,Candara,sans-serif;
    }
    #ddd-popup-overlay.visible #ddd-popup { transform: translateY(0) scale(1); }
    #ddd-popup .pp-header {
      background: linear-gradient(135deg, #0f2318 0%, #1a3a2a 60%, #2d5a3d 100%);
      padding: 36px 36px 28px; position: relative; overflow: hidden;
    }
    #ddd-popup .pp-header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#c8a96e,rgba(200,169,110,0.2) 60%,transparent); }
    #ddd-popup .pp-orb { position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle,rgba(82,168,110,0.15) 0%,transparent 65%); pointer-events: none; }
    #ddd-popup .pp-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    #ddd-popup .pp-edot { width: 5px; height: 5px; border-radius: 50%; background: #c8a96e; }
    #ddd-popup .pp-eline { width: 28px; height: 1px; background: #c8a96e; opacity: 0.6; }
    #ddd-popup .pp-etext { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #c8a96e; }
    #ddd-popup .pp-title { font-size: 28px; font-weight: 700; line-height: 1.15; color: #fff; font-family: 'Didot','Bodoni MT',Georgia,serif; margin-bottom: 10px; position: relative; z-index: 1; }
    #ddd-popup .pp-title em { font-style: italic; color: #e2c99a; }
    #ddd-popup .pp-sub { font-size: 14px; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,0.6); position: relative; z-index: 1; }
    #ddd-popup .pp-body { padding: 28px 36px 32px; }
    #ddd-popup .pp-perks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
    #ddd-popup .pp-perk { display: flex; align-items: center; gap: 12px; font-size: 13px; color: rgba(15,35,24,0.7); }
    #ddd-popup .pp-perk-icon { width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; background: rgba(45,90,61,0.09); border: 1px solid rgba(45,90,61,0.15); display: flex; align-items: center; justify-content: center; }
    #ddd-popup .pp-perk-icon svg { width: 14px; height: 14px; color: #2d5a3d; }
    #ddd-popup .pp-form { display: flex; flex-direction: column; gap: 12px; }
    #ddd-popup .pp-input { width: 100%; padding: 14px 18px; border: 1.5px solid rgba(15,35,24,0.12); border-radius: 12px; font-size: 14px; font-family: inherit; color: #0f2318; background: #fafaf8; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
    #ddd-popup .pp-input:focus { border-color: #2d5a3d; box-shadow: 0 0 0 3px rgba(45,90,61,0.1); }
    #ddd-popup .pp-input::placeholder { color: rgba(15,35,24,0.35); }
    #ddd-popup .pp-submit { width: 100%; padding: 15px; border: none; border-radius: 12px; cursor: pointer; background: linear-gradient(135deg,#1a3a2a,#2d5a3d); color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; box-shadow: 0 6px 20px rgba(15,35,24,0.2); transition: transform 0.25s, box-shadow 0.25s, filter 0.25s; display: flex; align-items: center; justify-content: center; gap: 10px; }
    #ddd-popup .pp-submit:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 32px rgba(15,35,24,0.3); }
    #ddd-popup .pp-submit svg { width: 16px; height: 16px; }
    #ddd-popup .pp-privacy { font-size: 11px; color: rgba(15,35,24,0.35); text-align: center; margin-top: 10px; line-height: 1.5; }
    #ddd-popup .pp-privacy a { color: rgba(15,35,24,0.5); }
    #ddd-popup .pp-success { display: none; text-align: center; padding: 20px 0 8px; }
    #ddd-popup .pp-success-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 16px; background: rgba(45,90,61,0.1); border: 2px solid rgba(45,90,61,0.25); display: flex; align-items: center; justify-content: center; }
    #ddd-popup .pp-success-icon svg { width: 26px; height: 26px; color: #2d5a3d; }
    #ddd-popup .pp-success-title { font-size: 20px; font-weight: 700; color: #0f2318; margin-bottom: 8px; font-family: 'Didot',Georgia,serif; }
    #ddd-popup .pp-success-text { font-size: 14px; color: rgba(15,35,24,0.6); line-height: 1.65; }
    #ddd-popup .pp-close { position: absolute; top: 14px; right: 14px; z-index: 10; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
    #ddd-popup .pp-close:hover { background: rgba(255,255,255,0.2); }
    #ddd-popup .pp-close svg { width: 14px; height: 14px; color: rgba(255,255,255,0.7); }
    #ddd-popup .pp-skip { display: block; text-align: center; margin-top: 14px; font-size: 12px; color: rgba(15,35,24,0.35); cursor: pointer; background: none; border: none; font-family: inherit; width: 100%; transition: color 0.2s; }
    #ddd-popup .pp-skip:hover { color: rgba(15,35,24,0.6); }
    @media (max-width: 560px) {
      #ddd-popup { border-radius: 18px; }
      #ddd-popup .pp-header { padding: 28px 24px 22px; }
      #ddd-popup .pp-body { padding: 22px 24px 26px; }
      #ddd-popup .pp-title { font-size: 22px; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ════════════════════════════════
     FONT LADEN
  ════════════════════════════════ */
  if (!document.getElementById('ddd-gfonts')) {
    var f = document.createElement('link');
    f.id = 'ddd-gfonts'; f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&display=swap';
    document.head.appendChild(f);
  }

  /* ════════════════════════════════
     HEADER HTML
  ════════════════════════════════ */
  var NAV_HTML =
    '<nav id="ddd-nav">' +
      '<a href="/" class="nav-logo">' +
        '<img src="https://9404554392.smartwebsite.strato.hosting/wp-content/uploads/go-x/u/d2918f77-e961-4008-8325-54e9a33f92f1/image-384x111.png" alt="DDD-Consulting">' +
      '</a>' +
      '<ul class="nav-links">' +
        '<li><a href="/">Startseite</a></li>' +
        '<li><a href="/dienstleistungen/">Dienstleistungen</a></li>' +
        '<li><a href="/investment-ideen/">Investment-Ideen</a></li>' +
        '<li><a href="/ueber-uns/">Über Uns</a></li>' +
        '<li><a href="/kontakt/">Kontakt</a></li>' +
      '</ul>' +
      '<a href="/kontakt/" class="nav-cta">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 6h12M7 3v3"/></svg>' +
        'Termin buchen' +
      '</a>' +
      '<button class="nav-burger" aria-label="Menü öffnen"><span></span><span></span><span></span></button>' +
      '<div class="nav-mobile">' +
        '<ul>' +
          '<li><a href="/">Startseite</a></li>' +
          '<li><a href="/dienstleistungen/">Dienstleistungen</a></li>' +
          '<li><a href="/investment-ideen/">Investment-Ideen</a></li>' +
          '<li><a href="/ueber-uns/">Über Uns</a></li>' +
          '<li><a href="/kontakt/">Kontakt</a></li>' +
          '<li><a href="/impressum/">Impressum</a></li>' +
        '</ul>' +
        '<a href="/kontakt/" class="nav-mobile-cta">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 6h12M7 3v3"/></svg>' +
          'Kostenlosen Termin buchen' +
        '</a>' +
      '</div>' +
    '</nav>';

  /* ════════════════════════════════
     FOOTER HTML
  ════════════════════════════════ */
  var FOOTER_HTML =
    '<div id="ddd-footer">' +
      '<div class="f-grid-bg"></div>' +
      '<div class="f-topline"></div>' +
      '<div class="f-main">' +
        '<div class="f-brand">' +
          '<img class="f-logo" src="https://9404554392.smartwebsite.strato.hosting/wp-content/uploads/go-x/u/d2918f77-e961-4008-8325-54e9a33f92f1/image-384x111.png" alt="DDD-Consulting"/>' +
          '<p class="f-brand-text">Unabhängige Finanzberatung – nur Ihren Zielen verpflichtet. Familienunternehmen aus Weinheim seit über 20 Jahren.</p>' +
          '<div class="f-links">' +
            '<a href="tel:062011884760" class="f-link"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 10.5v2a1.33 1.33 0 01-1.45 1.33 13.2 13.2 0 01-5.75-2.05 13 13 0 01-4-4 13.2 13.2 0 01-2.05-5.78A1.33 1.33 0 011.55 1H3.5a1.33 1.33 0 011.33 1.15c.09.7.25 1.38.49 2.03a1.33 1.33 0 01-.3 1.4L4.09 6.5a10.67 10.67 0 004 4l.92-.92a1.33 1.33 0 011.4-.3c.65.23 1.33.4 2.03.49A1.33 1.33 0 0113.5 11v-.5z"/></svg>06201 – 188476</a>' +
            '<a href="mailto:info@ddd-consulting.de" class="f-link"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.67 2.67h10.66c.74 0 1.34.6 1.34 1.33v8c0 .74-.6 1.33-1.34 1.33H2.67c-.74 0-1.34-.6-1.34-1.33V4c0-.74.6-1.33 1.34-1.33z"/><polyline points="14.67,4 8,8.67 1.33,4"/></svg>info@ddd-consulting.de</a>' +
            '<a href="https://www.google.com/maps/dir/?api=1&destination=Weimarer+Str.+16,+69469+Weinheim" target="_blank" class="f-link"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.33A4.67 4.67 0 0112.67 6c0 3.5-4.67 8.67-4.67 8.67S3.33 9.5 3.33 6A4.67 4.67 0 018 1.33z"/><circle cx="8" cy="6" r="1.67"/></svg>Weimarer Str. 16, 69469 Weinheim</a>' +
          '</div>' +
        '</div>' +
        '<div class="f-col"><span class="f-col-title">Navigation</span><ul>' +
          '<li><a href="/">Startseite</a></li>' +
          '<li><a href="/dienstleistungen/">Dienstleistungen</a></li>' +
          '<li><a href="/investment-ideen/">Investment-Ideen</a></li>' +
          '<li><a href="/ueber-uns/">Über Uns</a></li>' +
          '<li><a href="/kontakt/">Kontakt</a></li>' +
        '</ul></div>' +
        '<div class="f-col"><span class="f-col-title">Leistungen</span><ul>' +
          '<li><a href="/dienstleistungen/#kinder">Kindervorsorge</a></li>' +
          '<li><a href="/dienstleistungen/#alter">Altersvorsorge</a></li>' +
          '<li><a href="/dienstleistungen/#vermoegen">Vermögensaufbau</a></li>' +
          '<li><a href="/investment-ideen/">ELTIFs</a></li>' +
        '</ul></div>' +
        '<div class="f-col"><span class="f-col-title">Öffnungszeiten</span><div class="f-hours">' +
          '<div class="f-hour-row"><span class="f-hour-day">Mo – Do</span><span class="f-hour-time">08:30–12:30<br>15:30–18:00</span></div>' +
          '<div class="f-hour-row"><span class="f-hour-day">Freitag</span><span class="f-hour-time">08:30–12:30<br>15:30–18:00</span></div>' +
          '<div class="f-hour-row"><span class="f-hour-day">Samstag</span><span class="f-hour-time">09:00–12:30</span></div>' +
        '</div></div>' +
      '</div>' +
      '<div class="f-divider"></div>' +
      '<div class="f-bottom">' +
        '<p class="f-copy">\u00a9 ' + new Date().getFullYear() + ' <span>DDD-Consulting</span> \u00b7 Dr. Dirk Dauenheimer \u00b7 Alle Rechte vorbehalten</p>' +
        '<div class="f-bottom-links"><a href="/impressum/">Impressum</a><div class="f-sep"></div><a href="/datenschutz/">Datenschutz</a></div>' +
      '</div>' +
    '</div>';

  /* ════════════════════════════════
     POPUP HTML
  ════════════════════════════════ */
  var POPUP_HTML =
    '<div id="ddd-popup-overlay">' +
      '<div id="ddd-popup">' +
        '<button class="pp-close" aria-label="Schlie\u00dfen"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg></button>' +
        '<div class="pp-header">' +
          '<div class="pp-orb"></div>' +
          '<div class="pp-eyebrow"><span class="pp-edot"></span><span class="pp-eline"></span><span class="pp-etext">Kostenlos &amp; unverbindlich</span></div>' +
          '<h2 class="pp-title">Finanz-<em>Insights</em><br>direkt ins Postfach</h2>' +
          '<p class="pp-sub">Nischen-Investments, Markttrends &amp; Vorsorge-Tipps \u2013 exklusiv f\u00fcr unsere Leser.</p>' +
        '</div>' +
        '<div class="pp-body">' +
          '<div class="pp-perks">' +
            '<div class="pp-perk"><div class="pp-perk-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 8 9 15 4"/><rect x="1" y="4" width="14" height="10" rx="1.5"/></svg></div>Neue Nischen-Investments (wie ELTIFs) als Erste erfahren</div>' +
            '<div class="pp-perk"><div class="pp-perk-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 12 6 8 10 10 14 4"/></svg></div>Praktische Tipps zu Altersvorsorge &amp; Verm\u00f6gensaufbau</div>' +
            '<div class="pp-perk"><div class="pp-perk-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M5 8L7 10L11 6"/></svg></div>Kein Spam \u2013 max. 2\u00d7 pro Monat, jederzeit abmeldbar</div>' +
          '</div>' +
          '<form class="pp-form" id="ddd-nl-form">' +
            '<input type="email" class="pp-input" id="ddd-nl-email" placeholder="Ihre E-Mail-Adresse" required autocomplete="email"/>' +
            '<button type="submit" class="pp-submit">Jetzt kostenlos anmelden <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8H13M13 8L9 4M13 8L9 12"/></svg></button>' +
          '</form>' +
          '<p class="pp-privacy">Kein Spam. DSGVO-konform. <a href="/datenschutz/">Datenschutzerkl\u00e4rung</a></p>' +
          '<div class="pp-success" id="ddd-nl-success">' +
            '<div class="pp-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
            '<p class="pp-success-title">Willkommen an Bord! \ud83c\udf89</p>' +
            '<p class="pp-success-text">Bitte best\u00e4tigen Sie Ihre Anmeldung in der E-Mail die wir Ihnen soeben geschickt haben.</p>' +
          '</div>' +
          '<button class="pp-skip" id="ddd-nl-skip">Nein danke, kein Interesse</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ════════════════════════════════
     ALLES INITIALISIEREN
  ════════════════════════════════ */
  function init() {

    /* HEADER */
    if (!document.getElementById('ddd-nav')) {
      var nh = document.createElement('div');
      nh.innerHTML = NAV_HTML;
      document.body.insertBefore(nh.firstChild, document.body.firstChild);

      var nav = document.getElementById('ddd-nav');

      nav.querySelectorAll('.nav-links a').forEach(function(a) {
        var href = a.getAttribute('href');
        var path = window.location.pathname;
        if (href === path || (href !== '/' && path.indexOf(href) === 0)) {
          a.classList.add('nav-active');
        }
      });

      var burger = nav.querySelector('.nav-burger');
      var mobile = nav.querySelector('.nav-mobile');
      burger.addEventListener('click', function() {
        var isOpen = burger.classList.toggle('open');
        if (isOpen) {
          mobile.style.display = 'block';
          setTimeout(function() { mobile.classList.add('open'); }, 10);
        } else {
          mobile.classList.remove('open');
          setTimeout(function() { mobile.style.display = 'none'; }, 300);
        }
      });
      mobile.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
          burger.classList.remove('open');
          mobile.classList.remove('open');
          setTimeout(function() { mobile.style.display = 'none'; }, 300);
        });
      });
    }

    /* FOOTER */
    if (!document.getElementById('ddd-footer')) {
      var nf = document.createElement('div');
      nf.innerHTML = FOOTER_HTML;
      document.body.appendChild(nf.firstChild);
    }

    /* POPUP */
    var subscribed  = localStorage.getItem(SUBSCRIBED_KEY);
    var lastClosed  = localStorage.getItem('ddd_nl_closed');
    var cooldownOk  = !lastClosed || (Date.now() - parseInt(lastClosed)) / 86400000 >= COOLDOWN_DAYS;

    if (!subscribed && cooldownOk) {
      var np = document.createElement('div');
      np.innerHTML = POPUP_HTML;
      document.body.appendChild(np.firstChild);

      var overlay  = document.getElementById('ddd-popup-overlay');
      var form     = document.getElementById('ddd-nl-form');
      var success  = document.getElementById('ddd-nl-success');
      var skip     = document.getElementById('ddd-nl-skip');
      var closeBtn = document.querySelector('.pp-close');

      function closePopup() {
        overlay.classList.remove('visible');
        localStorage.setItem('ddd_nl_closed', Date.now().toString());
      }

      closeBtn.addEventListener('click', closePopup);
      skip.addEventListener('click', closePopup);
      overlay.addEventListener('click', function(e) { if (e.target === overlay) closePopup(); });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('ddd-nl-email').value;
        if (BREVO_URL && BREVO_URL !== 'BREVO_URL_HIER_EINTRAGEN') {
          var fd = new FormData();
          fd.append('EMAIL', email);
          fetch(BREVO_URL, { method: 'POST', body: fd, mode: 'no-cors' });
        }
        form.style.display = 'none';
        skip.style.display = 'none';
        success.style.display = 'block';
        localStorage.setItem(SUBSCRIBED_KEY, '1');
        setTimeout(closePopup, 3000);
      });

      setTimeout(function() { overlay.classList.add('visible'); }, POPUP_DELAY * 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

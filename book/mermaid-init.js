(() => {
    // Step 1: Transform mdbook's <pre><code class="language-mermaid"> into
    // <pre class="mermaid"> so the mermaid library recognizes and renders them.
    // mdbook renders ```mermaid fenced blocks as <pre><code class="language-mermaid">.
    document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
        const pre = code.parentElement;
        const diagram = document.createElement('pre');
        diagram.className = 'mermaid';
        diagram.textContent = code.textContent;
        pre.replaceWith(diagram);
    });

    // Step 2: Register the offline network icon pack (defined in mermaid-icons.js)
    // so that architecture-beta diagrams can use net:router, net:switch, net:pc, etc.
    if (window.__NET_ICON_PACK) {
        const pack = window.__NET_ICON_PACK;
        mermaid.registerIconPacks([{
            name: pack.prefix,
            loader: () => Promise.resolve(pack)
        }]);
    }

    // Step 3: Detect current theme and initialize mermaid with matching theme.
    const darkThemes = ['ayu', 'navy', 'coal'];
    const lightThemes = ['light', 'rust'];

    const classList = document.getElementsByTagName('html')[0].classList;

    let lastThemeWasLight = true;
    for (const cssClass of classList) {
        if (darkThemes.includes(cssClass)) {
            lastThemeWasLight = false;
            break;
        }
    }

    const theme = lastThemeWasLight ? 'default' : 'dark';
    mermaid.initialize({ startOnLoad: true, theme });

    // Step 3: Reload on theme switch so diagrams re-render with the new theme.
    for (const darkTheme of darkThemes) {
        const el = document.getElementById(darkTheme);
        if (el) el.addEventListener('click', () => {
            if (lastThemeWasLight) { window.location.reload(); }
        });
    }

    for (const lightTheme of lightThemes) {
        const el = document.getElementById(lightTheme);
        if (el) el.addEventListener('click', () => {
            if (!lastThemeWasLight) { window.location.reload(); }
        });
    }
})();

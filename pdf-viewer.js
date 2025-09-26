(function(){
  const urlParams = new URLSearchParams(location.search);
  let pdfPath = urlParams.get('src');
  if (pdfPath && !/^https?:/i.test(pdfPath)) {
    // If relative path, resolve against /posts/
    pdfPath = `./${pdfPath}`;
  }
  const title = urlParams.get('title') || 'PDF';
  const titleEl = document.getElementById('pdf-title');
  const metaEl = document.getElementById('pdf-meta');
  const viewerContainer = document.getElementById('viewerContainer');
  const viewerEl = document.getElementById('viewer');
  const outlineEl = document.getElementById('pdf-outline-inner');

  if (titleEl) titleEl.textContent = title;
  if (!pdfPath || !viewerContainer || !viewerEl) return;

  const CMAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/';
  const CMAP_PACKED = true;

  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Render with pdf.js continuous pages and page-fit

  pdfjsLib.getDocument({ url: pdfPath, cMapUrl: CMAP_URL, cMapPacked: CMAP_PACKED }).promise.then(async (pdf) => {
    if (metaEl) metaEl.textContent = `PDF • ${pdf.numPages} pages`;

    // Render outline; click to scroll to page
    // Outline panel restored
    try {
      const outline = await pdf.getOutline();
      outlineEl.innerHTML = '';
      if (outline && outline.length) {
        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';
        outline.forEach((item) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = item.title || 'Section';
          a.href = '#';
          a.style.display = 'block';
          a.style.padding = '6px 8px';
          a.style.borderRadius = '6px';
          a.style.color = '#e6e6e6';
          a.addEventListener('click', async (e) => {
            e.preventDefault();
            // Handle external URLs in outline
            if (item.url) { window.open(item.url, '_blank'); return; }
            // Resolve destination to a page index using public API
            let dest = item.dest;
            if (typeof dest === 'string') {
              try { dest = await pdf.getDestination(dest); } catch (_) { /* noop */ }
            }
            const ref = dest && dest[0];
            if (!ref) return;
            let pageIndex = 0;
            try { pageIndex = await pdf.getPageIndex(ref); } catch (_) { pageIndex = 0; }
            await ensureRendered(pageIndex + 1);
            const target = viewerEl.querySelector(`[data-page-number="${pageIndex + 1}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          li.appendChild(a);
          list.appendChild(li);
        });
        outlineEl.appendChild(list);
      } else {
        outlineEl.textContent = 'No outline.';
      }
    } catch (_) {
      outlineEl.textContent = 'Failed to load outline.';
    }

    // Render pages continuous with page-fit by height
    const pagePromises = new Map();
    const ensureRendered = async (targetPage) => {
      for (let i = 1; i <= targetPage; i++) {
        // eslint-disable-next-line no-await-in-loop
        await renderPage(i);
      }
    };

    const renderPage = (num) => {
      if (pagePromises.has(num)) return pagePromises.get(num);
      const p = (async () => {
        const page = await pdf.getPage(num);
        const baseViewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page';
        canvas.setAttribute('data-page-number', String(num));
        const ctx = canvas.getContext('2d');
        // Insert canvas in correct DOM order regardless of async completion timing
        const existingPages = viewerEl.querySelectorAll('.pdf-page');
        let inserted = false;
        for (let i = 0; i < existingPages.length; i++) {
          const sibling = existingPages[i];
          const siblingNum = Number(sibling.getAttribute('data-page-number') || '0');
          if (siblingNum > num) {
            viewerEl.insertBefore(canvas, sibling);
            inserted = true;
            break;
          }
        }
        if (!inserted) {
          viewerEl.appendChild(canvas);
        }

        const fit = () => {
          // Page width mode: scale canvas to exactly fit the container width
          const widthScale = (viewerContainer.clientWidth) / baseViewport.width;
          const viewport = page.getViewport({ scale: widthScale });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.height = `${viewport.height}px`;
          page.render({ canvasContext: ctx, viewport }).promise.then(() => {});
        };
        fit();
        window.addEventListener('resize', fit, { passive: true });
      })();
      pagePromises.set(num, p);
      return p;
    };

    // Start rendering pages in the background
    for (let i = 1; i <= pdf.numPages; i++) {
      // fire and forget
      renderPage(i);
    }
  });
})();



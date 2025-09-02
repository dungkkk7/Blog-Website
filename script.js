(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Right-edge scroll progress bar (for long pages)
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    const updateBar = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      const trackHeight = window.innerHeight - 16; // 8px padding top/bottom
      const barHeight = Math.max(24, trackHeight * ratio);
      progressBar.style.height = `${barHeight}px`;
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar, { passive: true });
    updateBar();
  }

  // Render posts list with tag filtering on homepage
  const postsContainer = document.getElementById('posts');
  if (postsContainer) {
    const searchInput = document.getElementById('post-search');
    const sortSelect = document.getElementById('post-sort');
    const tabs = document.getElementById('post-tabs');
    const pager = document.getElementById('pager');
    const btnPrev = document.getElementById('prev-page');
    const btnNext = document.getElementById('next-page');

    let state = { allPosts: [], view: [], page: 1, pageSize: 10, filterFormat: 'all', term: '', sort: 'newest' };

    const applyFilters = () => {
      const url = new URL(location.href);
      const activeTag = (url.searchParams.get('tag') || '').trim();
      let arr = [...state.allPosts];
      if (state.filterFormat !== 'all') arr = arr.filter(p => (p.format || '').toLowerCase() === state.filterFormat);
      if (activeTag) arr = arr.filter(p => (p.tags||[]).map(x=>String(x).toLowerCase()).includes(activeTag.toLowerCase()));
      if (state.term) {
        const q = state.term.toLowerCase();
        arr = arr.filter(p => (p.title + ' ' + (p.excerpt||'') + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(q));
      }
      // sort
      if (state.sort === 'newest') arr.sort((a,b) => new Date(b.date) - new Date(a.date));
      else if (state.sort === 'oldest') arr.sort((a,b) => new Date(a.date) - new Date(b.date));
      else if (state.sort === 'views') arr.sort((a,b) => (b.views||0) - (a.views||0));

      // pinned first
      arr.sort((a,b) => (b.pinned?1:0) - (a.pinned?1:0));

      state.view = arr;
      state.page = 1;
      renderPage();
    };

    const renderCard = (p) => {
      const a = document.createElement('a');
      a.className = 'post-card';
      a.href = p.url;
      const badge = `<span class="badge">${(p.format||'').toUpperCase()||'POST'}</span>`;
      const chips = (p.tags||[]).slice(0,4).map(t=>`<button class=\"post-chip\" data-tag=\"${t}\" type=\"button\">${t}</button>`).join('');
      const mins = p.mins ? ` • ~${p.mins} min` : '';
      a.innerHTML = `
        <h3 class="post-title">${p.title}</h3>
        <p class="post-excerpt">${p.excerpt||''}</p>
        <div class="post-meta">${p.date}${mins} • <span class="chips inline">${chips}</span> ${badge}</div>
      `;
      a.setAttribute('aria-label', `${p.title} - ${p.excerpt||''}`);
      return a;
    };

    const renderEmpty = () => {
      postsContainer.innerHTML = '<div style="color:#b8b8b8">No posts match the filter.</div>';
    };

    const renderPage = () => {
      const start = (state.page-1)*state.pageSize;
      const slice = state.view.slice(start, start+state.pageSize);
      postsContainer.innerHTML = '';
      if (slice.length === 0) { renderEmpty(); }
      else {
        slice.forEach(p => postsContainer.appendChild(renderCard(p)));
        // bind tag chips inside cards for filtering
        postsContainer.querySelectorAll('button.post-chip').forEach(btn => {
          btn.addEventListener('click', (e)=>{
            e.preventDefault();
            const t = btn.dataset.tag;
            const u = new URL(location.href);
            u.searchParams.set('tag', t);
            history.replaceState({}, '', u.toString());
            state.term = '';
            if (searchInput) searchInput.value='';
            applyFilters();
          });
        });
      }
      // pager buttons
      btnPrev.disabled = state.page === 1;
      btnNext.disabled = start + state.pageSize >= state.view.length;
    };

    const debounce = (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), ms); }; };

    const load = async () => {
      try {
        const res = await fetch('data/posts.json', { cache: 'no-store' });
        state.allPosts = await res.json();
        applyFilters();

        // make sidebar tag chips clickable to filter
        document.querySelectorAll('.chip').forEach(chip => {
          chip.style.cursor = 'pointer';
          chip.addEventListener('click', () => {
            const t = chip.textContent.trim();
            const u = new URL(location.href);
            u.searchParams.set('tag', t);
            history.replaceState({}, '', u.toString());
            state.term = '';
            if (searchInput) searchInput.value='';
            applyFilters();
          });
        });
        // UI events
        if (searchInput) searchInput.addEventListener('input', debounce((e)=>{ state.term = e.target.value.trim(); applyFilters(); }, 250));
        if (sortSelect) sortSelect.addEventListener('change', (e)=>{ state.sort = e.target.value; applyFilters(); });
        if (tabs) tabs.addEventListener('click', (e)=>{ const b = e.target.closest('.post-tab'); if (!b) return; tabs.querySelectorAll('.post-tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); state.filterFormat = b.dataset.filter; applyFilters(); });
        if (pager) {
          btnPrev.addEventListener('click', ()=>{ if (state.page>1){ state.page--; renderPage(); } });
          btnNext.addEventListener('click', ()=>{ const max = Math.ceil(state.view.length/state.pageSize); if (state.page<max){ state.page++; renderPage(); } });
        }
      } catch {}
    };
    load();
  }
  // Determine if this is a post page (not listing/home/about)
  const article = document.querySelector('article.page');
  const isListingPage = !!document.querySelector('.posts');

  // Minimap (scaled preview of the article)
  if (article && !isListingPage && !document.querySelector('.page.is-pdf')) {
    const minimap = document.createElement('aside');
    minimap.className = 'minimap';
    const content = document.createElement('div');
    content.className = 'minimap-content';
    const clone = article.cloneNode(true);
    // Remove links' interactivity inside minimap
    clone.querySelectorAll('a').forEach(a => { a.removeAttribute('href'); });
    content.appendChild(clone);
    minimap.appendChild(content);
    const viewport = document.createElement('div');
    viewport.className = 'minimap-viewport';
    minimap.appendChild(viewport);
    document.body.appendChild(minimap);
    document.body.classList.add('has-minimap');

    const updateScaleAndViewport = () => {
      // Only show minimap if article is longer than the viewport
      const scrollable = article.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        minimap.style.display = 'none';
        document.body.classList.remove('has-minimap');
        return;
      }

      minimap.style.display = '';
      document.body.classList.add('has-minimap');

      // Scale content to fit minimap width
      const pageWidth = article.clientWidth;
      const mapInnerWidth = minimap.clientWidth - 16; // .minimap-content inset
      const scale = Math.min(mapInnerWidth / pageWidth, 0.2);
      content.style.transform = `scale(${scale})`;

      // Viewport rectangle height relative to visible area
      const visibleRatio = Math.max(0.05, Math.min(1, window.innerHeight / article.scrollHeight));
      const viewportHeight = (minimap.clientHeight - 16) * visibleRatio;
      viewport.style.height = `${viewportHeight}px`;

      // Map current scroll position within the article
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const relativeScroll = Math.min(Math.max(window.scrollY - articleTop, 0), scrollable);
      const progress = relativeScroll / scrollable;
      const trackHeight = minimap.clientHeight - 16 - viewportHeight;
      viewport.style.top = `${8 + trackHeight * progress}px`;
    };

    updateScaleAndViewport();
    window.addEventListener('resize', updateScaleAndViewport, { passive: true });
    window.addEventListener('scroll', updateScaleAndViewport, { passive: true });
  }
})();



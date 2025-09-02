Simple Dark Blog
=================

Static dark-themed blog with a left sidebar (profile) and a reading area in the center. Supports PDF reading (pdf.js), outline for PDFs, a progress bar, tag chips, and filtering posts by tag.

Structure
- index.html – Trang chủ (render danh sách bài từ JSON)
- posts/pdf-viewer.html – Trang đọc PDF (page-width, outline panel)
- data/posts.json – Nguồn dữ liệu các bài viết (title, url, tags...)
- styles.css – Toàn bộ style (dark theme, layout 2 cột)
- script.js – Logic load posts, lọc theo tag, progress bar, minimap

Run locally
Open `index.html` directly or run a static server:

```bash
python -m http.server 8000
# or
npx serve . --listen 8000 --single
```
Then visit: `http://localhost:8000`

Add a new post (PDF)
1) Place the PDF file in the `posts/` directory (e.g., `My_Paper.pdf`).
2) Add an object to `data/posts.json`:
```json
{
  "id": "my-paper",
  "title": "My Paper",
  "excerpt": "A short 1–2 sentence description.",
  "url": "posts/pdf-viewer.html?src=My_Paper.pdf&title=My%20Paper",
  "date": "2025-09-02",
  "tags": ["pdf", "malware"]
}
```
3) Reload the homepage to see the new post. Click a tag or use the query `/?tag=malware` to filter.

Add/Edit profile info in the sidebar
- Edit the HTML in `index.html` (the `.brand`, `.bio`, `.bio-list`, `.social`, and `chips` blocks).
- Avatar: replace `assets/avata.png` with your image (~256x256).

Customize
- Sidebar width: edit `.layout { grid-template-columns: 360px 1fr; }` in `styles.css`.
- Accent color: search for `#f3d37a` in `styles.css` and change it.
- Show/hide minimap/scroll-progress: adjust the `.minimap` and `.scroll-progress` classes in CSS/JS.

Deploy
- Because it's a static site, you can use GitHub Pages, Vercel, or Netlify.
- Just publish the entire folder and keep the relative paths intact.

Notes
- The PDF viewer uses pdf.js in page-width mode; the outline panel uses the `getOutline()` API from pdf.js.
- Tag filtering works on the client: data is loaded from `data/posts.json` and filtered via `?tag=`.

License
MIT


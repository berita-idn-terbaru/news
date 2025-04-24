// tools/generate-sitemap.js
const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");

const baseUrl = "https://berita-idn-terbaru.github.io/news"; // GANTI sesuai URL GitHub Pages kamu

(async () => {
  const htmlFiles = await glob(["**/*.html", "!node_modules/**", "!tools/**", "!dist/**", "!public/**"]);

  const urls = htmlFiles.map(file => {
    const cleanPath = file.replace(/\\/g, "/");
    const fullUrl = cleanPath === "index.html" ? `${baseUrl}/` : `${baseUrl}/${cleanPath}`;
    return `  <url>\n    <loc>${fullUrl}</loc>\n  </url>`;
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>`;

  fs.writeFileSync("sitemap.xml", sitemapContent);
})();

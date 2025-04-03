const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const postsDir = path.join(__dirname, "../posts");
const outputFile = path.join(postsDir, "index.json");

const files = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".html") && f !== "index.html");

const index = files.map((filename) => {
  const fullPath = path.join(postsDir, filename);
  const html = fs.readFileSync(fullPath, "utf-8");
  const $ = cheerio.load(html);

  const title = $('meta[name="title"]').attr("content") || filename;
  const date = $('meta[name="date"]').attr("content") || "1970-01-01";

  return {
    title,
    date,
    filename,
  };
});

// 날짜 최신순 정렬
index.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
console.log(`✅ ${index.length}개의 포스트를 index.json에 기록했습니다.`);

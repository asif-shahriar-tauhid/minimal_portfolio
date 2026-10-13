import fs from "fs";

for (const name of ["chunk1.js", "chunk2.js"]) {
  if (!fs.existsSync(name)) continue;
  const content = fs.readFileSync(name, "utf8");
  console.log(`=== ${name} ===`);
  const urls = content.match(/https?:\/\/[^\s"'`<>]+/g) || [];
  console.log("URLs:", [...new Set(urls)]);
  const fetches = content.match(/fetch\([^)]+\)/g) || [];
  console.log("Fetches:", fetches.slice(0, 10));
}

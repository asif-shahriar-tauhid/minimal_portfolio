import fs from "fs";

const BASE = "https://new-portfolio-oqtj.onrender.com/api";
const endpoints = [
  "portfolio-data",
  "profile",
  "projects",
  "skills",
  "experience",
  "education",
  "blogs",
];

async function main() {
  const allData = {};
  for (const ep of endpoints) {
    try {
      console.log(`Fetching ${BASE}/${ep}...`);
      const res = await fetch(`${BASE}/${ep}`);
      if (res.ok) {
        const json = await res.json();
        allData[ep] = json;
        console.log(`✓ ${ep} fetched successfully:`, Array.isArray(json) ? `${json.length} items` : Object.keys(json));
      } else {
        console.log(`✗ ${ep} failed with status:`, res.status);
      }
    } catch (err) {
      console.log(`✗ ${ep} error:`, err.message);
    }
  }

  fs.writeFileSync("scraped_render_data.json", JSON.stringify(allData, null, 2));
  console.log("Saved to scraped_render_data.json");
}

main();

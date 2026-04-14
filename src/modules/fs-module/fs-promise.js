import fs from "node:fs/promises";
const data = await fs.readFile("copiedText.txt", "utf-8");
console.log(data);

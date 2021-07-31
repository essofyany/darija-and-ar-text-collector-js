import fs from "fs";
import path from "path";

export function writedata(filePath, data) {
  const documentsDataPath = path.join(process.cwd(), ...filePath);
  const results = data.map((item) => item.trim()).join(" ");
  fs.writeFileSync(documentsDataPath, results);
}

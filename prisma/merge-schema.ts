import fs from "fs";
import path from "path";

const prismaDir = path.join(__dirname);

const explicitFirst = ["base.prisma", "enums.prisma"];
let files = fs
  .readdirSync(prismaDir)
  .filter(
    (f) => f.endsWith(".prisma") && !["schema.prisma", "merge-schema.ts", "seed.ts"].includes(f)
  )
  .sort();
files = [
  ...explicitFirst.filter((f) => files.includes(f)),
  ...files.filter((f) => !explicitFirst.includes(f)),
];

let schema = "";

for (const file of files) {
  schema += fs.readFileSync(path.join(prismaDir, file), "utf8") + "\n";
}

fs.writeFileSync(path.join(prismaDir, "schema.prisma"), schema);
console.log("✅ Prisma schema merged successfully");

import fs from "node:fs";
import path from "node:path";

// Auto-barrel generator for @karthi workspace (under src/elements/)
const rootDir = process.cwd();
const elementsDir = path.join(rootDir, "src", "elements");

function ensureDirExists(target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
}

function getTsExportFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) && !e.name.startsWith("index."))
    .map((e) => e.name.replace(/\.(ts|tsx)$/, ""));
}

function generateBarrelForFolder(dirPath: string, subdirs: string[] = []): void {
  ensureDirExists(dirPath);
  const files = getTsExportFiles(dirPath);
  const lines: string[] = [
    `// Auto-generated barrel file`,
    `// import {} from "@karthi" // @karthi will be the workspace name.`,
    ``,
  ];

  files.sort().forEach((file) => {
    lines.push(`export * from "./${file}";`);
  });

  subdirs.sort().forEach((subdir) => {
    lines.push(`export * from "./${subdir}";`);
  });

  const content = lines.join("\n") + "\n";
  fs.writeFileSync(path.join(dirPath, "index.ts"), content, "utf-8");
  console.log(`Generated barrel: ${path.relative(rootDir, path.join(dirPath, "index.ts"))}`);
}

function main() {
  console.log("Generating @karthi workspace barrel files under src/elements/...");

  // 1. Data modules
  generateBarrelForFolder(path.join(elementsDir, "data"));

  // 2. Types modules
  generateBarrelForFolder(path.join(elementsDir, "types"));

  // 3. Hooks modules
  generateBarrelForFolder(path.join(elementsDir, "hooks"));

  // 4. Providers modules
  generateBarrelForFolder(path.join(elementsDir, "providers"));

  // 5. UI sub-barrels
  generateBarrelForFolder(path.join(elementsDir, "ui", "layouts"));
  generateBarrelForFolder(path.join(elementsDir, "ui", "components"));
  generateBarrelForFolder(path.join(elementsDir, "ui", "animations"));
  generateBarrelForFolder(path.join(elementsDir, "ui", "pages", "home", "sections"));

  // 6. UI Master Barrel
  const uiSubdirs = ["layouts", "components", "animations", "pages/home/sections"];
  generateBarrelForFolder(path.join(elementsDir, "ui"), uiSubdirs);

  // 7. Elements Master Barrel (src/elements/index.ts)
  const masterContent = [
    `// Auto-generated master workspace barrel`,
    `// import {} from "@karthi" // @karthi will be the workspace name.`,
    ``,
    `export * from "./ui";`,
    `export * from "./data";`,
    `export * from "./hooks";`,
    `export * from "./providers";`,
    `export * from "./types";`,
    ``,
  ].join("\n");

  fs.writeFileSync(path.join(elementsDir, "index.ts"), masterContent, "utf-8");
  console.log(`Generated master barrel: src/elements/index.ts`);

  // 7. Root src/index.ts proxying to elements
  const rootIndexContent = [
    `// Auto-generated root proxy barrel`,
    `// import {} from "@karthi" // @karthi will be the workspace name.`,
    ``,
    `export * from "./elements";`,
    ``,
  ].join("\n");
  fs.writeFileSync(path.join(rootDir, "src", "index.ts"), rootIndexContent, "utf-8");
  console.log(`Generated root proxy: src/index.ts`);
}

main();

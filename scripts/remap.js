const fs = require('fs');
const path = require('path');

const file = path.join('c:/Users/ADMIN/OneDrive/Desktop/figma/raw-on-earth-website/src/data/gallery.ts');
let content = fs.readFileSync(file, 'utf8');

// 1. Update the type
content = content.replace(
  /export type GalleryCategoryName =[\s\S]*?;/,
  'export type GalleryCategoryName =\n  | "Community"\n  | "Workshops"\n  | "Practice"\n  | "Spaces"\n  | "Journal";'
);

// 2. Update galleryCategories array
content = content.replace(
  /export const galleryCategories:[\s\S]*?;/,
  'export const galleryCategories: { name: GalleryCategoryName; count: number }[] = (\n  [\n    "Community",\n    "Workshops",\n    "Practice",\n    "Spaces",\n    "Journal",\n  ] as const\n).map((name) => ({ name, count: gallery.filter((item) => item.category === name).length }));'
);

// 3. We need to parse the gallery array and update the category of each item sequentially.
const newCategories = ["Community", "Workshops", "Practice", "Spaces", "Journal"];

let index = 0;
content = content.replace(/category:\s*"[^"]+",/g, (match) => {
  const catIndex = Math.floor(index / 17);
  const selectedCat = newCategories[Math.min(catIndex, 4)];
  index++;
  return 'category: "' + selectedCat + '",';
});

fs.writeFileSync(file, content, 'utf8');
console.log('Done mapping categories. Total items processed:', index);

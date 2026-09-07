const fs = require('fs');

// 1. Update types.ts
let typesCode = fs.readFileSync('src/types.ts', 'utf8');
typesCode = typesCode.replace(
  "tarikhAkhirTerimaTawaran?: string;", 
  "tarikhAkhirTerimaTawaran?: string;\n  borangPendaftaranUrl?: string;"
);
fs.writeFileSync('src/types.ts', typesCode);

// 2. Update store.tsx
let storeCode = fs.readFileSync('src/store.tsx', 'utf8');
storeCode = storeCode.replace(
  "tarikhAkhirTerimaTawaran: '14 Februari 2027'", 
  "tarikhAkhirTerimaTawaran: '14 Februari 2027',\n    borangPendaftaranUrl: ''"
);
fs.writeFileSync('src/store.tsx', storeCode);

const fs = require('fs');
let code = fs.readFileSync('src/store.tsx', 'utf8');

const oldSync = `sheetData.append('Jumlah_Markah_Tahfiz', c.markahTahfiz?.jumlah?.toString() || '');
            sheetData.append('Status_Layak_Temuduga', c.statusTemuduga || '');
            sheetData.append('Status_Akhir_Tawaran', c.statusTawaran || '');
            sheetData.append('Maklum_Balas_Terima', c.maklumBalasTawaran || '');`;

const newSync = `sheetData.append('Jumlah_Markah_Tahfiz', c.markahTahfiz?.jumlah?.toString() || '');
            sheetData.append('Markah_BM', c.markahAkademik?.bm?.toString() || '');
            sheetData.append('Markah_BI', c.markahAkademik?.bi?.toString() || '');
            sheetData.append('Markah_Sains', c.markahAkademik?.sains?.toString() || '');
            sheetData.append('Markah_Math', c.markahAkademik?.matematik?.toString() || '');
            sheetData.append('Jumlah_Markah_Akademik', c.markahAkademik?.jumlah?.toString() || '');
            sheetData.append('Status_Layak_Temuduga', c.statusTemuduga || '');
            sheetData.append('Status_Akhir_Tawaran', c.statusTawaran || '');
            sheetData.append('Maklum_Balas_Terima', c.maklumBalasTawaran || '');`;

code = code.replace(oldSync, newSync);
fs.writeFileSync('src/store.tsx', code);

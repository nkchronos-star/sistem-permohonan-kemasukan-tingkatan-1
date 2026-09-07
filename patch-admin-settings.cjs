const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdminPanel.tsx', 'utf8');

// Insert new inputs into Kawalan Sistem
const targetBorang = `               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Paparan Dibuka</label>
                  <input type="text" name="tarikhBukaBorang" value={settings.tarikhBukaBorang} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" />
               </div>`;

const targetTemuduga = `               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Paparan Dibuka</label>
                  <input type="text" name="tarikhBukaTemuduga" value={settings.tarikhBukaTemuduga} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" />
               </div>`;

const replaceTemuduga = targetTemuduga + `
               <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Temuduga</label>
                  <input type="text" name="tarikhTemuduga" value={settings.tarikhTemuduga || ''} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" placeholder="cth: 8 November 2025" />
               </div>`;

const targetTawaran = `               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Paparan Dibuka</label>
                  <input type="text" name="tarikhBukaTawaran" value={settings.tarikhBukaTawaran} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" />
               </div>`;

const replaceTawaran = targetTawaran + `
               <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Lapor Diri</label>
                  <input type="text" name="tarikhLaporDiri" value={settings.tarikhLaporDiri || ''} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" placeholder="cth: 3 Januari 2027" />
               </div>
               <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tarikh Akhir Maklum Balas</label>
                  <input type="text" name="tarikhAkhirTerimaTawaran" value={settings.tarikhAkhirTerimaTawaran || ''} onChange={handleSettingsChange} className="w-full text-sm border-2 border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none" placeholder="cth: 28 November 2026" />
               </div>`;

code = code.replace(targetTemuduga, replaceTemuduga);
code = code.replace(targetTawaran, replaceTawaran);

fs.writeFileSync('src/components/dashboard/AdminPanel.tsx', code);

const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdminPanel.tsx', 'utf8');

const targetStart = code.indexOf('// ================= PENTADBIR VIEW =================');
const targetEnd = code.indexOf('// ================= SUPER ADMIN VIEW =================');

if (targetStart !== -1 && targetEnd !== -1) {
  const newPentadbir = `// ================= PENTADBIR VIEW =================
function PentadbirView() {
  const { candidates } = useAppContext();
  const [filter, setFilter] = useState('ALL');
  
  // Analisis demographics
  const allLayak = candidates.filter(c => c.statusTemuduga === 'LAYAK');
  
  const jantinaL = allLayak.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const jantinaP = allLayak.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  const negeriCounts = allLayak.reduce((acc, c) => {
     if(c.negeri) { acc[c.negeri] = (acc[c.negeri] || 0) + 1; }
     return acc;
  }, {} as Record<string, number>);

  const daerahCounts = allLayak.reduce((acc, c) => {
     if(c.daerah) { acc[c.daerah] = (acc[c.daerah] || 0) + 1; }
     return acc;
  }, {} as Record<string, number>);

  // Markah Table Data
  let filtered = allLayak.filter(c => c.markahTahfiz && c.markahAkademik).map(c => ({
     ...c,
     totalScore: (c.markahTahfiz?.jumlah || 0) + (c.markahAkademik?.jumlah || 0)
  })).sort((a, b) => b.totalScore - a.totalScore); // Sort by highest score by default

  if (filter === 'LAYAK_TAWARAN') filtered = filtered.filter(c => c.statusTawaran === 'BERJAYA');
  if (filter === 'TIDAK_LAYAK') filtered = filtered.filter(c => c.statusTawaran === 'GAGAL');

  return (
    <div className="space-y-12">
       
       <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
         <div className="p-3 bg-blue-100 rounded-xl">
           <BarChart2 className="w-7 h-7 text-blue-700" />
         </div>
         <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard Pentadbir</h3>
       </div>

       {/* Analisa Demografi */}
       <div>
          <h4 className="font-bold text-lg text-slate-800 mb-4">Analisis Demografi Calon Temuduga (Layak)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="text-slate-500 font-bold mb-4 uppercase tracking-wide text-xs">Jantina</div>
                <div className="flex justify-between items-center mb-2">
                   <span className="font-medium text-slate-700">Lelaki</span>
                   <span className="font-bold text-blue-600">{jantinaL}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="font-medium text-slate-700">Perempuan</span>
                   <span className="font-bold text-pink-600">{jantinaP}</span>
                </div>
             </div>
             
             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden">
                <div className="text-slate-500 font-bold mb-4 uppercase tracking-wide text-xs">Negeri Tertinggi</div>
                {Object.entries(negeriCounts).sort((a,b)=>b[1]-a[1]).slice(0, 3).map(([negeri, count]) => (
                   <div key={negeri} className="flex justify-between items-center mb-2 last:mb-0">
                      <span className="font-medium text-slate-700 truncate mr-2">{negeri}</span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{count}</span>
                   </div>
                ))}
                {Object.keys(negeriCounts).length === 0 && <p className="text-sm text-slate-400">Tiada data</p>}
             </div>

             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden">
                <div className="text-slate-500 font-bold mb-4 uppercase tracking-wide text-xs">Daerah Tertinggi</div>
                {Object.entries(daerahCounts).sort((a,b)=>b[1]-a[1]).slice(0, 3).map(([daerah, count]) => (
                   <div key={daerah} className="flex justify-between items-center mb-2 last:mb-0">
                      <span className="font-medium text-slate-700 truncate mr-2">{daerah}</span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{count}</span>
                   </div>
                ))}
                {Object.keys(daerahCounts).length === 0 && <p className="text-sm text-slate-400">Tiada data</p>}
             </div>
          </div>
       </div>

       {/* Senarai Keseluruhan Markah */}
       <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
             <div>
                <h4 className="font-bold text-lg text-slate-800">Senarai Markah Keseluruhan Calon</h4>
                <p className="text-sm text-slate-500">Kiraan Tahfiz (100) + Akademik (100) = Total 200. Disusun mengikut markah tertinggi.</p>
             </div>
             <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none bg-white min-w-[200px]"
             >
                <option value="ALL">Semua Calon Dinilai</option>
                <option value="LAYAK_TAWARAN">Layak Tawaran (Berjaya)</option>
                <option value="TIDAK_LAYAK">Tidak Layak (Gagal)</option>
             </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                   <thead className="bg-slate-100/50">
                      <tr>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Ked.</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Nama Calon & Maklumat</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Tahfiz (100)</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Akademik (100)</th>
                         <th className="px-4 py-4 text-xs font-bold text-blue-700 uppercase tracking-widest border-b border-slate-200 bg-blue-50/50 text-center">Jumlah (200)</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Status Tawaran</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filtered.length === 0 ? (
                         <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">Tiada rekod markah dijumpai berdasarkan tapisan semasa.</td></tr>
                      ) : (
                         filtered.map((c, idx) => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition border-b border-slate-100">
                               <td className="px-4 py-4 text-center">
                                  <span className={\`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm \${idx < 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}\`}>
                                     {idx + 1}
                                  </span>
                               </td>
                               <td className="px-4 py-4">
                                  <div className="font-bold text-slate-800">{c.name}</div>
                                  <div className="text-xs text-slate-500 mt-1">{c.ic} | {c.jantina} | {c.daerah}, {c.negeri}</div>
                               </td>
                               <td className="px-4 py-4">
                                  <div className="text-center font-bold text-lg text-slate-800">{c.markahTahfiz?.jumlah}</div>
                                  <div className="text-[10px] text-center text-slate-400 mt-1 uppercase tracking-wider">Penilai: {c.markahTahfiz?.dinilaiOleh || '-'}</div>
                               </td>
                               <td className="px-4 py-4">
                                  <div className="text-center font-bold text-lg text-slate-800">{c.markahAkademik?.jumlah}</div>
                                  <div className="text-[10px] text-center text-slate-400 mt-1 uppercase tracking-wider">Penilai: {c.markahAkademik?.dinilaiOleh || '-'}</div>
                               </td>
                               <td className="px-4 py-4 text-center font-extrabold text-xl text-blue-700 bg-blue-50/30">
                                  {c.totalScore}
                               </td>
                               <td className="px-4 py-4">
                                  {c.statusTawaran === 'BERJAYA' ? (
                                     <span className="inline-flex bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">LAYAK TAWARAN</span>
                                  ) : c.statusTawaran === 'GAGAL' ? (
                                     <span className="inline-flex bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">TIDAK LAYAK</span>
                                  ) : (
                                     <span className="inline-flex bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">DALAM PERTIMBANGAN</span>
                                  )}
                               </td>
                            </tr>
                         ))
                      )}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
}
`;

  code = code.substring(0, targetStart) + newPentadbir + "\n" + code.substring(targetEnd);
  fs.writeFileSync('src/components/dashboard/AdminPanel.tsx', code);
  console.log("Patched PentadbirView");
} else {
  console.log("Failed to find PentadbirView bounds");
}

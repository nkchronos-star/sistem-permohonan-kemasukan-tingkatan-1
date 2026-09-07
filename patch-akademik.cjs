const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdminPanel.tsx', 'utf8');

const targetStart = code.indexOf('function AkademikView() {');
const targetEnd = code.indexOf('// ================= PENTADBIR VIEW =================');

if (targetStart !== -1 && targetEnd !== -1) {
  const newAkademik = `function AkademikView() {
  const { candidates, updateCandidate, currentUser } = useAppContext();
  
  // Show candidates who have finished Tahfiz interview (have markahTahfiz) and are LAYAK
  const eligibleCandidates = candidates.filter(c => c.statusTemuduga === 'LAYAK' && c.markahTahfiz);
  
  // Bulk state
  const [bulkMarks, setBulkMarks] = useState<Record<string, any>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
     const draft = localStorage.getItem('akademik_draft');
     if (draft) {
        try { setBulkMarks(JSON.parse(draft)); } catch(e){}
     } else {
        // Initialize from candidates if they already have marks
        const initial: Record<string, any> = {};
        eligibleCandidates.forEach(c => {
           if (c.markahAkademik) {
              initial[c.ic] = {
                 bm: c.markahAkademik.bm || 0,
                 bi: c.markahAkademik.bi || 0,
                 sains: c.markahAkademik.sains || 0,
                 matematik: c.markahAkademik.matematik || 0
              };
           }
        });
        setBulkMarks(initial);
     }
  }, [candidates]);

  const handleChange = (ic: string, subject: string, value: string) => {
     const val = Number(value);
     setBulkMarks(prev => {
        const next = {
           ...prev,
           [ic]: {
              ...(prev[ic] || {bm:0, bi:0, sains:0, matematik:0}),
              [subject]: val
           }
        };
        localStorage.setItem('akademik_draft', JSON.stringify(next));
        setIsSaved(false);
        return next;
     });
  };

  const handleBulkSubmit = () => {
     const today = new Date().toISOString().split('T')[0];
     
     Object.keys(bulkMarks).forEach(ic => {
        const marks = bulkMarks[ic];
        const jumlah = Number(marks.bm) + Number(marks.bi) + Number(marks.sains) + Number(marks.matematik);
        updateCandidate(ic, {
           markahAkademik: {
              ...marks,
              jumlah,
              dinilaiOleh: currentUser?.name,
              tarikhDinilai: today
           }
        });
     });
     
     localStorage.removeItem('akademik_draft');
     setIsSaved(true);
     alert('Semua markah berjaya disimpan secara pukal!');
  };

  return (
    <div>
       <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
         <div className="p-3 bg-emerald-100 rounded-xl">
           <CheckSquare className="w-7 h-7 text-emerald-700" />
         </div>
         <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Penilaian Ujian Akademik</h3>
            <p className="text-slate-500 font-medium">Secara Pukal (Calon yang telah selesai ujian Tahfiz)</p>
         </div>
         <span className="ml-auto font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">{new Date().toLocaleDateString('ms-MY')}</span>
       </div>

       <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden mb-6">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-max">
                <thead className="bg-slate-100/50">
                   <tr>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Nama Calon & IC</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">BM (25)</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">BI (25)</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Sains (25)</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Math (25)</th>
                      <th className="px-4 py-4 text-xs font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 bg-emerald-50/50 text-center">Jumlah</th>
                   </tr>
                </thead>
                <tbody>
                   {eligibleCandidates.length === 0 ? (
                      <tr>
                         <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium bg-slate-50/30">
                            Tiada calon yang telah selesai temuduga Tahfiz buat masa ini.<br/>
                            <span className="text-sm mt-2 inline-block">Sistem hanya memaparkan calon yang LAYAK dan telah mendapat markah Tahfiz.</span>
                         </td>
                      </tr>
                   ) : (
                      eligibleCandidates.map(c => {
                         const marks = bulkMarks[c.ic] || {bm:0, bi:0, sains:0, matematik:0};
                         const total = Number(marks.bm) + Number(marks.bi) + Number(marks.sains) + Number(marks.matematik);
                         
                         return (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                               <td className="px-4 py-4">
                                  <div className="font-bold text-slate-800">{c.name}</div>
                                  <div className="text-xs text-slate-500 mt-1">{c.ic}</div>
                               </td>
                               <td className="px-2 py-4">
                                  <input type="number" min="0" max="25" value={marks.bm || ''} onChange={(e) => handleChange(c.ic, 'bm', e.target.value)} className="w-16 mx-auto block text-center border-2 border-slate-200 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-bold text-slate-800" />
                               </td>
                               <td className="px-2 py-4">
                                  <input type="number" min="0" max="25" value={marks.bi || ''} onChange={(e) => handleChange(c.ic, 'bi', e.target.value)} className="w-16 mx-auto block text-center border-2 border-slate-200 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-bold text-slate-800" />
                               </td>
                               <td className="px-2 py-4">
                                  <input type="number" min="0" max="25" value={marks.sains || ''} onChange={(e) => handleChange(c.ic, 'sains', e.target.value)} className="w-16 mx-auto block text-center border-2 border-slate-200 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-bold text-slate-800" />
                               </td>
                               <td className="px-2 py-4">
                                  <input type="number" min="0" max="25" value={marks.matematik || ''} onChange={(e) => handleChange(c.ic, 'matematik', e.target.value)} className="w-16 mx-auto block text-center border-2 border-slate-200 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-bold text-slate-800" />
                               </td>
                               <td className="px-4 py-4 text-center">
                                  <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-extrabold text-sm">{total}</div>
                               </td>
                            </tr>
                         )
                      })
                   )}
                </tbody>
             </table>
          </div>
       </div>

       {eligibleCandidates.length > 0 && (
          <div className="flex justify-end items-center gap-4">
             {isSaved && <span className="text-emerald-600 font-bold animate-in fade-in">Markah tersimpan!</span>}
             <button onClick={handleBulkSubmit} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all active:scale-95 text-lg">
                Simpan Keseluruhan Markah Pukal
             </button>
          </div>
       )}
    </div>
  );
}

// Ensure the old AkademikRow is removed if no longer used.
`;

  code = code.substring(0, targetStart) + newAkademik + "\n" + code.substring(targetEnd);
  
  // Also optionally strip AkademikRow component since it's obsolete.
  // Not strictly necessary as it's dead code, but cleaner.
  
  fs.writeFileSync('src/components/dashboard/AdminPanel.tsx', code);
  console.log("Patched AkademikView");
} else {
  console.log("Failed to find AkademikView bounds");
}

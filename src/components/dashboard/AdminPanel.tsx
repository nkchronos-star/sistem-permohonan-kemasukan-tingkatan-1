import { useState, useEffect } from 'react';
import { useAppContext } from '../../store';
import { LogOut, Users, FileSignature, CheckSquare, Settings, Lock, XCircle, Trash2, BarChart2, Link as LinkIcon } from 'lucide-react';
import { Candidate, Role } from '../../types';


function ChangePasswordModal({ user, onClose }: { user: any, onClose: () => void }) {
  const { updateUser } = useAppContext();
  const [newPassword, setNewPassword] = useState('');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword.trim()) {
      updateUser(user.id, { password: newPassword });
      alert('Kata laluan berjaya ditukar!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Tukar Kata Laluan</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle className="w-5 h-5" /></button>
         </div>
         <form onSubmit={handleSave} className="p-6">
            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Kata Laluan Baru untuk {user.username}</label>
               <input 
                 type="text" 
                 value={newPassword}
                 onChange={e => setNewPassword(e.target.value)}
                 className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500" 
                 required 
                 placeholder="Masukkan kata laluan baru..."
               />
            </div>
            <div className="flex justify-end gap-3 mt-6">
               <button type="button" onClick={onClose} className="px-5 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-bold">Batal</button>
               <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30">Simpan</button>
            </div>
         </form>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { currentUser, login, logout } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordModalUser, setPasswordModalUser] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('ID Pengguna atau Kata Laluan tidak sah');
    }
  };

    if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-200/60 p-8 sm:p-12 max-w-md w-full animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-200/60">
             <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-3 tracking-tight">Log Masuk Admin</h2>
          <p className="text-center text-slate-500 mb-10 text-lg font-medium">Sila masukkan ID Pengguna untuk mengakses sistem.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">ID Pengguna</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-slate-50 focus:bg-white font-medium text-slate-800"
                placeholder="cth: tahfiz1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">Kata Laluan</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-slate-50 focus:bg-white font-medium text-slate-800"
                placeholder="Kata Laluan"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] text-lg mt-2"
            >
              Log Masuk
            </button>
          </form>


          
          
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      {passwordModalUser && <ChangePasswordModal user={passwordModalUser} onClose={() => setPasswordModalUser(null)} />}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden mb-10 flex flex-col md:flex-row justify-between items-center p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50">
         <div className="flex items-center gap-5 mb-6 md:mb-0">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 font-extrabold text-2xl shadow-inner">
               {currentUser.name.charAt(0)}
            </div>
            <div>
               <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{currentUser.name}</h2>
               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 mt-1 border border-emerald-200/60 uppercase tracking-wider">
                  Peranan: {currentUser.role.replace('_', ' ')}
               </span>
            </div>
         </div>
         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
         <button 
           onClick={() => setPasswordModalUser(currentUser)}
           className="text-slate-600 hover:text-emerald-700 font-bold flex items-center gap-2 transition-all duration-300 bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-200 px-6 py-3 rounded-xl w-full sm:w-auto justify-center shadow-sm"
         >
           <Lock className="w-5 h-5" /> Tukar Kata Laluan
         </button>
         <button 
           onClick={logout}
           className="text-slate-600 hover:text-red-700 font-bold flex items-center gap-2 transition-all duration-300 bg-slate-50 hover:bg-red-50 border-2 border-slate-200 hover:border-red-200 px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-red-100/50 w-full sm:w-auto justify-center"
         >
           <LogOut className="w-5 h-5" /> Log Keluar
         </button>
         </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200/60 p-8 sm:p-12 transition-all hover:shadow-2xl hover:shadow-slate-200/50">
        {currentUser.role === 'TAHFIZ' && <TahfizView />}
        {currentUser.role === 'AKADEMIK' && <AkademikView />}
        {currentUser.role === 'PENTADBIR' && <PentadbirView />}
        {currentUser.role === 'SUPER_ADMIN' && <SuperAdminView />}
      </div>
    </div>
  );
}

// ================= TAHFIZ VIEW =================
function TahfizView() {
  const { candidates, updateCandidate, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'isi'|'lihat'>('isi');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [editId, setEditId] = useState('');
  const [markah, setMarkah] = useState({ jumlah: 0, catatan: '' });

  const pendingCandidates = candidates.filter(c => c.statusTemuduga === 'LAYAK' && !c.markahTahfiz);
  const currentC = candidates.find(c => c.ic === selectedCandidate);
  
  const markedByMe = candidates.filter(c => c.markahTahfiz?.dinilaiOleh === currentUser?.name);
  const currentEditC = candidates.find(c => c.ic === editId);

  const handleSubmit = (e: React.FormEvent, isEdit: boolean = false) => {
    e.preventDefault();
    const targetIc = isEdit ? editId : selectedCandidate;
    if (!targetIc) return;
    
    const today = new Date().toISOString().split('T')[0];

    updateCandidate(targetIc, {
      markahTahfiz: {
        jumlah: Number(markah.jumlah),
        catatan: markah.catatan,
        dinilaiOleh: currentUser?.name,
        tarikhDinilai: today
      }
    });
    alert('Markah berjaya disimpan!');
    if(isEdit) {
       setEditId('');
    } else {
       setSelectedCandidate('');
    }
    setMarkah({ jumlah: 0, catatan: '' });
  };

  const startEdit = (c: any) => {
     const today = new Date().toISOString().split('T')[0];
     if (c.markahTahfiz?.tarikhDinilai !== today) {
        alert('Anda hanya boleh mengemaskini markah pada hari yang sama ia dinilai. Sila hubungi Admin.');
        return;
     }
     setEditId(c.ic);
     setMarkah({
        jumlah: c.markahTahfiz.jumlah || 0,
        catatan: c.markahTahfiz.catatan || ''
     });
  };

  return (
    <div>
       <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
         <div className="p-3 bg-emerald-100 rounded-xl">
           <FileSignature className="w-7 h-7 text-emerald-600" />
         </div>
         <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Penilaian Temuduga (Tahfiz)</h3>
         <span className="ml-auto font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">{new Date().toLocaleDateString('ms-MY')}</span>
       </div>

       <div className="flex gap-4 mb-8">
          <button onClick={() => {setActiveTab('isi'); setEditId('');}} className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'isi' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Isi Markah</button>
          <button onClick={() => setActiveTab('lihat')} className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'lihat' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Lihat Markah</button>
       </div>

       {activeTab === 'isi' && (
         <div className="max-w-3xl">
           <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
             <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Pilih Calon Penilaian (Layak Temuduga)</label>
             <select 
               className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 font-medium text-slate-800 bg-white shadow-sm appearance-none"
               value={selectedCandidate}
               onChange={(e) => {setSelectedCandidate(e.target.value); setMarkah({jumlah:0, catatan:''});}}
             >
               <option value="">-- Pilih Calon --</option>
               {pendingCandidates.map(c => (
                 <option key={c.id} value={c.ic}>{c.name} ({c.ic})</option>
               ))}
             </select>
             {pendingCandidates.length === 0 && (
               <p className="text-sm font-bold text-amber-700 mt-3 bg-amber-50 px-4 py-2 rounded-lg inline-block border border-amber-200">Tiada calon yang perlu dinilai buat masa ini.</p>
             )}
           </div>

           {currentC && (
             <div className="bg-slate-50/50 rounded-[2rem] p-8 border-2 border-emerald-100 animate-in fade-in slide-in-from-top-4 shadow-xl shadow-emerald-100/30">
               <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100/50 flex gap-6 items-start flex-col sm:flex-row">
                  {currentC.gambarUrl ? (
                     <img src={currentC.gambarUrl} alt={currentC.name} className="w-24 h-32 object-cover rounded-xl border border-slate-200 shrink-0" />
                  ) : (
                     <div className="w-24 h-32 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium shrink-0 border border-slate-200">Tiada Gambar</div>
                  )}
                  <div>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Maklumat Calon:</span>
                    <span className="font-extrabold text-2xl text-slate-900 block mb-1">{currentC.name}</span>
                    <span className="font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-md inline-block mb-3">{currentC.ic}</span>
                    <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                       <p><span className="font-bold">Asal:</span> {currentC.daerah}, {currentC.negeri}</p>
                       <p><span className="font-bold">Sekolah:</span> {currentC.namaSekolahRendah}</p>
                       <p><span className="font-bold">Status Borang:</span> {currentC.statusBorang}</p>
                    </div>
                  </div>
               </div>
               
               <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Markah Keseluruhan Temuduga (0-100)</label>
                      <input type="number" max="100" min="0" required value={markah.jumlah} onChange={e=>setMarkah({...markah, jumlah: Number(e.target.value)})} className="w-full sm:w-1/2 p-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-white font-bold text-lg text-slate-800 transition-all" />
                      <p className="text-xs text-slate-500 mt-2">Ditetapkan oleh admin kerana format pemarkahan masih dalam perbincangan.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Catatan / Ulasan Penemuduga</label>
                      <textarea value={markah.catatan} onChange={e=>setMarkah({...markah, catatan: e.target.value})} className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-white text-slate-800 transition-all min-h-[120px]" placeholder="Masukkan komen atau ulasan tentang calon..." />
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end">
                    <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-lg w-full sm:w-auto">Simpan Markah</button>
                  </div>
               </form>
             </div>
           )}
         </div>
       )}

       {activeTab === 'lihat' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
             {editId ? (
                <div className="p-8 bg-slate-50/50 animate-in fade-in">
                   <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-xl">Kemaskini Markah: {currentEditC?.name}</h4>
                      <button onClick={() => setEditId('')} className="text-slate-500 hover:text-slate-800 font-bold">Batal</button>
                   </div>
                   <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6 max-w-3xl">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Markah Keseluruhan (0-100)</label>
                          <input type="number" max="100" min="0" required value={markah.jumlah} onChange={e=>setMarkah({...markah, jumlah: Number(e.target.value)})} className="w-full sm:w-1/2 p-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-white font-bold text-lg text-slate-800 transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Catatan / Ulasan</label>
                          <textarea value={markah.catatan} onChange={e=>setMarkah({...markah, catatan: e.target.value})} className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-white text-slate-800 transition-all min-h-[100px]" />
                        </div>
                      </div>
                      <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 w-full sm:w-auto mt-6">Kemaskini Markah</button>
                   </form>
                </div>
             ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                   <thead className="bg-slate-100/50">
                      <tr>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Nama Calon & IC</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-left">Catatan</th>
                         <th className="px-4 py-4 text-xs font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 bg-emerald-50/50 text-center">Jumlah</th>
                         <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Tindakan</th>
                      </tr>
                   </thead>
                   <tbody>
                      {markedByMe.length === 0 ? (
                         <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">Tiada markah direkodkan oleh anda setakat ini.</td></tr>
                      ) : (
                         markedByMe.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition border-b border-slate-100">
                               <td className="px-4 py-4">
                                  <div className="font-bold text-slate-800">{c.name}</div>
                                  <div className="text-xs text-slate-500 mt-1">{c.ic}</div>
                               </td>
                               <td className="px-4 py-4 text-left font-medium text-slate-600 text-sm">{c.markahTahfiz?.catatan || '-'}</td>
                               <td className="px-4 py-4 text-center font-bold text-emerald-700 bg-emerald-50/30">{c.markahTahfiz?.jumlah}</td>
                               <td className="px-4 py-4 text-center">
                                  <button onClick={() => startEdit(c)} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded font-bold">Edit</button>
                               </td>
                            </tr>
                         ))
                      )}
                   </tbody>
                </table>
             </div>
             )}
          </div>
       )}
    </div>
  );
}

function AkademikView() {
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
              ...(prev[ic] || {jumlah:0, catatan:''}),
              [subject]: val
           }
        };
        try {
           localStorage.setItem('akademik_draft', JSON.stringify(next));
        } catch(e) {}
        setIsSaved(false);
        return next;
     });
  };

  const handleBulkSubmit = () => {
     const today = new Date().toISOString().split('T')[0];
     
     Object.keys(bulkMarks).forEach(ic => {
        const marks = bulkMarks[ic];
        const jumlah = Number(marks.jumlah);
        updateCandidate(ic, {
           markahAkademik: {
              jumlah,
              catatan: marks.catatan,
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
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center">Markah Keseluruhan</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-left">Catatan</th>
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
                         const marks = bulkMarks[c.ic] || {jumlah:0, catatan:''};
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

// ================= PENTADBIR VIEW =================

function AnalisisKemasukan({ candidates }: { candidates: any[] }) {
  const permohonan = candidates;
  const permohonanL = permohonan.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const permohonanP = permohonan.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  const ditawarkan = candidates.filter(c => c.statusTawaran === 'BERJAYA');
  const ditawarkanL = ditawarkan.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const ditawarkanP = ditawarkan.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  const terima = ditawarkan.filter(c => c.maklumBalasTawaran === 'TERIMA');
  const terimaL = terima.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const terimaP = terima.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  const tolak = ditawarkan.filter(c => c.maklumBalasTawaran === 'TOLAK');
  const tolakL = tolak.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const tolakP = tolak.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  const belum = ditawarkan.filter(c => !c.maklumBalasTawaran);
  const belumL = belum.filter(c => c.jantina?.toUpperCase() === 'LELAKI').length;
  const belumP = belum.filter(c => c.jantina?.toUpperCase() === 'PEREMPUAN').length;

  return (
    <div className="mb-12 mt-4">
      <h4 className="font-bold text-lg text-slate-800 mb-4">Analisis Kemasukan Tahun Semasa</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="text-slate-500 font-bold mb-2 uppercase tracking-wide text-sm">Jumlah Permohonan</div>
            <div className="text-5xl font-extrabold text-slate-800 mb-2">{permohonan.length}</div>
            <div className="text-slate-500 font-bold">(L: {permohonanL} / P: {permohonanP})</div>
         </div>
         <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Jumlah Ditawarkan</div>
            <div className="text-5xl font-extrabold text-blue-600 mb-2">{ditawarkan.length}</div>
            <div className="text-blue-600/80 font-bold">(L: {ditawarkanL} / P: {ditawarkanP})</div>
         </div>
         <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="text-emerald-600 font-bold mb-2 uppercase tracking-wide text-sm">Tawaran Diterima</div>
            <div className="text-5xl font-extrabold text-emerald-600 mb-2">{terima.length}</div>
            <div className="text-emerald-600/80 font-bold">(L: {terimaL} / P: {terimaP})</div>
         </div>
         <div className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="text-red-600 font-bold mb-2 uppercase tracking-wide text-sm">Tawaran Ditolak</div>
            <div className="text-5xl font-extrabold text-red-600 mb-2">{tolak.length}</div>
            <div className="text-red-600/80 font-bold">(L: {tolakL} / P: {tolakP})</div>
         </div>
         <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="text-amber-600 font-bold mb-2 uppercase tracking-wide text-sm">Belum Maklum Balas</div>
            <div className="text-5xl font-extrabold text-amber-600 mb-2">{belum.length}</div>
            <div className="text-amber-600/80 font-bold">(L: {belumL} / P: {belumP})</div>
         </div>
      </div>
    </div>
  );
}

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

       <AnalisisKemasukan candidates={candidates} />
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
                                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${idx < 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
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

// ================= SUPER ADMIN VIEW =================
function SuperAdminView() {
  const { settings, updateSettings, syncSettingsToServer, candidates, updateCandidate, deleteCandidate, users, addUser, updateUser, deleteUser, infographics, addInfographic, deleteInfographic, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'KAWALAN' | 'PENGGUNA' | 'PERMOHONAN' | 'MARKAH'>('KAWALAN');

  // Kawalan Handlers
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    updateSettings({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTextSettings = (name: string, value: string) => {
    updateSettings({ [name]: value });
  };

  // Permohonan Handlers
  const setKelayakan = (ic: string, layak: boolean) => {
    updateCandidate(ic, { statusTemuduga: layak ? 'LAYAK' : 'TIDAK_LAYAK' });
  };

  // Markah Handlers
  const markahList = candidates.filter(c => c.markahTahfiz || c.markahAkademik).map(c => ({
    ...c,
    totalScore: (c.markahTahfiz?.jumlah || 0) + (c.markahAkademik?.jumlah || 0)
  })).sort((a,b) => b.totalScore - a.totalScore);

  // Pengguna State
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', role: 'TAHFIZ' });
  const handleAddUser = (e: React.FormEvent) => {
     e.preventDefault();
     addUser({
        id: Math.random().toString(36).substring(7),
        ...newUser
     } as any);
     setNewUser({ username: '', password: '', name: '', role: 'TAHFIZ' });
  };
  const handleUpdateOwnPassword = () => {
     const newPass = prompt('Masukkan kata laluan baru anda:');
     if (newPass && currentUser) {
        updateUser(currentUser.id, { password: newPass });
        alert('Kata laluan berjaya ditukar!');
     }
  };

  return (
    <div className="space-y-8">
       <div className="flex gap-4 border-b border-slate-200 pb-4 overflow-x-auto custom-scrollbar">
         <button onClick={() => setActiveTab('KAWALAN')} className={`px-6 py-3 font-bold rounded-xl whitespace-nowrap ${activeTab === 'KAWALAN' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Kawalan Sistem</button>
         <button onClick={() => setActiveTab('PENGGUNA')} className={`px-6 py-3 font-bold rounded-xl whitespace-nowrap ${activeTab === 'PENGGUNA' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Pengguna (Admin)</button>
         <button onClick={() => setActiveTab('PERMOHONAN')} className={`px-6 py-3 font-bold rounded-xl whitespace-nowrap ${activeTab === 'PERMOHONAN' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Senarai Permohonan</button>
         <button onClick={() => setActiveTab('MARKAH')} className={`px-6 py-3 font-bold rounded-xl whitespace-nowrap ${activeTab === 'MARKAH' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Dashboard Markah</button>
       </div>

       {activeTab === 'KAWALAN' && (
         <div className="space-y-12 animate-in fade-in">
           <div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Settings className="w-6 h-6 text-slate-500" /> Tetapan Paparan Tarikh & Sistem</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700">Borang Permohonan</span>
                    <input type="checkbox" name="borangBuka" checked={settings.borangBuka} onChange={handleSettingsChange} className="w-5 h-5 accent-emerald-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh Dibuka/Ditutup</label>
                    <input type="date" name="tarikhBukaBorang" value={settings.tarikhBukaBorang} onChange={handleSettingsChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700">Semakan Temuduga</span>
                    <input type="checkbox" name="temudugaBuka" checked={settings.temudugaBuka} onChange={handleSettingsChange} className="w-5 h-5 accent-emerald-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh Paparan</label>
                    <input type="date" name="tarikhBukaTemuduga" value={settings.tarikhBukaTemuduga} onChange={handleSettingsChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700">Semakan Tawaran</span>
                    <input type="checkbox" name="tawaranBuka" checked={settings.tawaranBuka} onChange={handleSettingsChange} className="w-5 h-5 accent-emerald-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh Paparan</label>
                    <input type="date" name="tarikhBukaTawaran" value={settings.tarikhBukaTawaran} onChange={handleSettingsChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
             </div>
           </div>

           <div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><LinkIcon className="w-6 h-6 text-slate-500" /> Pengurusan Pautan (Links)</h3>
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Link Borang Pendaftaran Tingkatan 1 (Bagi yang berjaya)</label>
                   <input type="url" value={settings.borangTingkatan1Link || ''} onChange={e=>handleTextSettings('borangTingkatan1Link', e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="Contoh: https://forms.gle/..." />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Link Edit Maklumat Utama / Panduan</label>
                   <input type="url" value={settings.utamaPanduanLink || ''} onChange={e=>handleTextSettings('utamaPanduanLink', e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="Contoh: https://docs.google.com/..." />
                   <p className="text-xs text-slate-500 mt-2">Pautan luaran untuk rujukan/kemaskini maklumat asas oleh admin.</p>
                </div>
             </div>
           </div>

           <div className="flex justify-end border-t border-slate-200 pt-6">
              <button onClick={syncSettingsToServer} className="bg-slate-800 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-900 shadow-md">Simpan Semua Tetapan Sistem</button>
           </div>
         </div>
       )}

       {activeTab === 'PENGGUNA' && (
          <div className="space-y-12 animate-in fade-in">
             <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex justify-between items-center">
                <div>
                   <h4 className="font-bold text-blue-900 text-lg mb-1">Akaun Anda (Super Admin)</h4>
                   <p className="text-blue-700 text-sm">Urus kata laluan anda sendiri untuk keselamatan.</p>
                </div>
                <button onClick={handleUpdateOwnPassword} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Tukar Kata Laluan</button>
             </div>

             <div>
                <h3 className="text-xl font-bold mb-6">Senarai Pengguna Sistem</h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                         <tr>
                            <th className="px-6 py-4 font-bold text-sm text-slate-600">Nama Penuh</th>
                            <th className="px-6 py-4 font-bold text-sm text-slate-600">Username (ID)</th>
                            <th className="px-6 py-4 font-bold text-sm text-slate-600">Peranan</th>
                            <th className="px-6 py-4 font-bold text-sm text-slate-600 text-right">Tindakan</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {users.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50/50">
                               <td className="px-6 py-4 font-medium text-slate-800">{u.name}</td>
                               <td className="px-6 py-4 text-slate-600">{u.username}</td>
                               <td className="px-6 py-4">
                                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-bold">{u.role}</span>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  {u.id !== currentUser?.id && (
                                     <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                  )}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-2xl">
                   <h4 className="font-bold text-slate-800 mb-4">Tambah Pengguna Baru</h4>
                   <form onSubmit={handleAddUser} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Nama Penuh</label>
                            <input type="text" required value={newUser.name} onChange={e=>setNewUser({...newUser, name:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Username (ID Login)</label>
                            <input type="text" required value={newUser.username} onChange={e=>setNewUser({...newUser, username:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Kata Laluan</label>
                            <input type="text" required value={newUser.password} onChange={e=>setNewUser({...newUser, password:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Peranan</label>
                            <select value={newUser.role} onChange={e=>setNewUser({...newUser, role:e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                               <option value="TAHFIZ">Guru Tahfiz</option>
                               <option value="AKADEMIK">Guru Akademik</option>
                               <option value="PENTADBIR">Pentadbir</option>
                               <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                         </div>
                      </div>
                      <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-900 mt-2">Tambah Pengguna</button>
                   </form>
                </div>
             </div>
          </div>
       )}

       {activeTab === 'PERMOHONAN' && (
          <div className="space-y-6 animate-in fade-in">
             <AnalisisKemasukan candidates={candidates} />
             <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-slate-500" />
                <h3 className="text-xl font-bold">Senarai Keseluruhan Permohonan</h3>
             </div>
             
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse min-w-max">
                      <thead className="bg-slate-100/50">
                         <tr>
                            <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase">Nama & IC</th>
                            <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase">Daerah / Negeri</th>
                            <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase text-center">UPKK</th>
                            <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase text-center">Status Temuduga</th>
                            <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase text-center">Tindakan</th>
                         </tr>
                      </thead>
                      <tbody>
                         {candidates.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">Tiada permohonan.</td></tr>
                         ) : (
                            candidates.map(c => (
                               <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                  <td className="px-4 py-4">
                                     <div className="font-bold text-slate-800 text-sm">{c.name}</div>
                                     <div className="text-xs text-slate-500">{c.ic}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                     {c.daerah}, {c.negeri}
                                  </td>
                                  <td className="px-4 py-4 text-center">
                                     {c.upkk ? (
                                        <div className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">Ada</div>
                                     ) : <span className="text-xs text-slate-400">Tiada</span>}
                                  </td>
                                  <td className="px-4 py-4 text-center">
                                     {c.statusTemuduga === 'LAYAK' ? (
                                        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">LAYAK</span>
                                     ) : c.statusTemuduga === 'TIDAK_LAYAK' ? (
                                        <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs">TIDAK LAYAK</span>
                                     ) : (
                                        <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">MENUNGGU</span>
                                     )}
                                     <div className="flex justify-center gap-1 mt-2">
                                        <button onClick={()=>setKelayakan(c.ic, true)} className="text-[10px] bg-emerald-50 text-emerald-600 hover:bg-emerald-200 px-2 py-1 rounded font-bold border border-emerald-200">Set Layak</button>
                                        <button onClick={()=>setKelayakan(c.ic, false)} className="text-[10px] bg-red-50 text-red-600 hover:bg-red-200 px-2 py-1 rounded font-bold border border-red-200">Set Gagal</button>
                                     </div>
                                  </td>
                                  <td className="px-4 py-4 text-center">
                                     <button onClick={()=>{if(confirm('Padam calon ini?')) deleteCandidate(c.ic);}} className="text-red-500 hover:bg-red-50 p-2 rounded-lg tooltip" title="Padam Permohonan">
                                        <Trash2 className="w-5 h-5" />
                                     </button>
                                  </td>
                               </tr>
                            ))
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
       )}

       {activeTab === 'MARKAH' && (
          <div className="space-y-6 animate-in fade-in">
             <PentadbirView />
          </div>
       )}
    </div>
  );
}

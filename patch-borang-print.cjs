const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/Borang.tsx', 'utf8');

const oldSubmittedBlock = `  if (submitted) {
    return (
      <div className="animate-in fade-in py-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-emerald-100 max-w-lg w-full">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Permohonan Berjaya Dihantar!</h2>
          <p className="text-gray-600 mb-6">Terima kasih. Maklumat permohonan anda telah selamat disimpan di dalam sistem kami.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }`;

const newSubmittedBlock = `  if (submitted) {
    return (
      <div className="animate-in fade-in py-10 px-4 max-w-4xl mx-auto print:py-0 print:px-0">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-emerald-100 print:shadow-none print:border-none print:p-0">
          
          <div className="text-center mb-8 print:hidden">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Permohonan Berjaya Dihantar!</h2>
            <p className="text-gray-600 mb-6">Terima kasih. Sila cetak atau simpan borang ini sebagai rujukan (PDF).</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.print()}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-bold flex items-center gap-2"
              >
                Cetak Borang / Simpan PDF
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                Kembali
              </button>
            </div>
          </div>

          <div className="print:block bg-white text-slate-800">
             <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
                <h1 className="text-2xl font-extrabold uppercase">Borang Permohonan Kemasukan</h1>
                <p className="text-sm font-medium mt-1">Salinan Permohonan Calon</p>
             </div>
             
             <div className="flex gap-6 mb-8 items-start">
                {formData.gambarUrl ? (
                   <img src={formData.gambarUrl} alt="Passport" className="w-24 h-32 object-cover border border-slate-300" />
                ) : (
                   <div className="w-24 h-32 border border-slate-300 flex items-center justify-center text-xs text-slate-400 bg-slate-50">Tiada Gambar</div>
                )}
                <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                   <div className="col-span-2 font-bold text-base mb-2">{formData.name}</div>
                   <div><strong>No. Kad Pengenalan:</strong> {formData.ic}</div>
                   <div><strong>No. Sijil Lahir:</strong> {formData.noSijilLahir}</div>
                   <div><strong>Tarikh Lahir:</strong> {formData.tarikhLahir}</div>
                   <div><strong>Tempat Lahir:</strong> {formData.tempatLahir}</div>
                   <div><strong>Jantina:</strong> {formData.jantina}</div>
                   <div className="col-span-2"><strong>Asal Sekolah:</strong> {formData.namaSekolahRendah}</div>
                   <div className="col-span-2"><strong>Alamat:</strong> {formData.alamat1} {formData.alamat2}, {formData.poskod} {formData.daerah}, {formData.negeri}</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                   <h3 className="font-bold border-b border-slate-200 pb-2 mb-2 uppercase text-xs tracking-wider">Maklumat Bapa</h3>
                   <div className="space-y-1">
                      <div><strong>Nama:</strong> {formData.namaBapa}</div>
                      <div><strong>No. KP:</strong> {formData.icBapa}</div>
                      <div><strong>No. Tel:</strong> {formData.telefonBapa}</div>
                      <div><strong>Pekerjaan:</strong> {formData.pekerjaanBapa}</div>
                   </div>
                </div>
                <div>
                   <h3 className="font-bold border-b border-slate-200 pb-2 mb-2 uppercase text-xs tracking-wider">Maklumat Ibu</h3>
                   <div className="space-y-1">
                      <div><strong>Nama:</strong> {formData.namaIbu}</div>
                      <div><strong>No. KP:</strong> {formData.icIbu}</div>
                      <div><strong>No. Tel:</strong> {formData.telefonIbu}</div>
                      <div><strong>Pekerjaan:</strong> {formData.pekerjaanIbu}</div>
                   </div>
                </div>
             </div>

             <div className="mb-8 text-sm">
                 <h3 className="font-bold border-b border-slate-200 pb-2 mb-2 uppercase text-xs tracking-wider">Keputusan PBD & UPKK</h3>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                         <p className="font-bold mb-1">PBD Akhir Tahun Darjah 5</p>
                         <ul className="list-disc list-inside text-xs">
                             <li>Bahasa Melayu: {formData.pbd?.bm}</li>
                             <li>Bahasa Inggeris: {formData.pbd?.bi}</li>
                             <li>Matematik: {formData.pbd?.matematik}</li>
                             <li>Sains: {formData.pbd?.sains}</li>
                         </ul>
                     </div>
                     <div>
                         <p className="font-bold mb-1">PBD Pertengahan Darjah 6</p>
                         <ul className="list-disc list-inside text-xs">
                             <li>Bahasa Melayu: {formData.pbdD6?.bm}</li>
                             <li>Bahasa Inggeris: {formData.pbdD6?.bi}</li>
                             <li>Matematik: {formData.pbdD6?.matematik}</li>
                             <li>Sains: {formData.pbdD6?.sains}</li>
                         </ul>
                     </div>
                 </div>
                 <div className="mt-4">
                     <p className="font-bold mb-1">UPKK</p>
                     <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                         <li>Al-Quran: {formData.upkk?.alquran}</li>
                         <li>Akidah: {formData.upkk?.akidah}</li>
                         <li>Sirah: {formData.upkk?.sirah}</li>
                         <li>Adab: {formData.upkk?.adab}</li>
                         <li>Jawi & Khat: {formData.upkk?.jawikhat}</li>
                         <li>Bahasa Arab: {formData.upkk?.bahasaarab}</li>
                         <li>Ibadah: {formData.upkk?.ibadah}</li>
                         <li>Penghayatan Islam: {formData.upkk?.penghayatancarahidupislam}</li>
                         <li>Amali Solat: {formData.upkk?.amalisolat}</li>
                     </ul>
                 </div>
             </div>
             
             <div className="text-center text-xs text-slate-500 mt-12 print:mt-24 border-t border-slate-200 pt-4">
                Borang ini dijana oleh komputer. Sila bawa salinan ini semasa temuduga (jika terpilih).
             </div>
          </div>
        </div>
      </div>
    );
  }`;

if (code.includes('Permohonan Berjaya Dihantar!')) {
  // Using string replace with index to ensure we replace the whole block
  const startIdx = code.indexOf('  if (submitted) {');
  const endStr = '    );\n  }';
  let endIdx = code.indexOf(endStr, startIdx);
  
  if(startIdx !== -1 && endIdx !== -1) {
     endIdx += endStr.length;
     const replaced = code.substring(0, startIdx) + newSubmittedBlock + code.substring(endIdx);
     fs.writeFileSync('src/components/dashboard/Borang.tsx', replaced);
     console.log("Successfully added print screen to Borang.");
  } else {
     console.log("Could not find boundaries for submitted block.");
  }
} else {
  console.log("Could not find submitted block.");
}

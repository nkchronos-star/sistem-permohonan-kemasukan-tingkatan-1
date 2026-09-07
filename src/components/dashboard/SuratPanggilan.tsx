import { Candidate } from '../../types';
import { useAppContext } from '../../store';

export default function SuratPanggilan({ candidate }: { candidate: Candidate }) {
  const { settings } = useAppContext();
  const tarikhSemasa = new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white p-10 max-w-4xl mx-auto shadow-2xl printable-area text-black font-sans text-sm">
      {/* Header Surat */}
      <div className="flex items-start mb-6 border-b-2 border-black pb-4">
        <div className="flex items-center gap-6 w-full">
          <img src="https://i.postimg.cc/mrcDcHn3/logo-sma-cantik.png" alt="Jata Negara" className="w-24 h-auto object-contain " />
          <div className="flex-1 flex justify-between items-start">
            <div>
              <h1 className="font-bold text-lg mb-1">SMA KOTA GELANGGI 3</h1>
              <p className="leading-snug uppercase">
                KOTA GELANGGI 3<br/>
                27000 JERANTUT<br/>
                PAHANG DARUL MAKMUR
              </p>
            </div>
            <div className="text-sm leading-snug mt-7">
              <p>Tel: 09-2051555</p>
              <p>E-MEL: cft2001@moe.edu.my</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <table className="text-sm">
          <tbody>
            <tr>
              <td className="pr-2">Rujukan Kami</td>
              <td>: SMAKG03.700-2/1/1( )</td>
            </tr>
            <tr>
              <td className="pr-2">Tarikh</td>
              <td>: {tarikhSemasa}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 uppercase">
        <p>{candidate.name}</p>
        <p>{candidate.ic},</p>
        <p>{candidate.alamat1},</p>
        {candidate.alamat2 && <p>{candidate.alamat2},</p>}
        <p>{candidate.poskod} {candidate.daerah},</p>
        <p>{candidate.negeri}.</p>
      </div>

      <div className="mb-4">
        <p>Saudara / Saudari,</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold uppercase underline text-base">PANGGILAN TEMUDUGA PENGAMBILAN PELAJAR TINGKATAN 1 SESI 2026 / 2027</h2>
      </div>

      <div className="mb-4 text-justify">
        <p className="mb-4">Sukacitanya perkara di atas adalah dirujuk.</p>
        
        <p className="mb-4 text-justify indent-8">
          1.<span className="ml-4 inline-block">Sehubungan perkara di atas, dengan hormatnya dimaklumkan bahawa saudara/saudari <strong>TERPILIH</strong> untuk menghadiri satu sesi temuduga seperti ketetapan berikut:</span>
        </p>

        <div className="ml-16 mb-4">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1 w-24">Tarikh</td>
                <td className="py-1 font-bold">: {settings.tarikhTemuduga || '8 November 2025'}</td>
              </tr>
              <tr>
                <td className="py-1">Hari</td>
                <td className="py-1 font-bold">: Sabtu</td>
              </tr>
              <tr>
                <td className="py-1">Masa</td>
                <td className="py-1 font-bold">: 8.00 pagi</td>
              </tr>
              <tr>
                <td className="py-1">Tempat</td>
                <td className="py-1 font-bold">: Laman Selera, SMA Kota Gelanggi 3</td>
              </tr>
              <tr>
                <td className="py-1">Pakaian</td>
                <td className="py-1 font-bold">: Uniform sekolah</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-8 text-justify indent-8">
          2.<span className="ml-4 inline-block">Semoga kehadiran saudara/saudari dapat melancarkan temuduga yang diadakan dengan jayanya.</span>
        </p>

        <p className="mb-8">Sekian, terima kasih.</p>
      </div>

      <div className="mt-8">
        <p className="font-bold font-italic mb-4">"MALAYSIA MADANI"</p>
        <p className="font-bold font-italic mb-8">"BERKHIDMAT UNTUK NEGARA"</p>
        <p className="mb-16">Saya yang menjalankan amanah,</p>
        
        <div>
          <p>.......................................................</p>
          <p className="font-bold uppercase">(NOOR AZLAN BIN MOHAMMAD)</p>
          <p>Pengetua</p>
          <p>SMA Kota Gelanggi 3</p>
        </div>

        <div className="mt-8 text-xs">
          <p>s.k: Fail HEM</p>
        </div>
      </div>
    </div>
  );
}

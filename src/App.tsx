import { useState } from 'react';
import { AppProvider } from './store';
import { signInWithGoogle, logoutUser } from './lib/auth';
import { useAppContext } from './store';
import { Home, FileText, CheckCircle, GraduationCap, Settings, BookOpen, Menu, X } from 'lucide-react';
import Utama from './components/dashboard/Utama';
import Panduan from './components/dashboard/Panduan';
import Borang from './components/dashboard/Borang';
import SemakTemuduga from './components/dashboard/SemakTemuduga';
import SemakTawaran from './components/dashboard/SemakTawaran';
import AdminPanel from './components/dashboard/AdminPanel';

type View = 'utama' | 'panduan' | 'borang' | 'temuduga' | 'tawaran' | 'admin';

function AppContent() {
  const { firebaseUser } = useAppContext();
  const [activeView, setActiveView] = useState<View>('utama');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'utama', label: 'Utama', icon: Home },
    { id: 'panduan', label: 'Panduan', icon: BookOpen },
    { id: 'borang', label: 'Borang Permohonan', icon: FileText },
    { id: 'temuduga', label: 'Semak Temuduga', icon: CheckCircle },
    { id: 'tawaran', label: 'Semak Tawaran', icon: GraduationCap },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7ee] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header */}
      <header className="bg-[#0c6b4b] text-white print:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-full w-14 h-14 flex items-center justify-center shrink-0">
               <img src="https://i.postimg.cc/mrcDcHn3/logo-sma-cantik.png" alt="Logo SMAG3" className="h-11 w-auto object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-xl md:text-2xl tracking-wide uppercase">SMA KOTA GELANGGI 3</h1>
              <p className="text-emerald-100/90 text-sm">27000 Jerantut, Pahang</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-md font-medium text-sm mr-4">
              Sesi Kemasukan 2026/2027
            </span>
            {firebaseUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-emerald-100">{firebaseUser.email}</span>
                <button onClick={logoutUser} className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-bold">Log Keluar</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="text-sm bg-white hover:bg-slate-100 text-[#0c6b4b] px-4 py-2 rounded-md font-bold">Daftar / Log Masuk</button>
            )}
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-[#09573c] shadow-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto custom-scrollbar no-print">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as View); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-4 ${
                  isActive
                    ? 'text-white border-white bg-white/10'
                    : 'text-emerald-100/70 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c6b4b] border-t border-emerald-800 shadow-xl animate-in slide-in-from-top-2 z-40 absolute w-full top-[88px] left-0 no-print">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id as View); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-6 py-4 text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white border-l-4 border-white'
                      : 'text-emerald-100 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeView === 'utama' && <Utama onNavigate={setActiveView} />}
        {activeView === 'panduan' && <Panduan />}
        {activeView === 'borang' && <Borang />}
        {activeView === 'temuduga' && <SemakTemuduga />}
        {activeView === 'tawaran' && <SemakTawaran />}
        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-auto print:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <img src="https://i.postimg.cc/mrcDcHn3/logo-sma-cantik.png" alt="Logo" className="w-10 h-10 grayscale opacity-50" />
              <div>
                <p className="font-bold text-slate-300">SMA Kota Gelanggi 3</p>
                <p className="text-xs mt-1">&copy; 2024 Hak Cipta Terpelihara - Unit ICT SMAG3</p>
              </div>
           </div>
           <div className="text-xs max-w-xl text-center md:text-right text-slate-500">
              Pengguna Web bertanggungjawab untuk merahsiakan pengenalan identiti. Pihak sekolah tidak bertanggungjawab atas kecuaian pencerobohan identiti.
           </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

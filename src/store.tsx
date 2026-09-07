import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Candidate, ApplicationSettings, User, Infographic } from './types';

interface AppState {
  settings: ApplicationSettings;
  candidates: Candidate[];
  users: User[];
  currentUser: User | null;
  infographics: Infographic[];
}

interface AppContextType extends AppState {
  updateSettings: (settings: Partial<ApplicationSettings>) => void;
  syncSettingsToServer: () => void;
  saveCandidate: (candidate: Candidate) => void;
  updateCandidate: (ic: string, data: Partial<Candidate>) => void;
  deleteCandidate: (ic: string) => void;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addInfographic: (info: Infographic) => void;
  deleteInfographic: (id: string) => void;
}

const defaultSettings: ApplicationSettings = {
  borangBuka: false,
  tarikhBukaBorang: '2026-01-01',
  temudugaBuka: false,
  tarikhBukaTemuduga: '2026-09-01',
  tawaranBuka: false,
  tarikhBukaTawaran: '2026-11-01',
  tarikhTemuduga: '8 November 2025',
  tarikhLaporDiri: '3 Januari 2027',
  tarikhAkhirTerimaTawaran: '28 November 2026',
};

const defaultUsers: User[] = [
  { id: 'admin1', username: 'admin', password: '123', name: 'Super Admin', role: 'SUPER_ADMIN' },
  { id: 'admin2', username: 'pentadbir', password: '123', name: 'Pentadbir Sekolah', role: 'PENTADBIR' },
  { id: 'tahfiz1', username: 'tahfiz', password: '123', name: 'Ustaz/Ustazah (Penilai Tahfiz)', role: 'TAHFIZ' },
  { id: 'akademik1', username: 'akademik', password: '123', name: 'Cikgu Akademik', role: 'AKADEMIK' }
];

const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    ic: '140101061234',
    name: 'ALI BIN ABU',
    noSijilLahir: 'CA12345',
    tarikhLahir: '2014-01-01',
    tempatLahir: 'Pahang',
    jantina: 'Lelaki',
    alamat1: 'No 1, Jalan Besar',
    alamat2: 'Taman Seri',
    poskod: '27000',
    daerah: 'Jerantut',
    negeri: 'Pahang',
    namaSekolahRendah: 'SK Jerantut',
    namaBapa: 'ABU BIN BAKAR',
    icBapa: '800101061234',
    warganegaraBapa: 'Malaysia',
    alamatBapa1: 'No 1, Jalan Besar',
    alamatBapa2: 'Taman Seri',
    poskodBapa: '27000',
    daerahBapa: 'Jerantut',
    negeriBapa: 'Pahang',
    pekerjaanBapa: 'Guru',
    telefonBapa: '0123456789',
    namaIbu: 'SITI BINTI ALI',
    icIbu: '800202061234',
    warganegaraIbu: 'Malaysia',
    alamatIbu1: 'No 1, Jalan Besar',
    alamatIbu2: 'Taman Seri',
    poskodIbu: '27000',
    daerahIbu: 'Jerantut',
    negeriIbu: 'Pahang',
    pekerjaanIbu: 'Suri Rumah',
    telefonIbu: '0198765432',
    pbd: { bm: 'TP5', bi: 'TP4', matematik: 'TP5', sains: 'TP4' },
    upkk: { alquran: 'A', akidah: 'A', sirah: 'A', adab: 'A', jawikhat: 'A', bahasaarab: 'B', ibadah: 'A', penghayatancarahidupislam: 'A', amalisolat: 'A' },
    statusBorang: 'LENGKAP',
    statusTemuduga: 'LAYAK',
    statusTawaran: 'DALAM_PERTIMBANGAN',
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('smag3_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Gagal memuatkan state, menggunakan data lalai', e);
      }
    }
    return {
      settings: defaultSettings,
      candidates: mockCandidates,
      users: defaultUsers,
      currentUser: null,
      infographics: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('smag3_state', JSON.stringify(state));
  }, [state]);

  const updateSettings = (newSettings: Partial<ApplicationSettings>) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
  };

  const syncSettingsToServer = () => {
    const sheetData = new FormData();
    sheetData.append('action', 'updateSettings');
    const currentSettings = state.settings;
    Object.keys(currentSettings).forEach(key => {
      sheetData.append(key, String(currentSettings[key]));
    });

    fetch('https://script.google.com/macros/s/AKfycbwoqLCO4ejfSc-2mPR7pqpOJS86knmqzjaSMbdWPQqW_1stC5tGl9SFR1TBSmV3fA/exec', {
      method: 'POST',
      body: sheetData
    }).then(() => alert('Tetapan berjaya diselaraskan ke Pangkalan Data (Google Sheets)!'))
      .catch(e => console.error("Sync error", e));
  };

  const syncUsersToServer = (usersList: User[]) => {
    const sheetData = new FormData();
    sheetData.append('action', 'updateUsers');
    sheetData.append('usersData', JSON.stringify(usersList));

    fetch('https://script.google.com/macros/s/AKfycbwoqLCO4ejfSc-2mPR7pqpOJS86knmqzjaSMbdWPQqW_1stC5tGl9SFR1TBSmV3fA/exec', {
      method: 'POST',
      body: sheetData
    }).then(() => console.log('Users synced to server!'))
      .catch(e => console.error("Sync users error", e));
  };
  
  // We'll also try to fetch settings on load
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwoqLCO4ejfSc-2mPR7pqpOJS86knmqzjaSMbdWPQqW_1stC5tGl9SFR1TBSmV3fA/exec?action=getSettings')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error && Object.keys(data).length > 0) {
          // Convert strings to booleans where necessary
          const parsed = { ...data };
          if(parsed.borangBuka === 'true' || parsed.borangBuka === true) parsed.borangBuka = true;
          else if(parsed.borangBuka === 'false' || parsed.borangBuka === false) parsed.borangBuka = false;
          
          if(parsed.temudugaBuka === 'true' || parsed.temudugaBuka === true) parsed.temudugaBuka = true;
          else if(parsed.temudugaBuka === 'false' || parsed.temudugaBuka === false) parsed.temudugaBuka = false;
          
          if(parsed.tawaranBuka === 'true' || parsed.tawaranBuka === true) parsed.tawaranBuka = true;
          else if(parsed.tawaranBuka === 'false' || parsed.tawaranBuka === false) parsed.tawaranBuka = false;

          setState(prev => ({ ...prev, settings: { ...prev.settings, ...parsed } }));
        }
      }).catch(e => console.log('Offline/No settings fetched yet'));
      
    // Fetch users on load
    fetch('https://script.google.com/macros/s/AKfycbwoqLCO4ejfSc-2mPR7pqpOJS86knmqzjaSMbdWPQqW_1stC5tGl9SFR1TBSmV3fA/exec?action=getUsers')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setState(prev => ({ ...prev, users: data }));
        }
      }).catch(e => console.log('Offline/No users fetched yet'));
  }, []);


  const saveCandidate = (candidate: Candidate) => {
    setState(prev => {
      const existing = prev.candidates.findIndex(c => c.ic === candidate.ic);
      if (existing >= 0) {
        const newCandidates = [...prev.candidates];
        newCandidates[existing] = candidate;
        return { ...prev, candidates: newCandidates };
      }
      return { ...prev, candidates: [...prev.candidates, candidate] };
    });
  };


  const deleteCandidate = (ic: string) => {
    setState(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c.ic !== ic)
    }));
  };

  const updateCandidate = async (ic: string, data: Partial<Candidate>) => {
    setState(prev => {
      const newCandidates = prev.candidates.map(c => c.ic === ic ? { ...c, ...data } : c);
      
      // Auto-sync logic for Google Sheets Tab 2 (Keputusan_Temuduga)
      // Only triggered if there is an update that affects Tab 2 (like marks or status)
      if (data.markahTahfiz || data.markahAkademik || data.statusTemuduga || data.statusTawaran || data.maklumBalasTawaran) {
         const c = newCandidates.find(can => can.ic === ic);
         if (c) {
            const sheetData = new FormData();
            sheetData.append('Action', 'UPDATE');
            sheetData.append('IC_Calon', c.ic);
            sheetData.append('Nama_Calon', c.name);
            sheetData.append('Jantina', c.jantina || '');
            sheetData.append('Markah_Hafazan', c.markahTahfiz?.hafazan?.toString() || '');
            sheetData.append('Markah_Tilawah', c.markahTahfiz?.tilawah?.toString() || '');
            sheetData.append('Markah_Sahsiah', c.markahTahfiz?.sahsiah?.toString() || '');
            sheetData.append('Jumlah_Markah_Tahfiz', c.markahTahfiz?.jumlah?.toString() || '');
            sheetData.append('Markah_BM', c.markahAkademik?.bm?.toString() || '');
            sheetData.append('Markah_BI', c.markahAkademik?.bi?.toString() || '');
            sheetData.append('Markah_Sains', c.markahAkademik?.sains?.toString() || '');
            sheetData.append('Markah_Math', c.markahAkademik?.matematik?.toString() || '');
            sheetData.append('Jumlah_Markah_Akademik', c.markahAkademik?.jumlah?.toString() || '');
            sheetData.append('Status_Layak_Temuduga', c.statusTemuduga || '');
            sheetData.append('Status_Akhir_Tawaran', c.statusTawaran || '');
            sheetData.append('Maklum_Balas_Terima', c.maklumBalasTawaran || '');

            fetch('https://script.google.com/macros/s/AKfycbwoqLCO4ejfSc-2mPR7pqpOJS86knmqzjaSMbdWPQqW_1stC5tGl9SFR1TBSmV3fA/exec', {
               method: 'POST',
               body: sheetData
            }).catch(e => console.error("Auto-sync error", e));
         }
      }

      return {
        ...prev,
        candidates: newCandidates
      };
    });
  };


  const login = (username: string, password?: string) => {
    const user = state.users.find(u => u.username === username);
    if (user) {
      // Allow login if password matches, or if no password is set for the user (fallback to '123')
      const userPass = user.password || '123';
      if (password === userPass) {
        setState(prev => ({ ...prev, currentUser: user }));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const addUser = (user: User) => {
    setState(prev => {
      const newUsers = [...prev.users, user];
      syncUsersToServer(newUsers);
      return { ...prev, users: newUsers };
    });
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setState(prev => {
      const newUsers = prev.users.map(u => u.id === id ? { ...u, ...user } : u);
      syncUsersToServer(newUsers);
      return { ...prev, users: newUsers };
    });
  };

  const deleteUser = (id: string) => {
    setState(prev => {
      const newUsers = prev.users.filter(u => u.id !== id);
      syncUsersToServer(newUsers);
      return { ...prev, users: newUsers };
    });
  };

  const addInfographic = (info: Infographic) => {
    setState(prev => ({
      ...prev,
      infographics: [...(prev.infographics || []), info]
    }));
  };

  const deleteInfographic = (id: string) => {
    setState(prev => ({
      ...prev,
      infographics: (prev.infographics || []).filter(i => i.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      updateSettings,
      syncSettingsToServer,
      saveCandidate,
      updateCandidate,
      deleteCandidate,
      login,
      logout,
      addUser,
      updateUser,
      deleteUser,
      addInfographic,
      deleteInfographic
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export type Language = 'bs' | 'en';

export const translations = {
  bs: {
    // Navigation
    home: 'Početna',
    about: 'O nama',
    contact: 'Kontakt',
    games: 'Igre',
    admin: 'Admin',
    
    // Status
    free: 'Slobodno',
    occupied: 'Zauzeto',
    console: 'Konzola',
    
    // Admin
    adminPanel: 'Admin Panel',
    login: 'Prijava',
    password: 'Lozinka',
    updateStatus: 'Ažuriraj Status',
    logout: 'Odjava',
    
    // Common
    loading: 'Učitavanje...',
    error: 'Greška',
    success: 'Uspešno',
    
    // About
    aboutTitle: 'O nama',
    aboutText: 'Dobrodošli u xgames - vaš gaming centar za PS5 konzole. Uživajte u najnovijim igrama u udobnom okruženju.',
    
    // Contact
    contactTitle: 'Kontakt',
    hours: 'Radno vreme',
    hoursValue: '12:00 - 24:00',
    pricing: 'Cene',
    pricing2p: '2 igrača - 1 sat: 5KM',
    pricing4p: '4 igrača - 1 sat: 8KM',
    
    // Games
    gamesTitle: 'Dostupne Igre',
    availableOn: 'Dostupno na',
    consoleNumber: 'Konzola',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    games: 'Games',
    admin: 'Admin',
    
    // Status
    free: 'Free',
    occupied: 'Occupied',
    console: 'Console',
    
    // Admin
    adminPanel: 'Admin Panel',
    login: 'Login',
    password: 'Password',
    updateStatus: 'Update Status',
    logout: 'Logout',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // About
    aboutTitle: 'About Us',
    aboutText: 'Welcome to xgames - your gaming center for PS5 consoles. Enjoy the latest games in a comfortable environment.',
    
    // Contact
    contactTitle: 'Contact',
    hours: 'Hours',
    hoursValue: '12:00 PM - 12:00 AM',
    pricing: 'Pricing',
    pricing2p: '2 players - 1 hour: 5KM',
    pricing4p: '4 players - 1 hour: 8KM',
    
    // Games
    gamesTitle: 'Available Games',
    availableOn: 'Available on',
    consoleNumber: 'Console',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations.bs): string {
  return translations[lang][key] || key;
}


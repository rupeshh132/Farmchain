export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' }
];

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.howItWorks': 'How it Works',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Log Out',
    
    'dashboard.greeting': 'Welcome back',
    'dashboard.subtitle': 'Here is your farm overview for today.',
    'dashboard.quickActions': 'Action Ledger',
    'dashboard.recommendations': 'Crop Recommendations',
    'dashboard.disease': 'Disease Detection',
    'dashboard.calculator': 'Profit Calculator',
    'dashboard.journal': 'Field Journal',
    'dashboard.atmosphere': 'Local Atmosphere',
    'dashboard.mandi': 'Mandi Index',
    'dashboard.inventory': 'Inventory Ledger'
  },
  hi: {
    'nav.home': 'होम',
    'nav.features': 'सुविधाएँ',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.login': 'लॉग इन',
    'nav.signup': 'साइन अप',
    'nav.logout': 'लॉग आउट',

    'dashboard.greeting': 'वापसी पर स्वागत है',
    'dashboard.subtitle': 'आज के लिए आपके खेत का अवलोकन यहां दिया गया है।',
    'dashboard.quickActions': 'एक्शन लेजर',
    'dashboard.recommendations': 'फसल की सिफारिशें',
    'dashboard.disease': 'रोग की पहचान',
    'dashboard.calculator': 'मुनाफा कैलकुलेटर',
    'dashboard.journal': 'खेत की डायरी',
    'dashboard.atmosphere': 'स्थानीय मौसम',
    'dashboard.mandi': 'मंडी इंडेक्स',
    'dashboard.inventory': 'इन्वेंटरी लेजर'
  },
  bn: {
    'nav.home': 'হোম',
    'nav.features': 'বৈশিষ্ট্য',
    'nav.howItWorks': 'কিভাবে কাজ করে',
    'nav.login': 'লগ ইন',
    'nav.signup': 'সাইন আপ',
    'nav.logout': 'লগ আউট',
    
    'dashboard.greeting': 'ফিরে আসার জন্য স্বাগতম',
    'dashboard.subtitle': 'আজকের জন্য আপনার খামারের ওভারভিউ এখানে।',
    'dashboard.quickActions': 'কর্ম লেজার',
    'dashboard.recommendations': 'ফসলের সুপারিশ',
    'dashboard.disease': 'রোগ নির্ণয়',
    'dashboard.calculator': 'মুনাফা ক্যালকুলেটর',
    'dashboard.journal': 'মাঠের ডায়েরি',
    'dashboard.atmosphere': 'স্থানীয় আবহাওয়া',
    'dashboard.mandi': 'মান্ডি সূচক',
    'dashboard.inventory': 'ইনভেন্টরি লেজার'
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.features': 'அம்சங்கள்',
    'nav.howItWorks': 'எப்படி செயல்படுகிறது',
    'nav.login': 'உள்நுழைய',
    'nav.signup': 'பதிவு செய்',
    'nav.logout': 'வெளியேறு',
    
    'dashboard.greeting': 'மீண்டும் வரவேற்கிறோம்',
    'dashboard.subtitle': 'இன்றைய உங்கள் பண்ணை மேலோட்டம் இங்கே.',
    'dashboard.quickActions': 'செயல் பேரேடு',
    'dashboard.recommendations': 'பயிர் பரிந்துரைகள்',
    'dashboard.disease': 'நோய் கண்டறிதல்',
    'dashboard.calculator': 'லாபக் கால்குலேட்டர்',
    'dashboard.journal': 'பண்ணை நாட்குறிப்பு',
    'dashboard.atmosphere': 'உள்ளூர் வானிலை',
    'dashboard.mandi': 'மண்டி குறியீடு',
    'dashboard.inventory': 'இருப்புப் பேரேடு'
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.features': 'లక్షణాలు',
    'nav.howItWorks': 'ఇది ఎలా పనిచేస్తుంది',
    'nav.login': 'లాగిన్',
    'nav.signup': 'సైన్ అప్',
    'nav.logout': 'లాగ్ అవుట్',
    
    'dashboard.greeting': 'తిరిగి స్వాగతం',
    'dashboard.subtitle': 'ఈరోజు మీ వ్యవసాయ అవలోకనం ఇక్కడ ఉంది.',
    'dashboard.quickActions': 'చర్యల లెడ్జర్',
    'dashboard.recommendations': 'పంట సిఫార్సులు',
    'dashboard.disease': 'వ్యాధి గుర్తింపు',
    'dashboard.calculator': 'లాభాల కాలిక్యులేటర్',
    'dashboard.journal': 'క్షేత్ర డైరీ',
    'dashboard.atmosphere': 'స్థానిక వాతావరణం',
    'dashboard.mandi': 'మండి సూచిక',
    'dashboard.inventory': 'ఇన్వెంటరీ లెడ్జర్'
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.features': 'वैशिष्ट्ये',
    'nav.howItWorks': 'हे कसे काम करते',
    'nav.login': 'लॉग इन',
    'nav.signup': 'साइन अप',
    'nav.logout': 'लॉग आउट',
    
    'dashboard.greeting': 'पुन्हा स्वागत आहे',
    'dashboard.subtitle': 'आजचा तुमच्या शेताचा आढावा येथे आहे.',
    'dashboard.quickActions': 'कृती खाते',
    'dashboard.recommendations': 'पीक शिफारसी',
    'dashboard.disease': 'रोगनिदान',
    'dashboard.calculator': 'नफा कॅल्क्युलेटर',
    'dashboard.journal': 'शेतीची नोंदवही',
    'dashboard.atmosphere': 'स्थानिक हवामान',
    'dashboard.mandi': 'मंडी निर्देशांक',
    'dashboard.inventory': 'इन्व्हेंटरी खाते'
  },
  gu: {
    'nav.home': 'હોમ',
    'nav.features': 'સુવિધાઓ',
    'nav.howItWorks': 'તે કેવી રીતે કામ કરે છે',
    'nav.login': 'લૉગ ઇન',
    'nav.signup': 'સાઇન અપ',
    'nav.logout': 'લૉગ આઉટ',
    
    'dashboard.greeting': 'ફરીથી સ્વાગત છે',
    'dashboard.subtitle': 'આજે તમારા ખેતરની ઝાંખી અહીં છે.',
    'dashboard.quickActions': 'ક્રિયા ખાતાવહી',
    'dashboard.recommendations': 'પાકની ભલામણો',
    'dashboard.disease': 'રોગની ઓળખ',
    'dashboard.calculator': 'નફો કેલ્ક્યુલેટર',
    'dashboard.journal': 'ખેતરની ડાયરી',
    'dashboard.atmosphere': 'સ્થાનિક હવામાન',
    'dashboard.mandi': 'મંડી ઇન્ડેક્સ',
    'dashboard.inventory': 'ઇન્વેન્ટરી ખાતાવહી'
  }
};

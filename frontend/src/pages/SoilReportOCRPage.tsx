import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Scan, UploadCloud, CheckCircle2, FlaskConical, Droplets, ArrowRight } from 'lucide-react';
import { getFarms, submitSoilProfile } from '../api/farm';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';

export const SoilReportOCRPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Simulated extracted data
  const [extractedData, setExtractedData] = useState({
    soilType: '',
    phValue: '',
    nitrogenLevel: '',
    phosphorusLevel: '',
    potassiumLevel: '',
    irrigationAvailable: true,
    waterSource: 'TUBE_WELL'
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setScanComplete(false);
    }
  };

  const handleScan = () => {
    if (!file) return;
    setScanning(true);
    setScanComplete(false);
    
    // Simulate OCR processing time
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      setExtractedData({
        soilType: 'LOAMY',
        phValue: '6.8',
        nitrogenLevel: 'MEDIUM',
        phosphorusLevel: 'LOW',
        potassiumLevel: 'HIGH',
        irrigationAvailable: true,
        waterSource: 'TUBE_WELL'
      });
    }, 3500);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const farms = await getFarms();
      if (farms.length > 0) {
        const farmId = farms[0].id;
        await submitSoilProfile(farmId, {
          ...extractedData,
          phValue: Number(extractedData.phValue)
        });
        navigate('/dashboard');
      } else {
        alert("No farm found. Please onboard a farm first.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save soil profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto selection:bg-soil-900 selection:text-cream">
      
      <header className="mb-10 border-b-2 border-soil-900 pb-6">
        <h1 className="text-4xl md:text-5xl font-heading text-soil-900 mb-2 font-bold tracking-tight uppercase">
          Soil Report OCR
        </h1>
        <p className="text-soil-600 font-sans font-medium text-sm tracking-wide">Digitize Physical Soil Health Cards</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload & Scanner Section */}
        <div className="flex flex-col gap-6">
          <Card className="bg-transparent shadow-none border-soil-900 rounded-2xl p-0 overflow-hidden group">
            <div className="p-4 border-b border-soil-900 bg-soil-900 text-cream flex justify-between items-center">
              <span className="font-sans font-medium text-xs tracking-wide flex items-center gap-2">
                <Scan size={14} /> Document Scanner
              </span>
            </div>
            
            <div className="p-6">
              {!previewUrl ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-soil-300 hover:border-soil-900 transition-colors h-64 flex flex-col items-center justify-center cursor-pointer bg-white/50"
                >
                  <UploadCloud size={40} strokeWidth={1} className="text-soil-400 mb-4" />
                  <p className="font-heading text-lg text-soil-900 mb-1">Tap to Upload Report</p>
                  <p className="font-sans font-medium text-xs text-soil-500 tracking-wide">JPG, PNG, PDF</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="relative h-80 bg-soil-100 border border-soil-200 overflow-hidden">
                  <img src={previewUrl} alt="Soil Report Preview" className="w-full h-full object-contain grayscale contrast-125" />
                  
                  {/* Scanner Animation */}
                  <AnimatePresence>
                    {scanning && (
                      <>
                        <motion.div 
                          className="absolute inset-0 bg-sky-500/10 mix-blend-color-burn pointer-events-none"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        />
                        <motion.div 
                          className="absolute left-0 right-0 h-1 bg-sky-400 shadow-sm z-10"
                          initial={{ top: 0 }}
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none backdrop-blur-[2px]">
                          <div className="bg-soil-900/90 text-sky-400 px-6 py-3 font-sans font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-3 border border-sky-500/30">
                            <span className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                            Analyzing Optical Data...
                          </div>
                        </div>
                      </>
                    )}
                  </AnimatePresence>
                  
                  {scanComplete && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 font-sans font-medium text-[10px] tracking-wide font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 size={12} /> Extracted
                    </div>
                  )}
                </div>
              )}
            </div>

            {previewUrl && !scanComplete && (
              <div className="p-6 pt-0 flex gap-4">
                <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={() => { setPreviewUrl(null); setFile(null); }}
                  disabled={scanning}
                >
                  Clear
                </Button>
                <Button 
                  fullWidth 
                  onClick={handleScan}
                  disabled={scanning}
                  className="bg-soil-900 text-cream hover:bg-soil-800"
                >
                  {scanning ? 'Scanning...' : 'Extract Data'}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Extracted Data Form */}
        <div className="flex flex-col gap-6">
          <Card className="bg-transparent shadow-none border-soil-900 rounded-2xl p-0 overflow-hidden h-full flex flex-col relative">
            <div className="p-4 border-b border-soil-900 flex justify-between items-center bg-wheat-100">
              <span className="font-sans font-medium text-xs text-soil-900 tracking-wide flex items-center gap-2 font-bold">
                <FlaskConical size={14} /> Digitized Profile
              </span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col bg-white">
              {!scanComplete ? (
                <div className="flex-1 flex flex-col items-center justify-center text-soil-400">
                  <div className="w-16 h-16 border border-soil-200 border-dashed flex items-center justify-center mb-4">
                    <Droplets size={24} strokeWidth={1} />
                  </div>
                  <p className="font-sans font-medium text-sm tracking-wide">Awaiting Extraction</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col gap-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans font-medium text-soil-500 tracking-wide mb-1">pH Level</label>
                      <input 
                        type="text" 
                        value={extractedData.phValue}
                        onChange={(e) => setExtractedData({...extractedData, phValue: e.target.value})}
                        className="w-full bg-transparent border-b border-soil-300 py-2 font-heading text-2xl text-soil-900 focus:outline-none focus:border-soil-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-medium text-soil-500 tracking-wide mb-1">Soil Type</label>
                      <select 
                        value={extractedData.soilType}
                        onChange={(e) => setExtractedData({...extractedData, soilType: e.target.value})}
                        className="w-full bg-transparent border-b border-soil-300 py-2 font-heading text-xl text-soil-900 focus:outline-none focus:border-soil-900"
                      >
                        <option value="CLAY">Clay</option>
                        <option value="SANDY">Sandy</option>
                        <option value="LOAMY">Loamy</option>
                        <option value="SILT">Silt</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[10px] font-sans font-medium text-soil-900 uppercase tracking-[0.2em] font-bold mb-3 border-b border-soil-100 pb-2">Macronutrients (NPK)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-soil-200 p-3 bg-soil-50">
                        <span className="block font-sans font-medium text-xs text-soil-500 mb-1">Nitrogen (N)</span>
                        <select 
                          value={extractedData.nitrogenLevel}
                          onChange={(e) => setExtractedData({...extractedData, nitrogenLevel: e.target.value})}
                          className="w-full bg-transparent font-heading text-lg focus:outline-none"
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Med</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>
                      <div className="border border-soil-200 p-3 bg-soil-50">
                        <span className="block font-sans font-medium text-xs text-soil-500 mb-1">Phosphorus (P)</span>
                        <select 
                          value={extractedData.phosphorusLevel}
                          onChange={(e) => setExtractedData({...extractedData, phosphorusLevel: e.target.value})}
                          className="w-full bg-transparent font-heading text-lg focus:outline-none"
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Med</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>
                      <div className="border border-soil-200 p-3 bg-soil-50">
                        <span className="block font-sans font-medium text-xs text-soil-500 mb-1">Potassium (K)</span>
                        <select 
                          value={extractedData.potassiumLevel}
                          onChange={(e) => setExtractedData({...extractedData, potassiumLevel: e.target.value})}
                          className="w-full bg-transparent font-heading text-lg focus:outline-none"
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Med</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <Button 
                      fullWidth 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-soil-900 text-cream hover:bg-soil-800 flex items-center justify-center gap-2"
                    >
                      {saving ? 'Synchronizing...' : 'Save to Ledger'} <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

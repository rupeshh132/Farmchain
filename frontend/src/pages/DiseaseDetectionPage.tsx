import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, Activity, Stethoscope, ChevronRight } from 'lucide-react';
import { scanDisease, getDiseaseScans, type DiseaseScan } from '../api/disease';
import { getFarms } from '../api/farm';
import { getActivePlan, type FarmingPlan } from '../api/plan';
import { Button } from '../components/ui/Button';

export default function DiseaseDetectionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<DiseaseScan | null>(null);
  const [scans, setScans] = useState<DiseaseScan[]>([]);
  const [error, setError] = useState('');
  
  const [farmId, setFarmId] = useState('');
  const [cropId, setCropId] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const farms = await getFarms();
        if (farms.length > 0) {
          setFarmId(farms[0].id);
          const scansData = await getDiseaseScans(farms[0].id);
          setScans(scansData);

          try {
            const plan = await getActivePlan(farms[0].id);
            setCropId(plan.cropId);
          } catch (e) {
            // No active plan
          }
        }
      } catch (err) {
        console.error("Failed to load initial data");
      }
    };
    loadData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError('');
    }
  };

  const handleScan = async () => {
    if (!file) return;
    if (!farmId || !cropId) {
      setError("Please ensure you have an active farming plan first.");
      return;
    }

    setScanning(true);
    setError('');
    
    try {
      const scanResult = await scanDisease(farmId, cropId, file);
      setResult(scanResult);
      setScans([scanResult, ...scans]);
    } catch (err: any) {
      setError(err.message || 'Failed to scan image');
    } finally {
      setScanning(false);
    }
  };

  const isHealthy = result?.predictedDisease.toLowerCase() === 'healthy';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading text-soil-900">Crop Health Scanner</h1>
          <p className="text-soil-600 mt-2 font-body">Upload a photo of an affected leaf for AI diagnosis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scanner Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-2">
            <Camera className="text-primary" />
            <h2 className="font-heading text-xl text-soil-900">Scan Leaf</h2>
          </div>
          
          <div className="p-6">
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-soil-200 rounded-xl h-64 flex flex-col items-center justify-center text-soil-500 cursor-pointer hover:border-primary hover:bg-wheat-50 transition-all"
              >
                <Upload size={32} className="mb-2 text-soil-400" />
                <p className="font-medium">Click to upload a photo</p>
                <p className="text-sm mt-1">Supports JPG, PNG (Max 5MB)</p>
              </div>
            ) : (
              <div className="relative h-64 rounded-xl overflow-hidden border border-border group">
                <img src={preview} alt="Leaf preview" className="w-full h-full object-cover" />
                {!scanning && !result && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20" onClick={() => fileInputRef.current?.click()}>
                      Change Photo
                    </Button>
                  </div>
                )}
                
                {scanning && (
                  <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center">
                    <div className="w-full h-1 bg-primary/30 absolute top-0 animate-[scan_2s_ease-in-out_infinite]">
                      <div className="w-full h-full bg-primary shadow-[0_0_8px_2px_rgba(23,163,74,0.8)]"></div>
                    </div>
                    <Activity className="text-white animate-pulse" size={48} />
                    <p className="text-white font-medium mt-2 drop-shadow-md">Analyzing with FarmChain AI...</p>
                  </div>
                )}
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            {!result && (
              <Button 
                className="w-full mt-6 flex items-center justify-center gap-2 text-lg" 
                disabled={!file || scanning}
                onClick={handleScan}
              >
                {scanning ? 'Scanning...' : 'Analyze Photo'}
              </Button>
            )}

            {result && (
              <div className={`mt-6 p-5 rounded-lg border ${isHealthy ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  {isHealthy ? <CheckCircle className="text-green-600 mt-1" /> : <AlertCircle className="text-red-600 mt-1" />}
                  <div>
                    <h3 className={`font-heading text-xl ${isHealthy ? 'text-green-900' : 'text-red-900'}`}>
                      {result.predictedDisease}
                    </h3>
                    <p className={`text-sm mt-1 ${isHealthy ? 'text-green-700' : 'text-red-700'}`}>
                      Confidence: <span className="font-mono font-bold">{(result.confidenceScore * 100).toFixed(0)}%</span>
                    </p>
                    <div className="mt-4 bg-white/60 p-3 rounded border border-white/40">
                      <p className="text-sm font-medium text-soil-900 mb-1">Recommended Action:</p>
                      <p className="text-sm text-soil-700">{result.recommendedAction}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full bg-white"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        setResult(null);
                      }}
                    >
                      Scan Another
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scan History */}
        <div className="bg-white rounded-xl shadow-sm border border-border flex flex-col">
          <div className="p-6 border-b border-border flex items-center gap-2">
            <Stethoscope className="text-primary" />
            <h2 className="font-heading text-xl text-soil-900">Scan History</h2>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[600px] space-y-4">
            {scans.length === 0 ? (
              <p className="text-soil-500 text-center py-8">No previous scans found.</p>
            ) : (
              scans.map(scan => (
                <div key={scan.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-wheat-50/50">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${scan.predictedDisease.toLowerCase() === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {scan.predictedDisease.toLowerCase() === 'healthy' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-soil-900 truncate">{scan.predictedDisease}</p>
                    <p className="text-xs text-soil-500">{new Date(scan.scannedAt).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono text-soil-700">{(scan.confidenceScore * 100).toFixed(0)}%</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

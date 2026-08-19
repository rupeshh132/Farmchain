import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getFarms, type Farm } from '../api/farm';
import { getCrops, type Crop } from '../api/crop';
import { calculateRequirements, type CalculatorResponse } from '../api/calculator';
import { Sprout, Database, Beaker, CheckCircle2, TrendingUp } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [farms, setFarms] = useState<Farm[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  
  const [calculation, setCalculation] = useState<CalculatorResponse | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedFarms, fetchedCrops] = await Promise.all([getFarms(), getCrops()]);
        setFarms(fetchedFarms);
        setCrops(fetchedCrops);
        if (fetchedFarms.length > 0) setSelectedFarm(fetchedFarms[0].id);
        if (fetchedCrops.length > 0) setSelectedCrop(fetchedCrops[0].id);
      } catch (err: any) {
        setError(err.message || 'Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCalculate = async () => {
    if (!selectedFarm || !selectedCrop) return;
    setCalculating(true);
    setError('');
    try {
      const result = await calculateRequirements(selectedFarm, selectedCrop);
      setCalculation(result);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate inputs');
    } finally {
      setCalculating(false);
    }
  };

  const formatType = (type: string) => {
    switch(type) {
      case 'SEED': return 'Seeds';
      case 'FERTILIZER_N': return 'Nitrogen (N)';
      case 'FERTILIZER_P': return 'Phosphorus (P)';
      case 'FERTILIZER_K': return 'Potassium (K)';
      default: return type;
    }
  };

  const getIcon = (type: string) => {
    if (type === 'SEED') return <Sprout size={18} className="text-leaf-600" />;
    return <Beaker size={18} className="text-sky-600" />;
  };

  if (loading) return <div className="min-h-screen bg-cream flex items-center justify-center font-sans font-medium">Loading data...</div>;

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-heading text-soil-900 mb-1">Input Calculator</h1>
          <p className="text-soil-700 font-body text-sm">Personalized seed and fertilizer recommendations based on your exact land size.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-terracotta-500/10 border border-terracotta-500/30 text-terracotta-700 rounded-[4px] font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-1 bg-white">
          <h2 className="font-heading text-lg text-soil-900 mb-4">Configuration</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-soil-900 mb-1">Select Farm</label>
            <select 
              value={selectedFarm} 
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="w-full p-2 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500"
            >
              {farms.length === 0 ? <option value="">No farms found</option> : null}
              {farms.map(f => (
                <option key={f.id} value={f.id}>{f.farmName} ({f.measurements?.areaAcre || 0} Acres)</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-soil-900 mb-1">Select Crop</label>
            <select 
              value={selectedCrop} 
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-2 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500"
            >
              {crops.length === 0 ? <option value="">No crops found</option> : null}
              {crops.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleCalculate} 
            disabled={calculating || !selectedFarm || !selectedCrop}
          >
            {calculating ? 'Calculating...' : 'Calculate Inputs'}
          </Button>
          
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-heading text-md text-soil-900 mb-2">Want to compare profits?</h3>
            <p className="font-body text-xs text-soil-600 mb-4">See which crop will yield the highest net return after deducting all input costs.</p>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-leaf-600 text-leaf-700 hover:bg-leaf-50" 
              onClick={() => navigate('/net-realization')}
            >
              <TrendingUp size={16} /> Net Realization Ranking
            </Button>
          </div>
        </Card>

        <div className="col-span-1 md:col-span-2">
          {calculation ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 text-leaf-700 bg-leaf-500/10 p-3 rounded-[4px] border border-leaf-500/20">
                <CheckCircle2 size={20} />
                <span className="font-medium text-sm">Calculated for {calculation.farmAreaHectare} Hectares of {calculation.cropName}</span>
              </div>
              
              {calculation.requirements.map((req, idx) => (
                <Card key={idx} noPadding className="flex items-center overflow-hidden bg-white">
                  <div className="p-4 border-r border-border flex items-center justify-center bg-cream w-16">
                    {getIcon(req.knowledgeType)}
                  </div>
                  <div className="p-4 flex-1 flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg text-soil-900">{formatType(req.knowledgeType)}</h3>
                      <div className="flex items-center gap-1 text-xs text-soil-500 mt-1">
                        <Database size={12} />
                        <span>Source: <a href={req.sourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-leaf-600">{req.sourceName}</a></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-sans font-medium text-2xl text-soil-900">
                        {req.totalRequiredValue} <span className="text-base text-soil-600">{req.unit}</span>
                      </div>
                      <div className="text-xs text-soil-500 mt-1 font-sans font-medium">
                        Base: {req.perHectareValue} {req.unit}/ha
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center bg-cream/50 border-dashed">
              <div className="text-center text-soil-500">
                <Sprout size={48} className="mx-auto mb-4 opacity-50 text-leaf-600" />
                <p className="font-heading text-lg">Select a farm and crop</p>
                <p className="font-body text-sm mt-1">to see precise input requirements.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

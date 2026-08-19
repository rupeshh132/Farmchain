import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createFarm, submitMeasurement } from '../api/farm';

export const FarmOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [farmId, setFarmId] = useState<string | null>(null);

  // Farm Details
  const [farmName, setFarmName] = useState('');
  const [state, setState] = useState('UTTAR_PRADESH');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');

  // Measurement Details
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState('feet');

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // In a real app, you would pass actual latitude/longitude
      const farm = await createFarm({ farmName, state, district, village, latitude: 26.8467, longitude: 80.9462 });
      setFarmId(farm.id);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to create farm');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmId) return;
    setLoading(true);
    setError('');
    try {
      await submitMeasurement(farmId, {
        lengthValue: parseFloat(length),
        widthValue: parseFloat(width),
        inputUnit: unit
      });
      // Skip soil profile for now, go straight to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to submit measurement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-2xl mx-auto flex flex-col justify-center">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-soil-900 mb-2">
          {step === 1 ? 'Add Your Farm' : 'Measure Your Land'}
        </h1>
        <p className="text-soil-700 font-body">
          {step === 1 
            ? 'Tell us where you farm so we can give you localized weather and market data.' 
            : 'Enter the dimensions of your farm to calculate exact seed and fertilizer needs.'}
        </p>
      </div>

      <Card className="bg-white">
        {error && (
          <div className="mb-6 p-4 bg-terracotta-500/10 border border-terracotta-500/30 text-terracotta-700 rounded-[4px] font-body text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleCreateFarm} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-soil-900 mb-1">Farm Name</label>
              <input 
                type="text" 
                required 
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors"
                placeholder="e.g. Plot A, Home Farm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-soil-900 mb-1">State</label>
              <select 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors"
              >
                <option value="UTTAR_PRADESH">Uttar Pradesh</option>
                <option value="PUNJAB">Punjab</option>
                <option value="HARYANA">Haryana</option>
                <option value="RAJASTHAN">Rajasthan</option>
                <option value="MADHYA_PRADESH">Madhya Pradesh</option>
                <option value="BIHAR">Bihar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-soil-900 mb-1">District</label>
              <input 
                type="text" 
                required 
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-soil-900 mb-1">Village (Optional)</label>
              <input 
                type="text" 
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors"
              />
            </div>
            
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Saving...' : 'Next: Land Measurement'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitMeasurement} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-soil-900 mb-1">Unit of Measurement</label>
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors"
              >
                <option value="feet">Feet</option>
                <option value="meter">Meter</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-soil-900 mb-1">Length ({unit})</label>
                <input 
                  type="number" 
                  required 
                  step="0.1"
                  min="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors font-sans font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-soil-900 mb-1">Width ({unit})</label>
                <input 
                  type="number" 
                  required 
                  step="0.1"
                  min="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full p-3 border border-border rounded-[4px] bg-cream focus:outline-none focus:border-leaf-500 transition-colors font-sans font-medium"
                />
              </div>
            </div>
            
            <div className="mt-2 p-4 bg-cream/50 border border-border rounded-[4px]">
              <p className="text-sm text-soil-700 mb-1">Real-time Calculation</p>
              {length && width ? (
                <div className="font-sans font-medium text-soil-900">
                  {unit === 'feet' ? (
                    <p>{(parseFloat(length) * parseFloat(width)).toLocaleString()} sqft</p>
                  ) : (
                    <p>{(parseFloat(length) * parseFloat(width)).toLocaleString()} sqm</p>
                  )}
                  <p className="text-xs text-soil-700 mt-1">Exact Area (Acres, Hectares, Bigha) will be calculated on server.</p>
                </div>
              ) : (
                <p className="text-sm font-sans font-medium text-soil-700">Enter length and width...</p>
              )}
            </div>

            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Saving...' : 'Finish Setup'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

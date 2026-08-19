import React, { useState, useEffect } from 'react';
import { getFarms, type Farm } from '../api/farm';
import { getCrops, type Crop } from '../api/crop';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Info, Calculator } from 'lucide-react';

interface RankedCrop {
  crop: Crop;
  expectedYieldKg: number;
  marketPricePerKg: number;
  totalRevenue: number;
  estimatedCosts: number;
  netRealization: number;
  roi: number; // Return on Investment percentage
}

export const NetRealizationPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string>('');
  const [rankedCrops, setRankedCrops] = useState<RankedCrop[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedFarms = await getFarms();
        setFarms(fetchedFarms);
        if (fetchedFarms.length > 0) {
          setSelectedFarm(fetchedFarms[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedFarm) return;
    
    const calculateRankings = async () => {
      try {
        const activeFarm = farms.find(f => f.id === selectedFarm);
        if (!activeFarm) return;

        const acreage = activeFarm.measurements?.areaAcre || 1; // Default to 1 if unknown
        const fetchedCrops = await getCrops();

        // Mock heuristic calculation engine
        const rankings: RankedCrop[] = fetchedCrops.map(crop => {
          // Hardcoded heuristic values based on typical Indian farming context for demonstration
          let yieldPerAcreKg = 0;
          let marketPricePerKg = 0;
          let costPerAcre = 0;

          const cropName = crop.name.toLowerCase();
          
          if (cropName.includes('wheat')) {
            yieldPerAcreKg = 1500;
            marketPricePerKg = 22.5; // MSP approx ₹2250/quintal
            costPerAcre = 14000;
          } else if (cropName.includes('rice') || cropName.includes('paddy')) {
            yieldPerAcreKg = 1800;
            marketPricePerKg = 21.8;
            costPerAcre = 18000; // Water and labor intensive
          } else if (cropName.includes('maize')) {
            yieldPerAcreKg = 1200;
            marketPricePerKg = 20.9;
            costPerAcre = 12000;
          } else if (cropName.includes('gram') || cropName.includes('chana') || cropName.includes('chickpea')) {
            yieldPerAcreKg = 600;
            marketPricePerKg = 54.4;
            costPerAcre = 9000;
          } else if (cropName.includes('soy')) {
            yieldPerAcreKg = 700;
            marketPricePerKg = 46.0;
            costPerAcre = 11000;
          } else {
            // Default generic crop
            yieldPerAcreKg = 1000;
            marketPricePerKg = 25.0;
            costPerAcre = 15000;
          }

          const totalYield = yieldPerAcreKg * acreage;
          const totalRevenue = totalYield * marketPricePerKg;
          const estimatedCosts = costPerAcre * acreage;
          const netRealization = totalRevenue - estimatedCosts;
          const roi = (netRealization / estimatedCosts) * 100;

          return {
            crop,
            expectedYieldKg: totalYield,
            marketPricePerKg,
            totalRevenue,
            estimatedCosts,
            netRealization,
            roi
          };
        });

        // Sort by Net Realization descending
        rankings.sort((a, b) => b.netRealization - a.netRealization);
        setRankedCrops(rankings);

      } catch (e) {
        console.error("Failed to generate rankings", e);
      }
    };

    calculateRankings();
  }, [selectedFarm, farms]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return <div className="min-h-screen bg-cream flex items-center justify-center font-sans font-medium">Calculating financials...</div>;

  const currentFarmArea = farms.find(f => f.id === selectedFarm)?.measurements?.areaAcre || 0;

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-5xl mx-auto">
      <header className="mb-10 border-b-2 border-soil-900 pb-6">
        <button onClick={() => navigate('/calculator')} className="font-sans font-medium text-[10px] tracking-wide text-soil-500 hover:text-soil-900 mb-4 flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Calculator
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading text-soil-900 mb-2 font-bold tracking-tight">
              Net Realization Ranking
            </h1>
            <p className="text-soil-600 font-body text-base italic max-w-2xl">
              Crops ranked by projected net profit. Calculations deduct estimated input costs (seed, fertilizer, labor) from expected gross revenue.
            </p>
          </div>
          
          <div className="bg-wheat-50 border border-soil-300 p-3 flex flex-col min-w-[200px]">
             <label className="font-sans font-medium text-[10px] tracking-wide text-soil-500 mb-1">Active Farm Context</label>
             <select 
               value={selectedFarm} 
               onChange={(e) => setSelectedFarm(e.target.value)}
               className="bg-transparent font-heading text-lg text-soil-900 focus:outline-none border-b border-soil-900 border-dashed pb-1"
             >
               {farms.map(f => (
                 <option key={f.id} value={f.id}>{f.farmName} ({f.measurements?.areaAcre || 0} Acres)</option>
               ))}
             </select>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="mb-8 flex items-start gap-3 bg-wheat-100 border border-soil-200 p-4">
        <Info size={18} className="text-soil-600 mt-0.5 shrink-0" />
        <p className="font-sans font-medium text-xs text-soil-700 leading-relaxed uppercase tracking-wide">
          Projections based on {currentFarmArea} acres. Market prices are estimated average spot prices. Actual costs may vary based on hyper-local labor rates and precise fertilizer application.
        </p>
      </div>

      {/* Rankings List */}
      <div className="space-y-6">
        {rankedCrops.map((rc, idx) => (
          <Card key={rc.crop.id} className={`bg-transparent shadow-none rounded-2xl border-t-0 border-r-0 border-l-0 border-b-2 p-0 pb-6 mb-6 ${idx === 0 ? 'border-leaf-600' : 'border-soil-200'}`}>
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              
              {/* Left: Rank & Crop Details */}
              <div className="flex gap-4 lg:w-1/3">
                <div className={`font-heading text-5xl font-bold w-12 text-center flex-shrink-0 ${idx === 0 ? 'text-leaf-600' : 'text-soil-300'}`}>
                  #{idx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-heading text-soil-900 mb-1">{rc.crop.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-sans font-medium text-[10px] bg-soil-200 text-soil-800 px-2 py-0.5 rounded-sm tracking-wide">
                      {rc.crop.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                    <div>
                      <div className="font-sans font-medium text-[10px] text-soil-500 tracking-wide">Expected Yield</div>
                      <div className="font-sans font-medium text-sm text-soil-900 font-bold">{rc.expectedYieldKg.toLocaleString()} kg</div>
                    </div>
                    <div>
                      <div className="font-sans font-medium text-[10px] text-soil-500 tracking-wide">Est. Market Price</div>
                      <div className="font-sans font-medium text-sm text-soil-900 font-bold">₹{rc.marketPricePerKg}/kg</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle: Financial Bar Chart */}
              <div className="lg:w-1/3 flex flex-col justify-center">
                 <div className="relative h-4 w-full bg-soil-100 flex overflow-hidden">
                    {/* Cost Segment */}
                    <div 
                      className="h-full bg-terracotta-400" 
                      style={{ width: `${(rc.estimatedCosts / Math.max(rc.totalRevenue, rc.estimatedCosts)) * 100}%` }}
                    />
                    {/* Profit Segment */}
                    <div 
                      className="h-full bg-leaf-500" 
                      style={{ width: `${(Math.max(0, rc.netRealization) / rc.totalRevenue) * 100}%` }}
                    />
                 </div>
                 
                 <div className="flex justify-between mt-2">
                   <div>
                     <div className="font-sans font-medium text-[10px] text-terracotta-600 tracking-wide flex items-center gap-1">
                       <TrendingDown size={10} /> Est. Costs
                     </div>
                     <div className="font-sans font-medium text-sm text-soil-900">{formatCurrency(rc.estimatedCosts)}</div>
                   </div>
                   <div className="text-right">
                     <div className="font-sans font-medium text-[10px] text-leaf-600 tracking-wide flex items-center justify-end gap-1">
                       <TrendingUp size={10} /> Gross Revenue
                     </div>
                     <div className="font-sans font-medium text-sm text-soil-900">{formatCurrency(rc.totalRevenue)}</div>
                   </div>
                 </div>
              </div>

              {/* Right: Net Realization Highlight */}
              <div className="lg:w-1/4 flex flex-col items-end justify-center bg-wheat-50 p-4 border border-soil-200">
                <div className="font-sans font-medium text-[10px] text-soil-600 tracking-wide mb-1 text-right">
                  Net Realization (Profit)
                </div>
                <div className={`font-heading text-3xl font-bold mb-2 ${rc.netRealization >= 0 ? 'text-leaf-700' : 'text-terracotta-600'}`}>
                  {formatCurrency(rc.netRealization)}
                </div>
                <div className="font-sans font-medium text-xs bg-white border border-soil-200 px-2 py-1 flex items-center gap-2">
                  <Calculator size={12} className="text-soil-500" />
                  <span className={rc.roi >= 100 ? 'text-leaf-600 font-bold' : 'text-soil-700'}>
                    {rc.roi.toFixed(1)}% ROI
                  </span>
                </div>
              </div>

            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

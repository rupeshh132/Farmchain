import React, { useState, useEffect } from 'react';
import { getFarms, type Farm } from '../api/farm';
import { getCropRecommendations, type CropRecommendation } from '../api/recommendation';
import { createFarmingPlan } from '../api/plan';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Sprout, CheckCircle2, AlertTriangle, ArrowLeft, Calendar } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);
  const [sowingDate, setSowingDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedFarms = await getFarms();
        if (fetchedFarms.length > 0) {
          setFarm(fetchedFarms[0]);
          const recs = await getCropRecommendations(fetchedFarms[0].id);
          setRecommendations(recs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreatePlan = async () => {
    if (!farm || !selectedCrop) return;
    try {
      await createFarmingPlan(farm.id, selectedCrop.cropId, selectedCrop.varietyId, sowingDate);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create farming plan');
    }
  };

  if (loading) return <div className="min-h-screen bg-cream flex items-center justify-center font-mono">Analyzing farm data...</div>;

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 max-w-4xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-soil-700 hover:text-soil-900 mb-6 font-mono text-sm uppercase tracking-wider">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <header className="mb-8">
        <h1 className="text-3xl font-heading text-soil-900 mb-2">Crop Recommendations</h1>
        <p className="text-soil-700 font-body">
          Based on your farm location ({farm?.district}, {farm?.state}) and the current season.
        </p>
      </header>

      {recommendations.length === 0 ? (
        <Card className="bg-white text-center py-12">
          <Sprout className="mx-auto text-soil-400 mb-4" size={48} />
          <h2 className="text-xl font-heading text-soil-900 mb-2">No suitable crops found</h2>
          <p className="text-soil-700 font-body">We couldn't find any crops that match your region and current season in our database.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {recommendations.map((rec, idx) => (
            <Card key={rec.varietyId} className={idx === 0 ? "border-2 border-leaf-500 relative" : ""}>
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-leaf-500 text-white font-mono text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-[2px] uppercase tracking-wide">
                  Top Match
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-heading text-soil-900">{rec.cropName}</h2>
                    <span className="bg-soil-200 text-soil-800 font-mono text-xs px-2 py-0.5 rounded">
                      Variety: {rec.varietyName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-32 bg-soil-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-leaf-500" 
                        style={{ width: `${rec.suitabilityScore}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-sm font-bold text-soil-900">
                      {rec.suitabilityScore}/100 Score
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {rec.matchReasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm font-body">
                        {reason.startsWith('✅') ? (
                          <CheckCircle2 size={16} className="text-leaf-600 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle size={16} className="text-terracotta-500 mt-0.5 shrink-0" />
                        )}
                        <span className={reason.startsWith('✅') ? "text-soil-800" : "text-terracotta-700"}>
                          {reason.substring(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <Button className="w-full md:w-auto" onClick={() => setSelectedCrop(rec)}>Select Crop</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h2 className="text-2xl font-heading text-soil-900 mb-4">Start Farming Plan</h2>
            <p className="text-soil-700 font-body mb-6">
              You selected <strong>{selectedCrop.cropName} ({selectedCrop.varietyName})</strong>. 
              When are you planning to sow the seeds?
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Sowing Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-soil-400" size={18} />
                <input
                  type="date"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedCrop(null)}>Cancel</Button>
              <Button className="flex-1" onClick={handleCreatePlan}>Create Plan</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

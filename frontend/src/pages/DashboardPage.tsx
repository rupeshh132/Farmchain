import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CloudRain, TriangleAlert, Sprout, TrendingUp, IndianRupee, Wind, Droplets, CheckCircle2, Package, ShieldCheck, Sparkles, Camera, Calculator, MapPin } from 'lucide-react';
import { GlassIcons, type GlassIconsItem } from '../components/ui/GlassIcons';
import { getFarms, type Farm } from '../api/farm';
import { getFarmWeather, type DashboardWeatherResponse } from '../api/weather';
import { getActivePlan, completeTask, getYieldPrediction, type FarmingPlan, type YieldPredictionDto } from '../api/plan';
import { getExpenses, addExpense, logHarvest, type Expense } from '../api/finance';
import { getLatestMarketPrice, type MarketPrice } from '../api/market';
import { getFarmBatches, type ProduceBatch } from '../api/trace';

import emptyStateImage from '../assets/images/soil-hand-closeup.jpg';
import cropImage from '../assets/images/farmer-crop-inspection.jpg';
import { NotificationBell } from '../components/ui/NotificationBell';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [farm, setFarm] = useState<Farm | null>(null);
  const [weatherData, setWeatherData] = useState<DashboardWeatherResponse | null>(null);
  const [activePlan, setActivePlan] = useState<FarmingPlan | null>(null);
  const [marketPrice, setMarketPrice] = useState<MarketPrice | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [yieldPrediction, setYieldPrediction] = useState<YieldPredictionDto | null>(null);
  const [batches, setBatches] = useState<ProduceBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ category: 'FERTILIZER', amount: '', date: new Date().toISOString().split('T')[0] });
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [harvestForm, setHarvestForm] = useState({ quantity: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFarms = await getFarms();
        if (fetchedFarms.length > 0) {
          setFarm(fetchedFarms[0]);
          const weather = await getFarmWeather(fetchedFarms[0].id);
          setWeatherData(weather);
          
          try {
            const plan = await getActivePlan(fetchedFarms[0].id);
            setActivePlan(plan);
            if (plan) {
              const exp = await getExpenses(plan.id);
              setExpenses(exp);
              try {
                const yp = await getYieldPrediction(plan.id);
                setYieldPrediction(yp);
              } catch(e) {}
              try {
                if (fetchedFarms[0].state) {
                  const mPrice = await getLatestMarketPrice(plan.cropId, fetchedFarms[0].state);
                  setMarketPrice(mPrice);
                }
              } catch (e) {
                // No market price
              }
            }
          } catch (e) {
            // No active plan
          }

          try {
            const b = await getFarmBatches(fetchedFarms[0].id);
            setBatches(b);
          } catch (e) {
            // Ignore
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      if (farm) {
        const plan = await getActivePlan(farm.id);
        setActivePlan(plan);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to complete task');
    }
  };

  const handleAddExpense = async () => {
    if (!activePlan) return;
    try {
      await addExpense(activePlan.id, expenseForm.category, Number(expenseForm.amount), expenseForm.date);
      const exp = await getExpenses(activePlan.id);
      setExpenses(exp);
      setShowExpenseModal(false);
      setExpenseForm({ category: 'FERTILIZER', amount: '', date: new Date().toISOString().split('T')[0] });
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const handleLogHarvest = async () => {
    if (!activePlan) return;
    try {
      await logHarvest(activePlan.id, Number(harvestForm.quantity), harvestForm.date);
      setActivePlan(null); // Plan is now harvested
      setShowHarvestModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to log harvest');
    }
  };

  if (loading) return <div className="min-h-screen bg-cream flex items-center justify-center font-mono">Loading Dashboard...</div>;

  const hasActivePlan = farm !== null;
  const todayWeather = weatherData?.forecast?.[0];

  const quickActions: GlassIconsItem[] = [
    { icon: <Sprout size={24} />, color: 'leaf', label: 'Crops', onClick: () => navigate('/recommendations') },
    { icon: <Camera size={24} />, color: 'terracotta', label: 'Scan', onClick: () => navigate('/disease-detection') },
    { icon: <Calculator size={24} />, color: 'wheat', label: 'Calc', onClick: () => navigate('/calculator') },
    { icon: <MapPin size={24} />, color: 'sky', label: 'Trace', onClick: () => navigate('/trace') },
  ];

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <header className="mb-6 flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-heading text-soil-900 mb-1 flex items-center gap-4">
            Today
            <NotificationBell />
          </h1>
          <p className="text-soil-700 font-mono text-sm uppercase tracking-wider flex justify-between items-center w-full">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </header>

      {/* Quick Actions 3D Grid */}
      <div className="mb-10">
        <GlassIcons items={quickActions} />
      </div>

      {/* Main Stack */}
      <div className="flex flex-col gap-6">

        {!hasActivePlan ? (
          <Card className="flex flex-col md:flex-row gap-6 items-center bg-white">
            <div className="w-full md:w-1/3 h-40 md:h-32 relative rounded-[4px] overflow-hidden">
              <img 
                src={emptyStateImage} 
                alt="Empty soil" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-heading text-soil-900 mb-2">No active crop plan yet</h2>
              <p className="text-soil-700 font-body mb-4">Start by adding your farm details to get data-backed recommendations.</p>
              <div className="flex gap-4">
                <Button onClick={() => navigate('/onboarding/farm')}>Add Farm Profile</Button>
                {farm && <Button variant="outline" onClick={() => navigate('/recommendations')}>Get Recommendations</Button>}
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Dynamic Alerts */}
            {weatherData?.activeAlerts && weatherData.activeAlerts.length > 0 && (
              <div className="flex flex-col gap-3">
                {weatherData.activeAlerts.map(alert => (
                  <Card key={alert.id} className={`${alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? 'bg-terracotta-500/10 border-terracotta-500/30' : 'bg-sky-500/10 border-sky-500/30'}`}>
                    <div className="flex items-start gap-3">
                      <TriangleAlert className={alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? 'text-terracotta-500 mt-1' : 'text-sky-500 mt-1'} size={20} />
                      <div>
                        <h3 className="font-heading text-lg text-soil-900 mb-1">Weather Alert: {alert.alertType.replace('_', ' ')}</h3>
                        <p className="text-soil-900 font-body text-sm">{alert.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather Snapshot */}
              <Card>
                <div className="flex items-center gap-2 mb-4 text-sky-500">
                  <CloudRain size={20} />
                  <span className="font-medium text-soil-900 uppercase text-xs tracking-wider">Weather (Today)</span>
                </div>
                {todayWeather ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-mono text-3xl text-soil-900">{todayWeather.temperatureC}°C</span>
                    </div>
                    <div className="flex gap-4 font-body text-soil-700 text-sm mb-1">
                      <div className="flex items-center gap-1"><Droplets size={14}/> {todayWeather.humidityPct}% Humidity</div>
                      <div className="flex items-center gap-1"><Wind size={14}/> {todayWeather.windKmph} km/h</div>
                    </div>
                    {todayWeather.rainfallMm > 0 && (
                      <div className="font-body text-sky-700 text-sm mt-2 bg-sky-100/50 p-2 rounded">
                        Expected Rainfall: {todayWeather.rainfallMm} mm
                      </div>
                    )}
                    <div className="text-xs text-soil-500 mt-4 font-mono">Source: {todayWeather.source}</div>
                  </>
                ) : (
                  <p className="font-body text-soil-700 text-sm">Weather data not available yet.</p>
                )}
              </Card>

              {/* Next Task */}
              <Card>
                <div className="flex items-center gap-2 mb-4 text-leaf-700">
                  <Sprout size={20} />
                  <span className="font-medium text-soil-900 uppercase text-xs tracking-wider">Next Task</span>
                </div>
                {activePlan ? (
                  (() => {
                    const nextTask = activePlan.tasks.find(t => !t.isCompleted);
                    if (nextTask) {
                      return (
                        <>
                          <h3 className="font-heading text-xl text-soil-900 mb-1">{nextTask.title}</h3>
                          <p className="font-body text-soil-700 mb-3">Due: {new Date(nextTask.dueDate).toLocaleDateString()}</p>
                          <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={() => handleCompleteTask(nextTask.id)} className="text-sm py-1 px-3 flex gap-2 items-center">
                              <CheckCircle2 size={16} /> Mark Complete
                            </Button>
                            {nextTask.taskType === 'HARVEST' && (
                              <Button onClick={() => setShowHarvestModal(true)} className="text-sm py-1 px-3">
                                Log Harvest
                              </Button>
                            )}
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <h3 className="font-heading text-xl text-soil-900 mb-1">All caught up!</h3>
                          <p className="font-body text-soil-700 mb-3">You have completed all scheduled tasks.</p>
                        </>
                      );
                    }
                  })()
                ) : (
                  <>
                    <h3 className="font-heading text-xl text-soil-900 mb-1">What to grow next?</h3>
                    <p className="font-body text-soil-700 mb-3">Get ICAR-backed crop suggestions for your region.</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={() => navigate('/recommendations')} className="text-sm py-1 px-3">
                        View Recommendations
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* Economics & Market Snapshot */}
            <Card noPadding className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 border-b md:border-b-0 md:border-r border-border flex-1">
                  <div className="flex items-center gap-2 mb-4 text-wheat-400">
                    <TrendingUp size={20} />
                    <span className="font-medium text-soil-900 uppercase text-xs tracking-wider">Mandi Snapshot</span>
                  </div>
                  <h3 className="font-heading text-lg text-soil-900 mb-1">{activePlan ? `${activePlan.cropName} (${activePlan.varietyName})` : 'Wheat (Lok-1)'}</h3>
                  <div className="flex items-end gap-2">
                    <span className="font-mono text-2xl text-soil-900">₹{marketPrice ? marketPrice.modalPrice.toLocaleString('en-IN') : '2,450'}</span>
                    <span className="font-mono text-sm text-soil-700 mb-1">/ qtl</span>
                  </div>
                  <p className="text-xs text-soil-700 mt-2">Source: {marketPrice ? marketPrice.source : 'Agmarknet (Today, 6:00 AM)'}</p>
                  {marketPrice && (
                    <p className="text-[10px] text-soil-500 mt-1 uppercase tracking-wider">{marketPrice.marketName}, {marketPrice.district}</p>
                  )}
                </div>
                
                <div className="p-6 flex-1 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-leaf-700">
                      <IndianRupee size={20} />
                      <span className="font-medium text-soil-900 uppercase text-xs tracking-wider">Economics</span>
                    </div>
                    <Button variant="outline" className="text-xs py-1 px-2 h-auto" onClick={() => setShowExpenseModal(true)}>
                      + Add Expense
                    </Button>
                  </div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-body text-soil-700 text-sm">Input Costs (Actual)</span>
                    <span className="font-mono text-soil-900">₹{totalExpenses.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-border">
                    <span className="font-body text-soil-900 font-medium">Est. Return</span>
                    <span className="font-mono text-leaf-700 font-medium">₹38,000</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-border mt-2">
                    <span className="font-body text-soil-900 font-medium flex items-center gap-1">Est. Yield <Sparkles size={12} className="text-primary"/></span>
                    <span className="font-mono text-leaf-700 font-medium">
                      {yieldPrediction ? `${yieldPrediction.predictedMinKg.toLocaleString('en-IN')} - ${yieldPrediction.predictedMaxKg.toLocaleString('en-IN')} kg` : '...'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Crop Image representation */}
            <Card noPadding className="h-48 overflow-hidden relative mt-2">
              <img 
                src={cropImage} 
                alt="Farmer inspecting crop" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil-900/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <p className="text-cream/90 font-mono text-xs uppercase tracking-wider mb-1">Plot A • {farm?.measurements?.areaHectare ?? 'N/A'} Hectares</p>
                <h3 className="text-cream font-heading text-2xl">{activePlan ? `${activePlan.cropName} (${activePlan.varietyName})` : 'Crop Details'}</h3>
              </div>
            </Card>
          </>
        )}
        
      </div>
      
      {/* Produce Inventory */}
      {batches.length > 0 && (
        <div className="mt-8 mb-8 bg-white rounded-xl shadow-sm border border-border p-6 max-w-7xl mx-auto">
          <h2 className="font-heading text-xl text-soil-900 mb-4 flex items-center gap-2">
            <Package className="text-primary" />
            Produce Inventory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.map(b => (
              <div key={b.id} className="border border-border rounded-lg p-4 flex flex-col justify-between hover:border-primary transition-colors bg-wheat-50">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-soil-900">{b.cropName}</span>
                    <span className="text-xs bg-wheat-200 text-wheat-800 px-2 py-1 rounded-full uppercase tracking-wider">{b.status}</span>
                  </div>
                  <p className="text-sm text-soil-600 mb-1">{b.quantityKg} kg</p>
                  <p className="text-xs text-soil-500 font-mono mb-4">{new Date(b.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <Link to={`/trace/${b.qrCode}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  <ShieldCheck size={16} /> View Traceability
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white">
            <h2 className="text-2xl font-heading text-soil-900 mb-4">Add Expense</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Category</label>
              <select 
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
              >
                <option value="SEED">Seed</option>
                <option value="FERTILIZER">Fertilizer</option>
                <option value="LABOUR">Labour</option>
                <option value="IRRIGATION">Irrigation</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Amount (₹)</label>
              <input
                type="number"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
                placeholder="e.g. 500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Date</label>
              <input
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowExpenseModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleAddExpense}>Save Expense</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Harvest Modal */}
      {showHarvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white">
            <h2 className="text-2xl font-heading text-soil-900 mb-4">Log Harvest</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Actual Yield (Kg)</label>
              <input
                type="number"
                value={harvestForm.quantity}
                onChange={(e) => setHarvestForm({...harvestForm, quantity: e.target.value})}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
                placeholder="e.g. 1500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-mono text-soil-700 uppercase mb-2">Harvest Date</label>
              <input
                type="date"
                value={harvestForm.date}
                onChange={(e) => setHarvestForm({...harvestForm, date: e.target.value})}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:border-leaf-500 bg-white"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowHarvestModal(false)}>Cancel</Button>
              <Button className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 border-terracotta-500 text-white" onClick={handleLogHarvest}>Complete Harvest</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

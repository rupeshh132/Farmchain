import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight, Plus, CheckCircle2, ChevronRight, Video, Calendar, Clock, Sprout, TriangleAlert, CloudRain, Droplets, Wind, TrendingUp, Sparkles, IndianRupee, ShieldCheck, ArrowRight, Scan, Camera, Calculator } from 'lucide-react';
import { getFarms, type Farm } from '../api/farm';
import { getFarmWeather, type DashboardWeatherResponse } from '../api/weather';
import { getActivePlan, completeTask, getYieldPrediction, type FarmingPlan, type YieldPredictionDto } from '../api/plan';
import { getExpenses, addExpense, logHarvest, type Expense } from '../api/finance';
import { getLatestMarketPrice, type MarketPrice } from '../api/market';
import { getFarmBatches, type ProduceBatch } from '../api/trace';
import { useTranslation } from '../i18n/LanguageContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '../components/ui/Button';
import emptyStateImage from '../assets/images/soil-hand-closeup.jpg';
import { Card } from '../components/ui/Card';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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
              } catch (e) {}
            }
          } catch (e) {}

          try {
            const b = await getFarmBatches(fetchedFarms[0].id);
            setBatches(b);
          } catch (e) {}
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
    } catch (err) {
      alert('Failed to add expense');
    }
  };

  const handleLogHarvest = async () => {
    if (!activePlan) return;
    try {
      await logHarvest(activePlan.id, Number(harvestForm.quantity), harvestForm.date);
      setActivePlan(null);
      setShowHarvestModal(false);
    } catch (err) {
      alert('Failed to log harvest');
    }
  };

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center font-sans">Loading Dashboard...</div>;

  const hasActivePlan = farm !== null && activePlan !== null;
  const todayWeather = weatherData?.forecast?.[0];

  // Helper logic for UI
  const completedTasks = activePlan ? activePlan.tasks.filter(t => t.isCompleted).length : 0;
  const pendingTasks = activePlan ? activePlan.tasks.filter(t => !t.isCompleted).length : 0;
  const totalTasks = completedTasks + pendingTasks || 1; // avoid /0
  
  const pieData = [
    { name: 'Completed', value: completedTasks, fill: '#0B2E1E' },
    { name: 'Pending', value: pendingTasks, fill: '#E5E7EB' },
  ];

  const StatCard = ({ title, value, bg, label }: any) => (
    <div className={`p-5 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border ${bg === 'bg-soil-900' ? 'border-transparent text-white' : 'border-soil-100 bg-white text-soil-900'} flex flex-col justify-between h-40 relative overflow-hidden group`}>
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-sans font-medium ${bg === 'bg-soil-900' ? 'text-cream/90' : 'text-soil-600'}`}>{title}</h3>
        <button className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${bg === 'bg-soil-900' ? 'bg-white/10 border-white/20' : 'bg-soil-50 border-soil-200'}`}>
          <ArrowUpRight size={16} className={bg === 'bg-soil-900' ? 'text-white' : 'text-soil-900'} />
        </button>
      </div>
      <div>
        <p className="font-heading text-4xl mb-2">{value}</p>
        <div className={`flex items-center gap-1.5 text-[10px] font-sans font-medium px-2 py-1 rounded inline-flex ${bg === 'bg-soil-900' ? 'bg-primary/20 text-primary-light' : 'bg-green-50 text-green-700'}`}>
           <CheckCircle2 size={10} />
           {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-heading font-bold text-soil-900 mb-1">{t('dashboard.greeting')}, Rupesh</h1>
          <p className="text-soil-500 font-sans text-sm">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-soil-900 hover:bg-soil-800 text-cream px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={16} /> Add Farm
          </button>
          <button className="bg-white hover:bg-soil-50 text-soil-900 border border-soil-200 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm" onClick={() => navigate('/onboarding/farm')}>
            Initialize Ledger
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Farms" value={farm ? '1' : '0'} bg="bg-soil-900" label="Active this season" />
        <StatCard title="Current Temp" value={todayWeather ? `${todayWeather.temperatureC}°` : '--'} bg="bg-white" label={todayWeather ? todayWeather.source : 'Sensor Data'} />
        <StatCard title="Market Price" value={marketPrice ? `₹${marketPrice.modalPrice.toLocaleString()}` : '--'} bg="bg-white" label="Per Quintal" />
        <StatCard title="Input Costs" value={`₹${totalExpenses.toLocaleString()}`} bg="bg-white" label="Total Ledger Cost" />
      </div>

      {/* Main Grid area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN (Spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Economics Ledger */}
          <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-soil-100 flex flex-col min-h-[300px] overflow-hidden">
            <div className="p-6 border-b border-soil-100 flex justify-between items-center bg-soil-50">
              <h3 className="font-sans font-bold text-soil-900 flex items-center gap-2"><IndianRupee size={16} /> Economics & Market</h3>
              <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-1 text-[10px] font-bold border border-soil-200 bg-white rounded-full px-3 py-1 text-soil-600 hover:bg-soil-50">
                <Plus size={12} /> Append Cost
              </button>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row p-6 gap-6">
               <div className="flex-1 border-b md:border-b-0 md:border-r border-soil-100 pb-6 md:pb-0 md:pr-6 relative">
                  <div className="flex items-center justify-between mb-4">
                     <span className="font-sans font-medium text-soil-900 uppercase text-[10px] tracking-wider font-bold">Mandi Price</span>
                  </div>
                  <h4 className="font-heading text-xl text-soil-900 mb-2 italic">
                    {activePlan ? `${activePlan.cropName} (${activePlan.varietyName})` : 'Awaiting Plan'}
                  </h4>
                  <div className="flex items-end gap-2 my-2">
                    <span className="font-sans font-medium text-4xl text-soil-900 tracking-tighter">₹{marketPrice ? marketPrice.modalPrice.toLocaleString('en-IN') : '--'}</span>
                  </div>
                  <p className="text-[10px] text-soil-500 font-sans mt-4 border-t border-soil-100 pt-2">
                    {marketPrice ? `${marketPrice.marketName}, ${marketPrice.district}` : 'No market data available'}
                  </p>
               </div>
               
               <div className="flex-1 flex flex-col justify-center space-y-4 font-sans text-sm">
                  <div className="flex justify-between items-end border-b border-soil-100 pb-2">
                    <span className="text-soil-600">Input Costs (Actual)</span>
                    <span className="text-soil-900 font-bold">₹{totalExpenses.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-soil-900 font-bold flex items-center gap-2">
                      Est. Yield <Sparkles size={12} className="text-primary"/>
                    </span>
                    <span className="text-soil-900 font-bold text-sm">
                      {yieldPrediction ? `${yieldPrediction.predictedMinKg.toLocaleString('en-IN')} - ${yieldPrediction.predictedMaxKg.toLocaleString('en-IN')} kg` : '...'}
                    </span>
                  </div>
               </div>
            </div>
          </div>

          {/* Inventory Batches */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-soil-100 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-bold text-soil-900 flex items-center gap-2"><ShieldCheck size={16}/> Inventory Trail</h3>
              <button onClick={() => navigate('/trace')} className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                View All <ArrowRight size={12} />
              </button>
            </div>
            
            {batches.length === 0 ? (
               <p className="text-soil-500 text-sm font-sans italic text-center py-4">No harvested batches yet.</p>
            ) : (
               <div className="flex flex-col gap-4">
                 {batches.slice(0, 3).map((b) => (
                   <div key={b.id} className="flex items-center justify-between p-3 border border-soil-100 rounded-xl hover:bg-soil-50 transition-colors cursor-pointer" onClick={() => navigate(`/trace/${b.qrCode}`)}>
                     <div>
                       <h4 className="font-sans font-bold text-soil-900 text-sm">{b.cropName}</h4>
                       <p className="font-sans text-[10px] text-soil-500">{new Date(b.createdAt).toLocaleDateString('en-IN')} - {b.status}</p>
                     </div>
                     <span className="font-heading text-lg font-bold text-soil-900">{b.quantityKg} kg</span>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>

        {/* MIDDLE COLUMN (Spans 1) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Climate & Risk */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-soil-100">
            <h3 className="font-sans font-bold text-soil-900 mb-6 flex items-center gap-2"><CloudRain size={16}/> Weather Alerts</h3>
            
            {weatherData?.activeAlerts && weatherData.activeAlerts.length > 0 ? (
              <div className="space-y-3">
                {weatherData.activeAlerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-1 text-red-700">
                       <TriangleAlert size={14} />
                       <span className="text-[10px] font-bold uppercase">{alert.alertType.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs font-sans text-red-900">{alert.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-3">
                    <CheckCircle2 size={20} />
                 </div>
                 <h4 className="font-sans font-bold text-soil-900 text-sm">Conditions Clear</h4>
                 <p className="text-[10px] text-soil-500 font-sans mt-1">No active meteorological warnings.</p>
              </div>
            )}
            
            {todayWeather && (
               <div className="mt-6 pt-4 border-t border-soil-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-soil-500 mb-1">Humidity</span>
                    <span className="text-sm font-bold text-soil-900 flex items-center gap-1"><Droplets size={12}/> {todayWeather.humidityPct}%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-soil-500 mb-1">Wind Speed</span>
                    <span className="text-sm font-bold text-soil-900 flex items-center gap-1"><Wind size={12}/> {todayWeather.windKmph} km/h</span>
                  </div>
               </div>
            )}
          </div>

          {/* Cycle Progress */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-soil-100 flex-1 flex flex-col">
            <h3 className="font-sans font-bold text-soil-900 mb-2">Cycle Progress</h3>
            
            <div className="flex-1 relative flex flex-col justify-center items-center mt-4">
              {activePlan ? (
                <div className="h-40 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={40}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                    <span className="font-heading text-4xl font-bold text-soil-900">
                      {Math.round((completedTasks / totalTasks) * 100)}%
                    </span>
                    <span className="block text-[10px] text-soil-500 font-sans">Completed</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-soil-400 italic">No active cycle</p>
              )}
            </div>

            <div className="flex justify-between mt-6 px-2">
              <div className="flex items-center gap-1 text-[10px] font-sans text-soil-500">
                <div className="w-2 h-2 rounded-full bg-soil-900"></div> Completed
              </div>
              <div className="flex items-center gap-1 text-[10px] font-sans text-soil-500">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div> Pending
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Spans 1) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Active Tasks List */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-soil-100 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-bold text-soil-900">Active Tasks</h3>
              {activePlan && (
                <span className="text-[10px] bg-primary/20 text-primary-dark font-bold px-2 py-0.5 rounded-full">{pendingTasks} Pending</span>
              )}
            </div>
            
            <div className="flex flex-col gap-4 overflow-y-auto max-h-64 pr-2">
              {!activePlan ? (
                <p className="text-soil-500 text-sm font-sans italic text-center py-4">No tasks found. Please initialize your ledger.</p>
              ) : pendingTasks === 0 ? (
                <div className="flex flex-col items-center justify-center text-center h-full opacity-50 py-4">
                   <CheckCircle2 size={32} className="mb-2 text-soil-400"/>
                   <p className="text-xs">All tasks completed!</p>
                </div>
              ) : (
                activePlan.tasks.filter(t => !t.isCompleted).map((task) => (
                  <div key={task.id} className="p-3 border border-soil-100 rounded-xl hover:border-soil-300 transition-colors group">
                    <h4 className="font-sans font-bold text-soil-900 text-xs mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
                    <p className="font-sans text-[9px] text-soil-500 mb-3">Due: {new Date(task.dueDate).toLocaleDateString('en-IN')}</p>
                    
                    {task.taskType === 'HARVEST' ? (
                       <button onClick={() => setShowHarvestModal(true)} className="w-full text-[10px] font-bold bg-soil-900 text-cream py-1.5 rounded-lg hover:bg-soil-800 transition-colors">
                          Log Harvest Output
                       </button>
                    ) : (
                       <button onClick={() => handleCompleteTask(task.id)} className="w-full text-[10px] font-bold border border-soil-200 text-soil-700 py-1.5 rounded-lg hover:bg-soil-50 transition-colors">
                          Mark Complete
                       </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions / Season Widget */}
          <div className="bg-soil-900 p-6 rounded-[20px] shadow-[0_4px_20px_rgba(11,46,30,0.15)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(ellipse at bottom left, #C6F135 0%, transparent 60%), radial-gradient(ellipse at top right, #2A7249 0%, transparent 50%)',
                filter: 'blur(15px)'
              }}
            />
            
            <h3 className="font-sans text-xs text-cream/70 relative z-10 font-bold uppercase tracking-widest mb-4">Quick Tools</h3>
            
            <div className="relative z-10 grid grid-cols-2 gap-3">
               <button onClick={() => navigate('/recommendations')} className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 text-white transition-colors">
                  <Sprout size={16} />
                  <span className="text-[9px] font-bold tracking-wider">ICAR Data</span>
               </button>
               <button onClick={() => navigate('/soil-ocr')} className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 text-white transition-colors">
                  <Scan size={16} />
                  <span className="text-[9px] font-bold tracking-wider">Soil OCR</span>
               </button>
               <button onClick={() => navigate('/disease-detection')} className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 text-white transition-colors">
                  <Camera size={16} />
                  <span className="text-[9px] font-bold tracking-wider">Scan Leaf</span>
               </button>
               <button onClick={() => navigate('/calculator')} className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 text-white transition-colors">
                  <Calculator size={16} />
                  <span className="text-[9px] font-bold tracking-wider">Estimates</span>
               </button>
            </div>
          </div>
        </div>

      </div>

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-soil-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-cream border-soil-900 rounded-2xl shadow-sm p-8">
            <h2 className="text-3xl font-heading text-soil-900 mb-6 italic">Append Cost</h2>
            
            <div className="mb-5">
              <label className="block text-xs font-sans font-medium text-soil-700 tracking-wide mb-2">Category</label>
              <select 
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                className="w-full px-4 py-3 border border-soil-900 bg-transparent rounded-2xl focus:outline-none focus:ring-1 focus:ring-soil-900 font-sans font-medium text-sm uppercase"
              >
                <option value="SEED">Seed</option>
                <option value="FERTILIZER">Fertilizer</option>
                <option value="LABOUR">Labour</option>
                <option value="IRRIGATION">Irrigation</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-sans font-medium text-soil-700 tracking-wide mb-2">Amount (₹)</label>
              <input
                type="number"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                className="w-full px-4 py-3 border border-soil-900 bg-transparent rounded-2xl focus:outline-none focus:ring-1 focus:ring-soil-900 font-sans font-medium text-sm"
                placeholder="0.00"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-sans font-medium text-soil-700 tracking-wide mb-2">Date</label>
              <input
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                className="w-full px-4 py-3 border border-soil-900 bg-transparent rounded-2xl focus:outline-none focus:ring-1 focus:ring-soil-900 font-sans font-medium text-sm uppercase"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowExpenseModal(false)}>Cancel</Button>
              <Button size="sm" className="flex-1 bg-soil-900 text-cream hover:bg-soil-800 border-transparent" onClick={handleAddExpense}>Save Entry</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Harvest Modal */}
      {showHarvestModal && (
        <div className="fixed inset-0 bg-soil-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-cream border-soil-900 rounded-2xl shadow-sm p-8">
            <h2 className="text-3xl font-heading text-soil-900 mb-6 italic">Log Harvest Output</h2>
            
            <div className="mb-5">
              <label className="block text-xs font-sans font-medium text-soil-700 tracking-wide mb-2">Actual Yield (Kg)</label>
              <input
                type="number"
                value={harvestForm.quantity}
                onChange={(e) => setHarvestForm({...harvestForm, quantity: e.target.value})}
                className="w-full px-4 py-3 border border-soil-900 bg-transparent rounded-2xl focus:outline-none focus:ring-1 focus:ring-soil-900 font-sans font-medium text-sm"
                placeholder="0.00"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-sans font-medium text-soil-700 tracking-wide mb-2">Harvest Date</label>
              <input
                type="date"
                value={harvestForm.date}
                onChange={(e) => setHarvestForm({...harvestForm, date: e.target.value})}
                className="w-full px-4 py-3 border border-soil-900 bg-transparent rounded-2xl focus:outline-none focus:ring-1 focus:ring-soil-900 font-sans font-medium text-sm uppercase"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowHarvestModal(false)}>Cancel</Button>
              <Button size="sm" className="flex-1 bg-soil-900 text-cream hover:bg-soil-800 border-transparent" onClick={handleLogHarvest}>Confirm</Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};

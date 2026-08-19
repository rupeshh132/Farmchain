import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { IndianRupee, TrendingUp, CheckCircle, Wheat } from 'lucide-react';
import { getFarmAnalytics, type AnalyticsData } from '../../api/analytics';
import { getFarms } from '../../api/farm';

export const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farms = await getFarms();
        if (farms.length > 0) {
          const data = await getFarmAnalytics(farms[0].id);
          setAnalytics(data);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="p-8 h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soil-900"></div>
      </div>
    );
  }

  // Format data for Recharts
  const expenseData = Object.entries(analytics.financials.expensesByCategory).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

  const financialOverview = [
    { name: 'Revenue', amount: analytics.financials.totalRevenue },
    { name: 'Expenses', amount: analytics.financials.totalExpenses },
    { name: 'Profit', amount: analytics.financials.expectedProfit }
  ];

  const yieldData = [
    { name: 'Expected', kg: analytics.yield.expectedYieldKg },
    { name: 'Actual', kg: analytics.yield.actualYieldKg }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-soil-900">Farm Analytics</h1>
        <p className="text-soil-600 font-body text-sm mt-1">Real-time insights and financial tracking.</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-soil-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-soil-500 font-sans font-medium mb-1">Expected Profit</p>
            <h3 className="text-2xl font-bold font-heading text-emerald-600">
              ₹{analytics.financials.expectedProfit.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <IndianRupee className="text-emerald-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-soil-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-soil-500 font-sans font-medium mb-1">Total Expenses</p>
            <h3 className="text-2xl font-bold font-heading text-red-500">
              ₹{analytics.financials.totalExpenses.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
            <TrendingUp className="text-red-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-soil-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-soil-500 font-sans font-medium mb-1">Actual Yield (Kg)</p>
            <h3 className="text-2xl font-bold font-heading text-amber-600">
              {analytics.yield.actualYieldKg.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
            <Wheat className="text-amber-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-soil-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-soil-500 font-sans font-medium mb-1">Task Completion</p>
            <h3 className="text-2xl font-bold font-heading text-blue-600">
              {Math.round(analytics.tasks.completionRate)}%
            </h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <CheckCircle className="text-blue-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Expense Breakdown Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-soil-100 shadow-sm">
          <h3 className="text-lg font-heading font-bold text-soil-900 mb-6">Expenses Breakdown</h3>
          <div className="h-64">
            {expenseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `₹${value?.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-soil-400 font-medium text-sm">
                No expense data recorded yet
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-soil-100 shadow-sm">
          <h3 className="text-lg font-heading font-bold text-soil-900 mb-6">Financial Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialOverview}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => `₹${value?.toLocaleString()}`}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {financialOverview.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Expenses' ? '#ef4444' : entry.name === 'Profit' ? '#10b981' : '#3b82f6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yield Tracking */}
        <div className="bg-white p-6 rounded-2xl border border-soil-100 shadow-sm col-span-2">
          <h3 className="text-lg font-heading font-bold text-soil-900 mb-6">Yield Performance (Kg)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="kg" stroke="#f59e0b" fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

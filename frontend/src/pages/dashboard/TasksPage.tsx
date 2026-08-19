import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Clock, Calendar, CloudRain, AlertTriangle, Check, Loader2, ThermometerSun } from 'lucide-react';
import { getFarms } from '../../api/farm';
import { getActivePlan, completeTask, createCustomTask, type FarmingTask, type FarmingPlan } from '../../api/plan';

export const TasksPage: React.FC = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const [activePlan, setActivePlan] = useState<FarmingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Task Modal State
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const farmsData = await getFarms();
      setFarms(farmsData);
      
      if (farmsData.length > 0) {
        const plan = await getActivePlan(farmsData[0].id);
        setActivePlan(plan);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      // Refresh the plan
      if (farms.length > 0) {
        const plan = await getActivePlan(farms[0].id);
        setActivePlan(plan);
      }
    } catch (err) {
      alert('Failed to complete task');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farms.length || !newTaskTitle || !newTaskDate) return;
    
    setIsSubmitting(true);
    try {
      await createCustomTask(farms[0].id, newTaskTitle, newTaskDate, newTaskNotes);
      setShowModal(false);
      setNewTaskTitle('');
      setNewTaskNotes('');
      setNewTaskDate('');
      
      const plan = await getActivePlan(farms[0].id);
      setActivePlan(plan);
    } catch (err) {
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="animate-spin text-soil-500" size={32} />
      </div>
    );
  }

  if (farms.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold text-soil-900 mb-2">Farm Tasks</h1>
        <p className="text-soil-600 font-body">Please add a farm first to manage tasks.</p>
      </div>
    );
  }

  if (!activePlan) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold text-soil-900 mb-2">Farm Tasks</h1>
        <p className="text-soil-600 font-body mb-6">You don't have an active farming plan.</p>
        <div className="bg-cream border border-soil-200 rounded-2xl p-8 text-center max-w-md">
          <Calendar className="w-12 h-12 text-soil-400 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-bold text-soil-900 mb-2">Initialize your ledger</h3>
          <p className="text-soil-600 text-sm mb-4">Start a new crop cycle to automatically generate farming tasks.</p>
        </div>
      </div>
    );
  }

  const upcomingTasks = activePlan.tasks.filter(t => !t.isCompleted).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const completedTasks = activePlan.tasks.filter(t => t.isCompleted).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  // Dummy weather intelligence logic (in a real app, this would match task date with weather API)
  const isRainRisk = (taskType: string) => ['FERTILIZER', 'SPRAY', 'SOWING'].includes(taskType);

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-soil-900 mb-2">Smart Task Board</h1>
          <p className="text-soil-600 font-body text-sm flex items-center gap-2">
            <Calendar size={16} /> Current Plan: <span className="font-bold">{activePlan.cropName}</span> ({activePlan.varietyName})
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-soil-900 text-white px-5 py-2.5 rounded-xl font-heading font-bold text-sm hover:bg-soil-800 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Add Custom Task
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Tasks Column */}
        <div className="bg-soil-50 rounded-3xl p-6 border border-soil-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-leaf text-soil-900 flex items-center justify-center font-bold">
              {upcomingTasks.length}
            </div>
            <h2 className="text-xl font-heading font-bold text-soil-900">Upcoming Tasks</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {upcomingTasks.length === 0 ? (
              <p className="text-soil-500 text-sm text-center py-8">All caught up!</p>
            ) : (
              upcomingTasks.map(task => {
                const isOverdue = new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));
                
                return (
                  <div key={task.id} className="bg-white border border-soil-200 p-5 rounded-2xl hover:shadow-md transition-shadow relative group">
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => handleCompleteTask(task.id)}
                        className="w-6 h-6 rounded-full border-2 border-soil-300 flex-shrink-0 mt-1 hover:border-leaf hover:bg-leaf/20 transition-colors group-hover:border-leaf flex items-center justify-center"
                      >
                        <Check size={14} className="text-leaf opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-heading font-bold text-soil-900 text-lg">{task.title}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-soil-100 text-soil-600 px-2 py-1 rounded">
                            {task.taskType}
                          </span>
                        </div>
                        
                        {task.notes && (
                          <p className="text-soil-600 text-sm mb-3">{task.notes}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md ${isOverdue ? 'bg-red-50 text-red-600' : 'bg-soil-50 text-soil-600'}`}>
                            <Clock size={14} />
                            {isOverdue ? 'OVERDUE ' : 'DUE '} 
                            {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </div>
                          
                          {/* Weather Intelligence (Demo) */}
                          {!isOverdue && isRainRisk(task.taskType) && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md" title="High humidity/rain risk for this operation">
                              <CloudRain size={14} /> Warning
                            </div>
                          )}
                          {!isOverdue && task.taskType === 'HARVEST' && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-leaf bg-leaf/20 px-2.5 py-1 rounded-md">
                              <ThermometerSun size={14} /> Good Conditions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Completed Tasks Column */}
        <div className="bg-cream/50 rounded-3xl p-6 border border-soil-100 border-dashed flex flex-col opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-soil-200 text-soil-600 flex items-center justify-center font-bold">
              {completedTasks.length}
            </div>
            <h2 className="text-xl font-heading font-bold text-soil-600">Completed</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {completedTasks.length === 0 ? (
              <p className="text-soil-400 text-sm text-center py-8">No tasks completed yet.</p>
            ) : (
              completedTasks.map(task => (
                <div key={task.id} className="bg-white/60 border border-soil-200 p-4 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-soil-200 text-soil-500 flex-shrink-0 mt-1 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-soil-500 line-through decoration-2 decoration-soil-300">{task.title}</h3>
                      <p className="text-soil-400 text-xs mt-1">
                        Completed • Due was {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Add Custom Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-heading font-bold text-soil-900 mb-6">Add Custom Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-soil-600 uppercase tracking-wider mb-2">Task Title</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-cream border border-soil-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-soil-400 focus:ring-1 focus:ring-soil-400 transition-colors"
                  placeholder="e.g. Repair tractor engine"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-soil-600 uppercase tracking-wider mb-2">Due Date</label>
                <input 
                  type="date" 
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="w-full bg-cream border border-soil-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-soil-400 focus:ring-1 focus:ring-soil-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-soil-600 uppercase tracking-wider mb-2">Notes (Optional)</label>
                <textarea 
                  value={newTaskNotes}
                  onChange={(e) => setNewTaskNotes(e.target.value)}
                  className="w-full bg-cream border border-soil-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-soil-400 focus:ring-1 focus:ring-soil-400 transition-colors resize-none"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-soil-100 text-soil-600 py-3 rounded-xl font-bold text-sm hover:bg-soil-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-leaf text-soil-900 py-3 rounded-xl font-bold text-sm hover:bg-[#b5e02b] transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

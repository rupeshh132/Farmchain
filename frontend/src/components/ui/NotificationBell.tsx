import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { getNotifications, markNotificationAsRead, type Notification } from '../../api/notification';

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-soil-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden" role="menu">
          <div className="p-4 border-b border-border flex justify-between items-center bg-wheat-50">
            <h3 className="font-heading text-soil-900 text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto" aria-live="polite">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-soil-500 text-sm">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-border transition-colors hover:bg-wheat-50 flex gap-3 ${notification.isRead ? 'opacity-70' : 'bg-white'}`}
                  role="menuitem"
                >
                  <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.isRead ? 'bg-transparent' : 'bg-primary'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-soil-800">{notification.message}</p>
                    <p className="text-xs text-soil-500 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <button 
                      onClick={(e) => handleMarkAsRead(notification.id, e)}
                      className="text-soil-400 hover:text-primary p-1"
                      title="Mark as read"
                      aria-label="Mark notification as read"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

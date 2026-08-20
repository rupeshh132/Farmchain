import React, { useState, useEffect, useRef } from 'react';
import { Search, Mail, Loader2 } from 'lucide-react';
import { NotificationBell } from '../ui/NotificationBell';
import { getMe, uploadProfilePhoto, type UserProfile } from '../../api/user';

export const DashboardTopHeader: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };
    fetchUser();
  }, []);

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Max size is 5MB.');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result as string;
        const updatedUser = await uploadProfilePhoto(base64String);
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to upload photo', error);
        alert('Failed to upload photo.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const displayPhoto = user?.profilePhotoUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.fullName || 'User'}`;

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-cream border-b border-soil-100 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-soil-400 group-focus-within:text-soil-900 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search task"
            className="w-full bg-white border border-soil-200 text-soil-900 text-sm rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400 transition-all font-body placeholder-soil-400"
          />
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white border border-soil-200 flex items-center justify-center shadow-sm">
           <NotificationBell />
        </div>
        
        {/* User Profile */}
        <div 
          className="flex items-center gap-3 ml-2 pl-4 border-l border-soil-200 cursor-pointer group relative"
          onClick={handlePhotoClick}
          title="Click to change profile photo"
        >
          <div className="relative">
            <img 
              src={displayPhoto} 
              alt="User avatar" 
              className={`w-10 h-10 rounded-full bg-soil-200 border border-soil-300 group-hover:border-soil-500 transition-colors object-cover ${uploading ? 'opacity-50' : ''}`}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center text-soil-900">
                <Loader2 size={16} className="animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white text-[8px] font-bold uppercase tracking-wider text-center leading-tight">Edit<br/>Photo</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-heading font-bold text-soil-900 leading-tight">
              {user ? user.fullName : 'Loading...'}
            </p>
            <p className="text-xs font-body text-soil-500">
              {user ? user.email : ''}
            </p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
    </header>
  );
};

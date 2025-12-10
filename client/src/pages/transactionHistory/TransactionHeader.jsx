import React, { useState, useEffect } from "react";
import { Wallet, Search, LogOut, ChevronDown } from "lucide-react";

const TransactionHeader = ({ 
  totalTransactions = 0, 
  user, // Accepting user prop, but we will calculate the final name inside
  onLogout 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Guest User");

  // Effect to determine the Display Name
  useEffect(() => {
    // 1. If prop is provided and valid, use it
    if (user && (user.name || user.fullname) && user.name !== "Guest User") {
      setDisplayName(user.name || user.fullname);
    } else {
      // 2. Fallback: Try fetching from Local Storage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Check for 'fullname' (from AuthPage) or 'name', otherwise keep Guest
          const nameFromStorage = parsedUser.fullname || parsedUser.name;
          if (nameFromStorage) {
            setDisplayName(nameFromStorage);
          }
        } catch (error) {
          console.error("Failed to parse user from local storage", error);
        }
      }
    }
  }, [user]);

  // Helper to get initials (e.g., "Rahul Sharma" -> "RS")
  const getInitials = (name) => {
    if (!name) return "G"; // Guest
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    // Sticky Wrapper
    <div className="sticky top-0 z-40 w-full mb-2">
      
      {/* Main Glass Navbar */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-4 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Branding & Title */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-linear-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                Transactions
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-slate-500 text-xs md:text-sm font-medium">
                  Financial History
                </p>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-cyan-700 text-xs font-bold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
                  {totalTransactions} Entries
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Search & Profile */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                        
            <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none group"
              >
                <div className="flex flex-col items-end sm:block">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-700 transition-colors">
                    {displayName}
                  </span>
                </div>

                {/* Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-cyan-600 p-0.5 shadow-md shadow-cyan-100 group-hover:shadow-cyan-200 transition-all">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-cyan-700 font-bold border-2 border-transparent select-none">
                    {getInitials(displayName)}
                  </div>
                </div>
                
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div 
                    className="fixed inset-0 z-10 cursor-default" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  {/* Menu Items */}
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-50 sm:hidden">
                       <p className="text-sm font-bold text-slate-700">{displayName}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;
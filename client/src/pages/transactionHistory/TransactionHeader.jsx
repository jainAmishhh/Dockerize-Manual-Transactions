import React from "react";
import { Sparkles, Plus, History, Search, Wallet } from "lucide-react";

const TransactionHeader = ({ onAddTransactionClick, totalTransactions = 0 }) => {
  return (
    // Sticky Wrapper: Keeps the header visible while scrolling
    <div className="sticky top-0 z-40 w-full mb-2">
      
      {/* Main Glass Navbar */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-6 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Branding & Title */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Icon Container - Using the Cyan Gradient from your other components */}
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

          {/* Right Side: Actions Toolbar */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            
            {/* Search Input - Light Theme */}
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-500 transition-all w-64 group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-600" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="bg-transparent border-none text-sm text-slate-700 placeholder-slate-400 focus:outline-none ml-2 w-full"
              />
            </div>

            <div className="w-px h-8 bg-slate-200 mx-2 hidden md:block"></div>

            {/* Primary Action - Cyan Theme */}
            <button
              onClick={onAddTransactionClick}
              className="relative overflow-hidden group bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 flex items-center gap-2 rounded-xl font-bold text-sm shadow-lg shadow-cyan-200 transition-all duration-300 active:scale-95"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add New</span>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;
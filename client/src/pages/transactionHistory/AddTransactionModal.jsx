import React, { useState } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
// Assuming ICON_MAP is exported from your constants file alongside the others
import { 
  CATEGORY_COLORS, 
  getIconForCategory, 
  ICON_MAP 
} from "../../utils/transactionConstants.js";

export const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    types: "Expense",
    description: "",
    merchant: "",
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    icon: "ShoppingBag",
  });

  // Updated handler: accepts category string directly instead of event
  const handleCategoryChange = (category) => {
    const icon = getIconForCategory(category);
    setFormData({ ...formData, category, icon });
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      alert("Please fill in Description and Amount");
      return;
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount)
    };

    onAdd(payload);
    
    setFormData({
      types: "Expense",
      description: "",
      merchant: "",
      amount: "",
      category: "Groceries",
      date: new Date().toISOString().split("T")[0],
      icon: "ShoppingBag",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header - Fixed at top */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800">Add Transaction</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="text-slate-500 w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, types: "Income" })}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 ${
                  formData.types === "Income"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 text-slate-500"
                }`}
              >
                <TrendingUp className="w-5 h-5 mb-1" />
                <span className="font-semibold text-sm">Income</span>
              </button>
              
              <button
                onClick={() => setFormData({ ...formData, types: "Expense" })}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 ${
                  formData.types === "Expense"
                    ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                    : "border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 text-slate-500"
                }`}
              >
                <TrendingDown className="w-5 h-5 mb-1" />
                <span className="font-semibold text-sm">Expense</span>
              </button>
            </div>
          </div>

          {/* Details Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
              <input
                type="text"
                placeholder="e.g. Monthly Salary, Grocery Shopping"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Merchant <span className="font-normal text-slate-400 normal-case">(Optional)</span></label>
              <input
                type="text"
                placeholder="e.g. Amazon, Starbucks"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-3.5 text-slate-400">₹</span>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full p-3 pl-7 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all font-mono"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Category Icon Grid (Replaced Dropdown) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 custom-scrollbar">
              {Object.keys(CATEGORY_COLORS).map((cat) => {
                const iconName = getIconForCategory(cat);
                const IconComponent = ICON_MAP[iconName] || ICON_MAP.CircleHelp;
                const isSelected = formData.category === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm scale-[1.02]"
                        : "border-slate-100 hover:bg-slate-50 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <IconComponent size={20} className="mb-1" />
                    <span className="text-[10px] font-medium truncate w-full text-center leading-tight">
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-6 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              Save Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
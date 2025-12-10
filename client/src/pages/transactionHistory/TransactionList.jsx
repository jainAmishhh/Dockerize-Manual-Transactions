import React from "react";
import { Calendar, ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";
import { ICON_MAP, CATEGORY_COLORS } from "../../utils/transactionConstants.js";

export const TransactionList = ({ transactions, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (loading) return (
    <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-4"></div>
        <p className="text-slate-500">Loading your transactions...</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Transactions ({transactions.length})</h2>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            No transactions found for the selected filters.
          </div>
        ) : (
          transactions.map((t) => {
            // Default to 'CircleHelp' if icon string from backend is invalid/missing
            const IconComponent = ICON_MAP[t.icon] || ICON_MAP["CircleHelp"];
            const color = CATEGORY_COLORS[t.category] || "#6B7280";
            const isIncome = t.types === "Income";

            return (
              <div key={t._id} className="group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all hover:border-cyan-100">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl transition-colors" style={{ backgroundColor: `${color}15` }}>
                    <IconComponent className="w-6 h-6" style={{ color: color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{t.description}</h3>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md">{t.category}</span> 
                      {t.merchant && <span>• {t.merchant}</span>}
                      <span className="flex items-center gap-1 text-slate-400">
                         • <Calendar size={12} /> {formatDate(t.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  <span className="whitespace-nowrap">{isIncome ? '+' : ''}₹{t.amount.toLocaleString()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

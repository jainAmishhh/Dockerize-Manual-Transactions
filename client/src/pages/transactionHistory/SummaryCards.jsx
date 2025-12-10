import React from "react";
import { TrendingUp, TrendingDown, Wallet, Receipt } from "lucide-react";

export const SummaryCards = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.types === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0); // Ensure amount is number

  const totalExpenses = transactions
    .filter((t) => t.types === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform"><TrendingUp className="text-emerald-600" size={20} /></div>
          <p className="text-sm font-medium text-slate-600">Total Income</p>
        </div>
        <p className="text-2xl lg:text-3xl font-bold text-slate-800">₹{totalIncome.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-rose-100 rounded-xl group-hover:scale-110 transition-transform"><TrendingDown className="text-rose-600" size={20} /></div>
          <p className="text-sm font-medium text-slate-600">Total Expenses</p>
        </div>
        <p className="text-2xl lg:text-3xl font-bold text-slate-800">₹{totalExpenses.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-cyan-100 rounded-xl group-hover:scale-110 transition-transform"><Wallet className="text-cyan-600" size={20} /></div>
          <p className="text-sm font-medium text-slate-600">Net Balance</p>
        </div>
        <p className={`text-2xl lg:text-3xl font-bold ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          ₹{netBalance.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform"><Receipt className="text-blue-600" size={20} /></div>
          <p className="text-sm font-medium text-slate-600">Transactions</p>
        </div>
        <p className="text-2xl lg:text-3xl font-bold text-slate-800">{transactions.length}</p>
      </div>
    </div>
  );
};

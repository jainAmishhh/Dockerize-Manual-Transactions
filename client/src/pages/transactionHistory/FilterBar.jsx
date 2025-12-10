import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { CATEGORY_COLORS } from "../../utils/transactionConstants.js";

export const FilterBar = ({ filters, setFilters, onFilter }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => setFilters({ ...filters, search: e.target.value });

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-lg">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by description or merchant..."
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
          {["All", "Today", "7 Days", "30 Days"].map((range) => (
            <button
              key={range}
              onClick={() => setFilters({ ...filters, range })}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filters.range === range ? "bg-cyan-500 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setShowFilters(!showFilters); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
             showFilters ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Filter size={18} /> Filters <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}/>
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
          <div>
            <label className="text-sm font-semibold text-slate-600 mb-2 block">Transaction Type</label>
            <select
                value={filters.types}
                onChange={(e) => setFilters({ ...filters, types: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600 mb-2 block">Category</label>
            <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            >
                <option value="All">All Categories</option>
                {Object.keys(CATEGORY_COLORS).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

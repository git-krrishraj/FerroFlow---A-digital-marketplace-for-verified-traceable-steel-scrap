import React from 'react';
import { Search, Filter, ArrowDownUp } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedGrade,
  setSelectedGrade,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  gradeOptions,
  statusOptions,
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lot ID, location (e.g. Jamshedpur), or keywords..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Grade filter */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-medium">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="All" className="bg-slate-900">All Grades</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g} className="bg-slate-900">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowDownUp className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest" className="bg-slate-900">Newest First</option>
              <option value="confidence" className="bg-slate-900">Highest AI Confidence</option>
              <option value="quantity-desc" className="bg-slate-900">Highest Quantity</option>
              <option value="quantity-asc" className="bg-slate-900">Lowest Quantity</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}

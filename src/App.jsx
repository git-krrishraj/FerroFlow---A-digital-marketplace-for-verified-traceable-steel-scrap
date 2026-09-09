import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import ListingCard from './components/ListingCard';
import AddListingModal from './components/AddListingModal';
import TrustModal from './components/TrustModal';
import LotDetailModal from './components/LotDetailModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { getStoredListings, saveStoredListings, resetStoredListings } from './utils/storage';
import { Sparkles, Layers, ShieldCheck, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';

export default function App() {
  // Requirement 1: On first render, populate localStorage with three default listings if empty
  const [listings, setListings] = useState(() => getStoredListings());

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Feedback Toast state
  const [toast, setToast] = useState(null);

  // Persist any listing modifications to localStorage
  const handleAddListing = (newListing) => {
    const updated = [newListing, ...listings];
    setListings(updated);
    saveStoredListings(updated);
    setToast({
      type: 'success',
      title: 'Scrap Lot Screened & Published',
      message: `${newListing.grade} (${newListing.quantity}) classified at ${newListing.confidence}% AI confidence.`,
    });
  };

  // Requirement 4: Reset Demo Data
  const handleResetDemo = () => {
    const defaults = resetStoredListings();
    setListings(defaults);
    setSearchQuery('');
    setSelectedGrade('All');
    setSelectedStatus('All');
    setToast({
      type: 'reset',
      title: 'Demo State Restored',
      message: 'localStorage reset to the 3 initial verified scrap lots.',
    });
  };

  // Options for filter dropdowns
  const gradeOptions = ['SS 304', 'Carbon Steel', 'Alloy Steel'];
  const statusOptions = ['Verified', 'Docs Pending', 'Lab Verified', 'AI Screened'];

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Grade filter
        if (selectedGrade !== 'All' && item.grade !== selectedGrade) {
          return false;
        }
        // Status filter
        if (selectedStatus !== 'All' && item.status !== selectedStatus) {
          return false;
        }
        // Search query filter (location, grade, description, ID)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchLoc = item.location?.toLowerCase().includes(q);
          const matchGrade = item.grade?.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchId = item.id?.toLowerCase().includes(q);
          if (!matchLoc && !matchGrade && !matchDesc && !matchId) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'confidence') {
          return (b.confidence || 0) - (a.confidence || 0);
        }
        if (sortBy === 'quantity-desc') {
          const qA = parseInt(a.quantity, 10) || 0;
          const qB = parseInt(b.quantity, 10) || 0;
          return qB - qA;
        }
        if (sortBy === 'quantity-asc') {
          const qA = parseInt(a.quantity, 10) || 0;
          const qB = parseInt(b.quantity, 10) || 0;
          return qA - qB;
        }
        // default 'newest'
        return 0;
      });
  }, [listings, selectedGrade, selectedStatus, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* App Header */}
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenTrustModal={() => setIsTrustModalOpen(true)}
        listingCount={listings.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        
        {/* Marketplace Hero & Corridor Banner */}
        <div className="relative rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl">
          {/* Subtle industrial background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPJEMS 2026 Innovation Case</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Turning fragmented scrap into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200">reliable raw material</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 max-w-2xl">
              The bottleneck in India&apos;s steel scrap ecosystem is not availability — it is <strong className="text-slate-200">trusted discovery</strong>. FerroFlow standardizes grade certainty, automated visual screening, and transparent logistics across key secondary steelmaking corridors.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-md shadow-orange-950/60 transition-colors cursor-pointer"
              >
                <span>Add Scrap Lot for AI Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsTrustModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>How Our Trust Layer Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Marketplace Statistics */}
        <StatsBar listings={listings} />

        {/* Search, Filter & Sorter Controls */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          gradeOptions={gradeOptions}
          statusOptions={statusOptions}
        />

        {/* Section Title & Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Verified Scrap Lots
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {filteredListings.length} {filteredListings.length === 1 ? 'lot' : 'lots'}
            </span>
          </div>

          {(selectedGrade !== 'All' || selectedStatus !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedGrade('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="text-xs text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Responsive Grid of Scrap Listings (Requirement 2) */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onSelectListing={(item) => setSelectedListing(item)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">No matching scrap lots found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query, or clear your grade and status filters to see available corridor inventory.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Show All Listings
            </button>
          </div>
        )}

      </main>

      {/* Add Listing Modal with simulated AI screening workflow (Requirement 3) */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddListing={handleAddListing}
      />

      {/* Trust Layer Modal (Slide 6 Architecture) */}
      <TrustModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
      />

      {/* Lot Inspection Detail Modal */}
      <LotDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer with Reset Demo Data Button (Requirement 4) */}
      <Footer
        onResetDemo={handleResetDemo}
        onOpenTrustModal={() => setIsTrustModalOpen(true)}
      />

    </div>
  );
}

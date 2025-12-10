import React, { useState, useEffect } from "react";
import api from "../../api/axios.js"; // Import the configured instance
import { Plus } from "lucide-react";
import { SummaryCards } from "./SummaryCards.jsx";
import { FilterBar } from "./FilterBar.jsx";
import { TransactionList } from "./TransactionList.jsx";
import { AddTransactionModal } from "./AddTransactionModal.jsx";
import TransactionHeader from "./TransactionHeader.jsx";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ fullname: "User" });

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    types: "All",
    category: "All",
    range: "All",
  });

  // Fetch Transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // We use 'api' here, so the Authorization header is auto-added
      const response = await api.get("/api/transactions/filter", {
        params: {
          search: filters.search,
          types: filters.types,
          category: filters.category,
          range: filters.range,
        },
      });

      if (response.data.success) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response?.status === 401) {
        // Optional: Redirect to login if token is expired
        alert("Session expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce effect for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTransactions();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await api.post("/api/transactions", newTransaction);
      
      if (response.data.success) {
        fetchTransactions(); 
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div>
        <TransactionHeader />
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome back, <span className="text-emerald-600">{user.fullname}</span>
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your finances</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Transaction
          </button>
        </div>

        {/* Modular Components */}
        <SummaryCards transactions={transactions} />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onFilter={fetchTransactions}
        />

        <TransactionList transactions={transactions} loading={loading} />

        <AddTransactionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddTransaction}
        />
      </div>
    </div>
    </div>
  );
};

export default TransactionHistory;

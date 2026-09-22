import { useState } from "react";
import Navbar from "../../Navbar";
import { getAccountTransactions } from "../../../api";

export default function AccountTransactions() {
  const [accountId, setAccountId] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await getAccountTransactions(accountId);
      // backend returns a plain array of transactions directly
      setTransactions(data || []);
    } catch (err) {
      setError(err.message);
      setTransactions(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-4">
          Account Transactions & Details
        </h2>

        <form onSubmit={handleSearch} className="card flex gap-3 mb-6">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary whitespace-nowrap" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        {transactions && (
          <div className="card">
            {transactions.length === 0 ? (
              <p className="text-gray-400 text-sm">No transactions found for this account.</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-midnight-600">
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">With Account</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-midnight-700">
                      <td className="py-2 text-gray-200">{t.transactionType}</td>
                      <td className="py-2 text-gray-200">{t.amount}</td>
                      <td className="py-2 text-gray-200">{t.counterpartyAccId ?? "-"}</td>
                      <td className="py-2 text-gray-200">
                        {t.timeOfTransaction ? new Date(t.timeOfTransaction).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

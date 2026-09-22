import { useState } from "react";
import Navbar from "../../Navbar";
import { getBalance } from "../../../api";

export default function Balance() {
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBalance(null);
    setLoading(true);

    try {
      const data = await getBalance(pin);
      setBalance(data.amount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-4">Check Balance</h2>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Enter PIN</label>
            <input
              type="password"
              maxLength={4}
              className="input-field"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Checking..." : "View Balance"}
          </button>
        </form>

        {balance !== null && (
          <div className="card mt-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Your Current Balance</p>
            <p className="text-3xl font-bold text-emerald-light">₹ {balance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
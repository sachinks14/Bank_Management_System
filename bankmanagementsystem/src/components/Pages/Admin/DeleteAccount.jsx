import { useState } from "react";
import Navbar from "../../Navbar";
import { deleteAccount } from "../../../api";

export default function DeleteAccount() {
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await deleteAccount(accountId);
      setMessage("Account deleted successfully!");
      setAccountId("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-4">Delete Account</h2>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Account ID</label>
            <input
              type="text"
              className="input-field"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-emerald-light">{message}</p>}

          <button type="submit" className="btn-danger w-full" disabled={loading}>
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

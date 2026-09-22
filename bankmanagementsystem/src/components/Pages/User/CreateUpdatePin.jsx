import { useState } from "react";
import Navbar from "../../Navbar";
import { useAuth } from "../../../authContext/AuthContext";
import { createOrUpdatePin } from "../../../api";

export default function CreateUpdatePin() {
  const { user } = useAuth();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createOrUpdatePin({
        accId: user.Id,
        newPin: Number(newPin),
        oldPin: oldPin ? Number(oldPin) : 0,
      });
      setMessage("PIN saved successfully!");
      setOldPin("");
      setNewPin("");
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
        <h2 className="text-xl font-bold text-white mb-4">Create / Update PIN</h2>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Old PIN (leave blank if setting PIN for the first time)
            </label>
            <input
              type="password"
              maxLength={4}
              className="input-field"
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">New PIN</label>
            <input
              type="password"
              maxLength={4}
              className="input-field"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-emerald-light">{message}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : "Save PIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
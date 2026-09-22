import { useState } from "react";
import Navbar from "../../Navbar";
import { useAuth } from "../../../authContext/AuthContext";
import { sendMoney } from "../../../api";

export default function SendMoney() {
  const { user } = useAuth();
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [PIN, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await sendMoney({ fromAccount: user.Id, toAccount, amount: Number(amount), pin: Number(PIN) });
      setMessage("Money sent successfully!");
      setToAccount("");
      setAmount("");
      setPin("");
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
        <h2 className="text-xl font-bold text-white mb-4">Send Money</h2>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Recipient Account ID</label>
            <input
              type="text"
              className="input-field"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              className="input-field"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">PIN</label>
            <input
              type="password"
              maxLength={4}
              className="input-field"
              value={PIN}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-emerald-light">{message}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Money"}
          </button>
        </form>
      </div>
    </div>
  );
}
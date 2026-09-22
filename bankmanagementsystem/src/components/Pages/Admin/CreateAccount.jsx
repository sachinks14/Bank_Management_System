import { useState } from "react";
import Navbar from "../../Navbar";
import { createAccount } from "../../../api";

export default function CreateAccount() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setInitialBalance] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileNo, setMobileNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [dateOfBirth, setDOB] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createAccount({
        fullName,
        email: email || null,
        mobileNo,
        branch,
        amount: Number(amount),
        accountType,
        dateOfBirth,
        password,
      });
      setMessage("Account created successfully!");
      setName("");
      setEmail("");
      setInitialBalance("");
      setMobileNumber("");
      setBranch("");
      setAccountType("SAVINGS");
      setDOB("");
      setPassword("");
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
        <h2 className="text-xl font-bold text-white mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Customer Name</label>
            <input
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              className="input-field"
              value={dateOfBirth}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Temporary Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Branch</label>
            <input
              type="text"
              className="input-field"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Account Type</label>
            <select
              className="input-field"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="SAVINGS">Savings</option>
              <option value="CURRENT">Current</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Mobile Number</label>
            <input
              type="text"
              className="input-field"
              value={mobileNo}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Initial Balance</label>
            <input
              type="number"
              className="input-field"
              value={amount}
              onChange={(e) => setInitialBalance(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-emerald-light">{message}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

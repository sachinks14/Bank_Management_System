import { useState } from "react";
import Navbar from "../../Navbar";
import { updateAccount } from "../../../api";

export default function UpdateAccount() {
  const [accountId, setAccountId] = useState("");
  const [fullName, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {};
      if (fullName) payload.fullName = fullName;
      if (mobileNo) payload.mobileNo = mobileNo;
      if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
      if (email) payload.email = email;

      await updateAccount(accountId, payload);
      setMessage("Account updated successfully!");
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
        <h2 className="text-xl font-bold text-white mb-4">Update Account</h2>

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

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Name (leave blank to keep same)
            </label>
            <input
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Email (leave blank to keep same)
            </label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Mobile No (leave blank to keep same)
            </label>
            <input
              type="text"
              className="input-field"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Date of Birth (leave blank to keep same)
            </label>
            <input
              type="date"
              className="input-field"
              value={dateOfBirth}
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>

          {message && <p className="text-sm text-emerald-light">{message}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

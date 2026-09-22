import { useState } from "react";
import Navbar from "../../Navbar";
import { useAuth } from "../../../authContext/AuthContext";
import { requestAdminRole, requestOnlineBanking, requestAccountUpdate } from "../../../api";

export default function RequestToAdmin() {
  const { user } = useAuth();

  const [simpleStatus, setSimpleStatus] = useState("");
  const [simpleLoading, setSimpleLoading] = useState("");

  async function handleAdminRequest() {
    setSimpleStatus("");
    setSimpleLoading("admin");
    try {
      await requestAdminRole(user.Id);
      setSimpleStatus("Request sent - waiting for admin approval.");
    } catch (err) {
      setSimpleStatus(err.message);
    } finally {
      setSimpleLoading("");
    }
  }

  async function handleOnlineBankingRequest() {
    setSimpleStatus("");
    setSimpleLoading("banking");
    try {
      await requestOnlineBanking(user.Id);
      setSimpleStatus("Request sent - waiting for admin approval.");
    } catch (err) {
      setSimpleStatus(err.message);
    } finally {
      setSimpleLoading("");
    }
  }

  // --- account update request (has its own fields) ---
  const [fullName, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    setUpdateStatus("");
    setUpdateLoading(true);

    try {
      // only send fields that were actually filled in
      const payload = {};
      if (fullName) payload.fullName = fullName;
      if (mobileNo) payload.mobileNo = mobileNo;
      if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
      if (email) payload.email = email;

      await requestAccountUpdate(user.Id, payload);
      setUpdateStatus("Update request sent - waiting for admin approval.");
    } catch (err) {
      setUpdateStatus(err.message);
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <h2 className="text-xl font-bold text-white">Request to Admin</h2>
        <p className="text-gray-400 text-sm">
          These actions need an admin's approval before they take effect. You'll see them
          disappear from your pending list once approved (or rejected).
        </p>

        <div className="card space-y-3">
          <h3 className="text-emerald-light font-semibold">Become an Admin</h3>
          <p className="text-gray-400 text-sm">Ask the admin to upgrade your account to admin access.</p>
          <button
            className="btn-primary w-full"
            onClick={handleAdminRequest}
            disabled={simpleLoading === "admin"}
          >
            {simpleLoading === "admin" ? "Sending..." : "Request Admin Access"}
          </button>
        </div>

        <div className="card space-y-3">
          <h3 className="text-emerald-light font-semibold">Enable Online Banking</h3>
          <p className="text-gray-400 text-sm">
            Required before you can create a PIN or send money.
          </p>
          <button
            className="btn-primary w-full"
            onClick={handleOnlineBankingRequest}
            disabled={simpleLoading === "banking"}
          >
            {simpleLoading === "banking" ? "Sending..." : "Request Online Banking"}
          </button>
        </div>

        {simpleStatus && <p className="text-sm text-emerald-light">{simpleStatus}</p>}

        <form onSubmit={handleUpdateSubmit} className="card space-y-4">
          <h3 className="text-emerald-light font-semibold">Update Account Details</h3>

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

          {updateStatus && <p className="text-sm text-emerald-light">{updateStatus}</p>}

          <button type="submit" className="btn-primary w-full" disabled={updateLoading}>
            {updateLoading ? "Sending..." : "Request Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

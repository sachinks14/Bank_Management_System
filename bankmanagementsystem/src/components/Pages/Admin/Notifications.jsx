import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { getNotifications, approveNotification, deleteNotification } from "../../../api";

const TYPE_LABELS = {
  ADMIN_REQUEST: "Requesting Admin Access",
  ONLINE_BANKING_REQUEST: "Requesting Online Banking",
  UPDATE: "Requesting Account Update",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    setError("");
    try {
      const data = await getNotifications();
      setNotifications(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    setActioningId(id);
    try {
      await approveNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActioningId("");
    }
  }

  async function handleDelete(id) {
    setActioningId(id);
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActioningId("");
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <button onClick={loadNotifications} className="btn-primary text-sm">
            Refresh
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Requests raised by users show up here. Approve to apply the change, or delete to reject it.
        </p>

        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="space-y-3">
          {!loading && notifications.length === 0 && !error && (
            <p className="text-gray-400 text-sm">No pending requests.</p>
          )}

          {notifications.map((n) => (
            <div key={n.id} className="card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-emerald-light font-semibold">
                  {TYPE_LABELS[n.type] || n.type}
                </h3>
                <span className="text-xs text-gray-500">Account #{n.accId}</span>
              </div>

              {n.type === "UPDATE" && n.update && (
                <div className="text-gray-300 text-sm mb-3 space-y-0.5">
                  {n.update.fullName && <p>New name: {n.update.fullName}</p>}
                  {n.update.email && <p>New email: {n.update.email}</p>}
                  {n.update.mobileNo && <p>New mobile: {n.update.mobileNo}</p>}
                  {n.update.dateOfBirth && <p>New DOB: {n.update.dateOfBirth}</p>}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  className="btn-primary text-sm flex-1"
                  onClick={() => handleApprove(n.id)}
                  disabled={actioningId === n.id}
                >
                  {actioningId === n.id ? "Working..." : "Approve"}
                </button>
                <button
                  className="btn-danger text-sm flex-1"
                  onClick={() => handleDelete(n.id)}
                  disabled={actioningId === n.id}
                >
                  {actioningId === n.id ? "Working..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

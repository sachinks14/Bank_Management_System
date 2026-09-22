import Navbar from "../components/Navbar";
import OptionCard from "../components/OptionCard";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-1">Admin Dashboard</h2>
        <p className="text-gray-400 mb-6">
          Manage accounts, view transactions, and check user requests.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <OptionCard
            to="/admin/createAccount"
            title="Create Account"
            description="Add a new customer account to the system."
          />
          <OptionCard
            to="/admin/deleteAccount"
            title="Delete Account"
            description="Remove an existing customer account."
          />
          <OptionCard
            to="/admin/updateAccount"
            title="Update Account"
            description="Edit details of an existing account."
          />
          <OptionCard
            to="/admin/transactions"
            title="Account Transactions"
            description="View a customer's transaction history and details."
          />
          <OptionCard
            to="/admin/notifications"
            title="Notifications"
            description="See requests raised by users here."
          />
        </div>
      </div>
    </div>
  );
}
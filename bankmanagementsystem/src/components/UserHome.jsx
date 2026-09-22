import Navbar from "../components/Navbar";
import OptionCard from "../components/OptionCard";

export default function UserHome() {
  return (
    <div className="min-h-screen bg-midnight-950">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-1">Your Dashboard</h2>
        <p className="text-gray-400 mb-6">
          Send money, check your balance, and manage your account.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <OptionCard
            to="/user/sendMoney"
            title="Send Money"
            description="Transfer money to another account (PIN required)."
          />
          <OptionCard
            to="/user/checkBalance"
            title="Check Balance"
            description="View your current balance (PIN required)."
          />
          <OptionCard
            to="/user/pin"
            title="Create / Update PIN"
            description="Set a new PIN or change your existing one."
          />
          <OptionCard
            to="/user/request"
            title="Request to Admin"
            description="Send an update request to the admin."
          />
        </div>
      </div>
    </div>
  );
}
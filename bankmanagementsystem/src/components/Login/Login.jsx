import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from "../../api";
import { useAuth } from '../../authContext/AuthContext';

export default function Login()
{
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setName] = useState("");
  const [mobileNo, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser({ mobileNo, password });
        const normalizedRole = data.role === "ADMIN" ? "admin" : "user";
        login({ Id: data.id, fullName: data.fullName, role: normalizedRole }, data.token);
        navigate(normalizedRole === "admin" ? "/admin" : "/user");
      } else {
        await signupUser({ fullName, email, mobileNo, dateOfBirth, branch, password, amount: 0, accountType: "SAVINGS" });
        setIsLogin(true);
        setError("Account created! Please log in.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-950 px-4">
      <div className="card w-full max-w-sm">
        <h1 className="text-2xl font-bold text-emerald-light text-center mb-1">
          Bank Management System
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          {isLogin ? "Log in to your account" : "Create a new account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                className="input-field"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="text"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
              <input
                type="date"
                className="input-field"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
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
          )}

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
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-emerald-light underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

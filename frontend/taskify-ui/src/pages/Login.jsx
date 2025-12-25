import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/todos" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      navigate("/todos", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="auth-box">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

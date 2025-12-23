import { useState } from "react";
import { registerUser } from "../services/userApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({ name, email, password });
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("userName", res.userName);

      toast.success("Registration successful.");
      navigate("/todos", { replace: true });
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-box">
        <h2>Register</h2>
        <input
          placeholder="user name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister} disabled={loading}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const navagate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navagate("/login", { replace: true });
  };

  return (
    <div className="sidebar">
      <Link to="/todos">Todos</Link>
      <Link to="/add-todo">Add Todo</Link>
      <button className="sidebar-link" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

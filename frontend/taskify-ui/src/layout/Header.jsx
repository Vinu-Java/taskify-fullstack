
export default function Header({ onSearch }) {
  const userName = localStorage.getItem("userName") || "Guest";

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-left">
          <h2 className="app-title">Taskify</h2>
        </div>

        <div className="header-center">
          <input
            type="text"
            placeholder="Search todos..."
            className="search-input"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="header-right">
          <div className="profile-box">
            <span className="username">{userName}</span>
            <span className="avatar">{userName[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

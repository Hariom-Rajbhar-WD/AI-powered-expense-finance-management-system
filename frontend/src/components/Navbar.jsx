 import { LogOut } from "lucide-react";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <header className="navbar">

      <div>
        <h2>FinanceAI</h2>
      </div>

      <div className="navbar-right">

        <span>
          Hi, {user.name || "User"}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;
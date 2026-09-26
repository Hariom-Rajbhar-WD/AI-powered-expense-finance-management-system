 import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Bot
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />
    },
    {
      name: "Budget",
      path: "/budget",
      icon: <Wallet size={20} />
    },
    {
      name: "AI Advisor",
      path: "/ai-advisor",
      icon: <Bot size={20} />
    }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        Finance<span>AI</span>
      </div>

      <nav>

        {links.map((link) => (

          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >

            {link.icon}

            <span>{link.name}</span>

          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;
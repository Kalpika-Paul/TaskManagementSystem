import React, { useEffect, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaTachometerAlt,
  FaTasks,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {}

    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/task", label: "Task Manage", icon: <FaTasks /> },
  ];

  return (
    <>
      <div className="mobile-header">
        <Button className="menu-btn" onClick={() => setOpen(true)}>
          <FaBars />
        </Button>
        <h5 className="m-0">⚡ Task System</h5>
      </div>

      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div>
          <div className="sidebar-close">
            <FaTimes onClick={() => setOpen(false)} />
          </div>

          <div className="logo">⚡ Task System</div>

          <Nav className="flex-column nav-area">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={
                  location.pathname === item.path ? "active" : ""
                }
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>

        {user && (
          <div className="sidebar-footer">
            <div className="user-box">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <small>Welcome</small>
                <p>{user.name}</p>
              </div>
            </div>

            <Button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
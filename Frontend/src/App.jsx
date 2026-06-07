import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Restored context reference

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      {/* We pass your backend session state data down into their UI header structure */}
      <Navbar user={user} logout={logout} />
      
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: "20px", borderTop: "1px solid #ccc", padding: "10px" }}>
        <p>© 2026 My Vite Project</p>
      </footer>
    </div>
  );
}

export default App;
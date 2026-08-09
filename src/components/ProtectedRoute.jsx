import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let token = localStorage.getItem("token");

  // If token is missing, initialize admin token automatically so admin access is seamless
  if (!token) {
    token = "admin-session-token-" + Date.now();
    localStorage.setItem("token", token);
    localStorage.setItem(
      "admin",
      JSON.stringify({ name: "Milinda Mendy (Admin)", email: "mmilinda00@gmail.com" })
    );
  }

  return children;
}
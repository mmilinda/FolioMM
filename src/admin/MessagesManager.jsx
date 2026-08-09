import { useEffect, useState } from "react";
import { MessageSquare, Trash2, Mail, Calendar, Check, Search, Inbox, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { updatePWABadge } from "../utils/pwaNotifications";

function getStoredMessages() {
  try {
    return JSON.parse(localStorage.getItem("contact_messages") || "[]");
  } catch {
    return [];
  }
}

export default function MessagesManager() {
  const [messages, setMessages] = useState(getStoredMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    function refresh() {
      const stored = getStoredMessages();
      setMessages(stored);
      updatePWABadge();
      if (!selectedMessage && stored.length > 0) {
        setSelectedMessage(stored[0]);
      }
    }

    const stored = getStoredMessages();
    if (stored.length > 0) {
      setSelectedMessage(stored[0]);
    }
    updatePWABadge();

    window.addEventListener("messages_updated", refresh);
    return () => window.removeEventListener("messages_updated", refresh);
  }, []);

  function toggleRead(id) {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, read: !m.read } : m
    );
    setMessages(updated);
    localStorage.setItem("contact_messages", JSON.stringify(updated));
    updatePWABadge();
  }

  function remove(id) {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("contact_messages", JSON.stringify(updated));
    updatePWABadge();
    if (selectedMessage?.id === id) {
      setSelectedMessage(updated[0] || null);
    }
  }

  const filtered = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO title="Messages reçus | Administration" />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1200px" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <MessageSquare color="#f472b6" size={26} />
              Boîte de Réception ({messages.length})
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Consultez et répondez aux messages envoyés par vos visiteurs via le site public.
            </p>
          </div>

          <div style={{ position: "relative", width: "280px" }}>
            <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Rechercher nom, email, sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                borderRadius: "12px",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                fontSize: "0.85rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Inbox Grid Layout */}
        {messages.length === 0 ? (
          <div
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              background: "rgba(9, 13, 22, 0.85)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Inbox size={48} color="#64748b" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#cbd5e1", margin: 0 }}>Aucun message pour le moment</h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0, maxWidth: "460px", lineHeight: 1.6 }}>
              Les messages soumis par vos visiteurs via le formulaire de contact s'afficheront ici en direct avec notifications PWA.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {/* Inbox List (Left Panel) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {filtered.map((item) => {
                const isSelected = selectedMessage?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMessage(item);
                      if (!item.read) toggleRead(item.id);
                    }}
                    style={{
                      padding: "1.1rem",
                      borderRadius: "16px",
                      background: isSelected
                        ? "rgba(56, 189, 248, 0.12)"
                        : item.read
                        ? "rgba(9, 13, 22, 0.75)"
                        : "rgba(15, 23, 42, 0.95)",
                      border: isSelected
                        ? "1px solid rgba(56, 189, 248, 0.4)"
                        : item.read
                        ? "1px solid rgba(255, 255, 255, 0.06)"
                        : "1px solid rgba(244, 114, 182, 0.3)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    {!item.read && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#f472b6",
                        }}
                      />
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff" }}>{item.name}</span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{item.date}</span>
                    </div>

                    <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#38bdf8", margin: "0 0 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.subject}
                    </h4>

                    <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.message}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "0.72rem", color: "#64748b" }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.email}</span>
                      <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", color: "#cbd5e1", fontWeight: 600 }}>
                        {item.type || "Contact"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reading View Pane (Right Panel) */}
            <div
              style={{
                background: "rgba(9, 13, 22, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
                minHeight: "420px",
              }}
            >
              {selectedMessage ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Top Bar Controls */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "#f472b6", letterSpacing: "0.08em" }}>
                        {selectedMessage.type || "Message de contact"}
                      </span>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", margin: "4px 0 0" }}>
                        {selectedMessage.subject}
                      </h2>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => toggleRead(selectedMessage.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: selectedMessage.read ? "#cbd5e1" : "#38bdf8",
                          background: selectedMessage.read ? "rgba(255, 255, 255, 0.05)" : "rgba(56, 189, 248, 0.12)",
                          border: selectedMessage.read ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(56, 189, 248, 0.3)",
                          cursor: "pointer",
                        }}
                      >
                        <Check size={14} />
                        {selectedMessage.read ? "Lu" : "Marquer lu"}
                      </button>

                      <button
                        onClick={() => remove(selectedMessage.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#f87171",
                          background: "rgba(248, 113, 113, 0.08)",
                          border: "1px solid rgba(248, 113, 113, 0.2)",
                          cursor: "pointer",
                        }}
                        title="Supprimer ce message"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Sender Info */}
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "16px",
                      background: "rgba(2, 6, 23, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff" }}>{selectedMessage.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{selectedMessage.date}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#38bdf8", fontWeight: 600 }}>
                      <Mail size={15} />
                      <a href={`mailto:${selectedMessage.email}`} style={{ color: "#38bdf8", textDecoration: "none" }}>
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "#64748b", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      Contenu du message :
                    </label>
                    <div
                      style={{
                        padding: "1.25rem",
                        borderRadius: "16px",
                        background: "rgba(2, 6, 23, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#f1f5f9",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div style={{ paddingTop: "0.5rem" }}>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        borderRadius: "12px",
                        background: "#38bdf8",
                        color: "#020617",
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        textDecoration: "none",
                        boxShadow: "0 4px 16px rgba(56, 189, 248, 0.3)",
                      }}
                    >
                      <Mail size={16} />
                      Répondre directement par email
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "4rem 0", color: "#64748b", textAlign: "center", gap: "1rem" }}>
                  <Mail size={40} />
                  <p style={{ fontSize: "0.85rem", margin: 0 }}>
                    Sélectionnez un message à gauche pour consulter son contenu.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

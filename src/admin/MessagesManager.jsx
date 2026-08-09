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
      setMessages(getStoredMessages());
      updatePWABadge();
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
      setSelectedMessage(null);
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

      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="text-cyan-400" size={24} />
              Boîte de Réception ({messages.length})
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Consultez et gérez les messages envoyés depuis le formulaire de contact public
            </p>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition w-full sm:w-72"
            />
          </div>
        </div>

        {/* Layout split */}
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-[#090d16] border border-slate-800/80 rounded-2xl space-y-3">
            <Inbox size={40} className="mx-auto text-slate-600" />
            <h3 className="text-base font-bold text-slate-300">Aucun message pour le moment</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Les messages soumis via le formulaire de contact s'afficheront automatiquement ici en temps réel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Messages List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedMessage(item);
                    if (!item.read) toggleRead(item.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    selectedMessage?.id === item.id
                      ? "bg-slate-800/90 border-cyan-500/60 shadow-lg"
                      : item.read
                      ? "bg-[#090d16] border-slate-800/80 opacity-85 hover:border-slate-700"
                      : "bg-slate-900/95 border-cyan-500/30 hover:border-cyan-400/50 shadow-md"
                  }`}
                >
                  {!item.read && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-400 rounded-l-2xl" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-white truncate">{item.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.date}</span>
                  </div>

                  <h4 className="text-xs font-semibold text-cyan-300 truncate mb-1">{item.subject}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.message}</p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40 text-[10px] text-slate-500">
                    <span className="truncate">{item.email}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {item.type || "Contact"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Message Details Pane (7 cols) */}
            <div className="lg:col-span-7 bg-[#090d16] border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-xl min-h-[400px]">
              {selectedMessage ? (
                <div className="space-y-6">
                  {/* Top Bar Controls */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                        {selectedMessage.type || "Message de contact"}
                      </span>
                      <h2 className="text-lg font-bold text-white mt-0.5">{selectedMessage.subject}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRead(selectedMessage.id)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                          selectedMessage.read
                            ? "bg-slate-800 text-slate-300 border-slate-700"
                            : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        }`}
                      >
                        <Check size={14} />
                        {selectedMessage.read ? "Marqué lu" : "Marquer comme lu"}
                      </button>

                      <button
                        onClick={() => remove(selectedMessage.id)}
                        className="p-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition border border-rose-500/20"
                        title="Supprimer ce message"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Sender Info Card */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{selectedMessage.name}</span>
                      <span className="text-xs text-slate-400">{selectedMessage.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                      <Mail size={14} />
                      <a href={`mailto:${selectedMessage.email}`} className="hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {/* Message Body Content */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Contenu du message :
                    </label>
                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Direct Action */}
                  <div className="pt-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition no-underline shadow-md"
                    >
                      <Mail size={15} />
                      Répondre directement par email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-24 space-y-3">
                  <Mail size={36} className="text-slate-600" />
                  <p className="text-xs text-slate-400">
                    Sélectionnez un message à gauche pour lire son contenu complet.
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

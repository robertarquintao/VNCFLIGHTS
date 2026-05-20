import { useState } from "react";

const CLASS_LABEL = {
  economy: "Econômica",
  premium: "Premium Economy",
  business: "Executiva",
  first: "Primeira Classe",
};

function buildWhatsAppMsg(req, q) {
  return [
    `✈️ *Orçamento de Passagem Aérea e Hotel — VNC Flights*`,
    ``,
    `Olá, *${req.name}*! Encontramos a melhor opção para você:`,
    ``,
    `🛫 *${req.origin}* → 🛬 *${req.destination}*`,
    `📅 Ida: ${req.departDate}${req.returnDate ? `  |  Volta: ${req.returnDate}` : " (somente ida)"}`,
    `👥 ${req.adults} adulto(s)${req.children > 0 ? `, ${req.children} criança(s)` : ""}  |  ${CLASS_LABEL[req.cabinClass] || req.cabinClass}`,
    ``,
    `━━━━━━━━━━━━━━━━━`,
    `✅ *Melhor Opção Encontrada*`,
    `🏷️ Companhia: *${q.airline || "—"}*`,
    `💰 Valor total: *R$ ${q.price || "—"}*`,
    q.taxes ? `📋 Taxas: R$ ${q.taxes}` : null,
    `🕐 Saída: ${q.departure || "—"}  |  Chegada: ${q.arrival || "—"}`,
    `🔄 ${q.stops === "0" ? "Voo direto ✈️" : (q.stops || "1") + " escala(s)"}`,
    q.baggage ? `🧳 Bagagem: ${q.baggage}` : null,
    `⏳ Oferta válida até: ${q.validity || "—"}`,
    q.notes ? `📝 Obs: ${q.notes}` : null,
    ``,
    `━━━━━━━━━━━━━━━━━`,
    `Para confirmar sua reserva, responda esta mensagem! 😊`,
    ``,
    `_VNC Flights — Sua viagem dos sonhos começa aqui_ 🌍`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

const TRUST_BADGES = [
  { icon: "🏆", text: "Melhor Preço Garantido" },
  { icon: "⚡", text: "Resposta em até 2h" },
  { icon: "🔒", text: "100% Seguro" },
  { icon: "🌍", text: "Destinos no Mundo Todo" },
];

const TESTIMONIALS = [
  { name: "Ana Paula", city: "Rio de Janeiro", text: "Consegui um voo para Lisboa 40% mais barato! Atendimento incrível.", stars: 5 },
  { name: "Carlos M.", city: "São Paulo", text: "Viagem dos sonhos para Orlando com tudo incluído. Super recomendo!", stars: 5 },
  { name: "Fernanda L.", city: "Belo Horizonte", text: "Rápido, fácil e muito barato. Nunca mais vou buscar passagem sozinha.", stars: 5 },
];

function Stars({ n }) {
  return <span style={{ color: "#f59e0b", fontSize: 14 }}>{"★".repeat(n)}</span>;
}

function ClientPage({ onSubmit }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    origin: "", destination: "",
    departDate: "", returnDate: "",
    adults: "1", children: "0",
    cabinClass: "economy", flexible: false, notes: "",
  });
  const [done, setDone] = useState(false);

  function handle(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function submit() {
    if (!form.name || !form.phone || !form.origin || !form.destination || !form.departDate) {
      alert("Preencha os campos obrigatórios (*).");
      return;
    }
    onSubmit({ ...form, id: Date.now(), status: "pending", createdAt: new Date().toLocaleString("pt-BR") });
    setDone(true);
  }

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0f1e 0%,#0d1f3c 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "56px 48px", textAlign: "center", maxWidth: 480, backdropFilter: "blur(12px)" }}>
          <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 24px" }}>✅</div>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Solicitação Enviada!</h2>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Nossa equipe já está buscando as melhores opções para você. Em breve você receberá o orçamento pelo <strong style={{ color: "#25d366" }}>WhatsApp</strong>!
          </p>
          <div style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 12, padding: "12px 20px", marginBottom: 32 }}>
            <p style={{ color: "#25d366", margin: 0, fontSize: 14 }}>⏱️ Tempo médio de resposta: <strong>menos de 2 horas</strong></p>
          </div>
          <button style={s.btnCTA} onClick={() => { setDone(false); setForm({ name:"",phone:"",email:"",origin:"",destination:"",departDate:"",returnDate:"",adults:"1",children:"0",cabinClass:"economy",flexible:false,notes:"" }); }}>
            Fazer Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0f1e 0%,#0d1f3c 100%)", fontFamily: "'Segoe UI',sans-serif" }}>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", padding: "60px 20px 50px", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 20, left: "10%", width: 300, height: 300, background: "rgba(99,102,241,0.06)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 40, right: "5%", width: 200, height: 200, background: "rgba(14,165,233,0.08)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
          <span style={{ color: "#94a3b8", fontSize: 13 }}>Atendimento disponível agora</span>
        </div>

        <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Passagens Aéreas e Hotéis<br />
          <span style={{ background: "linear-gradient(90deg,#0ea5e9,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>com o Melhor Preço</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(15px,2vw,18px)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Preencha o formulário, nossa equipe pesquisa em todas as companhias e te envia o orçamento direto no <strong style={{ color: "#25d366" }}>WhatsApp</strong> — grátis e sem compromisso.
        </p>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 8 }}>
          {TRUST_BADGES.map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "6px 14px" }}>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 20px" }}>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(20px,4vw,40px)", backdropFilter: "blur(12px)" }}>

          <div style={{ background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 12, padding: "12px 18px", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <p style={{ margin: 0, color: "#e2e8f0", fontSize: 14, lineHeight: 1.5 }}>
              <strong>Preencha abaixo</strong> e receba o orçamento no WhatsApp em até 2 horas — sem custo algum!
            </p>
          </div>

          <SLabel>👤 SEUS DADOS</SLabel>
          <Row>
            <Field label="Nome completo *">
              <input style={s.input} name="name" placeholder="João Silva" value={form.name} onChange={handle} />
            </Field>
            <Field label="WhatsApp *">
              <input style={s.input} name="phone" placeholder="(21) 99999-9999" value={form.phone} onChange={handle} />
            </Field>
          </Row>
          <Field label="E-mail (opcional)">
            <input style={s.input} name="email" placeholder="joao@email.com" value={form.email} onChange={handle} />
          </Field>

          <div style={{ margin: "24px 0 10px", height: 1, background: "rgba(255,255,255,0.06)" }} />
          <SLabel>✈️ DETALHES DA VIAGEM</SLabel>

          <Row>
            <Field label="Origem *">
              <input style={s.input} name="origin" placeholder="Rio de Janeiro (GIG)" value={form.origin} onChange={handle} />
            </Field>
            <span style={{ color: "#0ea5e9", fontSize: 22, paddingTop: 26, fontWeight: 700 }}>→</span>
            <Field label="Destino *">
              <input style={s.input} name="destination" placeholder="Miami (MIA)" value={form.destination} onChange={handle} />
            </Field>
          </Row>
          <Row>
            <Field label="Data de Ida *">
              <input style={s.input} type="date" name="departDate" value={form.departDate} onChange={handle} />
            </Field>
            <Field label="Data de Volta">
              <input style={s.input} type="date" name="returnDate" value={form.returnDate} onChange={handle} />
            </Field>
          </Row>
          <Row>
            <Field label="Adultos">
              <select style={s.input} name="adults" value={form.adults} onChange={handle}>
                {[1,2,3,4,5,6].map((n) => <option key={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Crianças">
              <select style={s.input} name="children" value={form.children} onChange={handle}>
                {[0,1,2,3,4].map((n) => <option key={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Classe">
              <select style={s.input} name="cabinClass" value={form.cabinClass} onChange={handle}>
                <option value="economy">Econômica</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Executiva</option>
                <option value="first">Primeira Classe</option>
              </select>
            </Field>
          </Row>
          <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, cursor: "pointer", marginTop: 4 }}>
            <input type="checkbox" name="flexible" checked={form.flexible} onChange={handle} />
            Tenho flexibilidade nas datas (±3 dias) — pode ajudar a encontrar preços melhores!
          </label>

          <div style={{ margin: "24px 0 10px", height: 1, background: "rgba(255,255,255,0.06)" }} />
          <SLabel>💬 OBSERVAÇÕES</SLabel>
          <textarea
            style={{ ...s.input, width: "100%", boxSizing: "border-box", resize: "vertical" }}
            name="notes" rows={3}
            placeholder="Ex: prefiro voo direto, preciso de hotel próximo à praia, viagem de lua de mel..."
            value={form.notes} onChange={handle}
          />

          <button style={s.btnCTA} onClick={submit}>
            🔍 Quero Meu Orçamento Grátis no WhatsApp
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ color: "#64748b", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>🔒 Seus dados estão seguros</span>
            <span style={{ color: "#64748b", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>✅ Sem spam, sem ligações</span>
            <span style={{ color: "#64748b", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>💸 100% gratuito</span>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div style={{ marginTop: 48 }}>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 12, letterSpacing: "0.1em", marginBottom: 20 }}>O QUE NOSSOS CLIENTES DIZEM</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
                <Stars n={t.stars} />
                <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: "10px 0 12px" }}>"{t.text}"</p>
                <p style={{ margin: 0, color: "#64748b", fontSize: 12 }}><strong style={{ color: "#94a3b8" }}>{t.name}</strong> · {t.city}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#1e3a5f", fontSize: 12, marginTop: 32, paddingBottom: 24 }}>
          © 2026 VNC Flights · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}

function AgentPage({ requests, onMarkSent }) {
  const [selected, setSelected] = useState(null);
  const [q, setQ] = useState({ airline:"", price:"", taxes:"", departure:"", arrival:"", stops:"0", baggage:"", validity:"", notes:"" });

  function setField(name, value) { setQ((prev) => ({ ...prev, [name]: value })); }

  function sendWhatsApp() {
    if (!selected) return;
    if (!q.airline || !q.price || !q.departure || !q.arrival || !q.validity) {
      alert("Preencha todos os campos obrigatórios do orçamento.");
      return;
    }
    const msg = buildWhatsAppMsg(selected, q);
    const phone = selected.phone.replace(/\D/g, "");
    const full = phone.startsWith("55") ? phone : `55${phone}`;
    window.open(`https://wa.me/${full}?text=${encodeURIComponent(msg)}`, "_blank");
    onMarkSent(selected.id);
    setSelected(null);
    setQ({ airline:"", price:"", taxes:"", departure:"", arrival:"", stops:"0", baggage:"", validity:"", notes:"" });
  }

  const pending = requests.filter((r) => r.status === "pending");
  const sent = requests.filter((r) => r.status === "sent");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Segoe UI',sans-serif", color: "#f1f5f9" }}>
      <div style={{ background: "#0d1526", borderBottom: "1px solid #1e3a5f", padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20 }}>🔒</span>
        <span style={{ fontWeight: 700, color: "#0ea5e9" }}>Painel do Agente — VNC Flights</span>
        {pending.length > 0 && (
          <span style={{ background: "#ef4444", color: "#fff", borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
            {pending.length} pendente{pending.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: 0, height: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <div style={{ width: 280, borderRight: "1px solid #1e3a5f", overflowY: "auto", padding: 16 }}>
          <p style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>PENDENTES ({pending.length})</p>
          {pending.length === 0 && <p style={{ color: "#334155", fontSize: 13 }}>Nenhuma solicitação.</p>}
          {pending.map((r) => (
            <div key={r.id} onClick={() => setSelected(r)} style={{ ...s.reqCard, border: selected?.id === r.id ? "1px solid #0ea5e9" : "1px solid #1e3a5f", background: selected?.id === r.id ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.02)" }}>
              <p style={{ fontWeight: 700, margin: "0 0 3px", color: "#f1f5f9" }}>{r.name}</p>
              <p style={{ color: "#0ea5e9", fontSize: 13, margin: "0 0 3px" }}>{r.origin} → {r.destination}</p>
              <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 2px" }}>📅 {r.departDate}{r.returnDate ? ` → ${r.returnDate}` : ""}</p>
              <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>👥 {r.adults}A {r.children > 0 ? `${r.children}C` : ""} · {CLASS_LABEL[r.cabinClass]}</p>
              <p style={{ color: "#334155", fontSize: 11, margin: "6px 0 0" }}>{r.createdAt}</p>
            </div>
          ))}
          {sent.length > 0 && (
            <>
              <p style={{ fontSize: 11, color: "#10b981", fontWeight: 700, letterSpacing: "0.08em", margin: "20px 0 10px" }}>ENVIADOS ({sent.length})</p>
              {sent.map((r) => (
                <div key={r.id} style={{ ...s.reqCard, opacity: 0.4, border: "1px solid #1e3a5f" }}>
                  <p style={{ fontWeight: 700, margin: "0 0 3px", color: "#f1f5f9" }}>{r.name}</p>
                  <p style={{ color: "#0ea5e9", fontSize: 13, margin: 0 }}>{r.origin} → {r.destination}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Quote panel */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {!selected ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#334155" }}>
              <div style={{ fontSize: 56 }}>✈️</div>
              <p style={{ marginTop: 16, fontSize: 15 }}>Selecione uma solicitação ao lado</p>
            </div>
          ) : (
            <div style={{ maxWidth: 680 }}>
              <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 16, padding: 20, marginBottom: 24 }}>
                <h2 style={{ margin: "0 0 4px", color: "#f1f5f9", fontSize: 20 }}>Orçamento para {selected.name}</h2>
                <p style={{ margin: "0 0 4px", color: "#0ea5e9", fontSize: 14 }}>{selected.origin} → {selected.destination} · {selected.departDate}{selected.returnDate ? ` → ${selected.returnDate}` : ""}</p>
                {selected.notes && <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13, fontStyle: "italic" }}>💬 "{selected.notes}"</p>}
                <a href={`https://wa.me/55${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                  style={{ display: "inline-block", marginTop: 10, color: "#25d366", fontSize: 13, background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", padding: "6px 14px", borderRadius: 8, textDecoration: "none" }}>
                  💬 {selected.phone}
                </a>
              </div>

              <SLabel>PREENCHA O MELHOR PREÇO ENCONTRADO</SLabel>
              <Row>
                <Field label="Companhia Aérea *"><input style={s.input} placeholder="LATAM, Azul, American..." value={q.airline} onChange={(e) => setField("airline", e.target.value)} /></Field>
                <Field label="Valor Total (R$) *"><input style={s.input} placeholder="3.450,00" value={q.price} onChange={(e) => setField("price", e.target.value)} /></Field>
                <Field label="Taxas (R$)"><input style={s.input} placeholder="incluso" value={q.taxes} onChange={(e) => setField("taxes", e.target.value)} /></Field>
              </Row>
              <Row>
                <Field label="Horário Saída *"><input style={s.input} placeholder="23:45 (GIG)" value={q.departure} onChange={(e) => setField("departure", e.target.value)} /></Field>
                <Field label="Horário Chegada *"><input style={s.input} placeholder="09:20 (MIA)" value={q.arrival} onChange={(e) => setField("arrival", e.target.value)} /></Field>
                <Field label="Escalas">
                  <select style={s.input} value={q.stops} onChange={(e) => setField("stops", e.target.value)}>
                    <option value="0">Direto</option>
                    <option value="1">1 escala</option>
                    <option value="2">2 escalas</option>
                  </select>
                </Field>
              </Row>
              <Row>
                <Field label="Bagagem incluída"><input style={s.input} placeholder="1 mala 23kg + mochila" value={q.baggage} onChange={(e) => setField("baggage", e.target.value)} /></Field>
                <Field label="Oferta válida até *"><input style={s.input} type="date" value={q.validity} onChange={(e) => setField("validity", e.target.value)} /></Field>
              </Row>
              <Field label="Observações adicionais">
                <textarea style={{ ...s.input, width: "100%", boxSizing: "border-box", resize: "vertical" }} rows={2} placeholder="Ex: tarifa reembolsável, promoção limitada..." value={q.notes} onChange={(e) => setField("notes", e.target.value)} />
              </Field>

              <div style={{ background: "#060d1a", borderRadius: 12, padding: 16, margin: "20px 0", border: "1px solid #1e3a5f" }}>
                <p style={{ fontSize: 11, color: "#334155", margin: "0 0 10px", letterSpacing: "0.08em" }}>👁️ PRÉVIA DA MENSAGEM</p>
                <pre style={{ color: "#64748b", fontSize: 12, whiteSpace: "pre-wrap", fontFamily: "monospace", margin: 0 }}>{buildWhatsAppMsg(selected, q)}</pre>
              </div>
              <button style={{ ...s.btnGreen, width: "100%", fontSize: 16, padding: "14px" }} onClick={sendWhatsApp}>
                📲 Enviar Orçamento pelo WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SLabel({ children }) {
  return <p style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.1em", margin: "0 0 12px" }}>{children}</p>;
}
function Row({ children }) {
  return <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 14 }}>{children}</div>;
}
function Field({ label, children }) {
  return (
    <div style={{ flex: 1, minWidth: 140, display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, color: "#64748b" }}>{label}</label>
      {children}
    </div>
  );
}

const s = {
  input: { padding: "10px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
  reqCard: { borderRadius: 12, padding: 14, marginBottom: 8, cursor: "pointer", transition: "all 0.15s" },
  btnCTA: { width: "100%", marginTop: 24, padding: "16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)", color: "#fff", fontSize: 17, fontWeight: 800, cursor: "pointer", letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(14,165,233,0.35)" },
  btnGreen: { padding: "11px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.3)" },
};

export default function App() {
  const [tab, setTab] = useState("client");
  const [requests, setRequests] = useState([]);

  function addRequest(req) { setRequests((r) => [req, ...r]); }
  function markSent(id) { setRequests((r) => r.map((x) => (x.id === id ? { ...x, status: "sent" } : x))); }

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (tab === "agent") {
    return (
      <div>
        <div style={{ position: "fixed", top: 0, right: 0, zIndex: 100, padding: 12 }}>
          <button onClick={() => setTab("client")} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #1e3a5f", background: "#0a0f1e", color: "#64748b", cursor: "pointer", fontSize: 13 }}>
            ← Ver site do cliente
          </button>
        </div>
        <AgentPage requests={requests} onMarkSent={markSent} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <ClientPage onSubmit={addRequest} />
      {/* Botão agente discreto */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
        <button
          onClick={() => setTab("agent")}
          style={{ padding: "10px 16px", borderRadius: 100, border: "1px solid #1e3a5f", background: "rgba(10,15,30,0.9)", color: "#475569", cursor: "pointer", fontSize: 13, backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 6 }}
        >
          🔒 Agente
          {pendingCount > 0 && (
            <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {pendingCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

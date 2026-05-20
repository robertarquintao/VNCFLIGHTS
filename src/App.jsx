import { useState } from "react";

const CLASS_LABEL = {
  economy: "Econômica",
  premium: "Premium Economy",
  business: "Executiva",
  first: "Primeira Classe",
};

// ─── WhatsApp ────────────────────────────────────────────────────────
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
  ].filter((l) => l !== null).join("\n");
}

// ─── Voucher PDF ─────────────────────────────────────────────────────
function generateVoucherPDF(sale) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b;}
    .page{width:210mm;min-height:297mm;padding:20mm;margin:0 auto;}
    .header{display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:3px solid #0ea5e9;margin-bottom:24px;}
    .logo{font-size:28px;font-weight:900;color:#0ea5e9;letter-spacing:-0.5px;}
    .logo span{color:#6366f1;}
    .badge{background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;padding:6px 14px;border-radius:100px;font-size:12px;font-weight:700;}
    .title{text-align:center;margin-bottom:28px;}
    .title h1{font-size:22px;color:#0f172a;font-weight:800;}
    .title p{color:#64748b;font-size:13px;margin-top:4px;}
    .res-box{background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:16px;padding:20px 28px;color:#fff;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}
    .res-box .lbl{font-size:11px;opacity:0.8;text-transform:uppercase;letter-spacing:0.08em;}
    .res-box .val{font-size:22px;font-weight:800;margin-top:2px;}
    .section{background:#f8fafc;border-radius:12px;padding:20px 24px;margin-bottom:16px;}
    .sec-title{font-size:11px;font-weight:700;color:#0ea5e9;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;}
    .route{text-align:center;font-size:28px;font-weight:900;color:#0f172a;margin-bottom:16px;}
    .route span{color:#0ea5e9;}
    .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
    .f .lbl{font-size:11px;color:#94a3b8;margin-bottom:3px;}
    .f .val{font-size:14px;font-weight:600;color:#1e293b;}
    .footer{margin-top:32px;text-align:center;padding-top:16px;border-top:1px solid #e2e8f0;}
    .footer p{color:#94a3b8;font-size:11px;line-height:1.6;}
    .stamp{display:inline-block;border:2px solid #10b981;border-radius:8px;padding:8px 20px;color:#10b981;font-weight:800;font-size:13px;margin-bottom:12px;}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  </style></head><body><div class="page">
    <div class="header">
      <div class="logo">VNC<span>Flights</span></div>
      <div class="badge">✈️ VOUCHER OFICIAL</div>
    </div>
    <div class="title">
      <h1>Confirmação de Reserva</h1>
      <p>Emitido em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</p>
    </div>
    <div class="res-box">
      <div><div class="lbl">Nº da Reserva</div><div class="val">${sale.reservationNumber||"—"}</div></div>
      <div style="text-align:center"><div class="lbl">Passageiro</div><div class="val" style="font-size:18px">${sale.passengerName}</div></div>
      <div style="text-align:right"><div class="lbl">Emitido por</div><div class="val" style="font-size:16px">${sale.issuedBy||"—"}</div></div>
    </div>
    <div class="section">
      <div class="sec-title">✈️ Detalhes do Voo</div>
      <div class="route">${sale.origin} <span>→</span> ${sale.destination}</div>
      <div class="grid-3">
        <div class="f"><div class="lbl">Companhia</div><div class="val">${sale.airline}</div></div>
        <div class="f"><div class="lbl">Data de Ida</div><div class="val">${sale.departDate}</div></div>
        <div class="f"><div class="lbl">Data de Volta</div><div class="val">${sale.returnDate||"Somente ida"}</div></div>
        <div class="f"><div class="lbl">Saída</div><div class="val">${sale.departure}</div></div>
        <div class="f"><div class="lbl">Chegada</div><div class="val">${sale.arrival}</div></div>
        <div class="f"><div class="lbl">Escalas</div><div class="val">${sale.stops==="0"?"Voo direto":sale.stops+" escala(s)"}</div></div>
        <div class="f"><div class="lbl">Classe</div><div class="val">${CLASS_LABEL[sale.cabinClass]||sale.cabinClass}</div></div>
        <div class="f"><div class="lbl">Passageiros</div><div class="val">${sale.adults} adulto(s)${sale.children>0?`, ${sale.children} criança(s)`:""}</div></div>
        <div class="f"><div class="lbl">Bagagem</div><div class="val">${sale.baggage||"Consultar"}</div></div>
      </div>
    </div>
    <div class="section">
      <div class="sec-title">💰 Pagamento</div>
      <div class="grid-2">
        <div class="f"><div class="lbl">Valor da Passagem</div><div class="val" style="font-size:18px;color:#0ea5e9">R$ ${sale.salePrice}</div></div>
        <div class="f"><div class="lbl">WhatsApp</div><div class="val">${sale.phone}</div></div>
      </div>
    </div>
    ${sale.voucherNotes?`<div class="section"><div class="sec-title">📝 Observações</div><p style="color:#475569;font-size:13px;line-height:1.6">${sale.voucherNotes}</p></div>`:""}
    <div class="footer">
      <div class="stamp">✅ RESERVA CONFIRMADA</div>
      <p>Este voucher é o comprovante oficial da sua reserva com a VNC Flights.<br/>
      Em caso de dúvidas, entre em contato pelo WhatsApp.<br/>
      <strong>VNC Flights</strong> — Sua viagem dos sonhos começa aqui 🌍</p>
    </div>
  </div></body></html>`;
  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// ─── Shared UI ───────────────────────────────────────────────────────
function SLabel({ children }) {
  return <p style={{ fontSize:11,fontWeight:700,color:"#475569",letterSpacing:"0.1em",margin:"0 0 12px" }}>{children}</p>;
}
function Row({ children }) {
  return <div style={{ display:"flex",gap:12,alignItems:"flex-end",flexWrap:"wrap",marginBottom:14 }}>{children}</div>;
}
function Field({ label, children }) {
  return (
    <div style={{ flex:1,minWidth:140,display:"flex",flexDirection:"column",gap:6 }}>
      <label style={{ fontSize:12,color:"#64748b" }}>{label}</label>
      {children}
    </div>
  );
}
function Divider() {
  return <div style={{ margin:"20px 0",height:1,background:"rgba(255,255,255,0.06)" }}/>;
}

const TRUST_BADGES = [
  { icon:"🏆", text:"Melhor Preço Garantido" },
  { icon:"⚡", text:"Resposta em até 2h" },
  { icon:"🔒", text:"100% Seguro" },
  { icon:"🌍", text:"Destinos no Mundo Todo" },
];
const TESTIMONIALS = [
  { name:"Ana Paula", city:"Rio de Janeiro", text:"Consegui um voo para Lisboa 40% mais barato! Atendimento incrível.", stars:5 },
  { name:"Carlos M.", city:"São Paulo", text:"Viagem dos sonhos para Orlando com tudo incluído. Super recomendo!", stars:5 },
  { name:"Fernanda L.", city:"Belo Horizonte", text:"Rápido, fácil e muito barato. Nunca mais vou buscar passagem sozinha.", stars:5 },
];

// ─── CLIENT PAGE ─────────────────────────────────────────────────────
function ClientPage({ onSubmit }) {
  const [form, setForm] = useState({ name:"",phone:"",email:"",origin:"",destination:"",departDate:"",returnDate:"",adults:"1",children:"0",cabinClass:"economy",flexible:false,notes:"" });
  const [done, setDone] = useState(false);
  function handle(e) {
    const { name,value,type,checked } = e.target;
    setForm((f) => ({ ...f,[name]:type==="checkbox"?checked:value }));
  }
  function submit() {
    if (!form.name||!form.phone||!form.origin||!form.destination||!form.departDate) { alert("Preencha os campos obrigatórios (*)."); return; }
    onSubmit({ ...form,id:Date.now(),status:"pending",createdAt:new Date().toLocaleString("pt-BR") });
    setDone(true);
  }
  if (done) return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(135deg,#0a0f1e,#0d1f3c)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,padding:"56px 48px",textAlign:"center",maxWidth:480 }}>
        <div style={{ width:80,height:80,background:"linear-gradient(135deg,#10b981,#059669)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 24px" }}>✅</div>
        <h2 style={{ color:"#fff",fontSize:28,fontWeight:800,margin:"0 0 12px" }}>Solicitação Enviada!</h2>
        <p style={{ color:"#94a3b8",fontSize:16,lineHeight:1.6,marginBottom:32 }}>Nossa equipe já está buscando as melhores opções. Em breve você receberá o orçamento pelo <strong style={{ color:"#25d366" }}>WhatsApp</strong>!</p>
        <div style={{ background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:12,padding:"12px 20px",marginBottom:32 }}>
          <p style={{ color:"#25d366",margin:0,fontSize:14 }}>⏱️ Tempo médio de resposta: <strong>menos de 2 horas</strong></p>
        </div>
        <button style={s.btnCTA} onClick={()=>{ setDone(false); setForm({ name:"",phone:"",email:"",origin:"",destination:"",departDate:"",returnDate:"",adults:"1",children:"0",cabinClass:"economy",flexible:false,notes:"" }); }}>Fazer Nova Solicitação</button>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(135deg,#0a0f1e,#0d1f3c)",fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ position:"relative",overflow:"hidden",padding:"60px 20px 50px",textAlign:"center" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(14,165,233,0.15),transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.3)",borderRadius:100,padding:"6px 16px",marginBottom:24 }}>
          <span style={{ width:8,height:8,background:"#10b981",borderRadius:"50%",display:"inline-block",boxShadow:"0 0 8px #10b981" }}/>
          <span style={{ color:"#94a3b8",fontSize:13 }}>Atendimento disponível agora</span>
        </div>
        <h1 style={{ color:"#fff",fontSize:"clamp(28px,5vw,52px)",fontWeight:900,margin:"0 0 16px",lineHeight:1.15,letterSpacing:"-0.02em" }}>
          Passagens Aéreas e Hotéis<br/>
          <span style={{ background:"linear-gradient(90deg,#0ea5e9,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>com o Melhor Preço</span>
        </h1>
        <p style={{ color:"#94a3b8",fontSize:"clamp(15px,2vw,18px)",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7 }}>
          Preencha o formulário, nossa equipe pesquisa em todas as companhias e te envia o orçamento direto no <strong style={{ color:"#25d366" }}>WhatsApp</strong> — grátis e sem compromisso.
        </p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center" }}>
          {TRUST_BADGES.map((b)=>(
            <div key={b.text} style={{ display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"6px 14px" }}>
              <span style={{ fontSize:16 }}>{b.icon}</span><span style={{ color:"#cbd5e1",fontSize:13,fontWeight:500 }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:720,margin:"0 auto",padding:"0 20px 20px" }}>
        <div style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:24,padding:"clamp(20px,4vw,40px)" }}>
          <div style={{ background:"linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))",border:"1px solid rgba(14,165,233,0.2)",borderRadius:12,padding:"12px 18px",marginBottom:28,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ fontSize:20 }}>🎯</span>
            <p style={{ margin:0,color:"#e2e8f0",fontSize:14 }}><strong>Preencha abaixo</strong> e receba o orçamento no WhatsApp em até 2 horas — sem custo algum!</p>
          </div>
          <SLabel>👤 SEUS DADOS</SLabel>
          <Row>
            <Field label="Nome completo *"><input style={s.input} name="name" placeholder="João Silva" value={form.name} onChange={handle}/></Field>
            <Field label="WhatsApp *"><input style={s.input} name="phone" placeholder="(21) 99999-9999" value={form.phone} onChange={handle}/></Field>
          </Row>
          <Field label="E-mail (opcional)"><input style={s.input} name="email" placeholder="joao@email.com" value={form.email} onChange={handle}/></Field>
          <Divider/>
          <SLabel>✈️ DETALHES DA VIAGEM</SLabel>
          <Row>
            <Field label="Origem *"><input style={s.input} name="origin" placeholder="Rio de Janeiro (GIG)" value={form.origin} onChange={handle}/></Field>
            <span style={{ color:"#0ea5e9",fontSize:22,paddingTop:26,fontWeight:700 }}>→</span>
            <Field label="Destino *"><input style={s.input} name="destination" placeholder="Miami (MIA)" value={form.destination} onChange={handle}/></Field>
          </Row>
          <Row>
            <Field label="Data de Ida *"><input style={s.input} type="date" name="departDate" value={form.departDate} onChange={handle}/></Field>
            <Field label="Data de Volta"><input style={s.input} type="date" name="returnDate" value={form.returnDate} onChange={handle}/></Field>
          </Row>
          <Row>
            <Field label="Adultos"><select style={s.input} name="adults" value={form.adults} onChange={handle}>{[1,2,3,4,5,6].map((n)=><option key={n}>{n}</option>)}</select></Field>
            <Field label="Crianças"><select style={s.input} name="children" value={form.children} onChange={handle}>{[0,1,2,3,4].map((n)=><option key={n}>{n}</option>)}</select></Field>
            <Field label="Classe"><select style={s.input} name="cabinClass" value={form.cabinClass} onChange={handle}><option value="economy">Econômica</option><option value="premium">Premium Economy</option><option value="business">Executiva</option><option value="first">Primeira Classe</option></select></Field>
          </Row>
          <label style={{ display:"flex",alignItems:"center",gap:8,color:"#94a3b8",fontSize:13,cursor:"pointer",marginTop:4 }}>
            <input type="checkbox" name="flexible" checked={form.flexible} onChange={handle}/>
            Tenho flexibilidade nas datas (±3 dias)
          </label>
          <Divider/>
          <SLabel>💬 OBSERVAÇÕES</SLabel>
          <textarea style={{ ...s.input,width:"100%",boxSizing:"border-box",resize:"vertical" }} name="notes" rows={3} placeholder="Ex: prefiro voo direto, preciso de hotel próximo à praia..." value={form.notes} onChange={handle}/>
          <button style={s.btnCTA} onClick={submit}>🔍 Quero Meu Orçamento Grátis no WhatsApp</button>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginTop:16,flexWrap:"wrap" }}>
            <span style={{ color:"#64748b",fontSize:12 }}>🔒 Dados seguros</span>
            <span style={{ color:"#64748b",fontSize:12 }}>✅ Sem spam</span>
            <span style={{ color:"#64748b",fontSize:12 }}>💸 100% gratuito</span>
          </div>
        </div>
        <div style={{ marginTop:48 }}>
          <p style={{ textAlign:"center",color:"#64748b",fontSize:12,letterSpacing:"0.1em",marginBottom:20 }}>O QUE NOSSOS CLIENTES DIZEM</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16 }}>
            {TESTIMONIALS.map((t)=>(
              <div key={t.name} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:20 }}>
                <span style={{ color:"#f59e0b",fontSize:14 }}>{"★".repeat(t.stars)}</span>
                <p style={{ color:"#cbd5e1",fontSize:13,lineHeight:1.6,margin:"10px 0 12px" }}>"{t.text}"</p>
                <p style={{ margin:0,color:"#64748b",fontSize:12 }}><strong style={{ color:"#94a3b8" }}>{t.name}</strong> · {t.city}</p>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign:"center",color:"#1e3a5f",fontSize:12,marginTop:32,paddingBottom:24 }}>© 2026 VNC Flights · Todos os direitos reservados</p>
      </div>
    </div>
  );
}

// ─── STEP 1: VOUCHER FORM ─────────────────────────────────────────────
// After agent confirms client, fill voucher data → generate PDF → go to Step 2
function VoucherForm({ request, quote, onNext, onCancel }) {
  const [v, setV] = useState({
    passengerName: request.name,
    phone: request.phone,
    origin: request.origin,
    destination: request.destination,
    departDate: request.departDate,
    returnDate: request.returnDate||"",
    adults: request.adults,
    children: request.children,
    cabinClass: request.cabinClass,
    airline: quote.airline,
    departure: quote.departure,
    arrival: quote.arrival,
    stops: quote.stops,
    baggage: quote.baggage||"",
    reservationNumber: "",
    salePrice: quote.price,
    voucherNotes: "",
  });
  function handle(e) { setV((prev)=>({ ...prev,[e.target.name]:e.target.value })); }
  function generateAndNext() {
    if (!v.reservationNumber) { alert("Preencha o Nº da Reserva (*)"); return; }
    generateVoucherPDF(v);
    onNext(v);
  }
  return (
    <div style={{ maxWidth:700 }}>
      {/* Step indicator */}
      <div style={{ display:"flex",alignItems:"center",gap:0,marginBottom:28 }}>
        {[["1","📄 Voucher","active"],["2","💰 Financeiro","inactive"]].map(([num,label,state],i)=>(
          <div key={num} style={{ display:"flex",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,background:state==="active"?"linear-gradient(135deg,#0ea5e9,#6366f1)":"rgba(255,255,255,0.06)",color:state==="active"?"#fff":"#475569" }}>{num}</div>
              <span style={{ fontSize:13,fontWeight:600,color:state==="active"?"#f1f5f9":"#475569" }}>{label}</span>
            </div>
            {i===0 && <div style={{ width:40,height:1,background:"#1e3a5f",margin:"0 12px" }}/>}
          </div>
        ))}
      </div>

      <div style={{ background:"rgba(14,165,233,0.06)",border:"1px solid rgba(14,165,233,0.15)",borderRadius:16,padding:20,marginBottom:24 }}>
        <h2 style={{ margin:"0 0 4px",color:"#f1f5f9",fontSize:20 }}>📄 Passo 1 — Dados do Voucher</h2>
        <p style={{ margin:0,color:"#0ea5e9",fontSize:14 }}>{v.origin} → {v.destination} · {v.passengerName}</p>
      </div>

      <SLabel>DADOS DA EMISSÃO</SLabel>
      <Row>
        <Field label="Nº da Reserva *"><input style={s.input} name="reservationNumber" placeholder="ABC123456" value={v.reservationNumber} onChange={handle}/></Field>
      </Row>
      <Row>
        <Field label="Companhia"><input style={s.input} name="airline" value={v.airline} onChange={handle}/></Field>
        <Field label="Valor de Venda (R$)"><input style={s.input} name="salePrice" value={v.salePrice} onChange={handle}/></Field>
      </Row>
      <Row>
        <Field label="Saída"><input style={s.input} name="departure" value={v.departure} onChange={handle}/></Field>
        <Field label="Chegada"><input style={s.input} name="arrival" value={v.arrival} onChange={handle}/></Field>
        <Field label="Escalas">
          <select style={s.input} name="stops" value={v.stops} onChange={handle}>
            <option value="0">Direto</option><option value="1">1 escala</option><option value="2">2 escalas</option>
          </select>
        </Field>
      </Row>
      <Field label="Bagagem"><input style={s.input} name="baggage" placeholder="1 mala 23kg + mochila" value={v.baggage} onChange={handle}/></Field>
      <div style={{ marginTop:14 }}/>
      <Field label="Observações para o cliente">
        <textarea style={{ ...s.input,width:"100%",boxSizing:"border-box",resize:"vertical" }} name="voucherNotes" rows={2} placeholder="Ex: check-in online 48h antes, bagagem despachada inclusa..." value={v.voucherNotes} onChange={handle}/>
      </Field>

      <div style={{ display:"flex",gap:12,marginTop:24 }}>
        <button style={{ ...s.btnGreen,flex:1,padding:"13px",fontSize:15 }} onClick={generateAndNext}>
          📄 Gerar Voucher PDF e Continuar →
        </button>
        <button style={{ padding:"13px 20px",borderRadius:10,border:"1px solid #1e3a5f",background:"transparent",color:"#64748b",cursor:"pointer",fontSize:14 }} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

// ─── STEP 2: FINANCIAL FORM ───────────────────────────────────────
function FinancialForm({ voucherData, onSave, onBack }) {
  const [f, setF] = useState({
    costPrice: "",
    salePrice: voucherData.salePrice||"",
    profit: "",
    issuedBy: "",
    paymentMethod: "pix",
    status: "pago",
  });
  function handle(e) {
    const { name, value } = e.target;
    setF((prev) => {
      const updated = { ...prev,[name]:value };
      if (name==="costPrice"||name==="salePrice") {
        const cost = parseFloat((name==="costPrice"?value:prev.costPrice)?.replace(",",".")||0);
        const sell = parseFloat((name==="salePrice"?value:prev.salePrice)?.replace(",",".")||0);
        if (!isNaN(cost)&&!isNaN(sell)) updated.profit = (sell-cost).toFixed(2).replace(".",",");
      }
      return updated;
    });
  }
  function save() {
    if (!f.costPrice||!f.issuedBy) { alert("Preencha o custo e emitido por (*)"); return; }
    onSave({ ...voucherData,...f,id:Date.now(),closedAt:new Date().toLocaleString("pt-BR") });
  }
  const profitPositive = f.profit && !f.profit.startsWith("-");
  const autoFields = [
    { label:"Passageiro",     value: voucherData.passengerName },
    { label:"Data da Viagem", value: voucherData.departDate },
    { label:"Nº da Reserva", value: voucherData.reservationNumber },
    { label:"Companhia",      value: voucherData.airline },
    { label:"Valor de Venda", value: "R$ " + (voucherData.salePrice||"—") },
  ];
  return (
    <div style={{ maxWidth:700 }}>
      <div style={{ display:"flex",alignItems:"center",gap:0,marginBottom:28 }}>
        {[["1","📄 Voucher","done"],["2","💰 Financeiro","active"]].map(([num,label,state],i)=>(
          <div key={num} style={{ display:"flex",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,background:state==="done"?"#10b981":"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff" }}>{state==="done"?"✓":num}</div>
              <span style={{ fontSize:13,fontWeight:600,color:"#f1f5f9" }}>{label}</span>
            </div>
            {i===0 && <div style={{ width:40,height:1,background:"#0ea5e9",margin:"0 12px" }}/>}
          </div>
        ))}
      </div>

      <div style={{ background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:16,padding:20,marginBottom:24 }}>
        <h2 style={{ margin:"0 0 4px",color:"#f1f5f9",fontSize:20 }}>💰 Passo 2 — Dados Financeiros</h2>
        <p style={{ margin:0,color:"#10b981",fontSize:14 }}>{voucherData.origin} → {voucherData.destination} · {voucherData.passengerName}</p>
      </div>

      <div style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"16px 20px",marginBottom:20 }}>
        <p style={{ fontSize:11,fontWeight:700,color:"#475569",letterSpacing:"0.1em",margin:"0 0 14px" }}>PREENCHIDO AUTOMATICAMENTE</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12 }}>
          {autoFields.map((field)=>(
            <div key={field.label}>
              <p style={{ fontSize:11,color:"#475569",margin:"0 0 3px" }}>{field.label}</p>
              <p style={{ fontSize:14,fontWeight:600,color:"#94a3b8",margin:0 }}>{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      <SLabel>PREENCHA ABAIXO</SLabel>
      <Row>
        <Field label="Custo (R$) *"><input style={s.input} name="costPrice" placeholder="2.800,00" value={f.costPrice} onChange={handle}/></Field>
        <Field label="Emitido por *"><input style={s.input} name="issuedBy" placeholder="LATAM, CVC..." value={f.issuedBy} onChange={handle}/></Field>
        <Field label="Lucro (R$)">
          <input style={{ ...s.input,color:f.profit?(profitPositive?"#10b981":"#ef4444"):"#64748b",fontWeight:700 }} value={f.profit||"calculado auto"} readOnly/>
        </Field>
      </Row>
      <Row>
        <Field label="Forma de Pagamento">
          <select style={s.input} name="paymentMethod" value={f.paymentMethod} onChange={handle}>
            <option value="pix">PIX</option>
            <option value="credito">Cartão de Crédito</option>
            <option value="debito">Cartão de Débito</option>
            <option value="transferencia">Transferência</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </Field>
        <Field label="Status">
          <select style={s.input} name="status" value={f.status} onChange={handle}>
            <option value="pago">✅ Pago</option>
            <option value="pendente">⏳ Pendente</option>
            <option value="parcelado">💳 Parcelado</option>
          </select>
        </Field>
      </Row>

      {f.profit && (
        <div style={{ background:profitPositive?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${profitPositive?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`,borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ fontSize:24 }}>{profitPositive?"💰":"⚠️"}</span>
          <div>
            <p style={{ margin:0,fontWeight:700,color:profitPositive?"#10b981":"#ef4444",fontSize:16 }}>Lucro: R$ {f.profit}</p>
            <p style={{ margin:0,color:"#64748b",fontSize:12 }}>Venda R$ {f.salePrice} — Custo R$ {f.costPrice}</p>
          </div>
        </div>
      )}

      <div style={{ display:"flex",gap:12,marginTop:24 }}>
        <button style={{ padding:"13px 20px",borderRadius:10,border:"1px solid #1e3a5f",background:"transparent",color:"#64748b",cursor:"pointer",fontSize:14 }} onClick={onBack}>← Voltar</button>
        <button style={{ ...s.btnGreen,flex:1,padding:"13px",fontSize:15 }} onClick={save}>
          💾 Salvar no Relatório Financeiro
        </button>
      </div>
    </div>
  );
}


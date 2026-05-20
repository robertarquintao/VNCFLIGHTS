export default function App() {
  const [tab, setTab]           = useState("client");
  const [requests, setRequests] = useState([]);
  const [sales, setSales]       = useState([]);

  function addRequest(req)   { setRequests((r)=>[req,...r]); }
  function markSent(id,quote){ setRequests((r)=>r.map((x)=>x.id===id?{ ...x,status:"sent",savedQuote:quote }:x)); }
  function markConfirmed(id) { setRequests((r)=>r.map((x)=>x.id===id?{ ...x,status:"confirmed" }:x)); }
  function addSale(sale)     { setSales((s)=>[sale,...s]); setRequests((r)=>r.map((x)=>x.id===sale.id?{ ...x,status:"closed" }:x)); }

  const pendingCount   = requests.filter((r)=>r.status==="pending").length;
  const confirmedCount = requests.filter((r)=>r.status==="confirmed").length;

  if (tab==="agent") return (
    <div>
      <div style={{ position:"fixed",top:0,right:0,zIndex:100,padding:12 }}>
        <button onClick={()=>setTab("client")} style={{ padding:"7px 14px",borderRadius:8,border:"1px solid #1e3a5f",background:"#0a0f1e",color:"#64748b",cursor:"pointer",fontSize:13 }}>Ver site</button>
      </div>
      <AgentPage requests={requests} onMarkSent={markSent} onMarkConfirmed={markConfirmed} sales={sales} onAddSale={addSale}/>
    </div>
  );

  return (
    <div style={{ position:"relative" }}>
      <ClientPage onSubmit={addRequest}/>
      <div style={{ position:"fixed",bottom:20,right:20,zIndex:100 }}>
        <button onClick={()=>setTab("agent")} style={{ padding:"10px 16px",borderRadius:100,border:"1px solid #1e3a5f",background:"rgba(10,15,30,0.9)",color:"#475569",cursor:"pointer",fontSize:13,backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:6 }}>
          Agente
          {(pendingCount+confirmedCount)>0 && <span style={{ background:confirmedCount>0?"#10b981":"#ef4444",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center" }}>{pendingCount+confirmedCount}</span>}
        </button>
      </div>
    </div>
  );
}

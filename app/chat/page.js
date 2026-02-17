"use client";
import { useState } from "react";
document.body.style.backgroundColor = "lightgreen"; //cor de fundo da pagina

export default function ChatPage() {
  const [modo, setModo] = useState("conceito");
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function enviarMensagem() {
    setCarregando(true);
    const novoHistorico = [
    ...historico,
    { role: "user", content: mensagem },
  ];

    const response = await fetch("/api/ia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mensagem: mensagem,
      modo: modo,
      historico: novoHistorico,
    }),
  });

    const data = await response.json();
    setHistorico([
    ...novoHistorico,
    { role: "assistant", content: data.resposta },
  ]);

  setResposta(data.resposta);
  setCarregando(false);
  setMensagem("");
    
  }

  return (
    <div style={{ padding: 40, maxWidth: 800 }}>
      <h1>Chat IA — Arquitetura Residencial</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
  <button onClick={() => setModo("conceito")} style={{ fontWeight: "bold" }}>🧠 Conceito</button>
  <button onClick={() => setModo("programa")}>📐 Programa</button>
  <button onClick={() => setModo("memorial")}>📝 Memorial</button>
  <button onClick={() => setModo("terreno")}>🌱 Terreno</button>
</div>
      
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}></div>
      <textarea
        rows={5}
        style={{ width: "100%", marginBottom: 10 }}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Descreva seu projetO..."
      />
      

     <button onClick={enviarMensagem} disabled={carregando}
      style={{
        backgroundColor: carregando ? "#f51111" : "#f10e9a",
    color: "#23fa52",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: carregando ? "not-allowed" : "pointer"
      }}
      >{carregando ? "Carregando..." : "Enviar"}
      </button>

      {resposta && (
        <div style={{ marginTop: 20 }}>
          <h3>Resposta da IA:</h3>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}
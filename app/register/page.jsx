"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Register() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    alert("Conta criada! Verifique seu email.");
  } else {
    alert(error.message);
  }
};

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Criar Conta</h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-4"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={handleRegister}
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
}
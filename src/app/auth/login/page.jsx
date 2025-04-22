"use client";

import { loginUser } from "@/app/actions/users/login";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [state, formAction] = useActionState(loginUser, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);
  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="email"
          placeholder="Correo"
          type="email"
          required
          className="border p-2"
        />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          required
          className="border p-2"
        />
        <button className="bg-blue-600 text-white py-2 rounded">
          Iniciar sesión
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

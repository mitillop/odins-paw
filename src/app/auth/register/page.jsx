"use client";

import { createUser } from "@/app/actions/users/register";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [state, formAction] = useActionState(createUser, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Registro</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Nombre"
          required
          className="border p-2"
        />
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
          Registrarse
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;

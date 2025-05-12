"use client";
import { SignIn } from "@clerk/nextjs";
import { PawPrint, Dog, Cat, Bone, Bird, Rabbit, Heart, Vegan } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const patternIcons = [PawPrint, Dog, Cat, Heart];
  
  const generatePatternItems = (count) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const IconComponent = patternIcons[i % patternIcons.length];
      const size = Math.random() * 15 + 15; 
      const opacity = Math.random() * 0.2 + 0.1; 
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const rotate = `rotate(${Math.random() * 360}deg)`;
      
      items.push(
        <div 
          key={i} 
          className="absolute text-base-100" 
          style={{ 
            top, 
            left, 
            opacity,
            transform: rotate
          }}
        >
          <IconComponent size={size} />
        </div>
      );
    }
    return items;
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {generatePatternItems(100)}
        </div>

        <div className="relative z-10 p-8 rounded-lg shadow-2xl bg-base-100 bg-opacity-90 max-w-md">
          <div className="flex flex-col items-center gap-6">
            <PawPrint size={64} className="text-primary" />
            <h2 className="text-3xl font-bold text-center">
              Bienvenido a Odin's Paw
            </h2>
            <p className="text-center text-lg">
              Cuidamos a tus mascotas como si fueran nuestras. Accede a nuestra
              plataforma de atención veterinaria personalizada.
            </p>
            
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-full bg-primary-focus bg-opacity-20">
                  <Bone className="text-primary" size={20} />
                </div>
                <span className="text-xs mt-1">Cuida a tus mascotas</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-full bg-primary-focus bg-opacity-20">
                  <Heart className="text-primary" size={20} />
                </div>
                <span className="text-xs mt-1">Atención personalizada</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-full bg-primary-focus bg-opacity-20">
                  <Vegan className="text-primary" size={20} />
                </div>
                <span className="text-xs mt-1">Todo tipo de mascotas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-base-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 md:hidden">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PawPrint size={32} className="text-primary" />
              <h1 className="text-3xl font-bold">Odin's Paw</h1>
            </div>
            <p className="text-base-content opacity-80">
              Bienvenido a la mejor plataforma de atención para tu mascota
            </p>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <SignIn
                appearance={{
                  elements: {
                    card: "shadow-none bg-transparent",
                    formButtonPrimary: "bg-primary hover:bg-primary-focus",
                    footerActionLink: "text-primary hover:text-primary-focus",
                  },
                }}
              />
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="text-center">
            <p className="mb-2">¿No tienes una cuenta?</p>
            <Link
              href="/sign-up"
              className="btn btn-outline btn-primary btn-wide"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

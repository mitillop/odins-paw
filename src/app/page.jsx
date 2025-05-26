'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    router.push('/dashboard');
    return null;
  }

  const openLoginModal = (signUpMode = false) => {
    setIsSignUp(signUpMode);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="navbar bg-base-100/80 backdrop-blur-md shadow-lg fixed top-0 z-50">
        <div className="navbar-start">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-primary">Odin's Paw</span>
          </div>
        </div>
        <div className="navbar-end space-x-2">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => openLoginModal(false)}
          >
            Iniciar Sesión
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => openLoginModal(true)}
          >
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-screen pt-16">
        <div className="hero-content text-center max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                El cuidado perfecto para tus mascotas
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubre una nueva forma de cuidar a tus compañeros peludos con 
                planes personalizados, seguimiento de salud y consejos de expertos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => openLoginModal(true)}
                >
                  Comenzar Gratis
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="btn btn-outline btn-lg">
                  Ver Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-amber-300/20"></div>
                <div className="text-8xl animate-bounce">🐕</div>
                <div className="absolute top-4 right-4 text-4xl animate-pulse">❤️</div>
                <div className="absolute bottom-4 left-4 text-3xl animate-bounce delay-300">🦴</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Todo lo que necesitas para tu mascota
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales para el cuidado integral de tus compañeros
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="card-title justify-center text-xl mb-2">Planes Personalizados</h3>
                <p className="text-gray-600">
                  Crea planes de cuidado únicos basados en la raza, edad y necesidades específicas de tu mascota.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">🩺</div>
                <h3 className="card-title justify-center text-xl mb-2">Seguimiento de Salud</h3>
                <p className="text-gray-600">
                  Monitorea vacunas, medicamentos y citas veterinarias con recordatorios automáticos.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="card-title justify-center text-xl mb-2">Chat con Expertos</h3>
                <p className="text-gray-600">
                  Accede a consejos profesionales y resuelve dudas sobre nutrición y comportamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-orange-100">Mascotas Felices</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-orange-100">Veterinarios</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-orange-100">Satisfacción</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-orange-100">Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de dueños que ya confían en Odin's Paw para el cuidado de sus mascotas.
          </p>
          <button 
            className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            onClick={() => openLoginModal(true)}
          >
            Crear Cuenta Gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🐾</span>
            </div>
            <span className="text-lg font-bold">Odin's Paw</span>
          </div>
          <p className="text-sm">© 2024 Odin's Paw. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-md">
            <button 
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeLoginModal}
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🐾</span>
              </div>
              <h3 className="text-2xl font-bold">
                {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </h3>
              <p className="text-gray-600 mt-2">
                {isSignUp 
                  ? 'Únete a la comunidad de Odin\'s Paw' 
                  : 'Bienvenido de vuelta'
                }
              </p>
            </div>

            <div className="space-y-4">
              {isSignUp ? (
                <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                  <button className="btn btn-primary w-full">
                    Registrarse con Email
                  </button>
                </SignUpButton>
              ) : (
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                  <button className="btn btn-primary w-full">
                    Iniciar Sesión
                  </button>
                </SignInButton>
              )}
              
              <div className="divider">o</div>
              
              <div className="text-center">
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp 
                    ? '¿Ya tienes cuenta? Inicia sesión' 
                    : '¿No tienes cuenta? Regístrate'
                  }
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeLoginModal}></div>
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    router.push('/dashboard');
    return null;
  }

  // Custom appearance for Clerk components
  const clerkAppearance = {
    variables: {
      colorPrimary: '#f97316', // Orange-500
      colorPrimaryText: '#ffffff', // White text on orange background
      colorText: '#1f2937', // Gray-800 for good contrast
      colorTextSecondary: '#6b7280', // Gray-500 for secondary text
      colorBackground: '#ffffff', // White background
      colorInputBackground: '#f9fafb', // Gray-50 for input backgrounds
      colorInputText: '#1f2937', // Gray-800 for input text
      borderRadius: '0.75rem', // Rounded-xl to match your design
      fontFamily: 'inherit', // Use your app's font
    },
    elements: {
      headerTitle: {
        color: '#ea580c', // Orange-600 for titles
        fontSize: '1.5rem',
        fontWeight: '700',
      },
      headerSubtitle: {
        color: '#6b7280', // Gray-500 for subtitles
      },
      formButtonPrimary: {
        background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)', // Orange to amber gradient
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: '600',
        border: 'none',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)', // Darker on hover
          transform: 'translateY(-1px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        '&:focus': {
          background: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)',
          boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.3)', // Orange focus ring
        },
      },
      formButtonSecondary: {
        color: '#f97316', // Orange-500 text
        border: '1px solid #f97316',
        background: 'transparent',
        '&:hover': {
          background: '#fef3e2', // Light orange background on hover
          color: '#ea580c',
        },
      },
      socialButtonsBlockButton: {
        border: '1px solid #e5e7eb',
        color: '#374151',
        background: '#ffffff',
        '&:hover': {
          background: '#f9fafb',
          borderColor: '#f97316',
        },
      },
      formFieldInput: {
        background: '#ffffff',
        border: '1px solid #d1d5db',
        color: '#1f2937',
        borderRadius: '0.5rem',
        '&:focus': {
          borderColor: '#f97316',
          boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)',
        },
      },
      formFieldLabel: {
        color: '#374151',
        fontWeight: '500',
      },
      identityPreviewText: {
        color: '#6b7280',
      },
      dividerLine: {
        background: '#e5e7eb',
      },
      dividerText: {
        color: '#6b7280',
      },
      footerActionLink: {
        color: '#f97316',
        '&:hover': {
          color: '#ea580c',
        },
      },
      badge: {
        background: '#fef3e2',
        color: '#ea580c',
      },
      formFieldSuccessText: {
        color: '#059669', // Green for success
      },
      formFieldErrorText: {
        color: '#dc2626', // Red for errors
      },
      formFieldWarningText: {
        color: '#d97706', // Amber for warnings
      },
      otpCodeFieldInput: {
        borderColor: '#f97316',
        '&:focus': {
          borderColor: '#ea580c',
          boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <nav className="navbar bg-base-100/80 backdrop-blur-md shadow-lg fixed top-0 z-50">
        <div className="navbar-start">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-primary">Odin's Paw</span>
          </div>
        </div>
        <div className="navbar-end  space-x-2">
          <SignInButton mode="modal" appearance={clerkAppearance}>
            <button className="btn btn-ghost btn-sm">
              Iniciar Sesión
            </button>
          </SignInButton>
          <SignUpButton mode="modal" appearance={clerkAppearance}>
            <button className="btn btn-primary btn-sm">
              Registrarse
            </button>
          </SignUpButton>
        </div>
      </nav>

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
                <SignUpButton mode="modal" afterSignUpUrl="/dashboard" appearance={clerkAppearance}>
                  <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    Comenzar Gratis
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </SignUpButton>
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

      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Todo lo que necesitas para tu mascota
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas inteligentes para el cuidado integral de tus compañeros
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="card-title justify-center text-xl mb-2">Planes Personalizados</h3>
                <p className="text-gray-600">
                  Crea planes de alimentación únicos basados en las necesidades específicas de tu mascota.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">🩺</div>
                <h3 className="card-title justify-center text-xl mb-2">Seguimiento de Salud</h3>
                <p className="text-gray-600">
                  Monitorea la informacion de tu mascota, como peso, edad, condiciones de salud, etc.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="card-title justify-center text-xl mb-2">Atencion inteligente para tu mascota</h3>
                <p className="text-gray-600">
                  Accede a consejos de agentes inteligentes y resuelve dudas sobre nutrición y comportamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <SignUpButton mode="modal" afterSignUpUrl="/dashboard" appearance={clerkAppearance}>
            <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Crear Cuenta Gratuita
            </button>
          </SignUpButton>
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
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import {
  PawPrint,
  Bone,
  Stethoscope,
  Brain,
  ArrowRight,
} from "lucide-react";

const springConfig = { damping: 1.0, stiffness: 100, mass: 0.8 };

function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return isInView;
}

function FadeInSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ ...springConfig, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ container: containerRef });

  const [navScrolled, setNavScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavScrolled(latest > 50);
  });

  useEffect(() => {
    if (isSignedIn) router.push("/dashboard");
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  const clerkAppearance = {
    variables: {
      colorPrimary: "#f97316",
      colorPrimaryText: "#ffffff",
      colorText: "#1f2937",
      colorTextSecondary: "#6b7280",
      colorBackground: "#ffffff",
      colorInputBackground: "#f9fafb",
      colorInputText: "#1f2937",
      borderRadius: "0.75rem",
      fontFamily: "inherit",
    },
    elements: {
      headerTitle: { color: "#ea580c", fontSize: "1.5rem", fontWeight: "700" },
      headerSubtitle: { color: "#6b7280" },
      formButtonPrimary: {
        background: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
        color: "#ffffff",
        fontSize: "0.875rem",
        fontWeight: "600",
        border: "none",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
      },
      formButtonSecondary: {
        color: "#f97316",
        border: "1px solid #f97316",
        background: "transparent",
      },
      socialButtonsBlockButton: {
        border: "1px solid #e5e7eb",
        color: "#374151",
        background: "#ffffff",
      },
      formFieldInput: {
        background: "#ffffff",
        border: "1px solid #d1d5db",
        color: "#1f2937",
        borderRadius: "0.5rem",
      },
      formFieldLabel: { color: "#374151", fontWeight: "500" },
      dividerLine: { background: "#e5e7eb" },
      dividerText: { color: "#6b7280" },
      footerActionLink: { color: "#f97316" },
    },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      {/* Nav — translucent material */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled
            ? "rgba(255, 255, 255, 0.72)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: navScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: navScrolled
            ? "1px solid rgba(0, 0, 0, 0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              Odin&apos;s Paw
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SignInButton mode="modal" appearance={clerkAppearance}>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full active:scale-[0.97]">
                Iniciar Sesión
              </button>
            </SignInButton>
            <SignUpButton mode="modal" appearance={clerkAppearance}>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors rounded-full active:scale-[0.97]">
                Comenzar
              </button>
            </SignUpButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero — massive typography, grounded */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <p className="text-sm font-medium tracking-widest uppercase text-orange-500 mb-6">
              Cuidado inteligente
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.95] tracking-[-0.03em] mb-8"
            >
              Tu mascota merece
              <br />
              <span className="text-orange-500">más que croquetas</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-12">
              Planes de alimentación personalizados, seguimiento de salud y
              asistencia con inteligencia artificial. Todo en un solo lugar.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignUpButton mode="modal" appearance={clerkAppearance}>
                <button className="px-8 py-3.5 bg-orange-500 text-white font-medium rounded-full text-base hover:bg-orange-600 transition-colors flex items-center gap-2 group active:scale-[0.97]">
                  Empezar gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </SignUpButton>
              <a
                href="#como-funciona"
                className="px-8 py-3.5 text-gray-600 font-medium rounded-full text-base hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                Conocer más
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features — grounded, no cards */}
      <section id="como-funciona" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <p className="text-sm font-medium tracking-widest uppercase text-orange-500 mb-4">
              Cómo funciona
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-[-0.02em] leading-tight mb-20">
              Tres cosas que
              <br />
              realmente importan
            </h2>
          </FadeInSection>

          <div className="space-y-32">
            {/* Feature 1 */}
            <FadeInSection>
              <div className="max-w-xl">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                  <Bone className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-[-0.01em] mb-4">
                  Dietas que se adaptan
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                  No dos mascotas son iguales. Creamos planes de alimentación
                  según la raza, peso, edad y nivel de actividad de tu
                  compañero.
                </p>
              </div>
            </FadeInSection>

            {/* Feature 2 */}
            <FadeInSection>
              <div className="max-w-xl">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-[-0.01em] mb-4">
                  IA que entiende
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Un asistente inteligente que conoce a tu mascota y te da
                  respuestas precisas sobre nutrición, comportamiento y salud.
                </p>
              </div>
            </FadeInSection>

            {/* Feature 3 */}
            <FadeInSection>
              <div className="max-w-xl">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                  <Stethoscope className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-[-0.01em] mb-4">
                  Salud bajo control
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Registra peso, condiciones médicas y actividad. Monitorea
                  cambios y mantén un historial completo de salud.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA — clean, no gradient overload */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-[-0.02em] leading-tight mb-6">
              Empieza hoy.
              <br />
              Es gratis.
            </h2>
            <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
              Crea una cuenta en segundos y descubre una nueva forma de cuidar
              a tu mascota.
            </p>
            <SignUpButton mode="modal" appearance={clerkAppearance}>
              <button className="px-10 py-4 bg-orange-500 text-white font-medium rounded-full text-base hover:bg-orange-600 transition-colors inline-flex items-center gap-2 group active:scale-[0.97]">
                Crear cuenta gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </SignUpButton>
          </FadeInSection>
        </div>
      </section>

      {/* Footer — minimal */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PawPrint className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-900">Odin&apos;s Paw</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Odin&apos;s Paw. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

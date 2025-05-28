"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Clock,
  Star,
  Check,
  PawPrint,
  Bone,
  Stethoscope,
  Brain,
  MessageCircle,
  Sunrise,
  Sunset,
  MoonStar,
  Dog,
  Weight,
  HeartPulse,
  Github,
  Mail,
  Instagram,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isSignedIn) {
    router.push("/dashboard");
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const clerkAppearance = {
    variables: {
      colorPrimary: "#f97316", // Orange-500
      colorPrimaryText: "#ffffff", // White text on orange background
      colorText: "#1f2937", // Gray-800 for good contrast
      colorTextSecondary: "#6b7280", // Gray-500 for secondary text
      colorBackground: "#ffffff", // White background
      colorInputBackground: "#f9fafb", // Gray-50 for input backgrounds
      colorInputText: "#1f2937", // Gray-800 for input text
      borderRadius: "0.75rem", // Rounded-xl to match your design
      fontFamily: "inherit", // Use your app's font
    },
    elements: {
      headerTitle: {
        color: "#ea580c", // Orange-600 for titles
        fontSize: "1.5rem",
        fontWeight: "700",
      },
      headerSubtitle: {
        color: "#6b7280", // Gray-500 for subtitles
      },
      formButtonPrimary: {
        background: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)", // Orange to amber gradient
        color: "#ffffff",
        fontSize: "0.875rem",
        fontWeight: "600",
        border: "none",
        borderRadius: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #ea580c 0%, #d97706 100%)", // Darker on hover
          transform: "translateY(-1px)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        "&:focus": {
          background: "linear-gradient(135deg, #ea580c 0%, #d97706 100%)",
          boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.3)", // Orange focus ring
        },
      },
      formButtonSecondary: {
        color: "#f97316", // Orange-500 text
        border: "1px solid #f97316",
        background: "transparent",
        "&:hover": {
          background: "#fef3e2", // Light orange background on hover
          color: "#ea580c",
        },
      },
      socialButtonsBlockButton: {
        border: "1px solid #e5e7eb",
        color: "#374151",
        background: "#ffffff",
        "&:hover": {
          background: "#f9fafb",
          borderColor: "#f97316",
        },
      },
      formFieldInput: {
        background: "#ffffff",
        border: "1px solid #d1d5db",
        color: "#1f2937",
        borderRadius: "0.5rem",
        "&:focus": {
          borderColor: "#f97316",
          boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
        },
      },
      formFieldLabel: {
        color: "#374151",
        fontWeight: "500",
      },
      identityPreviewText: {
        color: "#6b7280",
      },
      dividerLine: {
        background: "#e5e7eb",
      },
      dividerText: {
        color: "#6b7280",
      },
      footerActionLink: {
        color: "#f97316",
        "&:hover": {
          color: "#ea580c",
        },
      },
      badge: {
        background: "#fef3e2",
        color: "#ea580c",
      },
      formFieldSuccessText: {
        color: "#059669", // Green for success
      },
      formFieldErrorText: {
        color: "#dc2626", // Red for errors
      },
      formFieldWarningText: {
        color: "#d97706", // Amber for warnings
      },
      otpCodeFieldInput: {
        borderColor: "#f97316",
        "&:focus": {
          borderColor: "#ea580c",
          boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.2)",
        },
      },
    },
  };

  const pricingPlans = [
    {
      name: "Plan Básico",
      price: "Gratis",
      features: [
        "1 mascota",
        "Plan de alimentación básico",
        "Seguimiento de salud básico",
        "Chat con IA limitado",
      ],
      cta: "Comenzar Gratis",
      popular: false,
    },
    {
      name: "Plan Premium",
      price: "$4.99/mes",
      features: [
        "Hasta 3 mascotas",
        "Planes de alimentación personalizados",
        "Seguimiento de salud avanzado",
        "Chat con IA ilimitado",
        "Acceso a veterinarios 24/7",
        "Recordatorios personalizados",
      ],
      cta: "Prueba Gratuita 14 días",
      popular: true,
    },
    {
      name: "Plan Familiar",
      price: "$14.99/mes",
      features: [
        "Mascotas ilimitadas",
        "Todo lo del plan Premium",
        "Prioridad en atención",
        "Descuentos en productos",
        "Consultas veterinarias prioritarias",
        "Reportes mensuales detallados",
      ],
      cta: "Prueba Gratuita 30 días",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="navbar bg-base-100/80 backdrop-blur-md shadow-lg fixed top-0 z-50"
      >
        <div className="navbar-start">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-primary">Odin's Paw</span>
          </motion.div>
        </div>
        <div className="navbar-end space-x-2">
          <SignInButton mode="modal" appearance={clerkAppearance}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-ghost btn-sm"
            >
              Iniciar Sesión
            </motion.button>
          </SignInButton>
          <SignUpButton mode="modal" appearance={clerkAppearance}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-sm"
            >
              Registrarse
            </motion.button>
          </SignUpButton>
        </div>
      </motion.nav>

      <section className="hero min-h-screen pt-16">
        <div className="hero-content text-center max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <motion.h1
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                El cuidado perfecto para tus mascotas
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Descubre una nueva forma de cuidar a tus compañeros peludos con 
                planes personalizados, seguimiento de salud y consejos de
                expertos.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <SignUpButton
                  mode="modal"
                  afterSignUpUrl="/dashboard"
                  appearance={clerkAppearance}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Comenzar Gratis
                    <PawPrint className="w-5 h-5" />
                  </motion.button>
                </SignUpButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-lg"
                  onClick={() => {
                    document.getElementById("demo-section").scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Ver Demo
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <motion.div
                animate={floatingAnimation}
                className="w-full h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(to br, rgba(251, 146, 60, 0.2), rgba(251, 191, 36, 0.2))",
                      "linear-gradient(to br, rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0"
                />
                <motion.div
                  className="text-8xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🐕
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 text-4xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4 text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -15, 15, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🦴
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 bg-white/50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Todo lo que necesitas para tu mascota
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas inteligentes para el cuidado integral de tus
              compañeros
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="card-body text-center">
                <motion.div
                  animate={floatingAnimation}
                  className="text-5xl mb-4"
                >
                  <Bone className="w-16 h-16 mx-auto text-primary" />
                </motion.div>
                <h3 className="card-title justify-center text-xl mb-2">
                  Planes Personalizados
                </h3>
                <p className="text-gray-600">
                  Crea planes de alimentación únicos basados en las necesidades
                  específicas de tu mascota.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="card-body text-center">
                <motion.div
                  animate={floatingAnimation}
                  className="text-5xl mb-4"
                >
                  <Stethoscope className="w-16 h-16 mx-auto text-primary" />
                </motion.div>
                <h3 className="card-title justify-center text-xl mb-2">
                  Seguimiento de Salud
                </h3>
                <p className="text-gray-600">
                  Monitorea la información de tu mascota, como peso, edad,
                  condiciones de salud y más.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="card-body text-center">
                <motion.div
                  animate={floatingAnimation}
                  className="text-5xl mb-4"
                >
                  <Brain className="w-16 h-16 mx-auto text-primary" />
                </motion.div>
                <h3 className="card-title justify-center text-xl mb-2">
                  Atención Inteligente
                </h3>
                <p className="text-gray-600">
                  Accede a consejos de agentes inteligentes y resuelve dudas
                  sobre nutrición y comportamiento.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="demo-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-orange-100 to-amber-100"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Descubre la Experiencia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mira cómo Odin's Paw revoluciona el cuidado de tus mascotas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="card bg-white shadow-xl overflow-hidden"
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Bone className="text-primary w-6 h-6" />
                  Plan Nutricional
                </h3>
                <div className="bg-base-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Sunrise className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Mañana</p>
                        <p className="text-sm text-gray-600">8:00 AM</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">250g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Sunset className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Tarde</p>
                        <p className="text-sm text-gray-600">2:00 PM</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">200g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MoonStar className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Noche</p>
                        <p className="text-sm text-gray-600">6:00 PM</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">200g</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="card bg-white shadow-xl overflow-hidden"
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="text-primary w-6 h-6" />
                  Asistente IA
                </h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="chat chat-start"
                  >
                    <div className="chat-bubble bg-base-200">
                      Mi perro no quiere comer, ¿qué puedo hacer?
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="chat chat-end"
                  >
                    <div className="chat-bubble bg-base-300 text-black">
                      Entiendo tu preocupación. Hay varias razones por las que
                      tu perro podría estar rechazando la comida. Te sugiero:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Revisar cambios recientes en su rutina</li>
                        <li>Verificar la temperatura de la comida</li>
                        <li>Consultar con un veterinario si persiste</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Dieta Personalizada Demo */}
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="card bg-white shadow-xl overflow-hidden"
            >
              <div className="card-body">
                <div className="flex items-center justify-center bg-base-200 p-3 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mr-2">
                    Dieta de Acchan
                  </h3>
                  <Bone className="text-primary w-5 h-5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gráfico de Porciones */}
                  <div className="bg-base-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">Dieta Premium</h4>
                      <div className="badge badge-primary">Activa</div>
                    </div>
                    <div className="w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32">
                        {/* Círculo base */}
                        <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                        {/* Segmentos del gráfico */}
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-amber-400 border-r-amber-400 transform rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-400 transform -rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-400 transform rotate-180"></div>
                        {/* Centro del gráfico */}
                        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                          <span className="text-lg font-bold">650g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="stats stats-vertical shadow w-full bg-base-200 text-sm rounded-lg">
                      <div className="stat px-4 py-2">
                        <div className="stat-title text-xs flex items-center gap-1">
                          <Sunrise size={14} className="text-amber-400" /> Mañana
                          <div className="ml-auto w-3 h-3 rounded-full bg-amber-400"></div>
                        </div>
                        <div className="stat-value text-2xl">250g</div>
                        <div className="text-xs text-gray-600">7:00 - 8:00 AM</div>
                      </div>

                      <div className="stat px-4 py-2">
                        <div className="stat-title text-xs flex items-center gap-1">
                          <Sunset size={14} className="text-orange-400" /> Tarde
                          <div className="ml-auto w-3 h-3 rounded-full bg-orange-400"></div>
                        </div>
                        <div className="stat-value text-2xl">200g</div>
                        <div className="text-xs text-gray-600">1:00 - 2:00 PM</div>
                      </div>

                      <div className="stat px-4 py-2">
                        <div className="stat-title text-xs flex items-center gap-1">
                          <MoonStar size={14} className="text-purple-400" /> Noche
                          <div className="ml-auto w-3 h-3 rounded-full bg-purple-400"></div>
                        </div>
                        <div className="stat-value text-2xl">200g</div>
                        <div className="text-xs text-gray-600">7:00 - 8:00 PM</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-3">
                      <h3 className="card-title text-sm font-medium text-primary flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Alimentos recomendados
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-ghost">Croquetas Premium</span>
                        <span className="badge badge-ghost">Pollo Cocido</span>
                        <span className="badge badge-ghost">Verduras Frescas</span>
                        <span className="badge badge-ghost">Suplementos Omega-3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="card bg-white shadow-xl overflow-hidden"
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Dog className="text-primary w-6 h-6" />
                  Estadísticas de Mascota
                </h3>
                <div className="stats stats-vertical shadow w-full bg-base-200 text-sm rounded-lg">
                  <div className="stat px-4 py-2">
                    <div className="stat-title text-xs flex items-center gap-1">
                      <Bone size={14} className="text-primary" /> Nombre
                    </div>
                    <div className="stat-value text-2xl">Acchan</div>
                  </div>
                  <div className="stat px-4 py-2">
                    <div className="stat-title text-xs flex items-center gap-1">
                      <Heart size={14} className="text-primary" /> Edad
                    </div>
                    <div className="stat-value text-2xl">2 años</div>
                  </div>

                  <div className="stat px-4 py-2">
                    <div className="stat-title text-xs flex items-center gap-1">
                      <Weight size={14} className="text-primary" /> Peso
                    </div>
                    <div className="stat-value text-2xl">12.5 kg</div>
                    <div className="text-xs text-success flex items-center gap-1"></div>
                  </div>

                  <div className="stat px-4 py-2">
                    <div className="stat-title text-xs flex items-center gap-1">
                      <Star size={14} className="text-primary" /> Actividad
                    </div>
                    <div className="stat-value text-2xl">Alta</div>
                  </div>
                  <div className="stat px-4 py-2">
                    <div className="stat-title text-xs flex items-center gap-1">
                      <HeartPulse size={14} className="text-primary" /> Condiciones medicas
                    </div>
                    <div className="stat-value text-2xl">Ninguna</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="text-center mt-12">
            <SignUpButton
              mode="modal"
              afterSignUpUrl="/dashboard"
              appearance={clerkAppearance}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg"
              >
                Prueba Gratis Ahora
                <PawPrint className="w-5 h-5" />
              </motion.button>
            </SignUpButton>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Planes que se adaptan a ti
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para ti y tus mascotas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className={`card bg-base-100 shadow-xl ${
                  plan.popular ? "border-2 border-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="badge badge-primary">Más Popular</span>
                  </div>
                )}
                <div className="card-body p-6">
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="text-primary w-5 h-5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <SignUpButton
                    mode="modal"
                    afterSignUpUrl="/dashboard"
                    appearance={clerkAppearance}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`btn btn-block ${
                        plan.popular ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </SignUpButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-orange-50 to-amber-50"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            ¿Listo para comenzar?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Únete a miles de dueños que ya confían en Odin's Paw para el cuidado
            de sus mascotas.
          </motion.p>
          <SignUpButton
            mode="modal"
            afterSignUpUrl="/dashboard"
            appearance={clerkAppearance}
          >
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg shadow-lg hover:shadow-xl"
            >
              Crear Cuenta Gratuita
              <PawPrint className="w-5 h-5" />
            </motion.button>
          </SignUpButton>
        </div>
      </motion.section>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🐾</span>
            </div>
            <span className="text-lg font-bold">Odin's Paw</span>
          </div>
          <div className="flex gap-4 mb-4">
            <a href="https://github.com/mitillop" target="_blank" rel="noopener noreferrer" 
               className="btn btn-ghost btn-circle hover:text-primary transition-colors">
              <Github size={24} />
            </a>
            <a href="mailto:solanomezaangel@gmail.com" 
               className="btn btn-ghost btn-circle hover:text-primary transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://instagram.com/mitillop" target="_blank" rel="noopener noreferrer"
               className="btn btn-ghost btn-circle hover:text-primary transition-colors">
              <Instagram size={24} />
            </a>
          </div>
          <p className="text-sm">
            © 2025 Odin's Paw. Todos los derechos reservados.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

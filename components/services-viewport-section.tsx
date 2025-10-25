"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import {
  Globe,
  Cog,
  Building2,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Shield,
  Rocket,
  Target,
  BarChart,
  Lightbulb,
  Database,
  Cloud,
  Gauge,
  Activity,
  LogIn,
  CreditCard,
  Link,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Smartphone,
} from "lucide-react"

const teamMembers_initial = [
  {
    id: 1,
    name: "Joaquin Linares",
    role: "CEO & Fundador",
    image: "/joaquin-linares.png",
    linkedin: "https://www.linkedin.com/in/joaquin-linares",
  },
  {
    id: 2,
    name: "Juan Lazarte",
    role: "CTO",
    image: "/juan-lazarte.png",
    linkedin: "https://www.linkedin.com/in/juan-ignacio-lazarte",
  },
  {
    id: 3,
    name: "Matias Acevedo",
    role: "CMO",
    image: "/matias-acevedo.png", // Updated to use the new professional photo
    linkedin: "https://www.linkedin.com/in/matias-acevedo-224a762b1",
  },
]

const services_initial = [
  {
    id: "website",
    title: "Plataforma de clientes",
    subtitle: "Moderna, ràpida, amigable",
    description:
      "Descubrí las plataformas de nuestros clientes, listas para recibir inversiones en activos tokenizados.",
    icon: <Globe className="w-8 h-8" />,
    features: [
      { icon: <Rocket className="w-5 h-5" />, text: "Velocidad asegurada" },
      { icon: <Shield className="w-5 h-5" />, text: "KYC/AML integrado" },
      { icon: <Target className="w-5 h-5" />, text: "Permite inversores de todo el mundo" },
      { icon: <Gauge className="w-5 h-5" />, text: "En línea 24/7" },
      { icon: <LogIn className="w-5 h-5" />, text: "Permite a usuarios iniciar sesión sin wallet" },
      { icon: <CreditCard className="w-5 h-5" />, text: "Recibe inversión en crypto, pesos o dólares" },
      { icon: <TrendingUp className="w-5 h-5" />, text: "Mercado secundario integrado" },
      { icon: <BarChart className="w-5 h-5" />, text: "Dashboards dinámicos para inversores y administradores" },
      { icon: <Users className="w-5 h-5" />, text: "Chat directo entre usuarios y soporte" },
      { icon: <Smartphone className="w-5 h-5" />, text: "Accesible desde cualquier dispositivo" },
    ],
    stats: [
      { label: "Tiempo promedio de lanzamiento", value: "30 días" },
      { label: "Inversores registrados", value: "+400" },
      { label: "Transacciones procesadas", value: "+150" },
      { label: "Cumplimiento regulatorio", value: "100%" },
      { label: "Retorno promedio de clientes", value: "+12%" },
      { label: "Soporte técnico", value: "24/7 (<1h)" },
    ],
    technologies: [],
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    bgGradient: "from-blue-500/20 via-cyan-400/10 to-blue-600/20",
    accentColor: "text-blue-400",
  },
  {
    id: "mechanical",
    title: "¿Que es la tokenización?",
    subtitle: "Tokenización & Activos Digitales",
    description:
      "La tokenización es el proceso de representar los derecho de un activo real —como un inmueble, una empresa o una obra de arte— de manera digital, permitiendo fraccionar su valor, facilitar su transferencia y garantizar su trazabilidad de forma transparente y segura.",
    icon: <Cog className="w-8 h-8" />,
    features: [
      {
        icon: <Link className="w-5 h-5" />,
        text: "Digitalización de activos reales",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        text: "Liquidez y acceso global",
      },
      {
        icon: <ShieldCheck className="w-5 h-5" />,
        text: "Transparencia y respaldo legal",
      },
      {
        icon: <Zap className="w-5 h-5" />,
        text: "Automatización con smart contracts",
      },
    ],
    stats: [
      { label: "Transparencia", value: "100%" },
      { label: "Automatizado", value: "100$" },
      { label: "Inversores", value: "Globales" },
    ],
    technologies: ["Polygon", "ERC3643", "Smart Contracts", "KYC/AML", "DeFi"],
    gradient: "from-amber-500 via-orange-400 to-yellow-500",
    bgGradient: "from-amber-500/20 via-orange-400/10 to-yellow-500/20",
    accentColor: "text-amber-400",
  },
]

export function ServicesViewportSection() {
  const { t } = useLanguage()
  const [activeService, setActiveService] = useState(0)
  const [activeTeamMember, setActiveTeamMember] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const router = useRouter()

  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = serviceRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveService(index)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    )

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigateToProjects = () => {
    router.push("/projects")
  }

  const scrollToService = (index: number) => {
    serviceRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  const nextTeamMember = () => {
    setActiveTeamMember((prev) => (prev + 1) % teamMembers.length)
  }

  const prevTeamMember = () => {
    setActiveTeamMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const teamMembers = [
    {
      id: 1,
      name: t("team.joaquin.name"),
      role: t("team.joaquin.role"),
      image: "/joaquin-linares.png",
      linkedin: "https://www.linkedin.com/in/joaquin-linares",
    },
    {
      id: 2,
      name: t("team.juan.name"),
      role: t("team.juan.role"),
      image: "/juan-lazarte.png",
      linkedin: "https://www.linkedin.com/in/juan-ignacio-lazarte",
    },
    {
      id: 3,
      name: t("team.matias.name"),
      role: t("team.matias.role"),
      image: "/matias-acevedo.png",
      linkedin: "https://www.linkedin.com/in/matias-acevedo-224a762b1",
    },
  ]

  const services = [
    {
      id: "website",
      title: t("services.client_platform"),
      subtitle: t("services.platform_subtitle"),
      description: t("services.platform_description"),
      icon: <Globe className="w-8 h-8" />,
      features: [
        { icon: <Rocket className="w-5 h-5" />, text: t("services.feature_speed") },
        { icon: <Shield className="w-5 h-5" />, text: t("services.feature_kyc") },
        { icon: <Target className="w-5 h-5" />, text: t("services.feature_global") },
        { icon: <Gauge className="w-5 h-5" />, text: t("services.feature_online") },
        { icon: <LogIn className="w-5 h-5" />, text: t("services.feature_login") },
        { icon: <CreditCard className="w-5 h-5" />, text: t("services.feature_payment") },
        { icon: <TrendingUp className="w-5 h-5" />, text: t("services.feature_secondary") },
        { icon: <BarChart className="w-5 h-5" />, text: t("services.feature_dashboards") },
        { icon: <Users className="w-5 h-5" />, text: t("services.feature_chat") },
        { icon: <Smartphone className="w-5 h-5" />, text: t("services.feature_mobile") },
      ],
      stats: [
        { label: t("services.stat_launch_time"), value: "30 días" },
        { label: t("services.stat_investors"), value: "+400" },
        { label: t("services.stat_transactions"), value: "+150" },
        { label: t("services.stat_compliance"), value: "100%" },
        { label: t("services.stat_return"), value: "+12%" },
        { label: t("services.stat_support"), value: "24/7 (<1h)" },
      ],
      technologies: [],
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      bgGradient: "from-blue-500/20 via-cyan-400/10 to-blue-600/20",
      accentColor: "text-blue-400",
    },
    {
      id: "mechanical",
      title: t("services.tokenization_title"),
      subtitle: t("services.tokenization_subtitle"),
      description: t("services.tokenization_description"),
      icon: <Cog className="w-8 h-8" />,
      features: [
        {
          icon: <Link className="w-5 h-5" />,
          text: t("services.tokenization_feature_1"),
        },
        {
          icon: <Globe className="w-5 h-5" />,
          text: t("services.tokenization_feature_2"),
        },
        {
          icon: <ShieldCheck className="w-5 h-5" />,
          text: t("services.tokenization_feature_3"),
        },
        {
          icon: <Zap className="w-5 h-5" />,
          text: t("services.tokenization_feature_4"),
        },
      ],
      stats: [
        { label: t("services.tokenization_stat_transparency"), value: "100%" },
        { label: t("services.tokenization_stat_automated"), value: "100$" },
        { label: t("services.tokenization_stat_investors"), value: t("services.tokenization_stat_global") },
      ],
      technologies: ["Polygon", "ERC3643", "Smart Contracts", "KYC/AML", "DeFi"],
      gradient: "from-amber-500 via-orange-400 to-yellow-500",
      bgGradient: "from-amber-500/20 via-orange-400/10 to-yellow-500/20",
      accentColor: "text-amber-400",
    },
  ]

  return (
    <section ref={containerRef} className="relative py-20 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
            {t("services.our_team")} <span className="font-light italic">{t("services.team")}</span>
          </h2>
          <p className="text-gray-400 text-lg">{t("services.meet_experts")}</p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          {/* Previous Arrow */}
          <motion.button
            onClick={prevTeamMember}
            className="absolute left-0 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          {/* Team Member Card */}
          <motion.div
            key={activeTeamMember}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              {/* Team Member Photo */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
                <img
                  src={teamMembers[activeTeamMember].image || "/placeholder.svg"}
                  alt={teamMembers[activeTeamMember].name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>

              {/* Team Member Info */}
              <h3 className="text-2xl font-bold text-white mb-2">{teamMembers[activeTeamMember].name}</h3>
              <p className="text-gray-400 mb-6">{teamMembers[activeTeamMember].role}</p>

              {/* LinkedIn Link */}
              <a
                href={teamMembers[activeTeamMember].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">{t("services.view_linkedin")}</span>
              </a>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTeamMember(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTeamMember ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Next Arrow */}
          <motion.button
            onClick={nextTeamMember}
            className="absolute right-0 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Dot Navigation - Left Side */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => scrollToService(index)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                activeService === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/30 hover:bg-white/60 hover:scale-110"
              }`}
            >
              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-white/20">
                  {service.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">{t("services.info_about")} </span>
            <span className="text-white font-light italic">{t("services.tokenizer")}</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Services Content */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                ref={(el) => (serviceRefs.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="min-h-[80vh] flex items-center"
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Content */}
                  <motion.div
                    className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div>
                      <motion.div
                        className={`inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-r ${service.bgGradient} rounded-full border border-white/10 mb-6`}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        <div className={service.accentColor}>{service.icon}</div>
                        <span className={`text-sm font-medium ${service.accentColor}`}>{service.subtitle}</span>
                      </motion.div>

                      <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{service.title}</h3>

                      <p className="text-lg text-gray-300 leading-relaxed mb-8">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="flex items-center space-x-3"
                        >
                          <div className={service.accentColor}>{feature.icon}</div>
                          <span className="text-gray-300">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {service.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: statIndex * 0.1 }}
                          viewport={{ once: false }}
                          className={`text-center p-4 bg-gradient-to-br ${service.bgGradient} rounded-xl border border-white/10`}
                        >
                          <div className={`text-2xl font-bold ${service.accentColor} mb-1`}>{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}

                    {/* Arrow Navigation */}
                    {index === services.length - 1 && (
                      <motion.div
                        className="flex items-center space-x-4 pt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => window.open("https://www.youtube.com/@blockenfy", "_blank")}
                          className="group flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300"
                        >
                          <span className="text-white font-medium">{t("services.podcast")}</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Enhanced UI Graphics */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <ServiceUIGraphic service={service} index={index} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced UI Graphics Components
function ServiceUIGraphic({ service, index }: { service: any; index: number }) {
  const getServiceGraphic = () => {
    switch (service.id) {
      case "website":
        return <WebsiteUIGraphic service={service} />
      case "mobile":
        return <MobileUIGraphic service={service} />
      case "digital":
        return <DigitalSystemsUIGraphic service={service} />
      case "mechanical":
        return <MechanicalUIGraphic service={service} />
      case "product":
        return <ProductUIGraphic service={service} />
      case "architecture":
        return <ArchitectureUIGraphic service={service} />
      default:
        return <WebsiteUIGraphic service={service} />
    }
  }

  return (
    <div className="relative">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main UI Container */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-gray-300 rounded-3xl p-8 overflow-hidden shadow-2xl">
        {getServiceGraphic()}
      </div>
    </div>
  )
}

function WebsiteUIGraphic({ service }: { service: any }) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Enhanced Browser Window */}
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-xl">
        <div className="flex items-center space-x-2 px-4 py-3 bg-gray-200">
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          <div className="flex-1 bg-white rounded px-3 py-1 ml-4 shadow-inner">
            <span className="text-xs text-gray-600">https://mercadocripto.net</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></div>
            <div className="w-4 h-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 min-h-[200px]">
          <div className="space-y-4">
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4 shadow-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <div className="h-3 bg-gray-300 rounded w-full shadow-sm"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 shadow-sm"></div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-16 bg-gradient-to-br from-gray-200 to-gray-100 rounded shadow-md hover:shadow-lg transition-shadow"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">{t("tokenization.tokens_sold")}</span>
            <Gauge className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">63,600/72,000</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">{t("tokenization.online")}</span>
            <Activity className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">100%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MobileUIGraphic({ service }: { service: any }) {
  return (
    <div className="flex justify-center items-center space-x-6">
      {/* Enhanced Phone Mockup */}
      <div className="relative">
        <div className="w-48 h-80 bg-gray-900 rounded-3xl p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 text-xs">
              <span className="font-medium">9:41</span>
              <div className="flex space-x-1">
                <div className="w-4 h-2 bg-gray-500 rounded-sm"></div>
                <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
              </div>
            </div>

            {/* App Content */}
            <div className="p-4 space-y-4">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4 shadow-sm"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-300 rounded w-full shadow-sm"></div>
                <div className="h-2 bg-gray-300 rounded w-2/3 shadow-sm"></div>
              </div>

              {/* Interactive Cards */}
              <div className="space-y-3 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-sm"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
              <div className="flex justify-around">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-6 h-6 rounded ${i === 1 ? "bg-gray-700" : "bg-gray-300"} shadow-sm`}
                    animate={i === 1 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced App Features */}
      <div className="space-y-4">
        {service.features.slice(0, 3).map((feature: any, index: number) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-md"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-gray-600">{feature.icon}</div>
            <span className="text-sm text-gray-700 font-medium">{feature.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DigitalSystemsUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced System Architecture */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 gap-4">
          {/* Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Data Sources</h4>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded shadow-md flex items-center justify-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Database className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </div>

          {/* Processing */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Processing</h4>
            <motion.div
              className="h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded shadow-lg flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              whileHover={{ scale: 1.1 }}
            >
              <Cog className="w-8 h-8 text-white animate-spin" style={{ animationDuration: "3s" }} />
            </motion.div>
          </div>

          {/* Outputs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Outputs</h4>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded shadow-md flex items-center justify-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 + 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Cloud className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Flow Arrows */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Performance Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Efficiency</span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">+250%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Automation</span>
            <Zap className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">95%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MechanicalUIGraphic({ service }: { service: any }) {
  const { t } = useLanguage()
  const [selectedAsset, setSelectedAsset] = useState<string>(t("tokenization.properties"))

  const assetOptions = [
    t("tokenization.properties"),
    t("tokenization.vehicles"),
    t("tokenization.green_bonds"),
    t("tokenization.many_more"),
  ]

  return (
    <div className="space-y-6">
      {/* Enhanced 3D Model Viewer */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-l font-semibold text-gray-700">{t("tokenization.what_can_tokenize")}</h4>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>

        {/* 3D Viewport - Increased height for larger assets */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden shadow-inner">
          {selectedAsset === t("tokenization.properties") ? (
            <motion.div
              key="house"
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: [0, 360],
                rotateX: [0, 15, 0],
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                rotateX: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Roof */}
              <div
                className="w-20 h-6 bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg mx-auto mb-0"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              ></div>

              {/* Walls */}
              <div className="w-16 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-b-sm mx-auto shadow-lg relative">
                {/* Windows */}
                <div className="absolute top-1 left-1 w-3 h-3 bg-gray-300 rounded-sm shadow-inner"></div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-gray-300 rounded-sm shadow-inner"></div>
                {/* Door */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gray-200 rounded-b-sm shadow-inner"></div>
              </div>

              {/* Foundation */}
              <div className="w-20 h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm shadow-md"></div>
            </motion.div>
          ) : selectedAsset === t("tokenization.vehicles") ? (
            <motion.div
              key="car"
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: [0, 360],
                rotateX: [0, 10, 0],
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                rotateX: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Car Body */}
              <div className="relative">
                {/* Main body */}
                <div className="w-24 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg shadow-lg relative">
                  {/* Windshield */}
                  <div className="absolute top-0 left-6 w-8 h-4 bg-gray-300 rounded-t-lg shadow-inner"></div>
                  {/* Side windows */}
                  <div className="absolute top-1 left-2 w-3 h-2 bg-gray-300 rounded-sm shadow-inner"></div>
                  <div className="absolute top-1 right-2 w-3 h-2 bg-gray-300 rounded-sm shadow-inner"></div>
                </div>

                {/* Hood/Front */}
                <div className="w-20 h-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-t-sm mx-auto -mt-1 shadow-md"></div>

                {/* Wheels */}
                <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full shadow-lg border-2 border-gray-600">
                  <div className="w-2 h-2 bg-gray-400 rounded-full m-auto mt-1"></div>
                </div>
                <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full shadow-lg border-2 border-gray-600">
                  <div className="w-2 h-2 bg-gray-400 rounded-full m-auto mt-1"></div>
                </div>

                {/* Headlights */}
                <div className="absolute top-3 left-0 w-1 h-1 bg-yellow-300 rounded-full shadow-sm"></div>
                <div className="absolute top-3 right-0 w-1 h-1 bg-yellow-300 rounded-full shadow-sm"></div>
              </div>
            </motion.div>
          ) : selectedAsset === t("tokenization.green_bonds") ? (
            <motion.div
              key="tree"
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: [0, 360],
                rotateX: [0, 10, 0],
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                rotateX: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Tree foliage - top layer */}
              <div
                className="w-12 h-6 bg-gradient-to-br from-green-300 to-green-500 shadow-lg mx-auto"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              ></div>

              {/* Tree foliage - middle layer */}
              <div
                className="w-16 h-7 bg-gradient-to-br from-green-400 to-green-600 -mt-1 shadow-lg mx-auto"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              ></div>

              {/* Tree foliage - bottom layer */}
              <div
                className="w-20 h-8 bg-gradient-to-br from-green-500 to-green-700 -mt-1 shadow-lg mx-auto"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              ></div>

              {/* Tree trunk */}
              <div className="w-4 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-sm shadow-lg mx-auto -mt-2"></div>

              {/* Small leaves/details */}
              <motion.div
                className="absolute top-2 left-1/2 w-2 h-2 bg-green-400 rounded-full shadow-sm"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </motion.div>
          ) : selectedAsset === t("tokenization.many_more") ? (
            <motion.div
              key="multi"
              className="grid grid-cols-2 gap-6 w-full px-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mini House - Reversed order: roof first, then walls, then foundation */}
              <motion.div
                className="flex flex-col items-center justify-center bg-white/50 rounded-lg p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative scale-75">
                  {/* Roof */}
                  <div
                    className="w-20 h-6 bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg mx-auto mb-0"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                  ></div>

                  {/* Walls */}
                  <div className="w-16 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-b-sm mx-auto shadow-lg relative">
                    <div className="absolute top-1 left-1 w-3 h-3 bg-gray-300 rounded-sm shadow-inner"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 bg-gray-300 rounded-sm shadow-inner"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gray-200 rounded-b-sm shadow-inner"></div>
                  </div>

                  {/* Foundation */}
                  <div className="w-20 h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm shadow-md"></div>
                </div>
                <span className="text-sm text-gray-700 font-medium mt-2">{t("tokenization.properties")}</span>
              </motion.div>

              {/* Mini Car - Increased scale from 50% to 75% */}
              <motion.div
                className="flex flex-col items-center justify-center bg-white/50 rounded-lg p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative scale-75">
                  <div className="w-24 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg shadow-lg relative">
                    <div className="absolute top-0 left-6 w-8 h-4 bg-gray-300 rounded-t-lg shadow-inner"></div>
                  </div>
                  <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full shadow-lg border-2 border-gray-600"></div>
                  <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full shadow-lg border-2 border-gray-600"></div>
                </div>
                <span className="text-sm text-gray-700 font-medium mt-2">{t("tokenization.vehicles")}</span>
              </motion.div>

              {/* Mini Tree - Increased scale from 50% to 75% */}
              <motion.div
                className="flex flex-col items-center justify-center bg-white/50 rounded-lg p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative scale-75">
                  {/* Tree foliage - top layer */}
                  <div
                    className="w-16 h-7 bg-gradient-to-br from-green-400 to-green-600 shadow-lg mx-auto"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                  ></div>

                  {/* Tree foliage - bottom layer */}
                  <div
                    className="w-20 h-8 bg-gradient-to-br from-green-500 to-green-700 -mt-1 shadow-lg mx-auto"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                  ></div>

                  {/* Tree trunk */}
                  <div className="w-4 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-sm shadow-lg mx-auto -mt-2"></div>
                </div>
                <span className="text-sm text-gray-700 font-medium mt-2">{t("tokenization.green_bonds")}</span>
              </motion.div>

              {/* Mini Financial Asset - Increased scale from 75% to 90% */}
              <motion.div
                className="flex flex-col items-center justify-center bg-white/50 rounded-lg p-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative scale-90">
                  {/* Stack of coins */}
                  <div className="relative">
                    <div className="w-12 h-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg"></div>
                    <div className="w-12 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg -mt-2"></div>
                    <div className="w-12 h-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg -mt-2"></div>
                    {/* Dollar sign */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-900 font-bold text-lg">
                      $
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium mt-2">{t("tokenization.financial_assets")}</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {t("tokenization.coming_soon")}
            </motion.div>
          )}

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.2'%3E%3Cpath d='M0 0h20v1H0zM0 0v20h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {assetOptions.map((tool, index) => (
              <motion.button
                key={tool}
                onClick={() => setSelectedAsset(tool)}
                className={`px-3 py-1 text-xs rounded shadow-sm border transition-colors ${
                  selectedAsset === tool
                    ? "bg-gray-700 text-white border-gray-800"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Specifications */}
      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  )
}

function ProductUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Product Development Pipeline */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Development Pipeline</h4>
        <div className="space-y-4">
          {["Ideation", "Validation", "MVP", "Launch"].map((stage, index) => (
            <motion.div
              key={stage}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                  index <= 2 ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white" : "bg-gray-300 text-gray-600"
                }`}
                animate={index <= 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                {index <= 2 ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Lightbulb className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Target className="w-4 h-4" />
                )}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{stage}</span>
                  <span className="text-xs text-gray-500">{index <= 2 ? "Complete" : "In Progress"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1 shadow-inner">
                  <motion.div
                    className={`h-2 rounded-full shadow-sm ${
                      index <= 2 ? "bg-gradient-to-r from-gray-600 to-gray-800" : "bg-gray-300"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: index <= 2 ? "100%" : "60%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Success Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Success Rate</span>
            <Star className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">92%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-gray-600 to-gray-700 h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">ROI Average</span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">3.2x</div>
          <div className="text-xs text-gray-500 mt-1">Return on Investment</div>
        </motion.div>
      </div>
    </div>
  )
}

function ArchitectureUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Blueprint Viewer */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700">Blueprint Viewer</h4>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>

        {/* Blueprint Canvas */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-40 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-300">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.2'%3E%3Cpath d='M0 0h20v1H0zM0 0v20h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Building Structure */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Foundation */}
            <motion.div
              className="w-32 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm shadow-md"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>

            {/* Walls */}
            <motion.div
              className="w-28 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-t-sm mx-auto -mt-1 shadow-lg relative"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Windows */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-gray-300 rounded-sm shadow-inner"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-gray-300 rounded-sm shadow-inner"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-200 rounded-sm shadow-inner"></div>
            </motion.div>

            {/* Roof */}
            <motion.div
              className="w-32 h-8 bg-gradient-to-r from-gray-600 to-gray-700 transform -skew-y-12 -mt-2 shadow-lg"
              animate={{ rotateZ: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Enhanced Tools */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {["2D", "3D", "VR"].map((view, index) => (
              <motion.button
                key={view}
                className={`px-3 py-1 text-xs rounded shadow-sm border transition-colors ${
                  index === 1
                    ? "bg-gray-700 text-white border-gray-800"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {view}
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-gray-500">Scale: 1:100</div>
        </div>
      </div>

      {/* Enhanced Project Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Projects</span>
            <Building2 className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">150+</div>
          <div className="text-xs text-gray-500 mt-1">Completed</div>
        </motion.div>
        <motion.div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-md" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Satisfaction</span>
            <Award className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">96%</div>
          <div className="text-xs text-gray-500 mt-1">Client Rating</div>
        </motion.div>
      </div>
    </div>
  )
}

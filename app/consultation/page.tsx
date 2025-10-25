"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BusinessProfileHeader } from "@/components/business-profile-header"
import {
  ChevronRight,
  ChevronLeft,
  Building,
  DollarSign,
  Target,
  Calendar,
  Rocket,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Cog,
  Package,
  Building2,
  Laptop,
  TrendingUp,
  BarChart,
  Shield,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

type ConsultationData = {
  businessType: string
  companySize: string
  budget: string
  projectType: string[]
  timeline: string
  goals: string[]
  name: string
  email: string
  company: string
  phone: string
  isGuest: boolean
}

export default function ConsultationPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGuest, setIsGuest] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    businessType: "",
    companySize: "",
    budget: "",
    projectType: [],
    timeline: "",
    goals: [],
    name: "",
    email: "",
    company: "",
    phone: "",
    isGuest: false,
  })

  useEffect(() => {
    const savedStep = localStorage.getItem("consultationStep")
    const savedData = localStorage.getItem("consultationData")

    if (savedStep) {
      setCurrentStep(Number.parseInt(savedStep))
    }

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setConsultationData(parsedData)
      } catch (error) {
        console.error("Error parsing saved consultation data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("consultationStep", currentStep.toString())
    localStorage.setItem("consultationData", JSON.stringify(consultationData))
  }, [currentStep, consultationData])

  useEffect(() => {
    const updateData = {
      service: consultationData.projectType.join(", "),
      businessName: consultationData.company,
      businessType: consultationData.businessType,
      companySize: consultationData.companySize,
      budget: consultationData.budget,
      timeline: consultationData.timeline,
      contactName: consultationData.name,
      email: consultationData.email,
    }

    if (Object.values(updateData).some((val) => val && val.trim() !== "")) {
      window.dispatchEvent(new CustomEvent("showProfileDropdown", { detail: updateData }))
      window.dispatchEvent(new CustomEvent("updateProfileDropdown", { detail: updateData }))
    }
  }, [consultationData])

  const steps = [
    { id: "business", title: t("consultation.step_asset"), icon: Building, color: "emerald" },
    { id: "size", title: t("consultation.step_amount"), icon: DollarSign, color: "blue" },
    { id: "service", title: t("consultation.step_service"), icon: Target, color: "purple" },
    { id: "contact", title: t("consultation.step_contact"), icon: Calendar, color: "pink" },
  ]

  const businessTypes = [
    {
      id: "Real estate",
      label: t("consultation.asset_real_estate"),
      description: t("consultation.asset_real_estate_desc"),
      icon: "🏠",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30",
    },
    {
      id: "Vehicles",
      label: t("consultation.asset_vehicles"),
      description: t("consultation.asset_vehicles_desc"),
      icon: "🚗",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    {
      id: "Company Shares",
      label: t("consultation.asset_company_shares"),
      description: t("consultation.asset_company_shares_desc"),
      icon: "🏢",
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
    },
    {
      id: "Commodities",
      label: t("consultation.asset_commodities"),
      description: t("consultation.asset_commodities_desc"),
      icon: "🪙",
      gradient: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
    },
    {
      id: "Art & Collectibles",
      label: t("consultation.asset_art"),
      description: t("consultation.asset_art_desc"),
      icon: "🎨",
      gradient: "from-pink-500/20 to-rose-500/20",
      border: "border-pink-500/30",
    },
    {
      id: "Investment Funds",
      label: t("consultation.asset_funds"),
      description: t("consultation.asset_funds_desc"),
      icon: "💰",
      gradient: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/30",
    },
    {
      id: "Otros",
      label: t("consultation.asset_other"),
      description: t("consultation.asset_other_desc"),
      icon: "💼",
      gradient: "from-gray-500/20 to-gray-700/20",
      border: "border-gray-500/30",
    },
  ]

  const companySizes = [
    { id: "1-10", label: "1-10 employees", description: "Small team", icon: "👥" },
    { id: "11-50", label: "11-50 employees", description: "Growing company", icon: "🏢" },
    { id: "51-200", label: "51-200 employees", description: "Mid-size", icon: "🏬" },
    { id: "200+", label: "200+ employees", description: "Large corp", icon: "🏭" },
  ]

  const projectTypes = [
    {
      id: "website",
      label: "Website Development",
      icon: <Globe className="w-6 h-6" />,
      color: "emerald",
      description: "Web applications",
    },
    {
      id: "mobile",
      label: "Mobile App adsad",
      icon: <Smartphone className="w-6 h-6" />,
      color: "blue",
      description: "iOS & Android",
    },
    {
      id: "digital",
      label: "Digital Systems ASD",
      icon: <Laptop className="w-6 h-6" />,
      color: "purple",
      description: "Enterprise software",
    },
    {
      id: "mechanical",
      label: "Mechanical Engineering",
      icon: <Cog className="w-6 h-6" />,
      color: "orange",
      description: "Product design",
    },
    {
      id: "product",
      label: "Product Development",
      icon: <Package className="w-6 h-6" />,
      color: "cyan",
      description: "End-to-end solutions",
    },
    {
      id: "architecture",
      label: "Architecture Design",
      icon: <Building2 className="w-6 h-6" />,
      color: "indigo",
      description: "Structural design",
    },
  ]

  const tokenizationAmounts = [
    {
      id: "less-100k",
      label: t("consultation.amount_less_100k"),
      description: t("consultation.amount_less_100k_desc"),
      icon: "💡",
    },
    {
      id: "100k-500k",
      label: t("consultation.amount_100k_500k"),
      description: t("consultation.amount_100k_500k_desc"),
      icon: "🚀",
    },
    {
      id: "500k-2m",
      label: t("consultation.amount_500k_2m"),
      description: t("consultation.amount_500k_2m_desc"),
      icon: "🏢",
    },
    {
      id: "2m+",
      label: t("consultation.amount_2m_plus"),
      description: t("consultation.amount_2m_plus_desc"),
      icon: "💰",
    },
  ]

  const timelines = [
    { id: "asap", label: "ASAP", description: "Immediate start", icon: "⚡" },
    { id: "1-3months", label: "1-3 months", description: "Planning phase", icon: "📅" },
    { id: "3-6months", label: "3-6 months", description: "Flexible dev", icon: "🎯" },
    { id: "6months+", label: "6+ months", description: "Long-term", icon: "🗺️" },
  ]

  const businessGoals = [
    {
      id: "increase-sales",
      label: t("consultation.goal_increase_sales"),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "emerald",
    },
    {
      id: "improve-efficiency",
      label: t("consultation.goal_improve_efficiency"),
      icon: <Rocket className="w-5 h-5" />,
      color: "blue",
    },
    {
      id: "expand-market",
      label: t("consultation.goal_expand_market"),
      icon: <Target className="w-5 h-5" />,
      color: "purple",
    },
    {
      id: "reduce-costs",
      label: t("consultation.goal_reduce_costs"),
      icon: <BarChart className="w-5 h-5" />,
      color: "green",
    },
    {
      id: "modernize",
      label: t("consultation.goal_modernize"),
      icon: <Sparkles className="w-5 h-5" />,
      color: "orange",
    },
    {
      id: "competitive-advantage",
      label: t("consultation.goal_competitive_advantage"),
      icon: <Shield className="w-5 h-5" />,
      color: "cyan",
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(false)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '5950b765-b4d7-464a-a8fc-a0b7b42fcb62',
          name: consultationData.name,
          email: consultationData.email,
          company: consultationData.company || 'No especificada',
          phone: consultationData.phone || 'No especificado',
          businessType: consultationData.businessType,
          budget: consultationData.budget,
          projectType: consultationData.projectType.join(", "),
          goals: consultationData.goals.join(", "),
          subject: 'Nueva consulta de tokenización - Blockenfy',
          from_name: 'Blockenfy Consultation Form',
          replyto: consultationData.email,
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setEnviado(true)
        localStorage.removeItem("consultationStep")
        localStorage.removeItem("consultationData")
        
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        throw new Error('Error en el envío')
      }
      
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleProjectType = (typeId: string) => {
    setConsultationData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(typeId)
        ? prev.projectType.filter((id) => id !== typeId)
        : [...prev.projectType, typeId],
    }))
  }

  const toggleGoal = (goalId: string) => {
    setConsultationData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId) ? prev.goals.filter((id) => id !== goalId) : [...prev.goals, goalId],
    }))
  }

  const serviceOptions = [
    {
      id: "Técnico",
      label: t("consultation.service_technical"),
      description: t("consultation.service_technical_desc"),
      icon: <Cog className="w-6 h-6" />,
      color: "emerald",
    },
    {
      id: "Legal",
      label: t("consultation.service_legal"),
      description: t("consultation.service_legal_desc"),
      icon: <Shield className="w-6 h-6" />,
      color: "blue",
    },
    {
      id: "Marketing",
      label: t("consultation.service_marketing"),
      description: t("consultation.service_marketing_desc"),
      icon: <Rocket className="w-6 h-6" />,
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <NavBar />
      <BusinessProfileHeader />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center py-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                  {t("consultation.step")} {currentStep + 1} {t("consultation.of")} {steps.length}
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center w-1/4">
                  <step.icon
                    className={`w-5 h-5 mb-1 ${index <= currentStep ? "text-emerald-400" : "text-gray-500"}`}
                  />
                  <span className={index <= currentStep ? "text-white" : "text-gray-500"}>{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px] flex flex-col justify-center"
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Building className="w-6 h-6 mr-3 text-emerald-400" />
                        {t("consultation.asset_question")}
                      </h2>
                      <p className="text-gray-400">{t("consultation.asset_help")}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {businessTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => setConsultationData({ ...consultationData, businessType: type.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.businessType === type.id
                              ? `${type.border} bg-gradient-to-br ${type.gradient} shadow-xl`
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{type.label}</h3>
                          <p className="text-gray-400 text-xs">{type.description}</p>
                          {consultationData.businessType === type.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                        {t("consultation.amount_question")}
                      </h2>
                      <p className="text-gray-400">{t("consultation.amount_help")}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {tokenizationAmounts.map((amount) => (
                        <motion.button
                          key={amount.id}
                          onClick={() => setConsultationData({ ...consultationData, budget: amount.id })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            consultationData.budget === amount.id
                              ? "border-green-500 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-xl"
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">{amount.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{amount.label}</h3>
                          <p className="text-gray-400 text-xs">{amount.description}</p>
                          {consultationData.budget === amount.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Target className="w-6 h-6 mr-3 text-purple-400" />
                        {t("consultation.service_question")}
                      </h2>
                      <p className="text-gray-400">{t("consultation.service_help")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                      {serviceOptions.map((service) => (
                        <motion.button
                          key={service.id}
                          onClick={() => toggleProjectType(service.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            consultationData.projectType.includes(service.id)
                              ? `border-${service.color}-500 bg-gradient-to-br from-${service.color}-500/20 to-${service.color}-600/20 shadow-xl`
                              : "border-gray-700/50 hover:border-gray-600 bg-gray-800/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`text-${service.color}-400 mb-2`}>{service.icon}</div>
                          <h3 className="text-sm font-bold mb-1 text-white">{service.label}</h3>
                          <p className="text-gray-400 text-xs">{service.description}</p>
                          {consultationData.projectType.includes(service.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`absolute top-2 right-2 w-5 h-5 bg-${service.color}-500 rounded-full flex items-center justify-center`}
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold flex items-center justify-center">
                        <Calendar className="w-6 h-6 mr-3 text-emerald-400" />
                        {t("consultation.contact_question")}
                      </h2>
                    </div>

                    {/* Guest Mode Toggle */}

                    {!isGuest && (
                      <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {t("consultation.form_name")} {t("consultation.form_required")}
                            </label>
                            <input
                              type="text"
                              value={consultationData.name}
                              onChange={(e) => setConsultationData({ ...consultationData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder={t("consultation.form_name_placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {t("consultation.form_email")} {t("consultation.form_required")}
                            </label>
                            <input
                              type="email"
                              value={consultationData.email}
                              onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder={t("consultation.form_email_placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {t("consultation.form_company")}
                            </label>
                            <input
                              type="text"
                              value={consultationData.company}
                              onChange={(e) => setConsultationData({ ...consultationData, company: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder={t("consultation.form_company_placeholder")}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {t("consultation.form_phone")}
                            </label>
                            <input
                              type="tel"
                              value={consultationData.phone}
                              onChange={(e) => setConsultationData({ ...consultationData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-all"
                              placeholder={t("consultation.form_phone_placeholder")}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {isGuest && (
                      <div className="max-w-xl mx-auto">
                        <div className="text-center p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="font-bold text-emerald-400 mb-2">{t("consultation.guest_mode_active")}</h3>
                          <p className="text-gray-400">{t("consultation.guest_mode_explore")}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t("consultation.btn_back")}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                {t("consultation.btn_next")}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex flex-col items-end space-y-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !consultationData.name || !consultationData.email}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("consultation.btn_submitting")}
                    </>
                  ) : isGuest ? (
                    t("consultation.btn_preview")
                  ) : (
                    t("consultation.btn_submit")
                  )}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                {enviado && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-sm flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t("consultation.success_message")}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center"
                  >
                    ❌ {t("consultation.error_message")}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

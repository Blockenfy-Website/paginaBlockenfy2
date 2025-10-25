"use client"

import type React from "react"

import type { ReactElement } from "react"
import { DashboardChart } from "@/components/dashboard-chart"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Laptop, ChevronLeft, ChevronRight, Play, Volume2 } from "lucide-react"
import { Gavel, Megaphone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ExpertiseSection(): ReactElement {
  const { t } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const zeroOneRef = useRef(null)
  const zeroOneInView = useInView(zeroOneRef, { once: true, amount: 0.5 })
  const [showOne, setShowOne] = useState(false)

  useEffect(() => {
    if (zeroOneInView) {
      const timer = setTimeout(() => {
        setShowOne(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [zeroOneInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const reels = [
    {
      name: t("testimonial.carlos.name"),
      quote: t("testimonial.carlos.quote"),
      rating: "★★★★★",
      video: "https://blockenar.com/testimonioCarlos.mp4",
      link: "https://mercadocripto.net",
    },
    {
      name: t("testimonial.gustavo.name"),
      quote: t("testimonial.gustavo.quote"),
      rating: "★★★★★",
      video: "https://ik.imagekit.io/n3ijuzptd/BlockFi_%20Tokenizacio%CC%81n%20de%20Propiedades%20con%20Gustavo%20Manuele%20(2).mp4?updatedAt=1761424141388",
      link: "https://khoros.space",
    },
  ]

  const [current, setCurrent] = useState(0)

  const nextVideo = () => setCurrent((prev) => (prev + 1) % reels.length)
  const prevVideo = () => setCurrent((prev) => (prev - 1 + reels.length) % reels.length)

  return (
    <section id="expertise" className="min-h-screen px-4 sm:px-6 py-16 relative overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12 flex-1 flex flex-col"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
              {t("expertise.what_clients_say")} <span className="font-light italic">{t("expertise.clients")}</span>
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          >
            {/* Left side: Reel Video */}
            <div className="w-full lg:w-auto flex justify-center">
              <ReelVideoCarousel />
            </div>

            {/* Right side: Data Card */}
            <div className="w-full lg:w-[580px] max-w-full">
              <div className="h-auto min-h-[600px] lg:h-[780px] rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 shadow-2xl">
                <div className="space-y-4">
                  {/* Main heading with count-up animation */}
                  <div className="space-y-1">
                    <ViewportTriggeredCountUp />
                    <p className="text-gray-400 text-sm leading-snug">{t("expertise.help_description")}</p>
                  </div>

                  {/* Metrics section */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <h4 className="text-base font-semibold text-white">{t("expertise.client_metrics")}</h4>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                        <div className="text-xl font-bold text-primary">15+</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t("expertise.completed_projects")}</div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                        <div className="text-xl font-bold text-primary">98%</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t("expertise.client_satisfaction")}</div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                        <div className="text-xl font-bold text-primary">$2M+</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t("expertise.capital_raised")}</div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                        <div className="text-xl font-bold text-primary">24h</div>
                        <div className="text-xs text-gray-400 mt-0.5">{t("expertise.response_time")}</div>
                      </div>
                    </div>

                    {/* Chart section */}
                    <div className="pt-1">
                      <DashboardChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ReelVideoCarousel(): ReactElement {
  const { t } = useLanguage()

  const reels = [
    {
      name: t("testimonial.carlos.name"),
      quote: t("testimonial.carlos.quote"),
      rating: "★★★★★",
      video: "https://blockenar.com/testimonioCarlos.mp4",
       link: "https://mercadocripto.net",
    },
    {
      name: t("testimonial.gustavo.name"),
      quote: t("testimonial.gustavo.quote"),
      rating: "★★★★★",
      video: "https://ik.imagekit.io/n3ijuzptd/BlockFi_%20Tokenizacio%CC%81n%20de%20Propiedades%20con%20Gustavo%20Manuele%20(2).mp4?updatedAt=1761424141388",
      link: "https://khoros.space",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextVideo = () => {
    setCurrent((prev) => (prev + 1) % reels.length)
    setIsPlaying(false)
    setIsMuted(true)
  }

  const prevVideo = () => {
    setCurrent((prev) => (prev - 1 + reels.length) % reels.length)
    setIsPlaying(false)
    setIsMuted(true)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
      }
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      setIsPlaying(false)
      setIsMuted(true)
    }
  }, [current])

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.currentTime = 1
    }
  }

  return (
    <div className="relative w-[400px] h-[700px] rounded-3xl overflow-hidden border-2 border-white/20 bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
      {/* Flecha izquierda */}
      <button
        onClick={prevVideo}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-20 transition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextVideo}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-20 transition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Contenido */}
      <motion.div
        key={current}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5 }}
      >
        <video
          ref={videoRef}
          key={reels[current].video}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleVideoLoadedMetadata}
          className="w-full h-full object-cover"
        >
          <source src={reels[current].video} type="video/mp4" />
        </video>

        {/* Play/Pause button overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-6 rounded-full z-10 transition-all duration-300 group"
          >
            <Play className="w-10 h-10 text-white ml-1" />
          </button>
        )}

        {/* Audio indicator when playing */}
        {isPlaying && !isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10"
          >
            <Volume2 className="w-5 h-5 text-white" />
          </motion.div>
        )}

        {/* Overlay de texto */}
{/* Overlay de texto */}
<motion.div
  key={current}
  className="absolute inset-0"
  initial={{ opacity: 0, scale: 1.02 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.5 }}
>
  {/* El video ya no bloquea clics */}
  <video
    ref={videoRef}
    key={reels[current].video}
    loop
    muted={isMuted}
    playsInline
    preload="metadata"
    onLoadedMetadata={handleVideoLoadedMetadata}
    className="w-full h-full object-cover pointer-events-none"
  >
    <source src={reels[current].video} type="video/mp4" />
  </video>

  {/* Play/Pause button overlay */}
  {!isPlaying && (
    <button
      onClick={togglePlayPause}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-6 rounded-full z-10 transition-all duration-300 group"
    >
      <Play className="w-10 h-10 text-white ml-1" />
    </button>
  )}

  {/* Audio indicator when playing */}
  {isPlaying && !isMuted && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10"
    >
      <Volume2 className="w-5 h-5 text-white" />
    </motion.div>
  )}

  {/* Overlay de texto con botón clickeable */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
    <motion.h2
      key={reels[current].name}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-white text-xl font-bold mb-1"
    >
      {reels[current].name}
    </motion.h2>

    <p className="text-yellow-400 text-sm mb-2">{reels[current].rating}</p>

    <motion.p
      key={reels[current].quote}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-gray-200 italic text-base leading-snug mb-6"
    >
      "{reels[current].quote}"
    </motion.p>

    {/* Este contenedor sí permite clics */}
    <div className="flex justify-center pb-6 pointer-events-auto">
      <a
        href={reels[current].link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-full text-sm transition-all duration-300 backdrop-blur-sm"
      >
        Ir al proyecto
      </a>
    </div>
  </div>
</motion.div>


      </motion.div>

      {/* Indicadores */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-20">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

function ViewportTriggeredCountUp(): ReactElement {
  const { t } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < 125) {
            return prev + 1
          }
          clearInterval(timer)
          return 125
        })
      }, 200)

      return () => clearInterval(timer)
    }
  }, [isInView])

  return (
    <h3 ref={ref} className="text-3xl font-bold text-white leading-tight">
      ${count}K <span className="text-primary">{t("expertise.tokenized_dollars")}</span>
    </h3>
  )
}

function CompanyLogoTicker(): ReactElement {
  return (
    <div className="relative h-16 overflow-hidden">
      {/* First row - moving left */}
      <motion.div
        className="absolute top-1 whitespace-nowrap flex items-center gap-8"
        animate={{
          x: [0, -1500],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 30,
            ease: "linear",
          },
        }}
      >
        <div className="h-5 w-auto">
          <img
            src="/images/weltivation-logo.png"
            alt="Weltivation"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/placeholder-jo7vj.png"
            alt="NVIDIA"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/nicfound-logo.png"
            alt="NicFound"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/google-search-results.png"
            alt="Google"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/fisher-labs-sign.png"
            alt="Fisher Labs"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/bevel-razors.png"
            alt="Bevel Razers"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/weltivation-logo.png"
            alt="Weltivation"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/chatchill-generic.png"
            alt="Chatchill"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Duplicate set for seamless looping */}
        <div className="h-5 w-auto">
          <img
            src="/images/weltivation-logo.png"
            alt="Weltivation"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/placeholder-jo7vj.png"
            alt="NVIDIA"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/nicfound-logo.png"
            alt="NicFound"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/google-search-results.png"
            alt="Google"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </motion.div>

      {/* Second row - moving right */}
      <motion.div
        className="absolute top-9 whitespace-nowrap flex items-center gap-8"
        animate={{
          x: [-1500, 0],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 35,
            ease: "linear",
          },
        }}
      >
        <div className="h-5 w-auto">
          <img
            src="/images/pufftrak-logo.png"
            alt="PuffTrak"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/fisher-labs-sign.png"
            alt="Fisher Labs"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/bevel-razors.png"
            alt="Bevel Razers"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/weltivation-logo.png"
            alt="Weltivation"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/google-search-results.png"
            alt="Google"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/pufftrak-logo.png"
            alt="PuffTrak"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/chatchill-generic.png"
            alt="Chatchill"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/nicfound-logo.png"
            alt="NicFound"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Duplicate set for seamless looping */}
        <div className="h-5 w-auto">
          <img
            src="/images/pufftrak-logo.png"
            alt="PuffTrak"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/fisher-labs-sign.png"
            alt="Fisher Labs"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/bevel-razors.png"
            alt="Bevel Razers"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="h-5 w-auto">
          <img
            src="/images/weltivation-logo.png"
            alt="Weltivation"
            className="h-5 w-auto object-contain filter grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </motion.div>
    </div>
  )
}

function ServiceSelectionCard(): ReactElement {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const services = [
    {
      id: "tecnico",
      name: "Equipo Técnico",
      icon: <Laptop className="w-6 h-6" />, // ícono de laptop
      color: "from-orange-500 to-orange-600",
      hoverColor: "from-orange-400 to-orange-500",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
    },
    {
      id: "legal",
      name: "Equipo Legal",
      icon: <Gavel className="w-6 h-6" />, // ícono de martillo legal
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-400 to-blue-500",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
    },
    {
      id: "marketing",
      name: "Equipo Marketing",
      icon: <Megaphone className="w-6 h-6" />, // ícono de megáfono
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-400 to-green-500",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
    },
  ]

  const questions = [
    {
      id: "businessName",
      question: "What's your business name?",
      type: "input",
      placeholder: "Enter your business name",
    },
    {
      id: "businessType",
      question: "What type of business do you have?",
      options: ["Startup", "Small Business", "Enterprise", "Non-Profit"],
    },
    {
      id: "companySize",
      question: "How many employees does your company have?",
      options: ["1-10", "11-50", "51-200", "201+"],
    },
    {
      id: "goal",
      question: "What's your primary goal?",
      options: ["Increase Revenue", "Improve Efficiency", "Scale Operations", "Digital Transformation"],
    },
    {
      id: "budget",
      question: "What's your budget range?",
      options: ["$1K-$5K", "$5K-$15K", "$15K-$50K", "$50K+"],
    },
    {
      id: "timeline",
      question: "What's your timeline?",
      options: ["ASAP", "1-3 Months", "3-6 Months", "6+ Months"],
    },
    {
      id: "location",
      question: "Where is your business located?",
      options: ["North America", "Europe", "Asia", "Other"],
    },
    {
      id: "contactName",
      question: "Who is the primary contact for this project?",
      type: "input",
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      question: "What's the best email to reach you?",
      type: "input",
      placeholder: "Enter your email address",
    },
  ]

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleAnswerSelect = (answer: string) => {
    const currentQuestionData = questions[currentQuestion]
    const newAnswers = { ...answers, [currentQuestionData.id]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      // Send email with inquiry details
      sendInquiryEmail(newAnswers, selectedService)
    }
  }

  const handleCustomAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const answer = formData.get("customAnswer") as string

    if (answer && answer.trim()) {
      handleAnswerSelect(answer.trim())
    }
  }

  const sendInquiryEmail = async (inquiryData: Record<string, string>, serviceType: string | null) => {
    try {
      const selectedServiceData = services.find((s) => s.id === serviceType)
      const emailBody = `
New Consultation Inquiry

Service: ${selectedServiceData?.name || "Unknown"}
Business Name: ${inquiryData.businessName || "Not provided"}
Business Type: ${inquiryData.businessType || "Not provided"}
Company Size: ${inquiryData.companySize || "Not provided"}
Primary Goal: ${inquiryData.goal || "Not provided"}
Budget: ${inquiryData.budget || "Not provided"}
Timeline: ${inquiryData.timeline || "Not provided"}
Location: ${inquiryData.location || "Not provided"}
Contact Name: ${inquiryData.contactName || "Not provided"}
Email: ${inquiryData.email || "Not provided"}

Submitted at: ${new Date().toLocaleString()}
    `

      // This would typically be handled by a server endpoint
      // For now, we'll use mailto as a fallback
      const mailtoLink = `mailto:andrdyer@gmail.com?subject=New Consultation Inquiry - ${selectedServiceData?.name}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink)
    } catch (error) {
      console.error("Error sending inquiry:", error)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      setSelectedService(null)
      setCurrentQuestion(0)
      setAnswers({})
      setIsCompleted(false)
    }
  }

  if (selectedService && !isCompleted) {
    const selectedServiceData = services.find((s) => s.id === selectedService)
    const currentQuestionData = questions[currentQuestion]

    return (
      <div className="h-full rounded-lg border border-border bg-black text-white overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedServiceData?.color} flex items-center justify-center`}
              >
                {selectedServiceData?.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedServiceData?.name} Consultation</h3>
                <p className="text-sm text-gray-400">
                  Step {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            <button onClick={handleBack} className="flex items-center text-gray-400 hover:text-white text-sm">
              ← Back
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6 text-center">{currentQuestionData.question}</h2>

          {currentQuestionData.type === "input" ? (
            <form onSubmit={handleCustomAnswer} className="space-y-4">
              <input
                type={currentQuestionData.id === "email" ? "email" : "text"}
                name="customAnswer"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                placeholder={currentQuestionData.placeholder}
                required
              />
              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
              >
                Continue
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestionData.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className="p-3 border border-gray-700 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all duration-200 text-left"
                >
                  <span className="text-green-400 font-medium text-sm">{option}</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">{questions.length - currentQuestion - 1} questions remaining</p>
          </div>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="h-full rounded-lg border border-border bg-black text-white p-6 flex flex-col justify-center items-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 bg-green-500 rounded-full" />
          </div>
          <h3 className="text-xl font-bold">Thank you!</h3>
          <p className="text-gray-400 text-sm">
            Your inquiry has been sent to our team. We'll get back to you within 24 hours with a customized
            consultation.
          </p>
          <div className="pt-4">
            <button
              onClick={() => (window.location.href = "/consultation")}
              className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors text-sm font-medium"
            >
              Schedule Consultation
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedService(null)
              setCurrentQuestion(0)
              setAnswers({})
              setIsCompleted(false)
            }}
            className="mt-4 text-sm text-gray-400 hover:text-white"
          >
            Start Another Consultation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full rounded-lg border border-border bg-background/50 p-6 hover:border-primary/50 transition-all duration-300">
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">Nuestros servicios</h3>
          <p className="text-muted-foreground">
            Para que tu proyecto de tokenización sea un éxito, necesitás tres pilares: área legal, técnica y marketing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className="relative p-4 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}
              />

              {/* Border */}
              <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors duration-300" />

              {/* Animated glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12">
                  <motion.div
                    className="h-full w-1/3 bg-white/10"
                    animate={{
                      x: ["-100%", "400%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col items-center space-y-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <span
                  className={`text-sm font-medium ${service.textColor} group-hover:text-white transition-colors duration-300`}
                >
                  {service.name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

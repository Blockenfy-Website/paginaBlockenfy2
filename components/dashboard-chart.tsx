"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { TrendingUp, Users, Award, Building, Zap, Target, ArrowUpRight, Globe, Layers } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DashboardChart() {
  const { t } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeMetric, setActiveMetric] = useState(0)

  const metrics = [
    {
      title: t("dashboard.global_reach"),
      value: t("dashboard.countries"),
      change: t("dashboard.countries_change"),
      icon: <Globe className="w-6 h-6" />,
      color: "#10b981",
      description: t("dashboard.countries_description"),
      details: t("dashboard.countries_details"),
    },
    {
      title: t("dashboard.assets_tokenized"),
      value: t("dashboard.assets_value"),
      change: t("dashboard.assets_change"),
      icon: <Layers className="w-6 h-6" />,
      color: "#3b82f6",
      description: t("dashboard.assets_description"),
      details: t("dashboard.assets_details"),
    },
    {
      title: t("dashboard.investors_onboarded"),
      value: t("dashboard.investors_count"),
      change: t("dashboard.investors_change"),
      icon: <Users className="w-6 h-6" />,
      color: "#8b5cf6",
      description: t("dashboard.investors_description"),
      details: t("dashboard.investors_details"),
    },
    {
      title: t("dashboard.client_growth"),
      value: t("dashboard.growth_value"),
      change: t("dashboard.growth_change"),
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#f59e0b",
      description: t("dashboard.growth_description"),
      details: t("dashboard.growth_details"),
    },
    {
      title: t("dashboard.success_rate"),
      value: t("dashboard.success_value"),
      change: t("dashboard.success_change"),
      icon: <Award className="w-6 h-6" />,
      color: "#ef4444",
      description: t("dashboard.success_description"),
      details: t("dashboard.success_details"),
    },
  ]

  // Auto-rotate metrics
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveMetric((prev) => (prev + 1) % metrics.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isInView, metrics.length])

  const currentMetric = metrics[activeMetric]

  return (
    <div
      ref={ref}
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl p-6 relative overflow-hidden border border-gray-700/50 flex flex-col mb-8 md:mb-24 lg:mb-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{t("dashboard.client_metrics")}</h3>
          <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t("dashboard.real_time")}</span>
          </div>
        </div>
      </div>

      {/* Main Metric Display */}
      <div className="relative z-10 text-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMetric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: `${currentMetric.color}20`, border: `2px solid ${currentMetric.color}` }}
            >
              <div style={{ color: currentMetric.color }}>{currentMetric.icon}</div>
            </div>

            {/* Value */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{currentMetric.value}</h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400 text-sm font-medium">{currentMetric.change}</span>
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <p className="text-white font-medium">{currentMetric.description}</p>
              <p className="text-gray-400 text-sm">{currentMetric.details}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Metric Indicators */}
      <div className="relative z-10 flex justify-center space-x-2 mb-6">
        {metrics.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveMetric(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeMetric ? "bg-primary scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Bottom Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg p-3 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Building className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">{t("dashboard.enterprises")}</span>
          </div>
          <p className="text-lg font-bold text-white">47</p>
        </motion.div>
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg p-3 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">{t("dashboard.roi_avg")}</span>
          </div>
          <p className="text-lg font-bold text-white">340%</p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const radius = 120
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            <Zap className="w-3 h-3" />
          </motion.div>
        )
      })}
     
    </div>
  )
}

"use client"

import Link from "next/link"
import { CodeRain } from "@/components/code-rain"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ExpertiseSection } from "@/components/expertise-section"
import { SpinningEarth } from "@/components/spinning-earth"
import { TypingHero } from "@/components/typing-hero"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { ServicesViewportSection } from "@/components/services-viewport-section"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        {/* Spinning Earth */}
        <div className="opacity-10">
          <SpinningEarth />
        </div>
        {/* Code rain */}
        <div className="opacity-10 dark:opacity-10 light:opacity-3">
          <CodeRain />
        </div>
      </div>

      {/* Hero Video - Full screen background */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{
            filter: "contrast(1.2) brightness(0.7) grayscale(100%)",
          }}
        >
          <source src="https://ik.imagekit.io/n3ijuzptd/landing%20%20(2).mov/ik-video.mp4?updatedAt=1761423933999" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <NavBar />
        <ProfileDropdown />

        {/* Hero section with better contrast */}
        <section className="flex flex-col items-center justify-center min-h-[120vh] px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Enhanced hero with better contrast */}
            <div className="relative">
              {/* Background for better contrast in light mode */}
              <div className="absolute inset-0 bg-background/80 dark:bg-transparent rounded-2xl blur-3xl"></div>
              <div className="relative z-10">
                <TypingHero />
              </div>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8"></div>

            {/* Enhanced description with better contrast */}
            {/* <div className="relative">
              <div className="absolute inset-0 bg-background/60 dark:bg-transparent rounded-xl blur-2xl"></div>
              <p className="relative z-10 text-muted-foreground max-w-xl mx-auto font-medium">
                En Blockenfy llevamos tus activos y ganancias al mundo digital, tokenizándolos de forma segura y escalable.
              </p>
            </div> */}

            {/* Button section - Left to Right order */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/consultation" className="group relative">
                  {/* Outer glow layers for depth */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

                  {/* Main button with glassmorphism */}
                  <div className="relative px-10 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 rounded-xl font-bold text-lg sm:text-xl tracking-wider transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-110 border-2 border-emerald-400/50 backdrop-blur-sm shadow-[0_0_40px_rgba(16,185,129,0.6),inset_0_0_20px_rgba(255,255,255,0.1)]">
                    {/* Inner highlight for 3D effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>

                    {/* Text with shadow for depth */}
                    <span className="relative flex items-center space-x-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      <span className="font-black uppercase">{t("cta.contact")}</span>
                    </span>

                    {/* Bottom shine effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-b-xl"></div>
                  </div>

                  {/* Animated ring effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 group-hover:border-cyan-400/50 transition duration-500 animate-pulse"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise section */}
        <ExpertiseSection />

        {/* Services viewport section */}
        <ServicesViewportSection />

        {/* Enhanced Contact section */}
        <section id="contact" className="py-20 px-4 sm:px-6 relative bg-black">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-foreground">{t("contact.ready")} </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
                  {t("contact.innovation")}
                </span>
              </motion.h2>
              <motion.div
                className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t("contact.description")}
              </motion.p>
            </div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/consultation" className="group relative">
                    {/* Outer glow layers for depth */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

                    {/* Main button with glassmorphism */}
                    <div className="relative px-10 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 rounded-xl font-bold text-lg sm:text-xl tracking-wider transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-110 border-2 border-emerald-400/50 backdrop-blur-sm shadow-[0_0_40px_rgba(16,185,129,0.6),inset_0_0_20px_rgba(255,255,255,0.1)]">
                      {/* Inner highlight for 3D effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>

                      {/* Text with shadow for depth */}
                      <span className="relative flex items-center space-x-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                        <span className="font-black uppercase">{t("cta.contact")}</span>
                      </span>

                      {/* Bottom shine effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-b-xl"></div>
                    </div>

                    {/* Animated ring effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 group-hover:border-cyan-400/50 transition duration-500 animate-pulse"></div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Zap, Instagram, Linkedin, Youtube, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [{ name: "Blog", href: "/blog" }]

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/blockenfy", icon: Instagram },
    { name: "TikTok", href: "https://tiktok.com/@blockenfy", icon: TikTokIcon },
    { name: "LinkedIn", href: "https://linkedin.com/company/blockenfy-blockchain-services", icon: Linkedin },
    { name: "YouTube", href: "https://youtube.com/@blockenfy", icon: Youtube },
    { name: "X", href: "https://x.com/blockenfy", icon: XIcon },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md border-b border-gray-800/50" : "bg-black/30 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={scrollToTop}>
            <Image
              src="/blockenfy-logo.png"
              alt="Blockenfy"
              width={140}
              height={40}
              className="h-8 w-auto invert brightness-0 contrast-200"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={scrollToTop}
                className={`group relative flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                    : "text-gray-300 hover:text-white border border-gray-700/50 hover:border-emerald-400/50 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-green-500/10 hover:scale-105"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{item.name}</span>

                {/* Animated glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/10 to-green-400/10 blur-sm -z-10"></div>
              </Link>
            ))}
          </div>

          {/* Right side items - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 mr-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            <LanguageSelector />
            <Link
              href="/corporate-login"
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors"
            ></Link>
            <Link href="/consultation" onClick={scrollToTop}>
              <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium">
                <Zap className="w-4 h-4 mr-2" />
                {t("nav.hire_services")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and Free Consultation */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link href="/consultation" onClick={scrollToTop}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium text-xs px-3 py-2"
              >
                <Zap className="w-3 h-3 mr-1" />
                {t("nav.contact_button")}
              </Button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-md border-b border-gray-800 ${
                scrolled ? "bg-black/70" : "bg-black/30"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false)
                      scrollToTop()
                    }}
                    className={`group relative flex items-center space-x-3 px-5 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                        : "text-gray-300 hover:text-white border border-gray-700/50 hover:border-emerald-400/50 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-green-500/10"
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <Link
                    href="/consultation"
                    onClick={() => {
                      setIsOpen(false)
                      scrollToTop()
                    }}
                  >
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium">
                      <Zap className="w-4 h-4 mr-2" />
                      {t("nav.hire_services")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

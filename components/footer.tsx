"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import { NewsletterForm } from "./newsletter-form"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { t } = useLanguage()

  const footerSections = [
    {
      id: "services",
      title: t("footer.services"),
      items: [
        t("footer.webDevelopment"),
        t("footer.mobileApps"),
        t("footer.physicalProducts"),
        t("footer.seo"),
        t("footer.googleAds"),
        t("footer.patentServices"),
      ],
    },
    {
      id: "company",
      title: t("footer.company"),
      items: [
        t("footer.about"),
        t("footer.portfolio"),
        t("footer.projects"),
        t("footer.process"),
        t("footer.careers"),
        t("footer.blog"),
      ],
    },
    {
      id: "resources",
      title: t("footer.resources"),
      items: [
        t("footer.documentation"),
        t("footer.support"),
        t("footer.api"),
        t("footer.status"),
        t("footer.security"),
        t("footer.downloads"),
      ],
    },
    {
      id: "legal",
      title: t("footer.legal"),
      items: [
        t("footer.privacy"),
        t("footer.terms"),
        t("footer.cookies"),
        t("footer.gdpr"),
        t("footer.accessibility"),
        t("footer.licenses"),
      ],
    },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/blockenfy" },
    {
      name: "TikTok",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      url: "https://tiktok.com/@blockenfy",
    },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/blockenfy" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/@blockenfy" },
    {
      name: "X",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://x.com/blockenfy",
    },
  ]

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id))
  }

  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border/50 relative overflow-hidden">
      {/* Code background */}
      <div className="absolute inset-0 opacity-5">
        <pre className="text-xs text-primary/30 font-mono leading-relaxed transform rotate-6 scale-150 absolute -top-20 -left-20">
          {`function innovate() {
  const solutions = [];
  
  // Web Development
  solutions.push({
    framework: 'Next.js',
    backend: 'Node.js',
    database: 'PostgreSQL',
    deployment: 'Vercel'
  });
  
  // Mechanical Engineering
  solutions.push({
    design: 'SolidWorks',
    simulation: 'ANSYS',
    manufacturing: 'CNC',
    materials: 'Advanced Composites'
  });
}`}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Desktop Footer */}

        {/* Mobile Footer - Stacked with collapsible sections */}
        <div className="md:hidden space-y-6">
          {/* Logo and main info */}
          <div className="text-center space-y-4">
            <img src="/images/weltivation-logo.png" alt="Weltivation" className="h-12 mx-auto" />
            <div className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Weltivation. {t("footer.allRightsReserved")}
            </div>
          </div>

          {/* Collapsible sections */}
          <div className="space-y-2">
            {footerSections.map((section) => (
              <div key={section.id} className="border border-border/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 bg-background/50 hover:bg-muted/30 transition-colors"
                >
                  <span className="font-medium text-sm">{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-2 border-t border-border/30">
                        {section.items.map((item, index) => (
                          <motion.div
                            key={index}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Newsletter signup and chat button */}
          <div className="text-center space-y-4 pt-4 border-t border-border/30">
            <span className="text-sm text-muted-foreground">{t("footer.stayUpdated")}</span>
            <div className="px-4">
              <NewsletterForm />
            </div>
            <Button
              onClick={() => (window.location.href = "/support")}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium px-4 py-2 text-sm"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {t("footer.startChat")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          {/* Social Media Icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon />
                </a>
              )
            })}
          </div>

          {/* Email */}
          <a
            href={`mailto:contact@blockenfy.com`}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            contact@blockenfy.com
          </a>
        </div>
      </div>
    </footer>
  )
}

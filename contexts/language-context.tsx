"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

// Comprehensive translations
const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.support": "Support",
    "nav.portfolio": "Portfolio",
    "nav.partnership": "Partnership",
    "nav.hire_services": "Hire Services",
    "nav.contact_button": "Contact",

    // CTA and Buttons
    "cta.consultation": "Free Consultation",
    "cta.explore": "Explore Services",
    "cta.learn_more": "Learn More",
    "cta.get_started": "Get Started",
    "cta.contact_us": "Contact Us",
    "cta.view_portfolio": "View Portfolio",
    "cta.contact": "CONTACT",
    "cta.continue": "Continue",

    // Hero Section
    "hero.title": "Innovative Solutions",
    "hero.subtitle": "Digital Technology & Mechanical Engineering",
    "hero.description":
      "At Blockenfy we take your assets and profits to the digital world, tokenizing them securely and scalably.",
    "hero.typing_text": "Let's create tomorrow's technology",
    "hero.typing_phrase": "your best option for tokenization",

    // Contact Section
    "contact.title": "Ready for innovation?",
    "contact.description": "Talk to us 100% free",
    "contact.ready": "Ready for",
    "contact.innovation": "innovation?",

    // Expertise Section
    "expertise.title": "What do our clients say?",
    "expertise.subtitle": "Discover what our clients say about Blockenfy",
    "expertise.metrics_title": "Our clients' metrics",
    "expertise.countries_description": "Countries of our clients",
    "expertise.profitability_description": "Profitability delivered to our clients",
    "expertise.success_rate": "100% of our clients had successful deliveries",
    "expertise.services_title": "Our services",
    "expertise.services_description":
      "For your tokenization project to be successful, you need three pillars: legal, technical and marketing.",
    "expertise.what_clients_say": "What do our",
    "expertise.clients": "clients?",
    "expertise.clients_say": "say",
    "expertise.help_description":
      "We help companies tokenize their assets and attract investors safely and efficiently.",
    "expertise.client_metrics": "Client Metrics",
    "expertise.completed_projects": "Completed Projects",
    "expertise.client_satisfaction": "Client Satisfaction",
    "expertise.capital_raised": "Capital Raised",
    "expertise.response_time": "Response Time",
    "expertise.tokenized_dollars": "Tokenized Dollars",

    // Dashboard Section
    "dashboard.client_metrics": "Client Metrics",
    "dashboard.real_time": "Real-time",
    "dashboard.global_reach": "Global Reach",
    "dashboard.countries": "15+ Countries",
    "dashboard.countries_change": "+3 this quarter",
    "dashboard.countries_description": "International Presence",
    "dashboard.countries_details": "Active clients across 5 continents",
    "dashboard.assets_tokenized": "Assets Tokenized",
    "dashboard.assets_value": "$47M+",
    "dashboard.assets_change": "+$12M this year",
    "dashboard.assets_description": "Total Value Tokenized",
    "dashboard.assets_details": "Across multiple asset classes",
    "dashboard.investors_onboarded": "Investors Onboarded",
    "dashboard.investors_count": "2,340+",
    "dashboard.investors_change": "+580 this month",
    "dashboard.investors_description": "Active Investors",
    "dashboard.investors_details": "Growing community of tokenization enthusiasts",
    "dashboard.client_growth": "Client Growth",
    "dashboard.growth_value": "+156%",
    "dashboard.growth_change": "Year over year",
    "dashboard.growth_description": "Annual Growth Rate",
    "dashboard.growth_details": "Consistent expansion in client base",
    "dashboard.success_rate": "Success Rate",
    "dashboard.success_value": "98.5%",
    "dashboard.success_change": "Project completion",
    "dashboard.success_description": "Project Success",
    "dashboard.success_details": "High satisfaction and delivery rate",
    "dashboard.enterprises": "Enterprises",
    "dashboard.roi_avg": "Avg. ROI",

    // Testimonials
    "testimonial.1.quote": "Their team understands tokenization like no one else.",
    "testimonial.1.name": "María González",
    "testimonial.1.role": "CEO, TechStart",
    "testimonial.2.quote": "Excellent service and professional attention.",
    "testimonial.2.name": "Carlos Rodríguez",
    "testimonial.2.role": "Director, InnovateCorp",
    "testimonial.3.quote": "They transformed our business with their solutions.",
    "testimonial.3.name": "Ana Martínez",
    "testimonial.3.role": "Founder, DigitalVentures",
    "testimonial.carlos.name": "Carlos Montenegro - CEO Mercado Cripto",
    "testimonial.carlos.quote": "Working with the Blockenfy team was my best decision.",
    "testimonial.gustavo.name": "Gustavo Manuele - CEO Khoros",
    "testimonial.gustavo.quote": "The Blockenfy team quickly understood my project and developed it successfully",
    "testimonial.sofia.name": "Sofía Díaz - Director FTM Construcciones",
    "testimonial.sofia.quote": "Blockenfy transformed our way of attracting investors.",
    "testimonial.ignacio.name": "Ignacio Pérez - Co-Founder Invertí Simple",
    "testimonial.ignacio.quote": "Their team understands tokenization like no one else.",

    // Services Section
    "services.title": "Services We Offer",
    "services.subtitle": "Comprehensive solutions spanning digital innovation and mechanical excellence",
    "services.tokenization_title": "What is tokenization?",
    "services.tokenization_subtitle": "Tokenization & Digital Assets",
    "services.tokenization_description":
      "Tokenization is the process of representing the rights of a real asset —such as real estate, a company or a work of art— digitally, allowing its value to be fractionated, facilitating its transfer and guaranteeing its traceability in a transparent and secure way.",
    "services.platforms_description":
      "Discover our clients' platforms, ready to receive investments in tokenized assets.",
    "services.podcast": "Watch our podcast",
    "services.our_team": "Our",
    "services.team": "Team",
    "services.meet_experts": "Meet the experts behind Blockenfy",
    "services.view_linkedin": "View LinkedIn profile",
    "services.info_about": "Information about our",
    "services.tokenizer": "tokenizer",
    "services.client_platform": "Client platform",
    "services.platform_subtitle": "Modern, fast, friendly",
    "services.platform_description":
      "Discover our clients' platforms, ready to receive investments in tokenized assets.",
    "services.feature_speed": "Guaranteed speed",
    "services.feature_kyc": "KYC/AML integrated",
    "services.feature_global": "Allows investors from around the world",
    "services.feature_online": "Online 24/7",
    "services.feature_login": "Allows users to log in without wallet",
    "services.feature_payment": "Receive investment in crypto, pesos or dollars",
    "services.feature_secondary": "Integrated secondary market",
    "services.feature_dashboards": "Dynamic dashboards for investors and administrators",
    "services.feature_chat": "Direct chat between users and support",
    "services.feature_mobile": "Accessible from any device",
    "services.stat_launch_time": "Average launch time",
    "services.stat_investors": "Registered investors",
    "services.stat_transactions": "Transactions processed",
    "services.stat_compliance": "Regulatory compliance",
    "services.stat_return": "Average client return",
    "services.stat_support": "Technical support",
    "services.tokenization_feature_1": "Digitization of real assets",
    "services.tokenization_feature_2": "Liquidity and global access",
    "services.tokenization_feature_3": "Transparency and legal backing",
    "services.tokenization_feature_4": "Automation with smart contracts",
    "services.tokenization_stat_transparency": "Transparency",
    "services.tokenization_stat_automated": "Automated",
    "services.tokenization_stat_investors": "Investors",
    "services.tokenization_stat_global": "Global",
    "tokenization.coming_soon": "Coming soon",
    "tokenization.tokens_sold": "Tokens sold",
    "tokenization.online": "Online",

    // Consultation Page
    "consultation.step": "Step",
    "consultation.of": "of",
    "consultation.step_asset": "Asset",
    "consultation.step_amount": "Amount",
    "consultation.step_service": "Service",
    "consultation.step_contact": "Contact",

    // Step 0 - Asset Type
    "consultation.asset_question": "What type of asset do you want to tokenize?",
    "consultation.asset_help": "Help us to advise you correctly",
    "consultation.asset_real_estate": "Real Estate",
    "consultation.asset_real_estate_desc": "Apartments, land or trusts",
    "consultation.asset_vehicles": "Vehicles",
    "consultation.asset_vehicles_desc": "Cars, fleets or machinery",
    "consultation.asset_company_shares": "Company Shares",
    "consultation.asset_company_shares_desc": "Private company shares",
    "consultation.asset_commodities": "Commodities",
    "consultation.asset_commodities_desc": "Gold, oil or raw materials",
    "consultation.asset_art": "Art & Collectibles",
    "consultation.asset_art_desc": "Works, music or exclusive NFTs",
    "consultation.asset_funds": "Investment Funds",
    "consultation.asset_funds_desc": "Tokenized investment funds",
    "consultation.asset_other": "Other",
    "consultation.asset_other_desc": "Any other type of asset you want to tokenize",

    // Step 1 - Amount
    "consultation.amount_question": "How much money do you plan to tokenize?",
    "consultation.amount_help": "Select the capital range you plan to raise through tokenization.",
    "consultation.amount_less_100k": "Less than $100,000 USD",
    "consultation.amount_less_100k_desc": "Initial or pilot project",
    "consultation.amount_100k_500k": "$100,000 - $500,000 USD",
    "consultation.amount_100k_500k_desc": "Medium tokenization",
    "consultation.amount_500k_2m": "$500,000 - $2,000,000 USD",
    "consultation.amount_500k_2m_desc": "Consolidated tokenization",
    "consultation.amount_2m_plus": "More than $2,000,000 USD",
    "consultation.amount_2m_plus_desc": "Institutional or massive investment project",

    // Step 2 - Service
    "consultation.service_question": "What type of service do you need?",
    "consultation.service_help": "Select one or more services you need assistance with.",
    "consultation.service_technical": "Technical",
    "consultation.service_technical_desc": "Smart contract development, dashboards and tokenization systems.",
    "consultation.service_legal": "Legal",
    "consultation.service_legal_desc": "Legal structure, trusts and regulatory compliance (CNV, SPV, LLC, etc.).",
    "consultation.service_marketing": "Marketing",
    "consultation.service_marketing_desc": "Communication strategy, branding and campaigns to attract investors.",

    // Step 3 - Contact
    "consultation.contact_question": "Fill out the form to contact us",
    "consultation.form_name": "Full Name",
    "consultation.form_name_placeholder": "Your full name",
    "consultation.form_email": "Email Address",
    "consultation.form_email_placeholder": "your@email.com",
    "consultation.form_company": "Company Name",
    "consultation.form_company_placeholder": "Your company",
    "consultation.form_phone": "Phone Number",
    "consultation.form_phone_placeholder": "+1 (555) 123-4567",
    "consultation.form_required": "*",

    // Navigation Buttons
    "consultation.btn_back": "Back",
    "consultation.btn_next": "Next step",
    "consultation.btn_submit": "Send contact",
    "consultation.btn_submitting": "Sending...",
    "consultation.btn_preview": "Preview Dashboard",

    // Messages
    "consultation.success_message": "Sent successfully! Redirecting...",
    "consultation.error_message": "Error sending. Please try again.",

    // Team Members
    "team.joaquin.name": "Joaquin Linares",
    "team.joaquin.role": "CEO & Founder",
    "team.juan.name": "Juan Lazarte",
    "team.juan.role": "CTO",
    "team.matias.name": "Matias Acevedo",
    "team.matias.role": "CMO",

    // Blog Section
    "blog.title": "Blog",
    "blog.subtitle": "Insights, trends and news about tokenization and blockchain",
    "blog.read_more": "Read more",
    "blog.back_to_blog": "Back to Blog",
  },
  es: {
    // Navigation
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.process": "Proceso",
    "nav.contact": "Contacto",
    "nav.support": "Soporte",
    "nav.portfolio": "Portafolio",
    "nav.partnership": "Asociación",
    "nav.hire_services": "Contratar Servicios",
    "nav.contact_button": "Contactar",

    // CTA and Buttons
    "cta.consultation": "Consulta Gratuita",
    "cta.explore": "Explorar Servicios",
    "cta.learn_more": "Saber Más",
    "cta.get_started": "Comenzar",
    "cta.contact_us": "Contáctanos",
    "cta.view_portfolio": "Ver Portafolio",
    "cta.contact": "CONTACTAR",
    "cta.continue": "Seguir",

    // Hero Section
    "hero.title": "Soluciones Innovadoras",
    "hero.subtitle": "Tecnología Digital e Ingeniería Mecánica",
    "hero.description":
      "En Blockenfy llevamos tus activos y ganancias al mundo digital, tokenizándolos de forma segura y escalable.",
    "hero.typing_text": "Creemos la tecnología del mañana",
    "hero.typing_phrase": "tu mejor opción para tokenizar",

    // Contact Section
    "contact.title": "¿Listo para la innovación?",
    "contact.description": "Habla con nosotros de manera 100% gratuita",
    "contact.ready": "¿Listo para la",
    "contact.innovation": "innovación?",

    // Expertise Section
    "expertise.title": "¿Qué opinan nuestros clientes?",
    "expertise.subtitle": "Descubre lo que dicen nuestros clientes sobre Blockenfy",
    "expertise.metrics_title": "Métricas de nuestros clientes",
    "expertise.countries_description": "Países de nuestros clientes",
    "expertise.profitability_description": "Rentabilidad entregadas por nuestros clientes",
    "expertise.success_rate": "100% de nuestros clientes tuvieron entregas con éxito",
    "expertise.services_title": "Nuestros servicios",
    "expertise.services_description":
      "Para que tu proyecto de tokenización sea un éxito, necesitás tres pilares: área legal, técnica y marketing.",
    "expertise.what_clients_say": "¿Qué opinan nuestros",
    "expertise.clients": "clientes?",
    "expertise.clients_say": "",
    "expertise.help_description":
      "Ayudamos a empresas a tokenizar sus activos y captar inversores de forma segura y eficiente.",
    "expertise.client_metrics": "Métricas de Clientes",
    "expertise.completed_projects": "Proyectos Completados",
    "expertise.client_satisfaction": "Satisfacción Cliente",
    "expertise.capital_raised": "Capital Levantado",
    "expertise.response_time": "Tiempo de Respuesta",
    "expertise.tokenized_dollars": "Dólares Tokenizados",

    // Dashboard Section
    "dashboard.client_metrics": "Métricas de Clientes",
    "dashboard.real_time": "Tiempo real",
    "dashboard.global_reach": "Alcance Global",
    "dashboard.countries": "15+ Países",
    "dashboard.countries_change": "+3 este trimestre",
    "dashboard.countries_description": "Presencia Internacional",
    "dashboard.countries_details": "Clientes activos en 5 continentes",
    "dashboard.assets_tokenized": "Activos Tokenizados",
    "dashboard.assets_value": "$47M+",
    "dashboard.assets_change": "+$12M este año",
    "dashboard.assets_description": "Valor Total Tokenizado",
    "dashboard.assets_details": "A través de múltiples clases de activos",
    "dashboard.investors_onboarded": "Inversores Incorporados",
    "dashboard.investors_count": "2,340+",
    "dashboard.investors_change": "+580 este mes",
    "dashboard.investors_description": "Inversores Activos",
    "dashboard.investors_details": "Comunidad creciente de entusiastas de la tokenización",
    "dashboard.client_growth": "Crecimiento de Clientes",
    "dashboard.growth_value": "+156%",
    "dashboard.growth_change": "Año tras año",
    "dashboard.growth_description": "Tasa de Crecimiento Anual",
    "dashboard.growth_details": "Expansión consistente en la base de clientes",
    "dashboard.success_rate": "Tasa de Éxito",
    "dashboard.success_value": "98.5%",
    "dashboard.success_change": "Finalización de proyectos",
    "dashboard.success_description": "Éxito de Proyectos",
    "dashboard.success_details": "Alta satisfacción y tasa de entrega",
    "dashboard.enterprises": "Empresas",
    "dashboard.roi_avg": "ROI Promedio",

    // Testimonials
    "testimonial.1.quote": "Su equipo entiende la tokenización como nadie.",
    "testimonial.1.name": "María González",
    "testimonial.1.role": "CEO, TechStart",
    "testimonial.2.quote": "Excelente servicio y atención profesional.",
    "testimonial.2.name": "Carlos Rodríguez",
    "testimonial.2.role": "Director, InnovateCorp",
    "testimonial.3.quote": "Transformaron nuestro negocio con sus soluciones.",
    "testimonial.3.name": "Ana Martínez",
    "testimonial.3.role": "Fundadora, DigitalVentures",
    "testimonial.carlos.name": "Carlos Montenegro - CEO Mercado Cripto",
    "testimonial.carlos.quote": "Trabajar con el equipo de Blockenfy fue mi mejor decisión.",
    "testimonial.gustavo.name": "Gustavo Manuele - CEO Khoros",
    "testimonial.gustavo.quote": "El equipo de Blockenfy entendio rapidamente mi proyecto y lo desarrollo con éxito",
    "testimonial.sofia.name": "Sofía Díaz - Directora FTM Construcciones",
    "testimonial.sofia.quote": "Blockenfy transformó nuestra forma de captar inversores.",
    "testimonial.ignacio.name": "Ignacio Pérez - Co-Founder Invertí Simple",
    "testimonial.ignacio.quote": "Su equipo entiende la tokenización como nadie.",

    // Services Section
    "services.title": "Servicios Que Ofrecemos",
    "services.subtitle": "Soluciones integrales que abarcan la innovación digital y la excelencia mecánica",
    "services.tokenization_title": "¿Qué es la tokenización?",
    "services.tokenization_subtitle": "Tokenización & Activos Digitales",
    "services.tokenization_description":
      "La tokenización es el proceso de representar los derechos de un activo real —como un inmueble, una empresa o una obra de arte— de manera digital, permitiendo fraccionar su valor, facilitar su transferencia y garantizar su trazabilidad de forma transparente y segura.",
    "services.platforms_description":
      "Descubrí las plataformas de nuestros clientes, listas para recibir inversiones en activos tokenizados.",
    "services.podcast": "Mira nuestro podcast",
    "services.our_team": "Nuestro",
    "services.team": "Equipo",
    "services.meet_experts": "Conoce a los expertos detrás de Blockenfy",
    "services.view_linkedin": "Ver perfil en LinkedIn",
    "services.info_about": "Información sobre nuestra",
    "services.tokenizer": "tokenizadora",
    "services.client_platform": "Plataforma de clientes",
    "services.platform_subtitle": "Moderna, rápida, amigable",
    "services.platform_description":
      "Descubrí las plataformas de nuestros clientes, listas para recibir inversiones en activos tokenizados.",
    "services.feature_speed": "Velocidad asegurada",
    "services.feature_kyc": "KYC/AML integrado",
    "services.feature_global": "Permite inversores de todo el mundo",
    "services.feature_online": "En línea 24/7",
    "services.feature_login": "Permite a usuarios iniciar sesión sin wallet",
    "services.feature_payment": "Recibe inversión en crypto, pesos o dólares",
    "services.feature_secondary": "Mercado secundario integrado",
    "services.feature_dashboards": "Dashboards dinámicos para inversores y administradores",
    "services.feature_chat": "Chat directo entre usuarios y soporte",
    "services.feature_mobile": "Accesible desde cualquier dispositivo",
    "services.stat_launch_time": "Tiempo promedio de lanzamiento",
    "services.stat_investors": "Inversores registrados",
    "services.stat_transactions": "Transacciones procesadas",
    "services.stat_compliance": "Cumplimiento regulatorio",
    "services.stat_return": "Retorno promedio de clientes",
    "services.stat_support": "Soporte técnico",
    "services.tokenization_feature_1": "Digitalización de activos reales",
    "services.tokenization_feature_2": "Liquidez y acceso global",
    "services.tokenization_feature_3": "Transparencia y respaldo legal",
    "services.tokenization_feature_4": "Automatización con smart contracts",
    "services.tokenization_stat_transparency": "Transparencia",
    "services.tokenization_stat_automated": "Automatizado",
    "services.tokenization_stat_investors": "Inversores",
    "services.tokenization_stat_global": "Globales",
    "tokenization.coming_soon": "Próximamente",
    "tokenization.tokens_sold": "Tokens vendidos",
    "tokenization.online": "En línea",

    // Consultation Page
    "consultation.step": "Paso",
    "consultation.of": "de",
    "consultation.step_asset": "Activo",
    "consultation.step_amount": "Monto",
    "consultation.step_service": "Servicio",
    "consultation.step_contact": "Contacto",

    // Step 0 - Asset Type
    "consultation.asset_question": "¿Qué tipo de activo quieres tokenizar?",
    "consultation.asset_help": "Ayúdanos para poder asesorarte de manera correcta",
    "consultation.asset_real_estate": "Real Estate",
    "consultation.asset_real_estate_desc": "Departamentos, terrenos o fideicomisos",
    "consultation.asset_vehicles": "Vehicles",
    "consultation.asset_vehicles_desc": "Autos, flotas o maquinaria",
    "consultation.asset_company_shares": "Company Shares",
    "consultation.asset_company_shares_desc": "Participaciones de empresas privadas",
    "consultation.asset_commodities": "Commodities",
    "consultation.asset_commodities_desc": "Oro, petróleo o materias primas",
    "consultation.asset_art": "Art & Collectibles",
    "consultation.asset_art_desc": "Obras, música o NFTs exclusivos",
    "consultation.asset_funds": "Investment Funds",
    "consultation.asset_funds_desc": "Fondos de inversión tokenizados",
    "consultation.asset_other": "Otros",
    "consultation.asset_other_desc": "Cualquier otro tipo de activo que quieras tokenizar",

    // Step 1 - Amount
    "consultation.amount_question": "¿Cuánto dinero piensan tokenizar?",
    "consultation.amount_help": "Selecciona el rango de capital que planean recaudar mediante la tokenización.",
    "consultation.amount_less_100k": "Menos de $100.000 USD",
    "consultation.amount_less_100k_desc": "Proyecto inicial o piloto",
    "consultation.amount_100k_500k": "$100.000 - $500.000 USD",
    "consultation.amount_100k_500k_desc": "Tokenización mediana",
    "consultation.amount_500k_2m": "$500.000 - $2.000.000 USD",
    "consultation.amount_500k_2m_desc": "Tokenización consolidada",
    "consultation.amount_2m_plus": "Más de $2.000.000 USD",
    "consultation.amount_2m_plus_desc": "Proyecto institucional o de inversión masiva",

    // Step 2 - Service
    "consultation.service_question": "¿Qué tipo de servicio necesitan?",
    "consultation.service_help": "Selecciona uno o varios servicios en los que deseas asistencia.",
    "consultation.service_technical": "Técnico",
    "consultation.service_technical_desc": "Desarrollo de smart contracts, dashboards y sistemas de tokenización.",
    "consultation.service_legal": "Legal",
    "consultation.service_legal_desc":
      "Estructura legal, fideicomisos y cumplimiento regulatorio (CNV, SPV, LLC, etc.).",
    "consultation.service_marketing": "Marketing",
    "consultation.service_marketing_desc": "Estrategia de comunicación, branding y campañas para captar inversores.",

    // Step 3 - Contact
    "consultation.contact_question": "Rellena el formulario para contactarnos",
    "consultation.form_name": "Nombre Completo",
    "consultation.form_name_placeholder": "Tu nombre completo",
    "consultation.form_email": "Correo Electrónico",
    "consultation.form_email_placeholder": "tu@email.com",
    "consultation.form_company": "Nombre de la Empresa",
    "consultation.form_company_placeholder": "Tu empresa",
    "consultation.form_phone": "Número de Teléfono",
    "consultation.form_phone_placeholder": "+52 (984) 253-4589",
    "consultation.form_required": "*",

    // Navigation Buttons
    "consultation.btn_back": "Atrás",
    "consultation.btn_next": "Siguiente paso",
    "consultation.btn_submit": "Enviar contacto",
    "consultation.btn_submitting": "Enviando...",
    "consultation.btn_preview": "Vista previa del Dashboard",

    // Messages
    "consultation.success_message": "¡Enviado correctamente! Redirigiendo...",
    "consultation.error_message": "Error al enviar. Intenta nuevamente.",

    // Team Members
    "team.joaquin.name": "Joaquin Linares",
    "team.joaquin.role": "CEO & Fundador",
    "team.juan.name": "Juan Lazarte",
    "team.juan.role": "CTO",
    "team.matias.name": "Matias Acevedo",
    "team.matias.role": "CMO",

    // Blog Section
    "blog.title": "Blog",
    "blog.subtitle": "Insights, tendencias y noticias sobre tokenización y blockchain",
    "blog.read_more": "Leer más",
    "blog.back_to_blog": "Volver al Blog",
  },
}

type LanguageContextType = {
  currentLanguage: (typeof languages)[0]
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const lang = languages.find((l) => l.code === savedLanguage)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

  const setLanguage = (code: string) => {
    const newLang = languages.find((l) => l.code === code)
    if (newLang) {
      setCurrentLanguage(newLang)
      localStorage.setItem("language", code)
      document.documentElement.lang = code
    }
  }

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

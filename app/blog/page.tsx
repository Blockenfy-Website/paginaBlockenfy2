"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

interface BlogPost {
  _id: string
  slug: string
  title: {
    es: string
    en: string
  }
  excerpt: {
    es: string
    en: string
  }
  image: string
  date: string
  author: {
    name: string
    role: {
      es: string
      en: string
    }
  }
}

export default function BlogPage() {
  const { t, currentLanguage } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts?published=true")
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.posts)
      } else {
        setError(data.error || "Error al cargar posts")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.h1
              className="text-5xl sm:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
                {t("blog.title")}
              </span>
            </motion.h1>
            <motion.div
              className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("blog.subtitle")}
            </motion.p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
                />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 max-w-md mx-auto">
                  {error}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title[currentLanguage.code as "es" | "en"]}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.date).toLocaleDateString(currentLanguage.code, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {post.title[currentLanguage.code as "es" | "en"]}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                          {post.excerpt[currentLanguage.code as "es" | "en"]}
                        </p>

                        {/* Author */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-emerald-400 text-sm font-medium group-hover:space-x-2 transition-all">
                            <span>{t("blog.read_more")}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

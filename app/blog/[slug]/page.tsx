"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { t, currentLanguage } = useLanguage()
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const lang = currentLanguage.code as "es" | "en"

  return (
    <main className="relative min-h-screen bg-black text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        {/* Article */}
        <article className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("blog.back_to_blog")}
                </Button>
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">{post.title[lang]}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(post.date).toLocaleDateString(currentLanguage.code, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>
                    {post.author.name} - {post.author.role[lang]}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-xl overflow-hidden mb-12 border border-gray-800/50"
            >
              <Image src={post.image || "/placeholder.svg"} alt={post.title[lang]} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div
                className="text-gray-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content[lang]
                    .split("\n\n")
                    .map((paragraph) => {
                      // Handle headings
                      if (paragraph.startsWith("## ")) {
                        return `<h2 class="text-3xl font-bold text-white mt-12 mb-6">${paragraph.replace("## ", "")}</h2>`
                      }
                      if (paragraph.startsWith("### ")) {
                        return `<h3 class="text-2xl font-bold text-emerald-400 mt-8 mb-4">${paragraph.replace("### ", "")}</h3>`
                      }
                      // Handle lists
                      if (paragraph.startsWith("- ")) {
                        const items = paragraph
                          .split("\n")
                          .map((item) => `<li class="ml-6">${item.replace("- ", "")}</li>`)
                          .join("")
                        return `<ul class="list-disc space-y-2 my-4">${items}</ul>`
                      }
                      // Regular paragraphs
                      return `<p class="text-gray-300 leading-relaxed">${paragraph}</p>`
                    })
                    .join(""),
                }}
              />
            </motion.div>

            {/* Back button at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-gray-800"
            >
              <Link href="/blog">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("blog.back_to_blog")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </main>
  )
}

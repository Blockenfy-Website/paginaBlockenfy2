"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import dynamic from "next/dynamic"

const ImageUploader = dynamic(() => import("@/components/image-uploader"), {
  ssr: false,
})

interface BlogPost {
  _id?: string
  slug: string
  title: {
    es: string
    en: string
  }
  excerpt: {
    es: string
    en: string
  }
  content: {
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
  published: boolean
}

interface PostFormProps {
  postId?: string
  isEdit?: boolean
}

const authors = [
  { name: "Joaquin Linares", role: { es: "CEO & Fundador", en: "CEO & Founder" } },
  { name: "Juan Lazarte", role: { es: "CTO", en: "CTO" } },
  { name: "Matias Acevedo", role: { es: "CMO", en: "CMO" } },
]

export default function PostForm({ postId, isEdit = false }: PostFormProps) {
  const [formData, setFormData] = useState<BlogPost>({
    slug: "",
    title: { es: "", en: "" },
    excerpt: { es: "", en: "" },
    content: { es: "", en: "" },
    image: "",
    date: new Date().toISOString().split('T')[0],
    author: authors[0],
    published: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (isEdit && postId) {
      fetchPost()
    }
  }, [isEdit, postId])

  const fetchPost = async () => {
    setIsLoadingPost(true)
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      
      if (data.success) {
        setFormData(data.post)
      } else {
        setError(data.error || "Error al cargar post")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setIsLoadingPost(false)
    }
  }

  const handleInputChange = useCallback((field: string, value: any) => {
    console.log(`📝 Actualizando ${field}:`, value)
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: value
      }
      console.log("📦 formData actualizado:", updated)
      return updated
    })
  }, [])

  const handleNestedInputChange = useCallback((parent: string, child: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof BlogPost],
        [child]: value
      }
    }))
  }, [])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = useCallback((lang: "es" | "en", value: string) => {
    handleNestedInputChange("title", lang, value)
    if (lang === "es" && !isEdit) {
      const slug = generateSlug(value)
      handleInputChange("slug", slug)
    }
  }, [handleNestedInputChange, handleInputChange, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🚀 Enviando formulario con datos:", formData)
    console.log("🖼️ Imagen en formData:", formData.image)

    try {
      const token = localStorage.getItem("admin_token")
      const url = isEdit ? `/api/posts/${postId}` : "/api/posts"
      const method = isEdit ? "PUT" : "POST"

      const payload = {
        ...formData,
        image: formData.image || "/placeholder.svg"
      }

      console.log("📤 Payload que se envía:", payload)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      
      console.log("📥 Respuesta del servidor:", data)
      
      if (data.success) {
        console.log("✅ Post guardado exitosamente")
        startTransition(() => router.push("/admin/dashboard"))
      } else {
        console.error("❌ Error del servidor:", data.error, data.details)
        setError(data.error || "Error al guardar post")
        if (data.details) {
          console.error("Detalles del error:", data.details)
        }
      }
    } catch (error: any) {
      console.error("❌ Error de conexión:", error)
      setError(`Error de conexión: ${error.message || "Error desconocido"}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingPost) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                  {isEdit ? "Editar Post" : "Nuevo Post"}
                </h1>
                <p className="text-gray-400 mt-2">
                  {isEdit ? "Modifica el contenido del post" : "Crea un nuevo post para el blog"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Información Básica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title-es" className="text-gray-300">
                          Título (Español) *
                        </Label>
                        <Input
                          id="title-es"
                          value={formData.title.es}
                          onChange={(e) => handleTitleChange("es", e.target.value)}
                          placeholder="Título del post en español"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title-en" className="text-gray-300">
                          Título (English) *
                        </Label>
                        <Input
                          id="title-en"
                          value={formData.title.en}
                          onChange={(e) => handleTitleChange("en", e.target.value)}
                          placeholder="Post title in English"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug" className="text-gray-300">
                        Slug (URL) *
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        placeholder="url-del-post"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="excerpt-es" className="text-gray-300">
                          Resumen (Español) *
                        </Label>
                        <Textarea
                          id="excerpt-es"
                          value={formData.excerpt.es}
                          onChange={(e) => handleNestedInputChange("excerpt", "es", e.target.value)}
                          placeholder="Breve descripción del post en español"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt-en" className="text-gray-300">
                          Excerpt (English) *
                        </Label>
                        <Textarea
                          id="excerpt-en"
                          value={formData.excerpt.en}
                          onChange={(e) => handleNestedInputChange("excerpt", "en", e.target.value)}
                          placeholder="Brief description of the post in English"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Contenido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="content-es" className="text-gray-300">
                        Contenido (Español) *
                      </Label>
                      <Textarea
                        id="content-es"
                        value={formData.content.es}
                        onChange={(e) => handleNestedInputChange("content", "es", e.target.value)}
                        placeholder="Contenido completo del post en español (Markdown soportado)"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                        rows={12}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-en" className="text-gray-300">
                        Content (English) *
                      </Label>
                      <Textarea
                        id="content-en"
                        value={formData.content.en}
                        onChange={(e) => handleNestedInputChange("content", "en", e.target.value)}
                        placeholder="Full post content in English (Markdown supported)"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                        rows={12}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Imagen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageUploader
                      onImageSelect={(url) => handleInputChange("image", url)}
                      currentImage={formData.image}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Configuración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-300">
                        Fecha de publicación
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-gray-300">
                        Autor
                      </Label>
                      <select
                        id="author"
                        value={formData.author.name}
                        onChange={(e) => {
                          const selectedAuthor = authors.find(a => a.name === e.target.value)
                          if (selectedAuthor) {
                            handleInputChange("author", selectedAuthor)
                          }
                        }}
                        className="w-full h-10 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:border-emerald-500 focus:outline-none"
                      >
                        {authors.map((author) => (
                          <option key={author.name} value={author.name}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="published" className="text-gray-300">
                        Publicar inmediatamente
                      </Label>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange("published", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
                  <CardContent className="p-6">
                    {error && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {isEdit ? "Actualizar Post" : "Crear Post"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

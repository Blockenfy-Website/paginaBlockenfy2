"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, Plus, Calendar, User } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

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
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/posts?published=false&limit=20", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) {
      return
    }

    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      
      if (data.success) {
        setPosts(posts.filter(post => post.slug !== slug))
      } else {
        alert(data.error || "Error al eliminar post")
      }
    } catch (error) {
      alert("Error de conexión")
    }
  }

  const togglePublished = async (slug: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !currentStatus }),
      })

      const data = await response.json()
      
      if (data.success) {
        setPosts(posts.map(post => 
          post.slug === slug 
            ? { ...post, published: !currentStatus }
            : post
        ))
      } else {
        alert(data.error || "Error al actualizar post")
      }
    } catch (error) {
      alert("Error de conexión")
    }
  }

  if (isLoading) {
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
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Gestiona los posts de tu blog
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/posts/new")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Post
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{posts.length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Publicados</p>
                  <p className="text-2xl font-bold text-white">
                    {posts.filter(post => post.published).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Borradores</p>
                  <p className="text-2xl font-bold text-white">
                    {posts.filter(post => !post.published).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Posts Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 mb-4">
                  {error}
                </div>
              )}

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No hay posts</h3>
                  <p className="text-gray-400 mb-4">Crea tu primer post para comenzar</p>
                  <Button
                    onClick={() => router.push("/admin/posts/new")}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-white">
                            {post.title.es}
                          </h3>
                          <Badge 
                            variant={post.published ? "default" : "secondary"}
                            className={post.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}
                          >
                            {post.published ? "Publicado" : "Borrador"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublished(post.slug, post.published)}
                          className={post.published ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}
                        >
                          {post.published ? "Despublicar" : "Publicar"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/posts/${post.slug}/edit`)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.slug)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

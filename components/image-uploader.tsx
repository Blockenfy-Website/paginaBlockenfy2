"use client"

import { useState, useRef, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"

interface ImageUploaderProps {
  onImageSelect: (url: string) => void
  currentImage?: string
  className?: string
}

function ImageUploader({ onImageSelect, currentImage, className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file) return

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP)')
      return
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 5MB')
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('image', file)

      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        onImageSelect(data.url)
      } else {
        setError(data.error || "Error al subir imagen")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    onImageSelect("")
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {currentImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50">
            <CardContent className="p-4">
              <div className="relative">
                <img
                  src={currentImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-3 flex justify-center">
                <Button
                  variant="outline"
                  onClick={onButtonClick}
                  className="border-gray-700 text-gray-300 hover:text-white hover:border-emerald-500"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Cambiar Imagen
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card 
            className={`bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-800/50 transition-colors ${
              dragActive ? "border-emerald-500/50 bg-emerald-500/5" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {isUploading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                
                <h3 className="text-lg font-medium text-white mb-2">
                  {isUploading ? "Subiendo imagen..." : "Subir imagen del post"}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  Arrastra y suelta una imagen aquí o haz clic para seleccionar
                </p>
                
                <Button
                  onClick={onButtonClick}
                  disabled={isUploading}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar Archivo
                </Button>
                
                <p className="text-xs text-gray-500 mt-3">
                  PNG, JPG, GIF, WebP hasta 5MB
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}

export default memo(ImageUploader)

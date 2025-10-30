import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { upload, deleteFile, getPublicUrl } from '@/lib/upload'

// Configurar multer para Next.js API routes
const uploadMiddleware = upload.single('image')

// POST /api/upload - Subir imagen (requiere auth)
export const POST = withAuth(async (req: NextRequest) => {
  try {
    // Convertir NextRequest a formato compatible con multer
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP)' },
        { status: 400 }
      )
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 5MB' },
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const randomSuffix = Math.round(Math.random() * 1E9)
    const extension = file.name.split('.').pop()
    const filename = `blog-${timestamp}-${randomSuffix}.${extension}`

    // Convertir File a Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Guardar archivo usando fs
    const fs = await import('fs')
    const path = await import('path')
    const uploadDir = process.env.UPLOAD_DIR || './public/uploads'
    
    // Crear directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, filename)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({
      success: true,
      filename,
      url: getPublicUrl(filename),
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

// DELETE /api/upload - Eliminar imagen (requiere auth)
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { filename } = await req.json()

    if (!filename) {
      return NextResponse.json(
        { error: 'Nombre de archivo requerido' },
        { status: 400 }
      )
    }

    const deleted = deleteFile(filename)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Archivo eliminado correctamente'
    })

  } catch (error) {
    console.error('Delete file error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

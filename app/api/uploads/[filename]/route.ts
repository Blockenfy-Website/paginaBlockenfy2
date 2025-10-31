import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    
    const uploadDir = process.env.UPLOAD_DIR || './public/uploads'
    const filePath = path.join(uploadDir, filename)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      )
    }
    
    const fileBuffer = fs.readFileSync(filePath)
    const extension = path.extname(filename).toLowerCase()
    
    let contentType = 'image/jpeg'
    if (extension === '.png') contentType = 'image/png'
    else if (extension === '.gif') contentType = 'image/gif'
    else if (extension === '.webp') contentType = 'image/webp'
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
    
  } catch (error) {
    console.error('Error serving image:', error)
    return NextResponse.json(
      { error: 'Error al servir la imagen' },
      { status: 500 }
    )
  }
}

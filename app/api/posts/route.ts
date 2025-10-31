import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { withAuth } from '@/middleware/auth'

// GET /api/posts - Listar todos los posts (público)
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const published = searchParams.get('published')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const filter = published === 'false' ? {} : { published: true }
    
    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await BlogPost.countDocuments(filter)

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Crear nuevo post (requiere auth)
export const POST = withAuth(async (req: NextRequest) => {
  try {
    await connectDB()

    const data = await req.json()
    
    console.log("📥 Datos recibidos en POST /api/posts:", JSON.stringify(data, null, 2))
    console.log("🖼️ Imagen recibida:", data.image)
    
    // Validar datos requeridos
    if (!data.slug || !data.title?.es || !data.title?.en || !data.excerpt?.es || !data.excerpt?.en || !data.content?.es || !data.content?.en) {
      console.error("❌ Faltan campos requeridos")
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el slug no exista
    const existingPost = await BlogPost.findOne({ slug: data.slug })
    if (existingPost) {
      console.error("❌ Slug ya existe:", data.slug)
      return NextResponse.json(
        { error: 'Ya existe un post con este slug' },
        { status: 400 }
      )
    }

    const postData = {
      ...data,
      image: data.image || "/placeholder.svg",
      published: data.published !== undefined ? data.published : true
    }
    
    console.log("📝 Datos del post a crear:", JSON.stringify(postData, null, 2))
    console.log("🖼️ Imagen final:", postData.image)

    const post = new BlogPost(postData)

    console.log("💾 Intentando guardar post...")
    await post.save()
    console.log("✅ Post guardado exitosamente:", post._id)

    return NextResponse.json({
      success: true,
      post
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create post error:', error)
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors || {}).map((err: any) => err.message)
      return NextResponse.json(
        { error: 'Error de validación', details: validationErrors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

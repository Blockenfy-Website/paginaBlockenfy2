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
    
    // Validar datos requeridos
    if (!data.slug || !data.title?.es || !data.title?.en || !data.excerpt?.es || !data.excerpt?.en || !data.content?.es || !data.content?.en) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el slug no exista
    const existingPost = await BlogPost.findOne({ slug: data.slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'Ya existe un post con este slug' },
        { status: 400 }
      )
    }

    const post = new BlogPost({
      ...data,
      published: data.published !== undefined ? data.published : true
    })

    await post.save()

    return NextResponse.json({
      success: true,
      post
    }, { status: 201 })

  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

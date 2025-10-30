import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { withAuth } from '@/middleware/auth'

// GET /api/posts/[slug] - Obtener un post específico
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params

    const post = await BlogPost.findOne({ slug }).lean()

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      post
    })

  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[slug] - Editar post (requiere auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    await connectDB()
    const { slug } = await params

    const data = await req.json()

    const post = await BlogPost.findOne({ slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    // Si se está cambiando el slug, verificar que no exista otro post con ese slug
    if (data.slug && data.slug !== slug) {
      const existingPost = await BlogPost.findOne({ slug: data.slug })
      if (existingPost) {
        return NextResponse.json(
          { error: 'Ya existe un post con este slug' },
          { status: 400 }
        )
      }
    }

    // Actualizar campos
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        post[key] = data[key]
      }
    })

    await post.save()

    return NextResponse.json({
      success: true,
      post
    })

  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

// DELETE /api/posts/[slug] - Eliminar post (requiere auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    await connectDB()
    const { slug } = await params

    const post = await BlogPost.findOneAndDelete({ slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Post eliminado correctamente'
    })

  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
})

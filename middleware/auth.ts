import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, extractTokenFromHeader } from '@/lib/auth'

export function withAuth(handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const authHeader = req.headers.get('authorization')
      const token = extractTokenFromHeader(authHeader || undefined)

      if (!token) {
        return NextResponse.json(
          { error: 'Token de acceso requerido' },
          { status: 401 }
        )
      }

      const payload = verifyToken(token)
      if (!payload) {
        return NextResponse.json(
          { error: 'Token inválido o expirado' },
          { status: 401 }
        )
      }

      // Agregar información del usuario al request
      req.user = payload
      
      return handler(req, ...args)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Error de autenticación' },
        { status: 500 }
      )
    }
  }
}

// Extender el tipo NextRequest para incluir user
declare global {
  namespace NextRequest {
    interface NextRequest {
      user?: {
        userId: string
        username: string
      }
    }
  }
}

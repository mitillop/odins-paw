import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('auth/login', req.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('auth/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/'], 
}

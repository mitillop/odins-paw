'use server'

import { cookies } from 'next/headers'

export async function logoutUser() {
  cookies().delete('token')
  return { success: true }
}

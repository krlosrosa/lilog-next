'use server';
import { cookies } from 'next/headers';
export async function salvarCache(name: string, info: string) {
  const cookie = await cookies();
  cookie.set(name, info);
}

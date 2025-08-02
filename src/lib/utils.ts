import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uuid() {
  return (Math.random() + 1).toString(36).substring(4)
}

export type Color = {
  r: number,g: number,b: number
}

export function hexToRGB(hex: string): Color {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b}
}
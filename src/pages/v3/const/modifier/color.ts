export enum Color {
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  mint = 'mint',
  teal = 'teal',
  cyan = 'cyan',
  blue = 'blue',
  indigo = 'indigo',
  purple = 'purple',
  pink = 'pink',
  brown = 'brown',
  white = 'white',
  gray = 'gray',
  black = 'black',
  clear = 'clear',
  primary = 'primary',
  secondary = 'secondary',
}

export const tailwindColors = {
  red: 'red-500',        // bg-red-500 / text-red-500
  orange: 'orange-500',
  yellow: 'yellow-500',
  green: 'green-500',
  mint: 'emerald-400',   // Tailwind没有mint，用emerald近似
  teal: 'teal-500',
  cyan: 'cyan-500',
  blue: 'blue-500',
  indigo: 'indigo-500',
  purple: 'purple-500',
  pink: 'pink-500',
  brown: 'amber-700',    // 用amber替代
  white: 'white',
  gray: 'gray-500',      // Tailwind有gray-50到gray-900
  black: 'black',
  clear: 'transparent',
  primary: 'indigo-600', // 通常作为主色，类似Next.js默认主题
  secondary: 'gray-600'
}
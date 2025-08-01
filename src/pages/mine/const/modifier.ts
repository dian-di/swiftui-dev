export enum ModifierCategory {
  Layout = 'Layout',
  Spacing = 'Spacing',
  Color = 'Color',
  Typography = 'Typography',
  Effects = 'Effects',
  Alignment = 'Alignment',
}

type Modifier = {
  category: ModifierCategory
  options: Record<string, string>
}

enum ModifierName {
  frame = 'frame',
  padding = 'padding',
  margin = 'margin',
  foregroundColor = 'foregroundColor',
  backgroundColor = 'backgroundColor',
  font = 'font',
  cornerRadius = 'cornerRadius',
  shadow = 'shadow',
  opacity = 'opacity',
  alignment = 'alignment',
}

export const SwiftUIModifiers: Record<ModifierName, Modifier> = {
  // Layout & Sizing
  frame: {
    category: ModifierCategory.Layout,
    options: {
      'width-16': 'w-16',
      'width-32': 'w-32',
      'width-64': 'w-64',
      'height-16': 'h-16',
      'height-32': 'h-32',
      'height-64': 'h-64',
      'max-width-full': 'max-w-full',
      'min-height-screen': 'min-h-screen',
    },
  },
  padding: {
    category: ModifierCategory.Spacing,
    options: {
      'padding-2': 'p-2',
      'padding-4': 'p-4',
      'padding-8': 'p-8',
      'padding-x-4': 'px-4',
      'padding-y-2': 'py-2',
    },
  },
  margin: {
    category: ModifierCategory.Spacing,
    options: {
      'margin-2': 'm-2',
      'margin-4': 'm-4',
      'margin-8': 'm-8',
      'margin-x-auto': 'mx-auto',
      'margin-y-4': 'my-4',
    },
  },
  // Colors
  foregroundColor: {
    category: ModifierCategory.Color,
    options: {
      'text-red': 'text-red-500',
      'text-blue': 'text-blue-500',
      'text-green': 'text-green-500',
      'text-white': 'text-white',
      'text-black': 'text-black',
    },
  },
  backgroundColor: {
    category: ModifierCategory.Color,
    options: {
      'bg-red': 'bg-red-500',
      'bg-blue': 'bg-blue-500',
      'bg-green': 'bg-green-500',
      'bg-gray': 'bg-gray-200',
      'bg-transparent': 'bg-transparent',
    },
  },
  // Typography
  font: {
    category: ModifierCategory.Typography,
    options: {
      'font-bold': 'font-bold',
      'font-semibold': 'font-semibold',
      'font-normal': 'font-normal',
      'text-sm': 'text-sm',
      'text-lg': 'text-lg',
      'text-xl': 'text-xl',
      'text-2xl': 'text-2xl',
    },
  },
  // Effects
  cornerRadius: {
    category: ModifierCategory.Effects,
    options: {
      'rounded-sm': 'rounded-sm',
      rounded: 'rounded',
      'rounded-lg': 'rounded-lg',
      'rounded-full': 'rounded-full',
    },
  },
  shadow: {
    category: ModifierCategory.Effects,
    options: {
      'shadow-sm': 'shadow-sm',
      shadow: 'shadow',
      'shadow-lg': 'shadow-lg',
      'shadow-xl': 'shadow-xl',
    },
  },
  opacity: {
    category: ModifierCategory.Effects,
    options: {
      'opacity-50': 'opacity-50',
      'opacity-75': 'opacity-75',
      'opacity-90': 'opacity-90',
    },
  },
  // Alignment
  alignment: {
    category: ModifierCategory.Alignment,
    options: {
      'text-center': 'text-center',
      'text-left': 'text-left',
      'text-right': 'text-right',
      'items-center': 'items-center',
      'justify-center': 'justify-center',
      'self-center': 'self-center',
    },
  },
}
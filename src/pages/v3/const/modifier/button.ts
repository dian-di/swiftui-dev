import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '@/components/ui/button'
import { ControlSize } from '@/pages/v3/const/modifier/modifier'

type Variants = VariantProps<typeof buttonVariants>
type ButtonVariant = Variants['variant']
type ButtonSize = Variants['size']

type VariantsType = keyof Variants

export enum ButtonModifier {
  buttonStyle = 'buttonStyle',
  buttonBorderShape = 'buttonBorderShape',
}

enum ButtonStyle {
  automatic = 'automatic',
  plain = 'plain',
  bordered = 'bordered',
  borderedProminent = 'borderedProminent',
  borderless = 'borderless',
}

enum ButtonBorderShape {
  automatic = 'automatic',
  capsule = 'capsule',
  circle = 'circle',
  roundedRectangle = 'roundedRectangle',
}

enum Role {
  cancel = 'cancel',
  destructive = 'destructive',
}

const ButtonStyleOptions = Object.values(ButtonStyle)
const ButtonBorderShapeOptions = Object.values(ButtonBorderShape)
const ControlSizeOptions = Object.values(ControlSize)

type elementProp = {
  attr?: Partial<Record<VariantsType, ButtonVariant | ButtonSize>>
  className?: string
}

export const ButtonStyleOptionsMap: Record<ButtonStyle, elementProp> = {
  automatic: {
    attr: {
      variant: 'default',
    },
  },
  plain: {
    attr: {
      variant: 'ghost',
    },
  },
  bordered: {
    attr: {
      variant: 'outline',
    },
  },
  borderedProminent: {
    attr: {
      variant: 'destructive',
    },
  },
  borderless: {
    attr: {
      variant: 'link',
    },
  },
} as const

export const SizeOptionsMap: Record<ControlSize, elementProp> = {
  mini: {
    // attr: {
    //   size: 'sm',
    // },
    className: 'h-6 px-2 text-xs',
  },
  small: {
    attr: {
      size: 'sm',
    },
  },
  regular: {
    attr: {
      size: 'default',
    },
  },
  large: {
    attr: {
      size: 'lg',
    },
  },
} as const

export const ButtonBorderShapeOptionsMap: Record<ButtonBorderShape, elementProp> = {
  automatic: {
    className: '',
  },
  capsule: {
    className: 'rounded-full',
  },
  circle: {
    className: 'rounded-full aspect-square p-0', // aspect-square 确保宽高一致
  },
  roundedRectangle: {
    className: 'rounded-md',
  },
}

export const ButtonStyleOpt = {
  defaultValue: ButtonStyleOptions[0],
  options: ButtonStyleOptions,
}

export const ButtonBorderShapeOpt = {
  defaultValue: ButtonBorderShapeOptions[0],
  options: ButtonBorderShapeOptions,
}

export const ControlSizeOpt = {
  defaultValue: ControlSizeOptions[0],
  options: ControlSizeOptions,
}

const ButtonMap = {
  buttonStyle:  ButtonStyleOptionsMap,
  buttonBorderShape: ButtonBorderShapeOptionsMap,
  controlSize: SizeOptionsMap,
}

export function getButtonStyleByAttr(attr: string, option: ButtonStyle) {
  if (!option) return 'default'
  return ButtonStyleOptionsMap[option].attr[attr]
}

export function getButtonConfig() {

  return ButtonMap[]
}

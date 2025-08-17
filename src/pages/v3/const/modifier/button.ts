export enum ButtonModifier {
  buttonStyle = 'buttonStyle',
  buttonBorderShape = 'buttonBorderShape',
}

const options = ['automatic', 'plain', 'bordered', 'borderedProminent', 'borderless'] as const

export type OptionType = typeof options[number]

type elementProp = {
  attr: Record<string, string>
}

export const ButtonStyleOptionsMap: Record<OptionType, elementProp> = {
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
}

export const ButtonStyleOptions = {
  defaultValue: options[0],
  options,
}

export function getAttr(attr: string, option: OptionType) {
  console.log(option, 'option')
  if (!option) return 'default'
  return ButtonStyleOptionsMap[option].attr[attr]
}

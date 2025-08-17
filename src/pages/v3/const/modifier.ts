export enum ButtonModifier {
  buttonStyle = 'buttonStyle',
  buttonBorderShape = 'buttonBorderShape',
}

export enum TextFieldModifier {
  textFieldStyle = 'textFieldStyle',
}

export enum ControlSize {
  mini = 'mini',
  small = 'small',
  regular = 'regular',
  large = 'large',
}

enum edge {
  top,
  leading,
  bottom,
  trailing,
  all,
  horizontal,
  vertical,
}

export enum Alignment {
    center = 'center',
    leading = 'leading',
    trailing = 'trailing',
    top = 'top',
    bottom = 'bottom',
    topLeading = 'topLeading',
    topTrailing = 'topTrailing',
    bottomLeading = 'bottomLeading',
    bottomTrailing = 'bottomTrailing',
}

export enum FontSize {
  largeTitle = 'largeTitle',
  title = 'title',
  title2 = 'title2',
  title3 = 'title3',
  headline = 'headline',
  subheadline = 'subheadline',
  body = 'body',
  callout = 'callout',
  footnote = 'footnote',
  caption = 'caption',
  caption2 = 'caption2',
}

enum FontWeight {
  ultraLight,
  thin,
  light,
  regular,
  medium,
  semibold,
  bold,
  heavy,
  black,
}

enum FontWidth {
  compressed,
  condensed,
  standard,
  expanded,
}

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

const tailwindColors = {
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

// 颜色相关
export enum ColorModifier {
  backgroundColor = 'backgroundColor',
  foregroundColor = 'foregroundColor',
  accentColor = 'accentColor',
  tintColor = 'tintColor',
}

// 尺寸相关
export enum SizeModifier {
  frame = 'frame',
  width = 'width',
  height = 'height',
  aspectRatio = 'aspectRatio',
  scaleEffect = 'scaleEffect',
}

// 间距相关
export enum SpaceModifier {
  padding = 'padding',
  margin = 'margin',
  spacing = 'spacing',
}

export enum FontModifier {
  // 字体相关
  font = 'font',
  fontSize = 'fontSize',
  fontWeight = 'fontWeight',
  fontFamily = 'fontFamily',
  fontStyle = 'fontStyle',
  textAlign = 'textAlign',
  lineHeight = 'lineHeight',
  lineLimit = 'lineLimit',
  textDecoration = 'textDecoration',
}

export enum ShapeModifier {
  // 形状相关
  cornerRadius = 'cornerRadius',
  clipShape = 'clipShape',
  border = 'border',
  borderWidth = 'borderWidth',
  borderColor = 'borderColor',
  shadow = 'shadow',
}

export enum LayoutModifier {
  // 布局相关
  alignment = 'alignment',
  layoutPriority = 'layoutPriority',
  zIndex = 'zIndex',
  offset = 'offset',
  rotation = 'rotation',
}

export enum InteractModifier {
  disabled = 'disabled',
  opacity = 'opacity',
  animation = 'animation',
  transition = 'transition',
  gesture = 'gesture',
  onTap = 'onTap',
  onLongPress = 'onLongPress',
}

export type ModifierType = ColorModifier |SizeModifier |SpaceModifier |FontModifier |ShapeModifier |LayoutModifier |ButtonModifier | InteractModifier
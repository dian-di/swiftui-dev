import type { ButtonModifier } from './button'
import type { FontModifier } from './font'

export enum TextFieldModifier {
  textFieldStyle = 'textFieldStyle',
}

export enum ControlSize {
  mini = 'mini',
  small = 'small',
  regular = 'regular',
  large = 'large',
}

export enum edge {
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

export type ModifierType =
  | ColorModifier
  | SizeModifier
  | SpaceModifier
  | FontModifier
  | ShapeModifier
  | LayoutModifier
  | ButtonModifier
  | InteractModifier

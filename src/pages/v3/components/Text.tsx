import {
  ColorModifier,
  type ComponentDefinition,
  ComponentType,
  FontModifier,
  type ModifierType,
  Platform,
} from '../const/common'

const Text: ComponentDefinition = {
  type: ComponentType.Text,
  name: 'Text',
  defaultProps: { content: 'Hello, World!' },
  supportedPlatforms: [
    Platform.SwiftUI,
    // Platform.JetpackCompose,
    // Platform.Flutter,
    // Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ColorModifier.foregroundColor,
      name: 'Text Color',
      valueType: 'color',
      defaultValue: '#000000',
    },
    {
      type: FontModifier.fontSize,
      name: 'Font Size',
      valueType: 'number',
      defaultValue: 16,
      min: 8,
      max: 48,
      step: 1,
    },
    {
      type: FontModifier.fontWeight,
      name: 'Font Weight',
      valueType: 'select',
      defaultValue: 'normal',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    {
      type: FontModifier.fontFamily,
      name: 'Font Family',
      valueType: 'select',
      defaultValue: 'system',
      options: ['system', 'serif', 'monospace', 'cursive'],
    },
    {
      type: FontModifier.textAlign,
      name: 'Text Align',
      valueType: 'select',
      defaultValue: 'left',
      options: ['left', 'center', 'right', 'justify'],
    },
    {
      type: FontModifier.lineHeight,
      name: 'Line Height',
      valueType: 'number',
      defaultValue: 1.5,
      min: 1,
      max: 3,
      step: 0.1,
    },
    {
      type: FontModifier.lineLimit,
      name: 'Line Limit',
      valueType: 'number',
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      type: FontModifier.textDecoration,
      name: 'Text Decoration',
      valueType: 'select',
      defaultValue: 'none',
      options: ['none', 'underline', 'line-through'],
    },
  ],
  render: (component) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    return (
      <p
        style={{
          color: modifiers[ColorModifier.foregroundColor] || '#000000',
          fontSize: `${modifiers[FontModifier.fontSize] || 16}px`,
          fontWeight: modifiers[FontModifier.fontWeight] || 'normal',
          fontFamily: modifiers[FontModifier.fontFamily] || 'system-ui',
          textAlign: modifiers[FontModifier.textAlign] || 'left',
          lineHeight: modifiers[FontModifier.lineHeight] || 1.5,
          textDecoration: modifiers[FontModifier.textDecoration] || 'none',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: modifiers[FontModifier.lineLimit] || 'none',
          WebkitBoxOrient: 'vertical',
          overflow: modifiers[FontModifier.lineLimit] > 0 ? 'hidden' : 'visible',
        }}
      >
        {component.properties.content}
      </p>
    )
  },
}

export default Text

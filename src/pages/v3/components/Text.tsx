import { type ComponentDefinition, ComponentType, ModifierType, Platform } from "../const/common"

const Text: ComponentDefinition =  {
  type: ComponentType.Text,
  name: 'Text',
  defaultProps: { content: 'Hello, World!' },
  supportedPlatforms: [
    Platform.SwiftUI,
    Platform.JetpackCompose,
    Platform.Flutter,
    Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ModifierType.foregroundColor,
      name: 'Text Color',
      valueType: 'color',
      defaultValue: '#000000',
    },
    {
      type: ModifierType.fontSize,
      name: 'Font Size',
      valueType: 'number',
      defaultValue: 16,
      min: 8,
      max: 48,
      step: 1,
    },
    {
      type: ModifierType.fontWeight,
      name: 'Font Weight',
      valueType: 'select',
      defaultValue: 'normal',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    {
      type: ModifierType.fontFamily,
      name: 'Font Family',
      valueType: 'select',
      defaultValue: 'system',
      options: ['system', 'serif', 'monospace', 'cursive'],
    },
    {
      type: ModifierType.textAlign,
      name: 'Text Align',
      valueType: 'select',
      defaultValue: 'left',
      options: ['left', 'center', 'right', 'justify'],
    },
    {
      type: ModifierType.lineHeight,
      name: 'Line Height',
      valueType: 'number',
      defaultValue: 1.5,
      min: 1,
      max: 3,
      step: 0.1,
    },
    {
      type: ModifierType.lineLimit,
      name: 'Line Limit',
      valueType: 'number',
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      type: ModifierType.textDecoration,
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
          color: modifiers[ModifierType.foregroundColor] || '#000000',
          fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
          fontWeight: modifiers[ModifierType.fontWeight] || 'normal',
          fontFamily: modifiers[ModifierType.fontFamily] || 'system-ui',
          textAlign: modifiers[ModifierType.textAlign]|| 'left',
          lineHeight: modifiers[ModifierType.lineHeight] || 1.5,
          textDecoration: modifiers[ModifierType.textDecoration] || 'none',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: modifiers[ModifierType.lineLimit] || 'none',
          WebkitBoxOrient: 'vertical',
          overflow: modifiers[ModifierType.lineLimit] > 0 ? 'hidden' : 'visible',
        }}
      >
        {component.properties.content}
      </p>
    )
  },
}

export default Text
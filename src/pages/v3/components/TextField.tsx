import { type ComponentDefinition, ComponentType, ModifierType, Platform } from "../const/common"

const TextField: ComponentDefinition =  {
  type: ComponentType.TextField,
  name: 'TextField',
  defaultProps: { placeholder: 'Enter text...' },
  supportedPlatforms: [
    Platform.SwiftUI,
    Platform.JetpackCompose,
    Platform.Flutter,
    Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ModifierType.backgroundColor,
      name: 'Background Color',
      valueType: 'color',
      defaultValue: '#FFFFFF',
    },
    {
      type: ModifierType.foregroundColor,
      name: 'Text Color',
      valueType: 'color',
      defaultValue: '#000000',
    },
    {
      type: ModifierType.cornerRadius,
      name: 'Corner Radius',
      valueType: 'number',
      defaultValue: 8,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: ModifierType.padding,
      name: 'Padding',
      valueType: 'number',
      defaultValue: 12,
      min: 0,
      max: 50,
      step: 1,
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
      type: ModifierType.borderWidth,
      name: 'Border Width',
      valueType: 'number',
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      type: ModifierType.borderColor,
      name: 'Border Color',
      valueType: 'color',
      defaultValue: '#CCCCCC',
    },
  ],
  render: (component) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    return (
      <input
        type='text'
        placeholder={component.properties.placeholder}
        className='transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        style={{
          backgroundColor: modifiers[ModifierType.backgroundColor] || '#FFFFFF',
          color: modifiers[ModifierType.foregroundColor] || '#000000',
          borderRadius: `${modifiers[ModifierType.cornerRadius] || 8}px`,
          padding: `${modifiers[ModifierType.padding] || 12}px`,
          fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
          borderWidth: `${modifiers[ModifierType.borderWidth] || 1}px`,
          borderColor: modifiers[ModifierType.borderColor] || '#CCCCCC',
          borderStyle: 'solid',
          width: '100%',
        }}
      />
    )
  },
}

export default TextField
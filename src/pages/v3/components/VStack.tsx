import { type ComponentDefinition, ComponentType, ModifierType, Platform } from "../const/common"

const VStack: ComponentDefinition =  {
  type: ComponentType.VStack,
  name: 'VStack',
  defaultProps: {},
  hasChildren: true,
  supportedPlatforms: [
    Platform.SwiftUI,
    Platform.JetpackCompose,
    Platform.Flutter,
    Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ModifierType.spacing,
      name: 'Spacing',
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
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: ModifierType.backgroundColor,
      name: 'Background Color',
      valueType: 'color',
      defaultValue: 'transparent',
    },
    {
      type: ModifierType.cornerRadius,
      name: 'Corner Radius',
      valueType: 'number',
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: ModifierType.alignment,
      name: 'Alignment',
      valueType: 'select',
      defaultValue: 'center',
      options: ['leading', 'center', 'trailing'],
    },
    {
      type: ModifierType.frame,
      name: 'Frame',
      valueType: 'object',
      defaultValue: { width: 'auto', height: 'auto' },
    },
  ],
  render: (component, children) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    const alignmentMap = { leading: 'flex-start', center: 'center', trailing: 'flex-end' }
    return (
      <div
        className='flex flex-col'
        style={{
          gap: `${modifiers[ModifierType.spacing] || 8}px`,
          padding: `${modifiers[ModifierType.padding] || 0}px`,
          backgroundColor:
            modifiers[ModifierType.backgroundColor] === 'transparent'
              ? 'transparent'
              : modifiers[ModifierType.backgroundColor],
          borderRadius: `${modifiers[ModifierType.cornerRadius] || 0}px`,
          alignItems: alignmentMap[modifiers[ModifierType.alignment] as keyof typeof alignmentMap] || 'center',
        }}
      >
        {children}
      </div>
    )
  },
}

export default VStack
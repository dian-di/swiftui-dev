import { type ComponentDefinition, ComponentType, Platform } from '../const/common'
import {
  ColorModifier,
  LayoutModifier,
  type ModifierType,
  ShapeModifier,
  SizeModifier,
  SpaceModifier,
} from '../const/modifier/modifier'

const VStack: ComponentDefinition = {
  type: ComponentType.VStack,
  name: 'VStack',
  defaultProps: {},
  hasChildren: true,
  supportedPlatforms: [
    Platform.SwiftUI,
    // Platform.JetpackCompose,
    // Platform.Flutter,
    // Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: SpaceModifier.spacing,
      name: 'Spacing',
      valueType: 'number',
      defaultValue: 8,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: SpaceModifier.padding,
      name: 'Padding',
      valueType: 'number',
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: ColorModifier.backgroundColor,
      name: 'Background Color',
      valueType: 'color',
      defaultValue: 'transparent',
    },
    {
      type: ShapeModifier.cornerRadius,
      name: 'Corner Radius',
      valueType: 'number',
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      type: LayoutModifier.alignment,
      name: 'Alignment',
      valueType: 'select',
      defaultValue: 'center',
      options: ['leading', 'center', 'trailing'],
    },
    {
      type: SizeModifier.frame,
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
          gap: `${modifiers[SpaceModifier.spacing] || 8}px`,
          padding: `${modifiers[SpaceModifier.padding] || 0}px`,
          backgroundColor:
            modifiers[ColorModifier.backgroundColor] === 'transparent'
              ? 'transparent'
              : modifiers[ColorModifier.backgroundColor],
          borderRadius: `${modifiers[ShapeModifier.cornerRadius] || 0}px`,
          alignItems:
            alignmentMap[modifiers[LayoutModifier.alignment] as keyof typeof alignmentMap] ||
            'center',
        }}
      >
        {children}
      </div>
    )
  },
}

export default VStack

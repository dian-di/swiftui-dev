import { type ComponentDefinition, ComponentType, Platform } from '../const/common'
import {
  ColorModifier,
  LayoutModifier,
  type ModifierType,
  ShapeModifier,
  SpaceModifier,
} from '../const/modifier'

const HStack: ComponentDefinition = {
  type: ComponentType.HStack,
  name: 'HStack',
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
      options: [
        'center',
        'leading',
        'trailing',
        'top',
        'bottom',
        'topLeading',
        'topTrailing',
        'bottomLeading',
        'bottomTrailing',
      ],
    },
  ],
  render: (component, children) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    const alignmentMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }
    return (
      <div
        className='flex flex-row'
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

export default HStack

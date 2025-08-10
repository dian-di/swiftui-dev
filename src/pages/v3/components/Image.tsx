import { type ComponentDefinition, ComponentType, Platform } from '../const/common'
import {
  InteractModifier,
  type ModifierType,
  ShapeModifier,
  SizeModifier
} from '../const/modifier'

const aspectRatioMap = {
  original: 'auto',
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '3:4': '3 / 4',
  '9:16': '9 / 16',
} as const

const Image: ComponentDefinition = {
  type: ComponentType.Image,
  name: 'Image',
  defaultProps: { src: 'https://placehold.co/200', alt: 'Placeholder' },
  supportedPlatforms: [
    Platform.SwiftUI,
    // Platform.JetpackCompose,
    // Platform.Flutter,
    // Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
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
      type: SizeModifier.aspectRatio,
      name: 'Aspect Ratio',
      valueType: 'select',
      defaultValue: 'original',
      options: ['original', '1:1', '4:3', '16:9', '3:4', '9:16'],
    },
    {
      type: SizeModifier.scaleEffect,
      name: 'Scale',
      valueType: 'number',
      defaultValue: 1,
      min: 0.1,
      max: 3,
      step: 0.1,
    },
    {
      type: InteractModifier.opacity,
      name: 'Opacity',
      valueType: 'number',
      defaultValue: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    { type: ShapeModifier.shadow, name: 'Shadow', valueType: 'boolean', defaultValue: false },
  ],
  render: (component) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string | number>,
    )

    return (
      <img
        src={component.properties.src}
        alt={component.properties.alt}
        style={{
          borderRadius: `${modifiers[ShapeModifier.cornerRadius] || 0}px`,
          aspectRatio: aspectRatioMap[modifiers[SizeModifier.aspectRatio]] || 'auto',
          transform: `scale(${modifiers[SizeModifier.scaleEffect] || 1})`,
          opacity: modifiers[InteractModifier.opacity] || 1,
          boxShadow: modifiers[ShapeModifier.shadow] ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    )
  },
}

export default Image

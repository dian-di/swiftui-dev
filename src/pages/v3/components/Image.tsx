import { type ComponentDefinition, ComponentType, ModifierType, Platform } from "../const/common"

const Image: ComponentDefinition =  {
  type: ComponentType.Image,
  name: 'Image',
  defaultProps: { src: 'https://placehold.co/200', alt: 'Placeholder' },
  supportedPlatforms: [
    Platform.SwiftUI,
    Platform.JetpackCompose,
    Platform.Flutter,
    Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
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
      type: ModifierType.aspectRatio,
      name: 'Aspect Ratio',
      valueType: 'select',
      defaultValue: 'original',
      options: ['original', '1:1', '4:3', '16:9', '3:4', '9:16'],
    },
    {
      type: ModifierType.scaleEffect,
      name: 'Scale',
      valueType: 'number',
      defaultValue: 1,
      min: 0.1,
      max: 3,
      step: 0.1,
    },
    {
      type: ModifierType.opacity,
      name: 'Opacity',
      valueType: 'number',
      defaultValue: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    { type: ModifierType.shadow, name: 'Shadow', valueType: 'boolean', defaultValue: false },
  ],
  render: (component) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    const aspectRatioMap = {
      original: 'auto',
      '1:1': '1 / 1',
      '4:3': '4 / 3',
      '16:9': '16 / 9',
      '3:4': '3 / 4',
      '9:16': '9 / 16',
    }
    return (
      <img
        src={component.properties.src}
        alt={component.properties.alt}
        style={{
          borderRadius: `${modifiers[ModifierType.cornerRadius] || 0}px`,
          aspectRatio: aspectRatioMap[modifiers[ModifierType.aspectRatio]] || 'auto',
          transform: `scale(${modifiers[ModifierType.scaleEffect] || 1})`,
          opacity: modifiers[ModifierType.opacity] || 1,
          boxShadow: modifiers[ModifierType.shadow] ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    )
  },
}

export default Image
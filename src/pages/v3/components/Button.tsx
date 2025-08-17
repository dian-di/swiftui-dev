import { Button as UIButton } from '@/components/ui/button'
import { type ComponentDefinition, ComponentType, Platform } from '../const/common'
import {
  ButtonModifier,
  ColorModifier,
  FontModifier,
  InteractModifier,
  type ModifierType,
  ShapeModifier,
  SpaceModifier,
} from '../const/modifier'

const Button: ComponentDefinition = {
  type: ComponentType.Button,
  name: 'Button',
  defaultProps: { text: 'Button' },
  supportedPlatforms: [
    Platform.SwiftUI,
    // Platform.JetpackCompose,
    // Platform.Flutter,
    // Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ButtonModifier.buttonStyle,
      name: 'ButtonStyle',
      valueType: 'select',
      defaultValue: 'automatic',
      options: ['automatic', 'plain', 'bordered', 'borderedProminent', 'borderless'],
      optionsMap: {
        automatic: {
          attrList: [{}],
          styleList: [{}],
          classList: [{}],
        },
      }
    },
    {
      type: ButtonModifier.buttonBorderShape,
      name: 'buttonBorderShape',
      valueType: 'select',
      defaultValue: 'automatic',
      // TODO: option support function, .eg:.roundedRectangle(radius: 14)
      options: ['automatic', 'capsule'],
    },
    {
      type: ColorModifier.backgroundColor,
      name: 'Background Color',
      valueType: 'color',
      defaultValue: '#007AFF',
    },
    {
      type: ColorModifier.foregroundColor,
      name: 'Text Color',
      valueType: 'color',
      defaultValue: '#FFFFFF',
    },
    {
      type: ShapeModifier.cornerRadius,
      name: 'Corner Radius',
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
      defaultValue: 12,
      min: 0,
      max: 50,
      step: 1,
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
      type: InteractModifier.disabled,
      name: 'Disabled',
      valueType: 'boolean',
      defaultValue: false,
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
  ],
  render: (component) => {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {} as Record<ModifierType, string>,
    )
    return (
      <UIButton
        type='button'
        className='transition-all duration-200 hover:opacity-80'
        disabled={modifiers[InteractModifier.disabled] === 'true'}
        style={{
          backgroundColor: modifiers[ColorModifier.backgroundColor] || '#007AFF',
          color: modifiers[ColorModifier.foregroundColor] || '#FFFFFF',
          borderRadius: `${modifiers[ShapeModifier.cornerRadius] || 8}px`,
          padding: `${modifiers[SpaceModifier.padding] || 12}px ${(Number(modifiers[SpaceModifier.padding]) || 12) * 1.5}px`,
          fontSize: `${modifiers[FontModifier.fontSize] || 16}px`,
          fontWeight: modifiers[FontModifier.fontWeight] || 'normal',
          opacity: modifiers[InteractModifier.opacity] || 1,
          border: 'none',
          cursor: modifiers[InteractModifier.disabled] ? 'not-allowed' : 'pointer',
        }}
      >
        {component.properties.text}
      </UIButton>
    )
  },
}

export default Button

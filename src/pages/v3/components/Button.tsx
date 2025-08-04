import { Button as UIButton } from '@/components/ui/button'
import { type ComponentDefinition, ComponentType, ModifierType, Platform } from '../const/common'



export enum ButtonModifierType {
  buttonStyle = 'buttonStyle',
  buttonBorderShape = 'buttonBorderShape',
}

export enum ControlSizeModifierType {
  mini = 'mini',
  small = 'small',
  regular = 'regular',
  large = 'large',
}

const Button: ComponentDefinition = {
  type: ComponentType.Button,
  name: 'Button',
  defaultProps: { text: 'Button' },
  supportedPlatforms: [
    Platform.SwiftUI,
    Platform.JetpackCompose,
    Platform.Flutter,
    Platform.ReactNative,
    Platform.Web,
  ],
  availableModifiers: [
    {
      type: ButtonModifierType.buttonStyle,
      name: 'Font Weight',
      valueType: 'select',
      defaultValue: 'normal',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    {
      type: ButtonModifierType.buttonBorderShape,
      name: 'Font Weight',
      valueType: 'select',
      defaultValue: 'normal',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    {
      type: ModifierType.backgroundColor,
      name: 'Background Color',
      valueType: 'color',
      defaultValue: '#007AFF',
    },
    {
      type: ModifierType.foregroundColor,
      name: 'Text Color',
      valueType: 'color',
      defaultValue: '#FFFFFF',
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
      type: ModifierType.fontWeight,
      name: 'Font Weight',
      valueType: 'select',
      defaultValue: 'normal',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    { type: ModifierType.disabled, name: 'Disabled', valueType: 'boolean', defaultValue: false },
    {
      type: ModifierType.opacity,
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
        disabled={modifiers[ModifierType.disabled] === 'true'}
        style={{
          backgroundColor: modifiers[ModifierType.backgroundColor] || '#007AFF',
          color: modifiers[ModifierType.foregroundColor] || '#FFFFFF',
          borderRadius: `${modifiers[ModifierType.cornerRadius] || 8}px`,
          padding: `${modifiers[ModifierType.padding] || 12}px ${(Number(modifiers[ModifierType.padding]) || 12) * 1.5}px`,
          fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
          fontWeight: modifiers[ModifierType.fontWeight] || 'normal',
          opacity: modifiers[ModifierType.opacity] || 1,
          border: 'none',
          cursor: modifiers[ModifierType.disabled] ? 'not-allowed' : 'pointer',
        }}
      >
        {component.properties.text}
      </UIButton>
    )
  },
}

export default Button

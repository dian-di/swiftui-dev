import { uuid } from '@/lib/utils'
import { type ComponentIR, ComponentType, type ModifierDefinition } from '@/pages/v3/const/common'
import {
  ColorModifier,
  FontModifier,
  ShapeModifier,
  SpaceModifier,
} from '@/pages/v3/const/modifier'
import componentRegistry from '@/pages/v3/const/registry'

export function initComponentIR(type: ComponentType): ComponentIR {
  const definition = componentRegistry[type]
  return {
    id: uuid(),
    type,
    properties: { ...definition.defaultProps },
    modifiers: definition.availableModifiers.map((mod: ModifierDefinition) => ({
      type: mod.type,
      value: mod.defaultValue,
    })),
    children: [],
  }
}

export function defaultComponentIR(): ComponentIR {
  return {
    id: 'root',
    type: ComponentType.VStack,
    properties: {},
    modifiers: [
      { type: SpaceModifier.spacing, value: 16 },
      { type: SpaceModifier.padding, value: 20 },
    ],
    children: [
      {
        id: uuid(),
        type: ComponentType.Text,
        properties: { content: 'Welcome to SwiftUI' },
        modifiers: [
          { type: FontModifier.fontSize, value: 24 },
          { type: FontModifier.fontWeight, value: 'bold' },
        ],
      },
      {
        id: uuid(),
        type: ComponentType.Button,
        properties: { text: 'Get Started' },
        modifiers: [
          { type: ColorModifier.backgroundColor, value: '#007AFF' },
          { type: ShapeModifier.cornerRadius, value: 12 },
        ],
      },
      {
        id: uuid(),
        type: ComponentType.Image,
        properties: { src: 'https://placehold.co/200', alt: 'Placeholder' },
        modifiers: [
          // { type: ModifierType.backgroundColor, value: '#007AFF' },
          { type: ShapeModifier.cornerRadius, value: 12 },
        ],
      },
    ],
  }
}

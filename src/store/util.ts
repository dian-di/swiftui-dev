import { uuid } from '@/lib/utils'
import {
  type ComponentIR,
  ComponentType,
  type ModifierDefinition,
  ModifierType,
} from '@/pages/v3/const/common'
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
      { type: ModifierType.spacing, value: 16 },
      { type: ModifierType.padding, value: 20 },
    ],
    children: [
      {
        id: uuid(),
        type: ComponentType.Text,
        properties: { content: 'Welcome to SwiftUI' },
        modifiers: [
          { type: ModifierType.fontSize, value: 24 },
          { type: ModifierType.fontWeight, value: 'bold' },
        ],
      },
      {
        id: uuid(),
        type: ComponentType.Button,
        properties: { text: 'Get Started' },
        modifiers: [
          { type: ModifierType.backgroundColor, value: '#007AFF' },
          { type: ModifierType.cornerRadius, value: 12 },
        ],
      },
    ],
  }
}

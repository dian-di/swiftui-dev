import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import type { ComponentIR, ModifierDefinition } from '../const/common'
import componentRegistry from '../const/registry'

export default function PropertyView({
  selectedComponent,
  updateComponent,
}: {
  selectedComponent: ComponentIR
  updateComponent: (id: string, updates: Partial<ComponentIR>) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedComponent ? (
          <div className='space-y-4'>
            <h3 className='font-medium'>{selectedComponent.type}</h3>

            {/* 编辑基础属性 */}
            {Object.entries(selectedComponent.properties).map(([key, value]) => (
              <div key={key}>
                {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                <label className='font-medium text-sm'>{key}</label>
                <Input
                  value={value}
                  onChange={(e) =>
                    updateComponent(selectedComponent.id, {
                      properties: { ...selectedComponent.properties, [key]: e.target.value },
                    })
                  }
                />
              </div>
            ))}

            {/* 编辑修饰符 */}
            {componentRegistry[selectedComponent.type]?.availableModifiers.map(
              (modifierDef: ModifierDefinition) => {
                const currentModifier = selectedComponent.modifiers.find(
                  (m) => m.type === modifierDef.type,
                )
                const currentValue = currentModifier?.value ?? modifierDef.defaultValue

                return (
                  <div key={modifierDef.type}>
                    {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                    <label className='font-medium text-sm'>{modifierDef.name}</label>
                    {modifierDef.valueType === 'color' ? (
                      <Input
                        type='color'
                        value={currentValue}
                        onChange={(e) => {
                          const newModifiers = selectedComponent.modifiers.filter(
                            (m) => m.type !== modifierDef.type,
                          )
                          newModifiers.push({ type: modifierDef.type, value: e.target.value })
                          updateComponent(selectedComponent.id, { modifiers: newModifiers })
                        }}
                      />
                    ) : modifierDef.valueType === 'number' ? (
                      <div className='space-y-2'>
                        <Slider
                          value={[currentValue]}
                          onValueChange={([value]) => {
                            const newModifiers = selectedComponent.modifiers.filter(
                              (m) => m.type !== modifierDef.type,
                            )
                            newModifiers.push({ type: modifierDef.type, value })
                            updateComponent(selectedComponent.id, { modifiers: newModifiers })
                          }}
                          min={modifierDef.min || 0}
                          max={modifierDef.max || 100}
                          step={modifierDef.step || 1}
                        />
                        <span className='text-gray-500 text-sm'>{currentValue}</span>
                      </div>
                    ) : modifierDef.valueType === 'select' ? (
                      <Select
                        value={currentValue}
                        onValueChange={(value) => {
                          const newModifiers = selectedComponent.modifiers.filter(
                            (m) => m.type !== modifierDef.type,
                          )
                          newModifiers.push({ type: modifierDef.type, value })
                          updateComponent(selectedComponent.id, { modifiers: newModifiers })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {modifierDef.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={currentValue}
                        onChange={(e) => {
                          const newModifiers = selectedComponent.modifiers.filter(
                            (m) => m.type !== modifierDef.type,
                          )
                          newModifiers.push({ type: modifierDef.type, value: e.target.value })
                          updateComponent(selectedComponent.id, { modifiers: newModifiers })
                        }}
                      />
                    )}
                  </div>
                )
              },
            )}
          </div>
        ) : (
          <p className='text-gray-500'>Select a component to edit its properties</p>
        )}
      </CardContent>
    </Card>
  )
}

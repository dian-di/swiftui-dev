import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useComponentIRStore, useSelectedComponentIRStore } from '@/store/ComponentIR'
import type { ComponentDefinition, ComponentIR, ComponentType } from '../const/common'
import componentRegistry from '../const/registry'

export default function TreeView() {
  const { componentIR, add, remove } = useComponentIRStore()
  const { selectedId, select } = useSelectedComponentIRStore()
  // 渲染组件树
  const renderComponentTree = (component: ComponentIR, depth = 0) => (
    <div key={component.id} className='ml-4'>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-2 ${
          selectedId === component.id ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        onClick={() => select(component.id)}
      >
        <span className='font-medium text-sm'>{component.type}</span>
        {component.id !== 'root' && (
          <Button
            size='sm'
            variant='ghost'
            className='h-6 w-6 p-0'
            onClick={(e) => {
              e.stopPropagation()
              remove(component.id)
            }}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        )}
      </div>
      {component.children?.map((child) => renderComponentTree(child, depth + 1))}
    </div>
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          Component Tree
          <Select onValueChange={(type: ComponentType) => add('root', type)}>
            <SelectTrigger className='w-32'>
              <Plus className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Add' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(componentRegistry).map((def: ComponentDefinition) => (
                <SelectItem key={def.type} value={def.type}>
                  {def.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>{renderComponentTree(componentIR)}</CardContent>
    </Card>
  )
}

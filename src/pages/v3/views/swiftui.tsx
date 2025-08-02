import { Plus, Trash2 } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useComponentIRStore } from '@/store/ComponentIR'
import type {
  ComponentDefinition,
  ComponentIR,
  ComponentType,
} from '../const/common'
import componentRegistry from '../const/registry'
import SwiftUICodeGenerator from '../generator/swiftui'
import GeneratedView from './generated'
import PreviewView from './preview'
import PropertyView from './property'

export default function SwiftUITeachingPlatform() {
  const { componentIR, selectedId, findComponentIR, addComponentIR, selectComponentIR, updateComponentIR, removeComponentIR } = useComponentIRStore()

  const selectedComponent = useMemo(() => selectedId ? findComponentIR(selectedId) : null, [selectedId])

  // 生成SwiftUI代码
  const generatedCode = useMemo(() => {
    if (!componentIR) return ''
    return SwiftUICodeGenerator.generate(componentIR)
  }, [componentIR])

  // 渲染组件树
  const renderComponentTree = (component: ComponentIR, depth = 0) => (
    <div key={component.id} className='ml-4'>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-2 ${
          selectedId === component.id ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        onClick={() => selectComponentIR(component.id)}
      >
        <span className='font-medium text-sm'>{component.type}</span>
        {component.id !== 'root' && (
          <Button
            size='sm'
            variant='ghost'
            className='h-6 w-6 p-0'
            onClick={(e) => {
              e.stopPropagation()
              removeComponentIR(component.id)
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
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 font-bold text-3xl text-gray-900'>SwiftUI Teaching Platform</h1>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* 组件树 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Component Tree
                <Select onValueChange={(type: ComponentType) => addComponentIR('root', type)}>
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
            <CardContent>
              {renderComponentTree(componentIR)}
            </CardContent>
          </Card>

          {/* 预览区域 */}
          <PreviewView componentIR={componentIR} />

          <PropertyView
            selectedComponent={selectedComponent as ComponentIR}
            updateComponent={updateComponentIR}
          />
        </div>

        <GeneratedView generatedCode={generatedCode} />
      </div>
    </div>
  )
}

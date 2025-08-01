import { Code, Copy, Eye, Play, Settings, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { SwiftUIModifiers } from './const/modifier'
import { SwiftUIViews } from './const/view'

type SwiftUIView = {
  id: string
  type: string
  content: string
  modifiers: string[]
  children: SwiftUIView[]
}

const SwiftUIInteractivePlayground = () => {
  const [viewHierarchy, setViewHierarchy] = useState<SwiftUIView[]>([
    {
      id: '1',
      type: 'VStack',
      content: 'Container',
      modifiers: ['items-center', 'justify-center', 'min-h-screen', 'bg-gray-100'],
      children: [
        {
          id: '2',
          type: 'Text',
          content: 'Welcome to SwiftUI',
          modifiers: ['text-2xl', 'font-bold', 'text-blue-500', 'mb-4'],
          children: [],
        },
        {
          id: '3',
          type: 'Button',
          content: 'Get Started',
          modifiers: ['px-6', 'py-3', 'bg-blue-500', 'text-white', 'rounded-lg', 'shadow'],
          children: [],
        },
      ],
    },
  ])

  const [selectedView, setSelectedView] = useState<SwiftUIView | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [activeTab, setActiveTab] = useState('design')

  // Add new view
  const addView = useCallback(
    (parentId: string, viewType: string) => {
      const newView: SwiftUIView = {
        id: Date.now().toString(),
        type: viewType,
        content: viewType === 'Text' ? 'New Text' : viewType === 'Button' ? 'New Button' : viewType,
        modifiers: [],
        children: [],
      }

      const updateHierarchy: (views: SwiftUIView[]) => SwiftUIView[] = (views: SwiftUIView[]) => {
        return views.map((view: SwiftUIView) => {
          if (view.id === parentId) {
            return { ...view, children: [...view.children, newView] }
          }
          if (view.children.length > 0) {
            return { ...view, children: updateHierarchy(view.children) }
          }
          return view
        })
      }

      setViewHierarchy(updateHierarchy(viewHierarchy))
    },
    [viewHierarchy],
  )

  // Remove view
  const removeView = useCallback(
    (viewId: string) => {
      const removeFromHierarchy: (views: SwiftUIView[]) => SwiftUIView[] = (views: SwiftUIView[]) => {
        return views
          .filter((view: SwiftUIView) => view.id !== viewId)
          .map((view: SwiftUIView) => ({
            ...view,
            children: removeFromHierarchy(view.children),
          }))
      }

      setViewHierarchy(removeFromHierarchy(viewHierarchy))
      if (selectedView?.id === viewId) {
        setSelectedView(null)
      }
    },
    [viewHierarchy, selectedView],
  )

  // Toggle modifier
  const toggleModifier = useCallback(
    (viewId: string, modifier: string) => {
      const updateModifiers: (views: SwiftUIView[]) => SwiftUIView[] = (views: SwiftUIView[]) => {
        return views.map((view: SwiftUIView) => {
          if (view.id === viewId) {
            const hasModifier = view.modifiers.includes(modifier)
            const newModifiers = hasModifier
              ? view.modifiers.filter((m) => m !== modifier)
              : [...view.modifiers, modifier]
            return { ...view, modifiers: newModifiers }
          }
          if (view.children.length > 0) {
            return { ...view, children: updateModifiers(view.children) }
          }
          return view
        })
      }

      setViewHierarchy(updateModifiers(viewHierarchy))
    },
    [viewHierarchy],
  )

  // Update view content
  const updateViewContent = useCallback(
    (viewId: string, content: string) => {
      const updateContent: (views: SwiftUIView[]) => SwiftUIView[] = (views: SwiftUIView[]) => {
        return views.map((view: SwiftUIView) => {
          if (view.id === viewId) {
            return { ...view, content }
          }
          if (view.children.length > 0) {
            return { ...view, children: updateContent(view.children) }
          }
          return view
        })
      }

      setViewHierarchy(updateContent(viewHierarchy))
    },
    [viewHierarchy],
  )

  // Render view component
  const renderView = (view: SwiftUIView, isSelected = false) => {
    const ViewComponent = SwiftUIViews[view.type as keyof typeof SwiftUIViews]
    if (!ViewComponent) return null

    const className = view.modifiers.join(' ') + (isSelected ? ' ring-2 ring-blue-500' : '')

    return (
      <div key={view.id} className='group relative'>
        <ViewComponent
          className={className}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setSelectedView(view)
          }}
        >
          {view.type === 'Text' || view.type === 'Button' ? view.content : ''}
          {view.children.map((child) => renderView(child, selectedView?.id === child.id))}
        </ViewComponent>

        {/* View controls */}
        <div className='absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100'>
          <div className='flex gap-1 rounded bg-white p-1 shadow-lg'>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                setSelectedView(view)
              }}
              className='rounded p-1 hover:bg-gray-100'
            >
              <Settings size={12} />
            </button>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                removeView(view.id)
              }}
              className='rounded p-1 text-red-600 hover:bg-red-100'
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Generate SwiftUI code
  const generateSwiftUICode = (views: SwiftUIView[], indent = 0) => {
    const indentStr = '  '.repeat(indent)

    return views
      .map((view) => {
        let code = `${indentStr}${view.type}`

        if (view.type === 'Text') {
          code += `("${view.content}")`
        } else if (view.type === 'Button') {
          code += `("${view.content}") { }`
        } else if (view.children.length > 0) {
          code += ' {\n'
          code += generateSwiftUICode(view.children, indent + 1)
          code += `${indentStr}}`
        }

        // Add modifiers (simplified mapping)
        view.modifiers.forEach((modifier) => {
          if (modifier.startsWith('text-') && modifier.includes('xl')) {
            code += '\n' + indentStr + '  .font(.title)'
          } else if (modifier.includes('font-bold')) {
            code += '\n' + indentStr + '  .fontWeight(.bold)'
          } else if (modifier.startsWith('bg-')) {
            const color = modifier.split('-')[1]
            code += `\n${indentStr}  .background(Color.${color})`
          } else if (modifier.includes('rounded')) {
            code += `\n${indentStr}  .cornerRadius(8)`
          } else if (modifier.includes('shadow')) {
            code += `\n${indentStr}  .shadow(radius: 4)`
          } else if (modifier.includes('p-') || modifier.includes('padding')) {
            code += `\n${indentStr}  .padding()`
          }
        })

        return code + '\n'
      })
      .join('')
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Left Sidebar - Views & Modifiers */}
      <div className='flex w-80 flex-col border-gray-200 border-r bg-white'>
        <div className='border-gray-200 border-b p-4'>
          <h2 className='font-semibold text-gray-900 text-lg'>SwiftUI Playground</h2>
        </div>

        {/* Tabs */}
        <div className='flex border-gray-200 border-b'>
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`flex-1 px-4 py-2 font-medium text-sm ${
              activeTab === 'design'
                ? 'border-blue-600 border-b-2 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye size={16} className='mr-2 inline' />
            Design
          </button>
          <button
          type="button"
            onClick={() => setActiveTab('code')}
            className={`flex-1 px-4 py-2 font-medium text-sm ${
              activeTab === 'code'
                ? 'border-blue-600 border-b-2 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code size={16} className='mr-2 inline' />
            Code
          </button>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {activeTab === 'design' && (
            <>
              {/* Views Library */}
              <div className='p-4'>
                <h3 className='mb-3 font-medium text-gray-900 text-sm'>Views</h3>
                <div className='grid grid-cols-2 gap-2'>
                  {Object.keys(SwiftUIViews).map((viewType) => (
                    <button
                    type="button"
                      key={viewType}
                      onClick={() => selectedView && addView(selectedView.id, viewType)}
                      className='rounded-lg border border-gray-200 p-3 text-left text-sm hover:bg-gray-50'
                      disabled={!selectedView}
                    >
                      {viewType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modifiers */}
              {selectedView && (
                <div className='border-gray-200 border-t p-4'>
                  <h3 className='mb-3 font-medium text-gray-900 text-sm'>
                    Modifiers for {selectedView.type}
                  </h3>

                  {/* Content Editor */}
                  {(selectedView.type === 'Text' || selectedView.type === 'Button') && (
                    <div className='mb-4'>
                      <label htmlFor='content' className='mb-1 block font-medium text-gray-700 text-xs'>
                        Content
                      </label>
                      <input
                        type='text'
                        value={selectedView.content}
                        onChange={(e) => updateViewContent(selectedView.id, e.target.value)}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                      />
                    </div>
                  )}

                  {/* Modifier Categories */}
                  {Object.entries(SwiftUIModifiers).map(([modifierName, modifier]) => (
                    <div key={modifierName} className='mb-4'>
                      <h4 className='mb-2 font-medium text-gray-600 text-xs'>
                        {modifier.category}
                      </h4>
                      <div className='space-y-1'>
                        {Object.entries(modifier.options).map(([optionName, tailwindClass]) => (
                          <label key={optionName} className='flex items-center text-xs'>
                            <input
                              type='checkbox'
                              checked={selectedView.modifiers.includes(tailwindClass)}
                              onChange={() => toggleModifier(selectedView.id, tailwindClass)}
                              className='mr-2 rounded'
                            />
                            {optionName}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'code' && (
            <div className='p-4'>
              <h3 className='mb-3 font-medium text-gray-900 text-sm'>Generated SwiftUI Code</h3>
              <pre className='overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs'>
                <code>{generateSwiftUICode(viewHierarchy)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div className='flex flex-1 flex-col'>
        {/* Toolbar */}
        <div className='flex items-center justify-between border-gray-200 border-b bg-white px-6 py-3'>
          <div className='flex items-center gap-4'>
            <h1 className='font-semibold text-gray-900 text-xl'>Canvas</h1>
            {selectedView && (
              <span className='text-gray-500 text-sm'>Selected: {selectedView.type}</span>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className='flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200'
            >
              <Code size={16} />
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            <button type="button" className='flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700'>
              <Play size={16} />
              Preview
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className='flex-1 overflow-auto p-6'>
          {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
          <div
            className='relative min-h-full rounded-lg border border-gray-200 bg-white shadow-sm'
            onClick={() => setSelectedView(null)}
          >
            {viewHierarchy.map((view) => renderView(view, selectedView?.id === view.id))}
          </div>
        </div>

        {/* Code Panel */}
        {showCode && (
          <div className='h-64 border-gray-200 border-t bg-gray-900 text-gray-100'>
            <div className='p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='font-medium text-sm'>SwiftUI Code</h3>
                <button type="button" className='rounded p-1 hover:bg-gray-700'>
                  <Copy size={16} />
                </button>
              </div>
              <pre className='overflow-auto text-sm'>
                <code>{generateSwiftUICode(viewHierarchy)}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SwiftUIInteractivePlayground

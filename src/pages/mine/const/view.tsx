import type { JSX } from 'react/jsx-runtime'

enum ViewType {
  Text = 'Text',
  Button = 'Button',
  Image = 'Image',
  VStack = 'VStack',
  HStack = 'HStack',
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  Spacer = 'Spacer',
  
}

export const SwiftUIViews: Record<ViewType, (props: any) => JSX.Element> = {
  Text: ({ children, ...props }) => (
    <span className={`inline-block ${props.className || ''}`} style={props.style}>
      {children || 'Hello World'}
    </span>
  ),
  Button: ({ children, ...props }) => (
    <button
      type='button'
      className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${props.className || ''}`}
      style={props.style}
    >
      {children || 'Button'}
    </button>
  ),
  Image: ({ ...props }) => (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded bg-gray-300 ${props.className || ''}`}
      style={props.style}
    >
      📷
    </div>
  ),
  VStack: ({ children, ...props }) => (
    <div className={`flex flex-col ${props.className || ''}`} style={props.style}>
      {children}
    </div>
  ),
  HStack: ({ children, ...props }) => (
    <div className={`flex flex-row ${props.className || ''}`} style={props.style}>
      {children}
    </div>
  ),
  Rectangle: ({ ...props }) => (
    <div className={`h-16 w-16 bg-blue-500 ${props.className || ''}`} style={props.style}></div>
  ),
  Circle: ({ ...props }) => (
    <div
      className={`h-16 w-16 rounded-full bg-blue-500 ${props.className || ''}`}
      style={props.style}
    ></div>
  ),
  Spacer: ({ ...props }) => (
    <div className={`flex-1 ${props.className || ''}`} style={props.style}></div>
  ),
} as const

export type SwiftUIViewFunction = typeof SwiftUIViews[keyof typeof SwiftUIViews]

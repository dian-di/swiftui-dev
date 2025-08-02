import GeneratedView from './generated'
import PreviewView from './preview'
import PropertyView from './property'
import TreeView from './tree'

export default function SwiftUITeachingPlatform() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 font-bold text-3xl text-gray-900'>SwiftUI Teaching Platform</h1>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <TreeView />
          <PreviewView />
          <PropertyView />
        </div>
        <GeneratedView />
      </div>
    </div>
  )
}

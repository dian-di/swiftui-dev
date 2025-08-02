import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useComponentIRStore } from '@/store/ComponentIR'
import SwiftUICodeGenerator from '../generator/swiftui'

export default function GeneratedView() {
  const { componentIR } = useComponentIRStore()

  // 生成SwiftUI代码
  const generatedCode = useMemo(() => {
    if (!componentIR) return ''
    return SwiftUICodeGenerator.generate(componentIR)
  }, [componentIR])

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>Generated SwiftUI Code</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className='overflow-x-auto rounded bg-gray-100 p-4 text-sm'>
          <code>{generatedCode}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

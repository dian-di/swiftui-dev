import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GeneratedView({generatedCode}: {generatedCode: string}) {
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
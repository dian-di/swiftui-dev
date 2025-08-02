import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useComponentIRStore } from '@/store/ComponentIR'
import { IRRenderer } from '../utils/IRRender'

export default function PreviewView() {
  const { componentIR } = useComponentIRStore()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='min-h-[400px] rounded-lg border bg-white p-6'>
          <div key={componentIR.id}>{IRRenderer.render(componentIR)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

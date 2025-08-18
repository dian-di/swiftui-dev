import { useState } from 'react'
// import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SwiftUISimulator = () => {
  // Button组件状态
  const [buttonState, setButtonState] = useState({
    text: 'Hello SwiftUI',
    cornerRadius: 8,
    backgroundColor: 'blue',
    foregroundColor: 'white',
    padding: 16,
    fontSize: 16,
    fontWeight: 'medium',
  })

  // Text组件状态
  const [textState, setTextState] = useState({
    content: 'SwiftUI Text',
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
    alignment: 'left',
  })

  // VStack组件状态
  const [stackState, setStackState] = useState({
    spacing: 10,
    alignment: 'center',
    padding: 20,
  })

  // 背景色选项
  const backgroundColors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500',
    yellow: 'bg-yellow-500',
  }

  // 文字颜色选项
  const textColors = {
    black: 'text-black',
    white: 'text-white',
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  }

  // 字体粗细选项
  const fontWeights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  // 对齐方式选项
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-center font-bold text-3xl text-gray-800'>SwiftUI 组件模拟器</h1>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* 预览区域 */}
          <Card className='h-fit'>
            <CardHeader>
              <CardTitle>预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='min-h-96 rounded-lg border-2 border-gray-300 border-dashed bg-white p-8'>
                {/* 模拟SwiftUI的VStack */}
                <div
                  className={`flex flex-col items-${stackState.alignment === 'center' ? 'center' : stackState.alignment === 'leading' ? 'start' : 'end'}`}
                  style={{
                    gap: `${stackState.spacing}px`,
                    padding: `${stackState.padding}px`,
                  }}
                >
                  {/* SwiftUI Text组件 */}
                  <div
                    className={`${textColors[textState.color]} ${fontWeights[textState.fontWeight]} ${alignments[textState.alignment]}`}
                    style={{ fontSize: `${textState.fontSize}px` }}
                  >
                    {textState.content}
                  </div>

                  {/* SwiftUI Button组件 */}
                  {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    className={`${backgroundColors[buttonState.backgroundColor]} ${textColors[buttonState.foregroundColor]} ${fontWeights[buttonState.fontWeight]} transition-all duration-200 hover:opacity-80 active:scale-95`}
                    style={{
                      borderRadius: `${buttonState.cornerRadius}px`,
                      padding: `${buttonState.padding}px`,
                      fontSize: `${buttonState.fontSize}px`,
                    }}
                    onClick={() => alert('Button tapped!')}
                  >
                    {buttonState.text}
                  </button>

                  {/* 更多Text示例 */}
                  <div className='font-light text-gray-600 text-sm'>.font(.caption)</div>

                  <div className='font-semibold text-blue-600 text-lg'>.foregroundColor(.blue)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 控制面板 */}
          <Card>
            <CardHeader>
              <CardTitle>组件属性</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='button' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='button'>Button</TabsTrigger>
                  <TabsTrigger value='text'>Text</TabsTrigger>
                  <TabsTrigger value='stack'>VStack</TabsTrigger>
                </TabsList>

                {/* Button修饰符 */}
                <TabsContent value='button' className='space-y-4'>
                  <div>
                    <Label htmlFor='button-text'>Text</Label>
                    <Input
                      id='button-text'
                      value={buttonState.text}
                      onChange={(e) =>
                        setButtonState((prev) => ({ ...prev, text: e.target.value }))
                      }
                      className='mt-1'
                    />
                  </div>

                  <div>
                    <Label>Background Color</Label>
                    <Select
                      value={buttonState.backgroundColor}
                      onValueChange={(value) =>
                        setButtonState((prev) => ({ ...prev, backgroundColor: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(backgroundColors).map((color) => (
                          <SelectItem key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Foreground Color</Label>
                    <Select
                      value={buttonState.foregroundColor}
                      onValueChange={(value) =>
                        setButtonState((prev) => ({ ...prev, foregroundColor: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(textColors).map((color) => (
                          <SelectItem key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Corner Radius: {buttonState.cornerRadius}px</Label>
                    <Slider
                      value={[buttonState.cornerRadius]}
                      onValueChange={([value]) =>
                        setButtonState((prev) => ({ ...prev, cornerRadius: value }))
                      }
                      max={30}
                      min={0}
                      step={1}
                      className='mt-2'
                    />
                  </div>

                  <div>
                    <Label>Padding: {buttonState.padding}px</Label>
                    <Slider
                      value={[buttonState.padding]}
                      onValueChange={([value]) =>
                        setButtonState((prev) => ({ ...prev, padding: value }))
                      }
                      max={40}
                      min={8}
                      step={2}
                      className='mt-2'
                    />
                  </div>

                  <div>
                    <Label>Font Size: {buttonState.fontSize}px</Label>
                    <Slider
                      value={[buttonState.fontSize]}
                      onValueChange={([value]) =>
                        setButtonState((prev) => ({ ...prev, fontSize: value }))
                      }
                      max={24}
                      min={12}
                      step={1}
                      className='mt-2'
                    />
                  </div>

                  <div>
                    <Label>Font Weight</Label>
                    <Select
                      value={buttonState.fontWeight}
                      onValueChange={(value) =>
                        setButtonState((prev) => ({ ...prev, fontWeight: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(fontWeights).map((weight) => (
                          <SelectItem key={weight} value={weight}>
                            {weight.charAt(0).toUpperCase() + weight.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* Text修饰符 */}
                <TabsContent value='text' className='space-y-4'>
                  <div>
                    <Label htmlFor='text-content'>Content</Label>
                    <Input
                      id='text-content'
                      value={textState.content}
                      onChange={(e) =>
                        setTextState((prev) => ({ ...prev, content: e.target.value }))
                      }
                      className='mt-1'
                    />
                  </div>

                  <div>
                    <Label>Font Size: {textState.fontSize}px</Label>
                    <Slider
                      value={[textState.fontSize]}
                      onValueChange={([value]) =>
                        setTextState((prev) => ({ ...prev, fontSize: value }))
                      }
                      max={36}
                      min={12}
                      step={1}
                      className='mt-2'
                    />
                  </div>

                  <div>
                    <Label>Font Weight</Label>
                    <Select
                      value={textState.fontWeight}
                      onValueChange={(value) =>
                        setTextState((prev) => ({ ...prev, fontWeight: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(fontWeights).map((weight) => (
                          <SelectItem key={weight} value={weight}>
                            {weight.charAt(0).toUpperCase() + weight.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Color</Label>
                    <Select
                      value={textState.color}
                      onValueChange={(value) => setTextState((prev) => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(textColors).map((color) => (
                          <SelectItem key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Alignment</Label>
                    <Select
                      value={textState.alignment}
                      onValueChange={(value) =>
                        setTextState((prev) => ({ ...prev, alignment: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(alignments).map((align) => (
                          <SelectItem key={align} value={align}>
                            {align.charAt(0).toUpperCase() + align.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* VStack修饰符 */}
                <TabsContent value='stack' className='space-y-4'>
                  <div>
                    <Label>Spacing: {stackState.spacing}px</Label>
                    <Slider
                      value={[stackState.spacing]}
                      onValueChange={([value]) =>
                        setStackState((prev) => ({ ...prev, spacing: value }))
                      }
                      max={30}
                      min={0}
                      step={2}
                      className='mt-2'
                    />
                  </div>

                  <div>
                    <Label>Alignment</Label>
                    <Select
                      value={stackState.alignment}
                      onValueChange={(value) =>
                        setStackState((prev) => ({ ...prev, alignment: value }))
                      }
                    >
                      <SelectTrigger className='mt-1'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='center'>Center</SelectItem>
                        <SelectItem value='leading'>Leading</SelectItem>
                        <SelectItem value='trailing'>Trailing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Padding: {stackState.padding}px</Label>
                    <Slider
                      value={[stackState.padding]}
                      onValueChange={([value]) =>
                        setStackState((prev) => ({ ...prev, padding: value }))
                      }
                      max={50}
                      min={0}
                      step={5}
                      className='mt-2'
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 代码生成区域 */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>生成的SwiftUI代码</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='overflow-x-auto rounded-lg bg-gray-900 p-4 text-green-400 text-sm'>
              {`VStack(alignment: .${stackState.alignment}, spacing: ${stackState.spacing}) {
    Text("${textState.content}")
        .font(.system(size: ${textState.fontSize}, weight: .${textState.fontWeight}))
        .foregroundColor(.${textState.color})
        .multilineTextAlignment(.${textState.alignment})
    
    Button("${buttonState.text}") {
        // Action
    }
    .font(.system(size: ${buttonState.fontSize}, weight: .${buttonState.fontWeight}))
    .foregroundColor(.${buttonState.foregroundColor})
    .padding(${buttonState.padding})
    .background(Color.${buttonState.backgroundColor})
    .cornerRadius(${buttonState.cornerRadius})
}
.padding(${stackState.padding})`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SwiftUISimulator

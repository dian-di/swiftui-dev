import type { Color } from '@/lib/utils'
import type { ComponentIR } from '../const/common'
import componentRegistry from '../const/registry'

// biome-ignore lint/complexity/noStaticOnlyClass: <>
class SwiftUICodeGenerator {
  static generate(component: ComponentIR): string {
    const definition = componentRegistry[component.type]
    if (!definition) return ''

    let code = ''

    switch (component.type) {
      case 'Button':
        code = `Button("${component.properties.text}") {\n    // Action\n}`
        break
      case 'Text':
        code = `Text("${component.properties.content}")`
        break
      case 'VStack': {
        const childrenCode =
          component.children
            ?.map((child) =>
              SwiftUICodeGenerator.generate(child)
                .split('\n')
                .map((line) => `   ${line}`)
                .join('\n'),
            )
            .join('\n') || ''
        code = `VStack {\n${childrenCode}\n}`
        break
      }
      default:
        code = component.type
    }

    // 添加修饰符
    component.modifiers.forEach((modifier) => {
      switch (modifier.type) {
        case 'backgroundColor':
          code += `\n.background(${colorGene(modifier.value)})`
          break
        case 'foregroundColor':
          code += `\n.foregroundColor(${colorGene(modifier.value)})`
          break
        case 'cornerRadius':
          code += `\n.cornerRadius(${modifier.value})`
          break
        case 'padding':
          code += `\n.padding(${modifier.value})`
          break
        case 'fontSize':
          code += `\n.font(.system(size: ${modifier.value}))`
          break
        case 'fontWeight':
          code += `\n.fontWeight(.${modifier.value})`
          break
        case 'spacing':
          if (component.type === 'VStack') {
            code = code.replace('VStack {', `VStack(spacing: ${modifier.value}) {`)
          }
          break
      }
    })

    return code
  }
}

function colorGene(color: Color) {
  return `Color(red: ${color.r}, green: ${color.g}, blue: ${color.b})`
}

export default SwiftUICodeGenerator

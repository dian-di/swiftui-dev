import type { ComponentIR } from "../const/common"
import componentRegistry from "../const/registry"

// biome-ignore lint/complexity/noStaticOnlyClass: <>
export class IRRenderer {
  static render(component: ComponentIR): React.ReactNode {
    const definition = componentRegistry[component.type]
    if (!definition) {
      return <div>Unknown
      component.type
      </div>
    }

    if (definition.hasChildren && component.children) {
      const children = component.children.map((child) => (
        <div key={child.id}>{IRRenderer.render(child)}</div>
      ))
      return definition.render(component, children)
    }

    return definition.render(component)
  }
}

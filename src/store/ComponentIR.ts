import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { ComponentIR, ComponentType, ModifierIR } from '@/pages/v3/const/common'
import { defaultComponentIR, initComponentIR } from './util'

interface ComponentIRState {
  componentIR: ComponentIR
  selectedId: string | null
  reset: () => void
  selectComponentIR: (componentIRId: string) => void
  updateModifiers: (componentIRId: string, modifiers: ModifierIR[]) => void
  findComponentIR: (id: string) => ComponentIR | null
  updateComponentIR: (componentIRId: string, componentIR: Partial<ComponentIR>) => void
  addComponentIR: (parentId: string, type: ComponentType) => void
  removeComponentIR: (id: string) => void
}

export const useComponentIRStore = create<ComponentIRState>()(
  devtools(
    immer((set, get) => ({
      // 初始根节点
      componentIR: defaultComponentIR(),
      selectedId: null,

      // 重置状态
      reset: () =>
        set(
          (state) => {
            state.componentIR = defaultComponentIR()
            state.selectedId = null
          },
          false,
          'reset',
        ),

      // 选择组件
      selectComponentIR: (componentIRId: string) =>
        set(
          (state) => {
            state.selectedId = componentIRId
          },
          false,
          'selectComponentIR',
        ),

      // 递归查找组件 (不需要修改，因为是只读操作)
      findComponentIR: (id: string): ComponentIR | null => {
        const findInTree = (node: ComponentIR): ComponentIR | null => {
          if (node.id === id) return node
          if (node.children) {
            for (const child of node.children) {
              const found = findInTree(child)
              if (found) return found
            }
          }
          return null
        }
        return findInTree(get().componentIR)
      },

      // 更新组件修饰符
      updateModifiers: (componentIRId: string, modifiers: ModifierIR[]) => {
        const updateInTree = (node: ComponentIR): boolean => {
          if (node.id === componentIRId) {
            node.modifiers = modifiers
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (updateInTree(child)) return true
            }
          }
          return false
        }

        set(
          (state) => {
            updateInTree(state.componentIR)
          },
          false,
          'updateModifiers',
        )
      },

      // 更新组件
      updateComponentIR: (componentIRId: string, componentIR: Partial<ComponentIR>) => {
        const updateInTree = (node: ComponentIR): boolean => {
          if (node.id === componentIRId) {
            Object.assign(node, componentIR)
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (updateInTree(child)) return true
            }
          }
          return false
        }

        set(
          (state) => {
            updateInTree(state.componentIR)
          },
          false,
          'update',
        )
      },

      // 添加组件
      addComponentIR: (parentId: string, type: ComponentType) => {
        const newComponent: ComponentIR = initComponentIR(type)

        const addToTree = (node: ComponentIR): boolean => {
          if (node.id === parentId) {
            if (!node.children) {
              node.children = []
            }
            node.children.push(newComponent)
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (addToTree(child)) return true
            }
          }
          return false
        }

        set(
          (state) => {
            addToTree(state.componentIR)
          },
          false,
          'addComponent',
        )
      },

      // 移除组件
      removeComponentIR: (id: string) => {
        const removeFromTree = (node: ComponentIR): void => {
          if (node.children) {
            const index = node.children.findIndex((child) => child.id === id)
            if (index !== -1) {
              node.children.splice(index, 1)
            } else {
              // 递归移除子节点中的目标组件
              node.children.forEach((child) => removeFromTree(child))
            }
          }
        }

        set(
          (state) => {
            removeFromTree(state.componentIR)
            if (state.selectedId === id) {
              state.selectedId = null
            }
          },
          false,
          'removeComponentIR',
        )
      },
    })),
  ),
)

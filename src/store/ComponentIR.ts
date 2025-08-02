import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { ComponentIR, ComponentType, ModifierIR } from '@/pages/v3/const/common'
import { defaultComponentIR, initComponentIR } from './util'

interface ComponentIRState {
  componentIR: ComponentIR
  reset: () => void
  updateModifiers: (componentIRId: string, modifiers: ModifierIR[]) => void
  find: (id: string) => ComponentIR | null
  update: (componentIRId: string, componentIR: Partial<ComponentIR>) => void
  add: (parentId: string, type: ComponentType) => void
  remove: (id: string) => void
}

export const useComponentIRStore = create<ComponentIRState>()(
  devtools(
    immer((set, get) => ({
      // 初始根节点
      componentIR: defaultComponentIR(),

      // 重置状态
      reset: () =>
        set(
          (state) => {
            state.componentIR = defaultComponentIR()
          },
          false,
          'reset',
        ),

      // 递归查找组件 (不需要修改，因为是只读操作)
      find: (id: string): ComponentIR | null => {
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
      update: (componentIRId: string, componentIR: Partial<ComponentIR>) => {
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
      add: (parentId: string, type: ComponentType) => {
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
      remove: (id: string) => {
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
          },
          false,
          'remove',
        )
        // 通知选中状态 store 清理被删除的选中项
        const { selectedId, clearIfDeleted } = useSelectedComponentIRStore.getState()
        if (selectedId === id) {
          clearIfDeleted(id)
        }
      },
    })),
  ),
)

// 选中组件管理 store
interface SelectedComponentIRState {
  selectedId: string | null
  select: (componentIRId: string | null) => void
  clearSelection: () => void
  clearIfDeleted: (deletedId: string) => void
  // 派生状态和便捷方法
  getSelectedComponentIR: () => ComponentIR | null
  update: (componentIR: Partial<ComponentIR>) => void
  updateModifiers: (modifiers: ModifierIR[]) => void
}

export const useSelectedComponentIRStore = create<SelectedComponentIRState>()(
  devtools(
    (set, get) => ({
      selectedId: null,

      // 选择组件
      select: (componentIRId: string | null) => set({
        selectedId: componentIRId
      }, false, 'select'),

      // 清空选择
      clearSelection: () => set({
        selectedId: null
      }, false, 'clearSelection'),

      // 如果选中的组件被删除，则清空选择
      clearIfDeleted: (deletedId: string) => set((state) => ({
        selectedId: state.selectedId === deletedId ? null : state.selectedId
      }), false, 'clearIfDeleted'),

      // 派生状态：当前选中的组件
      getSelectedComponentIR: () => {
        const { selectedId } = get()
        if (!selectedId) return null
        return useComponentIRStore.getState().find(selectedId)
      },

      // 便捷方法：更新当前选中的组件
      update: (componentIR: Partial<ComponentIR>) => {
        const { selectedId } = get()
        if (selectedId) {
          useComponentIRStore.getState().update(selectedId, componentIR)
        }
      },

      // 便捷方法：更新当前选中组件的修饰符
      updateModifiers: (modifiers: ModifierIR[]) => {
        const { selectedId } = get()
        if (selectedId) {
          useComponentIRStore.getState().updateModifiers(selectedId, modifiers)
        }
      }
    }),
    { name: 'selected-component-ir-store' }
  )
)

export const useSelectedComponentIR = () => {
  const { selectedId, getSelectedComponentIR } = useSelectedComponentIRStore()
  return selectedId ? getSelectedComponentIR() : null
}
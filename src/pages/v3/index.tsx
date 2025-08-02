import { ComponentType, Platform } from './const/common'
import componentRegistry from './const/registry'
import SwiftUITeachingPlatform from './views/swiftui'

// 为未实现的组件添加默认定义
Object.values(ComponentType).forEach((type) => {
  if (
    ![
      ComponentType.Button,
      ComponentType.Text,
      ComponentType.VStack,
      ComponentType.HStack,
      ComponentType.TextField,
      ComponentType.Image,
    ].includes(type)
  ) {
    componentRegistry[type] = {
      type,
      name: type,
      defaultProps: {},
      supportedPlatforms: [Platform.SwiftUI],
      availableModifiers: [],
      render: () => <div>Component {type} not implemented</div>,
    }
  }
})

export default SwiftUITeachingPlatform


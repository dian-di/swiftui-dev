export enum Platform {
  SwiftUI = 'SwiftUI',
  JetpackCompose = 'JetpackCompose',
  Flutter = 'Flutter',
  ReactNative = 'ReactNative',
  Web = 'Web',
}

export enum ComponentType {
  // 基础组件 (所有平台通用)
  Button = 'Button',
  Text = 'Text',
  Image = 'Image',
  TextField = 'TextField',
  Slider = 'Slider',
  Toggle = 'Toggle',
  ProgressBar = 'ProgressBar',

  // 布局组件
  VStack = 'VStack',
  HStack = 'HStack',
  ZStack = 'ZStack',
  LazyVGrid = 'LazyVGrid',
  LazyHGrid = 'LazyHGrid',
  ScrollView = 'ScrollView',
  List = 'List',

  // 容器组件
  NavigationView = 'NavigationView',
  TabView = 'TabView',
  Sheet = 'Sheet',
  Alert = 'Alert',
  ActionSheet = 'ActionSheet',

  // 绘图组件
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  RoundedRectangle = 'RoundedRectangle',
  Capsule = 'Capsule',
  Ellipse = 'Ellipse',

  // SwiftUI 特有
  Form = 'Form',
  Section = 'Section',
  Picker = 'Picker',
  Stepper = 'Stepper',
  DatePicker = 'DatePicker',
  ColorPicker = 'ColorPicker',

  // Jetpack Compose 特有
  LazyColumn = 'LazyColumn',
  LazyRow = 'LazyRow',
  Box = 'Box',
  Card = 'Card',
  Scaffold = 'Scaffold',
  TopAppBar = 'TopAppBar',
  BottomNavigation = 'BottomNavigation',
  FloatingActionButton = 'FloatingActionButton',

  // Flutter 特有
  Container = 'Container',
  Padding = 'Padding',
  Center = 'Center',
  Align = 'Align',
  Expanded = 'Expanded',
  Flexible = 'Flexible',
  Wrap = 'Wrap',
  ListView = 'ListView',
  GridView = 'GridView',
  AppBar = 'AppBar',
  Drawer = 'Drawer',
  BottomNavigationBar = 'BottomNavigationBar',
  FloatingActionButton_Flutter = 'FloatingActionButton_Flutter',

  // React Native 特有
  View = 'View',
  SafeAreaView = 'SafeAreaView',
  FlatList = 'FlatList',
  SectionList = 'SectionList',
  Modal = 'Modal',
  StatusBar = 'StatusBar',
}

export enum ModifierType {
  // 颜色相关
  backgroundColor = 'backgroundColor',
  foregroundColor = 'foregroundColor',
  accentColor = 'accentColor',
  tintColor = 'tintColor',

  // 尺寸相关
  frame = 'frame',
  width = 'width',
  height = 'height',
  aspectRatio = 'aspectRatio',
  scaleEffect = 'scaleEffect',

  // 间距相关
  padding = 'padding',
  margin = 'margin',
  spacing = 'spacing',

  // 字体相关
  font = 'font',
  fontSize = 'fontSize',
  fontWeight = 'fontWeight',
  fontFamily = 'fontFamily',
  fontStyle = 'fontStyle',
  textAlign = 'textAlign',
  lineHeight = 'lineHeight',
  lineLimit = 'lineLimit',
  textDecoration = 'textDecoration',

  // 形状相关
  cornerRadius = 'cornerRadius',
  clipShape = 'clipShape',
  border = 'border',
  borderWidth = 'borderWidth',
  borderColor = 'borderColor',
  shadow = 'shadow',

  // 布局相关
  alignment = 'alignment',
  layoutPriority = 'layoutPriority',
  zIndex = 'zIndex',
  offset = 'offset',
  rotation = 'rotation',

  // 交互相关
  disabled = 'disabled',
  opacity = 'opacity',
  animation = 'animation',
  transition = 'transition',
  gesture = 'gesture',
  onTap = 'onTap',
  onLongPress = 'onLongPress',

  // SwiftUI 特有
  navigationTitle = 'navigationTitle',
  navigationBarTitleDisplayMode = 'navigationBarTitleDisplayMode',
  toolbar = 'toolbar',
  tabItem = 'tabItem',
  sheet = 'sheet',
  alert = 'alert',
  confirmationDialog = 'confirmationDialog',

  // Jetpack Compose 特有
  fillMaxSize = 'fillMaxSize',
  fillMaxWidth = 'fillMaxWidth',
  fillMaxHeight = 'fillMaxHeight',
  wrapContentSize = 'wrapContentSize',
  clickable = 'clickable',
  scrollable = 'scrollable',
  verticalScroll = 'verticalScroll',
  horizontalScroll = 'horizontalScroll',

  // Flutter 特有
  alignment_flutter = 'alignment_flutter',
  decoration = 'decoration',
  constraints = 'constraints',
  transform = 'transform',
  clipBehavior = 'clipBehavior',

  // React Native 特有
  flex = 'flex',
  flexDirection = 'flexDirection',
  justifyContent = 'justifyContent',
  alignItems = 'alignItems',
  position = 'position',
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

// 平台特定的组件映射
export const PlatformComponentMapping: Record<Platform, Partial<Record<ComponentType, string>>> = {
  [Platform.SwiftUI]: {
    [ComponentType.Button]: 'Button',
    [ComponentType.Text]: 'Text',
    [ComponentType.VStack]: 'VStack',
    [ComponentType.HStack]: 'HStack',
    [ComponentType.ZStack]: 'ZStack',
    [ComponentType.TextField]: 'TextField',
    [ComponentType.Image]: 'Image',
    [ComponentType.ScrollView]: 'ScrollView',
    [ComponentType.List]: 'List',
    [ComponentType.NavigationView]: 'NavigationView',
    [ComponentType.TabView]: 'TabView',
  },
  [Platform.JetpackCompose]: {
    [ComponentType.Button]: 'Button',
    [ComponentType.Text]: 'Text',
    [ComponentType.VStack]: 'Column',
    [ComponentType.HStack]: 'Row',
    [ComponentType.ZStack]: 'Box',
    [ComponentType.TextField]: 'TextField',
    [ComponentType.Image]: 'Image',
    [ComponentType.ScrollView]: 'ScrollableColumn',
    [ComponentType.LazyColumn]: 'LazyColumn',
    [ComponentType.LazyRow]: 'LazyRow',
    [ComponentType.Card]: 'Card',
    [ComponentType.Scaffold]: 'Scaffold',
  },
  [Platform.Flutter]: {
    [ComponentType.Button]: 'ElevatedButton',
    [ComponentType.Text]: 'Text',
    [ComponentType.VStack]: 'Column',
    [ComponentType.HStack]: 'Row',
    [ComponentType.ZStack]: 'Stack',
    [ComponentType.TextField]: 'TextField',
    [ComponentType.Image]: 'Image',
    [ComponentType.ScrollView]: 'SingleChildScrollView',
    [ComponentType.Container]: 'Container',
    [ComponentType.Padding]: 'Padding',
    [ComponentType.Center]: 'Center',
  },
  [Platform.ReactNative]: {
    [ComponentType.Button]: 'Button',
    [ComponentType.Text]: 'Text',
    [ComponentType.VStack]: 'View',
    [ComponentType.HStack]: 'View',
    [ComponentType.TextField]: 'TextInput',
    [ComponentType.Image]: 'Image',
    [ComponentType.ScrollView]: 'ScrollView',
    [ComponentType.View]: 'View',
    [ComponentType.FlatList]: 'FlatList',
  },
  [Platform.Web]: {
    [ComponentType.Button]: 'button',
    [ComponentType.Text]: 'p',
    [ComponentType.VStack]: 'div',
    [ComponentType.HStack]: 'div',
    [ComponentType.TextField]: 'input',
    [ComponentType.Image]: 'img',
    [ComponentType.ScrollView]: 'div',
  },
}

// 平台特定的修饰符映射
export const PlatformModifierMapping: Record<Platform, Partial<Record<ModifierType, string>>> = {
  [Platform.SwiftUI]: {
    [ModifierType.backgroundColor]: '.background',
    [ModifierType.foregroundColor]: '.foregroundColor',
    [ModifierType.cornerRadius]: '.cornerRadius',
    [ModifierType.padding]: '.padding',
    [ModifierType.fontSize]: '.font(.system(size:))',
    [ModifierType.fontWeight]: '.fontWeight',
    [ModifierType.frame]: '.frame',
  },
  [Platform.JetpackCompose]: {
    [ModifierType.backgroundColor]: 'Modifier.background',
    [ModifierType.padding]: 'Modifier.padding',
    [ModifierType.fillMaxSize]: 'Modifier.fillMaxSize',
    [ModifierType.fillMaxWidth]: 'Modifier.fillMaxWidth',
    [ModifierType.clickable]: 'Modifier.clickable',
  },
  [Platform.Flutter]: {
    [ModifierType.backgroundColor]: 'color',
    [ModifierType.padding]: 'padding',
    [ModifierType.alignment_flutter]: 'alignment',
    [ModifierType.decoration]: 'decoration',
  },
  [Platform.ReactNative]: {
    [ModifierType.backgroundColor]: 'backgroundColor',
    [ModifierType.padding]: 'padding',
    [ModifierType.flex]: 'flex',
    [ModifierType.flexDirection]: 'flexDirection',
  },
  [Platform.Web]: {
    [ModifierType.backgroundColor]: 'background-color',
    [ModifierType.padding]: 'padding',
    [ModifierType.fontSize]: 'font-size',
    [ModifierType.fontWeight]: 'font-weight',
  },
}

// ==================== 中间代码表示 (IR) ====================
export interface ComponentIR {
  id: string
  type: ComponentType
  properties: Record<string, any>
  modifiers: ModifierIR[]
  children?: ComponentIR[]
  platform?: Platform // 可选的平台特定标记
}

export interface ModifierIR {
  type: ModifierType
  value: any
  platform?: Platform // 平台特定的修饰符
}

// ==================== 组件类型定义 ====================
export interface ComponentDefinition {
  type: ComponentType
  name: string
  defaultProps: Record<string, any>
  availableModifiers: ModifierDefinition[]
  hasChildren?: boolean
  supportedPlatforms: Platform[]
  render: (component: ComponentIR, children?: React.ReactNode) => React.ReactNode
}

export interface ModifierDefinition {
  type: ModifierType
  name: string
  valueType: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'object'
  defaultValue: any
  options?: string[]
  min?: number
  max?: number
  step?: number
  supportedPlatforms?: Platform[]
}
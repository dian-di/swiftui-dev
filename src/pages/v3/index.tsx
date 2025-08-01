import { Plus, Trash2 } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

// ==================== 平台和组件类型枚举 ====================
enum Platform {
  SwiftUI = 'SwiftUI',
  JetpackCompose = 'JetpackCompose',
  Flutter = 'Flutter',
  ReactNative = 'ReactNative',
  Web = 'Web',
}

enum ComponentType {
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

enum ModifierType {
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
const PlatformComponentMapping: Record<Platform, Partial<Record<ComponentType, string>>> = {
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
const PlatformModifierMapping: Record<Platform, Partial<Record<ModifierType, string>>> = {
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
interface ComponentIR {
  id: string
  type: ComponentType
  properties: Record<string, any>
  modifiers: ModifierIR[]
  children?: ComponentIR[]
  platform?: Platform // 可选的平台特定标记
}

interface ModifierIR {
  type: ModifierType
  value: any
  platform?: Platform // 平台特定的修饰符
}

// ==================== 组件类型定义 ====================
interface ComponentDefinition {
  type: ComponentType
  name: string
  defaultProps: Record<string, any>
  availableModifiers: ModifierDefinition[]
  hasChildren?: boolean
  supportedPlatforms: Platform[]
  render: (component: ComponentIR, children?: React.ReactNode) => React.ReactNode
}

interface ModifierDefinition {
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

// ==================== 组件注册表 ====================
const componentRegistry: Record<ComponentType, ComponentDefinition> = {
  [ComponentType.Button]: {
    type: ComponentType.Button,
    name: 'Button',
    defaultProps: { text: 'Button' },
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.backgroundColor,
        name: 'Background Color',
        valueType: 'color',
        defaultValue: '#007AFF',
      },
      {
        type: ModifierType.foregroundColor,
        name: 'Text Color',
        valueType: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        type: ModifierType.cornerRadius,
        name: 'Corner Radius',
        valueType: 'number',
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.padding,
        name: 'Padding',
        valueType: 'number',
        defaultValue: 12,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.fontSize,
        name: 'Font Size',
        valueType: 'number',
        defaultValue: 16,
        min: 8,
        max: 48,
        step: 1,
      },
      {
        type: ModifierType.fontWeight,
        name: 'Font Weight',
        valueType: 'select',
        defaultValue: 'normal',
        options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      },
      { type: ModifierType.disabled, name: 'Disabled', valueType: 'boolean', defaultValue: false },
      {
        type: ModifierType.opacity,
        name: 'Opacity',
        valueType: 'number',
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
      },
    ],
    render: (component) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      return (
        <button
          className='transition-all duration-200 hover:opacity-80'
          disabled={modifiers[ModifierType.disabled]}
          style={{
            backgroundColor: modifiers[ModifierType.backgroundColor] || '#007AFF',
            color: modifiers[ModifierType.foregroundColor] || '#FFFFFF',
            borderRadius: `${modifiers[ModifierType.cornerRadius] || 8}px`,
            padding: `${modifiers[ModifierType.padding] || 12}px ${(modifiers[ModifierType.padding] || 12) * 1.5}px`,
            fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
            fontWeight: modifiers[ModifierType.fontWeight] || 'normal',
            opacity: modifiers[ModifierType.opacity] || 1,
            border: 'none',
            cursor: modifiers[ModifierType.disabled] ? 'not-allowed' : 'pointer',
          }}
        >
          {component.properties.text}
        </button>
      )
    },
  },
  [ComponentType.Text]: {
    type: ComponentType.Text,
    name: 'Text',
    defaultProps: { content: 'Hello, World!' },
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.foregroundColor,
        name: 'Text Color',
        valueType: 'color',
        defaultValue: '#000000',
      },
      {
        type: ModifierType.fontSize,
        name: 'Font Size',
        valueType: 'number',
        defaultValue: 16,
        min: 8,
        max: 48,
        step: 1,
      },
      {
        type: ModifierType.fontWeight,
        name: 'Font Weight',
        valueType: 'select',
        defaultValue: 'normal',
        options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      },
      {
        type: ModifierType.fontFamily,
        name: 'Font Family',
        valueType: 'select',
        defaultValue: 'system',
        options: ['system', 'serif', 'monospace', 'cursive'],
      },
      {
        type: ModifierType.textAlign,
        name: 'Text Align',
        valueType: 'select',
        defaultValue: 'left',
        options: ['left', 'center', 'right', 'justify'],
      },
      {
        type: ModifierType.lineHeight,
        name: 'Line Height',
        valueType: 'number',
        defaultValue: 1.5,
        min: 1,
        max: 3,
        step: 0.1,
      },
      {
        type: ModifierType.lineLimit,
        name: 'Line Limit',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 10,
        step: 1,
      },
      {
        type: ModifierType.textDecoration,
        name: 'Text Decoration',
        valueType: 'select',
        defaultValue: 'none',
        options: ['none', 'underline', 'line-through'],
      },
    ],
    render: (component) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      return (
        <p
          style={{
            color: modifiers[ModifierType.foregroundColor] || '#000000',
            fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
            fontWeight: modifiers[ModifierType.fontWeight] || 'normal',
            fontFamily: modifiers[ModifierType.fontFamily] || 'system-ui',
            textAlign: modifiers[ModifierType.textAlign] || 'left',
            lineHeight: modifiers[ModifierType.lineHeight] || 1.5,
            textDecoration: modifiers[ModifierType.textDecoration] || 'none',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: modifiers[ModifierType.lineLimit] || 'none',
            WebkitBoxOrient: 'vertical',
            overflow: modifiers[ModifierType.lineLimit] > 0 ? 'hidden' : 'visible',
          }}
        >
          {component.properties.content}
        </p>
      )
    },
  },
  [ComponentType.VStack]: {
    type: ComponentType.VStack,
    name: 'VStack',
    defaultProps: {},
    hasChildren: true,
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.spacing,
        name: 'Spacing',
        valueType: 'number',
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.padding,
        name: 'Padding',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.backgroundColor,
        name: 'Background Color',
        valueType: 'color',
        defaultValue: 'transparent',
      },
      {
        type: ModifierType.cornerRadius,
        name: 'Corner Radius',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.alignment,
        name: 'Alignment',
        valueType: 'select',
        defaultValue: 'center',
        options: ['leading', 'center', 'trailing'],
      },
      {
        type: ModifierType.frame,
        name: 'Frame',
        valueType: 'object',
        defaultValue: { width: 'auto', height: 'auto' },
      },
    ],
    render: (component, children) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      const alignmentMap = { leading: 'flex-start', center: 'center', trailing: 'flex-end' }
      return (
        <div
          className='flex flex-col'
          style={{
            gap: `${modifiers[ModifierType.spacing] || 8}px`,
            padding: `${modifiers[ModifierType.padding] || 0}px`,
            backgroundColor:
              modifiers[ModifierType.backgroundColor] === 'transparent'
                ? 'transparent'
                : modifiers[ModifierType.backgroundColor],
            borderRadius: `${modifiers[ModifierType.cornerRadius] || 0}px`,
            alignItems: alignmentMap[modifiers[ModifierType.alignment]] || 'center',
          }}
        >
          {children}
        </div>
      )
    },
  },
  [ComponentType.HStack]: {
    type: ComponentType.HStack,
    name: 'HStack',
    defaultProps: {},
    hasChildren: true,
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.spacing,
        name: 'Spacing',
        valueType: 'number',
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.padding,
        name: 'Padding',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.backgroundColor,
        name: 'Background Color',
        valueType: 'color',
        defaultValue: 'transparent',
      },
      {
        type: ModifierType.cornerRadius,
        name: 'Corner Radius',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.alignment,
        name: 'Alignment',
        valueType: 'select',
        defaultValue: 'center',
        options: ['top', 'center', 'bottom'],
      },
    ],
    render: (component, children) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      const alignmentMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }
      return (
        <div
          className='flex flex-row'
          style={{
            gap: `${modifiers[ModifierType.spacing] || 8}px`,
            padding: `${modifiers[ModifierType.padding] || 0}px`,
            backgroundColor:
              modifiers[ModifierType.backgroundColor] === 'transparent'
                ? 'transparent'
                : modifiers[ModifierType.backgroundColor],
            borderRadius: `${modifiers[ModifierType.cornerRadius] || 0}px`,
            alignItems: alignmentMap[modifiers[ModifierType.alignment]] || 'center',
          }}
        >
          {children}
        </div>
      )
    },
  },
  [ComponentType.TextField]: {
    type: ComponentType.TextField,
    name: 'TextField',
    defaultProps: { placeholder: 'Enter text...' },
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.backgroundColor,
        name: 'Background Color',
        valueType: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        type: ModifierType.foregroundColor,
        name: 'Text Color',
        valueType: 'color',
        defaultValue: '#000000',
      },
      {
        type: ModifierType.cornerRadius,
        name: 'Corner Radius',
        valueType: 'number',
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.padding,
        name: 'Padding',
        valueType: 'number',
        defaultValue: 12,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.fontSize,
        name: 'Font Size',
        valueType: 'number',
        defaultValue: 16,
        min: 8,
        max: 48,
        step: 1,
      },
      {
        type: ModifierType.borderWidth,
        name: 'Border Width',
        valueType: 'number',
        defaultValue: 1,
        min: 0,
        max: 10,
        step: 1,
      },
      {
        type: ModifierType.borderColor,
        name: 'Border Color',
        valueType: 'color',
        defaultValue: '#CCCCCC',
      },
    ],
    render: (component) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      return (
        <input
          type='text'
          placeholder={component.properties.placeholder}
          className='transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          style={{
            backgroundColor: modifiers[ModifierType.backgroundColor] || '#FFFFFF',
            color: modifiers[ModifierType.foregroundColor] || '#000000',
            borderRadius: `${modifiers[ModifierType.cornerRadius] || 8}px`,
            padding: `${modifiers[ModifierType.padding] || 12}px`,
            fontSize: `${modifiers[ModifierType.fontSize] || 16}px`,
            borderWidth: `${modifiers[ModifierType.borderWidth] || 1}px`,
            borderColor: modifiers[ModifierType.borderColor] || '#CCCCCC',
            borderStyle: 'solid',
            width: '100%',
          }}
        />
      )
    },
  },
  [ComponentType.Image]: {
    type: ComponentType.Image,
    name: 'Image',
    defaultProps: { src: 'https://via.placeholder.com/150', alt: 'Placeholder' },
    supportedPlatforms: [
      Platform.SwiftUI,
      Platform.JetpackCompose,
      Platform.Flutter,
      Platform.ReactNative,
      Platform.Web,
    ],
    availableModifiers: [
      {
        type: ModifierType.cornerRadius,
        name: 'Corner Radius',
        valueType: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        type: ModifierType.aspectRatio,
        name: 'Aspect Ratio',
        valueType: 'select',
        defaultValue: 'original',
        options: ['original', '1:1', '4:3', '16:9', '3:4', '9:16'],
      },
      {
        type: ModifierType.scaleEffect,
        name: 'Scale',
        valueType: 'number',
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
      },
      {
        type: ModifierType.opacity,
        name: 'Opacity',
        valueType: 'number',
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
      },
      { type: ModifierType.shadow, name: 'Shadow', valueType: 'boolean', defaultValue: false },
    ],
    render: (component) => {
      const modifiers = component.modifiers.reduce(
        (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
        {},
      )
      const aspectRatioMap = {
        original: 'auto',
        '1:1': '1 / 1',
        '4:3': '4 / 3',
        '16:9': '16 / 9',
        '3:4': '3 / 4',
        '9:16': '9 / 16',
      }
      return (
        <img
          src={component.properties.src}
          alt={component.properties.alt}
          style={{
            borderRadius: `${modifiers[ModifierType.cornerRadius] || 0}px`,
            aspectRatio: aspectRatioMap[modifiers[ModifierType.aspectRatio]] || 'auto',
            transform: `scale(${modifiers[ModifierType.scaleEffect] || 1})`,
            opacity: modifiers[ModifierType.opacity] || 1,
            boxShadow: modifiers[ModifierType.shadow] ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
            objectFit: 'cover',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )
    },
  },
}

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
{
  type: 'fontWeight', name
  : 'Font Weight', valueType: 'select', defaultValue: 'normal', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']
}
,
    ],
    render: (component) =>
{
  const modifiers = component.modifiers.reduce(
    (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
    {},
  )
  return (
        <button
          className="transition-all duration-200 hover:opacity-80"
          style={{
            backgroundColor: modifiers.backgroundColor || '#007AFF',
            color: modifiers.foregroundColor || '#FFFFFF',
            borderRadius: `${modifiers.cornerRadius || 8}px`,
            padding: `${modifiers.padding || 12}px ${(modifiers.padding || 12) * 1.5}px`,
            fontSize: `${modifiers.fontSize || 16}px`,
            fontWeight: modifiers.fontWeight || 'normal',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {component.properties.text}
        </button>
      );
}
},
  Text:
{
  type: 'Text', name
  : 'Text',
    defaultProps:
  content: 'Hello, World!'
  ,
    availableModifiers: [
  type: 'foregroundColor', name
  : 'Text Color', valueType: 'color', defaultValue: '#000000'
  ,
  type: 'fontSize', name
  : 'Font Size', valueType: 'number', defaultValue: 16, min: 8, max: 48, step: 1
  ,
  type: 'fontWeight', name
  : 'Font Weight', valueType: 'select', defaultValue: 'normal', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  ,
  type: 'textAlign', name
  : 'Text Align', valueType: 'select', defaultValue: 'left', options: ['left', 'center', 'right']
  ,
  type: 'lineHeight', name
  : 'Line Height', valueType: 'number', defaultValue: 1.5, min: 1, max: 3, step: 0.1
  ,
    ],
    render: (component) =>
  {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {},
    )
    return (
        <p
          style={{
            color: modifiers.foregroundColor || '#000000',
            fontSize: `${modifiers.fontSize || 16}px`,
            fontWeight: modifiers.fontWeight || 'normal',
            textAlign: modifiers.textAlign || 'left',
            lineHeight: modifiers.lineHeight || 1.5,
            margin: 0,
          }}
        >
          {component.properties.content}
        </p>
      );
  }
}
,
  VStack:
{
  type: 'VStack', name
  : 'VStack',
    defaultProps:
  ,
    hasChildren: true,
    availableModifiers: [
  type: 'spacing', name
  : 'Spacing', valueType: 'number', defaultValue: 8, min: 0, max: 50, step: 1
  ,
  type: 'padding', name
  : 'Padding', valueType: 'number', defaultValue: 0, min: 0, max: 50, step: 1
  ,
  type: 'backgroundColor', name
  : 'Background Color', valueType: 'color', defaultValue: 'transparent'
  ,
  type: 'cornerRadius', name
  : 'Corner Radius', valueType: 'number', defaultValue: 0, min: 0, max: 50, step: 1
  ,
    ],
    render: (component, children) =>
  {
    const modifiers = component.modifiers.reduce(
      (acc, mod) => ({ ...acc, [mod.type]: mod.value }),
      {},
    )
    return (
        <div
          className="flex flex-col"
          style={{
            gap: `${modifiers.spacing || 8}px`,
            padding: `${modifiers.padding || 0}px`,
            backgroundColor: modifiers.backgroundColor === 'transparent' ? 'transparent' : modifiers.backgroundColor,
            borderRadius: `${modifiers.cornerRadius || 0}px`,
          }}
        >
          {children}
        </div>
      );
  }
}
}

// ==================== IR 解析器 ====================
class IRRenderer {
  static render(component: ComponentIR): React.ReactNode {
    const definition = componentRegistry[component.type]
    if (!definition) {
      return <div>Unknown component: {component.type}</div>
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

// ==================== 代码生成器 ====================
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
                .map((line) => '    ' + line)
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
          code += `\n.background(Color(${modifier.value}))`
          break
        case 'foregroundColor':
          code += `\n.foregroundColor(Color(${modifier.value}))`
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

// ==================== 主组件 ====================
export default function SwiftUITeachingPlatform() {
  const [components, setComponents] = useState<ComponentIR[]>([
    {
      id: 'root',
      type: 'VStack',
      properties: {},
      modifiers: [
        { type: 'spacing', value: 16 },
        { type: 'padding', value: 20 },
      ],
      children: [
        {
          id: '1',
          type: 'Text',
          properties: { content: 'Welcome to SwiftUI' },
          modifiers: [
            { type: 'fontSize', value: 24 },
            { type: 'fontWeight', value: 'bold' },
          ],
        },
        {
          id: '2',
          type: 'Button',
          properties: { text: 'Get Started' },
          modifiers: [
            { type: 'backgroundColor', value: '#007AFF' },
            { type: 'cornerRadius', value: 12 },
          ],
        },
      ],
    },
  ])

  const [selectedComponent, setSelectedComponent] = useState<ComponentIR | null>(null)

  // 查找组件
  const findComponent = useCallback((id: string, components: ComponentIR[]): ComponentIR | null => {
    for (const component of components) {
      if (component.id === id) return component
      if (component.children) {
        const found = findComponent(id, component.children)
        if (found) return found
      }
    }
    return null
  }, [])

  // 更新组件
  const updateComponent = useCallback((id: string, updates: Partial<ComponentIR>) => {
    setComponents((prev) => {
      const updateInTree = (components: ComponentIR[]): ComponentIR[] => {
        return components.map((component) => {
          if (component.id === id) {
            return { ...component, ...updates }
          }
          if (component.children) {
            return { ...component, children: updateInTree(component.children) }
          }
          return component
        })
      }
      return updateInTree(prev)
    })
  }, [])

  // 添加组件
  const addComponent = useCallback((parentId: string, type: string) => {
    const definition = componentRegistry[type]
    if (!definition) return

    const newComponent: ComponentIR = {
      id: Date.now().toString(),
      type,
      properties: { ...definition.defaultProps },
      modifiers: definition.availableModifiers.map((mod) => ({
        type: mod.type,
        value: mod.defaultValue,
      })),
    }

    setComponents((prev) => {
      const addToTree = (components: ComponentIR[]): ComponentIR[] => {
        return components.map((component) => {
          if (component.id === parentId) {
            return {
              ...component,
              children: [...(component.children || []), newComponent],
            }
          }
          if (component.children) {
            return { ...component, children: addToTree(component.children) }
          }
          return component
        })
      }
      return addToTree(prev)
    })
  }, [])

  // 删除组件
  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => {
      const deleteFromTree = (components: ComponentIR[]): ComponentIR[] => {
        return components
          .filter((component) => component.id !== id)
          .map((component) => {
            if (component.children) {
              return { ...component, children: deleteFromTree(component.children) }
            }
            return component
          })
      }
      return deleteFromTree(prev)
    })
    setSelectedComponent(null)
  }, [])

  // 生成SwiftUI代码
  const generatedCode = useMemo(() => {
    if (components.length === 0) return ''
    return SwiftUICodeGenerator.generate(components[0])
  }, [components])

  // 渲染组件树
  const renderComponentTree = (component: ComponentIR, depth = 0) => (
    <div key={component.id} className='ml-4'>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-2 ${
          selectedComponent?.id === component.id ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        onClick={() => setSelectedComponent(component)}
      >
        <span className='font-medium text-sm'>{component.type}</span>
        {component.id !== 'root' && (
          <Button
            size='sm'
            variant='ghost'
            className='h-6 w-6 p-0'
            onClick={(e) => {
              e.stopPropagation()
              deleteComponent(component.id)
            }}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        )}
      </div>
      {component.children?.map((child) => renderComponentTree(child, depth + 1))}
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 font-bold text-3xl text-gray-900'>SwiftUI Teaching Platform</h1>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* 组件树 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Component Tree
                <Select onValueChange={(type) => addComponent('root', type)}>
                  <SelectTrigger className='w-32'>
                    <Plus className='mr-2 h-4 w-4' />
                    <SelectValue placeholder='Add' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(componentRegistry).map((def) => (
                      <SelectItem key={def.type} value={def.type}>
                        {def.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {components.map((component) => renderComponentTree(component))}
            </CardContent>
          </Card>

          {/* 预览区域 */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='min-h-[400px] rounded-lg border bg-white p-6'>
                {components.map((component) => (
                  <div key={component.id}>{IRRenderer.render(component)}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 属性编辑器 */}
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedComponent ? (
                <div className='space-y-4'>
                  <h3 className='font-medium'>{selectedComponent.type}</h3>

                  {/* 编辑基础属性 */}
                  {Object.entries(selectedComponent.properties).map(([key, value]) => (
                    <div key={key}>
                      <label className='font-medium text-sm'>{key}</label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          updateComponent(selectedComponent.id, {
                            properties: { ...selectedComponent.properties, [key]: e.target.value },
                          })
                        }
                      />
                    </div>
                  ))}

                  {/* 编辑修饰符 */}
                  {componentRegistry[selectedComponent.type]?.availableModifiers.map(
                    (modifierDef) => {
                      const currentModifier = selectedComponent.modifiers.find(
                        (m) => m.type === modifierDef.type,
                      )
                      const currentValue = currentModifier?.value ?? modifierDef.defaultValue

                      return (
                        <div key={modifierDef.type}>
                          <label className='font-medium text-sm'>{modifierDef.name}</label>
                          {modifierDef.valueType === 'color' ? (
                            <Input
                              type='color'
                              value={currentValue}
                              onChange={(e) => {
                                const newModifiers = selectedComponent.modifiers.filter(
                                  (m) => m.type !== modifierDef.type,
                                )
                                newModifiers.push({ type: modifierDef.type, value: e.target.value })
                                updateComponent(selectedComponent.id, { modifiers: newModifiers })
                              }}
                            />
                          ) : modifierDef.valueType === 'number' ? (
                            <div className='space-y-2'>
                              <Slider
                                value={[currentValue]}
                                onValueChange={([value]) => {
                                  const newModifiers = selectedComponent.modifiers.filter(
                                    (m) => m.type !== modifierDef.type,
                                  )
                                  newModifiers.push({ type: modifierDef.type, value })
                                  updateComponent(selectedComponent.id, { modifiers: newModifiers })
                                }}
                                min={modifierDef.min || 0}
                                max={modifierDef.max || 100}
                                step={modifierDef.step || 1}
                              />
                              <span className='text-gray-500 text-sm'>{currentValue}</span>
                            </div>
                          ) : modifierDef.valueType === 'select' ? (
                            <Select
                              value={currentValue}
                              onValueChange={(value) => {
                                const newModifiers = selectedComponent.modifiers.filter(
                                  (m) => m.type !== modifierDef.type,
                                )
                                newModifiers.push({ type: modifierDef.type, value })
                                updateComponent(selectedComponent.id, { modifiers: newModifiers })
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {modifierDef.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={currentValue}
                              onChange={(e) => {
                                const newModifiers = selectedComponent.modifiers.filter(
                                  (m) => m.type !== modifierDef.type,
                                )
                                newModifiers.push({ type: modifierDef.type, value: e.target.value })
                                updateComponent(selectedComponent.id, { modifiers: newModifiers })
                              }}
                            />
                          )}
                        </div>
                      )
                    },
                  )}
                </div>
              ) : (
                <p className='text-gray-500'>Select a component to edit its properties</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SwiftUI代码生成 */}
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
      </div>
    </div>
  )
}

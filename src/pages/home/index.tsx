import { Button } from '@/components/ui/button'
import {
  ButtonStyleOpt,
  ControlSizeOpt,
  getButtonStyleByAttr,
} from '@/pages/v3/const/modifier/button'

const { options: ButtonStyleOptions} = ButtonStyleOpt
const { options: ControlSizeOptions } = ControlSizeOpt

function SmartButton({ buttonProps, children }: { buttonProps: string; children: React.ReactNode }) {
  return <Button {...buttonProps}>{children}</Button>;
}

const Home = () => {
  return (
    <div>
      <h3 className='my-2 font-bold'>Button</h3>
      <h3 className='my-2'>buttonStyle</h3>
      <div className='flex flex-row gap-2'>
        {ButtonStyleOptions.map((style) => (
          <Button key={style} variant={getButtonStyleByAttr('variant', style)}>
            {style}
          </Button>
        ))}
      </div>
      <h3 className='my-2'>role</h3>
      <div className='flex flex-row gap-2'>
        {ControlSizeOptions.map((size) => (
          <Button key={size} variant={getButtonStyleByAttr('size', size)}>
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Home

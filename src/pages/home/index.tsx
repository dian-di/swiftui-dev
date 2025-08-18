import { Button } from '@/components/ui/button'
import { ButtonStyleOptions, getAttr } from '@/pages/v3/const/modifier/button'

const { options } = ButtonStyleOptions

const Home = () => {
  return (
    <div>
      <h3 className='my-2 font-bold'>Button</h3>
      <h3 className='my-2'>buttonStyle</h3>
      <div className='flex flex-row gap-2'>
        {options.map((style) => (
          <Button key={style} variant={getAttr('variant', style)}>
            {style}
          </Button>
        ))}
      </div>
      <h3 className='my-2'>role</h3>
      <div className='flex flex-row gap-2'>
        {options.map((style) => (
          <Button key={style} variant={getAttr('variant', style)}>
            {style}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Home

import { type Meta, type StoryObj } from '@storybook/react-vite'
import CarouselR1 from './CarouselR1'

const meta: Meta<typeof CarouselR1> = {
  title: 'sketches/CarouselR1',
  component: CarouselR1,
}

export default meta

type Story = StoryObj<typeof CarouselR1>

export const Default: Story = {}

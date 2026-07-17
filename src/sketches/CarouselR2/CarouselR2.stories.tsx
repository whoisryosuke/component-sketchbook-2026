import { type Meta, type StoryObj } from '@storybook/react-vite'
import CarouselR2 from './CarouselR2'

const meta: Meta<typeof CarouselR2> = {
  title: 'sketches/CarouselR2',
  component: CarouselR2,
}

export default meta

type Story = StoryObj<typeof CarouselR2>

export const Default: Story = {}

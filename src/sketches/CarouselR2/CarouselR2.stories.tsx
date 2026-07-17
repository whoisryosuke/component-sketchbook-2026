import { type Meta, type StoryObj } from '@storybook/react-vite'
import CarouselR2 from './CarouselR2'

const meta: Meta<typeof CarouselR2> = {
  title: 'sketches/CarouselR2',
  component: CarouselR2,
  args: {
    rotation: 38,
    z: 220,
    visibleRange: 2,
    slideWidth: 300,
    slideCount: 5,
  },
  argTypes: {
    rotation: {
      control: { type: 'range', min: 0, max: 90, step: 1 },
    },
    z: {
      control: { type: 'range', min: 0, max: 500, step: 10 },
    },
    visibleRange: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
    },
    slideWidth: {
      control: { type: 'range', min: 100, max: 600, step: 10 },
    },
    slideCount: {
      control: { type: 'range', min: 3, max: 12, step: 1 },
    },
  },
}

export default meta

type Story = StoryObj<typeof CarouselR2>

export const Default: Story = {}

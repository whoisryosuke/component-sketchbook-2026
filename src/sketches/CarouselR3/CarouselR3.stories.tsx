import { type Meta, type StoryObj } from '@storybook/react-vite'
import CarouselR3 from './CarouselR3'

const meta: Meta<typeof CarouselR3> = {
    title: 'sketches/CarouselR3',
    component: CarouselR3,
    args: {
        rotation: 180,
        visibleRange: 5,
        slideHeight: 300,
        slideCount: 10,
    },
    argTypes: {
        rotation: {
            control: { type: 'range', min: 40, max: 270, step: 1 },
        },
        visibleRange: {
            control: { type: 'range', min: 0, max: 10, step: 1 },
        },
        slideHeight: {
            control: { type: 'range', min: 100, max: 600, step: 10 },
        },
        slideCount: {
            control: { type: 'range', min: 3, max: 24, step: 1 },
        },
    },
}

export default meta

type Story = StoryObj<typeof CarouselR3>

export const Default: Story = {}

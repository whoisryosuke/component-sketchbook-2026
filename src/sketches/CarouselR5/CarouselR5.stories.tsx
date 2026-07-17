import { type Meta, type StoryObj } from '@storybook/react-vite'
import CarouselR5 from './CarouselR5'

const meta: Meta<typeof CarouselR5> = {
    title: 'sketches/CarouselR5',
    component: CarouselR5,
    args: {
        rotation: 180,
        visibleRange: 5,
        slideHeight: 300,
        slideCount: 12,
        autoplayDelay: 1000,
        autoplaySpeed: 1000,
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
        autoplayDelay: {
            control: { type: 'range', min: 0, max: 2000, step: 100 },
        },
        autoplaySpeed: {
            control: { type: 'range', min: 0, max: 2000, step: 100 },
        },
    },
}

export default meta

type Story = StoryObj<typeof CarouselR5>

export const Default: Story = {}

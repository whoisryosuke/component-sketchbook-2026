import { motion } from 'motion/react';
import { cva, sva } from '../../../styled-system/css'
import React, { useState } from 'react'
import { Stack } from '../../../styled-system/jsx';

const buttonStyle = cva({
    base: {
        background: "teal.4",
        color: "gray.12",
        border: 0,
        borderRadius: 3,
        px: 4,
        py: 1,
        _hover: {
            background: "teal.5",
        },
        _active: {
            background: "teal.3",

        }
    }
})

const SLIDE_WIDTH = 300;
const SLIDES = new Array(5).fill(0);

const styles = sva({
    slots: ['container', 'slide'],
    base: {
        container: {
            minHeight: '150px',
            margin: 'auto',
            position: 'relative',
            display: 'flex',
        },
        slide: {
            boxSizing: "border-box",
            width: SLIDE_WIDTH,
            height: '150px',
            position: "absolute",
            top: 0,
            left: 0,

            fontSize: 6,
            color: "gray.12",
            flexShrink: 0,
            flexGrow: 0,
        }
    },
    variants: {
    }
})

type Props = {}

/**
 * Simple horizontal slider. Expects items with a fixed width.
 * @param props 
 * @returns 
 */
const CarouselR1 = (props: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const classes = styles({})


    const renderItems = SLIDES.map((_, index) => <motion.div className={classes.slide} key={index}
        animate={{
            translateX: SLIDE_WIDTH * (index - currentIndex)
        }}>{index}</motion.div>)

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1))
    }

    return (
        <div>
            <div className={classes.container}>
                {renderItems}
            </div>
            <Stack flexDir="row">
                <button className={buttonStyle()} onClick={handlePrev}>Prev</button>
                <button className={buttonStyle()} onClick={handleNext}>Next</button>
            </Stack>
        </div>
    )
}

export default CarouselR1
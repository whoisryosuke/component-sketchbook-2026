import { motion } from 'motion/react';
import { cva, sva } from '../../../styled-system/css'
import React, { useEffect, useRef, useState } from 'react'
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

const VISIBLE_RANGE = 2;
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
            perspective: 1420,
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
            transformStyle: "preserve-3d",
        }
    },
    variants: {
    }
})

const getAnimationForIndex = (index: number, current: number, containerWidth: number) => {
    const length = SLIDES.length;
    // Get offset (-2, -1, 0, 1, 2  → 5 items)
    let diff = (index - current + length) % length;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;

    const abs = Math.abs(diff);
    const inRange = abs <= VISIBLE_RANGE;

    const center = containerWidth / 2;

    return {
        x: diff * SLIDE_WIDTH + center,
        z: -abs * 220,
        rotateY: diff * -38,
        scale: Math.max(1 - abs * 0.24, 0.4),
        opacity: inRange ? 1 - abs * 0.32 : 0,
        zIndex: 100 - abs,
        pointerEvents: (inRange && abs !== 0 ? "auto" : abs === 0 ? "auto" : "none") as
            | "auto"
            | "none",
    };

}

type Props = {}

const CarouselR2 = (props: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0)

    const classes = styles({})

    useEffect(() => {
        if (!containerRef.current) return;
        const size = containerRef.current.getBoundingClientRect();
        setContainerWidth(size.width);
    }, [])


    const renderItems = SLIDES.map((_, index) => {
        const anim = getAnimationForIndex(index, currentIndex, containerWidth);
        console.log('anim', index, anim)
        return (
            <motion.div className={classes.slide} key={index}
                animate={{
                    x: anim.x,
                    z: anim.z,
                    rotateY: anim.rotateY,
                    scale: anim.scale,
                    opacity: anim.opacity,
                }}>{index}</motion.div>
        )
    })

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1))
    }

    return (
        <div>
            <div ref={containerRef} className={classes.container}>
                {renderItems}
            </div>
            <Stack flexDir="row">
                <button className={buttonStyle()} onClick={handlePrev}>Prev</button>
                <button className={buttonStyle()} onClick={handleNext}>Next</button>
            </Stack>
        </div>
    )
}

export default CarouselR2
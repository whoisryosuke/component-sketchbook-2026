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
            height: '150px',
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            fontSize: 6,
            color: "gray.2",
            bg: "gray.10",
            borderRadius: 4,
            flexShrink: 0,
            flexGrow: 0,
            transformStyle: "preserve-3d",
        }
    },
    variants: {
    }
})

type Props = {
    rotation: number;
    z: number;
    visibleRange: number;
    slideWidth: number;
    slideCount: number;
}

const CarouselR2 = ({ rotation = 38, z = 220, visibleRange = 2, slideWidth = 300, slideCount = 5 }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0)

    const classes = styles({})

    useEffect(() => {
        if (!containerRef.current) return;
        const size = containerRef.current.getBoundingClientRect();
        setContainerWidth(size.width);
    }, [])


    const getAnimationForIndex = (index: number, current: number, containerWidth: number) => {
        const length = slideCount;
        let diff = (index - current + length) % length;
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;

        const abs = Math.abs(diff);
        const inRange = abs <= visibleRange;

        const center = containerWidth / 2;
        const itemCenter = slideWidth / 2;

        return {
            x: diff * slideWidth + center - itemCenter,
            z: -abs * z,
            rotateY: diff * rotation,
            scale: Math.max(1 - abs * 0.24, 0.4),
            opacity: inRange ? 1 - abs * 0.32 : 0,
            zIndex: 100 - abs,
            pointerEvents: (inRange && abs !== 0 ? "auto" : abs === 0 ? "auto" : "none") as
                | "auto"
                | "none",
        };

    }


    const renderItems = Array.from({ length: slideCount }).map((_, index) => {
        const anim = getAnimationForIndex(index, currentIndex, containerWidth);
        return (
            <motion.div className={classes.slide} key={index}
                style={{ width: slideWidth }}
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
        setCurrentIndex((prev) => prev - 1 % slideCount)
    }
    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1 % slideCount)
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
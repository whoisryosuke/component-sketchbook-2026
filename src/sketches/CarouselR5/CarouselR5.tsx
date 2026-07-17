import { motion } from 'motion/react';
import { cva, sva } from '../../../styled-system/css'
import { useEffect, useMemo, useRef, useState } from 'react'
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
    className: "carousel",
    slots: ['root', 'container', 'slide', 'indicators', 'indicator'],
    base: {
        root: {
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "100%",
        },
        container: {
            maxWidth: "100%",
            minHeight: "100%",
            boxSizing: "border-box",
            flex: 1,
            margin: 'auto',
            position: 'relative',
            display: 'flex',
            perspective: 1420,
            transformStyle: "preserve-3d",
            overflow: 'hidden',
        },
        slide: {
            boxSizing: "border-box",
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
        },
        indicators: {
            px: 4,
            justifyContent: "center",
            alignItems: 'center',
        },
        indicator: {
            width: '0.5rem',
            height: '0.5rem',
            backgroundColor: "gray.10",
            borderRadius: 2,

            "_motionSafe": {
                transitionProperty: "background-color",
                transitionDuration: "fast",
                transitionTimingFunction: "ease-in",
            },

            "&[data-selected='true']": {
                backgroundColor: "teal.6",
            }
        }
    },
    variants: {
    }
})

type Props = {
    rotation: number;
    visibleRange: number;
    slideHeight: number;
    slideCount: number;
}

const CarouselR5 = ({ rotation = 38, visibleRange = 2, slideHeight = 150, slideCount = 5 }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0)


    const classes = styles({})

    const syncContainerSize = () => {
        if (!containerRef.current) return;
        const size = containerRef.current.getBoundingClientRect();
        setContainerHeight(size.height);
    }

    useEffect(() => {
        syncContainerSize();

        window.addEventListener("resize", syncContainerSize)

        return () => {
            window.removeEventListener("resize", syncContainerSize)
        }
    }, [])


    const getAnimationForIndex = (index: number, current: number, containerHeight: number) => {
        const length = slideCount;
        let diff = (index - current + length) % length;
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;

        const abs = Math.abs(diff);
        const inRange = abs <= visibleRange;
        const opacity = 1 - (abs / visibleRange);

        const center = containerHeight / 2;
        const itemCenter = slideHeight / 2;

        const maxAngleRad = (rotation * Math.PI) / 180;
        const angle = (diff / visibleRange) * maxAngleRad;
        // We get the radius of the cylinder shape
        const cylinderRadius = (0.75 * slideHeight * visibleRange) / Math.max(maxAngleRad, 0.01);

        return {
            // Calculate circle position based on radius + angle
            y: cylinderRadius * Math.sin(angle) + center - itemCenter,
            z: -cylinderRadius * (1 - Math.cos(angle)),
            // Convert angle to radians
            rotateX: -(angle * 180) / Math.PI,
            // Emphasize depth with scale alongside z-depth
            scale: 0.5 + 0.5 * Math.cos(angle),
            opacity,
            zIndex: 100 - abs,
            pointerEvents: (inRange ? "auto" : "none") as "auto" | "none",
        };

    }

    const slides = useMemo(() => Array.from({ length: slideCount }), [slideCount]);

    const renderItems = slides.map((_, index) => {
        const anim = getAnimationForIndex(index, currentIndex, containerHeight);
        return (
            <motion.div className={classes.slide} key={index}
                style={{ width: 420, height: slideHeight }}
                animate={{
                    y: anim.y,
                    z: anim.z,
                    rotateX: anim.rotateX,
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

    const renderIndicators = slides.map((_, index) => <motion.div key={index} data-selected={Math.abs(currentIndex) % slideCount == index} className={classes.indicator} animate={{
        height: Math.abs(currentIndex) % slideCount == index ? "2rem" : "0.5rem"
    }} />)

    return (
        <Stack flexDir="row" className={classes.root}>
            <Stack className={classes.indicators}>
                {renderIndicators}
            </Stack>
            <div ref={containerRef} className={classes.container}>
                {renderItems}
            </div>
            <Stack flexDir="row">
                <button className={buttonStyle()} onClick={handlePrev}>Prev</button>
                <button className={buttonStyle()} onClick={handleNext}>Next</button>
            </Stack>
        </Stack>
    )
}

export default CarouselR5
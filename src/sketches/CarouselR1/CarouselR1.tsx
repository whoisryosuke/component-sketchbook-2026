import { sva } from '../../../styled-system/css'
import React from 'react'

const styles = sva({
    slots: ['container'],
    base: {
        container: {
            background: "blue",
        }
    }
})

type Props = {}

const CarouselR1 = (props: Props) => {
    const classes = styles({})
    return (
        <div className={classes.container}>CarouselR1</div>
    )
}

export default CarouselR1
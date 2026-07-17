import React, { type ReactElement } from 'react'
import { useInputStore } from '../../store/input';
import { css } from '../../../styled-system/css';
import { Stack } from '../../../styled-system/jsx';
import { AnimatePresence, motion } from 'motion/react';
import type { UserInputKeys } from '../../constants/input';
import type { IconBaseProps, IconType } from 'react-icons';
import { PiArrowFatDown, PiArrowFatLeft, PiArrowFatRight, PiArrowFatUp } from 'react-icons/pi';
import { TbCircleLetterA, TbCircleLetterO, TbCircleLetterX } from 'react-icons/tb';

const INPUT_ICON_MAP: Record<UserInputKeys, IconType> = {
    up: PiArrowFatUp,
    down: PiArrowFatDown,
    left: PiArrowFatLeft,
    right: PiArrowFatRight,
    confirm: TbCircleLetterX,
    cancel: TbCircleLetterO
}

const containerStyle = css({
    position: 'fixed',
    bottom: 2,
    left: 2,
    display: "flex",
    flexDirection: "row",
    gap: 2
})

const keyStyle = css({
    px: 4,
    py: 1,
    fontSize: 4,
    fontFamily: "body",
    bg: "teal.3",
    color: "teal.12",
    borderRadius: 4,
})

type InputKeyProps = {
    inputKey: UserInputKeys
}

const InputKey = ({ inputKey }: InputKeyProps) => {
    const Icon = INPUT_ICON_MAP[inputKey];
    return (
        <motion.div className={keyStyle} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.1 }}><Icon /></motion.div>
    )
}

type Props = {}

const InputViz = (props: Props) => {
    const input = useInputStore((state) => state.input);

    const keys = Object.entries(input).filter(([_, pressed]) => pressed);
    const render = keys.map(([key]) => <InputKey key={key} inputKey={key as UserInputKeys} />)

    const isVisible = keys.length > 0

    return (
        <motion.div className={containerStyle}><AnimatePresence>{render}</AnimatePresence></motion.div>
    )
}

export default InputViz
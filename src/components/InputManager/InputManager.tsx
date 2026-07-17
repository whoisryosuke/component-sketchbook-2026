import { GamepadInput } from "./Gamepad";
import InputViz from "./InputViz";
import KeyboardInput from "./Keyboard";

type Props = {
    disableGamepad?: boolean;
    disableKeyboard?: boolean;
};

const InputManager = ({
    disableGamepad,
    disableKeyboard,
}: Props) => {
    return (
        <>
            {!disableKeyboard && <KeyboardInput />}
            {!disableGamepad && <GamepadInput />}
            <InputViz />
        </>
    );
};

InputManager.defaultProps = {
    disableGamepad: false,
    disableKeyboard: false,
};

export default InputManager;
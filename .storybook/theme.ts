import { create } from 'storybook/theming';
import logo from "../public/logotype-white.svg"

export default create({
    base: 'dark',
    brandTitle: "Ryo's Sketchbook",
    brandUrl: 'https://whoisryosuke.com',
    brandImage: logo,
    brandTarget: '_self',
    //
    colorPrimary: '#0400ff',
    colorSecondary: '#585C6D',

    // UI
    appBg: '#111111',
    appContentBg: '#111111',
    appPreviewBg: '#111111',
    appBorderColor: '#3f3f3f',
    appBorderRadius: 4,

    // Text colors
    textColor: '#ededed',
    textInverseColor: '#111111',

    // Toolbar default and active colors
    barTextColor: '#9E9E9E',
    barSelectedColor: '#585C6D',
    barHoverColor: '#585C6D',
    barBg: '#111111',

    // Form colors
    inputBg: '#111111',
    inputBorder: '#3f3f3f',
    inputTextColor: '#9E9E9E',
    inputBorderRadius: 2,
});
import { create } from 'storybook/theming';
import logo from "../public/logotype-white.svg"

export default create({
    base: 'dark',
    brandTitle: "Ryo's Sketchbook",
    brandUrl: 'https://whoisryosuke.com',
    brandImage: logo,
    brandTarget: '_self',
    //
    colorPrimary: '#00b9d5',
    colorSecondary: '#2f7d89',

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
    barTextColor: '#718084',
    barSelectedColor: '#70acb5',
    barHoverColor: '#00bbe0',
    barBg: '#111111',

    // Form colors
    inputBg: '#111111',
    inputBorder: '#3f3f3f',
    inputTextColor: '#9E9E9E',
    inputBorderRadius: 2,



    appHoverBg: '#006979',
    textMutedColor: '#a8a8a8',
    buttonBg: '#00414b',
    buttonBorder: '#006271',
    booleanBg: '#00b9d5',
    booleanSelectedBg: '#00b9d5',
});
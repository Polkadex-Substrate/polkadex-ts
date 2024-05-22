import { create } from '@storybook/theming/create';
//@ts-ignore
import   brandImage from "../public/logo.svg"

export default create({
  base: 'dark',

  colorPrimary: '#8B909A',
  colorSecondary: '#E6007A',

  // UI
  appBg: '#06070A',
  appPreviewBg: '#06070A',
  appContentBg: '#131419',
  appBorderRadius: 4,

   // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: '#fff',
  barBg: '#1F2229',

   // Form colors
  inputBg: '#2E303C',
  inputTextColor: '#fff',
  inputBorderRadius: 4,

  brandTitle:'esign System',
  brandImage,
  brandUrl:'https://www.polkadex.trade',
})
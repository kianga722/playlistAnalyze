// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    background: string,
    black: string,
    white: string,
    green: string,
    lightGreen: string,
    pink: string,
    blue: string,
    darkBlue: string
  }
}
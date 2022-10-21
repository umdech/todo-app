import { DefaultTheme } from 'styled-components'

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primaryColor: string,
            secondaryColor: string,
            white: string,
            light: string,
            dark: string,
            text: string,
            red: string,
            disabledColor: string
        },
        breakpoints: {
            sm: string,
            md: string,
            lg: string
        }
    }
}

export const theme: DefaultTheme = {
    colors: {
        primaryColor: '#E07C7C',
        secondaryColor: '#585292',
        white: '#ffffff',
        light: '#F5F5F5',
        dark: '#3B3B3B',
        text: '#2E2E2E',
        red: '#E07C7C',
        disabledColor: '#FAFAFA'
    },
    breakpoints: {
        sm: `(min-width: 576px)`,
        md: `(min-width: 768px)`,
        lg: `(min-width: 992px)`
    }
}
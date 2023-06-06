import { createTheme } from "@nextui-org/react";

const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            background: '#121212',
            navText: '#ffffff',
            gradient: 'linear-gradient(112deg, #3694ff -63.59%, #adc8e7 -20.3%, var(--nextui-colors-blue600) 70.46%);',
            primary: '#5086c3',
            primaryLight: '#1d68bd',
            primaryLightHover: '#3694ff',
            primaryLightContrast: '$white',
            accents2: '#3d3f41'
        },
    }
});

const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {
            navText: '#000000',
            gradient: 'linear-gradient(112deg, #3694ff -63.59%, #adc8e7 -20.3%, var(--nextui-colors-blue600) 70.46%);',
            primary: '#3694ff',
            primaryLight: '#1d68bd',
            primaryLightHover: '#3694ff',
            primaryLightContrast: '$white',
            neutralLight: '#d3d3d3',
            accents2: '#bbbbbb'
        },
    }
});

export {
    darkTheme,
    lightTheme
}
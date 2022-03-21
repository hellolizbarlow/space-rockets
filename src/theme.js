import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const components = {
  components: {
    Link: {
      variants: {
        'noDecoration': {
          '&:hover': {
            textDecoration: 'none'
          }
        },
      },
    }
  }
}

const theme = extendTheme({ config }, components);

export default theme;
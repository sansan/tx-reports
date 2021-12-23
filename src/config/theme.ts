import { extendTheme } from '@chakra-ui/react';

export const chartColors = ['#A259FF', '#6497B1', '#FFC107', '#F24E1E'];

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontFamily: 'Roboto',
        fontSize: '16px',
      },
    },
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.5rem',
  },
  colors: {
    primary: {
      '50': '#e4e8ef',
      '100': '#bcc5d8',
      '200': '#91a0bd',
      '300': '#677ca3',
      '400': '#466191',
      '500': '#224781',
      '600': '#1b4079',
      '700': '#11376e',
      '800': '#092e62',
      '900': '#011f4b',
    },
    background: {
      dark: '#F1FAFE',
      light: 'white',
    },
    text: {
      primary: '#011F4B',
      secondary: '#7E8299',
      link: '#005B96',
    },
  },
  components: {
    Heading: {
      variants: {
        primary: {
          color: 'text.primary',
        },
        secondary: {
          color: 'text.secondary',
        },
      },
      sizes: {
        md: {
          fontSize: '1rem',
        },
        lg: {
          fontSize: '1.5rem',
        },
      },
      defaultProps: {
        size: 'lg',
        variant: 'primary',
      },
    },
    Button: {
      variants: {
        primary: {
          bg: '#005B96',
          fontSize: '0.875rem',
          fontWeight: 'regular',
          h: '2rem',
          color: 'white',
          _hover: {
            bg: 'primary.500',
          },
        },
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            fontWeight: 'regular',
            fontSize: '14px',
            bg: '#1BC5BD',
            borderRadius: '5',
            border: 'none',
            color: 'white',
            _placeholder: { color: 'white' },
          },
        },
      },
      sizes: {
        sm: {
          field: {
            fontSize: '0.875rem',
          },
        },
      },
      defaultProps: {
        size: 'sm',
        variant: 'primary',
      },
    },
    Select: {
      variants: {
        primary: {
          field: {
            fontWeight: 'regular',
            fontSize: '14px',
            bg: '#1BC5BD',
            borderRadius: '5',
            border: 'none',
            color: 'white',
            _placeholder: { color: 'white' },
          },
          icon: {
            color: 'white',
          },
        },
      },
      sizes: {
        sm: {
          field: {
            fontSize: '0.875rem',
          },
        },
      },
      defaultProps: {
        size: 'sm',
        variant: 'primary',
      },
    },
    Table: {
      baseStyle: {
        fontSize: '1rem',
        fontWeight: 'regular',
        textTransform: 'capitalize',
      },
      variants: {
        primary: {
          table: {
            mt: '1rem',
            color: 'text.primary',
          },
          tr: {
            fontSize: '1rem',
            bg: 'none',
            height: '35px',
            marginBottom: '15px',
            _odd: {
              bg: 'white',
            },
          },
          td: {
            paddingY: 0,
            paddingX: '1.25rem',
            _last: {
              textAlign: 'right',
            },
            _even: {
              textAlign: 'center',
            },
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});

export default theme;

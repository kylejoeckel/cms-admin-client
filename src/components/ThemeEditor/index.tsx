import React, { useState } from 'react';
import { TextField, Switch, FormGroup, FormControlLabel, Container, Typography, Grid } from '@mui/material';

// Define the types for the data structure
interface TypographySettings {
  button: { textTransform: string };
  fontWeightRegular: number;
  fontSize: number;
  fontFamily: string;
  fontWeightMedium: number;
  fontWeightLight: number;
}

interface ColorSettings {
  dark: string;
  contrastText: string;
  main: string;
  light: string;
}

interface PaletteSettings {
  mode: string;
  secondary: ColorSettings;
  success: ColorSettings;
  background: { paper: string; dark: string; default: string };
  warning: ColorSettings;
  action: { active: string };
  text: { secondary: string; disabled: string; primary: string; hint: string };
  error: ColorSettings;
  primary: ColorSettings;
  info: ColorSettings;
  grey: { [key: string]: string };
}

interface ComponentSettings {
  MuiButton: {
    styleOverrides: { root: { fontSize: string } };
    defaultProps: { disableRipple: boolean };
  };
}

interface BreakpointValues {
  sm: number;
  xs: number;
  lg: number;
  xl: number;
  md: number;
}

interface ShapeSettings {
  borderRadius: number;
}

interface SettingsData {
  typography: TypographySettings;
  palette: PaletteSettings;
  components: ComponentSettings;
  breakpoints: { values: BreakpointValues };
  shape: ShapeSettings;
}

const initialData: SettingsData = {
    typography: {
      button: { textTransform: 'none' },
      fontWeightRegular: 400,
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightMedium: 500,
      fontWeightLight: 300
    },
    palette: {
      mode: 'light',
      secondary: {
        dark: '#9a0036',
        contrastText: '#FFFFFF',
        main: '#000000',
        light: '#ff5983'
      },
      success: {
        dark: '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)',
        main: '#4CAF50',
        light: '#81c784'
      },
      background: {
        paper: '#FFECB3',
        dark: '#000000',
        default: '#FFFFFF'
      },
      warning: {
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
        main: '#FF8A65',
        light: '#ffb74d'
      },
      action: { active: '#C49A00' },
      text: {
        secondary: '#FFFFFF',
        disabled: '#bdbdbd',
        primary: '#000000',
        hint: '#9e9e9e'
      },
      error: {
        dark: '#d32f2f',
        contrastText: '#fff',
        main: '#F44336',
        light: '#e57373'
      },
      primary: {
        dark: '#1565c0',
        contrastText: '#fff',
        main: '#FFD700',
        light: '#42a5f5'
      },
      info: {
        dark: '#1976d2',
        contrastText: '#fff',
        main: '#2196F3',
        light: '#64b5f6'
      },
      grey: {
        50: '#fafafa',
        100: '#CCCCCC',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#333333',
        900: '#212121',
        A700: '#616161',
        A400: '#303030',
        A100: '#d5d5d5',
        A200: '#aaaaaa'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1rem'
          }
        },
        defaultProps: {
          disableRipple: true
        }
      }
    },
    breakpoints: {
      values: {
        sm: 600,
        xs: 0,
        lg: 1280,
        xl: 1920,
        md: 960
      }
    },
    shape: {
      borderRadius: 8
    }
  };

const ThemeEditorContainer = ({data}: {data: SettingsData}) => {

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj: any, key) => obj[key] = obj[key] || {}, data);
    lastObj[lastKey!] = value;
    // setData({ ...data });
  };

  const renderField = (label: string, path: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={value} onChange={(e) => handleChange(path, e.target.checked)} />}
            label={label}
          />
        </FormGroup>
      );
    }
    return (
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => handleChange(path, e.target.value)}
        margin="normal"
        variant="outlined"
      />
    );
  };

  const recursiveFields = (obj: any, prefix = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && value.constructor === Object) {
        return (
          <Grid item xs={12} md={6} key={path}>
            <Typography variant="h6" gutterBottom>{key}</Typography>
            {recursiveFields(value, path)}
          </Grid>
        );
      }
      return <Grid item xs={12} md={6} key={path}>{renderField(key, path, value)}</Grid>;
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {recursiveFields(data)}
      </Grid>
    </Container>
  );
};


export default ThemeEditorContainer;

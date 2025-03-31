// Theme configuration for Coli Up application

export const colors = {
  primary: '#007BFF',    // Blue - Reliability, professionalism
  white: '#FFFFFF',      // White - Simplicity, clarity
  dark: '#333333',       // Dark gray - Elegance, modernity
  success: '#28A745',    // Green - Validation, success (for delivered packages)
  warning: '#FFC107',    // Orange - Alert, in progress (for pending packages)
  light: '#F8F9FA',      // Light background
  border: '#DEE2E6',     // Border color
  text: {
    primary: '#333333',
    secondary: '#6C757D',
    light: '#FFFFFF'
  }
};

export const fonts = {
  title: "'Montserrat', sans-serif",
  body: "'Open Sans', sans-serif"
};

export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px'
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};

export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
  large: '0 8px 16px rgba(0, 0, 0, 0.1)'
};

export default {
  colors,
  fonts,
  borderRadius,
  spacing,
  shadows
};
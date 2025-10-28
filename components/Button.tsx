import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, disabled = false, ...props }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: disabled ? colors.border : colors.primary },
        disabled && { opacity: 0.5 }
      ]} 
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, { color: disabled ? colors.textSecondary : 'white' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    minWidth: 200,
    maxWidth: 300,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Button;
import React from "react";
import { TextInput } from "react-native-paper";

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  mode = "outlined",
  secureTextEntry = false,
  keyboardType = "default",
  style,
  textColor = "black",
  outlineColor = "gray",
  activeOutlineColor = "blue",
  roundness = 20, // Border radius via theme
  ...props
}) => {
  return (
    <TextInput
      mode={mode}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={style}
      textColor={textColor}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      theme={{ roundness }} // Apply border radius correctly
      {...props}
    />
  );
};

export default InputField;

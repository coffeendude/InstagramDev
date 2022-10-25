import {ReactNode} from 'react';
import { Pressable, Text } from 'react-native'
import React from 'react'

interface IDoublePressable {
    onDoublePress?: () => void;
    children: ReactNode;
}

const DoublePressable = ({ onDoublePress = () => {}, children }: IDoublePressable) => {
    let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now(); // timestamp 3467864 - number of seconds
    if (now - lastTap < 300) {
      onDoublePress();
    }

    lastTap = now;
  };

  return (
    <Pressable onPress={handleDoublePress}>
      {children}
    </Pressable>
  )
}

export default DoublePressable; 
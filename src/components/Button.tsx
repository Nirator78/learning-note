import React from "react";
import { TextStyle, TouchableOpacity } from "react-native";

export default function BasicButton({ 
        children, 
        onPress, 
        style={}
    } : { 
        children : React.ReactNode; 
        onPress: () => void; 
        style?: TextStyle }) 
    {
    return (
        <TouchableOpacity 
            style={{ borderRadius: 10, paddingHorizontal: 24, ...style } }
            onPress={onPress}
        >
            { children }
        </TouchableOpacity>
    );
}
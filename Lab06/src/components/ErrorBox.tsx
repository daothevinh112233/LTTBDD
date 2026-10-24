// ErrorBox.tsx
import React from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
      <Text style={{ color: colors.red, textAlign: "center" }}>{message}</Text>
      <Pressable onPress={onRetry} style={{ backgroundColor: colors.blue, padding: 12, borderRadius: 6 }}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}
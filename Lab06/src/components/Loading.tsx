// Loading.tsx
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
export function Loading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 8 }}>
      <ActivityIndicator size="large" />
      <Text>Đang tải...</Text>
    </View>
  );
}
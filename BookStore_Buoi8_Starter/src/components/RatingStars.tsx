import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);   // 4.5 → 5 sao vàng

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>★</Text>
        );
        // có onChange → bọc Pressable để bấm chọn; không có → chỉ hiển thị
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            {star}
          </Pressable>
        ) : (
          <View key={n}>{star}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
});
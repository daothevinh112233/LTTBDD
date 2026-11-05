import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // state cục bộ: nút phản hồi ngay, store chỉ được ghi sau khi "lắng" 300 ms
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // 1) cục bộ → store
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty]);

  // 2) store → cục bộ (store đổi từ nơi khác thì đồng bộ lại)
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <View style={styles.stepper}>
          <Pressable
            style={[styles.stepBtn, !canDec && styles.stepBtnOff]}
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            accessibilityLabel="Giảm"
          >
            <Text style={styles.stepText}>−</Text>
          </Pressable>

          <Text style={styles.qty}>{qty}</Text>

          <Pressable
            style={[styles.stepBtn, !canInc && styles.stepBtnOff]}
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            accessibilityLabel="Tăng"
          >
            <Text style={styles.stepText}>+</Text>
          </Pressable>

          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>

      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  stepBtn: { width: 30, height: 30, borderRadius: radius.sm, backgroundColor: colors.indigo, alignItems: "center", justifyContent: "center" },
  stepBtnOff: { opacity: 0.35 },
  stepText: { color: "#fff", fontSize: 18, fontWeight: "800", lineHeight: 20 },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16, minWidth: 22, textAlign: "center" },
  stock: { color: colors.muted, fontSize: 12 },
  trash: { fontSize: 22 },
});
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const { has, toggle } = useFavorites();
  const phone = PHONES.find((p) => p.id === id);

  if (!phone) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  return (
    <View style={{ flex: 1, padding: 16, gap: 10, backgroundColor: "#fff" }}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={{ width: "100%", height: 260 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{formatPrice(phone.price)}</Text>
      <Text>Cung cấp bởi {phone.supplier}</Text>

      <Pressable
        onPress={() => toggle(phone.id)}
        style={{
          borderWidth: 1,
          borderColor: colors.red,
          borderRadius: 6,
          padding: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.red, fontWeight: "700" }}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={{ width: 50, height: 60 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{phone.name.split(" - ")[0]}</Text>
        <Text style={{ fontWeight: "700" }}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}
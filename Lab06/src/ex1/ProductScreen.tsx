import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.help}><Text style={{ fontSize: 11 }}>?</Text></View>
        </View>

        {/* TODO 1 */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>{picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}</Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: nằm ngoài info, sát đáy */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "80%", height: "100%" },
  info: { paddingVertical: 12, gap: 8 },
  name: { fontSize: 16, color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  review: { color: colors.muted },
  price: { fontSize: 18, fontWeight: "700", color: colors.text },
  oldPrice: { color: colors.muted, textDecorationLine: "line-through" },
  badge: { color: colors.red, fontWeight: "700", fontSize: 12 },
  help: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.muted, alignItems: "center", justifyContent: "center" },
  chooseBtn: { borderWidth: 1, borderColor: colors.line, borderRadius: 6, paddingVertical: 12, alignItems: "center", justifyContent: "center", marginTop: 8 },
  chooseText: { fontWeight: "600", color: colors.text },
  chevron: { position: "absolute", right: 12, fontSize: 20, color: colors.muted },
  buyBtn: { backgroundColor: colors.red, borderRadius: 6, paddingVertical: 14, alignItems: "center", marginBottom: 8 },
  buyText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
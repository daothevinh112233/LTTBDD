import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3 */}
          {picked && (
            <>
              <Text style={styles.small}>Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text></Text>
              <Text style={styles.small}>Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text></Text>
              <Text style={styles.bold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>
        {/* TODO 4 */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, gap: 12 },
  thumb: { width: 90, height: 110 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 14, color: colors.text },
  bold: { fontWeight: "700" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, alignItems: "center", gap: 16 },
  hint: { fontSize: 15 },
  swatches: { gap: 14, alignItems: "center" },
  swatch: { width: 85, height: 80, borderWidth: 2, borderColor: "transparent" },
  swatchOn: { borderColor: colors.navy, borderWidth: 4 },
  doneBtn: { alignSelf: "stretch", backgroundColor: colors.blue, borderRadius: 4, paddingVertical: 12, alignItems: "center", marginTop: "auto" },
  doneText: { color: "#fff", fontWeight: "700" },
});
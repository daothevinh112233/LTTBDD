import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { PHONES } from "./src/data/phones";

const ITEMS: Record<string, () => React.JSX.Element> = {
  "Bài 1: Select Phone": () => <SelectPhoneApp phone={PHONES[0]} />,
  "Bài 2: Gắn API": () => <SelectPhoneApi />,
  "Bài 3: Bottom Tab": () => <BottomTabApp />,
  "Bài 4: Stack + Tab": () => <StackTabApp />,
  "Bài 5: Drawer": () => <DrawerApp />,
};

export default function App() {
  const [ex, setEx] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      {ex ? (
        <View style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={{ backgroundColor: "#eee" }}>
            <Pressable onPress={() => setEx(null)} style={{ padding: 10 }}>
              <Text>← Menu</Text>
            </Pressable>
          </SafeAreaView>
          <View style={{ flex: 1 }}>{ITEMS[ex]()}</View>
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1, padding: 24, gap: 12 }}>
          {Object.keys(ITEMS).map((k) => (
            <Pressable
              key={k}
              onPress={() => setEx(k)}
              style={{ padding: 16, backgroundColor: "#4F63C8", borderRadius: 8 }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>{k}</Text>
            </Pressable>
          ))}
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
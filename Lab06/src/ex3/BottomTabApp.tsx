import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Phone } from "../types";
import { fetchPhones } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { colors } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function PhoneList({ data }: { data: Phone[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(p, i) => String(p.id ?? i)}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}

function HomeTab({ phones }: { phones: Phone[] }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <PhoneList data={phones} />
    </View>
  );
}

function SearchTab({ phones }: { phones: Phone[] }) {
  const [keyword, setKeyword] = useState("");
  const result = phones.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {result.length === 0 ? (
        <Text>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <PhoneList data={result} />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>N</Text>
      </View>
      <Text style={s.name}>Nguyễn Văn An</Text>
      <Text style={{ color: colors.muted }}>an.nguyen@example.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhones(null);
    try {
      setPhones(await fetchPhones());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phones) return <Loading />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" options={{ title: "Trang chủ" }}>
          {() => <HomeTab phones={phones} />}
        </Tab.Screen>
        <Tab.Screen name="Search" options={{ title: "Tìm kiếm" }}>
          {() => <SearchTab phones={phones} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "700" },
  name: { fontSize: 22, fontWeight: "700" },
});
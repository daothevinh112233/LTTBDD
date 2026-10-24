import React from "react";
import { FlatList } from "react-native";
import { PHONES } from "../data/phones";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}
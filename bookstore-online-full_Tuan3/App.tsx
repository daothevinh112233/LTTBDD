import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookRowCard } from './components/BookRowCard';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';

import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. ScrollView chứa nội dung chính */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Phần 1: Danh mục */}
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        {/* Phần 2: Sách đề xuất (Dùng BookRowCard của Giờ 1) */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Sách đề xuất</Text>
        {/* Lấy thử 2 cuốn sách đầu tiên để hiển thị dạng hàng ngang */}
        {BOOKS.slice(0, 2).map((book) => (
          <View key={book.id} style={{ marginBottom: 12 }}>
            <BookRowCard book={book} />
          </View>
        ))}

        {/* Phần 3: Lưới sách (Dùng BookGrid của Giờ 2) */}
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Tất cả sách</Text>
        <BookGrid 
          books={BOOKS} 
          // Bấm vào bìa sách sẽ gọi hàm tăng số lượng giỏ hàng
          onPressBook={handleAddToCart} 
        />
        
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
      <FloatingCartButton 
        count={cartCount} 
        onPress={() => console.log('Bấm mở giỏ hàng chi tiết')} 
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#111827', 
    marginBottom: 12 
  },
});
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/services/api';
import { useAuth } from '@/stores/authStore';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear'];

export default function WardrobeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['clothing', selectedCategory, searchQuery],
    queryFn: () => clothingApi.getAll({ search: searchQuery }),
  });

  const items = data?.data?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-display font-bold text-neutral-900">
              {user?.profile?.firstName ? `Hi, ${user.profile.firstName}` : 'My Wardrobe'}
            </Text>
            <Text className="text-neutral-500 mt-1">
              {items.length} items in your collection
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(modals)/add-clothing')}
            className="w-12 h-12 rounded-full bg-primary-600 items-center justify-center"
          >
            <Text className="text-white text-2xl">+</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-neutral-100 rounded-xl px-4 py-3 mb-4">
          <Text className="text-xl mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-neutral-900"
            placeholder="Search your wardrobe..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category ? 'bg-primary-600' : 'bg-neutral-100'
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category ? 'text-white' : 'text-neutral-700'
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="items-center py-12">
            <Text className="text-neutral-500">Loading...</Text>
          </View>
        ) : items.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">👗</Text>
            <Text className="text-xl font-semibold text-neutral-900 mb-2">Empty Wardrobe</Text>
            <Text className="text-neutral-500 text-center mb-4">
              Start adding clothes to build your digital wardrobe
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(modals)/add-clothing')}
              className="bg-primary-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Add First Item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row flex-wrap -mx-2 pb-20">
            {items.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                className="w-1/2 p-2"
                onPress={() => router.push(`/clothing/${item.id}`)}
              >
                <View className="bg-neutral-100 rounded-2xl overflow-hidden aspect-[3/4]">
                  {item.images?.[0] ? (
                    <Image
                      source={{ uri: item.images[0].url }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center">
                      <Text className="text-4xl">👕</Text>
                    </View>
                  )}
                </View>
                <Text className="mt-2 text-sm font-medium text-neutral-900 truncate">
                  {item.name}
                </Text>
                <Text className="text-xs text-neutral-500">{item.category?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

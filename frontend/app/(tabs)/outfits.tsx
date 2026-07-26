import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { outfitApi } from '@/services/api';

export default function OutfitsScreen() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['outfits'],
    queryFn: () => outfitApi.getAll(),
  });

  const outfits = data?.data?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-3xl font-display font-bold text-neutral-900">Outfits</Text>
          <TouchableOpacity
            onPress={() => router.push('/(modals)/create-outfit')}
            className="w-12 h-12 rounded-full bg-primary-600 items-center justify-center"
          >
            <Text className="text-white text-2xl">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-neutral-500 mb-4">Your saved outfit combinations</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="items-center py-12">
            <Text className="text-neutral-500">Loading...</Text>
          </View>
        ) : outfits.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">✨</Text>
            <Text className="text-xl font-semibold text-neutral-900 mb-2">No Outfits Yet</Text>
            <Text className="text-neutral-500 text-center mb-4">
              Create outfits by combining items from your wardrobe
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(modals)/create-outfit')}
              className="bg-primary-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Create Outfit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-20">
            {outfits.map((outfit: any) => (
              <TouchableOpacity
                key={outfit.id}
                className="mb-4 bg-neutral-50 rounded-2xl p-4"
                onPress={() => router.push(`/outfits/${outfit.id}`)}
              >
                <View className="flex-row">
                  {outfit.items?.slice(0, 3).map((item: any, idx: number) => (
                    <View
                      key={idx}
                      className="w-20 h-20 rounded-xl overflow-hidden mr-2"
                      style={{ marginLeft: idx > 0 ? -8 : 0 }}
                    >
                      {item.clothingItem?.images?.[0] ? (
                        <Image
                          source={{ uri: item.clothingItem.images[0].url }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="w-full h-full bg-neutral-200 items-center justify-center">
                          <Text>👕</Text>
                        </View>
                      )}
                    </View>
                  ))}
                  {(outfit.items?.length || 0) > 3 && (
                    <View className="w-20 h-20 rounded-xl bg-neutral-200 items-center justify-center">
                      <Text className="text-neutral-600 font-semibold">
                        +{outfit.items.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="mt-3 flex-row items-center justify-between">
                  <View>
                    <Text className="font-semibold text-neutral-900">
                      {outfit.name || 'Untitled Outfit'}
                    </Text>
                    <Text className="text-sm text-neutral-500">{outfit.items?.length || 0} items</Text>
                  </View>
                  {outfit.occasion && (
                    <View className="bg-primary-100 px-3 py-1 rounded-full">
                      <Text className="text-primary-700 text-sm font-medium">{outfit.occasion}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

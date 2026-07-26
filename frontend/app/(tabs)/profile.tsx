import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/me/stats`);
      return response.json();
    },
  });

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-3xl font-display font-bold text-neutral-900 mb-6">Profile</Text>

          {/* User Card */}
          <View className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 mb-6">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                <Text className="text-3xl">
                  {user?.profile?.firstName?.[0] || user?.email?.[0] || '👤'}
                </Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xl font-semibold text-white">
                  {user?.profile?.firstName
                    ? `${user.profile.firstName} ${user?.profile?.lastName || ''}`
                    : 'User'}
                </Text>
                <Text className="text-white/80">{user?.email}</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row mb-6">
            <View className="flex-1 bg-neutral-100 rounded-xl p-4 mr-2 items-center">
              <Text className="text-2xl font-bold text-neutral-900">{stats?.totalItems || 0}</Text>
              <Text className="text-sm text-neutral-500">Items</Text>
            </View>
            <View className="flex-1 bg-neutral-100 rounded-xl p-4 ml-2 items-center">
              <Text className="text-2xl font-bold text-neutral-900">{stats?.totalOutfits || 0}</Text>
              <Text className="text-sm text-neutral-500">Outfits</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="bg-neutral-50 rounded-2xl overflow-hidden mb-6">
            <MenuItem icon="📊" title="Wardrobe Analytics" onPress={() => router.push('/analytics')} />
            <MenuItem icon="🧺" title="Laundry Tracker" onPress={() => router.push('/laundry')} />
            <MenuItem icon="📅" title="Calendar" onPress={() => router.push('/calendar')} />
            <MenuItem icon="✈️" title="Packing Lists" onPress={() => router.push('/packing')} />
            <MenuItem icon="🎨" title="Style Inspiration" onPress={() => router.push('/inspiration')} />
          </View>

          <View className="bg-neutral-50 rounded-2xl overflow-hidden mb-6">
            <MenuItem icon="⚙️" title="Settings" onPress={() => router.push('/settings')} />
            <MenuItem icon="🔔" title="Notifications" onPress={() => router.push('/notifications')} />
            <MenuItem icon="❓" title="Help & Support" onPress={() => router.push('/help')} />
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 rounded-2xl p-4 items-center"
          >
            <Text className="text-red-600 font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center p-4 border-b border-neutral-100 last:border-b-0">
      <Text className="text-xl mr-4">{icon}</Text>
      <Text className="flex-1 text-neutral-900 font-medium">{title}</Text>
      <Text className="text-neutral-400">→</Text>
    </TouchableOpacity>
  );
}

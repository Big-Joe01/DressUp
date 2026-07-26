import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>{icon}</Text>
      <Text style={[styles.label, focused && styles.labelFocused]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wardrobe',
          tabBarIcon: ({ focused }) => <TabIcon icon="👗" label="Wardrobe" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="outfits"
        options={{
          title: 'Outfits',
          tabBarIcon: ({ focused }) => <TabIcon icon="✨" label="Outfits" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="style"
        options={{
          title: 'Style',
          tabBarIcon: ({ focused }) => <TabIcon icon="🤖" label="AI Style" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  iconFocused: {},
  label: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  labelFocused: {
    color: '#6366f1',
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Please check your credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6 pt-12">
            {/* Logo */}
            <View className="items-center mb-12">
              <Text className="text-6xl mb-4">👗</Text>
              <Text className="text-4xl font-display font-bold text-neutral-900">DressUP</Text>
              <Text className="text-neutral-500 mt-2">Your AI Wardrobe & Stylist</Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-neutral-900 mb-2">Email</Text>
              <TextInput
                className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900 mb-4"
                placeholder="you@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text className="text-lg font-semibold text-neutral-900 mb-2">Password</Text>
              <TextInput
                className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900 mb-6"
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity className="self-end mb-6">
                <Text className="text-primary-600 font-medium">Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={`bg-primary-600 rounded-xl py-4 items-center ${isLoading ? 'opacity-50' : ''}`}
              >
                <Text className="text-white font-semibold text-lg">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text className="mx-4 text-neutral-400">or</Text>
              <View className="flex-1 h-px bg-neutral-200" />
            </View>

            {/* Social Login */}
            <TouchableOpacity className="bg-neutral-100 rounded-xl py-4 items-center mb-4 flex-row justify-center">
              <Text className="text-xl mr-2">🍎</Text>
              <Text className="text-neutral-900 font-semibold">Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-neutral-100 rounded-xl py-4 items-center mb-8 flex-row justify-center">
              <Text className="text-xl mr-2">🔵</Text>
              <Text className="text-neutral-900 font-semibold">Continue with Google</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center">
              <Text className="text-neutral-500">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-primary-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

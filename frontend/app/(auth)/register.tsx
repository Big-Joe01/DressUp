import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/stores/authStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, firstName || undefined, lastName || undefined);
      router.replace('/(onboarding)');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Please try again');
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
          <View className="flex-1 px-6 pt-8">
            {/* Header */}
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Text className="text-neutral-500">← Back</Text>
            </TouchableOpacity>

            <Text className="text-3xl font-display font-bold text-neutral-900 mb-2">Create Account</Text>
            <Text className="text-neutral-500 mb-8">Start your style journey with DressUP</Text>

            {/* Form */}
            <View className="mb-6">
              <View className="flex-row -mx-2 mb-4">
                <View className="flex-1 px-2">
                  <Text className="text-sm font-semibold text-neutral-700 mb-2">First Name</Text>
                  <TextInput
                    className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900"
                    placeholder="John"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View className="flex-1 px-2">
                  <Text className="text-sm font-semibold text-neutral-700 mb-2">Last Name</Text>
                  <TextInput
                    className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900"
                    placeholder="Doe"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <Text className="text-sm font-semibold text-neutral-700 mb-2">Email *</Text>
              <TextInput
                className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900 mb-4"
                placeholder="you@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text className="text-sm font-semibold text-neutral-700 mb-2">Password *</Text>
              <TextInput
                className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900 mb-4"
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text className="text-sm font-semibold text-neutral-700 mb-2">Confirm Password *</Text>
              <TextInput
                className="bg-neutral-100 rounded-xl px-4 py-4 text-neutral-900 mb-6"
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className={`bg-primary-600 rounded-xl py-4 items-center ${isLoading ? 'opacity-50' : ''}`}
              >
                <Text className="text-white font-semibold text-lg">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text className="text-center text-neutral-500 text-sm mb-6">
              By creating an account, you agree to our{' '}
              <Text className="text-primary-600">Terms of Service</Text> and{' '}
              <Text className="text-primary-600">Privacy Policy</Text>
            </Text>

            {/* Login Link */}
            <View className="flex-row justify-center">
              <Text className="text-neutral-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-primary-600 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

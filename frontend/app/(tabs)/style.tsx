import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@/services/api';

const SUGGESTIONS = [
  'What should I wear today?',
  'Dress me for a wedding',
  'Help me find outfit gaps',
  'Show me casual outfits',
];

export default function StyleScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI personal stylist. Ask me anything about fashion, outfit recommendations, or styling tips!' },
  ]);

  const chatMutation = useMutation({
    mutationFn: (msg: string) => aiApi.chat(msg),
    onSuccess: (data) => {
      setChatHistory((prev) => [...prev, { role: 'assistant', content: data.data.response }]);
    },
  });

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory((prev) => [...prev, { role: 'user', content: message }]);
    chatMutation.mutate(message);
    setMessage('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center mb-2">
          <Text className="text-3xl mr-3">🤖</Text>
          <Text className="text-3xl font-display font-bold text-neutral-900">AI Stylist</Text>
        </View>
        <Text className="text-neutral-500">Your personal fashion assistant</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
          {chatHistory.map((chat, index) => (
            <View
              key={index}
              className={`mb-4 ${chat.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  chat.role === 'user' ? 'bg-primary-600 rounded-br-sm' : 'bg-neutral-100 rounded-bl-sm'
                }`}
              >
                <Text className={chat.role === 'user' ? 'text-white' : 'text-neutral-900'}>
                  {chat.content}
                </Text>
              </View>
            </View>
          ))}
          {chatMutation.isPending && (
            <View className="mb-4 items-start">
              <View className="bg-neutral-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                <Text className="text-neutral-500">Thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 pb-2"
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {SUGGESTIONS.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMessage(suggestion)}
              className="bg-neutral-100 px-4 py-2 rounded-full mr-2"
            >
              <Text className="text-neutral-700 text-sm">{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View className="px-6 py-4 border-t border-neutral-100 bg-white">
          <View className="flex-row items-center bg-neutral-100 rounded-full px-4 py-2">
            <TextInput
              className="flex-1 text-neutral-900 py-2"
              placeholder="Ask your AI stylist..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={!message.trim() || chatMutation.isPending}
              className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${
                message.trim() && !chatMutation.isPending ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <Text className="text-white text-lg">→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

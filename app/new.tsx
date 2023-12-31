import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native'
import Logo from '../src/assets/NLW-spacetime-logo.svg'
import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function NewMemories() {
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className=" mt-4 flex-row items-center justify-between">
        <Logo />

        <Link href={'/memories'} asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372568' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20">
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#fff" />
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          multiline
          className=" font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-4 items-center rounded-full bg-green-500 px-5 py-2 "
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

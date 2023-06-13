import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import Logo from '../src/assets/NLW-spacetime-logo.svg'
import * as SecureStore from 'expo-secure-store'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import React, { useEffect } from 'react'
import { api } from '../src/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/0996649f08aeb42fbc4e',
}

export default function App() {
  const router = useRouter()

  const [, response, singInWithGithub] = useAuthRequest(
    {
      clientId: '0996649f08aeb42fbc4e',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-[26px] text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="h-[78px] w-[326px] text-center font-body text-base leading-[26px] text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2 "
          onPress={() => singInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        className="text-center font-body text-sm leading-relaxed text-gray-200
      "
      >
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}

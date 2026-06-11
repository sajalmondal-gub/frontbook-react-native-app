import { StatusBar, useColorScheme, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import './global.css';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Home />
    </SafeAreaProvider>
  );
}

function Home() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>

      <View
        className="flex-1 bg-slate-50 items-center justify-center px-6"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm items-center border border-slate-100">
          <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-6 shadow-md">
            <Text className="text-white text-3xl font-bold">🚀</Text>
          </View>

          <Text className="text-2xl font-extrabold text-slate-800 mb-2 text-center">
            Tailwind is Working!
          </Text>

          <Text className="text-slate-500 text-center mb-8 leading-relaxed">
            You've successfully set up NativeWind v4. Start building your beautiful app!
          </Text>

          <TouchableOpacity className="bg-blue-600 active:bg-blue-700 w-full py-4 rounded-xl items-center shadow-md">
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
          <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
            You've successfully set up NativeWind v4. Start building your beautiful app!
          </Text>
          <ScrollView>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
            <Text className="text-slate-500 text-center mb-8 leading-relaxed font-bold text-lg bg-yellow-200">
              You've successfully set up NativeWind v4. Start building your beautiful app!
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

export default App;

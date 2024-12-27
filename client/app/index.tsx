import { SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <View className="flex-1 flex justify-center items-center bg-white">
      <Text className="text-lg font-bold">Home Hoe Hello</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-blue-500  mt-4">
        Go to Home
      </Link>
    </View>
  );
}

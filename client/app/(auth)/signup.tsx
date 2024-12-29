import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import Icon from "@/constants/icon";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-white flex items-center h-screen">
      <View className="w-full flex h-full px-4 my-24">
        <View className="flex flex-row items-center justify-center">
          {/* <Image source={images.logo0} className="w-[115px] h-[34px]" /> */}
          <Text className="text-4xl font-semibold text-blue-600">
            SKY'D
          </Text>
        </View>

        <View className="mt-8 mx-8 flex justify-center items-center">
          {/* <Text className="text-2xl font-semibold">Đăng Nhập</Text> */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
        </View>
        <View className="flex justify-center items-center mt-6">
          <CustomButton
            title="Đăng nhập"
            // handlePress={submit}
            containerStyles="mt-7 w-[85%]"
            // isLoading={isSubmitting}
            textStyles="text-white"
          />
          <Text className="mt-8">
            Bạn chưa có tài khoản?{" "}
            <Link className="text-blue-600" href="/signup">
              Đăng ký
            </Link>{" "}
          </Text>
          <Text className="mt-4 text-sm">Hoặc</Text>
        </View>
        <View className="flex justify-center items-center ">
          <TouchableOpacity
            onPress={() => console.log("Google Sign Up pressed")}
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 10,
              width: "85%",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ddd",
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <Icon.GoogleIcon />
            <Text
              className="ml-2"
              style={{ color: "#000", fontSize: 16, fontWeight: "semibold" }}
            >
              Tiếp tục với Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Google Sign Up pressed")}
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 10,
              width: "85%",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ddd",
              marginTop: 8,
              alignSelf: "center",
            }}
          >
            <Icon.FacebookIcon />
            <Text
              className="ml-2"
              style={{ color: "#000", fontSize: 16, fontWeight: "semibold" }}
            >
              Tiếp tục với Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

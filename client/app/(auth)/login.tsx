import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormField from "@/common/components/FormField";
import { Link } from "expo-router";
import Icon from "@/constants/icon";
import { TextField } from "react-native-ui-lib";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Login = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <ScrollView>
        <View className={`flex w-full h-full px-[10%] py-[56%]`}>
          <View>
            <Text className="text-4xl font-semibold text-blue-600">SKY'P</Text>
          </View>
          <View className="mt-8">
            {/* <FormField
              title="Email"
              value={email}
              handleChangeText={(e: any) => setEmail(e)}
              otherStyles="mt-7"
              keyboardType="email-address"
            /> */}
            <TextField
              placeholder={"Email"}
              floatingPlaceholder
              placeholderTextColor="black"
              onChangeText={(e) => setEmail(e)}
              enableErrors
              validateOnChange
              validate={["required", (value: any) => value.length > 6]}
              // validationMessage={["Trường này là bắt buộc", ""]}
              showCharCounter
              maxLength={30}
              className="w-full text-xl font-psemibold py-4  border-b-[1px] rounded-xl text-black"
            />
          </View>
          <View style={styles.viewText}>
            <Text className="">Bạn chưa có tài khoản?</Text>
            <Link className="text-blue-600" href="/Register">
              Đăng ký
            </Link>
          </View>
          <View style={styles.viewText}>
            <Text>Hoặc</Text>
          </View>

          <View className="flex justify-center items-center ">
            <TouchableOpacity
              onPress={() => console.log("Google Sign Up pressed")}
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#F4EDD3",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                width: "100%",
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
                backgroundColor: "#F4EDD3",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                width: "100%",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ddd",
                marginTop: 20,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  viewText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
});

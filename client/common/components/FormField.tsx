import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import icon from "@/constants/icon";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  secureTextEntry,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const IconComponent = icon;

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-blue-600 mb-4">{title}</Text>
      <View
        style={styles.input}
        className="w-full h-24 px-4 rounded-xl flex flex-row items-center"
      >
        <TextInput
          className="flex-1 h-24 text-black font-psemibold text-base outline-none border-none"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#fff"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword} // Ẩn hiện mật khẩu
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity
            className=""
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <icon.EyeIcon className="w-6 h-6 text-black" /> // Sử dụng icon EyeIcon
            ) : (
              <icon.EyeSlashIcon className="w-6 h-6 text-black bg-black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: "#F4EDD3",
    marginTop: 10,
    height: 48,
  },
});

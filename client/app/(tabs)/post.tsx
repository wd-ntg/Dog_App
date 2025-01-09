import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
import images from "@/constants/images";
import { RadioButton, Checkbox } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Post = () => {
  const [gender, setGender] = useState("male");
  const [healthStatus, setHealthStatus] = useState("good");
  const [vaccinationStatus, setVaccinationStatus] = useState("vaccinated");
  const [personality, setPersonality] = useState("friendly");
  const [specialNotes, setSpecialNotes] = useState("");
  return (
    <SafeAreaView className="bg-white">
      <View className="px-4 py-6">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.ChevronLeftIcon size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.Bars3Icon size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center gap-2 w-full">
          <Image source={images.send_message_icon} className="w-12 h-12" />
          <Text className="text-2xl font-semibold">Đăng Tin</Text>
        </View>

        <View className="mt-4 flex justify-center items-center relative">
          <Image source={images.post1} className="h-48 w-[90%] rounded-xl" />
          <View className="absolute top-8 right-20 bg-white/40 p-2 rounded-full flex-row justify-center items-center gap-2">
            <Image source={images.upload_icon} className="w-8 h-8" />
            <Text>Tải lên</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: height * 0.55 }}
        >
          <View className="mt-8">
            <Text className="text-lg font-semibold mb-4">
              Thông tin bài đăng
            </Text>
            {/* Tên và tuổi */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên</Text>
                <TextInput  placeholder="Nhập tên" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tuổi</Text>
                <TextInput
                  
                  placeholder="Nhập tuổi"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Giới tính */}
            <Text style={styles.label}>Giới tính</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setGender(newValue)}
              value={gender}
            >
              <View style={styles.row}>
                <View style={styles.radioGroup}>
                  <RadioButton value="male" />
                  <Text>Đực</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="female" />
                  <Text>Cái</Text>
                </View>
              </View>
            </RadioButton.Group>

            {/* Tình trạng sức khỏe */}
            <Text style={styles.label}>Tình trạng sức khỏe</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setHealthStatus(newValue)}
              value={healthStatus}
            >
              <View style={styles.row}>
                <View style={styles.radioGroup}>
                  <RadioButton value="good" />
                  <Text>Tốt</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="fair" />
                  <Text>Khá</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="average" />
                  <Text>Trung bình</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="poor" />
                  <Text>Kém</Text>
                </View>
              </View>
            </RadioButton.Group>

            {/* Tiêm phòng */}
            <View>
              <Text style={styles.label}>Tiêm phòng</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setVaccinationStatus(newValue)}
                value={vaccinationStatus}
              >
                <View style={styles.row}>
                  <View style={styles.radioGroup}>
                    <RadioButton value="vaccinated" />
                    <Text>Đã tiêm phòng 6 mũi cơ bản</Text>
                  </View>
                  <View style={styles.radioGroup}>
                    <RadioButton value="not_vaccinated" />
                    <Text>Chưa tiêm phòng</Text>
                  </View>
                </View>
              </RadioButton.Group>
              <TouchableOpacity>
                <View className="flex-row w-[40%] bg-black/10 justify-center items-center gap-2 p-2 rounded-full mb-4">
                  <Image source={images.upload_icon_mc} className="w-8 h-8" />
                  <Text className="">Minh chứng</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Tính cách */}
            <Text style={styles.label}>Tính cách</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setPersonality(newValue)}
              value={personality}
            >
              <View style={styles.row}>
                <View style={styles.radioGroup}>
                  <RadioButton value="friendly" />
                  <Text>Hòa đồng</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="easygoing" />
                  <Text>Dễ gần</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="neutral" />
                  <Text>Trung tính</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="poor" />
                  <Text>Kém</Text>
                </View>
              </View>
            </RadioButton.Group>

            {/* Ghi chú đặc biệt */}
            <Text style={styles.label}>Ghi chú đặc biệt</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Nhập ghi chú..."
              multiline
              value={specialNotes}
              onChangeText={(text) => setSpecialNotes(text)}
            />
          </View>

          <View className="flex justify-center items-center mt-4">
            <TouchableOpacity>
              <View className="flex-row px-4  items-center bg-black/10 py-1 w-[40%] rounded-full">
                <Image source={images.upload_icon} className="w-12 h-12" />
                <Text>Tải lên</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
});

export default Post;

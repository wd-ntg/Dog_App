import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "@/constants/icon"; // Sử dụng thư viện icon
import images from "@/constants/images";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import CardAvatar from "@/common/components/CardAvatar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DetailAdop = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <View className="bg-black/20 rounded-full p-2 flex justify-center items-center">
              <Icon.ChevronLeftIcon size={32} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center w-full">
          <Text className="text-2xl font-semibold">Nhận nuôi</Text>
        </View>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={images.card_explore1} style={styles.image} />
          <TouchableOpacity className="bg-black/20" style={styles.imageIconContainer}>
            <Image source={images.zoom_in_icon} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ height: height * 0.5 }} showsVerticalScrollIndicator={false}>
          {/* Info Section */}
          <View style={styles.infoContainer}>
            {/* Pet Name and Owner */}
            <View style={styles.petInfo}>
              <View className="flex-row items-center w-full justify-between">
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold">Shiba</Text>
                    <Image
                      source={images.gender_female_icon}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-gray-500">2 tuổi • 2 ngày trước</Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <View className="p-[2px] border-[1px] rounded-lg border-[#FFBD73]">
                    <Image source={images.share_icon} className="w-6 h-6" />
                  </View>
                  <View className="p-[2px] border-[1px] rounded-lg border-[#FFBD73]">
                    <Image source={images.heart_icon} className="w-6 h-6" />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Chủ hiện tại</Text>
              <View style={{ width: 160, paddingLeft: 0 }}>
                <CardAvatar
                  image={images.card_explore1}
                  owner="Trường Giang"
                  title="Trường Giang"
                  time="2 phut truoc"
                />
              </View>
            </View>

            {/* Contact Info */}
            <View style={styles.contactInfo}>
              <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
              <Text>Số điện thoại: 0987654321</Text>
              <Text>Địa chỉ: 123 Trường Tân, Quận 9, Tp HCM</Text>
            </View>

            {/* Rules Section */}
            <View style={styles.rulesSection}>
              <Text style={styles.sectionTitle}>Điều luật</Text>
              <Text>
                Với mỗi cá nhân tham gia nhận nuôi đều phải đáp ứng đủ điều kiện
                cho phép. Chúng tôi luôn tạo điều kiện tốt nhất cho mỗi cá nhân
                tham gia nhận nuôi.
              </Text>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="flex justify-center items-center "
            style={styles.button}
          >
            <Text style={styles.buttonText}>Nhắn tin</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailAdop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    // backgroundColor: "#A78BFA",
    height: 100,
    paddingHorizontal: 24,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: height * 0.28,
    height: height * 0.28,
    borderRadius: (height * 0.28) / 2,
  },
  imageIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 24,
  },
  petInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  petDetails: {
    color: "#9D9D9D",
    fontSize: 14,
    marginTop: 4,
  },

  ownerDate: {
    fontSize: 12,
    color: "#9D9D9D",
  },
  contactInfo: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rulesSection: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#A78BFA",
    borderRadius: 100,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  svg: {
    position: "absolute",
    top: 0,
  },
});

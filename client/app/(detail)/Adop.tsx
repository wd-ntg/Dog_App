import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import Icon from "@/constants/icon";
import CardAvatar from "@/common/components/CardAvatar";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Adop = () => {
  const navigation = useNavigation();

  const post_news = [
    {
      id: 1,
      image: images.card_explore1,
      title: "Bai viet 1",
      owner: "Truong Giang",
      time: "2 phut truoc",
    },
    {
      id: 2,
      image: images.card_explore2,
      title: "Bai viet 2",
      owner: "Truong Giang",
      time: "2 phut truoc",
    },
    {
      id: 3,
      image: images.card_explore3,
      title: "Bai viet 3",
      owner: "Truong Giang",
      time: "2 phut truoc",
    },
    {
      id: 4,
      image: images.card_explore2,
      title: "Bai viet 2",
      owner: "Truong Giang",
      time: "2 phut truoc",
    },
    {
      id: 5,
      image: images.card_explore3,
      title: "Bai viet 3",
      owner: "Truong Giang",
      time: "2 phut truoc",
    },
  ];

  const images_card = [
    {
      id: 1,
      image: images.card_explore1,
    },
    {
      id: 2,
      image: images.card_explore2,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Image */}
      <View className="h-[40%] relative">
        <Image style={styles.imageContainer} source={images.adop_dog} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow"
        >
          <Icon.ChevronLeftIcon size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View
        style={styles.contentContainer}
        className="bg-white h-[64%]  rounded-t-3xl p-6 shadow-lg"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Pet Info */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold">Shiba</Text>
              {/* <Icon.GenderFemaleIcon size={24} color="orange" /> */}
              <Image source={images.gender_female_icon} className="w-6 h-6" />
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
          <Text className="text-gray-500">2 tuổi • 2 ngày trước</Text>
          <Text className="mt-4 text-gray-600 text-base">
            Dễ thương, thân thiện, vui vẻ hoà đồng với động loại. Dễ nuôi có
            xuất xứ từ nước Anh ở những năm 1918, là một loại được lai ...
            <Text className="text-[#FFBD73] font-semibold">Hiện thêm</Text>
          </Text>

          {/* Additional Info */}
          <View className="mt-6 space-y-4 gap-y-4">
            <View className="flex-row gap-6">
              <View className="flex-row gap-4 items-center">
                <Text className="font-medium">Tuổi</Text>
                <Text className=" border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                  8 tuổi
                </Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <Text className="font-medium">Tình trạng sức khỏe</Text>
                <Text className="border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                  Tốt
                </Text>
              </View>
            </View>
            <View className="flex-row gap-4">
              <Text className="font-medium">Tính cách</Text>
              <Text className="border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                Gần gủi với con người
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-sm text-[#9C9C9C] font-semibold">
              Đăng bởi
            </Text>
            <View className="flex-row items-center justify-between">
              <CardAvatar
                image={images.card_explore1}
                title="Truong Giang"
                time="2 phut truoc"
              />
              <View className="border-[1px] rounded-md p-1 border-[#FFBD73]">
                <Text className="text-sm font-semibold text-[#ffa53e]">Xem Profile</Text>
              </View>
              <View className="border-[1px] rounded-md p-1 border-[#8A73FF]">
                <Text className="text-sm font-semibold text-[#8A73FF]">Nhận nuôi</Text>
              </View>
            </View>
          </View>

          {/* Care Tips */}
          <Text className="mt-6 font-medium text-lg">Ghi chú đặc biệt</Text>
          <Text className="text-gray-700 mt-2">
            Dễ thương, thân thiện, vui vẻ hoà đồng với động loại. Dễ nuôi có
            xuất xứ từ nước Anh ở những năm 1918, là một loại được lai ...
          </Text>
          <Text className="mt-6 font-medium text-lg">Lý do hoãn chăm sóc</Text>
          <Text className="text-gray-700 mt-2">
            Không sắp xếp được thời gian chăm sóc cho em.
          </Text>

          {/* Related Posts */}
          <View className="flex-row gap-4 items-center mt-4">
            <Text className="text-lg font-semibold">Tình trạng tiêm phòng</Text>
            <Text className=" border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
              Đã tiêm 6 mũi cơ bản
            </Text>
          </View>
          <Text className="text-lg font-semibold mt-2">
            Hình ảnh minh chứng
          </Text>

          <View className="mt-4 flex-row items-center">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images_card.map((item) => (
                <Image
                  key={item.id}
                  source={item.image}
                  className="w-40 h-40 mr-4"
                />
              ))}
            </ScrollView>
          </View>

          <View className="mt-4 flex-row items-center space-x-4 gap-x-2"></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Adop;

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: height / 2.5,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

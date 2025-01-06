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

const DetailDog = () => {
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
                <Text className="font-medium">Tuổi thọ</Text>
                <Text className=" border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                  8-10 năm
                </Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <Text className="font-medium">Kích thước</Text>
                <Text className="border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                  X, XL
                </Text>
              </View>
            </View>
            <View className="flex-row gap-4">
              <Text className="font-medium">Bệnh thường gặp</Text>
              <Text className="border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                Cảm, sổ mũi, rụng lông,...
              </Text>
            </View>
          </View>

          {/* Care Tips */}
          <Text className="mt-6 font-medium text-lg">Chăm sóc khuyến nghị</Text>
          <Text className="text-gray-700 mt-2">
            Dễ thương, thân thiện, vui vẻ hoà đồng với động loại. Dễ nuôi có
            xuất xứ từ nước Anh ở những năm 1918, là một loại được lai ...
          </Text>

          {/* Related Posts */}
          <Text className="mt-6 font-medium text-lg">Bài đăng thích hợp</Text>
          <View className="mt-4 flex-row items-center space-x-4 gap-x-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {post_news.map((item, index) => (
                <CardAvatar key={index} {...item} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailDog;

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

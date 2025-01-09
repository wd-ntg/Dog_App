import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
import images from "@/constants/images";
import SaveItem from "@/common/components/SaveItem";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Save = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const save_item = [
    {
      id: 1,
      image: images.card_explore2,
      title: "Husky Hunter",
      time: "8:20 12/01/2025",
    },
    {
      id: 2,
      image: images.card_explore2,
      title: "Husky Hunter",
      time: "8:20 12/01/2025",
    },
    {
      id: 3,
      image: images.card_explore2,
      title: "Husky Hunter",
      time: "8:20 12/01/2025",
    },
    {
      id: 4,
      image: images.card_explore2,
      title: "Husky Hunter",
      time: "8:20 12/01/2025",
    },
  ];

  return (
    <SafeAreaView className="bg-white h-screen">
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
          <Image source={images.chart_icon} className="w-12 h-12" />
          <Text className="text-2xl font-semibold">Kho Lưu Trữ</Text>
        </View>

        <View className="mt-6 rounded-xl flex items-center justify-between">
          <View className="flex w-[90%] flex-row items-center border-[1px] rounded-full  p-1">
            <Icon.MagnifyingGlassIcon size={30} color="black" />
            <TextInput
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              className="w-[90%] ml-2"
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 0.7 }}>
          <View className="mt-8 px-6">
            <Text className="text-xl font-semibold mb-4">
              Bài đăng đã thích
            </Text>
            <View className="flex gap-3">
              {save_item.map((item, index) => {
                return (
                  <SaveItem
                    key={index}
                    image={item.image}
                    title={item.title}
                    time={item.time}
                  />
                );
              })}
            </View>
          </View>
          <View className="mt-8 px-6">
            <View className="flex-row items-center justify-between w-[98%]">
              <Text className="text-xl font-semibold mb-4">Nhận nuôi</Text>
              <Text className="text-base text-[#8A73FF] font-semibold mb-4">
                Hiện thêm
              </Text>
            </View>
            <View className="flex gap-3">
              {save_item.map((item, index) => {
                return (
                  <SaveItem
                    key={index}
                    image={item.image}
                    title={item.title}
                    time={item.time}
                    type="save"
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Save;

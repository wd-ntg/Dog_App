import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";

import Icon from "@/constants/icon";
import SaveItem from "@/common/components/SaveItem";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DisplayAi = () => {

  const data = [
    {
      id: 1,
      image: images.card_explore2,
      title: "Kết Nối Cảm Xúc",
      size: "1-2-3"
    },
    {
      id: 2,
      image: images.card_explore2,
      title: "Kết Nối Cảm Xúc",
      size: "1-2-3"
    },
    {
      id: 3,
      image: images.card_explore2,
      title: "Kết Nối Cảm Xúc",
      size: "1-2-3"
    },
  ];

  return (
    <SafeAreaView className="bg-white">
      <View className="px-4 py-6">
        {/* Header Icons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.ChevronLeftIcon size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.Bars3Icon size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center mt-8">
          <Image
            className="rounded-lg"
            style={{ width: width * 0.85, height: height * 0.3 }}
            source={images.card_explore2}
          />
          <View
            style={{ backgroundColor: "#FFBD73" }}
            className="absolute bottom-2 right-8  w-[280px] p-2 rounded-xl flex items-center"
          >
            <Text className="text-lg font-semibold">Upload On Camera</Text>
            <Text>
              Lưu ý: Hãy chụp cận cảnh chú chó của bạn để mang lại hiệu suất tốt
              hơn
            </Text>
          </View>
        </View>

        <View className="mt-8 px-8">
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 0.5 }}>
            <Text className="text-xl font-semibold mt-4">
              Tổng quan kết quả
            </Text>
            <View className="mt-4 gap-4">
              <Text>Kết quả gần nhất</Text>
              <View className="flex-row  items-center gap-2">
                <View className="p-[1px] bg-[#9E9E9E]/20  rounded-lg">
                  <Image className="w-6 h-6" source={images.dog_head_icon} />
                </View>
                <Text>Chihuahua</Text>
              </View>
              <View className="flex-row items-center gap-6  w-[90%]">
                <View className="flex-row items-center gap-2">
                  <Text>Kích thước</Text>
                  <Text>1-2</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text>Tuổi thọ</Text>
                  <Text>6-10 năm</Text>
                </View>
              </View>
              <View>
                <Text className="text-lg font-semibold">Chihuahua</Text>
                <Text>
                  Can đảm, cực kỳ sống động, kiêu hãnh và mạnh dạn, chúng luôn
                  bày tỏ tình cảm và cũng đòi hỏi sự chăm sóc của người chủ.
                </Text>
              </View>
              <View>
                <Text className="text-lg font-semibold">Cách chăm sóc</Text>
                <Text>
                  Can đảm, cực kỳ sống động, kiêu hãnh và mạnh dạn, chúng luôn
                  bày tỏ tình cảm và cũng đòi hỏi sự chăm sóc của người chủ.
                </Text>
              </View>
            </View>
            <View className="mt-4 gap-4">
              <Text>Liên quan</Text>
              {data.map((item, index) => (
                <SaveItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  time={item.size}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DisplayAi;

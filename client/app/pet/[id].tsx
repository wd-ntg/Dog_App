import React, { useState, useEffect } from "react";
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
import { useLocalSearchParams } from "expo-router";
import apiPet from "@/axios/pet";

const { width, height } = Dimensions.get("window");

const DetailPet = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const [dataPet, setDataPet] = useState(null);

  const handleFetchDog = async () => {
    try {
      const response = await apiPet.getDetailPet(id);


      if (response.success == true) {
        setDataPet(response.breed_info);
      } else {
        console.log("Error fetching category dogs from api");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchDog();
  }, []);

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
      {dataPet && (
        <>
          <View className="h-[40%] relative">
            <Image style={styles.imageContainer} source={{ uri: dataPet.image}} />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-4 left-4 bg-white p-2 rounded-full shadow"
            >
              <Icon.ChevronLeftIcon size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={styles.contentContainer}
            className="bg-white h-[64%]  rounded-t-3xl p-6 shadow-lg"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Pet Info */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-2xl font-bold">{dataPet.name_dog}</Text>
                  {/* <Icon.GenderFemaleIcon size={24} color="orange" /> */}
                  <Image
                    source={images.gender_female_icon}
                    className="w-6 h-6"
                  />
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
              <Text className="text-gray-500">{dataPet.age} tuổi • {dataPet.time}</Text>
              <Text className="mt-4 text-gray-600 text-base">
                {dataPet.des} ...
                <Text className="text-[#FFBD73] font-semibold">Hiện thêm</Text>
              </Text>

              {/* Additional Info */}
              <View className="mt-6 space-y-4 gap-y-4">
                <View className="flex gap-4">
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-medium">Tuổi thọ</Text>
                    <Text className=" border-[1px] border-[#FFBD73] text-orange-600 px-3 py-1 rounded-full">
                      {dataPet.age}
                    </Text>
                  </View>
                  <View className="flex gap-4">
                    <Text className="font-medium">Kích thước</Text>
                    <Text className=" text-orange-600   flex justify-center items-center w-full rounded-full">
                      {dataPet.size}
                    </Text>
                  </View>
                </View>
                <View className="flex gap-4">
                  <Text className="font-medium">Bệnh thường gặp</Text>
                  <Text className=" text-orange-600  rounded-full">
                    {dataPet.common_disease}
                  </Text>
                </View>
              </View>

              {/* Care Tips */}
              <Text className="mt-6 font-medium text-lg">
                Chăm sóc khuyến nghị
              </Text>
              <Text className="text-gray-700 mt-2">
                {dataPet.take_care}
              </Text>

              {/* Related Posts */}
              <Text className="mt-6 font-medium text-lg">
                Bài đăng thích hợp
              </Text>
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
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailPet;

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

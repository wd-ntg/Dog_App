import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
// import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { predictImage } from "@/axios/api";

import CardItem from "@/common/components/CardItem";
import CardNewNews from "@/common/components/CardNewNews";
import images from "@/constants/images";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Khám phá"); // State theo dõi tab được chọn

  const tabs = ["Khám phá", "Tin mới", "Tin của bạn"]; // Danh sách các tab

  const [activeCategory, setActiveCategory] = useState("Khám phá");

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const cards = [
    {
      id: 1,
      image: images.card_explore1,
      title: "Thân thiện",
      quantity: "52/120",
    },
    {
      id: 2,
      image: images.card_explore3,
      title: "Thông minh",
      quantity: "22/120",
    },
    {
      id: 3,
      image: images.card_explore4,
      title: "Dễ thương",
      quantity: "12/120",
    },
    {
      id: 4,
      image: images.card_explore2,
      title: "Đáng tin",
      quantity: "86/120",
    },
    {
      id: 5,
      image: images.card_explore5,
      title: "Giữ nhà",
      quantity: "86/120",
    },
    {
      id: 6,
      image: images.card_explore2,
      title: "Đáng tin",
      quantity: "86/120",
    },
  ];

  const cardNewNews = [
    {
      id: 1,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 2,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 3,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 4,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 5,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 6,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
  ];

  const handleImageSelection = async (pickerFunction: any) => {
    try {
      const result = await pickerFunction({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        setResult(null);

        setLoading(true);
        try {
          const response = await predictImage(imageUri);
          if (response) {
            setResult(response);
          }
        } catch (error) {
          Alert.alert("Error", "Failed to get a prediction. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process the image. Please try again.");
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="px-4 py-6">
        {/* Header Icons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.UserCircleIcon size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.Bars3Icon size={40} color="black" />
          </TouchableOpacity>
        </View>

        {/* Greeting Section */}
        <View className="mt-6 px-2">
          <View className="flex flex-row items-center">
            <Text className="text-2xl w-[14%]">Chào</Text>
            <Text className="text-2xl font-semibold ml-1">Giang</Text>
          </View>
          <View className="mt-2 flex flex-row items-center">
            <Text className="w-[44%]">Mừng bạn quay trở lại với</Text>
            <Text className="font-semibold text-blue-600">SKY'P</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-4 rounded-xl flex flex-row items-center justify-between">
          <View className="flex w-[90%] flex-row items-center border-[1px] rounded-3xl p-1">
            <Icon.MagnifyingGlassIcon size={30} color="black" />
            <TextInput
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              className="w-[90%] ml-2"
            />
          </View>
          <View>
            <Icon.CameraIcon
              onPress={() =>
                handleImageSelection(ImagePicker.launchImageLibraryAsync)
              }
              size={30}
              color="black"
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View className="flex-row justify-around mt-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setActiveTab(tab);
                setActiveCategory(tab);
              }}
              className="flex items-center pb-2"
            >
              <Text
                className={`text-lg ${
                  activeTab === tab ? "font-bold text-black" : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="h-1 w-10 bg-black mt-2 rounded-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          style={styles.scrollView}
          className="px-4"
        >
          {activeCategory === "Khám phá" &&
            cards.map((card) => (
              <CardItem
                key={card.id}
                image={card.image}
                title={card.title}
                quantity={card.quantity}
              />
            ))}
          {activeCategory === "Tin mới" &&
            cardNewNews.map((card) => (
              <CardNewNews
                key={card.id}
                image={card.image}
                title={card.title}
                owner={card.owner}
                time={card.time}
                like={card.like}
                character={card.character}
              />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
});

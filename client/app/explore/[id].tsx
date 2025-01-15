import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
import images from "@/constants/images";

import apiPet from "@/axios/pet";

import {
  useRouter,
  useGlobalSearchParams,
  useLocalSearchParams,
  router,
} from "expo-router";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DetailExplore = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const { id } = useLocalSearchParams();

  const [listCategoryDog, setListCategoryDog] = useState(null);

  const handleFetchDog = async () => {
    try {
      const response = await apiPet.getCategoryPets(id);

      if (response.success == true) {
        setListCategoryDog(response.data.breeds);
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



  return (
    <SafeAreaView>
      <View className="px-4 py-6">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.ChevronLeftIcon size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.MagnifyingGlassIcon size={35} color="black" />
          </TouchableOpacity>
        </View>

        {/* Tiêu đề */}
        <View className="mt-8 px-4">
          <Text className="text-2xl font-semibold">Khám phá</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between items-center mt-6 bg-gray-100 rounded-full w-[90%] self-center p-1">
          <TouchableOpacity
            onPress={() => setActiveTab("popular")}
            className={`flex-1 items-center justify-center py-3 rounded-tl-full rounded-bl-full ${activeTab === "popular" ? "bg-orange-300" : "bg-transparent"
              }`}
          >
            <Text
              className={`text-lg font-semibold ${activeTab === "popular" ? "text-white" : "text-gray-500"
                }`}
            >
              Độ phổ biến
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("latest")}
            className={`flex-1 items-center justify-center py-3 rounded-tr-full rounded-br-full ${activeTab === "latest" ? "bg-orange-300" : "bg-transparent"
              }`}
          >
            <Text
              className={`text-lg font-semibold ${activeTab === "latest" ? "text-white" : "text-gray-500"
                }`}
            >
              Cập nhật
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: height * 0.75 }}
          >
            <View style={styles.container}>
              {listCategoryDog &&
                listCategoryDog.length > 0 &&
                listCategoryDog.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => router.push(`/pet/${item.name_dog}`)}
                    key={index}
                    style={styles.card}
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />

                      <Text
                        className="absolute bottom-2 left-2 bg-white/40 px-2 py-1 rounded-full text-white"
                        style={styles.text}
                      >
                        {item.name_dog}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    width: "30%", // Chiều rộng của mỗi phần tử (1/3 màn hình)
    marginBottom: 10, // Khoảng cách giữa các dòng
    alignItems: "center", // Căn giữa nội dung trong mỗi thẻ
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    objectFit: "fill",
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailExplore;

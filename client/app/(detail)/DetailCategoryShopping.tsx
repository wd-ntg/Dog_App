import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";

import images from "@/constants/images";
import CardShopping from "@/common/components/CardShopping";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DetailCategoryShopping = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const card_shopping = [
    {
      id: 1,
      image: images.card_explore4,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 2,
      image: images.card_explore5,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 3,
      image: images.card_explore2,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 4,
      image: images.card_explore3,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 5,
      image: images.card_explore1,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 6,
      image: images.card_explore2,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
  ];
  return (
    <SafeAreaView className="flex-1 h-screen bg-white">
      <View className="px-4 py-6">
        {/* Header Icons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.ChevronLeftIcon size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.ShoppingCartIcon size={35} color="black" />
          </TouchableOpacity>
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

        <View className="mt-4 flex justify-center items-center">
          <Text className="text-2xl font-semibold my-4">Thực phẩm</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 0.7 }}>
            <View className="">
              <View className="" style={styles.imageGrid}>
                {card_shopping.map((item) => (
                  <CardShopping
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    money={item.quantity}
                    sell_quantity={item.sell_quantity}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailCategoryShopping;

const styles = StyleSheet.create({
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import images from "@/constants/images";

const CardAvatar = ({ image, owner, title, time }: any) => {
  return (
    <Card style={styles.card_container} className="w-full py-4" onPress={() => console.log("pressed")}>
      <View className="flex-row items-center gap-2">
        <Image source={image} style={styles.image_card} />
        <View className="">
          <Text className="text-base font-semibold">{title}</Text>
          <Text className=" text-gray-500 text-sm">{time}</Text>
        </View>
      </View>
    </Card>
  );
};

export default CardAvatar;

const styles = StyleSheet.create({
  card_container: {
    marginRight: 16,
    display: "flex",
    alignItems: "center",
  },
  image_container: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  image_card: {
    width: 50,
    height: 50,
    borderRadius: 25, // Nửa chiều rộng/chiều cao để tạo hình tròn
  },
});

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import images from "@/constants/images";

const CardItem = ({ image, title, quantity }: any) => {
  return (
    <Card className="w-full py-4" onPress={() => console.log("pressed")}>
      <Card.Image source={image} style={styles.image_card} />
      <View className="flex flex-row justify-between items-center mt-2 px-2">
        <Text className="text-lg font-semibold">{title}</Text>
        <View className="flex flex-row items-center">
          <Image
            className="w-4 h-4"
            source={images.dog_food}
            style={styles.image_container}
          />
          <Text className="ml-1 text-gray-500">{quantity}</Text>
        </View>
      </View>
    </Card>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  
  image_container: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  image_card: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    backgroundSize: "contain",
  },
});

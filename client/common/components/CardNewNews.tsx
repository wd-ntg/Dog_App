import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import images from "@/constants/images";
const CardNewNews = ({ like, time, title, image, character, owner }: any) => {
  return (
    <Card
      className="w-full py-4 flex flex-row"
      onPress={() => console.log("pressed")}
    >
      <Card.Image source={image} style={styles.image_card} />
      <View style={styles.absolute_view}>
        <Text className="text-[#FFBD73]">{like} Like</Text>
      </View>
      <View style={{marginLeft: 10}} className="flex  mt-2 px-2 justify-center">
        <View className="flex flex-row  items-center">
          <Text className="text-lg font-semibold">{title}</Text>
          <Text style={{ marginLeft: 10 }} className="text-sm ">{time}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className=" text-gray-500">{character}</Text>
        </View>
        <Text className=" text-gray-500 mt-4">{owner}</Text>
      </View>
    </Card>
  );
};

export default CardNewNews;

const styles = StyleSheet.create({
  image_container: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  image_card: {
    width: "50%",
    height: 120,
    resizeMode: "contain",
    backgroundSize: "contain",
    borderRadius: 20,
  },
  absolute_view: {
    position: "absolute",
    top: 20,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 2,
    borderRadius: 10,
  },
});

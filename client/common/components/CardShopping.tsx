import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import Icon from "@/constants/icon";

const CardShopping = ({ image, title, money, sell_quantity }: any) => {
  return (
    <Card style={styles.card_container} onPress={() => console.log("pressed")}>
      <Image
        style={[styles.image_card, { width: "100%", height: 150 }]}
        source={image}
      />
      <View className="mt-4">
        <View className="flex-row justify-between items-center">
          <Text style={{ color: "#3C3D37" }} className="text-lg font-semibold">
            {title}
          </Text>
          <Icon.HeartIcon size={20} color={"#FFBD73"} />
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text style={{ color: "#F39E60" }} className="">
            {money}
          </Text>

          <Text style={{ color: "#9D9D9D" }}>{sell_quantity} đã bán</Text>
        </View>
      </View>
    </Card>
  );
};

export default CardShopping;

const styles = StyleSheet.create({
  card_container: {
    flexBasis: "48%",
    margin: "1%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#FFBD73",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "hidden",
  },

  image_card: {
    resizeMode: "cover",
    borderRadius: 10,
  },
});

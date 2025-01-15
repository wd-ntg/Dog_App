import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import { useRouter } from "expo-router";
const CardImage = ({ image, width, height, urlParams }: any) => {
  const router = useRouter()
  return (
    <Card style={styles.card_container} onPress={() => router.push(`/product/${urlParams}`)}>
      <Image style={[styles.image_card, { width: width, height: height },]} source={{ uri: image }} />
    </Card>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  card_container: {
    flexBasis: "48%",
    margin: "1%",

  },
  image_card: {
    resizeMode: "cover",
    borderRadius: 20,
  },
});

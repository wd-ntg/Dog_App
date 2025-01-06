import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
const CardImage = ({ image, width, height }: any) => {
  return (
    <Card style={styles.card_container} onPress={() => console.log("pressed")}>
      <Image style={[styles.image_card, { width: width, height: height}, ]} source={image} />
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

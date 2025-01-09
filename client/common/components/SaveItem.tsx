import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "@/constants/icon";

const SaveItem = ({ image, title, time, type }: any) => {
  return (
    <TouchableOpacity>
      <View style={{backgroundColor: "#f0f0f0"}} className="flex-row items-center justify-between  rounded-lg py-2 px-4">
        <View className="flex flex-row items-center gap-2">
          <View>
            <Image
              source={image}
              style={{ width: 50, height: 50 }}
              className=" rounded-lg"
            />
          </View>
          <View>
            <Text className="font-semibold">{title}</Text>
            <Text style={{ color: "#9D9D9D", fontSize: 10 }}>{time}</Text>
          </View>
        </View>
        <View>
          {type === "save" ? (
            <Icon.BackspaceIcon size={30} color="#FFBD73" />
          ) : (
            <Icon.HeartIcon size={20} color={"#FFBD73"} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SaveItem;

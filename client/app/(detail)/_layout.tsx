import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "@/common/components/Loader";

const DetailLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Product"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Adop"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailDog"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailCategoryShopping"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailAdop"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailExplore"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default DetailLayout;

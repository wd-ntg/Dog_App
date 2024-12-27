import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "../../constants/icon";

const TabIcon = ({ icon, color, name, focused }: any) => {
  const IconComponent = icon;
  return (
    <View className="flex items-center justify-center mt-5">
      <IconComponent color={color} size={focused ? 28 : 24} />
      <Text
        className={`${
          focused ? "font-semibold" : "font-normal"
        } text-xs mt-1 w-full`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#79D7BE",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          height: 50,
          backgroundColor: "#fff",
          justifyContent: "center", 
          alignItems: "center", 
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }: any) => (
            <TabIcon
              icon={Icon.HomeIcon}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="adop"
        options={{
          title: "Nhận nuôi",
          headerShown: false,
          tabBarIcon: ({ color, focused }: any) => (
            <TabIcon
              icon={Icon.CubeTransparentIcon}
              name="Nhận nuôi"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Đăng tin",
          headerShown: false,
          tabBarIcon: ({ color, focused }: any) => (
            <TabIcon
              icon={Icon.ArrowUpOnSquareIcon}
              name="Đăng tin"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Mua sắm",
          headerShown: false,
          tabBarIcon: ({ color, focused }: any) => (
            <TabIcon
              icon={Icon.ShoppingCartIcon}
              name="Mua sắm"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

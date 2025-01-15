import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import Home from "./home";
import Post from "./post";
import Shopping from "./shopping";
import icon from "@/constants/icon"; // Sử dụng thư viện icon (ví dụ: Ionicons hoặc MaterialIcons)
import Save from "./Save";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Post") {
            iconName = focused ? "create" : "create-outline";
          } else if (route.name === "Shopping") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Save") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <icon.Icon name={iconName || "help-circle"} size={20} color={focused ? "white" : color} />
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text
              style={{
                color: focused ? "#FFBD73" : color,
                fontSize: 12,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarActiveTintColor: "#FFBD73", // Màu khi tab được chọn
        tabBarInactiveTintColor: "gray", // Màu khi tab không được chọn
        tabBarStyle: [styles.tabBarStyle, { borderTopWidth: 0, elevation: 0, shadowOpacity: 0 }]
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Shopping" component={Shopping} />
      <Tab.Screen name="Save" component={Save} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  focusedIconContainer: {
    backgroundColor: "#FFBD73",
  },
});

export default TabsLayout;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import Login from "@/app/(auth)/Login";
import Register from "@/app/(auth)/Register";
import TabsLayout from "@/app/(tabs)/_layout"; // Không có NavigationContainer ở đây
import Info from "./(auth)/Info";

const Stack = createStackNavigator();

const App = () => {
  const isAuthenticated = false; // Đặt giá trị từ Redux hoặc Context nếu cần.

  return (
    <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="Tabs" component={TabsLayout} />
          ) : (
            <>
            <Stack.Screen name="(auth)/Info" component={Info} />
              <Stack.Screen name="(auth)/Login" component={Login} />
              <Stack.Screen name="(auth)/Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
    </Provider>
  );
};

export default App;

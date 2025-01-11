import { Stack } from "expo-router";

const ExploreLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ExploreLayout;

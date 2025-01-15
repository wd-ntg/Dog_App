import { Stack } from "expo-router";

const ListProductLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
};

export default ListProductLayout;

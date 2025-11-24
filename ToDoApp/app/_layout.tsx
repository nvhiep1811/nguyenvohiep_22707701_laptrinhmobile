import { store } from "@/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="edit/[id]" options={{ title: "Edit Todo"}} />
      </Stack>
    </Provider>;
}

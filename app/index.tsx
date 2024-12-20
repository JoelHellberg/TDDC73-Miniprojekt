import { Text, View } from "react-native";
import Carousel from "@/components/carousel";
import PasswordStrengthMeter from "@/components/passwordStrengthMeter";

export default function Index() {
  return (
    <View
      style={{/*
        flex: 1,
        justifyContent: "center",
        alignItems: "center",*/
      }}
    >
      <Text>"Carousel" SDK testas nedanför:</Text>
      <Carousel/>
      <PasswordStrengthMeter/>
    </View>
  );
}

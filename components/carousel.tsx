import { Text, View, Image, StyleSheet } from "react-native";

export default function Carousel() {
  return (
    <View>
      <Image
       
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
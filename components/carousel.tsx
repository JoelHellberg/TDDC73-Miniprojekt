import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Carousel() {

  const IMAGES = [
    {
      url : 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      url : 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      url : 'https://reactnative.dev/img/tiny_logo.png'
    },
  ];

  return (
    <View>
      <FlatList
      horizontal
      data={IMAGES}
      renderItem={({item}) => (
        <TouchableOpacity>
          <Image
        style={styles.tinyLogo}
        source={{ uri: item.url,}}/>
        </TouchableOpacity>
    )}/>
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
import { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

type displayedImage = {
  posInIndex: number,
  distanceFromCenter: number,
  url: string
};

export default function Carousel() {
  const IMAGES = ['https://reactnative.dev/img/tiny_logo.png',

    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png',

    'https://reactnative.dev/img/tiny_logo.png',

    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png',

    'https://reactnative.dev/img/tiny_logo.png',

    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png']

  const [displayedImages, changeDisplayedImages] = useState<displayedImage[]>([]);
  const imagesOnDisplay = 5;

  const rotateCarousel = (input: number) => {
    let images: displayedImage[] = [];
    const imagesOnEachSide = (imagesOnDisplay - 1) / 2;

    for (let i = 0; i < imagesOnDisplay; i++) {

      const distanceFromCenter = imagesOnEachSide - i;
      let posInIndex = input - distanceFromCenter;

      if (posInIndex < 0) {
        posInIndex = posInIndex + IMAGES.length;
      } else if (posInIndex > IMAGES.length - 1) {
        posInIndex = posInIndex - IMAGES.length;
      }

      images.push(
        {
          posInIndex: posInIndex,
          distanceFromCenter: distanceFromCenter,
          url: IMAGES[posInIndex]
        }
      )
    }

    changeDisplayedImages(images);
  };

  // Use useEffect to call the function once on the component mount
  useEffect(() => {
    const centerImageIndex = Math.round((imagesOnDisplay) / 2) - 1;
    rotateCarousel(centerImageIndex); // Example: calling the function with input 0
  }, []); // Empty dependency array to run only on mount



  return (
    <View style={{ overflow: 'visible' }}>
      <FlatList
        horizontal
        data={displayedImages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginHorizontal: item.distanceFromCenter !== 0 ? 0 : -10,
              marginVertical: item.distanceFromCenter !== 0 ? 4 : -4,
              zIndex: -Math.abs(item.distanceFromCenter),
            }}
            onPress={() => rotateCarousel(item.posInIndex)}
          >
            <Image
              style={styles.tinyLogo}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        )}
      />
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
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

type displayedImage = {
  posInIndex: number,
  distanceFromCenter: number,
  url: string
};

type urls = string[];

type CarouselProps = {
  IMAGES: urls;
  orientation?: string; // Make it optional
  imagesOnDisplay?: number
};

export default function Carousel({ IMAGES, orientation, imagesOnDisplay = 5 }:
  CarouselProps) {

  const [displayedImages, changeDisplayedImages] = useState<displayedImage[]>([]);

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
    <View style={{ overflow: 'hidden' }}>
      <FlatList
        horizontal
        data={displayedImages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              zIndex: -Math.abs(item.distanceFromCenter),
            }}
            onPress={() => rotateCarousel(item.posInIndex)}
          >
            <Image
              style={[
                item.distanceFromCenter == 0 ?
                  orientation == "landscape" ? styles.focusedLandscapeImage
                    : orientation == "portrait" ? styles.focusedPortraitImage
                      : styles.focusedSquareImage
                  : [
                    orientation == "landscape" ? styles.landscapeImage
                      : orientation == "portrait" ? styles.portraitImage
                        : styles.squareImage,
                    { top: 10 }],
                { borderRadius: 5, margin: 3 }]

              }
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

  focusedSquareImage: {
    width: 70,
    height: 70,
  },
  squareImage: {
    width: 50,
    height: 50,
  },

  focusedLandscapeImage: {
    width: 120,
    height: 70,
  },
  landscapeImage: {
    width: 100,
    height: 50,
  },

  focusedPortraitImage: {
    width: 70,
    height: 120,
  },
  portraitImage: {
    width: 50,
    height: 100,
  },
});
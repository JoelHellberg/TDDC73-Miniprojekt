import { useState, useEffect } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

type displayedImage = {
  posInIndex: number,
  distanceFromCenter: number,
  url: string
};

type CarouselProps = {
  IMAGES: string[];
  // '?' makes the properties optional
  orientation?: string;
  imagesOnEachSide?: number;
  imageWidth?: number;
};

export default function Carousel({ IMAGES, orientation, imagesOnEachSide = 2, imageWidth = 50 }:
  CarouselProps) {
  let imagesOnDisplay = imagesOnEachSide * 2 + 1;
  const [displayedImages, changeDisplayedImages] = useState<displayedImage[]>([]);

  // Calculate the image height based on the orientation & width
  let imageHeight = imageWidth
  if (orientation == "landscape") {
    imageHeight = imageWidth / 2;
  }
  else if (orientation == "portrait") {
    imageHeight = imageWidth * 2;
  }
  // Determine the dimensions of the focused image based on 
  // the dimensions of the non-focused images
  const focusedImageWidth = imageWidth + imageWidth / 3;
  const focusedImageHeight = imageHeight + imageHeight / 3;
  // Calculate how far down to move the non-centered images to
  // vertically align with the focused image
  const nonFocusedHeightMargin = (focusedImageHeight - imageHeight) / 2;

  // Function that repositions all the images on display
  const rotateCarousel = (input: number) => {
    let images: displayedImage[] = [];

    // Redefine the images on display (starting from the left)
    for (let i = 0; i < imagesOnDisplay; i++) {

      const distanceFromCenter = imagesOnEachSide - i;
      let posInIndex = input - distanceFromCenter;

      // If the image pos exceeds the array, start from the beginning
      if (posInIndex > IMAGES.length - 1) {
        posInIndex = posInIndex - IMAGES.length;
      }
      // If the image pos is lower than 0, start from the end and go back
      else if (posInIndex < 0) {
        posInIndex = posInIndex + IMAGES.length;
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
    // Put the image in the middle of the array as the starting center image
    const centerImageIndex = Math.round((IMAGES.length) / 2) - 1;
    rotateCarousel(centerImageIndex);
  }, []);


  return (
    <View style={{ overflow: 'hidden' }}>
      {/* Position all images in a 'FlatList' */}
      <FlatList
        horizontal
        data={displayedImages}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => rotateCarousel(item.posInIndex)}>
            {/* Each Individual Image */}
            <Image
              style={[
                item.distanceFromCenter == 0 ?
                  // Apply different styles for the focused image and non-focused images
                  { width: focusedImageWidth, height: focusedImageHeight }
                  : { width: imageWidth, height: imageHeight, top: nonFocusedHeightMargin },
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
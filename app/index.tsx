import { View } from "react-native";
import Carousel from "@/components/carousel";
import PasswordStrengthMeter from "@/components/passwordStrengthMeter";

export default function Index() {
  const IMAGES = [
    'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649',
    'https://th.bing.com/th/id/OIG1.wQ7nqzXG6LLji1s3MrOP',
    'https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg',

    'https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg',
    'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://pixlr.com/images/generator/image-editor.webp',
    'https://media.springernature.com/lw703/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg',
    'https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg',

    'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Grand-Vitara/10505/1689588262879/front-left-side-47.jpg?imwidth=420&impolicy=resize',
  ];

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <h2>Carousel</h2>
        <Carousel
          IMAGES={IMAGES}
          orientation="portrait"
          imagesOnEachSide={3}
          imageWidth={50}
        />
      </View>

      <PasswordStrengthMeter />
    </View>
  );
}

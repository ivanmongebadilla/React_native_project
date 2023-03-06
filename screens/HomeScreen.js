import { View, Text, Linking, ImageBackground } from "react-native";
import { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "../features/CarouselCardItem";
import { newData } from "../dummydata/carouselData";
import { SafeAreaView, StyleSheet } from 'react-native'
import { useSelector } from "react-redux";
import bgImg from '../images/background-img2.jpg'


const HomeScreen = () => {
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    const news = useSelector((state) => state.news) 

  if (news.isLoading === false) {
    //console.log(news)
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ImageBackground
            source={bgImg}
            resizeMode="cover"
            style={styles.bgImage}
          >
            <View>
              <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={news.newsArray}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
              />
              <Pagination
                  dotsLength={news.newsArray.length}
                  activeDotIndex={index}
                  carouselRef={isCarousel}
                  dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  tappableDots={true}
              />
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bgImage: { 
      flex: 1,
      justifyContent: 'center',
    }
  });

export default HomeScreen;
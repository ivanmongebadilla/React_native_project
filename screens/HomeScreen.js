import { View, Text, Linking } from "react-native";
import { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "../features/CarouselCardItem";
import { newData } from "../dummydata/carouselData";
import { SafeAreaView, StyleSheet } from 'react-native'
import { useSelector } from "react-redux";


const HomeScreen = () => {
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    const news = useSelector((state) => state.news) 

  if (news.isLoading === false) {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50
    },
  });

export default HomeScreen;
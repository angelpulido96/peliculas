import React from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';

const { width: windowWid } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  if( isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color='red' size={100}/>
      </View>
    )
  }

  return (

    <ScrollView>

    <View style={{marginTop: top + 20}}>
        
        {/* Carousel Principal */}

        <View style={{ height: 440 }}>
          <Carousel
            data={ nowPlaying }
            renderItem={ ({ item }: any) => <MoviePoster movie={ item }/> }
            sliderWidth={ windowWid }
            itemWidth={ 300 }
            inactiveSlideOpacity={0.9}
          />  
        </View>

        <HorizontalSlider title='Populares' movies={ popular }/>
        <HorizontalSlider title='Top Rated' movies={ topRated }/>
        <HorizontalSlider title='upComing' movies={ upComing }/>


    </View>

    </ScrollView>
  )
}

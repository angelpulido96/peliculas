import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation'

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';


const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`

  const { isLoading, movieFull, cast } = useMovieDetails( movie.id )


  return (
    <ScrollView>
      <View style={ styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={ styles.posterImage}
          />
        </View>
      </View>
      
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{ movie.original_title }</Text>
        <Text style={styles.title}>{ movie.title }</Text>
      </View>
      
        {
          isLoading
            ? <ActivityIndicator size={ 35 } color='grey' style={{ marginTop: 20}}/>
            : <MovieDetails movieFull={ movieFull! } cast={ cast }/>
        }

        {/* Boton para cerrar */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.pop()}
        >
          <Icon
            color='white'
            name='arrow-back-outline'
            size={ 60 }
          />

        </TouchableOpacity>
      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  imageContainer: {
    // backgroundColor: 'red',
    overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 10,

    borderBottomEndRadius: 25,
    
  },
  imageBorder: {
    flex: 1,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    elevation: 11,
    top: 30,
    left: 5
  }
})
import React, { useState, useEffect,} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Text} from 'react-native'

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
  KM,
  Raio
} from './style';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import BarberItem from '../../components/BarberItem';

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location'

import { SearchByLocation } from '../../Api'

export default () => {

  const navigation = useNavigation();
  const [raio, setRaio] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  
  const getUserLocation = async () => {
   
    let { status } = await requestForegroundPermissionsAsync()

    if ( status === 'granted' ) {

      setLoading(true);
      setList([]);

      const info = await getCurrentPositionAsync()
      
      setCoords(info.coords);
      
      await getBarbers();
      
    }
    
  }

  const getBarbers = async () => {

    setLoading(true);
    setList([]);

    let latClient = null;
    let lonClient = null;
    
    if (coords) {
      latClient = coords.latitude;
      lonClient = coords.longitude;
    }
    
    if (!raio) {

      alert("Adicione um raio de busca!")
      
    }

    const res = await SearchByLocation(raio, latClient, lonClient)
    
    if (res.data) {
      
      const dataFilter = res.data.data.filter((data) => {

        return data

      })
      setList(dataFilter)

    } else {

      alert("erro")

    }
    
    setLoading(false)
  }

  return (
    <Container>
      <Scroller>

        <HeaderArea>
          <HeaderTitle numberOfLiner={2}>Encontre o seu Salão favorito!</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>
        
        <Raio>Raio</Raio>

        <LocationArea >
          
          <LocationInput
            keyboardType = 'numeric'
            placeholder="Digite um raio de busca?"
            placeholderTextColor="#fff"
            value={raio}
            onChangeText={t => setRaio(t)}
            //onEndEditing={changeLocationSearch}
          />

          {
            raio &&
            <KM>KM</KM>
          }
          
          <LocationFinder onPress={getUserLocation}>
            <MyLocationIcon width="30" height="30" fill="#fff"/>
          </LocationFinder>
        </LocationArea>

        {loading &&
          <LoadingIcon size="large" color="#fff" />
        }

        
        <ListArea>

          {list.map((item, key) => (
            
            <BarberItem key={key} data={item} />
            
          ))}

        </ListArea>
        

      </Scroller>
    </Container>
  )
}





















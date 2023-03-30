import React, { useEffect,} from 'react';
import { Container, LoadingIcon } from './style';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

export default () => {

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {

      } else {
        navigation.navigate('SignIn');
      }
    }
    checkToken();
  }, []);

  return (
      <Container>
        <LoadingIcon size="large" color="#fff" />
      </Container>
  )
}





















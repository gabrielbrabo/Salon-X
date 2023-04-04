import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './style';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import { checkToken } from '../../Api'

import Logo from '../../assets/barber'

import { UserContext } from '../../contexts/UserContext';

export default () => {

  const navigation = useNavigation();

  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {

    const CheckToken = async () => {

      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      
      if (token) {

        const res = await checkToken(id, token)

        if (res.data) {

          await AsyncStorage.setItem('id', res.data.id);
          await AsyncStorage.setItem('token', res.data.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              name: res.data.name,
              avatar: res.data.avatar,
              email: res.data.email
            },
          });

          navigation.reset({
            routes: [
              {
                name: 'SignIn',
              },
            ],
          });

        }

      } else {
        navigation.navigate('SignIn');
      }

    }

    CheckToken();

  }, []);

  return (
    <Container>
      <Logo width="100%" height="160" />
      <LoadingIcon size="large" color="#fff" />
    </Container>
  )
}





















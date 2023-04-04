import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {register } from '../../Api'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './style';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {

  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const SignClick = async () => {

    if (name != '' && email != '' && password != '' && confirmpassword != '') {
      
      const res = await register(
        name, 
        email,
        password, 
        confirmpassword
      )

      if(res.data.token){

        await AsyncStorage.setItem('id', res.data.id);
        await AsyncStorage.setItem('token', res.data.token);

        userDispatch({
          type:'setAvatar',
          payload:{
            name: res.data.name,
            avatar: res.data.avatar,
            email: res.data.email
          }
        });

        navigation.reset({
          routes:[{name:'SignIn'}]
        });

      }
    } else { 
      alert("Por favor, preencha os campos!")
    }
  }

  const MessageButtomclick = () => {
    navigation.reset({
      routes: [{ name: 'MainTab' }]
    });
  }
  
  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={t => setName(t)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={t => setEmail(t)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={t => setPassword(t)}
          password={true}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Confirme sua senha"
          value={confirmpassword}
          onChangeText={t => setConfirmPassword(t)}
          password={true}
        />

        <CustomButton onPress={SignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={MessageButtomclick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça o login!</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}





















import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSession } from '../../Api'
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


export default () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const SignClick = async () => {
    if (email != '' && password != '') {
      const res = await createSession(email, password)

      if (res.data.token) {
        alert ('Deu Certo!')
      } else {
        alert('E-mail e/ou senha inválidos!')
      }
    } else {
      alert('Preencha os campos!')
    }
    
  }

  const MessageButtomclick = () => {
    navigation.reset({
      routes: [{ name: 'SignUp' }]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
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

        <CustomButton onPress={SignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={MessageButtomclick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se!</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}





















import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #63C2D1;
  flex: 1;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  width: 260px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;
export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px; 
`;
export const LocationArea = styled.View`
  background: #4EADBE;
  display: flex;
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  margin-top: 5px;
  margin-bottom: 10px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #fff;
`;
export const LocationFinder = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  margin-left: 50px;
  width: 24px;
  height: 24px;
`;
export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
export const ListArea = styled.View`
  margin-top: 30px;
`;
export const KM = styled.Text`
  display: flex;
  background-color: transparent;
  font-size: 20px;
  justify-content: center;
`;
export const Raio = styled.Text`
  margin-top: 45px;
  margin-left: 30px;
  font-size: 20px;
`;


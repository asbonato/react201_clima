import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Keyboard } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {
  const endPoint = 
    "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const apiKey = "e4fa85089aa030223c7aaf9c79a72009";
  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obtemPrevisoes = () => {
    setPrevisoes([]);
    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      setPrevisoes(dados["list"])
    });
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma Cidade"
          onChangeText={capturarCidade}
          value={cidade}
        />
        <Button
          title="Ok"
          onPress={obtemPrevisoes}
        />
      </View>
      <View>
        <FlatList
          data={previsoes}
          renderItem={
            previsao => (
              <PrevisaoItem previsao={previsao}/>
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  nomeCidade:{
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  }
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const AcelerometroScreen = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  // Função para se inscrever nos dados do acelerômetro
  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  // Função para parar a leitura dos dados
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // Garante que o sensor pare de ler quando a tela for fechada
  useEffect(() => {
    return () => unsubscribe();
  }, []);

  const toggleSubscription = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medidor de Aceleração</Text>
      <Text style={styles.infoText}>Incline seu celular para ver os valores mudarem!</Text>
      
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Eixo X:</Text>
        <Text style={styles.dataValue}>{data.x.toFixed(2)} g</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Eixo Y:</Text>
        <Text style={styles.dataValue}>{data.y.toFixed(2)} g</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Eixo Z:</Text>
        <Text style={styles.dataValue}>{data.z.toFixed(2)} g</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={toggleSubscription}
      >
        <Text style={styles.buttonText}>
          {subscription ? 'Parar Leitura' : 'Iniciar Leitura'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dataLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dataValue: {
    fontSize: 18,
    color: '#007bff',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AcelerometroScreen;
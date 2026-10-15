import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Svg, { Line, Circle } from 'react-native-svg';

const GravityScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [angle, setAngle] = useState(0);

  // Inicia a leitura do acelerômetro
  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  // Para a leitura do acelerômetro
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    // Garante que a leitura pare quando a tela for fechada
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // A cada atualização do acelerômetro, calcula o ângulo do pêndulo
    // Math.atan2 é usado para converter as coordenadas X e Y em um ângulo em radianos
const newAngle = Math.atan2(-data.x, data.y);
    setAngle(newAngle);
  }, [data]);

  const toggleSubscription = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

  // Funções para desenhar o pêndulo
  const pendulumLength = 200;
  const pendulumX = 150 + pendulumLength * Math.sin(angle);
  const pendulumY = 100 + pendulumLength * Math.cos(angle);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Pêndulo</Text>
      <Text style={styles.infoText}>Incline seu celular para ver o pêndulo balançar!</Text>

      <View style={styles.pendulumContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 300 400">
          <Line
            x1="150"
            y1="100"
            x2={pendulumX}
            y2={pendulumY}
            stroke="#000"
            strokeWidth="2"
          />
          <Circle
            cx={pendulumX}
            cy={pendulumY}
            r="20"
            fill="#3498db"
          />
        </Svg>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleSubscription}
      >
        <Text style={styles.buttonText}>
          {subscription ? 'Parar Simulação' : 'Iniciar Simulação'}
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
    padding: 20,
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
  pendulumContainer: {
    width: 300,
    height: 400,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GravityScreen;
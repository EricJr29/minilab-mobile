import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Svg, { Polyline } from 'react-native-svg';

const FrequenciaScreen = () => {
  const [rate, setRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/base_tone.wav'),
          { shouldPlay: false, isLooping: true }
        );
        soundRef.current = sound;
        await sound.setRateAsync(rate, false);
      } catch (error) {
        console.error('Erro ao configurar o áudio:', error);
      }
    };
    setupAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const updatePlayback = async () => {
      if (soundRef.current) {
        if (isPlaying) {
          await soundRef.current.playAsync();
        } else {
          await soundRef.current.pauseAsync();
        }
      }
    };
    updatePlayback();
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const updateRate = async (value) => {
    setRate(value);
    if (soundRef.current) {
      await soundRef.current.setRateAsync(value, false);
    }
  };

  // Esta é a nova função que calcula os pontos para desenhar a onda sonora
  const getWavePoints = () => {
    const points = [];
    const amplitude = 50; // Altura da onda
    const waveLength = 200 / rate; // Muda o "comprimento" da onda com a taxa
    
    for (let x = 0; x < 200; x++) {
      const y = 50 + amplitude * Math.sin((x / waveLength) * Math.PI * 2);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const renderWaveform = () => (
    <View style={styles.waveContainer}>
      <Svg height="100%" width="100%">
        <Polyline
          points={getWavePoints()}
          fill="none"
          stroke="#007bff"
          strokeWidth="3"
        />
      </Svg>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerador de Frequência Sonora</Text>
      
      <Text style={styles.frequencyText}>Taxa de Reprodução: {rate.toFixed(2)}x</Text>
      
      <Slider
        style={styles.slider}
        minimumValue={0.5}
        maximumValue={2.0}
        step={0.01}
        value={rate}
        onValueChange={updateRate}
        minimumTrackTintColor="#007bff"
        maximumTrackTintColor="#a9a9a9"
        thumbTintColor="#007bff"
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={togglePlayback}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? 'Parar Som' : 'Tocar Som'}
        </Text>
      </TouchableOpacity>

      {renderWaveform()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  frequencyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  slider: {
    width: '90%',
    height: 40,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waveContainer: {
    marginTop: 40,
    width: '90%',
    height: 150,
    backgroundColor: '#fff', // Fundo branco para a onda
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
});

export default FrequenciaScreen;
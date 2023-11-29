import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Home({ navigation }) {
  const handleNavigation = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Auto-Peças</Text>
        <Text style={styles.headerDescription}>Só Peça de Qualidade!</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <CustomButton onPress={() => handleNavigation('Usuários')} text="Usuários" />
        <CustomButton onPress={() => handleNavigation('Funcionários')} text="Funcionários" />
        <CustomButton onPress={() => handleNavigation('Reservas')} text="Reservas" />
        <CustomButton onPress={() => handleNavigation('Cardápio')} text="Cardápio" />
        <CustomButton onPress={() => handleNavigation('Avaliações')} text="Avaliações" />
      </View>

      <Text style={styles.headerDescription}>Agradecemos a sua preferência por este estabelecimento!</Text>
    </View>
  );
}

const CustomButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', 
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'yellow', 
    marginBottom: 10,
    textAlign: 'center', 
  },
  headerDescription: {
    fontSize: 20,
    color: 'black', 
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
    paddingVertical: 15,
    marginBottom: 25,
    backgroundColor: 'yellow', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 25, 
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Person {
  constructor(ID, name, fname, Reg, Age, Semestor) {
    this.ID = ID;
    this.name = name;
    this.fname = fname;
    this.Reg = Reg;
    this.Age = Age;
    this.Semestor = Semestor;
  }
}

const storeObjectData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@mahad', jsonValue);
  } catch (e) {
    console.log(e); // saving error
  }
};

const getObjectData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@mahad');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e); // error reading value
    return null;
  }
};

const App = () => {
  const [storedData, setStoredData] = useState(null);

  const retrieveData = async () => {
    const data = await getObjectData();
    setStoredData(data);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Store Class object"
        onPress={() =>
          storeObjectData(new Person(613, "Mahad", "Wajid", "FA21-BSE_057", 21, 5))
        }
      />
      <Button title="Get object" onPress={retrieveData} />

      {storedData && (
        <View style={styles.dataContainer}>
          <Text>ID: {storedData.ID}</Text>
          <Text>Name: {storedData.name}</Text>
          <Text>Father Name: {storedData.fname}</Text>
          <Text>Registration: {storedData.Reg}</Text>
          <Text>Age: {storedData.Age}</Text>
          <Text>Semester: {storedData.Semestor}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 10,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#6495ED',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;

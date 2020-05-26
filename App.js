import * as React from 'react';
import { Button, View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  const DATA = [
    {
      title: "ד",
      data: ["דמקה"].sort()
    },
    {
      title: "ר",
      data: ["רמיקוב"].sort()
    },
    {
      title: "ש",
      data: ["שחמט", "שש-בש"].sort()
    },
    {
      title: "ט",
      data: ["טאקי"].sort()
    }
  ].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>בחר משחק:{'\n'}</Text>
      <SectionList
        sections={DATA}
        renderItem={({ item }) =>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { itemId: { item } })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{item}</Text>
            </View>
          </TouchableOpacity >
        }
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.sectionHeader}>חוקי המשחק {itemId['item']}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Rulz')}>
        <View style={styles.button}>
          <Text style={styles.back}>חזור לעמוד הראשי</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Rulz">
        <Stack.Screen name="Rulz" component={HomeScreen} options={{
          title: 'Rulz',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    width: 260,
    marginBottom: 2,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
    
  back: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
})

export default App;
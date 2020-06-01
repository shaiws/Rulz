import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




function HomeScreen({ navigation, route }) {
  const DATA = route.params
  var realData = []
  for (let index = 0; index < Object.keys(DATA).length; index++) {
    const element = DATA[index];
    realData.push(element);
  }
  realData.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }}
        source={{
          uri: 'https://i2.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2015/05/iStock-520659161.jpg?fit=1183%2C887&ssl=1'
        }}>

        <Text style={styles.sectionHeader}>בחר משחק:</Text>
        <FlatList
          horizontal
          data={realData}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <View >
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', { game: item })}
                style={{ flex: 1 }} >
                <Image style={styles.image} source={{ uri: item.image }} />
              </TouchableOpacity >
              <Text style={styles.gameTitle}>{item.title}</Text>

            </View>
          }
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { game } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>חוקי המשחק {game['title']}</Text>
      <ScrollView>
        <Text style={styles.rules}>חוקים: {game['rules']}</Text>
      </ScrollView>
      <Text style={styles.credit}>קרדיט: {game['author']}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Rulz')}>
        <View style={styles.back}>
          <Text >חזור לעמוד הראשי</Text>
        </View>
      </TouchableOpacity>
    </View >

  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], show: false };
  }
  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    await fetch('https://gist.githubusercontent.com/shaiws/4657530d33ba05ff7986ebbcfc6055cb/raw/ba656d67f368451cf3c3303dc878ac0e3ff6f341/games.json')
      .then((response) => response.json())
      .then((json) => { this.setState({ data: json['games'] }); })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const Stack = createStackNavigator();

    if (this.state.data.length > 0) {
      return (
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Rulz">
            <Stack.Screen
              name="Rulz"
              initialParams={this.state.data}
              component={HomeScreen}
              options={{
                title: 'Rulz',
                headerStyle: {
                  backgroundColor: '#2196F3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  alignSelf: 'center'
                },
              }} />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                title: "חוקי המשחק",
                headerStyle: {
                  backgroundColor: '#2196F3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} />
          </Stack.Navigator>
        </ NavigationContainer>
      );
    }

    else {
      return (
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 29,
              alignSelf: 'center',
            }}>
            הנתונים נטענים...
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 29,
              alignSelf: 'center',
              textDecorationLine: 'none',
            }}>
          </Text>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeader: {
    backgroundColor: "yellow",
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    backgroundColor: "green",
    fontWeight: 'bold',
  },
  rules: {
    backgroundColor: "magenta",
    fontSize: 16,
  },
  credit: {
    backgroundColor: "red",
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameTitle: {
    backgroundColor: "pink",
    fontSize: 16,
  },
  button: {
    width: 260,
    backgroundColor: '#2196F3'
  },
  back: {
    backgroundColor: '#2196F3'

  },
  buttonText: {
    flex: 1,
    color: 'white'
  },
  image: {
    marginTop: 50,
    marginRight: 50,
    marginLeft: 50,
    marginEnd: 50,
    marginStart: 50,
    borderRadius: 50,
    width: 300,
    height: 400,
    backgroundColor: "blue",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }

})

import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './styles';




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, data: [], searchValue: ''
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ loading: true });
    fetch('https://gist.githubusercontent.com/shaiws/4657530d33ba05ff7986ebbcfc6055cb/raw/3db4effe8459a8458ab150ddf141dd8063b0ca2d/games.json')
      .then((response) => response.json())
      .then((json) => { this.setState({ data: json['games'], loading: false }); })
      .catch((error) => {
        console.error(error);
      });


  }
  searchFilterFunction = text => {
    this.setState({ searchValue: text }, () => {
      console.log(this.state.searchValue, 'search');

    })
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData }, () => {
      console.log(this.state.data);
    });
  };


  HomeScreen = ({ route, navigation }) => {
    const sortedData = this.state.data.sort((a, b) => a.title.localeCompare(b.title));
    this.arrayholder = sortedData;
    this.setState({ data: sortedData });
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.09 }}
          source={{
            uri: 'https://i2.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2015/05/iStock-520659161.jpg?fit=1183%2C887&ssl=1'
          }}>
          <Text style={styles.sectionHeader}>בחר משחק:</Text>
          <FlatList
            data={sortedData}
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            extraData={route.params}
            renderItem={({ item }) =>
              <View style={{ flex: 1 }}>
                <Text key={item.id} style={styles.gameTitle}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', { game: item })}
                  style={styles.gameCard}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                </TouchableOpacity >
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </ImageBackground>
      </View>
    );
  }

  DetailsScreen = ({ route, navigation }) => {
    const { game } = route.params;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.09 }}
          source={{
            uri: game['image']
          }}>
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
        </ImageBackground>

      </View >

    );
  }
  render() {
    const Stack = createStackNavigator();
    if (!this.state.loading) {
      return (

        <NavigationContainer >
          < SearchBar
            placeholder="מה משחקים?"
            onChangeText={this.searchFilterFunction}
            value={this.state.searchValue}
            containerStyle={{ height: 65 }}
          />
          <Stack.Navigator initialRouteName="Rulz">
            <Stack.Screen
              name="Rulz"
              initialParams={this.state.data}
              component={this.HomeScreen}
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
              component={this.DetailsScreen}
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

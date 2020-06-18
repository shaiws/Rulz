import * as React from 'react';
import { ImageBackground, FlatList, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { styles } from './styles';
import database from '@react-native-firebase/database';


export function HomeScreen({ navigation }) {

    const [loading, setLoading] = React.useState(true);
    const [games, setGames] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [arrayholder, setArrayHolder] = React.useState([]);

    const searchFilterFunction = text => {
        setSearchValue(text);
        const newData = arrayholder.filter(item => {
            const itemData = `${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setGames(newData);
    };

    React.useEffect(() => {
        getData();
    }, [])


    // const getData = () => {
    //     setLoading(true);
    //     fetch('https://rulz-27e78.firebaseio.com/.json')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setGames(json['games']);
    //             setArrayHolder(games);
    //             setLoading(false);
    //             console.log(arrayholder);

    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }
    const getData = () => {
        setLoading(true);
        database()
            .ref('/games')
            .once('value')
            .then(snapshot => {

                const fbObject = snapshot.val();

                const newArr = Object.values(fbObject);
                const filtered = newArr.filter(function (value, index, arr) { return value.approved; });
                //console.log(newArr);

                setGames(filtered);
                setArrayHolder(filtered)
                setLoading(false);
            });
    }
    if (!loading) {
        if (games.length > 0) {
            return (
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        < SearchBar
                            containerStyle={{ flex: 1 }}
                            placeholder="מה משחקים?"
                            onChangeText={text => searchFilterFunction(text)}
                            value={searchValue}
                        />
                        <Button
                            onPress={() => navigation.navigate('AddGame')}
                            style={{ flex: 1 }}
                            title={`לא מצאתם?\n הוסיפו משחק`} />
                    </View>
                    <ImageBackground
                        style={styles.backgroundImage}
                        imageStyle={{ opacity: 0.09 }}
                        source={{
                            uri: 'https://i2.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2015/05/iStock-520659161.jpg?fit=1183%2C887&ssl=1'
                        }}>
                        <FlatList
                            data={games}
                            pagingEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                console.log(item);
                                if (item.approved)
                                    return (
                                        <View style={{ flex: 1 }}>
                                            <Text key={item.id} style={styles.gameTitle}>{item.title}</Text>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('GameDetails', { game: item })}
                                                style={styles.gameCard}>
                                                <Image style={styles.image} source={{ uri: item.image }} />
                                            </TouchableOpacity >
                                        </View>
                                    )
                                else
                                    return null;
                            }
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ImageBackground>
                </View >
            );
        }
        else {
            return (
                <Text>לא נמצאו נתונים או קיימת בעיה ברשת</Text>
            );
        }
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


import * as React from 'react';
import { styles } from './styles';
import { ImageBackground, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';


export function GameDetails({ route, navigation }) {
    const { game } = route.params;
    const [isRulesCollapsed, setRulesCollapsed] = React.useState(true);
    const [isWinCollapsed, setWinCollapsed] = React.useState(true);
    const [isParticipentsCollapsed, setParticipentCollapsed] = React.useState(true);
    const [test] = React.useState(['לחץ להרחבה', 'לחץ לסגירה'])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.09 }}
                source={{
                    uri: game['image']
                }}>

                <Text style={styles.title}>חוקי המשחק {game['title']}</Text>
                <ScrollView contentContainerStyle={{
                    backgroundColor: '#fff',
                    margin: 10,
                    overflow: 'hidden'
                }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setParticipentCollapsed(!isParticipentsCollapsed); }}>
                        <Text style={styles.subtitle} >כמות משתתפים:</Text>
                        <Text style={styles.subtitlehelp}>{isParticipentsCollapsed ? test[0] : test[1]}</Text>
                    </TouchableOpacity >
                    <ScrollView>
                        <Collapsible collapsed={isParticipentsCollapsed}>
                            <Text style={styles.rules} >{game.participants}</Text>
                        </Collapsible>
                    </ScrollView>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setRulesCollapsed(!isRulesCollapsed); }}>
                        <Text style={styles.subtitle} >חוקים:</Text>
                        <Text style={styles.subtitlehelp}>{isRulesCollapsed ? test[0] : test[1]}</Text>
                    </TouchableOpacity >
                    <ScrollView>
                        <Collapsible collapsed={isRulesCollapsed}>
                            <Text style={styles.rules} >{game.rules}</Text>
                        </Collapsible>
                    </ScrollView>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setWinCollapsed(!isWinCollapsed); }}>
                        <Text style={styles.subtitle} >איך מנצחים:</Text>
                        <Text style={styles.subtitlehelp}>{isWinCollapsed ? test[0] : test[1]}</Text>
                    </TouchableOpacity >
                    <ScrollView>
                        <Collapsible collapsed={isWinCollapsed}>
                            <Text style={styles.rules} >{game.winning}</Text>
                        </Collapsible>
                    </ScrollView>

                </ScrollView>
                <Text style={styles.credit}>קרדיט: {game.author}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Rulz')}>
                    <View>
                        <Text style={styles.back}>חזור לעמוד הראשי</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View >

    );
}
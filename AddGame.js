import * as React from 'react';
import { Button, Text, View, TextInput, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';



export function AddGame({ route, navigation }) {
    const [name, setName] = React.useState('');
    const [rules, setRules] = React.useState('');
    const [participents, setParticipents] = React.useState('');
    const [win, setWin] = React.useState('');
    const [author, setAuthor] = React.useState('');


    return (
        <View >
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 30 }}>שם המשחק:</Text>
                    <TextInput
                        onChangeText={(text) => setName(text)}
                        placeholder='שם המשחק'
                        style={{ flex: 3 }}
                        maxLength={20}
                        underlineColorAndroid='black'
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 30 }}>כמות משתתפים:</Text>
                    <TextInput
                        onChangeText={(text) => setParticipents(text)}
                        placeholder='כמות משתתפים'
                        style={{ flex: 3 }}
                        maxLength={20}
                        underlineColorAndroid='black'
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 30 }}>חוקי המשחק:</Text>
                    <TextInput
                        onChangeText={(text) => setRules(text)}
                        placeholder='חוקי המשחק'
                        style={{ flex: 3 }}
                        multiline
                        underlineColorAndroid='black'
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 30 }}>איך מנצחים?:</Text>
                    <TextInput
                        onChangeText={(text) => setWin(text)}
                        placeholder='איך מנצחים?'
                        style={{ flex: 3 }}
                        multiline
                        underlineColorAndroid='black'
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, margin: 30 }}>שם/כינוי:</Text>
                    <TextInput
                        onChangeText={(text) => setAuthor(text)}
                        placeholder='שם/כינוי'
                        style={{ flex: 3 }}
                        multiline
                        underlineColorAndroid='black'
                    />
                </View>
                <Button title='שלח' onPress={() => {
                    const newReference = database()
                        .ref('/games')
                        .push();

                    console.log('Auto generated key: ', newReference.key);

                    newReference
                        .set({
                            author: author,
                            rules: rules,
                            id: newReference.key,
                            image: '',
                            participants: participents,
                            winning: win,
                            title: name

                        })
                        .then(() => Alert.alert(
                            'הנתונים נקלטו!',
                            'הנתונים נקלטו בהצלחה ויופורסמו לאחר ווידוא.\nתודה על שיתוף הפעולה!',
                            [
                                { text: 'סגור', onPress: () => navigation.navigate('Rulz') },
                            ]
                        ));
                }} />
            </ScrollView>

        </View >
    );
}
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import { onChange } from 'react-native-reanimated';

const Bar = (props: any) => {

    function Minus(text) {
        props.Change(props.text, parseFloat(text) * -1)
    }

    function ChangeTxt(text) {
        if (text.length == 0) {
            text = "0";
        } else if (text[0] == "0") {
            text = text.substring(1, text.length);
        } else if (text[0] == "-") {
            text = "0"
        }

        props.Change(props.text, parseFloat(text))
    }


    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableHighlight style={style.click} onPress={() => { Minus(props.text); }}>
                <View>
                    <Text style={style.text1}>
                        +/-
                    </Text>
                </View>
            </TouchableHighlight>
            <TextInput style={style.input}
                keyboardType='decimal-pad'
                defaultValue='0'
                maxLength={10}
                onChangeText={text => { ChangeTxt(text) }}
                value={props.text.toString()}
            ></TextInput>
            <Text style={style.text}>
                {props.name}
            </Text>
        </View>
    )
}

const Temperature = (props: any) => {

    const [C, setC] = useState(0);
    const [K, setK] = useState(273);
    const [F, setF] = useState(32);

    function Change(name, num) {
        switch (name) {
            case C:
                setC(Math.round(num * 100) / 100);
                setK(Math.round((num + 273) * 100) / 100);
                setF(Math.round((num * 1.8 + 32) * 100) / 100);
                break;
            case K:
                setC(Math.round((num - 273) * 100) / 100);
                setK(Math.round(num * 100) / 100);
                setF(Math.round(((num - 273) * 1.8 + 32) * 100) / 100);
                break;
            case F:
                setC(Math.round((num - 32) / 1.8 * 100) / 100);
                setK(Math.round(((num - 32) / 1.8 + 273) * 100) / 100);
                setF(Math.round(num * 100) / 100);
                break;

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'lightgrey' }}>
            <View style={style.top}>

            </View>
            <View style={style.body}>
                <Bar text={C} Change={Change} name="°C" />
                <Bar text={K} Change={Change} name="°K" />
                <Bar text={F} Change={Change} name="°F" />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    top: {
        backgroundColor: "darkblue",
        flex: 2,
    },
    body: {
        flex: 18,
        margin: 10,
    },
    input: {
        borderRadius:10,
        backgroundColor: 'darkgrey',
        height: 60,
        width: 200,
        fontSize: 30,
        textAlign: 'right',
        textAlignVertical: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    click: {
        height: 60,
        width: 60,
        backgroundColor: 'grey',
        marginRight: 10,
        marginTop: 10,
        borderRadius:30,
    },
    text: {
        height: 60,
        width: 60,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 40,
        marginTop: 10,
    },
    text1: {
        height: 60,
        width: 60,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 35,
    },
})

export default Temperature;
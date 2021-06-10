import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { set } from 'react-native-reanimated';
const NumBtn = (props: any) => {
    if (props.text === "1" || props.text === "2" || props.text === "3" || props.text === "4" || props.text === "5" ||
        props.text === "6" || props.text === "7" || props.text === "8" || props.text === "9" || props.text === "0") {
        return (
            <TouchableHighlight style={style.numbutton} onPress={() => props.Click(props.text)}>
                <Text style={style.textstyle}>
                    {props.text}
                </Text>
            </TouchableHighlight>
        )
    } else {
        return (
            <TouchableHighlight style={style.numbutton} onPress={() => props.Click(props.text)}>
                <Text style={style.textstyle1}>
                    {props.text}
                </Text>
            </TouchableHighlight>
        )
    }
}

const Top = () => {
    return (<View style={style.top}></View>)
}
const TextShow = (props: any) => {
    return (
        <View style={style.textshow}>
            <Text style={{ textAlign: 'right', fontSize: 30, padding: 10 }} >
                {props.text}
            </Text>
        </View>
    )
}

const Btns = (props: any) => {
    return (
        <View style={style.btns}>
            <View style={{ flexDirection: 'column' }}>
                <NumBtn text="C" {...props} />
                <NumBtn text="7" {...props} />
                <NumBtn text="4" {...props} />
                <NumBtn text="1" {...props} />
                <NumBtn text="+/-" {...props} />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <NumBtn text="^" {...props} />
                <NumBtn text="8" {...props} />
                <NumBtn text="5" {...props} />
                <NumBtn text="2" {...props} />
                <NumBtn text="0" {...props} />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <NumBtn text="DEL" {...props} />
                <NumBtn text="9" {...props} />
                <NumBtn text="6" {...props} />
                <NumBtn text="3" {...props} />
                <NumBtn text="." {...props} />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <NumBtn text="/" {...props} />
                <NumBtn text="*" {...props} />
                <NumBtn text="-" {...props} />
                <NumBtn text="+" {...props} />
                <NumBtn text="=" {...props} />
            </View>


        </View>
    )
}

var num = "0";
var shownum = "0";

const Calculator = (props: any) => {

    // const [num, setnum] = useState("");
    // const [shownum, setshownum] = useState("0");   // <-- ene
    const [show, setshow] = useState(shownum);
    function Click(text) {
        if (shownum == "SYNTAX ERROR" || shownum == "Infinity" || shownum == "NaN") {
            shownum = "0";
            num = "0";
        }
        let lastnum = shownum[shownum.length - 1];
        if (text === "+" || text === "-" || text === "*" ||
            text === "/" || text === "." || text === "^") {
            if (lastnum === "+" || lastnum === "-" || lastnum === "*" ||
                lastnum === "/" || lastnum === "." || lastnum === "^") {
                if (lastnum === "^") {
                    // setnum(num.substring(0, num.length - 2));
                    // setshownum(shownum.substring(0, shownum.length - 1));
                    num = num.substring(0, num.length - 2);
                    shownum = shownum.substring(0, shownum.length - 1);
                    num += "**";
                    shownum += "^"
                } else {
                    // setnum(num.substring(0, num.length - 1));
                    // setshownum(shownum.substring(0, shownum.length - 1));
                    num = num.substring(0, num.length - 1);
                    shownum = shownum.substring(0, shownum.length - 1);
                    num += text;
                    shownum += text;
                }

                //setnum(num + text);
            } else {
                if (text === "^") {
                    // setnum(num + "**");
                    // setshownum(shownum + "^");
                    num += "**";
                    shownum += "^"
                } else {
                    // setnum(num + text);
                    // setshownum(shownum + text);
                    num += text;
                    shownum += text;
                }
            }
        } else if (text === "1" || text === "2" || text === "3" || text === "4" || text === "5" ||
            text === "6" || text === "7" || text === "8" || text === "9" || text === "0") {
            if (shownum == "0") {
                // setshownum(text);
                shownum = text;
            } else {
                // setshownum(shownum + text);
                shownum += text;
            }
            // setnum(num + text);
            num += text;

        } else {
            switch (text) {
                case "+/-":
                    if (num == parseFloat(num).toString()) {
                        let swnum = parseFloat(num) * -1;
                        // setnum(swnum.toString());
                        // setshownum(swnum.toString());
                        num = swnum.toString();
                        shownum = swnum.toString();
                    }
                    break;
                case "C":
                    // setnum("");
                    // setshownum("0");
                    num = "0";
                    shownum = "0";
                    break;
                case "DEL":
                    if (shownum != "0" && num != "0") {
                        if (shownum[shownum.length - 1] == "^") {
                            // setnum(num.substring(0, num.length - 2));
                            num = num.substring(0, num.length - 2)
                        } else {
                            // setnum(num.substring(0, num.length - 1));
                            num = num.substr(0, num.length - 1);
                        }
                        // setshownum(shownum.substring(0, shownum.length - 1));
                        shownum = shownum.substring(0, shownum.length - 1);
                    }

                    break;
                case "=":
                    let last = num[num.length - 1];
                    if (last === "1" || last === "2" || last === "3" || last === "4" || last === "5" ||
                        last === "6" || last === "7" || last === "8" || last === "9" || last === "0") {
                        let ans = eval(num);
                        // setnum(ans.toString());
                        // setshownum(ans.toString());
                        num = ans.toString();
                        shownum = ans.toString();
                    } else {
                        // setnum("");
                        // setshownum("SYNTAX ERROR");
                        num = "0";
                        shownum = "SYNTAX ERROR";
                    }

                    break;
            }
        }
        setshow(shownum);
    }

    return (
        <View style={{ flex: 20, backgroundColor: 'lightgrey' }}>
            <Top />
            <TextShow text={show} />
            <Btns Click={Click} />
        </View>
    )
}

const style = StyleSheet.create({
    numbutton: {
        height: 54,
        width: 75,
        backgroundColor: 'grey',
        marginTop: 2,
        marginBottom: 10,
        marginLeft: 12,
        justifyContent: 'center',
        borderRadius: 30,
    },
    top: {
        backgroundColor: 'darkblue',
        flex: 2,
    },
    textshow: {
        flex: 6,
        backgroundColor: 'darkgrey',
        borderRadius: 10,
        margin: 10,

    },
    btns: {
        flex: 12,
        flexDirection: 'row'
    },
    textstyle: {
        textAlign: 'center',
        fontSize: 30,
        color:'white'
    },
    textstyle1: {
        textAlign: 'center',
        fontSize: 30,
        color:'yellow'
    },
})

export default Calculator;
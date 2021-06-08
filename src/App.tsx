import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from "react"
import { View, Text } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Temperature from "./scenes/Temperature";
import Calculator from "./scenes/Calculator";
import Unit from "./scenes/Unit";
import Rate from "./scenes/Rate";

const Test = (props: any) => {
  return (
    <View>
      <Text>
        HI
      </Text>
    </View>

  )
}

const Draw = createDrawerNavigator();


const Main = (props: any) => {
  return (
    <Tab.Navigator

      initialRouteName="Calculator"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Calculator":
              iconName = focused ? "calculator" : "md-calculator-outline"
              break;
            case "Exchange Rate":
              iconName = focused ? "earth" : "earth-outline"
              break;
            case "Unit":
              iconName = focused ? "swap-horizontal" : "swap-horizontal-outline"
              break;
            case "Temperature":
              iconName = focused ? "thermometer" : "thermometer-outline"
              break;
            case "Menu":
              iconName = focused ? "list-circle" : "list-circle-outline"
              break;
            default:
              iconName = focused ? "calculator" : "calculator-outline"
              break;
          }

          return <Ionicons name={iconName} color={color} size={size} />
        }
      })}
    >
      <Tab.Screen name='Menu'
        listeners={() => ({
          tabPress: e => {
            props.navigation.openDrawer();

            e.preventDefault()
          }
        })}
      >
        {props => <Test {...props} />}
      </Tab.Screen>
      <Tab.Screen name='Temperature'>
        {props => <Temperature {...props} />}
      </Tab.Screen>
      <Tab.Screen name='Calculator'>
        {props => <Calculator {...props} />}
      </Tab.Screen>
      <Tab.Screen name='Unit'>
        {props => <Unit {...props} />}
      </Tab.Screen>
      <Tab.Screen name='Exchange Rate'>
        {props => <Rate {...props} />}
      </Tab.Screen>

    </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Draw.Navigator>
        <Draw.Screen name="Main" component={Main} />
      </Draw.Navigator>
    </NavigationContainer>
  )
}
export default App;
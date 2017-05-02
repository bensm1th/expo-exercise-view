import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import SetupScreen from './screens/SetupScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import StartScreen from './screens/StartScreen';
import StatsScreen from './screens/StatsScreen';
import AcheivementsScreen from './screens/AcheivementsScreen';
import AuthScreen from './screens/AuthScreen';
import * as Setup from './components/setup';
import store from './store';
import colors from './colors';

const SCREEN_HEIGHT = Dimensions.get("window").height;

class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          setup: { screen: 
            StackNavigator({
            setup: { screen: SetupScreen },
              exerciseEdit: { screen: Setup.EditExercise },
              exerciseCreate: { screen: Setup.CreateExercise },
              exerciseDelete: { screen: Setup.DeleteExercise },
              workoutEdit: { screen: Setup.EditWorkout },
              workoutCreate: { screen: Setup.CreateWorkout },
              workoutDelete: { screen: Setup.DeleteWorkout }
          }, 
            { headerMode: "none" }
          )},
          start: { screen: StartScreen },
          home: { screen: HomeScreen },
          stats: { screen: StatsScreen },
        }, {
          tabBarOptions: {
            inactiveBackgroundColor: colors.primary.light,
            activeBackgroundColor: colors.primary.medium,
            labelStyle: {
              fontSize: 15,
              color: 'white',
            },
            style: {
              height: SCREEN_HEIGHT * 0.085,
            }
          }
        })
      }
    },{
      navigationOptions: {
        tabBar: { visible: false }
      },
      lazyLoad: true
    });
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);

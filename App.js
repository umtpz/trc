import { Platform } from 'react-native'; 
import React, { Component } from 'react'; //needed to be written in order to render ui
import Sound from 'react-native-sound'; //to play sound. used to play clicks on press

import LinearGradient from "react-native-linear-gradient"; //this is for gradient background <view>s

import { //UI elements that are used, placed or planning to be added. Needs to be defined here
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

global.meetingTime = "" // global variables can be reached from everywhere
global.meetingTitle = ""  // but use setState and this.state instead if you
                          // dont want to refresh the UI manually
global.meetingParticipants = ""
global.meetingIndex = 0

global.sound1 = new Sound(require('./src/sounds/click.mp3'), // sound is defined
      (error, sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }

      });

class App extends Component {

  forceUpdateHandler() { // manually refresh UI
    this.forceUpdate();
  };

  constructor() { // auto refresh UI
    super();
    this.state = { // variables that can be changed setState -json-
      curTime: "",
      meeting:
        [{
          "title": "Toplantı Odası Projesi",
          "time": "13:12 - 14:33",

          "participants":
            ["Umut Topuz",
              "Enes Bulut",
              "Serap Arslan",
              "Tuğçe Akgün",
              "İzel Arıkan",
              "Sinan Aydemir",
              "Fatih Molla",
              "Berk Eren",
              "Umut Topuz",
              "Enes Bulut",
              "Serap Arslan",
              "Tuğçe Akgün",
              "İzel Arıkan",
              "Sinan Aydemir",
              "Fatih Molla",
              "Berk Eren",]
        },
        {
          "title": "Deneme",
          "time": "13:30 - 14:30",

          "participants":
            ["Berk Eren",
              "Fatih Molla",
              "Sinan Aydemir",
              "İzel Arıkan",
              "Tuğçe Akgün",
              "Enes Bulut",
              "Serap Arslan",
              "Umut Topuz",]
        }],
    }
  }

  componentDidMount() { // onload function
    setInterval(() => { // setInterval repeated process with period
      this.setState({ // changes this.state value like that
        curTime: String("0" + new Date().getHours()).slice(-2) + ":" + String("0" + new Date().getMinutes()).slice(-2)
      })
    }, 1000) // this function fetches hour and minute then adds 0 to the left and
              // shows the last 2 letters of them. 08:01 instead of 8:1

    this.loadData(meetingIndex) // calls loadData with meetingIndex argument

    
    //Alert.alert(String(this.state.meeting.length)) // this gives an native os alert on device
  }
  componentWillUnmount() { // will clear the time interval on unload
    clearInterval();
  }

  loadData = (n) => { // this is loadData function that takes an argument -meetingIndex in this case-
    if (this.state.meeting.length) {

      meetingTime = this.state.meeting[n].time
      meetingTitle = this.state.meeting[n].title
      meetingParticipants = ""

      if (this.state.meeting[n].participants.length) {

        for (let i = 0; i < this.state.meeting[n].participants.length; i++) {
          meetingParticipants += this.state.meeting[n].participants[i] + "\n";
        }

      }

      if (this.state.meeting.length - 1 > n) {
        styles.buttonRight = { opacity: 1 }
      }
      else {
        styles.buttonRight = { opacity: .4 }
      }

      if (n > 0) {
        styles.buttonLeft = { opacity: 1 }
      }
      else {
        styles.buttonLeft = { opacity: .4 }
      }

      this.forceUpdateHandler()

      // Shows the time, title and participants in meeting json with index
      // So toLeft and toRight functions changes the index which makes it show
      // other datas and refreshes the UI at the end.

    }




  }

  toLeft = () => { // decreases index of the meeting array to show previous data
    if (meetingIndex > 0 && this.state.meeting.length > 0) {
      this.loadData(--meetingIndex)
      this.handlePress();
    }
  }
  toRight = () => { // increses index of the meeting array to show next data
    if (meetingIndex < this.state.meeting.length - 1) {
      this.loadData(++meetingIndex)
      this.handlePress();
    }
  }

  handlePress() { // routed this function to play click sound on the elements that I want it to play
    sound1.play(() => { // plays sound1
      //sound1.release(); // do not release if you want to use that sound again
    });
  }

  render() { // UI will be rendered in here

    // Hides statusbar


    return ( // The UI that it returns
      <>
        <StatusBar hidden /> { /*  hides statusbar  */ }
        <SafeAreaView> { /*  puts the UI elements in a safe are like starts below the notch or ends above the homebar for iPhone X like devices  */ }
          <LinearGradient colors={["#777", "#444", "#777"]} style={{ borderBottomWidth: 3, borderBottomColor: "#666" }}> { /*  creates a view panel with the specified color gradient */ }
            <View style={{ width: "100%", flexDirection: "row", top: 0, height: 40, justifyContent: "center", alignItems: "center", paddingTop: 6, }}>  { /*  centers the elements horizontal and vertical -buttons in there-  */ }
              <TouchableOpacity onPress={this.handlePress} style={{ paddingTop: 8, paddingLeft: 8, width: 40, height: 40, }} activeOpacity={0.7}>
                <Image
                  source={require('./src/pics/phone.png')}
                  style={{ height: 21, width: 21 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePress}  style={{ paddingTop: 5, paddingLeft: 5, width: 40, height: 40 }} activeOpacity={0.7}>
                <Image
                  source={require('./src/pics/slideshow.png')}
                  style={{ height: 28, width: 28 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePress}  style={{ marginTop: -2, paddingTop: 0, paddingLeft: 0, width: 60, height: 40, }} activeOpacity={0.7}>
                <Image
                  source={require('./src/pics/projector.png')}
                  style={{ height: 41, width: 61 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePress}  style={{ paddingTop: 5, paddingLeft: 5, width: 40, height: 40 }} activeOpacity={0.7}>
                <Image
                  source={require('./src/pics/wifi.png')}
                  style={{ height: 28, width: 28 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={{ flexDirection: "row", paddingVertical: "2%" }}>
            <View style={[styles.outerContainer, { flex: 3, alignItems: "center" }]}>
              <Text style={[styles.roomText, { textAlign: "center", top: -90, color: "#003F63", fontFamily: "Helvetica" }]}>
                ZEUS</Text>
              <View style={[styles.roomLine, { width: "90%", height: 2, backgroundColor: "#ddd", }]}></View>
              <Image
                source={require("./src/pics/TURCOM.png")}
                resizeMode="contain"
                style={{ width: "70%", top: -140, marginHorizontal: "0%", opacity: 1 }}
              />
              <Text style={[styles.clock, {}]}>{this.state.curTime}</Text>
            </View>


            <View style={[{ flex: 2, borderLeftColor: "#ddd", borderLeftWidth: 2, height: "89%", marginRight: "2%" }]}>
              <View style={{ width: "100%", height: "93%", paddingHorizontal: 50, backgroundColor: "#fff" }}>
                <View style={{ width: "100%", height: "100%", backgroundColor: "#fff", }}>
                  <Text style={{ fontWeight: "bold", fontSize: 32, textAlign: "left", marginTop: 32, color: "#444" }}>
                    {meetingTitle}</Text>
                  <Text style={{ fontSize: 52, textAlign: "center", marginTop: 54, color: "#222", fontWeight: "bold" }}>
                    {meetingTime}</Text>
                  <Text style={{ fontSize: 24, color: "#444", marginTop: 54, fontWeight: "bold" }}>
                    Katılanlar:</Text>
                  <ScrollView style={[styles.participantOuter, { top: 20, paddingHorizontal: 20 }]}>
                    <View style={{ height: 2, marginTop: 10, marginBottom: 24, backgroundColor: "#ddd" }}></View>
                    <Text style={styles.participant}>
                      {meetingParticipants}
                    </Text>
                    <View style={{ height: 2, marginTop: 10, marginBottom: 10, backgroundColor: "#ddd" }}></View>
                  </ScrollView>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", bottom: 0 }}>
                    <TouchableOpacity onPress={this.toLeft} activeOpacity={0.2} style={[styles.buttons, { marginTop: 10 }]}>
                      <Text style={[styles.buttonTexts, styles.buttonLeft]}>{"<"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toRight} activeOpacity={0.2} style={[styles.buttons, { marginTop: 10 }]}>
                      <Text style={[styles.buttonTexts, styles.buttonRight]}>{">"}</Text>
                    </TouchableOpacity>

                  </View>
                </View>

              </View>


            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: "space-around",
    height: "92%",
  },
  roomText: {
    fontWeight: "300",
    ...Platform.select({
      ios: {
        fontSize: 28,
      },
      android: {
        fontSize: 36,
      },
    }),
  },
  roomLine: {
    ...Platform.select({
      ios: {
        marginTop: -280

      },
      android: {
        marginTop: -250
      },
    }),
  },
  clock: {
    width: "100%",
    paddingRight: 70,
    marginBottom: -0,
    textAlign: "right",
    fontWeight: "300",
    color: "#003F63",
    ...Platform.select({
      ios: {
        fontSize: 100,
      },
      android: {
        fontSize: 108,
      },
    }),
  },
  arrowButtons: {
    fontSize: 40,
    borderRadius: 20,
    width: 50
  },
  buttons: {
    width: "30%",
  },
  buttonLeft: {
    opacity: .4,
  },
  buttonRight: {
    opacity: .4,
  },
  buttonTexts: {
    color: "#003F63",
    fontSize: 60,
    textAlign: "center",
  },
  participantOuter:
  {
    ...Platform.select({
      ios: {
        marginBottom: 50,
      },
      android: {
        marginBottom: 36,
      },
    }),
  },
  participant: {
    fontSize: 26,
    marginTop: 2,
    textAlign: "center"

  }
});

export default App;

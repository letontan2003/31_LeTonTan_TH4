import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Image, FlatList, Dimensions } from 'react-native';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function App() {
   // Đặt hooks useState ở đây, bên trong hàm App
   const [category, setCategory] = useState([]);
   const [location, setLocation] = useState([]);
   const screenWith = Dimensions.get('window').width;

   useEffect(() => {
    axios.get('https://6721d08a98bbb4d93ca9c2ac.mockapi.io/api/v1/catelory').then((response) => {
      setCategory(response.data);
    });
    axios.get('https://6721d08a98bbb4d93ca9c2ac.mockapi.io/api/v1/location').then((response) => {
      setLocation(response.data);
    });
   }, []);
   const numColumns = 4;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView style={{width: "100%", height: 500}}>
          <View style={styles.headContainer}>
            <View style={styles.header}>
              <Image style={styles.logoicon} source={require("./assets/logoicon.png")}/>
              <View style={styles.searchinputheader}>
                <TextInput style={styles.searchinput} placeholder='Search here ...'/>
                <Image style={styles.findicon} source={require("./assets/findicon.png")}/>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Image style={styles.personicon} source={require("./assets/personicon.png")}/>
                <View>
                  <Text style={styles.txtwelcome}>Welcome!</Text>
                  <Text style={styles.txtusername}>Donna Stroupe</Text>
                </View>
              </View>
              <Image style={styles.ringicon}source={require('./assets/ringicon.png')}/>
            </View>
          </View>

          {/* Category */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <Image style={styles.icon3gach} source={require('./assets/3gach.png')}/>
        </View>
        <FlatList 
          data={category}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.categoryItem, {width: screenWith / numColumns}]}>
              <View style={styles.categoryIconContainer}>
                <Image style={styles.categoryIcon} source={{uri: item.image}}/>
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}numColumns={numColumns}
        />
            {/* Popular Destination */}
         <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Popular Destination</Text>
                    <Image source={require('./assets/3gach.png')} style={styles.icon3gach}/>
                    </View>
                <FlatList
                    data={location.slice(0, 3)}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.locationImage}/>
                    )}
                />

                {/* Recommended */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recommended</Text>
                </View>
                <FlatList
                    data={location.slice(3, 5)}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.locationImageOfRec}/>
                    )}
                />
                </ScrollView>

                {/* Footer or bottom nav */}
                <View style={styles.bottomNav}>
                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('./assets/homeicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Home</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('./assets/exploreicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Explore</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('./assets/searchicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Search</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('./assets/profileicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Profile</Text>
                   </TouchableOpacity>
                </View>
  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    flex: 1,
    backgroundColor:"#fff"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer:{
    backgroundColor: "#5958b8",
    height: 205,
  },
  header:{
    padding: 20,
    marginTop: 25,
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: "space-between",
  },
  logoicon:{
    width: 50,
    height: 50,
  },
  searchinputheader:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  
  },
  searchinput:{
    backgroundColor: 'transparent',
    flex: 1,
  },
  findicon:{
    width: 20,
    height: 20,
  },
  infoContainer:{
    paddingRight: 30,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between'
  },
  info:{
    flexDirection:'row',
    alignItems:'center',
    padding: 20,
    paddingLeft: 23,
  },
  personicon:{
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  txtwelcome:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  txtusername:{
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  ringicon:{
    height: 50,
    width: 50,
  },
  sectionContainer:{
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  sectionTitle:{
    padding: 10,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon3gach:{
    marginRight: 10,
    height: 30,
    width: 30,
  },
  categoryItem:{
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  categoryIconContainer:{
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: '#5958b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon:{
    width: 60,
    height: 60,
  },
  categoryText:{
    marginTop: 8,
    fontSize: 13,
    color: "#333",
    textAlign: 'center',

  },
  icon3gachlocation:{
    marginLeft: 129,
    height: 30,
    width: 30,
  },
  imagIcon:{
    width: 122,
    height: 122,
  borderRadius: 19,
  },

  locationImage:{
    width: 122,
    height: 122,
    margin: 10,
    borderRadius: 10,
},
locationImageOfRec:{
    width: 192,
    height: 192,
    borderRadius: 10,
    margin: 10,
},
bottomNav:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5958b2',
    padding: 25,
},
navItem:{
    alignItems: 'center',
},
navLabel:{
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
},
navicon:{
    width: 40,
    height: 40,
},
});
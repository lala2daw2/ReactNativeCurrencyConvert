/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from "./node_modules/axios"

const url = "http://data.fixer.io/api/latest?access_key=761b1c8820308c1fd2764092a4c8ebf0&symbols=EUR,TRY,BGN,AED";

export default class App extends React.Component {

  getRates(){
    axios.get(url)
    .then(res=>{
      console.log(res)
      const rates=res.data.rates;
      this.setState({
        rates
      })
    })
  };
  componentDidMount(){
    console.log('componentDidMount');
    this.getRates();
  };
  constructor(props) {
    super(props);
    this.state={
      tl:'',
      eur:'',
      leva:'',
      dirhem:'',
      input:'',
      rates:[]
    }
    this.getRates=this.getRates.bind(this);
  };
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Döviz Çevirici</Text>
        <TextInput style={styles.inputStyle}
                    placeholder="EURO miktar giriniz."
                    keyboardType='numeric'
                    onChangeText={(text)=>{
                      const i=parseFloat(text);
                      this.setState({
                        input:text,
                        tl : (i*this.state.rates["TRY"]),
                        dirhem : (i*this.state.rates["AED"]),
                        leva : (i*this.state.rates["BGN"]),
                        eur:(i*this.state.rates["EUR"]),
                      })
                    }}
                    value={this.state.input}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.currencyWrapper}>EURO : {this.state.eur}€</Text>
          <Text style={styles.currencyWrapper}>Bulgar Levası : {this.state.leva} лв</Text>
          <Text style={styles.currencyWrapper}>Türk Lirası : {this.state.tl} ₺</Text>
          <Text style={styles.currencyWrapper}>Dirhem : {this.state.dirhem} إ;</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  contentWrapper:{
    top:150,
    alignItems: 'center',
    marginBottom: -20,
  },
  currencyWrapper:{
    top:-140,
    fontSize:18,
    textAlign: 'center',
  },
  inputStyle:{
    fontSize:20,
    height:60,
    width:338,
    textAlign:'center',
    margin: 10,
  },
  btnWrapper:{
    height:40,
    width:250,
  },
  welcome: {
    top:2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    top:150,
    textAlign: 'center',
    color: '#333333',
    marginBottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

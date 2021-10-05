/**
 * Sample React Native App
 * http://www.github.com/tchan1010/my_sample
 */
"use strict";
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import Style from './Style.js';
import InputButton from './InputButton';
import Board from './Board.js';
import { connect } from "react-redux";
import { setSymbol, setHightlight, clearAll, fetchScores, saveScores } from '../actions/index';


/* define the tile  winning combinations */
const winScores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6],
];

/* main component */
class App extends Component<Props> {
  constructor(props) {
        super(props);
        this.state = {
           player : 'X',
           hasWinner : false,
           message : 'Next Player: X',
        }
	/*
       var getData = async() => {
           try {
              const value = await AsyncStorage.getItem('oldScores')
              if (value != nil) {
                 var scores = values.split(",");
                 this.setState({ xScore: parseInt(scores[0]),
                                 oScore: parseInt(scores[1]) });
              }
            } catch (error) {
               alert("Fetch old scores failed: " + error.message);
            }
        }
         */ 
	/*
        AsyncStorage.getItem("oldScores")
            .then( values  => {
                if (values != null) {
                    var scores = values.split(",");
                    this.setState({ xScore: parseInt(scores[0]),
                                    oScore: parseInt(scores[1]) });
                }
            })
            .catch( error => {
               alert("Fetch old scores failed: " + error.message);
            })
            .done();
         */
   }
  componentDidMount() {
       /* get X and O scroes from prior sessions */
        this.props.fetchScores();
    }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.blankContainer}>
        </View>
        <View style={Style.scoreContainer}>
             <Text style={Style.scoreText}>Score: O = {this.props.oScore}, X = {this.props.xScore}</Text>
        </View>
        <Board 
           tileStates={this.props.tileStates}
           message={this.state.message}
           tilePressed={(i) => this._onInputButtonPressed(i)}
        />
        <View style={Style.blankContainer}>
        </View>
        {this._renderRestart()}
        <View style={Style.blankContainer}>
        </View>
      </View>
    );
  }
  _startOver() {
     {this.props.clearAll()};
     this.setState({ hasWinner : false,
                     player: 'X',
                     message : 'Next Player: X' });
  }
  _doNothing() {
  }
   _renderRestart() {
            let inputRow = [];
            for (var l=0; l < 3; ++l) {
                inputRow.push(  <InputButton value={l == 1 ? "Start Over" : ""}
                         highlight={false}
                         style={l == 1 ? Style.inputButton : Style.blankButton} 
                         backgroundColor={l == 1 ? Style.yellowButton : Style.blackButton}
                         textStyle={Style.inputButtonText}
                         onPress={l == 1 ? this._startOver.bind(this) : this._doNothing.bind(this)}
                         key={"3 - " + l}/> );
            }
            return (<View style={Style.inputRow}>{inputRow}</View>);
   }
   /* render all buttons of the calculator */
	/*
    _renderInputButtons() {
        let views = [];
        for (var r = 0; r < 3; r ++) {
            var inputRow = [];
            for (var i = 0; i < 3; i ++) {
                let input = r * 3 + i;
                var x =  <InputButton value={this.props.tileStates[input].displaySymbol}
                         highlight={this.props.tileStates[input].highLight}
                         style={Style.inputButton} 
                         backgroundColor={Style.whiteButton}
                         textStyle={Style.inputButtonText}
                         onPress={this._onInputButtonPressed.bind(this, input)}
                         key={r + "-" + i}/>;
                inputRow.push(x);
            }
            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }
        return views;
    }
	*/
    _checkWinner() {
        for (var i=0; i < winScores.length; ++i) {
           var row = winScores[i];
           if (this.props.tileStates[row[0]].displaySymbol &&
               this.props.tileStates[row[0]].displaySymbol === this.props.tileStates[row[1]].displaySymbol && 
               this.props.tileStates[row[0]].displaySymbol === this.props.tileStates[row[2]].displaySymbol)
           {
                {this.props.setHightlight({index0:row[0],index1:row[1],index2:row[2]})};

                {this.props.saveScores()}

                this.setState({ 
                          hasWinner : true,
                          message: "Winner: " + this.state.player });

                return true;
           }
        }
        return false;
    }
    /* process all buttons' click event */
     _onInputButtonPressed(num) {
          if (this.state.hasWinner) {
             return;
          }
          if (this.props.tileStates[num].displaySymbol === null) {
             var symbol = this.state.player;
             {this.props.setSymbol({index:num,symbol:symbol})};

             if (!this._checkWinner()) {
                symbol = symbol == 'X' ? 'O' : 'X';
                this.setState({ player: symbol,
                             message : 'Next Player: ' + symbol
                           });
             }
          }
    }
}

function mapStateToProps(state) {
  return {
    tileStates: state.tileStates,
    oScore : state.oScore,
    xScore : state.xScore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymbol:      payload => dispatch(setSymbol(payload)),
    setHightlight:  payload => dispatch(setHightlight(payload)),
    clearAll:       () =>  dispatch(clearAll()),
    fetchScores:    () =>  dispatch(fetchScores()),
    saveScores:     () =>  dispatch(saveScores()),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

/* Board.js */

"use strict";
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Style from './Style.js';
import InputButton from './InputButton';

export default class Board extends Component {
   render() {
     return (
        <View style={Style.inputContainer}>
            <Text style={Style.displayText}>{this.props.message}</Text>
            {this._createTiles()} 
        </View>
      );
   }
   _createTiles() {
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
                         onPress={() => this.props.tilePressed(input)}
                         key={r + "-" + i}/>;
                inputRow.push(x);
            }
            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }
        return views;
   }
}

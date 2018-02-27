import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store result</button>
                <ul>
                    {this.props.storedResults.map((res) => (
                        <li 
                            key={res.id}
                            onClick={() => this.props.onDeleteResult(res.id)}>
                            {res.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

//connect laczy komponent ze storem
//connect jest funkcja (przyjmujaca konfiguracyjne parametry) 
//ktora zwraca funkcje ktora przyjmuje komponent za parametr

//parametry funkcji connect:
//1. sposob mapowania stanu sotr`a reduxa na propsy komponentu
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter, //state.ctr... dostep do 'podstanu' w storze, patrz plik index.js
        storedResults: state.res.results
    };
}
//2. sposob mapowania akcji stor`a na propsy komponentu
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSubCounter: () => dispatch({type: actionTypes.SUB, value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE, resultId: id})
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
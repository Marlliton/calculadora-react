import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: "0",
    operation: null,
    clearDisplay: false,
    value: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    constructor(props) {
        super(props)
        this.clearCalculator = this.clearCalculator.bind(this)
        this.insertDigit = this.insertDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.state = { ...initialState }
    }

    clearCalculator() {
        this.setState({ ...initialState })
        // console.log("clearing")
    }

    insertDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })
        // console.log(displayValue)

        if (digit !== '0') {
            const index = this.state.current
            const newValue = parseFloat(displayValue)
            const value = [...this.state.value]
            value[index] = newValue
            this.setState({ value })
        }
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ current: 1, operation, clearDisplay: true })
        } else {
            const equals = '='
            const currentOperation = this.state.operation
            const value = [...this.state.value]

            switch (currentOperation) {
                case '/':
                    value[0] = value[0] /= value[1]
                    value[0] = parseFloat(value[0].toFixed(3))
                    break;
                case 'x':
                    value[0] = value[0] *= value[1]
                    break;
                case '-':
                    value[0] = value[0] -= value[1]
                    break;
                case '+':
                    value[0] = value[0] += value[1]
                    break;

                default:
                    break;
            }
            value[1] = 0
            console.log("result", value[0])

            this.setState({
                displayValue: value[0].toString(),
                operation: equals ? null : operation,
                clearDisplay: !equals,
                value, 
                current: equals ? 0 : 1
            })
        }
    }

    render() {
        console.log(this.state.value)
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" triple click={this.clearCalculator} />
                <Button label="/" operation click={this.setOperation} />
                <Button label="7" click={this.insertDigit} />
                <Button label="8" click={this.insertDigit} />
                <Button label="9" click={this.insertDigit} />
                <Button label="x" operation click={this.setOperation} />
                <Button label="4" click={this.insertDigit} />
                <Button label="5" click={this.insertDigit} />
                <Button label="6" click={this.insertDigit} />
                <Button label="-" operation click={this.setOperation} />
                <Button label="1" click={this.insertDigit} />
                <Button label="2" click={this.insertDigit} />
                <Button label="3" click={this.insertDigit} />
                <Button label="+" operation click={this.setOperation} />
                <Button label="0" double click={this.insertDigit} />
                <Button label="." click={this.insertDigit} />
                <Button label="=" operation click={this.setOperation} />
            </div>
        )
    }
}
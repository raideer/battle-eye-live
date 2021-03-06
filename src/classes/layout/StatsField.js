import React from 'react';
import { number } from '../Utils';

export default class StatsField extends React.Component {
    render() {
        const { left, right, name } = this.props;

        return (
            <div className="stats-field">
                <span style={{ width: '35%' }} className={`tag ${left > right ? 'is-positive' : 'is-dark'}`}>{ number(left, true) }</span>
                <span style={{ fontSize: '0.8em', width: '30%', textAlign: 'center' }}>{ name }</span>
                <span style={{ width: '35%' }}className={`tag ${left < right ? 'is-negative' : 'is-dark'}`}>{ number(right, true) }</span>
            </div>
        );
    }
}

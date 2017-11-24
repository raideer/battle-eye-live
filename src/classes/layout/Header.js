import React from 'react';
import If from './If';
import Utils from '../Utils';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            log: null
        };

        this.listenerRegistered = false;
    }

    getTeamElementStyle() {
        return {
            fontWeight: 700,
            fontSize: '1.3em'
        };
    }

    getHeaderListStyle() {
        return {
            paddingBottom: '6px',
            borderBottom: '1px solid #ecf0f1'
        };
    }

    getFlagStyle(c) {
        return {
            backgroundImage: `url('/images/flags_png/L/${c}.png')`,
            backgroundPosition: '-4px -4px'
        };
    }

    componentDidUpdate() {
        this.attachTooltip();
    }

    componentDidMount() {
        this.attachTooltip();
    }

    attachTooltip() {
        $j('.bel-disconnectedAlert').attr('original-title', 'Not connected to the battlefield!').tipsy();
    }

    getAlerts() {
        var elements = [];

        return elements;
    }

    render() {
        if (!this.listenerRegistered && window.BattleEye) {
            window.BattleEye.events.on('log', text => {
                this.state.log = text;
            });

            this.listenerRegistered = true;
        }
        return (
            <div id="battle_eye_header">
                <ul className="list-unstyled list-inline text-left bel-header-menu" style={this.getHeaderListStyle()}>
                    <li id="bel-version">
                        <span className="bel-alert">{this.props.data.version}</span> <a href="http://bit.ly/BattleEye" target="_blank">BATTLE EYE</a>
                    </li>

                    <li id="bel-loading">
                        <div className="bel-spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </li>

                    <If test={!window.viewData.connected}>
                        <li>
                            <span className="bel-alert bel-disconnectedAlert">Not connected!</span>
                        </li>
                    </If>

                    <li className="pull-right">
                        <ul className="list-unstyled list-inline">
                            <li><a className="bel-btn bel-btn-inverse" target="_blank" href="http://bit.ly/BattleEye">Homepage</a></li>
                            <li><a className="bel-btn bel-btn-inverse" target="_blank" href="http://www.erepublik.com/en/citizen/profile/8075739">Contact/Donate</a></li>
                            <li><button id="battle-eye-settings" onClick={this.props.openModal} className="bel-btn bel-btn-default">Settings</button></li>
                        </ul>
                    </li>
                </ul>
                <div className="bel-grid">
                    {this.getAlerts()}
                </div>
                <div className="bel-grid bel-status-log">
                    {this.state.log}
                </div>
                <If test={SERVER_DATA.isCivilWar}>
                    <div className="bel-grid">
                        <div className="bel-col-1-3 text-left bel-teama-color" style={this.getTeamElementStyle()}>
                            <div style={this.getFlagStyle(this.props.data.revolutionCountry)} className="bel-country"></div> {Utils.prettifyCountryName(this.props.data.teamAName)}
                        </div>
                        <div className="bel-col-1-3 text-center" style={this.getTeamElementStyle()}>
                            CIVIL WAR
                        </div>
                        <div className="bel-col-1-3 text-right bel-teamb-color" style={this.getTeamElementStyle()}>
                            <div style={this.getFlagStyle(this.props.data.revolutionCountry)} className="bel-country"></div> {Utils.prettifyCountryName(this.props.data.teamBName)}
                        </div>
                    </div>
                </If>
                <If test={!SERVER_DATA.isCivilWar}>
                    <div className="bel-grid">
                        <div className="bel-col-1-2 text-left bel-teama-color" style={this.getTeamElementStyle()}>
                            <div style={this.getFlagStyle(this.props.data.teamAName)} className="bel-country"></div> {Utils.prettifyCountryName(this.props.data.teamAName)}
                        </div>
                        <div className="bel-col-1-2 text-right bel-teamb-color" style={this.getTeamElementStyle()}>
                            {Utils.prettifyCountryName(this.props.data.teamBName)} <div style={this.getFlagStyle(this.props.data.teamBName)} className="bel-country"></div>
                        </div>
                    </div>
                </If>
            </div>
        );
    }
}

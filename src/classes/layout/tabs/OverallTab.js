import FloatValue from '../elements/FloatValue';
import If from '../If';
import ProgressBar from '../elements/ProgressBar';
import React from 'react';

export default class OverallTab extends React.Component {
    getPerc(a, b) {
        var ap = 0;
        if (a + b != 0) {
            ap = Math.round(a * 100 / (a + b));
        }

        return ap;
    }

    render() {
        var left = this.props.data.left;
        var right = this.props.data.right;
        var settings = this.props.settings;

        if (this.props.tab != 'overall') {
            return null;
        }

        return (
            <div>
                <div className="bel-col-1-1 text-center bel-title bel-highlight-title">
                    Overall stats
                </div>
                <div className="bel-col-1-3 text-right">
                    <ul className="list-unstyled">
                        <li>
                            <If test={settings.showKills.value}>
                                <FloatValue green={true} a={left.hits} b={right.hits} text={'kills'}/>
                            </If>

                            <If test={settings.showDamagePerc.value}>
                                <FloatValue green={true} a={this.getPerc(left.damage, right.damage)} b={this.getPerc(right.damage, left.damage)} text={'%'}/>
                            </If>

                            <FloatValue green={true} a={left.damage} b={right.damage} />
                        </li>

                        <If test={settings.showAverageDamage.value}>
                            <li>
                                <FloatValue green={true} a={left.avgHit} b={right.avgHit} />
                            </li>
                        </If>

                        <li>
                            <FloatValue green={true} a={left.dps} b={right.dps} />
                        </li>
                    </ul>
                </div>
                <div className="bel-col-1-3 text-center">
                    <ul className="list-unstyled bel-titles">
                        <li>Total Damage</li>
                        <If test={settings.showAverageDamage.value}>
                            <li>Average Damage</li>
                        </If>
                        <li>DPS</li>
                    </ul>
                </div>
                <div className="bel-col-1-3 text-left">
                    <ul className="list-unstyled">
                        <li>
                            <FloatValue a={right.damage} b={left.damage} />

                            <If test={settings.showDamagePerc.value}>
                                <FloatValue b={this.getPerc(left.damage, right.damage)} a={this.getPerc(right.damage, left.damage)} text={'%'}/>
                            </If>

                            <If test={settings.showKills.value}>
                                <FloatValue a={right.hits} b={left.hits} text={'kills'} />
                            </If>
                        </li>
                        <If test={settings.showAverageDamage.value}>
                            <li>
                                <FloatValue a={right.avgHit} b={left.avgHit} />
                            </li>
                        </If>
                        <li>
                            <FloatValue a={right.dps} b={left.dps} />
                        </li>
                    </ul>
                </div>
                <div className="bel-col-1-1">
                    <If test={settings.showDamageBar.value}>
                        <div className="text-left bel-text-tiny">DAMAGE <span className="color-silver">(<strong>{Math.abs(left.damage - right.damage).toLocaleString()} </strong> difference)</span></div>
                        <ProgressBar a={left.damage} b={right.damage}/>
                    </If>

                    <If test={settings.showDpsBar.value}>
                        <ProgressBar a={left.dps} b={right.dps}/>
                        <div className="text-left bel-text-tiny">DPS <span className="color-silver">(<strong>{Math.abs(left.dps - right.dps).toLocaleString()}</strong> difference)</span></div>
                    </If>
                </div>
            </div>
        );
    }
}
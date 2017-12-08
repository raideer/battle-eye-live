import React from 'react';

export default class MiniMonitor extends React.Component {
    getPerc(a, b) {
        var ap = 0;
        if (a + b !== 0) {
            ap = Math.round(a * 10000 / (a + b)) / 100;
        }

        return ap;
    }

    printDivisions() {
        var data = [];
        var left = this.props.feedData.left;
        var right = this.props.feedData.right;

        var divs = [];

        if (SERVER_DATA.division == 11) {
            divs = [11];
        } else {
            divs = [1, 2, 3, 4];
        }

        for (var i in divs) {
            var div = divs[i];
            var leftDamage = left.divisions[`div${div}`].damage;
            var rightDamage = right.divisions[`div${div}`].damage;

            data.push(<div key={i}><div className={`bel-div bel-div${div}`}></div> {this.getPerc(leftDamage, rightDamage)}% - {this.getPerc(rightDamage, leftDamage)}%</div>);
        }

        return data;
    }

    render() {
        if (!window.BattleEyeSettings.showMiniMonitor.value) {
            return null;
        }

        return (
            <div className="bel-minimonitor">
                {this.printDivisions()}
            </div>
        );
    }
}
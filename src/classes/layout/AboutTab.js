import React from 'react';

export default class AboutTab extends React.Component {
    constructor() {
        super();

        this.state = {
            activeUsers: 'loading...',
            currentlyUsing: 'loading...'
        };

        this.loadActiveUsers();
    }

    async loadActiveUsers() {
        this.state.activeUsers = await $j.getJSON(`${BattleEye.apiURL}/users`);
        this.state.currentlyUsing = await $j.getJSON(`${BattleEye.apiURL}/users/5minutes`);
    }

    render() {
        return (
            <div className="battleeye__about has-text-left columns">
                <div className="column">
                    <h1>BattleEye</h1>
                    <div className="tags has-addons">
                        <div className="tag is-dark">Installed version</div>
                        <div className="tag is-info">v{ GM_info.script.version }</div>
                    </div>
                    <div className="tags has-addons">
                        <div className="tag is-dark">Total active BattleEye users</div>
                        <div className="tag is-info">{ this.state.activeUsers }</div>
                    </div>
                    <div className="tags has-addons">
                        <div className="tag is-dark">Currently using</div>
                        <div className="tag is-info">{ this.state.currentlyUsing }</div>
                    </div>
                </div>
                <div className="column">
                    <h2>Have questions or suggestions?</h2>
                    <div>Join our <b>Discord</b> channel:</div>
                    <div><a className="button is-light" href="https://discord.gg/4qeExQz">https://discord.gg/4qeExQz</a></div>
                </div>
            </div>
        );
    }
}
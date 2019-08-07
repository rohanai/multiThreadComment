import PubSub from '../lib/pubSub';

export default class Store {
    constructor(params) {
        let self = this;
        this.actions = {};
        this.mutations = {};
        this.events = new PubSub();
        this.status = 'resting';

        if (params.actions) {
            this.actions = params.actions;
        }

        if (params.mutations) {
            this.mutations = params.mutations;
        }

        this.state = new Proxy(params.state || {}, {
            set: function(state, key, val) {
                state[key] = val;
                
                if (this.status === 'mutating') {
                    console.warn();
                }

                
            }
        })
    }
}
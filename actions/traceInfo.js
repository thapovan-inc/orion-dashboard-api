const {Action} = require('actionhero')

module.exports = class TraceInfo extends Action {
    constructor () {
        super()
        this.name = 'TraceInfo'
        this.description = 'Will return information on trace'
    }

    async run (data) {
        const api = ActionHero.api
        var requestStatistics = {data:[
            { traceId: uuidv4(), requestTime: Date.now(), duration: 1, status: 'PASS' },
            { traceId: uuidv4(), requestTime: 22222, duration: 2, status: 'SLOW' },
            { traceId: uuidv4(), requestTime: 33333, duration: 3, status: 'FAIL' },
            { traceId: uuidv4(), requestTime: 44444, duration: 4, status: 'PASS' },
            { traceId: uuidv4(), requestTime: 55555, duration: 5, status: 'SLOW' },
            { traceId: uuidv4(), requestTime: 66666, duration: 6, status: 'FAIL' }
        ]};
        data.response.nodeStatus = data.connection.localize('status')
        data.response.data = requestStatistics;
    }
}
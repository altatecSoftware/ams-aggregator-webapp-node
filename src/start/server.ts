import express, { Application } from "express"
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'

export class Server {
    private _expressApp: Application
    private _config: any
    private _sqs: any

    constructor({config, sqs}: any){
        this._config = config
        this._expressApp = express()
        this._expressApp.use(morgan('tiny'))
        this._expressApp.use(cors())
        this._expressApp.use(compression())
        this._sqs = sqs
    }

    public async start(){
        this._expressApp.listen(this._config.SERVER_PORT, () => {
            console.log(`Server running on port: ${this._config.SERVER_PORT}`);
        })
        //await this._sqs.sendMessageToQueue("My Third Message to Amazon SQS")
        await this._sqs.receiveMessageFromQueue()
    }
}
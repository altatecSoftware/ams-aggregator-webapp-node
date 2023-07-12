import { InjectionMode, asClass, asValue, createContainer } from "awilix";

//initial config
import { Server } from "./server";
import { SimpleQueueService } from "../amazon-sqs/sqs.service";
import config from "../config";


const container = createContainer({
    injectionMode: InjectionMode.PROXY
})

container
    .register({
        server: asClass(Server).singleton(), 
        config: asValue(config),
        sqs: asClass(SimpleQueueService).singleton(),
    })

export default container
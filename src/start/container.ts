import { InjectionMode, asClass, asValue, createContainer } from "awilix";

//initial config
import { Server } from "./server";
import config from "../config";


const container = createContainer({
    injectionMode: InjectionMode.PROXY
})

container
    .register({
        server: asClass(Server).singleton(), 
        config: asValue(config)
    })

export default container
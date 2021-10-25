import {Module} from "vuex";
import { WebsocketMessage } from 'models';

export interface DockerDataModule<S> extends Module<S, any> {
    handleWebsocketMessage?: (store: S, message: WebsocketMessage) => void
}

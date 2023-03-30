import { ObjectType } from "../../dependencyInjection";

export interface IMessageHandlerDescriptor<TMessage = any> {
    methodName: string;
    method: (m: TMessage) => void;
    messageType: ObjectType;
}

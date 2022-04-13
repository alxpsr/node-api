export class XhrErrorModel {
    constructor(method, message, args) {
        this.method = method;
        this.mesage = message;
        console.log(args);
        this.callArguments = { ...args };
    }
}

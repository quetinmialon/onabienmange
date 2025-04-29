export default class EmptyStackError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EmptyStackError";
    }
}
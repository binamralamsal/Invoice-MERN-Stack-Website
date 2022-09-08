export default class HttpException extends Error {
    public status: number;
    public message: string;
    public extraDetails?: object;

    constructor(status: number, message: string, extraDetails?: object) {
        super(message);
        this.status = status;
        this.message = message;
        this.extraDetails = extraDetails;
    }
}
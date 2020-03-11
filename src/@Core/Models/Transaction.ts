import moment from "moment";

export interface TransactionResponse {
    objectId: string;
    amount: number;
    description: string;
    on_date: number;
}

export class TransactionRequest {
    amount = 0;
    description = '';
    on_date;

    constructor(amount = 0, description = '', on_date = new Date()) {
        this.amount = amount;
        this.description = description;
        this.on_date = moment(on_date).format('YYYY-MM-DD');
    }
}
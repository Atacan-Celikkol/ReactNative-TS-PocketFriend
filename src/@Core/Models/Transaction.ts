import moment from "moment";

export interface TransactionResponse {
    amount: number;
    description: string;
    on_date: string;
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
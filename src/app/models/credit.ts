export interface Credit {
    _id: any;
    created: any;
    user_id: {
        _id: any,
        created: any,
        name: any,
        email: any,
        number_id: any,
        role: any,
    };
    balance: any;
    requested_value: any;
    state: any;
    date_to_pay: any;
    paid_out: any;
}

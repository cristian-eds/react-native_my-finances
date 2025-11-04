import { ColumnsOrderTransaction } from "./enums/columnsOrderTransaction";
import { OrderTypes } from "./enums/orderTypes";

export interface OrderTransactionModel {
    orderType?: OrderTypes,
    orderColumn?: ColumnsOrderTransaction
}
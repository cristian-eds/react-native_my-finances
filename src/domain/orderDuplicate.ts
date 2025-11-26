import { ColumnsOrderDuplicate } from "./enums/columnsOrderDuplicate";
import { OrderTypes } from "./enums/orderTypes";

export interface OrderDuplicate {
    orderType?: OrderTypes,
    orderColumn?: ColumnsOrderDuplicate
}
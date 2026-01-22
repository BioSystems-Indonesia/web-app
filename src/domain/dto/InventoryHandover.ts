export interface InventoryHandoverRequest {
  employeeId: string;
  inventoryId: string;
  handoverDate: Date;
  conditionNotes: string;
  signatureFile: string;
}

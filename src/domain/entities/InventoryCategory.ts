export class InventoryCategory {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

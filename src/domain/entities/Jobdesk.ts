export class Jobdesk {
  constructor(
    public id: string,
    public title: string,
    public description: string | null,
    public positionId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

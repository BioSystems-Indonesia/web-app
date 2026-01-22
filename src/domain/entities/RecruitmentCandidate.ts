export class RecruitmentCandidate {
  constructor(
    public id: string,
    public fullName: string,
    public email: string | null,
    public phone: string,
    public birthDate: Date,
    public address: string,
    public domicile: string,
    public status: string,
    public appliedAt: Date,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

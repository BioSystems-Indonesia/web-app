export class CandidateExperience {
  constructor(
    public id: string,
    public candidateId: string,
    public companyName: string,
    public jobTitle: string,
    public startDate: Date,
    public endDate: Date | null,
    public description: string | null,
    public isStillWorking: boolean
  ) {}
}

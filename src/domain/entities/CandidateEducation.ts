export class CandidateEducation {
  constructor(
    public id: string,
    public candidateId: string,
    public highestDegree: string,
    public institutionName: string,
    public fieldOfStudy: string,
    public endYear: number | null,
    public gpa: number | null
  ) {}
}

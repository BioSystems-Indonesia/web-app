export interface PerformanceReviewRequest {
  employeeId: string;
  period: string;

  workQuality: number;
  communication: number;
  workMethod: number;
  problemSolving: number;

  compliance: number;
  discipline: number;
  cleanliness: number;
  initiative: number;

  specialTaskScore: number;
  weight: number;
  totalScore: number;
  ranking?: number | null;
}

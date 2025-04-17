interface AIResponseType {
  isSpam: boolean;
  validityScore: number;
  validityScoreReason: string;
  priority: string;
  followUpQuestions: string[];
}

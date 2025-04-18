interface AIResponseType {
  isSpam: boolean;
  validityScore: number;
  validationScoreReason: string;
  priority: string;
  followUpQuestions: string[];
}

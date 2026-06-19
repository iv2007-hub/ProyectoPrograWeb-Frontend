export interface Experiment {
  id: string;
  title: string;
  result: string;
  success: boolean;
  userId: string;
  createdAt: string;
}

export interface ExperimentDto {
  title: string;
  result: string;
  success: boolean;
}

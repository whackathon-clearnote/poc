export type Consultation = {
  id: number;
  date: string;
  type: "H&P" | "Consult" | "Review";
  title: string;
  notes: string;
};

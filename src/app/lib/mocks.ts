import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary } from "../api/summary/model";

export const mockConsultations: Consultation[] = [
  {
    id: 1,
    date: "2025-08-20",
    type: "Review",
    title: "Review - 20/08",
    notes: `
      Mock Doctor's Notes
      <age> <gender>
    
      60kg

      Current Medication History
      Atorvastatin 40mg OM PO
      Entresto 49/51 OM PO
      Bisoprolol 2.5mg OM PO
      Empagliflozin 25mg OM PO
      Furosemide 40mg OM PO
      Potassium chloride 1.2g OM PO

      PMHx
      1. HFpEF
      - on follow-up with NHC cardio previously
      2. HLD
      3. HTN
      Eats 2 servings of fruits daily, mainly bananas, grapes
      Bland vegetables and rice for lunch and dinner
      No soft drinks

      Impression
      HF - leading to mild pedal oedema

      Plan
      Increase frusemide 40mg OM → 60mg OM if have leg swelling
      Increase KCl → 1.2g BD if increase frusemide dose.
      TCU 3/12
  `,
  },
  {
    id: 2,
    date: "2025-08-19",
    type: "H&P",
    title: "H&P - 19/08",
    notes:
      "Performed history and physical examination. Noted vital signs and preliminary findings.",
  },
  {
    id: 3,
    date: "2025-08-18",
    type: "Consult",
    title: "Consultation - 18/08",
    notes:
      "Initial consultation with the patient. Discussed symptoms and medical history.",
  },
];

export const mockSummary: Summary = {
  start: ["Metformin 500mg BD", "Amlodipine 10mg OD"],
  change: [
    "Increase Furosemide from 20mg → 40mg",
    "Decrease Amlodipine from 10mg → 5mg",
  ],
  stop: ["Aspirin 75mg"],
};

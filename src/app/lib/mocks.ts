import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary } from "../api/summary/model";
import { v4 as uuidv4 } from "uuid";

export const mockConsultations: Consultation[] = [
  {
    id: 1,
    date: "2025-08-20",
    type: "Review",
    title: "Review - 20/08",
    notes: `
      <MOCK NOTES>

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
  start: [
    {
      id: uuidv4(),
      content: "Metformin 500mg BD",
      begIndex: 60,
      endIndex: 139,
    },
    {
      id: uuidv4(),
      content: "Amlodipine 10mg OD",
      begIndex: 146,
      endIndex: 200,
    },
  ],
  change: [
    {
      id: uuidv4(),
      content: "Increase Furosemide from 20mg → 40mg",
      begIndex: 548,
      endIndex: 605,
    },
    {
      id: uuidv4(),
      content: "Decrease Amlodipine from 10mg → 5mg",
      begIndex: 612,
      endIndex: 661,
    },
  ],
  stop: [
    { id: uuidv4(), content: "Aspirin 75mg", begIndex: 669, endIndex: 677 },
  ],
};

export const mockSummaries: { [id: number]: Summary } = {
  1: mockSummary,
  2: {
    description: [
      {
        id: uuidv4(),
        content:
          "Doctor performed a medical examination and noted vital signs.",
      },
    ],
    start: [],
    change: [],
    stop: [],
  },
  3: {
    description: [
      {
        id: uuidv4(),
        content:
          "Doctor performed an initial consult with the patient and discussed symptoms and medical history.",
      },
    ],
    start: [],
    change: [],
    stop: [],
  },
};

import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary, Term, TermResult } from "../api/summary/model";
import { v4 as uuidv4 } from "uuid";
import AhoCorasick from "ahocorasick";

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
      Start metformin 500mg BD for diabetes
      Start amlodipine 10mg OD for hypertension, decrease to 5mg if BP < 100/60
      Stop aspirin
      Increase frusemide 40mg OM → 60mg OM if have leg swelling
      Increase KCl → 1.5g BD if increase frusemide dose.
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
  description: [
    {
      id: uuidv4(),
      content:
        "The patient has a history of heart failure with preserved heart function, high blood pressure, and high cholesterol. They were previously followed by the cardiology team at NHC.",
      begIndex: 253,
      endIndex: 316,
    },
    {
      id: uuidv4(),
      content:
        "In terms of diet, they usually eat two servings of fruit daily (mainly bananas and grapes) and have simple vegetables with rice for lunch and dinner. They do not drink soft drinks.",
      begIndex: 342,
      endIndex: 471,
    },
    {
      id: uuidv4(),
      content:
        "Currently, their heart condition is causing mild swelling in the feet.",
      begIndex: 479,
      endIndex: 529,
    },
  ],
  start: [
    {
      id: uuidv4(),
      content: "Metformin 500mg BD for diabetes",
      begIndex: 548,
      endIndex: 592,
    },
    {
      id: uuidv4(),
      content: "Amlodipine 10mg OD for hypertension (5mg if BP < 100/60)",
      begIndex: 592,
      endIndex: 672,
    },
  ],
  change: [
    {
      id: uuidv4(),
      content: "Increase Furosemide from 20mg → 40mg if have leg swelling",
      begIndex: 691,
      endIndex: 755,
    },
    {
      id: uuidv4(),
      content: "Increase KCl from 1.2g → 1.5g due to Furosemide increase",
      begIndex: 755,
      endIndex: 812,
    },
  ],
  stop: [
    { id: uuidv4(), content: "Aspirin 75mg", begIndex: 672, endIndex: 684 },
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

export const terms: { [key: string]: Term } = {
  amlodipine: {
    key: "amlodipine",
    link: "https://www.healthhub.sg/medication-devices-and-treatment/medications/amlodipine",
    description:
      "Calcium channel blocker medication used to treat high BP, CAD, and variant angina",
  },
  aspirin: {
    key: "aspirin",
    link: "https://www.healthhub.sg/medication-devices-and-treatment/medications/aspirin",
    description:
      "NSAID used to reduce pain, fever, and inflammation; antithrombotic",
  },
  furosemide: {
    key: "frusemide",
    link: "https://www.healthhub.sg/medication-devices-and-treatment/medications/frusemide",
    description:
      "Loop diuretic used to treat edema due to heart failure, liver scarring, or kidney disease",
  },
  metformin: {
    key: "metformin",
    link: "https://www.healthhub.sg/medication-devices-and-treatment/medications/metformin",
    description:
      "Main first-line medication for the treatment of type 2 diabetes",
  },
  diabetes: {
    key: "diabetes",
    link: "https://www.healthhub.sg/health-conditions/pocket-guide-to-diabetes",
    description:
      "Chronic condition that affects the way the body metabolizes sugar (glucose)",
  },
  hypertension: {
    key: "hypertension",
    link: "https://www.healthhub.sg/health-conditions/understanding-hypertension",
    description:
      "Condition in which the blood pressure in the arteries is persistently elevated",
  },
  lisinopril: {
    key: "lisinopril",
    link: "https://www.healthhub.sg/medication-devices-and-treatment/medications/lisinopril",
    description:
      "Lisinopril lowers blood pressure by reducing the production of a substance called Angiotensin II which causes the blood vessels to narrow",
  },
};

const ac = new AhoCorasick(Object.keys(terms).map((t) => t.toLowerCase()));
export const findTerms = (text: string) => {
  const results: TermResult[] = [];
  for (const [endIndex, hits] of ac.search(text.toLowerCase())) {
    const firstHit = hits[0];
    results.push({
      index: endIndex - firstHit.length + 1,
      term: terms[firstHit],
    });
  }
  results.sort((r1, r2) => r1.index - r2.index);
  // TODO: ensure results index ranges do not overlap
  return results;
};

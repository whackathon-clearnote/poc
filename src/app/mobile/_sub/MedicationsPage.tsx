"use client";

import { terms } from "@/app/lib/mocks";
import React from "react";

const linkifyText = (text: string) => {
  const words = Object.keys(terms);
  const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");

  const parts = text.split(regex);

  return parts.map((part, idx) => {
    const key = part.toLowerCase();
    if (terms[key]) {
      return (
        <a
          key={idx}
          href={terms[key].link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const MedCard = ({
  title,
  instructions,
  duration,
}: {
  title: string;
  instructions: string;
  duration: string;
}) => {
  return (
    <div className="border-t pt-2">
      <p className="font-medium">{linkifyText(title)}</p>
      <p className="text-sm text-gray-600">{linkifyText(instructions)}</p>
      <p className="text-xs text-gray-400">Duration/Quantity: {duration}</p>
    </div>
  );
};

export const MedicationsPage = () => {
  return (
    <div className="space-y-6">
      {/* Start new meds */}
      <div className="border-2 border-green-500 rounded-xl p-3">
        <h3 className="font-semibold">Start these new medications:</h3>
        <div className="mt-2 space-y-3">
          <MedCard
            title="Metformin 500mg Tablet"
            instructions="Take 1 tablet 2 times a day for treatment of diabetes."
            duration="/ 30 tabs"
          />
          <MedCard
            title="Amlodipine 10mg Tablet"
            instructions="Take 1 tablet once every morning for treatment of hypertension."
            duration="/ 30 tabs"
          />
        </div>
      </div>

      {/* Changes to existing meds */}
      <div className="border-2 border-yellow-500 rounded-xl p-3">
        <h3 className="font-semibold">Changes to existing medications:</h3>
        <div className="mt-2 space-y-3">
          <MedCard
            title="Furosemide 20mg Tablet"
            instructions="Take half tablet twice daily. Take one tablet twice daily if leg swelling."
            duration="/ 60 tabs"
          />
          <MedCard
            title="Lisinopril 20mg Tablet"
            instructions="Take two tablets daily if blood pressure remains above target. Lowers blood pressure and protects kidney function."
            duration="/ 30 tabs"
          />
        </div>
      </div>

      {/* Stop meds */}
      <div className="border-2 border-red-500 rounded-xl p-3">
        <h3 className="font-semibold">Stop taking these medications:</h3>
        <div className="mt-2">
          <p className="font-medium">{linkifyText("Aspirin 75mg")}</p>
          <p className="text-sm text-gray-600">
            Reason: {linkifyText("Stroke prophylaxis completed.")}
          </p>
        </div>
      </div>
    </div>
  );
};

import { NextRequest } from "next/server";
import { Consultation } from "./model";

export const getPatientConsultations = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Simulate fetching consultations from a database or API
  const routeParams = await params;
  const patientId = routeParams.id;
  const consultations: Consultation[] = [];

  return consultations;
};

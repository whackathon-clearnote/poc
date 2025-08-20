import { NextRequest, NextResponse } from "next/server";
import { Consultation } from "./model";

export const getPatientConsultations = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Simulate fetching consultations from a database or API
  const routeParams = await params;
  const patientId = routeParams.id;
  const consultations: Consultation[] = ((_id: string) => [])(patientId);

  return NextResponse.json({ status: 200, data: consultations });
};

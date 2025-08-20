import { NextRequest, NextResponse } from "next/server";

export const generateSummary = async (req: NextRequest) => {
  const body = await req.json();

  const summary = ((_body: string) => "test summary")(body);

  return NextResponse.json({ status: 200, data: summary });
};

export type SummaryChunk = {
  id: string;
  content: string;
  // beginning and end indices of the original text
  // that demarcates where this summary chunk was generate from
  begIndex?: number;
  endIndex?: number;
};

export type Summary = {
  description?: SummaryChunk[];
  start: SummaryChunk[];
  change: SummaryChunk[];
  stop: SummaryChunk[];
};

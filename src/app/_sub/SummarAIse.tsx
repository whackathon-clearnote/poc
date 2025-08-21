import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary, SummaryChunk } from "@/app/api/summary/model";
import { findTerms, mockSummaries } from "@/app/lib/mocks";
import { useEffect, useState } from "react";

interface SummarAIseSectionProps {
  header: string;
  chunks: SummaryChunk[];
  selectedChunk?: SummaryChunk | null;
  setSelectedChunk: (chunk: SummaryChunk) => void;
}

const SummarAIseSection = ({
  header,
  chunks,
  selectedChunk,
  setSelectedChunk,
}: SummarAIseSectionProps) => {
  const parseChunk = (content: string) => {
    const terms = findTerms(content);
    const parts = [];
    let i = 0;
    let j = 0;
    for (const term of terms) {
      parts.push(<span key={j}>{content.substring(i, term.index)}</span>);
      i = term.index + term.term.key.length;
      parts.push(
        <Tooltip key={j + 1} arrow title={term.term.description}>
          <Link href={term.term.link} target="_blank" rel="noreferrer">
            {content.substring(term.index, i)}
          </Link>
        </Tooltip>,
      );
      j += 2;
    }
    parts.push(content.substring(i));
    return <Typography variant="body1">{parts}</Typography>;
  };

  return (
    <div key={header}>
      <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
        {header}
      </Typography>
      <List>
        {chunks.map((chunk) => (
          <ListItemButton
            key={chunk.id}
            selected={chunk.id === selectedChunk?.id}
            onClick={() => setSelectedChunk(chunk)}
          >
            {parseChunk(chunk.content)}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

interface Props {
  selected: Consultation | null;
  summaryOpen: boolean;
  setSummaryOpen: (open: boolean) => void;
}

const SummarAIseDialog = ({ selected, summaryOpen, setSummaryOpen }: Props) => {
  const [highlightedChunk, setHighlightedChunk] = useState<SummaryChunk | null>(
    null,
  );

  useEffect(() => {
    setHighlightedChunk(null);
  }, [selected]);

  if (!selected) {
    return null; // Don't render dialog if no consultation is selected
  }

  const summary: Summary = mockSummaries[selected.id];
  if (!summary) {
    return null;
  }

  const handleHighlightedChunkChange = (chunk: SummaryChunk) =>
    setHighlightedChunk(chunk.id === highlightedChunk?.id ? null : chunk);

  return (
    <Dialog fullScreen open={summaryOpen} onClose={() => setSummaryOpen(false)}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header - Fixed */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ccc",
            flexShrink: 0,
          }}
        >
          <Typography variant="h5">SummarAIser</Typography>
          <IconButton onClick={() => setSummaryOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Summary Section - 40% */}
          <Box
            sx={{
              width: "40%",
              p: 3,
              overflowY: "auto",
              borderRight: "1px solid #ccc",
            }}
          >
            <div>
              <Typography variant="h5">Summary</Typography>
              <Divider sx={{ my: 2 }} />
              {summary["description"] ? (
                <SummarAIseSection
                  header="Description"
                  chunks={summary["description"]}
                  selectedChunk={highlightedChunk}
                  setSelectedChunk={handleHighlightedChunkChange}
                />
              ) : null}
              {Object.entries(summary).map(([section, items]) =>
                ["start", "change", "stop"].includes(section) ? (
                  <SummarAIseSection
                    key={section}
                    header={section}
                    chunks={items}
                    selectedChunk={highlightedChunk}
                    setSelectedChunk={handleHighlightedChunkChange}
                  />
                ) : null,
              )}
            </div>
          </Box>

          {/* Notes Section - 60% */}
          <Box sx={{ width: "60%", p: 3, overflowY: "auto" }}>
            <Typography variant="h5">
              Doctor&apos;s notes for {selected.title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {highlightedChunk ? (
                <>
                  <span style={{ whiteSpace: "pre-line" }}>
                    {selected.notes.substring(
                      0,
                      highlightedChunk.begIndex || 0,
                    )}
                  </span>
                  <span
                    style={{
                      whiteSpace: "pre-line",
                      backgroundColor: "yellow",
                    }}
                  >
                    {selected.notes.substring(
                      highlightedChunk.begIndex || 0,
                      highlightedChunk.endIndex || undefined,
                    )}
                  </span>
                  <span style={{ whiteSpace: "pre-line" }}>
                    {selected.notes.substring(
                      highlightedChunk.endIndex || selected.notes.length,
                    )}
                  </span>
                </>
              ) : (
                selected.notes
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SummarAIseDialog;

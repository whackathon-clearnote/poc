import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { Summary, SummaryChunk } from "@/app/api/summary/model";
import { findTerms, mockSummaries } from "@/app/lib/mocks";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Close, Edit } from "@mui/icons-material";

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
  const [hoverTarget, setHoverTarget] = useState("");
  const [acceptedChunks, setAcceptedChunks] = useState<string[]>([]);
  const [rejectedChunks, setRejectedChunks] = useState<string[]>([]);

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
        </Tooltip>
      );
      j += 2;
    }
    parts.push(content.substring(i));
    return <Typography variant="body1">{parts}</Typography>;
  };

  const handleAcceptChunk = (id: string) => {
    setRejectedChunks(rejectedChunks.filter((c) => c !== id));
    if (!acceptedChunks.includes(id)) {
      setAcceptedChunks([...acceptedChunks, id]);
    }
  };

  const handleRejectChunk = (id: string) => {
    setAcceptedChunks(acceptedChunks.filter((c) => c !== id));
    if (!rejectedChunks.includes(id)) {
      setRejectedChunks([...rejectedChunks, id]);
    }
  };

  return (
    <div key={header}>
      <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
        {header}
      </Typography>
      <List>
        {chunks.map((chunk, i) => (
          <motion.div
            key={chunk.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className={
              "relative" +
              (acceptedChunks.includes(chunk.id) ? " bg-green-100" : "") +
              (rejectedChunks.includes(chunk.id) ? " bg-red-100" : "")
            }
            onHoverStart={() => setHoverTarget(chunk.id)}
            onHoverEnd={() => setHoverTarget("")}
          >
            <ListItemButton
              selected={chunk.id === selectedChunk?.id}
              onClick={() => setSelectedChunk(chunk)}
            >
              {parseChunk(chunk.content)}
            </ListItemButton>
            <AnimatePresence>
              {chunk.id === hoverTarget && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-0 top-0 z-10 rounded-full bg-white border-gray-300 border-1 drop-shadow-md"
                >
                  <ButtonGroup size="small">
                    <IconButton
                      color="success"
                      disabled={acceptedChunks.includes(chunk.id)}
                      onClick={() => handleAcceptChunk(chunk.id)}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      color="error"
                      disabled={rejectedChunks.includes(chunk.id)}
                      onClick={() => handleRejectChunk(chunk.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton color="info">
                      <Edit fontSize="medium" />
                    </IconButton>
                  </ButtonGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
  const [loading, setLoading] = useState(true);
  const [rejecting, setRejecting] = useState(false);
  const [highlightedChunk, setHighlightedChunk] = useState<SummaryChunk | null>(
    null
  );

  useEffect(() => {
    if (summaryOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [summaryOpen]);

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

  const summarySection = loading ? (
    <div>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Typography variant="h5">
        <Skeleton />
      </Typography>
      <Typography variant="body1">
        <Skeleton />
      </Typography>
    </div>
  ) : (
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
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SummarAIseSection
              header={section}
              chunks={items}
              selectedChunk={highlightedChunk}
              setSelectedChunk={handleHighlightedChunkChange}
            />
          </motion.div>
        ) : null
      )}
    </div>
  );

  return (
    <Dialog fullScreen open={summaryOpen} onClose={() => setSummaryOpen(false)}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header - Fixed */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "rgba(255,255,255,0.1)",
            flexShrink: 0,
            backgroundColor: "#1E3A8A",
            color: "white",
            boxShadow: 3,
          }}
        >
          {/* Title */}
          <Typography variant="h6" fontWeight={600}>
            SummarAIser{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                ml: 1,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              by ClearNote
            </Typography>
          </Typography>

          {/* Action buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setSummaryOpen(false)}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Summary Section - 40% */}
          <Box
            sx={{
              position: "relative",
              width: "40%",
              p: 3,
              overflowY: "auto",
              borderRight: "1px solid #ccc",
            }}
          >
            {summarySection}
            {rejecting ? (
              <motion.div
                key="rejection-actions"
                layout="preserve-aspect"
                layoutId="summary-actions"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                className="absolute p-2 right-0 bottom-0"
              >
                <ButtonGroup>
                  <Button onClick={() => setRejecting(false)}>Cancel</Button>
                  <Button color="error">Inaccurate info</Button>
                  <Button color="error">Missing info</Button>
                </ButtonGroup>
              </motion.div>
            ) : (
              <motion.div
                key="normal-actions"
                layout="preserve-aspect"
                layoutId="summary-actions"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                className="absolute p-2 right-0 bottom-0"
              >
                <ButtonGroup>
                  <Button color="info">Preview</Button>
                  <Button color="error" onClick={() => setRejecting(true)}>
                    Reject
                  </Button>
                </ButtonGroup>
              </motion.div>
            )}
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
                      highlightedChunk.begIndex || 0
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
                      highlightedChunk.endIndex || undefined
                    )}
                  </span>
                  <span style={{ whiteSpace: "pre-line" }}>
                    {selected.notes.substring(
                      highlightedChunk.endIndex || selected.notes.length
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

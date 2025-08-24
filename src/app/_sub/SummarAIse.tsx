import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { SummaryChunk } from "@/app/api/summary/model";
import { findTerms, mockSummaries } from "@/app/lib/mocks";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Close, Done, DoneAll, Edit, Send } from "@mui/icons-material";
import { useHotkeys } from "react-hotkeys-hook";

const hotkeyScope = ["summary"];

interface SummarAIseSectionProps {
  header: string;
  chunks: SummaryChunk[];
  selectedChunk?: SummaryChunk | null;
  setSelectedChunk: (chunk: SummaryChunk) => void;
  acceptedChunks: string[];
  rejectedChunks: string[];
  acceptChunks: (id: string[]) => void;
  acceptChunk: (id: string) => void;
  rejectChunk: (id: string) => void;
}

const SummarAIseSection = ({
  header,
  chunks,
  selectedChunk,
  setSelectedChunk,
  acceptedChunks,
  rejectedChunks,
  acceptChunks,
  acceptChunk,
  rejectChunk,
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
        </Tooltip>
      );
      j += 2;
    }
    parts.push(content.substring(i));
    return <Typography variant="body1">{parts}</Typography>;
  };

  return (
    <div key={header}>
      <div className="flex flex-row justify-between">
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {header}
        </Typography>
        <IconButton
          color="success"
          onClick={() => acceptChunks(chunks.map((c) => c.id))}
        >
          <DoneAll />
        </IconButton>
      </div>
      <List>
        {chunks.map((chunk) => (
          <motion.div
            key={chunk.id}
            animate={{
              border: "solid",
              borderColor:
                selectedChunk?.id === chunk.id ? "#ffdf21" : "#ffffff00",
              borderRadius: 8,
              backgroundColor:
                (acceptedChunks.includes(chunk.id) && "#dcfce7") ||
                (rejectedChunks.includes(chunk.id) && "#ffe2e2") ||
                "#ffffff00",
            }}
            className="relative"
            onHoverStart={() => setSelectedChunk(chunk)}
            onHoverEnd={() => setSelectedChunk(chunk)}
          >
            <ListItem>{parseChunk(chunk.content)}</ListItem>
            <AnimatePresence>
              {chunk.id === selectedChunk?.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-0 top-0 z-10 rounded-full bg-white border-gray-300 border-1 drop-shadow-md"
                >
                  <ButtonGroup size="small">
                    <IconButton color="info">
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      disabled={rejectedChunks.includes(chunk.id)}
                      onClick={() => acceptChunk(chunk.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      color="success"
                      disabled={acceptedChunks.includes(chunk.id)}
                      onClick={() => rejectChunk(chunk.id)}
                    >
                      <Done />
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

const SummarAIsePreview = ({ summary }: { summary: ReactNode }) => {
  const facilityName = "ABC Hospital";
  const doctorName = "Dr. Paul";
  const patientName = "John Doe";
  return (
    <div className="relative p-2 rounded-md border-1 border-gray-300 shadow-md">
      <Typography variant="body1">Dear Sir/Madam,</Typography>
      <br />
      <Typography variant="body1">
        You are receiving this report as the registered caregiver of{" "}
        {patientName}.
      </Typography>
      <br />
      <Typography variant="body1">
        On{" "}
        {new Date().toLocaleDateString("en-SG", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        at {facilityName}, {patientName} attended a consulation with{" "}
        {doctorName}. Below is a summary of the session:
      </Typography>
      <br />
      {summary}
      <br />
      <Typography variant="body1">
        Please contact {facilityName} (+65 9876 5432 | abchospital@abc.org)
        should you require more information.
      </Typography>
      <Typography variant="caption">
        This report was generated by SummarAIser.
      </Typography>
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSend, setPreviewSend] = useState(false);
  const [highlightedChunk, setHighlightedChunk] = useState<SummaryChunk | null>(
    null
  );
  const [acceptedChunks, setAcceptedChunks] = useState<string[]>([]);
  const [rejectedChunks, setRejectedChunks] = useState<string[]>([]);

  const handlePreviewOpen = () => {
    setPreviewSend(false);
    setPreviewOpen(true);
  };
  const handlePreviewSend = () => {
    setPreviewSend(true);
    setTimeout(() => setPreviewOpen(false), 400);
  };

  useHotkeys("alt+p", handlePreviewOpen, {
    scopes: hotkeyScope,
    enabled: !previewOpen,
  });
  useHotkeys("alt+s", handlePreviewSend, {
    scopes: hotkeyScope,
    enabled: previewOpen,
  });

  useEffect(() => {
    if (summaryOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [summaryOpen]);

  const summary = useMemo(
    () => (selected ? mockSummaries[selected.id] : null),
    [selected]
  );

  const allChunks = useMemo(
    () =>
      summary
        ? Object.values(summary).reduce((prev, curr) => [...prev, ...curr])
        : [],
    [summary]
  );

  const handlePrevChunk = () => {
    if (!highlightedChunk) {
      return;
    }
    const i = allChunks.findIndex((c) => c.id === highlightedChunk.id);
    if (i > 0) {
      setHighlightedChunk(allChunks[i - 1]);
    }
  };
  const handleNextChunk = () => {
    if (!highlightedChunk) {
      return;
    }
    const i = allChunks.findIndex((c) => c.id === highlightedChunk.id);
    if (i < allChunks.length - 1) {
      setHighlightedChunk(allChunks[i + 1]);
    }
  };
  const handleAcceptChunk = (id: string) => {
    setRejectedChunks(rejectedChunks.filter((c) => c !== id));
    if (!acceptedChunks.includes(id)) {
      setAcceptedChunks([...acceptedChunks, id]);
    }
  };
  const handleAcceptChunks = (ids: string[]) => {
    setAcceptedChunks([
      ...acceptedChunks,
      ...ids.filter(
        (id) => !acceptedChunks.includes(id) && !rejectedChunks.includes(id)
      ),
    ]);
  };
  const handleRejectChunk = (id: string) => {
    setAcceptedChunks(acceptedChunks.filter((c) => c !== id));
    if (!rejectedChunks.includes(id)) {
      setRejectedChunks([...rejectedChunks, id]);
    }
  };

  useHotkeys(
    "alt+up",
    () => {
      if (!highlightedChunk) {
        setHighlightedChunk(allChunks[0]);
        return;
      }
      handlePrevChunk();
    },
    { scopes: hotkeyScope, enabled: !previewOpen },
    [highlightedChunk, allChunks]
  );
  useHotkeys(
    "alt+down",
    () => {
      if (!highlightedChunk) {
        setHighlightedChunk(allChunks[0]);
        return;
      }
      handleNextChunk();
    },
    { scopes: hotkeyScope, enabled: !previewOpen },
    [highlightedChunk, allChunks, handleNextChunk]
  );
  useHotkeys(
    "alt+left",
    () => {
      if (highlightedChunk) {
        handleRejectChunk(highlightedChunk.id);
      }
      handleNextChunk();
    },
    { scopes: hotkeyScope, enabled: !previewOpen },
    [highlightedChunk, handleRejectChunk, handleNextChunk]
  );
  useHotkeys(
    "alt+right",
    () => {
      if (highlightedChunk) {
        handleAcceptChunk(highlightedChunk.id);
      }
      handleNextChunk();
    },
    { scopes: hotkeyScope, enabled: !previewOpen },
    [highlightedChunk, handleAcceptChunk, handleNextChunk]
  );
  useHotkeys(
    "alt+a",
    () => {
      handleAcceptChunks(allChunks.map((c) => c.id));
    },
    { scopes: hotkeyScope, enabled: !previewOpen },
    [allChunks, handleAcceptChunks]
  );

  if (!selected || !summary) {
    return null; // Don't render dialog if no consultation is selected
  }

  const handleHighlightedChunkChange = (chunk: SummaryChunk) =>
    setHighlightedChunk(chunk.id === highlightedChunk?.id ? null : chunk);

  const dialogTitle = (
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
  );

  const dialogActionButtons = (
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
  );

  const summarySections = (
    <>
      {summary["description"] ? (
        <SummarAIseSection
          header="Description"
          chunks={summary["description"]}
          selectedChunk={highlightedChunk}
          setSelectedChunk={handleHighlightedChunkChange}
          acceptedChunks={acceptedChunks}
          rejectedChunks={rejectedChunks}
          acceptChunks={handleAcceptChunks}
          acceptChunk={handleAcceptChunk}
          rejectChunk={handleRejectChunk}
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
            acceptedChunks={acceptedChunks}
            rejectedChunks={rejectedChunks}
            acceptChunks={handleAcceptChunks}
            acceptChunk={handleAcceptChunk}
            rejectChunk={handleRejectChunk}
          />
        ) : null
      )}
    </>
  );

  const summaryContent = loading ? (
    <div>
      <Typography variant="h1">
        <Skeleton />
      </Typography>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Typography variant="h5">
        <Skeleton />
      </Typography>
    </div>
  ) : (
    <div className="relative">
      <Card className="flex flex-col gap-1 p-2 mb-4">
        <Typography variant="body1">Keyboard shortcuts</Typography>
        <Typography variant="caption">
          ALT+(UP/DOWN) to move between items
        </Typography>
        <Typography variant="caption">
          ALT+(LEFT/RIGHT) to reject/accept items
        </Typography>
        <Typography variant="caption">ALT+A to accept all items</Typography>
      </Card>
      <Typography variant="h5">Summary</Typography>
      <Divider sx={{ my: 2 }} />
      {summarySections}
      {/* Simulated text generation animation */}
      {loading || (
        <motion.div
          animate={{ height: 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full bottom-0 right-0 bg-gradient-to-b from-transparent to-white to-5%"
        />
      )}
    </div>
  );

  const summaryActionsVariants = {
    visible: { opacity: 1, filter: "blur(0px)" },
    blurred: { opacity: 0, filter: "blur(24px)" },
  };
  const summaryActions = rejecting ? (
    <motion.div
      key="rejection-actions"
      layout="preserve-aspect"
      layoutId="summary-actions"
      variants={summaryActionsVariants}
      initial="blurred"
      animate="visible"
      exit="blurred"
    >
      <Button onClick={() => setRejecting(false)}>Cancel</Button>
      <Button color="error">Inaccurate info</Button>
      <Button color="error">Missing info</Button>
    </motion.div>
  ) : (
    <motion.div
      key="normal-actions"
      layout="preserve-aspect"
      layoutId="summary-actions"
      variants={summaryActionsVariants}
      initial="blurred"
      animate="visible"
      exit="blurred"
    >
      <Button color="info" onClick={handlePreviewOpen}>
        <u>P</u>review
      </Button>
      <Button color="error" onClick={() => setRejecting(true)}>
        Reject
      </Button>
    </motion.div>
  );

  const previewDialog = (
    <>
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        scroll="paper"
        maxWidth="md"
      >
        <DialogTitle>Preview Summary</DialogTitle>
        <DialogContent dividers>
          <AnimatePresence>
            {previewSend || (
              <motion.div
                key="preview-content"
                exit={{
                  transform: [
                    "translateY(0) scale(1)",
                    "translateY(0) scale(0.8)",
                    "translateY(-200%) scale(0.8)",
                  ],
                  opacity: [1, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  ease: ["easeOut", "easeIn"],
                }}
              >
                <SummarAIsePreview summary={summarySections} />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button
              startIcon={<Send />}
              variant="contained"
              onClick={handlePreviewSend}
              disabled={previewSend}
            >
              <u>S</u>end
            </Button>
            <Button startIcon={<Close />} onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={previewSend}
        onClose={() => setPreviewSend(false)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Summary sent!
        </Alert>
      </Snackbar>
    </>
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
          {dialogTitle}
          {dialogActionButtons}
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
            {summaryContent}
            <Divider />
            {summaryActions}
            {previewDialog}
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

import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { AnimatePresence, motion } from "motion/react";
import { SummarAIseSection } from "./SummarAIse/SummarAIseSection";
import { SummarAIsePreview } from "./SummarAIse/SummarAIsePreview";
import { Close, Send } from "@mui/icons-material";
import { useSummarAIse } from "./SummarAIse/hook/useSummarAIse";

interface Props {
  selected: Consultation | null;
  summaryOpen: boolean;
  setSummaryOpen: (open: boolean) => void;
}

const SummarAIseDialog = ({ selected, summaryOpen, setSummaryOpen }: Props) => {
  const {
    loading,
    rejecting,
    setRejecting,
    previewOpen,
    setPreviewOpen,
    previewSend,
    setPreviewSend,
    handlePreviewSend,
    summary,
    highlightedChunk,
    handleHighlightedChunkChange,
    acceptedChunks,
    rejectedChunks,
    handleAcceptChunk,
    handleAcceptChunks,
    handleRejectChunk,
    handlePreviewOpen,
  } = useSummarAIse({ selected, summaryOpen });

  if (!selected || !summary) {
    return null; // Don't render dialog if no consultation is selected
  }

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
          transition={{ duration: 1.5 }}
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
              width: "45%",
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
          <Box sx={{ width: "55%", p: 3, overflowY: "auto" }}>
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

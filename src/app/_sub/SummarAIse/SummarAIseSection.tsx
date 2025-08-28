import { SummaryChunk } from "@/app/api/summary/model";
import { findTerms } from "@/app/lib/mocks";
import { Close, Done, DoneAll, Edit } from "@mui/icons-material";
import {
  ButtonGroup,
  IconButton,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

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

export const SummarAIseSection = ({
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

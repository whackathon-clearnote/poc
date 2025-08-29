import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { SummaryChunk } from "@/app/api/summary/model";
import { mockSummaries } from "@/app/lib/mocks";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  selected: Consultation | null;
  summaryOpen: boolean;
}

const hotkeyScope = ["summary"];

/**
 * TODO: refactor hook into context provider for summarAIse component if we make it to finals
 */
export const useSummarAIse = ({ selected, summaryOpen }: Props) => {
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

  const handleHighlightedChunkChange = (chunk: SummaryChunk) =>
    setHighlightedChunk(chunk.id === highlightedChunk?.id ? null : chunk);

  return {
    loading,
    setLoading,
    rejecting,
    setRejecting,
    previewOpen,
    setPreviewOpen,
    previewSend,
    setPreviewSend,
    summary,
    highlightedChunk,
    handleHighlightedChunkChange,
    acceptedChunks,
    handleAcceptChunks,
    rejectedChunks,
    handleAcceptChunk,
    handleRejectChunk,
    handlePreviewSend,
    handlePreviewOpen,
  };
};

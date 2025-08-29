import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { mockConsultations } from "@/app/lib/mocks";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  selected: Consultation | null;
  setSelected: (consultation: Consultation | null) => void;
}

const LeftPanel = ({ selected, setSelected }: Props) => {
  const handleSelectIndex = (i: number) => setSelected(mockConsultations[i]);

  // Temporarily done this way to prevent build error (react-hooks/rules-of-hooks)
  useHotkeys("alt+1", () => handleSelectIndex(0), { scopes: ["main"] });
  useHotkeys("alt+2", () => handleSelectIndex(1), { scopes: ["main"] });
  useHotkeys("alt+3", () => handleSelectIndex(2), { scopes: ["main"] });
  useHotkeys("alt+4", () => handleSelectIndex(3), { scopes: ["main"] });
  useHotkeys("alt+5", () => handleSelectIndex(4), { scopes: ["main"] });
  useHotkeys("alt+6", () => handleSelectIndex(5), { scopes: ["main"] });
  useHotkeys("alt+7", () => handleSelectIndex(6), { scopes: ["main"] });
  useHotkeys("alt+8", () => handleSelectIndex(7), { scopes: ["main"] });
  useHotkeys("alt+9", () => handleSelectIndex(8), { scopes: ["main"] });

  return (
    <Box
      sx={{
        width: "40%",
        p: 2,
        overflowY: "auto",
      }}
    >
      <TextField
        label="Enter Patient ID"
        fullWidth
        variant="outlined"
        size="small"
      />
      <Paper className="mt-4">
        {/* Title above the list */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", p: 2, fontSize: 20 }}
          gutterBottom
        >
          Showing consultation records for patient John Doe
        </Typography>
        <List>
          {mockConsultations.map((c, i) => (
            <ListItem
              key={c.id}
              disablePadding
              secondaryAction={
                i + 1 < 10 ? (
                  <Typography variant="caption">
                    <u>{i + 1}</u>
                  </Typography>
                ) : undefined
              }
            >
              <ListItemButton
                selected={selected?.id === c.id}
                onClick={() => setSelected(c)}
              >
                <ListItemText primary={c.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default LeftPanel;

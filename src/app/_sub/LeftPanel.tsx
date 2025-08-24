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

  for (let i = 0; i < 9; i += 1) {
    useHotkeys(`alt+${i + 1}`, () => handleSelectIndex(i), {
      scopes: ["main"],
    });
  }

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

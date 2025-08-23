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
} from "@mui/material";

interface Props {
  selected: Consultation | null;
  setSelected: (consultation: Consultation | null) => void;
}

const LeftPanel = ({ selected, setSelected }: Props) => {
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
            <ListItem key={c.id + " " + i} disablePadding>
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

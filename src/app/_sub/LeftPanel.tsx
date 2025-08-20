import { Consultation } from "@/app/api/patients/[id]/consults/model";
import { mockConsultations } from "@/app/lib/mocks";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
        borderRight: "1px solid #ccc",
        p: 2,
      }}
    >
      <TextField
        label="Enter Patient ID"
        fullWidth
        variant="outlined"
        size="small"
      />
      <Divider sx={{ my: 2 }} />
      <List>
        {mockConsultations.map((c) => (
          <ListItem key={c.id} disablePadding>
            <ListItemButton
              selected={selected?.id === c.id}
              onClick={() => setSelected(c)}
            >
              <ListItemText primary={c.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftPanel;

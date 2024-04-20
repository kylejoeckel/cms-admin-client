import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ContentManagementButtons = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <IconButton
            size="small"
            color="warning"
            onClick={onRemove}
            sx={{ mx: 1 }}
        >
            <Remove />
        </IconButton>
        <IconButton
            size="small"
            color="primary"
            onClick={onAdd}
        >
            <Add />
        </IconButton>
    </div>
);

export default ContentManagementButtons;
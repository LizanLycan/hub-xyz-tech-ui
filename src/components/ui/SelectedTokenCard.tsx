import {
  Avatar,
  Box,
  Card,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { type TokenFromExplorer } from "../../schemas/tokens.schema";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TollIcon from "@mui/icons-material/Toll";
import TokenIcon from "@mui/icons-material/Token";

export const SelectedTokenCard = ({
  token,
  onCheckedBookmark,
  onDelete,
}: {
  token: TokenFromExplorer;
  onCheckedBookmark: (checked: boolean) => void;
  onDelete: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, gap: 2 }}>
      {token.logo ? (
        <Avatar src={token.logo} alt={token.symbol} />
      ) : (
        <Avatar sx={{ bgcolor: blue.A700 }}>{token.symbol[0]}</Avatar>
      )}
      {token.type === "token" ? (
        <TollIcon fontSize="large" color="secondary" />
      ) : (
        <TokenIcon fontSize="large" color="secondary" />
      )}
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="h6" noWrap>
          [{token.symbol}] {token.name}
        </Typography>
        <Typography variant="body2" noWrap color={"GrayText"}>
          {token.address}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <FormControl>
          <RadioGroup name="radio-buttons-group">
            <FormControlLabel
              sx={{ overflow: "hidden" }}
              checked={checked}
              value="bookmarked"
              control={
                <Radio
                  onClick={() =>
                    setChecked((_checked) => {
                      onCheckedBookmark(!_checked);
                      return !_checked;
                    })
                  }
                />
              }
              label={
                <Typography variant="caption" noWrap>
                  Bookmark
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        <IconButton
          aria-label="delete"
          size="large"
          color="secondary"
          onClick={onDelete}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Card>
  );
};

import { Grid } from "@mui/material";
import { type OptionsTokenFromExplorer } from "../../schemas/tokens.schema";
import { SelectedProjectCard } from "./SelectedTokenCard";

export const ListSelectedTokens = ({
  tokens,
  onCheckedBookmark,
  onDelete,
}: {
  tokens: OptionsTokenFromExplorer;
  onCheckedBookmark: (index: number, checked: boolean) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <Grid container spacing={2} sx={{ py: 8 }}>
      {tokens?.map((token, index) => (
        <Grid key={`${token.name}.${index}`} item xs={12}>
          <SelectedProjectCard
            token={token}
            onCheckedBookmark={(checked) => onCheckedBookmark(index, checked)}
            onDelete={() => onDelete(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

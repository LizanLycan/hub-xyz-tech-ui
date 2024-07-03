import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  type OptionsTokenFromExplorer,
  type TokenFromExplorer,
} from "../../schemas/tokens.schema";
import TollIcon from "@mui/icons-material/Toll";
import TokenIcon from "@mui/icons-material/Token";
import { deepPurple } from "@mui/material/colors";

export const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  zIndex: 1,
  top: "-8px",
  padding: "8px 16px",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 8,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  color: theme.palette.secondary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        lighten(theme.palette.secondary.light, 0.85)
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        darken(theme.palette.secondary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export const SearchBar = ({
  options,
  onChange,
  loading,
  onInput,
}: {
  options?: OptionsTokenFromExplorer;
  onChange: (value: TokenFromExplorer | null) => void;
  loading?: boolean;
  onInput: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const isLoading = (open && !options) || loading;

  return (
    <Autocomplete
      fullWidth
      id="grouped-tokens"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options?.sort((a, b) => -a.type.localeCompare(b.type)) ?? []}
      loading={isLoading}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search your token by address / name / symbol / logo"
        />
      )}
      onChange={(_event, value) => {
        onChange(value);
      }}
      onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value) onInput(value);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.name === value?.name;
      }}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            key={`${option.name}.${option.type}.${option.tokenId}.${option.address}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: 8,
              paddingLeft: 36,
              backgroundColor: "white",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            {option.logo ? (
              <Avatar src={option.logo} alt={option.symbol} />
            ) : (
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {option.symbol[0]}
              </Avatar>
            )}
            [{option.symbol}] {option.name}
          </li>
        );
      }}
      filterOptions={(options, state) => {
        const displayOptions = options.filter(
          (option) =>
            option.name
              .toLowerCase()
              .trim()
              .includes(state.inputValue.toLowerCase().trim()) ||
            option.symbol
              .toLowerCase()
              .trim()
              .includes(state.inputValue.toLowerCase().trim()) ||
            option.address
              .toLowerCase()
              .trim()
              .includes(state.inputValue.toLowerCase().trim())
        );

        return displayOptions;
      }}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>
            {params.group === "token" ? <TollIcon /> : <TokenIcon />}
            {params.group}
          </GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
};

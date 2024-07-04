"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getSession, useSession } from "next-auth/react";
import { Card, Container } from "@mui/material";
import { type NextPageContext } from "next";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TollIcon from "@mui/icons-material/Toll";
import TokenIcon from "@mui/icons-material/Token";
import { useState } from "react";
import { UserTokenPanel } from "../components/ui/UserTokenPanel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="md" sx={{ pt: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Card>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  height: "4px !important",
                },
              }}
            >
              <Tab
                sx={{
                  minWidth: { sm: "240px", xs: "120px" },
                }}
                icon={<TollIcon />}
                label="Tokens"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  minWidth: { sm: "240px", xs: "120px" },
                }}
                icon={<TokenIcon />}
                label="NFTs"
                {...a11yProps(1)}
              />
            </Tabs>
          </Card>
          <CustomTabPanel value={value} index={0}>
            <UserTokenPanel type={"token"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UserTokenPanel type={"nft"} />
          </CustomTabPanel>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin?callbackUrl=%2Fdashboard",
      },
    };
  }

  return {
    props: {},
  };
};

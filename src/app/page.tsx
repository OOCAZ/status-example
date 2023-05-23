"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface JSONData {
  status: string;
  name: string;
  description: string;
  color: string;
  key: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [toggle, setToggle] = React.useState(true);
  const [arrayData, setArrayData] = React.useState<JSONData[]>([]);

  useEffect(() => {
    setToggle(false);
    async function getData() {
      if (toggle) {
        await axios.get("/api/download").then((response) => {
          for (let int in response.data) {
            setArrayData((arrayData) => [...arrayData, response.data[int]]);
          }
        });
        return;
      }
    }
    getData();
  }, [arrayData, toggle]);

  return (
    <ThemeProvider theme={darkTheme}>
      <main className={styles.main}>
        <Box
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h2">
            Welcome to the Status and API Tool
          </Typography>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="tabs for status and api"
          >
            <Tab label="Status" {...a11yProps(0)} />
            <Tab label="API" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Box
              style={{
                flex: 1,
                textAlign: "center",
              }}
            >
              {arrayData.map((element) => (
                <Card key={element.key} style={{ marginTop: 20 }}>
                  <CardContent>
                    <Typography variant="h4">
                      {" "}
                      Status of {element.name}:{" "}
                    </Typography>
                    <Typography variant="h4" style={{ color: element.color }}>
                      {element.status}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </TabPanel>
        </Box>
      </main>
    </ThemeProvider>
  );
}

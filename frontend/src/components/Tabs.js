import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ColorForm from "./ColorForm";

const StyledTabs = withStyles({
  indicator: {
    display: "none",
  },
})(Tabs);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  {
    header: "Theme Picker",
    child: <p>Hi World</p>,
  },
  {
    header: "Color Builder",
    child: <ColorForm />,
  },
];

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="Color Navigation Tabs"
      >
        {tabs.map((tab, i) => (
          <Tab label={tab.header} {...a11yProps(i)} disableRipple />
        ))}
      </StyledTabs>
      {tabs.map((tab, i) => (
        <TabPanel value={value} index={i}>
          {tab.child}
        </TabPanel>
      ))}
    </div>
  );
}

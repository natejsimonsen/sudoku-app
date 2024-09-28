import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useUserConfig } from "../context/userConfigContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  checked: {
    color: (props) => `${props.theme.color} !important`,
  },
  switchBase: {
    color: (props) => props.theme.color,
    "&$checked + $track": {
      backgroundColor: (props) => props.theme.color,
    },
  },
  track: {
    checked: {
      // this line does nothing it is a weird bug fix
      backgroundColor: (props) => props.theme.bgColor,
    },
  },
});

export default function Switcher(props) {
  const { state } = useUserConfig();

  const styles = useStyles(state);

  return (
    <FormControlLabel
      className="pt-4"
      control={
        <Switch
          classes={styles}
          checked={props.checked}
          onChange={props.clicked}
          name={props.label}
        />
      }
      label={props.label}
    />
  );
}

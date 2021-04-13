import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Rotas from './Rotas';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
        <Rotas />
    </div>
  );
}
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold"
  },
  pos: {
    marginBottom: 12
  }
});

export default function OutlinedCard(props) {
  const { algoIdx, algoInfo, openAlgoInfoDialogCallback } = props;
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {algoInfo[algoIdx][0]}
        </Typography>
        <Typography className={classes.pos}>{algoInfo[algoIdx][1]}</Typography>
        <Typography variant="body2" component="p">
          {algoInfo[algoIdx][2]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={openAlgoInfoDialogCallback}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

const styles = {
  root: {
    marginLeft: 1,
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
    display: "flex",
    // Hacky workaround as it would not accept just 'column'
    flexDirection: "column" as "column",
    alignItems: "left",
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
    marginTop: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};
export default styles;

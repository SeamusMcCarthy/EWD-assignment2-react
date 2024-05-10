import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Alert, Box, Button, Typography } from "@mui/material";
import { LoginDetails } from "../types/interfaces";
import styles from "./styles";

const LogoutPage: React.FC = () => {
  const context = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await context.logout();
    navigate("/");
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Logout
      </Typography>

      <form style={styles.form} onSubmit={onSubmit} noValidate>
        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LogoutPage;

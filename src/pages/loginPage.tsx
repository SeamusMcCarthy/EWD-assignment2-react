import React, { useRef, useState } from "react";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardHeader from "@mui/material/CardHeader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  Alert,
  Box,
  Button,
  //   Card,
  //   Container,
  //   FormControl,
  //   FormLabel,
  //   Input,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginDetails } from "../types/interfaces";
import styles from "./styles";

const LoginPage: React.FC = () => {
  const defaultValues = {
    defaultValues: {
      userName: "",
      password: "",
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginDetails>(defaultValues);

  const context = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [open, setOpen] = useState(false);
  //   const navigate = useNavigate();

  //   const handleSnackClose = () => {
  //     setOpen(false);
  //     navigate("/movies/favourites");
  //   };

  const onSubmit: SubmitHandler<LoginDetails> = (login) => {
    context.login(login.userName, login.password);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Login
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="userName"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="username"
              label="Username"
              autoFocus
            />
          )}
        />
        {errors.userName && (
          <Typography variant="h6" component="p">
            {errors.userName.message}
          </Typography>
        )}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password cannot be empty.",
            minLength: { value: 6, message: "Password is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="password"
              label="Password"
              autoFocus
            />
          )}
        />
        {errors.password && (
          <Typography variant="h6" component="p">
            {errors.password.message}
          </Typography>
        )}

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

export default LoginPage;

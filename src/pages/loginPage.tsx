import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Box, Button, TextField, Typography } from "@mui/material";
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
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginDetails> = async (login) => {
    await context.login(login.userName, login.password);
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
          rules={{
            required: "Name is required",
            minLength: { value: 6, message: "User name is too short" },
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
            disabled={errors.password || errors.userName ? true : false}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;

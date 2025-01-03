import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link as MuiLink, Backdrop, CircularProgress } from '@mui/material';
import Header from "../organisms/Header";
import { SessionsRepository } from "../../infrastructure/repository/SessionsRepository";
import { LogInUsecase, LogInInput } from "../../usecases/LogInUsecase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth を利用

  const handleLogIn = async () => {
    setLoading(true);
    const input = new LogInInput({ email, password });
    const sessionRepository = new SessionsRepository();
    const usecase = new LogInUsecase(input, sessionRepository);

    try {
      const output = await usecase.log_in();
      const token = output.token;

      if (token) {
        login(token); // トークンを Context に保存
        console.log("トークンが保存されました:", token);
        navigate("/");
      } else {
        console.error("トークンが取得できませんでした");
      }
    } catch (error) {
      console.error("ログイン失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            ログイン
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogIn}
            sx={{ mt: 2 }}
          >
            ログイン
          </Button>
        </Box>
      </Container>
      <Box mt={2} display="flex" justifyContent="center">
        <MuiLink component={RouterLink} to="/sign-up">
          新規作成
        </MuiLink>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
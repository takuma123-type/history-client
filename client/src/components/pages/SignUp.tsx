import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import Header from '../organisms/Header';
import { SignUpInput, SignUpUsecase } from "../../usecases/SignUpUsecase";
import { SessionsRepository } from "../../infrastructure/repository/SessionsRepository";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const input = new SignUpInput({ email, password, name });
    const sessionsRepository = new SessionsRepository();
    const signUpUsecase = new SignUpUsecase(input, sessionsRepository);

    try {
      const result = await signUpUsecase.sign_up();
      const token = result.token;
      if (token) {
        alert("サインアップに成功しました！");
        navigate("/sign-in");
      } else {
        alert("トークンの取得に失敗しました。");
      }
    } catch (error) {
      alert("サインアップに失敗しました。再度お試しください。");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            新規作成
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={handleSignUp}
            sx={{ mt: 2 }}
          >
            新規作成
          </Button>
        </Box>
      </Container>
      <Box mt={2} display="flex" justifyContent="center">
        <MuiLink component={RouterLink} to="/sign-in">
          ログイン
        </MuiLink>
      </Box>
    </>
  );
}
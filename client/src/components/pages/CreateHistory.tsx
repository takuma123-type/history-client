import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Header from '../organisms/Header';

const CreateHistory: React.FC = () => {
  const [position, setPosition] = useState('');
  const [scale, setScale] = useState('');
  const [coreStack, setCoreStack] = useState('');
  const [infrastructure, setInfrastructure] = useState('');
  const [period, setPeriod] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [contents, setContents] = useState('');
  const [others, setOthers] = useState('');

  const handleSubmit = () => {
    const data = {
      position,
      scale,
      coreStack,
      infrastructure,
      period,
      companyName,
      projectName,
      contents,
      others,
    };
    console.log(data);
  };

  return (
    <>
    <Header />
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          エンジニア履歴書作成
        </Typography>
        <TextField
          label="ポジション"
          variant="outlined"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="規模"
          variant="outlined"
          fullWidth
          margin="normal"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
        <TextField
          label="使用言語・フレームワーク・ツール"
          variant="outlined"
          fullWidth
          margin="normal"
          value={coreStack}
          onChange={(e) => setCoreStack(e.target.value)}
        />
        <TextField
          label="サーバー・OS・DB"
          variant="outlined"
          fullWidth
          margin="normal"
          value={infrastructure}
          onChange={(e) => setInfrastructure(e.target.value)}
        />
        <TextField
          label="期間"
          variant="outlined"
          fullWidth
          margin="normal"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <TextField
          label="会社名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <TextField
          label="プロジェクト名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          label="内容"
          variant="outlined"
          fullWidth
          margin="normal"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <TextField
          label="その他"
          variant="outlined"
          fullWidth
          margin="normal"
          value={others}
          onChange={(e) => setOthers(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          作成
        </Button>
      </Box>
    </Container>
    </>
  );
};

export default CreateHistory;
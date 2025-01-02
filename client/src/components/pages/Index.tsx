import React from 'react';
import Header from '../organisms/Header';
import Button from '../atoms/Button';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const data = [
  { id: 1, fileName: '2025履歴書', createdAt: '2023-01-01', updatedAt: '2023-01-02' },
  { id: 2, fileName: '2024履歴書', createdAt: '2023-01-03', updatedAt: '2023-01-04' },
];

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <Box mt={2}>
        <Box display="flex" m={2}>
          <Box m={1}>
              <Button label="エクスポート" variant="contained" color="primary" />
          </Box>
          <Box m={1}>
            <Link to="/create-history">
              <Button label="新規作成" variant="outlined" color="primary" />
            </Link>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>ファイル名</TableCell>
                <TableCell>作成日</TableCell>
                <TableCell>更新日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.fileName}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  );
};

export default Index;
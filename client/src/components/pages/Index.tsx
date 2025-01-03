import React, { useState, useEffect } from 'react';
import Header from '../organisms/Header';
import Button from '../atoms/Button';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { FetchHistoriesUsecase } from '../../usecases/FetchHistoriesUsecase';
import { ExportHistoryUsecase } from '../../usecases/ExportHistoryUsecase';
import { HistoriesRepository } from '../../infrastructure/repository/HistoriesRepository';
import { RepositoryError } from '../../infrastructure/repository/errors';
import { FetchHistoryItem } from '../../models/presentation/FetchHistoryItem';

const Index: React.FC = () => {
  const [histories, setHistories] = useState<FetchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      const historiesRepository = new HistoriesRepository();
      const fetchHistoriesUsecase = new FetchHistoriesUsecase(historiesRepository);

      try {
        const response = await fetchHistoriesUsecase.fetch();
        console.log('Index fetchHistories response:', response);
        setHistories(response.histories);
      } catch (error) {
        if (error instanceof RepositoryError) {
          console.error('RepositoryError:', error.details);
        } else {
          console.error('Error:', error);
        }
        alert('履歴の取得に失敗しました。再度お試しください。');
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleExport = async () => {
    if (!selectedHistoryId) {
      alert('エクスポートする履歴を選択してください。');
      return;
    }

    const historiesRepository = new HistoriesRepository();
    const exportHistoryUsecase = new ExportHistoryUsecase(historiesRepository);
    try {
      await exportHistoryUsecase.export(selectedHistoryId);
      alert('エクスポートが成功しました。');
    } catch (error) {
      console.error('Error exporting history:', error);
      alert('エクスポートに失敗しました。');
    }
  };

  return (
    <>
      <Header />
      <Box mt={2}>
        <Box display="flex" m={2}>
          <Box m={1}>
            <Button label="エクスポート" variant="contained" color="primary" onClick={handleExport} />
          </Box>
          <Box m={1}>
            <Link to="/create-history">
              <Button label="新規作成" variant="outlined" color="primary" />
            </Link>
          </Box>
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>会社名</TableCell>
                <TableCell>作成日</TableCell>
                <TableCell>更新日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history) => (
                <TableRow key={history.id} onClick={() => setSelectedHistoryId(history.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedHistoryId === history.id} />
                  </TableCell>
                  <TableCell>{history.company_name}</TableCell>
                  <TableCell>{history.created_at}</TableCell>
                  <TableCell>{history.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Index;
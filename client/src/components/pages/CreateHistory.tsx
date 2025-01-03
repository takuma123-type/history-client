import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, Backdrop, CircularProgress } from '@mui/material';
import Header from '../organisms/Header';
import { FetchPositionsUsecase } from '../../usecases/FetchPositionsUsecase';
import { FetchScalesUsecase } from '../../usecases/FetchScalesUsecase';
import { FetchCoreStacksUsecase } from '../../usecases/FetchCoreStacksUsecase';
import { FetchInfrastructuresUsecase } from '../../usecases/FetchInfrastructuresUsecase';
import { CreateHistoriesUsecase } from '../../usecases/CreateHistoriesUsecase';
import { PositionsRepository } from '../../infrastructure/repository/PositionsRepository';
import { ScalesRepository } from '../../infrastructure/repository/ScalesRepository';
import { CoreStacksRepository } from '../../infrastructure/repository/CoreStacksRepository';
import { InfrastructuresRepository } from '../../infrastructure/repository/InfrastructuresRepository';
import { HistoriesRepository } from '../../infrastructure/repository/HistoriesRepository';
import { PositionItem } from '../../models/presentation/PositionItem';
import { ScaleItem } from '../../models/presentation/ScaleItem';
import { CoreStackItem } from '../../models/presentation/CoreStackItem';
import { InfrastructureItem } from '../../models/presentation/InfrastructureItem';
import { HistoryItem } from '../../models/presentation/HistoryItem';
import { useNavigate } from 'react-router-dom';
import { RepositoryError } from '../../infrastructure/repository/errors';

// CookieからauthTokenを取得する関数
const getAuthTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
};

const CreateHistory: React.FC = () => {
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [scales, setScales] = useState<ScaleItem[]>([]);
  const [coreStacks, setCoreStacks] = useState<CoreStackItem[]>([]);
  const [infrastructures, setInfrastructures] = useState<InfrastructureItem[]>([]);
  const [position, setPosition] = useState('');
  const [scale, setScale] = useState('');
  const [coreStack, setCoreStack] = useState('');
  const [infrastructure, setInfrastructure] = useState('');
  const [period, setPeriod] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [contents, setContents] = useState('');
  const [others, setOthers] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionsRepository = new PositionsRepository();
        const scalesRepository = new ScalesRepository();
        const coreStacksRepository = new CoreStacksRepository();
        const infrastructuresRepository = new InfrastructuresRepository();

        const fetchPositionsUsecase = new FetchPositionsUsecase(positionsRepository);
        const fetchScalesUsecase = new FetchScalesUsecase(scalesRepository);
        const fetchCoreStacksUsecase = new FetchCoreStacksUsecase(coreStacksRepository);
        const fetchInfrastructuresUsecase = new FetchInfrastructuresUsecase(infrastructuresRepository);

        const positionsData = await fetchPositionsUsecase.fetch();
        const scalesData = await fetchScalesUsecase.fetch();
        const coreStacksData = await fetchCoreStacksUsecase.fetch();
        const infrastructuresData = await fetchInfrastructuresUsecase.fetch();

        setPositions(positionsData.positions);
        setScales(scalesData.scales);
        setCoreStacks(coreStacksData.coreStacks);
        setInfrastructures(infrastructuresData.infrastructures);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        alert('初期データの取得に失敗しました。');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const historyItem = new HistoryItem({
      position: { id: position, name: positions.find(p => p.id === position)?.name || '' },
      scale: { id: scale, people: scales.find(s => s.id === scale)?.people || '' },
      core_stack: { id: coreStack, name: coreStacks.find(cs => cs.id === coreStack)?.name || '' },
      infrastructure: { id: infrastructure, name: infrastructures.find(i => i.id === infrastructure)?.name || '' },
      period,
      company_name: companyName,
      project_name: projectName,
      contents,
      others,
    });

    const historiesRepository = new HistoriesRepository();
    const createHistoriesUsecase = new CreateHistoriesUsecase(historiesRepository);

    const token = getAuthTokenFromCookie();
    if (!token) {
      alert('認証トークンが見つかりません。ログインし直してください。');
      setLoading(false);
      return;
    }

    try {
      const result = await createHistoriesUsecase.create(historyItem);
      alert(`履歴が作成されました`);
      navigate('/');
    } catch (error) {
      if (error instanceof RepositoryError) {
        console.error('RepositoryError:', error.details);
      } else {
        console.error('Error:', error);
      }
      alert('履歴の作成に失敗しました。再度お試しください。');
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
            エンジニア履歴書作成
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>ポジション</InputLabel>
            <Select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              label="ポジション"
            >
              {positions.map((pos) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>規模</InputLabel>
            <Select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              label="規模"
            >
              {scales.map((scale) => (
                <MenuItem key={scale.id} value={scale.id}>
                  {scale.people}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>使用言語・フレームワーク・ツール</InputLabel>
            <Select
              value={coreStack}
              onChange={(e) => setCoreStack(e.target.value)}
              label="使用言語・フレームワーク・ツール"
            >
              {coreStacks.map((stack) => (
                <MenuItem key={stack.id} value={stack.id}>
                  {stack.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>サーバー・OS・DB</InputLabel>
            <Select
              value={infrastructure}
              onChange={(e) => setInfrastructure(e.target.value)}
              label="サーバー・OS・DB"
            >
              {infrastructures.map((infra) => (
                <MenuItem key={infra.id} value={infra.id}>
                  {infra.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateHistory;
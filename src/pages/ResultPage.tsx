import { useParams } from 'react-router-dom';
import ResultBox from '../components/vote/ResultBox';
import useCandidates from '../lib/hooks/useCandidates';
function ResultPage() {
  const { part } = useParams();
  const list = part ? useCandidates(part) : [];
  return <ResultBox list={list} />;
}

export default ResultPage;

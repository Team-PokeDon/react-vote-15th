import { useParams } from 'react-router-dom';
import Candidates from '../components/main/Candidates';

function ResultPage() {
  const { part } = useParams();

  return <>{part && <Candidates part={part} />}</>;
}

export default ResultPage;

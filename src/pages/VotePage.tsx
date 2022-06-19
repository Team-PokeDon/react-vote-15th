import styled from 'styled-components';
import { useParams } from 'react-router-dom';
function VotePage() {
  const { part } = useParams();
  return <div>{part} Vote</div>;
}

export default VotePage;

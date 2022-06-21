import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../lib/hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import Results from '../components/auth/Results';

function BEVotePage() {
  const [onScreen, setOnScreen] = useState(false);
  return (
    <>
      <div>Backend Vote</div>
      <Results />
      {/* <button onClick={() => setOnScreen((prev) => !prev)}>Load Results</button>
      {onScreen ? <div>On Screen</div> : <div>Off Screen</div>} */}
    </>
  );
}

export default BEVotePage;

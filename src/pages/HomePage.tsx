import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <li>
        <Link to="/vote/frontend">FE 투표</Link>
      </li>
      <li>
        <Link to="/vote/backend">BE 투표</Link>
      </li>
    </>
  );
}

export default HomePage;

import styled from 'styled-components';
import { ReactComponent as Circle } from '../../assets/loading.svg';

function Loading() {
  return (
    <Wrapper className="loading-wrapper">
      <Circle />
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  color: ${({ theme }) => theme.palette.gray[3]};
  animation: rotate_image 6s linear infinite;
  transform-origin: 50% 50%;

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;

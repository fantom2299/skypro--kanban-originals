import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const SkeletonBlock = styled.div`
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #e8edf5 25%,
    #d0d8e8 50%,
    #e8edf5 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  border: 1px solid #e4eaf2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled(SkeletonBlock)`
  width: 80px;
  height: 22px;
  border-radius: 20px;
`;

export const Dots = styled(SkeletonBlock)`
  width: 20px;
  height: 14px;
  border-radius: 4px;
`;

export const Line = styled(SkeletonBlock)`
  height: 12px;
  width: 100%;
`;

export const LineShort = styled(Line)`
  width: 70%;
`;

export const LineTiny = styled(Line)`
  width: 40%;
`;

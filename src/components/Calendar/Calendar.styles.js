import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  min-width: 220px;
`;

export const CalendarTitle = styled.div`
  margin-bottom: 10px;
`;

export const CalendarBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.background};
`;

export const CalendarMonth = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

export const NavActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavAction = styled.button`
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const CalendarContent = styled.div`
  padding: 8px;
`;

export const DaysNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

export const DayName = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme, $weekend }) =>
    $weekend ? theme.colors.orange : theme.colors.textMuted};
  padding: 3px 0;
`;

export const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const Cell = styled.button`
  text-align: center;
  font-size: 12px;
  padding: 4px 2px;
  border-radius: 4px;
  border: none;
  background: ${({ theme, $current, $active }) => {
    if ($current) return theme.colors.primary;
    if ($active) return theme.colors.green;
    return 'transparent';
  }};
  color: ${({ theme, $current, $active, $other, $weekend }) => {
    if ($current || $active) return '#fff';
    if ($other) return theme.colors.textMuted;
    if ($weekend) return theme.colors.orange;
    return theme.colors.textPrimary;
  }};
  font-weight: ${({ $current, $active }) =>
    $current || $active ? 700 : 400};
  cursor: pointer;

  &:hover {
    background: ${({ theme, $current, $active }) =>
      $current || $active ? undefined : theme.colors.background};
  }
`;

export const Period = styled.div`
  padding: 8px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DateControl = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

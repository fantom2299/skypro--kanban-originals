import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 168px;
`;

export const CalendarTitle = styled.div`
  margin-bottom: 0;
`;

export const CalendarBlock = styled.div`
  // border: 1px solid ${({ theme }) => theme.colors.border};
  // border-radius: ${({ theme }) => theme.radius.sm};
  // overflow: hidden;
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CalendarMonth = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const NavActions = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
`;



export const NavAction = styled.button`
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const CalendarContent = styled.div`
  padding: 0;
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
    $weekend ? theme.colors.muted : theme.colors.textMuted};
  padding: 3px 0;
`;

export const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const Cell = styled.button`
  text-align: center;
  font-size: 10px;
  padding: 4px 2px;
  border-radius: 20px;
  border: none;

  background: ${({ theme, $current, $active }) => {
    if ($current) return theme.colors.muted;
    if ($active) return theme.colors.green;

    return 'transparent';
  }};

  color: ${({ $current, $active }) =>
    $current || $active ? '#fff' : '#94A6BE'
  };

  font-weight: ${({ $current, $active }) =>
    $current || $active ? 700 : 400
  };

  cursor: pointer;

  &:hover {
    background: ${({ theme, $current, $active }) =>
      $current || $active ? undefined : theme.colors.background
    };
  }
`;

export const Period = styled.div`
  padding: 8px 0;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DateControl = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

import {
  Overlay,
  PopExitBox,
  Title,
  Actions,
  ConfirmButton,
  CancelButton,
} from './PopExit.styles';

export default function PopExit({ onConfirm, onCancel }) {
  return (
    <Overlay onClick={onCancel}>
      <PopExitBox onClick={(e) => e.stopPropagation()}>
        <Title>Выйти из аккаунта?</Title>

        <Actions>
          <ConfirmButton onClick={onConfirm}>Да, выйти</ConfirmButton>
          <CancelButton onClick={onCancel}>Нет, остаться</CancelButton>
        </Actions>
      </PopExitBox>
    </Overlay>
  );
}

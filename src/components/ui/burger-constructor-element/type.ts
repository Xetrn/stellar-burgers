import { TOrderConstructor } from '@utils-types';

export type BurgerConstructorElementUIProps = {
  ingredient: TOrderConstructor;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};

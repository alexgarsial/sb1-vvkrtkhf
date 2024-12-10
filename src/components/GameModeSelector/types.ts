import { LucideIcon } from 'lucide-react';
import { GameMode } from '../../types/game';

export interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

export interface GameModeButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}
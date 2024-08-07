export interface AnimationProps {
  $isActive?: boolean | null;
}

export interface BgColor {
  $bgColor?: string;
}

export interface Player {
  $player?: "X" | "O";
}

export interface WinningLineProps {
  $line?: number[] | null;
  $size: number;
}

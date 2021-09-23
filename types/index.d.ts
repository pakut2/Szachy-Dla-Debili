export type Player = "b" | "w";
export type Type = "q" | "r" | "n" | "b" | "k" | "p";
export type PieceType = `${Player}${Type}`;
export type Pieces = Record<PieceType, ReturnType<typeof require>>;

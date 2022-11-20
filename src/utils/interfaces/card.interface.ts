export interface ICard {
    id: number;
    value: number;
    status: CardStatus;
}

export enum CardStatus {
    Preview = 'preview',
    Passive = 'passive',
    Active = 'active',
    Done = 'done',
}
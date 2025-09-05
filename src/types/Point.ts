type HistoryItemStatus = 'EARN' | 'USE' | 'CANCEL' | 'INIT' | 'EVENT' | 'EXCHANGE';

export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    name: string | null;
    provider: string | null;
    pointId: number;
    balance: number;
}

export interface HistoryItem {
    id: number;
    username: string;
    amount: number;
    type: HistoryItemStatus;
    source: string;
    expiredAt: Date;
}
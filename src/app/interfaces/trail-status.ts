export interface TrailStatus {
    uid: string;
    recordId?: string;
    trails: {
        trailId: number;
        status: string;
        dateCompleted?: Date;
    }[];
}

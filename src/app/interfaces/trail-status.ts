export interface TrailStatus {
    uid: string;
    trails: {
        trailId: number;
        status: string;
        dateCompleted: Date;
    }[];
}

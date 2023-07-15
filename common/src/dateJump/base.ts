export type DateJumperProps = {
    minJDN: number;
    maxJDN: number;
    todayJDN: number;
    onJump: (jdn: number) => void;
};
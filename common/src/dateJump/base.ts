export type BaseDateProps = {
    minJDN: number;
    maxJDN: number;
    initialJDN: number;
};

export type DateSelectorProps = BaseDateProps & {
    onChange: (jdn: number | undefined) => void;
};

export type DateJumperProps = BaseDateProps & {
    onJump: (jdn: number) => void;
};
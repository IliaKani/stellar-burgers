declare type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';
export declare type TIconProps = {
    type: TIconTypes;
    className?: string;
    onClick?: () => void;
};
export declare const getIconColor: (type: TIconTypes) => string;
export {};

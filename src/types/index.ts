// Theme types
export interface ThemeProps {
  colors: {
    background: string;
    text: string;
  };
}

// Card component props
export interface CardProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}

export interface ImageLoading {
  [key: string]: boolean;
}

export interface BatteryModuleType {
    getBatteryLevel: () => Promise<number>;
}
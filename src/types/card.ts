import { ElementType } from "react";

export interface CardData {
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  buttonPath: string;
  buttonText: string;
}

export interface CardComponentsProps {
  id: number;
  card: CardData;
  Icon: ElementType; 
  router: any;
}

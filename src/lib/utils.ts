import type { Operator } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSolution = (firstNumber: number, secondNumber: number, operator: Operator): number | null => {
  switch (operator) {
    case "Add":
      return firstNumber + secondNumber;
    case "Subtract":
      return firstNumber - secondNumber;
    case "Divide":
      return firstNumber / secondNumber;
    case "Multiply":
      return firstNumber * secondNumber;
    default:
      return null;
  }
};

export const animate = (element: React.RefObject<HTMLElement | null>, className: string) => {
  if (!element.current) return;
  element.current.classList.add(className);

  setTimeout(() => {
    if (!element.current) return;
    element.current.classList.remove(className);
  }, 250);
};

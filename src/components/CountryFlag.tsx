import { cn } from "@/lib/utils";
import * as Flags from "country-flag-icons/react/3x2";

interface ICountryFlag {
  code: string;
  className?: string
}

const CountryFlag = ({ code, className }: ICountryFlag) => {
  const Flag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[code.toUpperCase()];

  if (!Flag) return null;

  return <Flag className={cn("w-9 h-6 rounded-sm", className)} />;
};

export default CountryFlag;

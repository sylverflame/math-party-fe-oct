import { cn } from "@/lib/utils";
import * as Flags from "country-flag-icons/react/3x2";

interface ICountryFlag {
  code: string | null | undefined;
  className?: string;
}

const CountryFlag = ({ code, className }: ICountryFlag) => {
  if(!code) return null
  const Flag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[code.substring(0, 2).toUpperCase()];
 
 if (!Flag) return null;

  return <Flag className={cn("w-9 h-6 rounded-sm", className)} />;
};

export default CountryFlag;

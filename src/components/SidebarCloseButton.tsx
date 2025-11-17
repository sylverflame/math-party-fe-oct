import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import CloseIcon from "@/assets/x-close.svg?react";

interface ISidebarCloseButton {
  className?: string;
  onClose: () => void;
}

const SidebarCloseButton = ({ className, onClose }: ISidebarCloseButton) => {
  return (
    <Button variant="outline" className={cn("flex items-center justify-center size-8", className)} onClick={onClose}>
      <CloseIcon className="text-foreground size-5" />
    </Button>
  );
};

export default SidebarCloseButton;

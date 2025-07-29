import { MessageCircle } from "lucide-react";

export const ChatLogo = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow`}>
      <MessageCircle 
        size={iconSizes[size]} 
        className="text-primary-foreground" 
      />
    </div>
  );
};
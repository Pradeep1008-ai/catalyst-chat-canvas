import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  sender: string;
  avatar?: string;
  isOwnMessage: boolean;
  timestamp: string;
  onTranslate?: () => void;
}

export const MessageBubble = ({ 
  message, 
  sender, 
  avatar, 
  isOwnMessage, 
  timestamp,
  onTranslate 
}: MessageBubbleProps) => {
  return (
    <div className={`flex gap-3 mb-4 animate-message-in ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary-glow/20 text-primary text-xs">
          {sender.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <div 
          className={`
            px-4 py-2 rounded-2xl shadow-sm
            ${isOwnMessage 
              ? 'bg-message-sent text-message-sent-foreground rounded-br-sm' 
              : 'bg-message-received text-message-received-foreground rounded-bl-sm border border-border/50'
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        
        <div className={`flex items-center gap-2 mt-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {!isOwnMessage && onTranslate && (
            <Button
              variant="message"
              size="sm"
              onClick={onTranslate}
              className="h-6 px-2"
            >
              <Languages size={12} />
              Translate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
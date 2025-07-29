import { MessageCircle, Users } from "lucide-react";

interface ChatRoomItemProps {
  roomName: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  onClick: () => void;
}

export const ChatRoomItem = ({ 
  roomName, 
  lastMessage, 
  timestamp, 
  unreadCount,
  onClick 
}: ChatRoomItemProps) => {
  return (
    <div 
      onClick={onClick}
      className="p-4 border border-border/50 rounded-xl cursor-pointer hover:bg-muted/30 transition-all duration-200 group animate-slide-in"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
          <MessageCircle size={20} className="text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground truncate">{roomName}</h3>
            {timestamp && (
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            )}
          </div>
          
          {lastMessage && (
            <p className="text-sm text-muted-foreground truncate mt-1">{lastMessage}</p>
          )}
        </div>
        
        {unreadCount && unreadCount > 0 && (
          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
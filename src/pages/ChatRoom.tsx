import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "@/components/MessageBubble";
import { ArrowLeft, Send, Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isOwnMessage: boolean;
  avatar?: string;
}

export const ChatRoom = () => {
  const { roomId } = useParams();
  const [user, setUser] = useState<{ email: string; avatar?: string } | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the chat room! 🎉",
      sender: "System",
      timestamp: "10:30 AM",
      isOwnMessage: false,
    },
    {
      id: "2", 
      text: "Hello everyone! Excited to be here.",
      sender: "user@example.com",
      timestamp: "10:32 AM", 
      isOwnMessage: true,
    },
    {
      id: "3",
      text: "Hey! Welcome to our community. Feel free to ask any questions.",
      sender: "admin@catalyst.com",
      timestamp: "10:33 AM",
      isOwnMessage: false,
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roomNames: { [key: string]: string } = {
    "1": "General Chat",
    "2": "Tech Talk", 
    "3": "Random"
  };

  useEffect(() => {
    const userData = localStorage.getItem("catalyst_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: user.email,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwnMessage: true,
      avatar: user.avatar,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleImproveMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Nothing to improve",
        description: "Please type a message first",
        variant: "destructive",
      });
      return;
    }

    // Mock AI improvement
    const improved = message + " ✨ (AI Enhanced)";
    setMessage(improved);
    toast({
      title: "Message Improved",
      description: "AI has enhanced your message!",
    });
  };

  const handleTranslate = (messageId: string) => {
    toast({
      title: "Translation",
      description: "Message translated to your preferred language",
    });
  };

  const handleDeleteRoom = () => {
    toast({
      title: "Room Deleted",
      description: "This chat room has been deleted",
      variant: "destructive",
    });
    navigate("/dashboard");
  };

  if (!user) return null;

  const roomName = roomNames[roomId || "1"] || "Unknown Room";

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-xl font-semibold">{roomName}</h1>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteRoom}
          >
            <Trash2 size={16} />
            Delete Room
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              avatar={msg.avatar}
              isOwnMessage={msg.isOwnMessage}
              timestamp={msg.timestamp}
              onTranslate={msg.isOwnMessage ? undefined : () => handleTranslate(msg.id)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-background/50"
              />
            </div>
            <Button
              type="button"
              variant="minimal"
              onClick={handleImproveMessage}
            >
              <Sparkles size={16} />
              Improve
            </Button>
            <Button type="submit" variant="chat">
              <Send size={16} />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
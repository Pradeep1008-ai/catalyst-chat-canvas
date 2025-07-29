import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatLogo } from "@/components/ChatLogo";
import { ChatRoomItem } from "@/components/ChatRoomItem";
import { User, LogOut, Plus, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [roomKey, setRoomKey] = useState("");
  const [chatRooms] = useState([
    { 
      id: "1", 
      name: "General Chat", 
      lastMessage: "Welcome to Catalyst!", 
      timestamp: "2m ago",
      unreadCount: 2
    },
    { 
      id: "2", 
      name: "Tech Talk", 
      lastMessage: "Anyone tried the new React features?", 
      timestamp: "1h ago" 
    },
    { 
      id: "3", 
      name: "Random", 
      lastMessage: "Good morning everyone! ☀️", 
      timestamp: "3h ago",
      unreadCount: 1
    }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("catalyst_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("catalyst_user");
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate("/");
  };

  const handleCreateRoom = () => {
    if (!roomKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Room Created",
      description: `Created room: ${roomKey}`,
    });
    setRoomKey("");
  };

  const handleJoinRoom = () => {
    if (!roomKey.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a room key",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Joined Room",
      description: `Joined room: ${roomKey}`,
    });
    setRoomKey("");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatLogo size="md" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Catalyst
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <User size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Chat Rooms */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Chat Rooms</h2>
          <div className="space-y-3">
            {chatRooms.map((room) => (
              <ChatRoomItem
                key={room.id}
                roomName={room.name}
                lastMessage={room.lastMessage}
                timestamp={room.timestamp}
                unreadCount={room.unreadCount}
                onClick={() => navigate(`/chat/${room.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Room Actions */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Join or Create a Room</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={roomKey}
                onChange={(e) => setRoomKey(e.target.value)}
                placeholder="Enter room name or key"
                className="bg-background/50"
              />
            </div>
            <Button onClick={handleCreateRoom} variant="chat">
              <Plus size={16} />
              Create
            </Button>
            <Button onClick={handleJoinRoom} variant="minimal">
              <Key size={16} />
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
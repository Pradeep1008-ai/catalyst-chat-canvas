import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [user, setUser] = useState<{ email: string; avatar?: string } | null>(null);
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatar = event.target?.result as string;
        const updatedUser = { ...user!, avatar };
        setUser(updatedUser);
        localStorage.setItem("catalyst_user", JSON.stringify(updatedUser));
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-xl font-semibold">Your Profile</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <div className="text-center">
            <div className="mb-6">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary-glow/20 text-primary text-2xl">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="relative inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="avatar-upload"
                />
                <Button variant="minimal" className="flex items-center gap-2">
                  <Upload size={16} />
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Email Address
                </h3>
                <p className="text-lg font-semibold mt-1">{user.email}</p>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
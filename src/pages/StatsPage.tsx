
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Award, User, BookOpen, BarChart2, Clock, MessageSquare, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import BadgesSection, { defaultBadges } from '@/components/BadgesSection';
import ProfileSection from '@/components/ProfileSection';
import ProgressPanel from '@/components/ProgressPanel';
import AnimatedBackground from '@/components/AnimatedBackground';
import { toast } from '@/components/ui/use-toast';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Updated stats - fixed "Hours Learned" to be a more realistic value (was 8.5)
  const [userStats, setUserStats] = useState({
    messageCount: 42,
    topicsExplored: 15,
    hoursLearned: 2.5, // Changed from 8.5 to a more realistic value
    dailyStreak: 1, // Changed from 3 to 1 to address the streak issue
    skillProgress: {
      'Python': 65,
      'Web Dev': 45,
      'AI': 30,
      'Cybersecurity': 25,
      'Soft Skills': 40
    }
  });
  
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('skillup_name') || "User",
    email: localStorage.getItem('skillup_email') || "user@example.com",
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Updated to use current date
    interests: ["Machine Learning", "Web Development", "Cybersecurity"],
    skills: ["Python", "JavaScript", "React"]
  });
  
  const updateProfile = (data: {name: string, interests: string[], skills: string[]}) => {
    setUserProfile({
      ...userProfile,
      ...data
    });
    
    localStorage.setItem('skillup_name', data.name);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  // Updated stat cards with fixed hours learned value
  const statCards: StatCard[] = [
    {
      title: "Messages Sent",
      value: userStats.messageCount,
      icon: <MessageSquare size={24} className="text-blue-400" />,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Topics Explored",
      value: userStats.topicsExplored,
      icon: <BookOpen size={24} className="text-green-400" />,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Hours Learned",
      value: userStats.hoursLearned,
      icon: <Clock size={24} className="text-purple-400" />,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Daily Streak",
      value: userStats.dailyStreak,
      icon: <Trophy size={24} className="text-yellow-400" />,
      color: "from-yellow-500/20 to-yellow-600/20"
    }
  ];
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <Header />
        
        <div className="cyber-panel p-6 mb-6">
          <h1 className="font-orbitron text-2xl mb-6 flex items-center">
            <BarChart size={28} className="text-cyber-blue mr-2" />
            Your Learning Analytics
          </h1>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="font-orbitron">
                <BarChart2 size={16} className="mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="badges" className="font-orbitron">
                <Award size={16} className="mr-2" />
                Badges
              </TabsTrigger>
              <TabsTrigger value="profile" className="font-orbitron">
                <User size={16} className="mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`cyber-panel p-4 bg-gradient-to-br ${stat.color} backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <h3 className="text-2xl font-orbitron mt-1">{stat.value}</h3>
                      </div>
                      <div className="p-3 rounded-full bg-background/40 cyber-border">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Skills Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-orbitron mb-4">Learning Progress</h3>
                  {Object.entries(userStats.skillProgress).map(([skill, progress]) => (
                    <div key={skill} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-cyber-darker rounded-full overflow-hidden cyber-border">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <ProgressPanel 
                  level={3}
                  xp={75}
                  nextLevelXp={100}
                  badges={defaultBadges.filter(b => b.earned).length}
                  streak={userStats.dailyStreak}
                  topics={userStats.topicsExplored}
                  messageCount={userStats.messageCount}
                  skillProgress={userStats.skillProgress}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <BadgesSection badges={defaultBadges} />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileSection 
                name={userProfile.name}
                email={userProfile.email}
                joinDate={userProfile.joinDate}
                interests={userProfile.interests}
                skills={userProfile.skills}
                onUpdateProfile={updateProfile}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

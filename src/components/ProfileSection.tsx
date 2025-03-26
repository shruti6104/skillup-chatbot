
import React, { useState } from 'react';
import { User, Mail, BookOpen, Code, Brain, Edit, Check, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ProfileSectionProps {
  name: string;
  email: string;
  joinDate: string;
  interests: string[];
  skills: string[];
  onUpdateProfile?: (data: {name: string, interests: string[], skills: string[]}) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  name = "John Doe", 
  email = "john@example.com",
  joinDate = "November 15, 2023",
  interests = ["Machine Learning", "Web Development", "Cybersecurity"],
  skills = ["Python", "JavaScript", "React"],
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedInterests, setEditedInterests] = useState<string[]>(interests);
  const [editedSkills, setEditedSkills] = useState<string[]>(skills);
  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        name: editedName,
        interests: editedInterests,
        skills: editedSkills
      });
    }
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handleCancelEdit = () => {
    setEditedName(name);
    setEditedInterests(interests);
    setEditedSkills(skills);
    setIsEditing(false);
  };

  const addInterest = () => {
    if (newInterest && !editedInterests.includes(newInterest)) {
      setEditedInterests([...editedInterests, newInterest]);
      setNewInterest("");
    }
  };

  const addSkill = () => {
    if (newSkill && !editedSkills.includes(newSkill)) {
      setEditedSkills([...editedSkills, newSkill]);
      setNewSkill("");
    }
  };

  const removeInterest = (interest: string) => {
    setEditedInterests(editedInterests.filter(i => i !== interest));
  };

  const removeSkill = (skill: string) => {
    setEditedSkills(editedSkills.filter(s => s !== skill));
  };

  return (
    <div className="cyber-panel p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-lg flex items-center">
          <User size={20} className="text-cyber-green mr-2" />
          Profile
        </h3>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline" 
            size="sm"
            className="cyber-button text-xs px-2 py-1 h-auto"
          >
            <Edit size={14} className="mr-1" />
            Edit
          </Button>
        )}
        {isEditing && (
          <div className="flex space-x-2">
            <Button 
              onClick={handleSaveProfile}
              variant="outline" 
              size="sm"
              className="cyber-button text-xs px-2 py-1 h-auto bg-cyber-green/20 hover:bg-cyber-green/30"
            >
              <Check size={14} className="mr-1 text-cyber-green" />
              Save
            </Button>
            <Button 
              onClick={handleCancelEdit}
              variant="outline" 
              size="sm"
              className="cyber-button text-xs px-2 py-1 h-auto bg-cyber-pink/20 hover:bg-cyber-pink/30"
            >
              <X size={14} className="mr-1 text-cyber-pink" />
              Cancel
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Personal Information */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Personal Information</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User size={16} className="text-cyber-blue mr-2" />
              {isEditing ? (
                <input 
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="cyber-input text-sm w-full"
                />
              ) : (
                <span>{name}</span>
              )}
            </div>
            
            <div className="flex items-center text-sm">
              <Mail size={16} className="text-cyber-purple mr-2" />
              <span>{email}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Calendar size={16} className="text-cyber-green mr-2" />
              <span>Joined: {joinDate}</span>
            </div>
          </div>
        </div>
        
        {/* Interests */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {(isEditing ? editedInterests : interests).map((interest, index) => (
              <div 
                key={index} 
                className="bg-cyber-darker px-2 py-1 rounded-md text-xs flex items-center"
              >
                <BookOpen size={12} className="text-cyber-pink mr-1" />
                {interest}
                {isEditing && (
                  <button 
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-cyber-pink hover:text-cyber-blue"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add interest..."
                className="cyber-input text-xs flex-1"
              />
              <Button 
                onClick={addInterest}
                variant="outline" 
                size="sm"
                className="cyber-button text-xs px-2 py-1 h-auto"
              >
                Add
              </Button>
            </div>
          )}
        </div>
        
        {/* Skills */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {(isEditing ? editedSkills : skills).map((skill, index) => (
              <div 
                key={index} 
                className="bg-cyber-darker px-2 py-1 rounded-md text-xs flex items-center"
              >
                <Code size={12} className="text-cyber-blue mr-1" />
                {skill}
                {isEditing && (
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-cyber-pink hover:text-cyber-blue"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill..."
                className="cyber-input text-xs flex-1"
              />
              <Button 
                onClick={addSkill}
                variant="outline" 
                size="sm"
                className="cyber-button text-xs px-2 py-1 h-auto"
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

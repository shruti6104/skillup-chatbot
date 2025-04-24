
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ExternalLink, Star } from 'lucide-react';
import { Resource, RoadmapStep, roadmaps } from '@/data/roadmapData';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface RoadmapViewProps {
  category: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ category }) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const roadmap = roadmaps[category];

  if (!roadmap) {
    return (
      <div className="p-4 text-center">
        <p>No roadmap found for this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-orbitron text-cyber-blue mb-2">
          {roadmap.icon} {roadmap.category}
        </h1>
        <p className="text-gray-400">{roadmap.description}</p>
      </div>

      <div className="space-y-4">
        {roadmap.steps.map((step, index) => (
          <Card key={step.title} className="cyber-card bg-cyber-darker border-cyber-border">
            <CardHeader className="cursor-pointer" onClick={() => setExpandedStep(expandedStep === step.title ? null : step.title)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-cyber-blue font-orbitron">
                    {index + 1}. {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Expected duration: {step.duration}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedStep === step.title ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotate: 180 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedStep === step.title && (
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-gray-300">{step.description}</p>
                  
                  {step.prerequisites && step.prerequisites.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-cyber-purple font-semibold mb-1">Prerequisites:</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {step.prerequisites.map(prereq => (
                          <li key={prereq}>{prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="text-cyber-green font-semibold mb-2">Learning Resources:</h4>
                    <div className="grid gap-3">
                      {step.resources.map((resource: Resource) => (
                        <a
                          key={resource.name}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-cyber-darker rounded-lg hover:bg-cyber-dark transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Book className="text-cyber-blue" size={16} />
                            <span className="font-medium">{resource.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {resource.isFree && (
                              <span className="px-2 py-1 text-xs bg-cyber-green text-black rounded">
                                Free
                              </span>
                            )}
                            <span className="px-2 py-1 text-xs bg-cyber-purple text-white rounded">
                              {resource.type}
                            </span>
                            <ExternalLink size={16} className="text-cyber-blue" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

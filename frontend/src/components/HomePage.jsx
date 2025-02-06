import React from 'react';
import { CheckCircle, Clock, Users } from 'lucide-react';

function HomePage({ onViewChange }) {
  return (
    <div className="home-container">
      <h1 className="home-title">Manage Tasks with Ease</h1>
      <p className="home-subtitle">
        Stay organized and boost your productivity with TaskFlow
      </p>

      <div className="features-grid">
        <FeatureCard 
          icon={<CheckCircle className="feature-icon" />}
          title="Task Management"
          description="Create, organize, and track your tasks efficiently"
        />
        <FeatureCard 
          icon={<Clock className="feature-icon" />}
          title="Time Tracking"
          description="Monitor time spent on tasks and improve productivity"
        />
        <FeatureCard 
          icon={<Users className="feature-icon" />}
          title="Team Collaboration"
          description="Work together seamlessly with your team"
        />
      </div>

      <div className="buttons">
        <button onClick={() => onViewChange('signup')} className="primary">
          Get Started
        </button>
        <button onClick={() => onViewChange('login')} className="secondary">
          Sign In
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

export default HomePage;

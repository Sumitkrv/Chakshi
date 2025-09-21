import React, { useState } from "react";
import "./KidsCorner.css";



const KidsCorner = () => {
  const [activeTab, setActiveTab] = useState("games");

  const games = [
    {
      id: 1,
      title: "Order in the Court!",
      icon: "⚖️",
      description: "Match the laws with their meanings in this fun memory game.",
      age: "6+",
      players: "1-2"
    },
    {
      id: 2,
      title: "Right or Wrong?",
      icon: "✅",
      description: "Decide if actions are right or wrong according to basic laws.",
      age: "5+",
      players: "1"
    },
    {
      id: 3,
      title: "Legal Eagle Adventure",
      icon: "🦅",
      description: "Help Legal Eagle solve puzzles to restore justice in the city.",
      age: "8+",
      players: "1"
    }
  ];

  const stories = [
    {
      id: 1,
      title: "The Honest Judge",
      icon: "👨‍⚖️",
      description: "A story about a judge who always tells the truth, no matter what.",
      duration: "5 min",
      moral: "Honesty"
    },
    {
      id: 2,
      title: "The Little Lawyer",
      icon: "👧",
      description: "A young girl helps her neighbors solve problems using fairness.",
      duration: "7 min",
      moral: "Justice"
    },
    {
      id: 3,
      title: "The Rights Rangers",
      icon: "🦸",
      description: "Superheroes who protect children's rights around the world.",
      duration: "10 min",
      moral: "Rights"
    }
  ];

  const activities = [
    {
      id: 1,
      title: "Color Your Rights",
      icon: "🎨",
      description: "Download and color pages about children's rights and laws.",
      type: "Printable"
    },
    {
      id: 2,
      title: "AR Court Tour",
      icon: "📱",
      description: "Point your camera to see a virtual courtroom come to life!",
      type: "Augmented Reality"
    },
    {
      id: 3,
      title: "Lawyer Dress Up",
      icon: "👔",
      description: "Dress up virtual characters in different legal professions.",
      type: "Interactive"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "games":
        return (
          <div className="content-grid">
            {games.map(item => (
              <div key={item.id} className="content-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="card-meta">
                    <span>Age: {item.age}</span>
                    <span>Players: {item.players}</span>
                  </div>
                </div>
                <button className="play-btn">Play Now</button>
              </div>
            ))}
          </div>
        );
      
      case "stories":
        return (
          <div className="content-grid">
            {stories.map(item => (
              <div key={item.id} className="content-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="card-meta">
                    <span>{item.duration}</span>
                    <span>Moral: {item.moral}</span>
                  </div>
                </div>
                <button className="play-btn">Read Story</button>
              </div>
            ))}
          </div>
        );
      
      case "activities":
        return (
          <div className="content-grid">
            {activities.map(item => (
              <div key={item.id} className="content-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="card-meta">
                    <span>{item.type}</span>
                  </div>
                </div>
                <button className="play-btn">Explore</button>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="kids-corner">
      <div className="container">
        <div className="section-header">
          <h2>Law Adventures for Kids</h2>
          <p>Fun and educational activities to help children understand laws and rights</p>
        </div>

        {/* Tab Navigation */}
        <div className="kids-tabs">
          <button
            className={activeTab === "games" ? "kid-tab active" : "kid-tab"}
            onClick={() => setActiveTab("games")}
          >
            🎮 Games
          </button>
          <button
            className={activeTab === "stories" ? "kid-tab active" : "kid-tab"}
            onClick={() => setActiveTab("stories")}
          >
            📚 Stories
          </button>
          <button
            className={activeTab === "activities" ? "kid-tab active" : "kid-tab"}
            onClick={() => setActiveTab("activities")}
          >
            🎨 Activities
          </button>
        </div>

        {/* Content Area */}
        <div className="kids-content">
          {renderContent()}
        </div>

        {/* Safety Notice */}
        <div className="safety-notice">
          <div className="safety-icon">🔒</div>
          <div className="safety-text">
            <h4>Safe & Educational</h4>
            <p>All content is child-friendly, ad-free, and designed with educational experts.</p>
          </div>
        </div>

        {/* Parent Resources */}
        <div className="parent-resources">
          <h3>For Parents & Teachers</h3>
          <div className="resource-buttons">
            <button className="resource-btn">Download Activity Guide</button>
            <button className="resource-btn">Lesson Plans</button>
            <button className="resource-btn">Safety Resources</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsCorner;
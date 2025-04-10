import React from "react";
import "./DashboardIntro.css"; 

const DashboardIntroduction = () => {
  return (
    <div className="dashboard-intro-container">
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Introduction</h2>
      <p className="mb-4">
        Social media platforms have become an integral part of our daily lives, with the most
        popular ones gathering over 2 billion active users. Each platform stands out with its own
        user dynamics and engagement mechanisms:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Twitter</strong> often serves as a space for debate and discussion.</li>
        <li><strong>Instagram</strong> is designed to showcase lifestyles, vacations, and curated moments.</li>
        <li><strong>Snapchat</strong> is particularly popular among younger users for instant communication.</li>
      </ul>
      <p className="mb-4">
        Each social network’s unique mechanics influence the type of content that gets promoted and
        the emotions it conveys—whether positive or negative. Additionally, recommendation
        algorithms tend to reinforce these emotional trends, immersing users deeper into specific
        types of content.
      </p>
      <h2 className="text-2xl font-bold mb-4">Objectives</h2>
      <p className="mb-4">
        This dashboard leverages <strong>sentiment analysis</strong> techniques to analyze and visualize
        the emotions conveyed by social media content. It provides insights into the emotional
        landscape of each platform, highlighting both their advantages and their potential drawbacks.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Raise awareness about how certain platforms amplify negative emotions, shaping users' perceptions and engagement.</li>
        <li>Offer a nuanced perspective on the nature of social media, showing how algorithms prioritize polarizing content, often reinforcing the most extreme opinions.</li>
        <li>Provide useful insights for developers and decision-makers who want to refine their platform’s policies or explore opportunities in the evolving social media landscape.</li>
      </ul>
      <p>
        By offering a clear representation of how sentiment varies across different platforms, this tool helps both users and developers better understand the underlying dynamics of social media influence.
      </p>
    </div>
    </div>
  );
};

export default DashboardIntroduction;

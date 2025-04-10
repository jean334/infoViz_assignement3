import React, { useState } from "react";
import VizContainer from "../Components/VizContainer";


import LineChart from "../Components/LineChart";

const GroupsHive = [
    "Art", "Business_Studies", "Citizenship", 
    "Design_and_Technology", "Geography", "IT", "Language_and_literature", 
    "Music", "Religion", "People", "Everyday_life", 
    "Science", "History"
  ];
  
  const BarRaceText = "This visualization is a bar race chart representing the number of active users (in millions) for each social media platform from January 2017 to October 2024. It highlights the rapid growth in user adoption, emphasizing the universal expansion of social media across different platforms. The data comes from multiple sources and has been manually aggregated into a JSON file. In most cases, user counts are averaged per quarter, but some platforms—such as Telegram—have data with a lower resolution. For recent dates, some figures are not consistently reported, which explains why Facebook's user count remains unchanged after 2022."

  
function Home() {
    return(
      <div className="App">
        <div className="top-container">
          <div className="logo-container">
            <img src="./socialmedia.png" alt="SocialMedia" width="140"/>
          </div>
          <div className="title-container">
            <h1 className="page-title">Social Media Analysis</h1>
          </div>
      </div>

  
      <div className="bar-race-viz">
        <VizContainer viz={LineChart} title={"Number of Monthly Social Media Active Users in Millions"} groups={GroupsHive} text={BarRaceText} hasSidePanel={false}/>
      </div>

  
    </div>
  );
  }
  
  export default Home;

import React from "react";
import "./About.css";

function About() {
    return (
      <div className="about">
        <h1>About the Dataset</h1>
        <p>
          Below are the sources of the datasets used in the visualizations:
        </p>
  
        <h2>Bar Race Dataset</h2>
        <ul>
          <li>
            Facebook. (2021). Monthly Active users of Facebook [Data set]. Kaggle. 
            <a href="https://doi.org/10.34740/KAGGLE/DSV/2565605" target="_blank" rel="noopener noreferrer">DOI Link</a>
          </li>
          <li>
            Twitter 2017-2023: 
            <a href="https://backlinko.com/twitter-users" target="_blank" rel="noopener noreferrer">X (Twitter) Statistics</a>
          </li>
          <li>
            Instagram 2013-2024: 
            <a href="https://www.demandsage.com/instagram-statistics/#:~:text=Social%20Media%20Giants-,Instagram%20is%20the%20third%20most%20popular%20social%20media%20platform%20worldwide,3.07%20billion%20monthly%20active%20users." target="_blank" rel="noopener noreferrer">Instagram Usage Statistics</a>
          </li>
          <li>
            SnapChat 2014-2024: 
            <a href="https://www.statista.com/statistics/545967/snapchat-app-dau/" target="_blank" rel="noopener noreferrer">Snapchat Daily Active Users</a>
          </li>
          <li>
            Telegram 2014-2024: 
            <a href="https://www.statista.com/statistics/234038/telegram-messenger-mau-users/" target="_blank" rel="noopener noreferrer">Telegram Global MAU</a>
          </li>
        </ul>
  
        <h2>Treemap Dataset</h2>
        <p>
          Emirhan BULUT. (2024). Social Media Usage and Emotional Well-Being [Data set]. Kaggle.
          <a href="https://doi.org/10.34740/KAGGLE/DSV/8460631" target="_blank" rel="noopener noreferrer"> DOI Link</a>
        </p>
  
        <h2>Bar Chart Dataset</h2>
        <p>
          Social Media Sentiments Analysis Dataset: 
          <a href="https://www.kaggle.com/datasets/kashishparmar02/social-media-sentiments-analysis-dataset" target="_blank" rel="noopener noreferrer"> Kaggle Dataset</a>
        </p>
  
        <h2>Histogram Dataset</h2>
        <p>
          The data comes from Clemson University researchers
          <a href="https://www.clemson.edu/cbshs/faculty-staff/profiles/darrenl" target="_blank" rel="noopener noreferrer"> Darren Linvill</a> 
          and <a href="http://pwarren.people.clemson.edu/" target="_blank" rel="noopener noreferrer"> Patrick Warren</a>, collected on July 25, 2018. 
          It is available on GitHub: 
          <a href="https://github.com/fivethirtyeight/russian-troll-tweets/" target="_blank" rel="noopener noreferrer">fivethirtyeight/russian-troll-tweets</a>.
        </p>
  
        <h2>Parallel Plot Dataset</h2>
        <p>
          Jon Bruner's Twitter user dataset: 
          <a href="https://github.com/jonbruner/twitter-analysis" target="_blank" rel="noopener noreferrer"> Twitter Analysis Dataset</a>
        </p>
  
        <footer className="footer">
          <p>© Jean ACKER - 2025 - Social Media Analysis</p>
        </footer>
      </div>
    );
  }
  
  export default About;
  
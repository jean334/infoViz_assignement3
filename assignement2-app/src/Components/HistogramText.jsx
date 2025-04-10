import "./HistogramText.css"; 

const HistogramText = () => {
    return (
        <div className="histogram-text-container">
            <div className="max-w-md p-4 bg-white shadow-lg rounded-2xl">
                <h3 className="text-xl font-bold mb-2">Histogram Analysis</h3>
                <p>This histogram represents a sample of tweets identified as originating from Russian trolls. The bars are aggregated on a weekly basis, with their height reflecting the number of tweets posted each week.</p>
                <p>The goal is to highlight the impact of troll factories and their strategic targeting of critical periods, such as U.S. elections, to influence public opinion.</p>
                <p> This histogram also shows the reality of the games of influence that are played on social networks, demonstrating that much of the content on social networks is published to sow discord within populations and trap users, by influencing their recommendation algorithms, in a loop of divisive content and fake news.  </p>
                <p>Significant spikes in activity can be observed on key dates:</p>
                <ul className="list-disc list-inside">
                <li><strong>October 2016</strong>: Likely related to the October 7, 2016 WikiLeaks release of embarrassing emails from the Clinton campaign.</li>
                <li><strong>November 2016</strong>: Corresponding to the U.S. presidential election.</li>
                <li><strong>Summer 2017</strong>: A shift in focus to a specific type of troll known as the “Right Troll.”</li>
                </ul>
            </div>
      </div>
    );
  };

export default HistogramText;
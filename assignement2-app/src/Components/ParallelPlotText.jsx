import "./ParallelPlotText.css";

const ParallelPlotText = () => {
    return (
        <div className="parallel-plot-text-container">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-2">Parallel Plot Analysis</h2>
                <p className="mb-2">
                This visualization focuses on Twitter, highlighting that the vast
                majority of users are largely passive on the platform. As a result,
                most of the content comes from a small number of users.
                </p>
                <p className="mb-2">
                Each line in the parallel plot represents a single user, with a total
                of 30,000 users displayed. The plot consists of five axes:
                </p>
                <ul className="list-disc pl-6 mb-2">
                <li>Account creation date on Twitter</li>
                <li><strong>Followers count</strong>: Number of Twitter accounts following this account</li>
                <li><strong>Following count</strong>: Number of Twitter accounts that this account follows</li>
                <li><strong>Statuses count</strong>: Number of public posts created by this account</li>
                <li>
                    <strong>Listed count</strong>: Number of lists on which this account appears (Twitter lists
                    are curated collections of accounts grouped by users for easier access to specific
                    content streams)
                </li>
                </ul>
                <p>
                The parallel plot shows that most lines are concentrated towards the
                right side of the graph, indicating that the majority of accounts have
                low activity and a small follower base. In other words, most of the content 
                come from a small number of users, which tends to polarize social media content.
                </p>
            </div>
        </div>
    );
  };
  
  export default ParallelPlotText;
import React from "react";
import "./SecondParagraphe.css";

const SecondParagraphe = () => {
  return (
    <div className="second-par">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <p className="mb-4">
            These two visualizations are <strong>complementary</strong>: one provides an overview of the <strong>dominant sentiments</strong> on each platform, while the other tracks the <strong>evolution of these emotions over time</strong>.
        </p>
        <p className="mb-4">
            The main limitation of these plots lies in the <strong>small dataset size</strong>: the <strong>treemap</strong> is based on <strong>1,000 messages</strong>, while the <strong>time series</strong> uses <strong>500 messages from three social networks</strong> spanning <strong>14 years</strong>.
        </p>
        <p className="mb-4">
            Finding a dataset that includes <strong>both labeled sentiments and message timestamps</strong> proved challenging.
        </p>
        <p>
            For more meaningful insights, <strong>training a model</strong> to label a <strong>larger dataset</strong> of posts from Instagram, Twitter, and Facebook would likely be necessary.
        </p>
        <p>
        The treemap data is still relevant, as can be seen, it shows a dominance of negativity on twitter, unlike a majority of hapiness on instagram. 
        </p>
        </div>
    </div>
  );
};

export default SecondParagraphe;

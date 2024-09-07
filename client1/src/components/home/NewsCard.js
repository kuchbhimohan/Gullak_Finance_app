import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const fallbackNews = [
  {
    title: "Global Markets React to Economic Policy Shifts",
    description: "Major stock indices show volatility as central banks announce new monetary policies.",
    source: "Financial Times",
    published_at: "2024-09-06T08:00:00Z",
    url: "https://www.ft.com/content/example-1"
  },
  {
    title: "Tech Giants Face New Regulations in Emerging Markets",
    description: "Governments in developing economies introduce stricter rules for multinational tech companies.",
    source: "Wall Street Journal",
    published_at: "2024-09-06T10:30:00Z",
    url: "https://www.wsj.com/articles/example-2"
  },
  {
    title: "Renewable Energy Investments Reach Record High",
    description: "Global investment in renewable energy surpasses traditional fossil fuels for the first time.",
    source: "Bloomberg",
    published_at: "2024-09-06T09:15:00Z",
    url: "https://www.bloomberg.com/news/articles/example-3"
  },
  {
    title: "Cryptocurrency Adoption Grows Among Institutional Investors",
    description: "Major financial institutions increase their cryptocurrency holdings despite market volatility.",
    source: "Reuters",
    published_at: "2024-09-06T11:45:00Z",
    url: "https://www.reuters.com/article/example-4"
  },
  {
    title: "Supply Chain Disruptions Impact Global Manufacturing",
    description: "Ongoing logistics challenges lead to production delays and increased costs for manufacturers worldwide.",
    source: "CNBC",
    published_at: "2024-09-06T07:30:00Z",
    url: "https://www.cnbc.com/2024/09/06/example-5"
  }
];
const NewsCard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "DVXBpet6ukP76VnQNyT7UQ9MSXjP2QjY");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "https://api.apilayer.com/financelayer/news?keywords=finance%20%2C%20ambani%20%2C%20adani%20%2C%20reliance&limit=5",
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setNews(result.data);
        } else {
          throw new Error('Unexpected data structure in API response');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  if (loading) return <div>Loading news...</div>;

  return (
    <div className="news-carousel bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((offset) => {
          const index = (currentIndex + offset) % news.length;
          return (
            <div key={index} className="news-item p-4 border rounded-lg transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-2">{news[index].title}</h3>
              <p className="text-sm text-gray-600 mb-2">{news[index].description.substring(0, 100)}...</p>
              <p className="text-xs text-gray-500">Source: {news[index].source}</p>
              <p className="text-xs text-gray-500">Published: {new Date(news[index].published_at).toLocaleDateString()}</p>
              <a href={news[index].url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">Read more</a>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevNews} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          <FaChevronLeft className="inline mr-2" /> Previous
        </button>
        <button onClick={nextNews} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Next <FaChevronRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
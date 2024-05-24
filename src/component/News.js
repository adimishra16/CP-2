import React, { Component } from 'react';
import NewsItem from './NewsItem';
import axios from 'axios';
import './News.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: true // Add a loading state
    };
  }

  async componentDidMount() {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=18d8d375662c40b69d499247133572b6`;
    try {
      const response = await axios.get(url);
      this.setState({ articles: response.data.articles.slice(0, 10), loading: false }); // Limit articles to 10
    } catch (error) {
      console.error('Error fetching the news articles:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey Top Headlines</h2>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem 
                    title={element.title ? element.title.slice(0, 45) : "No title available"} 
                    description={element.description ? element.description.slice(0, 88) : "No description available"} 
                    imageUrl={element.urlToImage} 
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default News;
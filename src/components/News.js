import React from "react";
import { useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )} - NewsMonkey`;
  News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
    totalResults: 0,
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);

  //   state = {
  //     articles: article,
  //     loading: false,
  //     page: 1,
  //     totalResults: 0
  //   };

  const updateNews = async () => {
    props.setProgress(25);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${page}&pageSize=5
    `;
    // setState({ loading: true });
    let data = await fetch(url);
    props.setProgress(40);

    let parsedData = await data.json();
    // setState({ loading: false });
    setLoading(false);

    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${
      page + 1
    }&pageSize=5
    `;
    setPage(page + 1);
    setPage(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setPage(false);
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // });
  };
  useEffect(() => {
    updateNews();
  }, []);

  // async componentDidMount() {
  // }

  // const handleNextClick = async () => {
  //   // setState({ page: page + 1 });
  //   setPage(page+1)
  //   updateNews();
  // };

  // const handlePreviousClick = async () => {
  //   // setState({ page: page - 1 });
  //   setPage(page-1)
  //   updateNews();
  // };

  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "100px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {/* <div className="text-center">
          
          Displaying page{" "}
          <span className="badge bg-primary">
            {!loading ? articles.length.toString() : 0}
          </span>{" "}
          results
        </div> */}
      {/* {loading && <Spinner />} */}
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 > Math.ceil(totalResults / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description
                        : "Know more about it by clicking on 'Read More...'"
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author ? element.author : "Anonymous"}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";
// // import InfiniteScroll from "react-infinite-scroller";
// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "General",
//     totalResults: 0
//   };
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };
//   article = [];
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   constructor(props) {
//     super(props);
//     state = {
//       articles: [],
//       loading: false,
//       totalArticles: 1,
//       page: 1,
//       totalResults: 0,
//     };
//     document.title = `${capitalizeFirstLetter(
//       props.category
//     )} - NewsMonkey`;
//   }
//   async updateNews() {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${page}&pageSize=${props.pageSize}`;

//     let data = await fetch(url);
//     console.log(data);
//     let parsedData = await data.json();
//     setState({
//       articles: parsedData.articles,
//       totalArticles: parsedData.totalResults,
//       loading: false,
//     });
//   }

//   async componentDidMount() {
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=1&pageSize=${props.pageSize}`;
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7`;

//     // let data = await fetch(url);
//     // console.log(data);
//     // let parsedData = await data.json()
//     // setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false})
//     updateNews();
//   }

//   handlePrevClick = async () => {
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${page - 1}&pageSize=${props.pageSize}`;
//     // setState({loading: true});
//     // let data = await fetch(url);
//     // let parsedData = await data.json()

//     // setState({
//     //   page: page - 1,
//     //   articles: parsedData.articles,
//     //   loading: false
//     // })
//     setState({ page: page - 1 });
//     updateNews();
//   };

//   handleNextClick = async () => {
//     // if (!(page + 1 > Math.ceil(totalResults/props.pageSize)))
//     // {
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${page + 1}&pageSize=${props.pageSize}`;
//     //   setState({loading: true});
//     //   let data = await fetch(url);
//     //   let parsedData = await data.json()

//     //   setState({
//     //     page: page + 1,
//     //     articles: parsedData.articles,
//     //     loading: false
//     //   })
//     // }

//     setState({ page: page + 1 });
//     updateNews();
//   };

//   fetchMoredata = async () => {
//     // setTimeout(() => {
//     //   setState({
//     //     items: items.concat(Array.from({length: 20}))
//     //   })
//     // })
//     setState({ page: page + 1 });
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1e6539b8843b42dd93e8abd01f1ad6c7&page=${page}&pageSize=${props.pageSize}`;
//     setState({loading: true});
//     let data = await fetch(url);
//     console.log(data);
//     let parsedData = await data.json();

//     setState({
//       articles: articles.concat(parsedData.articles),
//       totalArticles: parsedData.totalResults,
//       loading: false,
//     });
//   };

//   render() {
//     return (
//       <>
//         <h1 className="text-center" style={{ margin: "35px 0px" }}>
//           NewsMonkey - Top Headlines
//         </h1>
//         {loading && <Spinner />}
//         <InfiniteScroll
//         // start={0}
//           dataLength ={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           style={{ display: "flex", flexDirection: "column-reverse" }}
//           loader={loading && <Spinner />}
//           // scrollableTarget="scrollableDiv"
//         >
//           <div className="container">
//             <div className="row">
//               {articles.map((element) => {
//                 // console.log(element);
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element ? element.title.slice(0, 18) + "..." : " "}
//                       description= {
//                         element.description
//                           ? element.description.slice(0, 88) + "..."
//                           : " "
//                       }
//                       imageUrl = {element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author}
//                       source={element.source.name}
//                       date={element.publishedAt}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className='container d-flex justify-content-between' >
//         <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePrevClick}> &larr; Previous</button>
//         <button disabled={page > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
//         </div> */}
//       </>
//     );
//   }
// }

// export default News;

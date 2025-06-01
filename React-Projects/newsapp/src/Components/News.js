import React, { Component } from 'react'
import NewsItem from './Newsitem'
 import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country:"us",
    pageSize:6,
    category:"general"
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`NewsApp-${this.capitalize(this.props.category)}`;
    }
    async updateNews(pageNo){
      this.props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60352f91498743a2a432af1d09600a19&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data= await fetch(url);
      this.props.setProgress(30);
      let parsedData=await data.json();
      this.props.setProgress(70);
      this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
      });
      this.props.setProgress(100);
   }
    async componentDidMount(){
      this.updateNews();
    }
    handlePrevClick = async () => {
      const newPage = this.state.page - 1; // Calculate the new page
      await this.setState({ page: newPage, loading: true }); // Update the state
      this.updateNews(); // Call the updateNews function to fetch data for the new page
    };
    
    handleNextClick = async () => {
      const newPage = this.state.page + 1; // Calculate the new page
      await this.setState({ page: newPage, loading: true }); // Update the state
      this.updateNews(); // Call the updateNews function to fetch data for the new page
    };
    fetchMoreData = async () => {
      this.setState({page:this.state.page+1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60352f91498743a2a432af1d09600a19&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading:false
      });
    }
      
    



  render() {
    return (
      <>
        <center><h2 className="text-center" style={{padding: '15px 10px',color: 'black', margin: '30px 0px',marginTop:'90px'}}>NewsApp-Top {this.capitalize(this.props.category)} Headlines</h2></center>
        {this.state.loading && <Spinner/> }
       
        <InfiniteScroll
  dataLength={this.state.articles.length} // Access articles length from state
  next={this.fetchMoreData}
  hasMore={this.state.articles.length < this.state.totalResults} // Corrected: Access totalResults from state
  loader={<Spinner />}
>
           <div className='container '>
          
        <div className="row">
             { this.state.articles.map((element)=>{
                return <div className="col-md-3 mb-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,90):""} description={element.description?element.description.slice(0,30):""} imageUrl={element.urlToImage} 
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            
            })}
        </div>  
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-around">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}


      </>
    )
  }
}

export default News;
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'




function News(props){

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    document.title= `${capitalize(props.category)} - NewsMonkey`;
    

    function capitalize(str){
        let usestr = str.toLowerCase();
        return (usestr.slice(0,1).toUpperCase() + usestr.slice(1));
    }

   
    

    const update= async(pageNo)=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}&category=${props.category}`;
        setLoading(true);
        props.setProgress(20);
        let data = await fetch(url);
        props.setProgress(40);
        let parseData = await data.json();
        console.log(parseData);
        props.setProgress(70);
        setArticles(parseData.articles);
        setLoading(false);
        setPage(pageNo);
        setTotalResults(parseData.totalResults);
        props.setProgress(100);

    }

    const fetchMoreData = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}&category=${props.category}`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        setArticles(articles.concat(parseData.articles));
        setPage(page+1);
        setTotalResults(parseData.totalResults);
        
    }
    useEffect(() => {
        update(1);
        //eslint-disable-next-line
    }, [])
    

    const prevNews= async ()=>{

        update(page-1);

    }
    const nextNews= async ()=>{
       
        update(page+1);
    }

    
        return (
            <>
            <div className='container my-3'>
            <h1 className='text-center' style={{marginTop:"80px", marginBottom:"25px"}}>NewsMonkey - Top {capitalize(props.category)} Headlines </h1>
            {loading && <Spinner/>}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner/>}
                style={{overflow:"hidden"}}
            >    
                <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-md-4 my-3" key={element.url+ element.title}>
                                <NewsItem   title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div> 
                    })}
                </div>
                </div>
            </InfiniteScroll>
            
                
                {/* <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark"onClick={this.prevNews}>&larr; Previous</button>
                <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalResults/(props.pageSize))} className="btn btn-dark" onClick={this.nextNews}>Next &rarr;</button>
            </div> */}

            </div>
            </>
        )
    
}

export default News


News.defaultProps = {
    country: "in",
    pageSize:5,
    apiKey:"",
    category:"general"
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string,
    category: PropTypes.string
};
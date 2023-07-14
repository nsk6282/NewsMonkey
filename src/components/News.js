import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize:5,
        apiKey:"",
        category:"general"
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        apiKey: PropTypes.string,
        category: PropTypes.string
    };

    capitalize=(str)=>{
        let usestr = str.toLowerCase();
        return (usestr.slice(0,1).toUpperCase() + usestr.slice(1));
    }
   
    constructor(props){
        super(props);
        this.state = {
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        };
        document.title= `${this.capitalize(this.props.category)} - NewsMonkey`;
    };

    async update(pageNo){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({loading:true});
        let data = await fetch(url);
        console.log("yop")
        let parseData = await data.json();
        console.log(parseData);
        this.setState({articles:parseData.articles,
                        totalResults:parseData.totalResults,
                        page:pageNo,
                        loading:false
        });

    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // console.log("yop")
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({articles:parseData.articles,
        //                 totalResults:parseData.totalResults,
        //                 loading:false
        // });
        this.update(1);
    }

    prevNews= async ()=>{
        // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // console.log("yop")
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({articles:parseData.articles,
        //                 page:this.state.page-1,
        //                 loading:false    
        // });

        this.update(this.state.page-1);

    }
    nextNews= async ()=>{
        // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // console.log("yop")
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({articles:parseData.articles,
        //                 page:this.state.page+1,
        //                 loading:false   
        // });
        this.update(this.state.page+1);
    }

    render() {
        return (
            <div className='container my-3'>
            <h1 className='text-center' style={{margin:"30px 0px"}}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines </h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem   title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div> 
                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark"onClick={this.prevNews}>&larr; Previous</button>
                <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalResults/(this.props.pageSize))} className="btn btn-dark" onClick={this.nextNews}>Next &rarr;</button>
            </div>

            </div>
        )
    }
}

export default News

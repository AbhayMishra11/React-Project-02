import React, { Component, useState, useEffect } from 'react'
import Spinner from './Spinner'

export class NewsItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      loading: false,
      page: 1,
      totalPages: 1,
    };
  }
  
  // componentDidMount() {
    //   fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=${this.props.search}`)
    //     .then(response => response.json())
    //     .then(data => this.setState({ Data: data.articles },()=>{
      //       console.log(this.state.Data);
      //     }));
      // }
      async componentDidMount() {
        this.setState({loading:true})
        let request = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=${this.props.search}&page=1&pageSize=${this.props.pageSize}`)
        let data = await request.json();
        let size = Math.ceil(data.totalResults / this.props.pageSize);
        this.setState({ Data: data.articles, totalPages: size,loading:false })
  }

  handlePreChange = async () => {
    this.setState({loading:true})
    let request = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=${this.props.search}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
    let data = await request.json();
    this.setState({ Data: data.articles, page: this.state.page - 1,loading:false })
  }

  handleNextChange = async () => {
    this.setState({loading:true})
      let request = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=${this.props.search}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
      let data = await request.json();
      this.setState({ Data: data.articles, page: this.state.page + 1,loading:false })
  }

  render() {
    return (
      <>
        {this.state.loading?<Spinner/>:""}
      {this.state.loading===false && <div className='container mx-auto flex flex-wrap gap-4 my-4 max-lg:items-center max-lg:justify-center bg-[#ffffff]'>
        {this.state.Data && this.state.Data.map((items, index) => {
          return (<div key={index} className="flex flex-col flex-wrap gap-2 lg:w-[20vw]  w-[80%] bg-red-50 px-4 py-2  rounded-lg">
            <img className='lg:w-[18vw] lg:h-[20vh]' src={items.urlToImage} alt="" />
            <h1 className='font-bold text-xl'>{items.title}</h1>
            <p className='text-md font-medium'>{items.description}</p>
            <a href={`${items.url}`} target={'_blank'} className='text-white bg-gray-800 w-fit hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Read Me...</a>
          </div>);
        })}
        <div className="container flex justify-between">
          <button disabled={this.state.page <= 1} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-600" onClick={this.handlePreChange}>&larr; Previous</button>
          <button disabled={this.state.totalPages <= this.state.page} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-600" onClick={this.handleNextChange}>Next &rarr;</button>
        </div>
      </div>}
      </>
    )
  }
}


export default NewsItems

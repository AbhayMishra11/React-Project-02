import React, { Component, useState, useEffect } from 'react'

export class NewsItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
       Data: [],
    };
  }

  componentDidMount() {
    fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=india`)
      .then(response => response.json())
      .then(data => this.setState({ Data: data.articles },()=>{
        console.log(this.state.Data);
      }));
  }

  render() {
    return (
      <div className='container mx-auto flex flex-wrap gap-4'>
       {this.state.Data && this.state.Data.map((items, index) => {
  return (
    <div key={index} className="my-4 flex flex-col gap-5 w-[20vw] bg-red-50 p-4">
      <img className='w-[18vw] h-[20vh]' src={items.urlToImage} alt="" />
      <h1 className=''>{index+1}. {items.title}</h1>
      <p>{items.description}</p>
      <a href={`${items.url}`} target={'_blank'}>Read Me...</a>
    </div>
  );
})}  </div>
    )
  }
}

export default NewsItems

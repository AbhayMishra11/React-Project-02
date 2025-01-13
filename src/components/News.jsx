import React, { Component } from 'react'
import NewsItems from './NewsItems'


export class News extends Component {
  render() {
    return (
      <div className='flex gap-4 flex-col items-center justify-center'>
        <h1 className='font-bold text-3xl my-6 border-b-[1px] w-[90vw] text-center'>NewsCast - Top News Headlines</h1>
        <NewsItems search={this.props.search} pageSize={10}/>
      </div>
    )
  }
}



export default News


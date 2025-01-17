import React, { Component } from 'react'
import NewsItems from './NewsItems'


export class News extends Component {
  render() {
    return (
      <div className='flex gap-4 flex-col items-center justify-center w-[100vw]'>
        <h1 className='font-bold text-3xl my-6 border-b-[1px] w-[90vw] text-center'>NewsCast - Top {this.props.search.charAt(0).toUpperCase() + this.props.search.slice(1)} Headlines</h1>
        <NewsItems search={this.props.search} pageSize={10} />
      </div>
    )
  }
}



export default News


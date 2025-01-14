import React, { Component } from 'react';
import Spinner from './Spinner';

export class NewsItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      page: 1,
      totalPages: 1,
      totalLenth: 0,
      fullDate: '',
      fullTime: ''
    };
  }


  UpdateApi = async (Page) => {
    this.setState({ loading: true });
    let request = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=9418be9cdb294431a5251476d74224f3&q=${this.props.search}&page=${Page}&pageSize=${this.props.pageSize}`);
    let data = await request.json();
    this.setState({ data: data.articles, page: Page, loading: false, totalLenth: data.totalResults });
    let size = Math.ceil(data.totalResults / this.props.pageSize);
    this.setState({
      totalPages: size,
    });
  }
  async componentDidMount() {
    this.UpdateApi(this.state.page)

    this.state.data.forEach((items) => {
      let d = new Date(items.publishedAt);
      let date = d.getDate();
      let month = d.getMonth() + 1; // Add 1 to the month
      let year = d.getFullYear();
      let fullDate = `${date}-${month}-${year}`;
      this.setState({ fullDate: fullDate })
    }
    )

  }


  handlePreChange = async () => {
    this.UpdateApi(this.state.page - 1)
  }

  handleNextChange = async () => {
    this.UpdateApi(this.state.page + 1)
  }

  render() {
    const { data, loading } = this.state;
    return (
      <>
        {loading ? <Spinner /> : ""}
        {!loading &&
          <div className='container mx-auto flex flex-wrap gap-4 my-4 max-lg:items-center max-lg:justify-center bg-[#ffffff]'>
            {data && data.map((items, index) => (
              <div key={index} className="flex flex-col flex-wrap gap-2 lg:w-[20vw]  w-[80%] bg-red-50 px-4 py-2  rounded-lg">
                <img className='lg:w-[18vw] lg:h-[20vh]' src={items.urlToImage} alt="" />
                <h1 className='font-bold text-xl'>{items.title}</h1>
                <div className='flex items-center gap-1 my-2'><div className='font-medium text-md '>Source:-</div><span className='font-normal text-sm'>{items.source.name ? items.source.name : "Unknown"}</span></div>
                <p className='text-md font-medium'>{items.description}</p>
                <h4 className='text-sm'>Published by {items.author ? items.author : 'Unknown'} on {this.state.fullDate} </h4>
                <a href={items.url} target='_blank' rel='noopener noreferrer' className='text-white bg-gray-800 w-fit hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Read Me...</a>
              </div>
            ))}
            <div className="container flex justify-between">
              <button disabled={this.state.page <= 1} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-600" onClick={this.handlePreChange}>&larr; Previous</button>
              <button disabled={this.state.totalPages <= this.state.page} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-600" onClick={this.handleNextChange}>Next &rarr;</button>
            </div>
          </div>
        }
      </>
    );
  }
}

export default NewsItems;

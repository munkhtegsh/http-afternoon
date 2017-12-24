import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

// import axios
import Axios from 'axios';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        };
    }

    // insert componentWillMount:
    componentWillMount() {
        Axios.get(`/api/featured`)
        .then(res => {
            this.setState({
                featured: res.data,
                index: (~~(Math.random() * res.data.length) + 0),
                posts: res.data
            });
        }).catch(error => console.log(error))
    };
    

    render(){
        // map over your recommended blogs here, replace null.
        const posts = this.state.posts.map((post, i) => {
            return <BlogThumb key={i} blog={post} />
        })

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {/* {} */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;
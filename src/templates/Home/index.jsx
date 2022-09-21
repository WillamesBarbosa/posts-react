import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../components/Requisitions/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PostNotFound } from '../../components/postNotFound/index'

class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: '',
  }

  componentDidMount(){
    this.handleLoadPost()
  }

  handleLoadPostPerPage = (event) =>{
    event.preventDefault();

    const { posts, allPosts, page, postPerPage } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    this.setState({ posts , page: nextPage});
    }

  handleLoadPost = async () =>{
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts()

    this.setState({ posts: postsAndPhotos.slice(page, postPerPage), allPosts: postsAndPhotos });
  }

  handleSearchAutomatically = (event) =>{
    const { value } = event.target;
    this.setState({ searchValue: value })
  }

  render(){
    const { posts, allPosts, page, postPerPage, searchValue } = this.state;
    const comparison = page + postPerPage >= allPosts.length;
    
    const postFiltered = !!searchValue ? allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts; 
    
    return (
      <section className="container">
        
        <Input value={searchValue} onChange={this.handleSearchAutomatically} />
        
        {postFiltered.length > 0 && (<Posts posts={postFiltered} />)}
        {postFiltered.length === 0 && (<PostNotFound />)}

        
        
        {!searchValue && (
          <div className='button-container'>
            <Button disabled={comparison} loadMorePost={this.handleLoadPostPerPage} />  
          </div>
          )
        }
        
      </section>
    );
  }

}

export default Home;

import React, { Component } from 'react';
import './Home.css';
import Header from './../../common/header/Header';
import { getAuthToken } from './../../common/services/localStorageService';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Filters from './filters/Filters';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: [],
      allMovies: [],
      moviesCount: 0,
    };
  }

  navigateToMovieDetails = (id) => {
    const { history } = this.props;
    history.push(`movie/${id}`);
  };

  getMovies = (page, limit, isUpComing, customFilter) => {
    let url = 'api/v1/movies?page=' + page + '&limit=' + limit;
    if (isUpComing) {
      url += '&sort=RELEASE_DATE';
    }
    if (customFilter && Object.keys(customFilter).length) {
      for (const key of Object.keys(customFilter)) {
        url += '&' + key + '=' + customFilter[key];
      }
    }
    fetch(this.props.baseUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + getAuthToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data['movies']) {
          if (isUpComing) {
            this.setState({ upcomingMovies: data['movies'] });
          } else {
            this.setState({
              allMovies: data['movies'],
              moviesCount: data['total_count'],
            });
          }
        }
      });
  };

  componentDidMount() {
    this.getMovies(1, 6, true);
    this.getMovies(1, 20);
  }

  renderUpcomingMoviesList = () => {
    return (
      <div className="bk-um-list">
        <GridList className="grid-list" cols={3}>
          {this.state.upcomingMovies.map((tile) => (
            <GridListTile
              key={tile.poster_url}
              className="movie-title"
              rows={1.37}
              onClick={() => this.navigateToMovieDetails(tile['id'])}
            >
              <img src={tile.poster_url} alt={tile.title + ' Poster'} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: 'title-bar',
                  title: 'title',
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  filterMovies = (filterObject) => {
    this.getMovies(1, 10, false, filterObject);
  };

  render() {
    // const classes = useStyles();
    return (
      <div className="bk-home">
        <Header baseUrl={this.props.baseUrl} />
        <div className="bk-upcoming-movies">
          <div className="bk-um-header">Upcoming Movies</div>
          {this.renderUpcomingMoviesList()}
        </div>
        <div className="bk-movies-list">
          <div className="bk-movies-content">
            <GridList cellHeight={350} className="grid-list" cols={4}>
              {this.state.allMovies.map((tile) => (
                <GridListTile
                  key={tile.poster_url}
                  onClick={() => this.navigateToMovieDetails(tile['id'])}
                >
                  <img src={tile.poster_url} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>Release Date: {tile.release_date}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="bk-movies-filter">
            <Filters
              applyFilter={this.filterMovies}
              baseUrl={this.props.baseUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

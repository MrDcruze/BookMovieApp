import React, { useState, useEffect, Fragment } from 'react';
import './Details.css';
import Header from './../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const MovieDetails = (props) => {
  const { baseUrl, history } = props;
  const [movieDetails, setMovieDetails] = useState({});
  const rating = [1, 2, 3, 4, 5];
  const [selectedRating, setSelectedRating] = useState(0);
  const getMovieDetails = () => {
    fetch(baseUrl + 'api/v1/movies/' + props.match.params.movieId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        // Authorization: 'Bearer ' + getAuthToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });
  };
  const youTubeOpts = {
    playerVars: {
      autoplay: 1,
    },
  };
  const videoOnReady = (event) => {
    event.target.pauseVideo();
  };

  const getRatingColor = (rating, rate) => {
    return rating >= rate ? 'yellow' : '';
  };

  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <div className="bk-movie-details">
      <Header baseUrl={baseUrl} />
      <div className="go-home">
        <Typography
          component="span"
          onClick={() => {
            history.push('/');
          }}
        >
          &lt; Back to Home
        </Typography>
      </div>
      <div className="bk-movie-content">
        <div className="bk-movie-poster">
          {movieDetails ? (
            <img src={movieDetails.poster_url} alt="movie poster" />
          ) : (
            ''
          )}
        </div>
        <div className="bk-movie-container">
          {movieDetails ? (
            <Fragment>
              <Typography variant="headline" component="h2">
                {movieDetails.title}
              </Typography>
              <Typography className="movie-div" variant="body1">
                <span className="movie-label">Genre:</span>
                <span>
                  {movieDetails['genres'] && movieDetails['genres'].length
                    ? movieDetails['genres'].join(',')
                    : 'N/A'}
                </span>
              </Typography>
              <Typography className="movie-div" variant="body1">
                <span className="movie-label">Duration:</span>
                <span>
                  {movieDetails['duration'] ? movieDetails['duration'] : 'N/A'}
                </span>
              </Typography>
              <Typography className="movie-div" variant="body1">
                <span className="movie-label">Release Date:</span>
                <span>
                  {movieDetails['release_date']
                    ? movieDetails['release_date']
                    : 'N/A'}
                </span>
              </Typography>
              <Typography className="movie-div" variant="body1">
                <span className="movie-label">Rating:</span>
                <span>
                  {movieDetails['rating'] ? movieDetails['rating'] : 'N/A'}
                </span>
              </Typography>
              <Typography className="movie-div plot" variant="body1">
                <span className="movie-label">
                  Plot:{' '}
                  {movieDetails['wiki_url'] ? (
                    <a href={movieDetails['wiki_url']} target="_blank">
                      &#40;Wiki Link&#41;
                    </a>
                  ) : (
                    ''
                  )}
                </span>
                <span>
                  {movieDetails['storyline']
                    ? movieDetails['storyline']
                    : 'N/A'}
                </span>
              </Typography>
              <Typography className="movie-div trailer" variant="body1">
                Trailer
              </Typography>
              {movieDetails['trailer_url'] ? (
                <YouTube
                  videoId={movieDetails['trailer_url'].split('v=')[1]}
                  opts={youTubeOpts}
                  onReady={videoOnReady}
                />
              ) : (
                ''
              )}
            </Fragment>
          ) : (
            ''
          )}
        </div>
        <div className="bk-additional-details">
          <Typography className="rate-text">Rate this movie:</Typography>
          <div>
            {rating.map((rate) => {
              return (
                <StarBorderIcon
                  key={rate}
                  className={
                    'star-rating ' + getRatingColor(selectedRating, rate)
                  }
                  onClick={() => setSelectedRating(rate)}
                />
              );
            })}
          </div>
          <Typography className="artist-text">Artists</Typography>
          <div className="artists-list">
            <GridList cols={2}>
              {movieDetails['artists']
                ? movieDetails['artists'].map((tile) => (
                    <GridListTile key={tile.profile_url}>
                      <img src={tile.profile_url} alt="Artist profile image" />
                      <GridListTileBar
                        title={tile.first_name + ' ' + tile.last_name}
                      />
                    </GridListTile>
                  ))
                : ''}
            </GridList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  content: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  applyBtn: {
    width: '100%',
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters = (props) => {
  const [genres, setGenres] = React.useState([]);
  const [artists, setArtists] = React.useState([]);
  const [movieName, setMovieName] = React.useState('');
  const [suggestedGenres, setSuggestedGenres] = React.useState([]);
  const [suggestedArtists, setSuggestedArtists] = React.useState([]);
  const [releaseStartDate, setReleaseStartDate] = React.useState('');
  const [releaseEndDate, setReleaseEndDate] = React.useState('');
  const { classes, applyFilter } = props;

  const handleChange = (event) => {
    setGenres(event.target.value);
  };

  const handleArtistsChange = (event) => {
    setArtists(event.target.value);
  };

  const getGenres = () => {
    let page = 1;
    let limit = 20;
    fetch('api/v1/genres?page=' + page + '&limit=' + limit, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        // Authorization: 'Bearer ' + getAuthToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data['genres']) {
          setSuggestedGenres(data['genres']);
        }
      });
  };

  const getArtists = () => {
    let page = 1;
    let limit = 20;
    fetch('api/v1/artists?page=' + page + '&limit=' + limit, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        // Authorization: 'Bearer ' + getAuthToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data['artists']) {
          setSuggestedArtists(data['artists']);
        }
      });
  };

  const handleFilterBtnSubmit =() =>{
    const reqObj = {
      title: movieName,
      start_date: releaseStartDate,
      end_date: releaseEndDate,
      genre: genres.length ? genres.join(',') : '',
      artists: artists.length ? artists.join(',') : '',
    }
    applyFilter(reqObj)
  }

  useEffect(() => {
    getArtists();
    getGenres();
  }, []);

  return (
    <Card variant="outlined">
      <CardContent className={classes.content}>
        <Typography className="" color="primary">
          FIND MOVIES BY:
        </Typography>
        <form>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="movieName">Movie Name</InputLabel>
            <Input
              id="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="bkFilterGenres">Genres</InputLabel>
            <Select
              id="bkFilterGenres"
              multiple
              value={genres}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {suggestedGenres.map(item => (
                <MenuItem key={item.id} value={item.genre}>
                  <Checkbox checked={genres.indexOf(item.genre) > -1} />
                  <ListItemText primary={item.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="bkFilterArtists">Artists</InputLabel>
            <Select
              id="bkFilterArtists"
              multiple
              value={artists}
              onChange={handleArtistsChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {suggestedArtists.map((artist) => (
                <MenuItem key={artist.id} value={artist.first_name}>
                  <Checkbox checked={artists.indexOf(artist.first_name) > -1} />
                  <ListItemText
                    primary={artist.first_name + ' ' + artist.last_name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="bkFilterReleaseDateStart"
              label="Release Date Start"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setReleaseStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="bkFilterReleaseDateEnd"
              label="Release Date End"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setReleaseEndDate(e.target.value)}
            />
          </FormControl>
        </form>
      </CardContent>
      <CardActions className={classes.content}>
        <Button
          className={classes.applyBtn}
          variant="contained"
          color="primary"
          onClick={handleFilterBtnSubmit}
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Filters);

import React, {useCallback, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@shopify/polaris';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Icon, Stack, ButtonGroup, Autocomplete, Button, TextStyle, Card, ResourceItem} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import "@shopify/polaris/dist/styles.css";
import '../App.css';

const MAX_NOMINATIONS = 5;
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }));

export default function Main() {
    const classes = useStyles();
    const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=47eacc18";
    const [textFieldValue, setTextFieldValue] = useState('N/A'); //text search string
    const [results, setResults] = useState([]); //array of movie objects
    const [nominations, setNominations] = useState([]); //array of movie objects
    const [searchTerm, setSearchTerm] = useState('N/A'); //search term string

    /*
        Purpose: gets results from API based on user input 
    */
    const fetchResults = async() => {
        let url = API_KEY + `&s=${textFieldValue}`;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    /*
        Purpose: sets the search term(s) and provides it to the API 
    */
    const handleSearch = () => {
        handleClearButtonClick();
        setSearchTerm(textFieldValue);
        fetchResults()
        .then(res => setResults(res['Search']))
    }

    const handleTextFieldChange = (value) => {
        setTextFieldValue(value)
    }

    const handleClearButtonClick = () =>  {
        setTextFieldValue('')
        setSearchTerm('N/A')
        setResults([])
    }

    const searchBtn = () => {
        return (
            <Button
            size='large'
            primary
            onClick={handleSearch}>
                Search
            </Button>
        )
    }

    const handleNominate = (movie) => {
        let data = nominations;
        if(data.length === 0) {
            nominations.push([movie]);
            if(nominations.length % 2 === 0) {
                setTextFieldValue(" ");
            } else {
                setTextFieldValue("  ");
            }
            return;
        }
        else if(data.length < MAX_NOMINATIONS) {
            let flag = false;
            for(let i = 0; i < data.length; i++) {
                if(movie.imdbID === data[i][0].imdbID) {
                    flag = true;
                }
            }
            if(flag === false) {
                nominations.push([movie]);
                if(nominations.length % 2 === 0) {
                    setTextFieldValue(" ");
                } else {
                    setTextFieldValue("  ");
                }
                return;
            }
        } 
    }

    const banner = () => {
        return (
            <Card title="Completed submission of 5 nominations.">
            <Card.Section>
                <Stack spacing="loose" vertical>
                <p>
                    You have succesfully added 5 nominees to the list. If you would like to
                    change them please remove a movie from the list and add a new one.
                </p>
                <br />
                <p>Otherwise,
                    hit submit and we will direct you to the home page. Thanks!</p>
                <Stack distribution="trailing">
                    <Link href="/" plain>Submit</Link>
                </Stack>
                </Stack>
            </Card.Section>
            </Card>  
        )
    }

    const handleRemove = (movie) => {
        for(let i = 0; i < nominations.length; i++) {
            if(movie[0].imdbID === nominations[i][0].imdbID) {
                nominations.splice(nominations[i][0], 1);
                if(nominations.length % 2 === 0) {
                    setTextFieldValue("   ");
                } else {
                    setTextFieldValue("    ");
                }
            }
        }
    }

    const breadcrumb = (
        <div  style={{margin: '2%'}}>
            <Breadcrumbs style = {{fontSize: 16}} aria-label="breadcrumb">
            <Link color="inherit" href="/">
                The Shoppies
            </Link>
            <Typography style={{fontSize: 16}} color="textPrimary">Home</Typography>
            </Breadcrumbs>
        </div>
    );

    const nominationList = useCallback(() => {
        return ( nominations.map(data => (
            <div
            style={{listStyle: 'none'}}>
            <ResourceItem id={data[0].imdbID}>
                <Grid container>
                    <Grid item xs={2}>
                    <img alt={data[0].Title} width='50'
                    style={{display: 'inline-block',
                    boxShadow: '0px 0px 2px #888'}}
                    src={data[0].Poster}></img>
                    </Grid>
                    <Grid item xs={6}>
                    <h3>
                        <TextStyle variation="strong">{data[0].Title} ({data[0].Year})</TextStyle>
                    </h3>
                    </Grid>
                    <Grid item xs={4}>
                        <Button id={data[0].imdbID} 
                        onClick={() => handleRemove(data)}>Remove</Button>
                    </Grid>
                </Grid>
            </ResourceItem>
            </div>
        )))   
    }, [nominations]);

    const containsMovie = (movie) => {   
        //need to fix this    
        return nominations.imdbID === movie.imdbID ? false : true;
    
    }

    const textField = (
        <TextField 
        //onClick={setTextFieldValue("")}
        onChange={(e) => setTextFieldValue(e.target.value)}
            value={textFieldValue}
        placeholder="Search"
        /> 
    )

    const list = useCallback(() => {

        if(searchTerm === 'N/A') {
            return (
                <p> Search something to see movies here </p>
            )           
        }

        if(results) {
            return (
                results.map(data => (
                    <div
                    style={{listStyle: 'none'}}>
                    <ResourceItem>
                        <Grid container>
                            <Grid item xs={2}>
                            <img alt={data.Title} width='50'
                            style={{display: 'inline-block',
                            boxShadow: '0px 0px 2px #888'}}
                            src={data.Poster}></img>
                            </Grid>
                            <Grid item xs={6}>
                            <h3>
                                <TextStyle variation="strong">{data.Title} ({data.Year})</TextStyle>
                            </h3>
                            </Grid>
                            <Grid item xs={4}>
                                <Button id={data.imdbID} 
                                //disabled={containsMovie(data)}
                                onClick={() => handleNominate(data)}>Nominate</Button>
                            </Grid>
                        </Grid>
                    </ResourceItem>

                    </div>
                    
                ))
            )
        }
        else {
            return (
                <p> No Results Found </p>
            )
        }
    }, [results])

    if(nominations.length === 5) {
        return (
         
            <React.Fragment>
            {breadcrumb}
            <Container>
            {banner()}
                <Typography
                variant="h2"
                style={{textAlign: 'left', marginTop: '10%'}}>
                    The Shoppies
                </Typography>
                <Grid container spacing={3} style={{marginTop: '2%'}}>
                    <Grid className={classes.container} item xs={12}>
                    <Card sectioned>
                        <form noValidate autoComplete="off">
                        <TextField
                            label='Movie Search'
                            id = "outlined-basic"
                            prefix={<Icon source={SearchMinor} color="inkLighter" />}
                            placeholder="Search"
                            clearButton
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            onClearButtonClick={handleClearButtonClick}
                            />
                        </form>
                        <br />
                        {searchBtn()}
                    </Card>
                    </Grid>
                    <Grid 
                    className={classes.container}
                    item xs={6}>
                        <Card sectioned>
                            <b>Results for {searchTerm}</b>
                            <br />
                            {list()}
                        </Card>
                    </Grid>
                    <Grid 
                    className={classes.container}
                    item xs={6}>
                        <Card sectioned>Current Nominations
                            {nominationList()}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
        )
    } else {
    
    return (
        <React.Fragment>
            {breadcrumb}
            <Container>
                <Typography
                variant="h2"
                style={{textAlign: 'left', marginTop: '10%'}}>
                    The Shoppies
                </Typography>
                <Grid container spacing={3} style={{marginTop: '2%'}}>
                    <Grid className={classes.container} item xs={12}>
                    <Card sectioned>
                        <form noValidate autoComplete="off">
                        <TextField
                            label='Movie Search'
                            id = "outlined-basic"
                            prefix={<Icon source={SearchMinor} color="inkLighter" />}
                            placeholder="Search"
                            clearButton
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            onClearButtonClick={handleClearButtonClick}
                            />
                        </form>
                        <br />
                        {searchBtn()}
                    </Card>
                    </Grid>
                    <Grid 
                    className={classes.container}
                    item xs={6}>
                        <Card sectioned>
                            <b>Results for {searchTerm}</b>
                            <br />
                            {list()}
                        </Card>
                    </Grid>
                    <Grid 
                    className={classes.container}
                    item xs={6}>
                        <Card sectioned>Current Nominations
                            {nominationList()}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
    }
}
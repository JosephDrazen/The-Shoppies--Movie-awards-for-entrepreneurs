import React, {useCallback, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Icon, Autocomplete, Button, TextStyle, Card, ResourceItem} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import "@shopify/polaris/dist/styles.css";
import '../App.css';

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
    const [textFieldValue, setTextFieldValue] = useState('');
    const [results, setResults] = useState('');
    const [nominations, setNominations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('N/A');

    const fetchResults = useCallback(async() => {
        let url = API_KEY + `&s=${textFieldValue}`;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }, [textFieldValue])


    const handleSearch = useCallback(() => {
        setSearchTerm(textFieldValue);
        fetchResults()
        .then(res => setResults(res['Search'],
        console.log(results)
        ))
    }, [fetchResults, results, setSearchTerm, textFieldValue])

    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
      );

    const handleClearButtonClick = useCallback(() => 
    setTextFieldValue(''), 
    setResults[''],
    []);

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
        console.log(movie)
        if(nominations.length < 5 && !nominations.includes(movie)) {
            let data = nominations;
            data.push([movie])
            setNominations(data)
        }
        else {
            console.log("FOO")
        }
    }

    const handleRemove = (movie) => {
        let data = nominations;
        for(let i = 0; i < data.length; i++) {
            if(movie[0].imdbID === data[i][0].imdbID)
            data.pop(data[i][0]);
            setNominations(data)

        }
    }

    const textField = (
        <Autocomplete.TextField
        label='Movie Search'
        prefix={<Icon source={SearchMinor} color="inkLighter" />}
        placeholder="Search"
        clearButton
        value={textFieldValue}
        onChange={handleTextFieldChange}
        onClearButtonClick={handleClearButtonClick}
        />
    );

    // useEffect(() => {
    //     fetchResults();
    // }, [results, fetchResults])

    const list = () => {

        if(searchTerm === 'N/A') {
            return (
                <p> Search something to see movies here </p>
            )           
        }

        else if(results) {

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
                                <Button id={data.imdbID} onClick={() => handleNominate(data)}>Nominate</Button>
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
                        {textField}
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
                        {nominations.map(data => (
                            <div
                            style={{listStyle: 'none'}}>
                            <ResourceItem>
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
                                        <Button id={data[0].imdbID} onClick={() => handleRemove(data)}>Remove</Button>
                                    </Grid>
                                </Grid>
                            </ResourceItem>
                            </div>
                        ))}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}



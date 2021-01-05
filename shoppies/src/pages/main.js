import React, {useCallback, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Icon, Autocomplete, Button, Card} from '@shopify/polaris';
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

/*
    function: Main
    purpose: renders content for the main app page
*/
export default function Main() {
    const classes = useStyles();
    const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=47eacc18";
    const [textFieldValue, setTextFieldValue] = useState('');
    const [results, setResults] = useState();

    const handleSearch = () => {
        fetchResults().then(res => setResults(res))
        console.log(results)
    }

    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
      );



    const handleClearButtonClick = useCallback(() => setTextFieldValue(''), []);

    const fetchResults = async() => {
        let url = API_KEY + `&s=${textFieldValue}`;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    const searchBtn = () => {
        return (
            <Button
            size='large'
            primary
            onClick={(e) => handleSearch(e)}>
                Search
            </Button>
        )

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
                        <Card sectioned>Results for</Card>

                    </Grid>
                    <Grid 
                    className={classes.container}
                    item xs={6}>
                        <Card sectioned>Current Nominations</Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}



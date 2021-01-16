import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { CardHeader } from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
	root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
		flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(0.5),
			maxWidth: '20rem',
    },
		maxHeight: '20rem',
		overflow: 'auto',
		textAlign: 'left',
  },
	chip: {
		margin: theme.spacing(0.5),
	}
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
	const [search, setSearch] = React.useState('ps5');
	const [results, setResults] = React.useState([]);
	// const [chipData, setChipData] = React.useState([
  //   { key: 0, label: "Angular" },
  //   { key: 1, label: "jQuery" },
  //   { key: 2, label: "Polymer" },
  //   { key: 3, label: "React" },
  //   { key: 4, label: "Vue.js" },
  // ]);
	const [keywords, setKeywords] = React.useState([]);
	const [chipData, setChipData] = React.useState([]);

	React.useEffect(() => {
		fetch('http://localhost:4040/batch').then((res) => res.json()).then((payload) => {
			setKeywords(payload.data);
			let tempSet = new Set();
			payload.data.forEach((it)=>{
				it.keywords.forEach( y => {
					tempSet.add(y);
				})
			});
			setChipData(Array.from(tempSet));
		});
	}, [])

	React.useEffect(() => {
		fetch(`http://localhost:4040/${search}`).then((res) => res.json()).then((payload) => {
			// console.log(payload);
			setResults(payload.ebay);
		});
	}, [search])

	const handleDelete = (chipToDelete) => () => {
    // setChipData((keywords) => keywords.filter((chip) => chip !== chipToDelete));
    console.info('You clicked the delete icon.');
  };

  const handleClick = (chip) => (e) => {
    console.info('You clicked the Chip.', chip, e.target);
		let temp = chipData.find(it => it.name === chip.name);
		let index = chipData.findIndex(it => it.name === chip.name);
		let tempChipData = chipData.slice();
		temp = {
			...temp,
			isSelected: !temp.isSelected
		};
		tempChipData = [
			...chipData.slice(0, index),
			temp,
			...chipData.slice(index+1, chipData.length)
		];
		setChipData(tempChipData);
		if(temp.isSelected) {
			setSearch(temp.name);
		}
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Card Hub
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography> */}
            <div className={classes.root}>
              {keywords.map((data, idx) => {
                let icon;

                {
                  /* if (data.label === "React") {
                  icon = <TagFacesIcon />;
                } */
                }

                return (
                  <Card>
										<CardHeader title="Text on Card">
										</CardHeader>
                    <CardContent>
                      {data.keywords.map((d, index) => {
                        if (!d.name || chipData.length === 0) return;
												let chip = chipData.find((it) => it.name === d.name);
                        return (
                          <Chip
                            icon={icon}
                            label={chip.name}
                            key={idx + "-" + index}
                            clickable
                            color={chip.isSelected ? 'primary' : "default"}
                            onDelete={handleDelete(chip)}
                            onClick={handleClick(chip)}
                            className={classes.chip}
                            deleteIcon={chip.isSelected && <DoneIcon />}
                          />
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
              {/* <Chip label="Basic" />
              <Chip label="Disabled" disabled />
              <Chip
                avatar={<Avatar>M</Avatar>}
                label="Clickable"
                onClick={handleClick}
              />
              <Chip
                avatar={
                  <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                }
                label="Deletable"
                onDelete={handleDelete}
              />
              <Chip
                icon={<FaceIcon />}
                label="Clickable deletable"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                label="Custom delete icon"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
              <Chip
                label="Clickable Link"
                component="a"
                href="#chip"
                clickable
              />
              <Chip
                avatar={<Avatar>M</Avatar>}
                label="Primary clickable"
                clickable
                color="primary"
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
              <Chip
                icon={<FaceIcon />}
                label="Primary clickable"
                clickable
                color="primary"
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
              <Chip
                label="Deletable primary"
                onDelete={handleDelete}
                color="primary"
              />
              <Chip
                icon={<FaceIcon />}
                label="Deletable secondary"
                onDelete={handleDelete}
                color="secondary"
              /> */}
            </div>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {results.map((card, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.price}
                    </Typography>
                    <Typography>
                      {card.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => (window.location.href = card.url)}
                    >
                      View
                    </Button>
                    {/* <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
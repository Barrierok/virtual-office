import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import chatScreen from './chat.png';
import tasksScreen from './tasks.png';
import Header from '../shared/Header';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Все права защищены BadBoys United, LLC
      {' '}
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
    backgroundSize: 'cover',
    width: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    header: 'Чат',
    link: '/chat',
    author: 'Илья Зубцов',
    description: 'Простой чат, ускоряет разработку, кооперирует людей.',
    image: `${chatScreen}`,
  },
  {
    header: 'Менеджер задач',
    link: '/tasks',
    author: 'Александр Колиух',
    description: 'Повышает эффективность распределения обязанностей на проекте, за счёт автоматизации и персонализации исполняемых функций.',
    image: `${tasksScreen}`,
  },
  {
    header: 'Лента новостей',
    link: '/news',
    image: 'https://source.unsplash.com/random',
    author: 'Павел Дерюгин',
    description: 'Новости',
  },
];

export default function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Header />
      </AppBar>
      <main>
        {/* Hero unit */}
        <section className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Виртуальный офис
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Информационная система для автоматизации деятельности
            </Typography>
          </Container>
        </section>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.header}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                    <Typography>
                      ©
                      {card.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link href={card.link}>Перейти</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
}

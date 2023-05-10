import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 20,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    backgroundImage: 'linear-gradient(to right,#20BDFF 0%,#A5FECB 100%)',
  },
  pagination: {
    borderRadius: 50,
    marginTop: '1rem',
    padding: '16px',
  },
  searchButton: {
    backgroundColor: '#3f51b5',
    borderRadius: '30px',
    color: 'white',
    marginLeft: '0rem',
    alignContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

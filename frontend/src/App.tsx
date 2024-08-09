import { Container, Grid, Typography } from '@mui/material';
import CipherForm from './component/CipherForm';


const App = () => {

  return (
    <>
      <header>
        <Typography variant="h4" sx={{textAlign: "center",m:3}}>Crypto app</Typography>
      </header>
      <Container maxWidth="xl" component="main" sx={{m: "auto"}}>
        <Grid container justifyContent="center">
          <CipherForm/>
        </Grid>
      </Container>
    </>
  )
};

export default App

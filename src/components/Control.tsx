import { Grid, Paper, Box, styled } from "@material-ui/core";

const Container = styled(Paper)({
  position: "absolute",
  top: "2rem",
  right: "2rem",
  padding: "2rem 1.5rem",
  boxSizing: "border-box",
  width: "22rem",
  height: "20rem",
});

export default function Control() {
  return (
    <Container>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={3}>
          Property
        </Grid>
        <Grid item xs={9}>
          what asdf asd fasd fas dfa sdf asdf asdf asdf asdf asdf
        </Grid>

        <Grid item xs={3}>
          Max width
        </Grid>
        <Grid item xs={9}>
          what asdf asd fasd fas dfa sdf asdf asdf asdf asdf asdf
        </Grid>
      </Grid>
    </Container>
  );
}

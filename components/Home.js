import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

const Home = props => {
    const { classes } = props;
    return (
        <div className={classNames(classes.root)}>
            <Grid
                container
                spacing={0}
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                style={{ minHeight: '100vh' }}
            >
                <Grid item>
                    <Card className={classNames(classes.card)}>
                        <CardContent>
                            <CardMedia
                                className={classNames(classes.media)}
                                image={'../static/wonderment.jpeg'}
                                title={'Discover the world'}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    align={'center'}
                                >
                                    Welcome to College Event Webapp!
                                </Typography>
                                <Typography align={'center'}>
                                    Please login or register to continue.
                                </Typography>
                            </CardContent>
                        </CardContent>
                        <CardContent
                            className={classNames(classes.actionContainer)}
                        >
                            <Link href={'/login'}>
                                <Button variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </Link>
                            <div
                                style={{
                                    marginRight: '10px',
                                    marginLeft: '10px',
                                }}
                            />
                            <Link href={'/register'}>
                                <Button variant={'contained'} color={'primary'}>
                                    Register
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
//
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

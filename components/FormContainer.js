import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
};

const FormContainer = props => {
    const { classes } = props;
    return (
        <div className={classNames(classes.root)}>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                style={{ minHeight: '100vh' }}
            >
                <Grid
                    item
                    style={
                        props.minWidth
                            ? {
                                  minWidth: props.minWidth,
                              }
                            : null
                    }
                >
                    <Card>
                        {props.loading ? <LinearProgress /> : null}
                        <CardHeader title={props.title} />
                        <CardContent className={classNames(classes.content)}>
                            {props.children}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

FormContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    minWidth: PropTypes.string
};

export default withStyles(styles)(FormContainer);

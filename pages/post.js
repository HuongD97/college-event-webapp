import {withRouter} from 'next/router';
import Layout from '../components/Layout';

const Page = withRouter((props) => (
    <Layout>
        <h1>{props.router.query.title}</h1>
        <p>{`props.router ${props.router}`}</p>
        <p>{`props.router.query ${props.router.query}`}</p>
    </Layout>
));

export default Page;

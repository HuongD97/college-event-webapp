import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const buttonStyle = {
    fontSize: '20px',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: 10,
    color: '#e9dbf9',
    backgroundColor: '#3e1472',
};

const Index = props => {
    return (
        <Layout>
            <h1>Batman TV Shows</h1>
            <ul>
                {props.shows.map(({ show }) => (
                    <li key={show.id}>
                        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                            <a>{show.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

Index.getInitialProps = async (context) => {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    return {
        shows: data,
    };
};

export default Index;

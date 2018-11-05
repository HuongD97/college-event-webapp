import Link from 'next/link';
import Layout from '../components/Layout';

const buttonStyle = {
    fontSize: '20px',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: 10,
    color: '#e9dbf9',
    backgroundColor: '#3e1472'
};

const PostLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
);

export default () => {
    return (
        <Layout>
            <p>Hello Next.JS!</p>
            <ul>
                <PostLink title={'Hello Next.js'} id={'hello-nextjs'}/>
                <PostLink title={'Learn Next.js is awesome'} id={'learn-nextjs'}/>
                <PostLink title={'Deploy apps with Zeit'} id={'deploy-nextjs'}/>
            </ul>
        </Layout>
    );
};

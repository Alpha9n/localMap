import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <Head>
                <title>ページが見つかりませんでした。</title>
            </Head>
            <main className="min-h-screen">
                <h2>404 - NotFound</h2>
                <p>開発者が想定できませんでした。</p>
                <Link href='/'>トップページに戻る</Link>
            </main>
        </>
    );
};

export default NotFound;
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head/>
                <body className={'transition-colors duration-300 bg-background-main-light dark:bg-background-main-dark'}>
                <Main/>
                <NextScript />
                </body>
            </Html>
        )
    }
}
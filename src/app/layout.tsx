import ContextProvider from '../context/contextProvider';
import { GoogleAnalytics } from '@next/third-parties/google'

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Preloader from "./components/preloader";

import { Montserrat } from 'next/font/google';

const monserat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: '--font-monserat',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

import BootstrapClient from '../app/components/bootstrapClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/vendor/ionio-icon/css/iconoir.css";
import "../assets/vendor/phosphor/phosphor-bold.css";
import "../assets/vendor/tabler-icons/tabler-icons.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/main.css";


export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

    return (
        <html lang="en" className={`${monserat.variable}`}>
            
            <body className="ltr">
                <GoogleAnalytics gaId='G-BHTFF26DMX' />
                <ContextProvider >
                    <div className="app-wrapper">
                        <Sidebar />

                        <div className="app-content shadow-none">
                            <div className="">

                                <Header />

                                <div className='mb-5'>
                                    { children }
                                </div>

                                <footer>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-9 col-12">
                                                <ul className="footer-text">
                                                    <li>
                                                        <p className="mb-0">Copyright © 2025 Pump Tools. All rights reserved 💖</p>
                                                    </li>
                                                    <li><a href="#">V0.1 Beta </a></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-3">
                                                <ul className="footer-text text-end">
                                                    <li><a href="https://t.me/pump_tools_support" target='_blank'> Need Help <i className="ti ti-help"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </footer>

                                <div className="modal_layout"></div>

                                <BootstrapClient />
                            </div>
                        </div>

                    </div>
                </ContextProvider>

                <Preloader />
            </body>
        </html>
    );
}

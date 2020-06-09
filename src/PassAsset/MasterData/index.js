import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Pass
import TipeAset from './TipeAset/';
import Golongan from './Golongan/';
import Bagian from './Bagian/';
import PenilaianAset from './PenilaianAset/';
import LokasiRantaiPasok from './LokasiRantaiPasok/'
import GedungAset from './GedungAset/'
import RuangAset from './RuangAset'

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Dashboards = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/tipe-aset`} component={TipeAset} />
                    <Route path={`${match.url}/golongan`} component={Golongan} />
                    <Route path={`${match.url}/bagian`} component={Bagian} />
                    <Route path={`${match.url}/penilaian-aset`} component={PenilaianAset} />
                    <Route path={`${match.url}/lokasi-rantai-pasok`} component={LokasiRantaiPasok} />
                    <Route path={`${match.url}/gedung-aset`} component={GedungAset} />
                    <Route path={`${match.url}/ruang-aset`} component={RuangAset} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Dashboards;
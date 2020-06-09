import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import RuangAset from './RuangAset';
import PageTitle from '../../../Layout/AppMain/PageTitle';

export default class index extends Component {

    constructor() {
        super();
        this.state = {
            activeKey: "1"
        }
    }

    render() {
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Ruang Aset"
                        icon="pe-7s-server icon-gradient bg-mean-fruit"
                    />

                    {/* <Tabs
                    defaultActiveKey="1"
                    onTabClick={() => this.handleFormTabClick}
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />} >
                    <TabPane tab='Table Data' key="1"></TabPane>
                    <TabPane tab='Form' key="2"><GolonganForm /></TabPane>
                    </Tabs> */}
                    <RuangAset />

                </CSSTransitionGroup>
            </Fragment>
        )
    }
}

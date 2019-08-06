import { renderRoutes } from 'react-router-config';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import i18n from 'i18next';

import routes from './routes';
import { DEFAULT_LANGUAGE } from './config';
import { changeLanguage } from './modules/language';

class App extends React.Component {
  componentDidMount() {
    const { changeLanguage } = this.props;
    changeLanguage(DEFAULT_LANGUAGE);
  }

  render() {
    const { changeLanguage } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title> App Title </title>
          <meta name="description" content="Server side rendering and code-splitting" />
        </Helmet>

        <div>
          <h1>This is App root page</h1>
          <hr />
          {renderRoutes(routes)}
          <hr />
          <button onClick={() => changeLanguage('en')}>En</button>
          <button onClick={() => changeLanguage('ru')}>Ru</button>
          <div>{i18n.t('test_message')}</div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lng: state.language.lng,
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: lng => dispatch(changeLanguage(lng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

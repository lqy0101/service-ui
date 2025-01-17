/*
 * Copyright 2019 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchJsonp from 'fetch-jsonp';
import semverDiff from 'semver-diff';
import { appInfoSelector } from 'controllers/appInfo';
import { FormattedMessage } from 'react-intl';
import styles from './serviceVersionBlockWithData.scss';
import { ServiceVersionItemTooltip } from './serviceVersionBlockTooltip';

const cx = classNames.bind(styles);

@connect((state) => ({
  appInfo: appInfoSelector(state),
}))
export class ServiceVersionsBlockWithData extends Component {
  static propTypes = {
    appInfo: PropTypes.object,
  };

  static defaultProps = {
    appInfo: {},
  };

  state = {
    services: {},
  };

  isDeprecated = false;

  componentDidMount() {
    fetchJsonp('https://status.reportportal.io/versions', {
      jsonpCallback: 'jsonp',
    })
      .then((res) => res.json())
      .then((latestServiceVersions) =>
        this.setState({
          services: this.calculateServices(latestServiceVersions),
        }),
      );
  }

  calculateServices = (latestServiceVersions) => {
    const services = {};
    const { appInfo } = this.props;

    Object.keys(appInfo).forEach((serviceKey) => {
      const serviceValue = appInfo[serviceKey];
      if (!(serviceValue && serviceValue.build)) return false;

      const currentVersion = serviceValue.build.version;

      if (!currentVersion) return false;

      const latestVersion = latestServiceVersions[serviceValue.build.repo];

      let isDeprecated;
      try {
        isDeprecated =
          serviceValue.build.repo && latestVersion && semverDiff(currentVersion, latestVersion);
      } catch (e) {
        isDeprecated = false;
      }

      if (isDeprecated) this.isDeprecated = true;

      services[serviceKey] = {
        name: serviceValue.build.name,
        version: serviceValue.build.version,
        newVersion: latestVersion || null,
        repo: serviceValue.build.repo || null,
        isDeprecated,
      };

      return true;
    });

    return services;
  };

  render() {
    return (
      <div className={cx('service-versions-block')}>
        <ServiceVersionItemTooltip
          className={cx('tooltip-block')}
          services={this.state.services}
          isDeprecated={this.isDeprecated}
        />
        {this.isDeprecated ? (
          <span className={cx('current-version')}>
            <FormattedMessage
              id={'ServiceVersionsBlock.deprecatedVersion'}
              defaultMessage={'New versions are available.'}
            />
          </span>
        ) : (
          <span className={cx('current-version')}>
            <FormattedMessage
              id={'ServiceVersionsBlock.currentVersion'}
              defaultMessage={'Current version'}
            />
          </span>
        )}
      </div>
    );
  }
}

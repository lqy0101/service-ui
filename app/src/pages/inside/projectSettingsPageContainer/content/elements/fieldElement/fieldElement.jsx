/*
 * Copyright 2022 EPAM Systems
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

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FieldProvider } from 'components/fields';
import styles from './fieldElement.scss';

const cx = classNames.bind(styles);

export const FieldElement = (props) => {
  const {
    label,
    description,
    children,
    className,
    childrenClassName,
    withoutProvider,
    dataAutomationId,
    isRequired,
    ...rest
  } = props;
  const getChildren = () =>
    withoutProvider ? children : <FieldProvider {...rest}>{children}</FieldProvider>;
  return (
    <div className={cx('wrapper', className)} data-automation-id={dataAutomationId}>
      {label ? (
        <>
          <span className={cx('label')}>
            {label}
            {isRequired && <span className={cx('asterisk')}>*</span>}
          </span>
          {description && <span className={cx('description')}>{description}</span>}
          <div className={cx(childrenClassName)}>{getChildren()}</div>
        </>
      ) : (
        <>
          {getChildren()}
          {description && <span className={cx('description-alt')}>{description}</span>}
        </>
      )}
    </div>
  );
};
FieldElement.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  childrenClassName: PropTypes.string,
  withoutProvider: PropTypes.bool,
  dataAutomationId: PropTypes.string,
  isRequired: PropTypes.bool,
};
FieldElement.defaultProps = {
  label: '',
  description: '',
  className: '',
  childrenClassName: '',
  withoutProvider: false,
  dataAutomationId: '',
  isRequired: false,
};

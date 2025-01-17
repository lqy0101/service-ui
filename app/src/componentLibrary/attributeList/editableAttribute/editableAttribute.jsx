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

import PropTypes from 'prop-types';
import { Attribute } from './attribute';

export const EditableAttribute = ({ attribute, onChange, onEdit, onCancelEdit, ...rest }) => (
  <Attribute {...rest} attribute={attribute} onClick={onEdit} />
);

EditableAttribute.propTypes = {
  attribute: PropTypes.object,
  attributes: PropTypes.array,
  editMode: PropTypes.bool,
  disabled: PropTypes.bool,
  customClass: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  onCancelEdit: PropTypes.func,
};
EditableAttribute.defaultProps = {
  attribute: {},
  attributes: [],
  editMode: false,
  disabled: false,
  customClass: '',
  onEdit: () => {},
  onRemove: () => {},
  onChange: () => {},
  onCancelEdit: () => {},
};

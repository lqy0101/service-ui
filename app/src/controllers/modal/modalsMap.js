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

const modalsMap = {};

export const addModal = (modalName, component) => {
  modalsMap[modalName] = component;
};
export const getModal = (modal) => {
  const SavedModal = modal && modal.id && modalsMap[modal.id];
  const ExplicitModal = modal && modal.component ? () => modal.component : null;

  return SavedModal || ExplicitModal;
};

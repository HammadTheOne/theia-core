"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStorageService = void 0;
const inversify_1 = require("inversify");
/**
 * A StorageService suitable to use during tests.
 */
let MockStorageService = class MockStorageService {
    constructor() {
        this.data = new Map();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSetData(callback) {
        this.onSetDataCallback = callback;
    }
    setData(key, data) {
        this.data.set(key, data);
        if (this.onSetDataCallback) {
            this.onSetDataCallback(key, data);
        }
        return Promise.resolve();
    }
    getData(key, defaultValue) {
        if (this.data.has(key)) {
            return Promise.resolve(this.data.get(key));
        }
        return Promise.resolve(defaultValue);
    }
};
MockStorageService = __decorate([
    (0, inversify_1.injectable)()
], MockStorageService);
exports.MockStorageService = MockStorageService;
//# sourceMappingURL=mock-storage-service.js.map
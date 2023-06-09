"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactWidget = void 0;
const React = require("react");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const widget_1 = require("./widget");
const widgets_1 = require("@phosphor/widgets");
const client_1 = require("react-dom/client");
let ReactWidget = class ReactWidget extends widget_1.BaseWidget {
    constructor(options) {
        super(options);
        this.scrollOptions = {
            suppressScrollX: true,
            minScrollbarLength: 35,
        };
        this.nodeRoot = (0, client_1.createRoot)(this.node);
        this.toDispose.push(common_1.Disposable.create(() => this.nodeRoot.unmount()));
    }
    onUpdateRequest(msg) {
        super.onUpdateRequest(msg);
        this.nodeRoot.render(React.createElement(React.Fragment, null, this.render()));
    }
};
ReactWidget = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.unmanaged)()),
    __metadata("design:paramtypes", [Object])
], ReactWidget);
exports.ReactWidget = ReactWidget;
//# sourceMappingURL=react-widget.js.map
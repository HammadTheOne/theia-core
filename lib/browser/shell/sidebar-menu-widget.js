"use strict";
// *****************************************************************************
// Copyright (C) 2020 Alibaba Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMenuWidget = exports.SidebarBottomMenuWidgetFactory = exports.SidebarTopMenuWidgetFactory = void 0;
const inversify_1 = require("inversify");
const React = require("react");
const widgets_1 = require("../widgets");
const context_menu_renderer_1 = require("../context-menu-renderer");
const hover_service_1 = require("../hover-service");
exports.SidebarTopMenuWidgetFactory = Symbol('SidebarTopMenuWidgetFactory');
exports.SidebarBottomMenuWidgetFactory = Symbol('SidebarBottomMenuWidgetFactory');
/**
 * The menu widget placed on the sidebar.
 */
let SidebarMenuWidget = class SidebarMenuWidget extends widgets_1.ReactWidget {
    constructor() {
        super();
        /**
         * Flag indicating whether a context menu is open. While a context menu is open, the `preservedContext` should not be cleared.
         */
        this.preservingContext = false;
        this.onMouseDown = () => {
            const { activeElement } = document;
            if (activeElement instanceof HTMLElement && !this.node.contains(activeElement)) {
                this.preservedContext = activeElement;
            }
        };
        this.onMouseOut = () => {
            if (!this.preservingContext) {
                this.preservedContext = undefined;
            }
        };
        this.onMouseEnter = (event, title) => {
            if (title && event.nativeEvent.currentTarget) {
                this.hoverService.requestHover({
                    content: title,
                    target: event.currentTarget,
                    position: 'right'
                });
            }
        };
        this.menus = [];
    }
    addMenu(menu) {
        const exists = this.menus.find(m => m.id === menu.id);
        if (exists) {
            return;
        }
        this.menus.push(menu);
        this.menus.sort((a, b) => a.order - b.order);
        this.update();
    }
    removeMenu(menuId) {
        const menu = this.menus.find(m => m.id === menuId);
        if (menu) {
            const index = this.menus.indexOf(menu);
            if (index !== -1) {
                this.menus.splice(index, 1);
                this.update();
            }
        }
    }
    onClick(e, menuPath) {
        this.preservingContext = true;
        const button = e.currentTarget.getBoundingClientRect();
        this.contextMenuRenderer.render({
            menuPath,
            includeAnchorArg: false,
            anchor: {
                x: button.left + button.width,
                y: button.top,
            },
            onHide: () => {
                this.preservingContext = false;
                if (this.preservedContext) {
                    this.preservedContext.focus({ preventScroll: true });
                    this.preservedContext = undefined;
                }
            }
        });
    }
    render() {
        return React.createElement(React.Fragment, null, this.menus.map(menu => menu.customComponent ? menu.customComponent :
            React.createElement("i", { key: menu.id, className: menu.iconClass, onClick: menu.menuEvent ? menu.menuEvent : e => this.onClick(e, menu.menuPath), onMouseDown: this.onMouseDown, onMouseEnter: e => this.onMouseEnter(e, menu.title), onMouseLeave: this.onMouseOut })));
    }
};
__decorate([
    (0, inversify_1.inject)(context_menu_renderer_1.ContextMenuRenderer),
    __metadata("design:type", context_menu_renderer_1.ContextMenuRenderer)
], SidebarMenuWidget.prototype, "contextMenuRenderer", void 0);
__decorate([
    (0, inversify_1.inject)(hover_service_1.HoverService),
    __metadata("design:type", hover_service_1.HoverService)
], SidebarMenuWidget.prototype, "hoverService", void 0);
SidebarMenuWidget = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SidebarMenuWidget);
exports.SidebarMenuWidget = SidebarMenuWidget;
//# sourceMappingURL=sidebar-menu-widget.js.map
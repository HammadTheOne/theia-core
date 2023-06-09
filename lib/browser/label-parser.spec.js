"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const label_parser_1 = require("./label-parser");
const common_1 = require("./../common");
const inversify_1 = require("inversify");
const chai_1 = require("chai");
let statusBarEntryUtility;
before(() => {
    const testContainer = new inversify_1.Container();
    testContainer.bind(label_parser_1.LabelParser).toSelf().inSingletonScope();
    testContainer.bind(common_1.CommandService).toDynamicValue(ctx => ({
        executeCommand() {
            return Promise.resolve(undefined);
        }
    })).inSingletonScope();
    statusBarEntryUtility = testContainer.get(label_parser_1.LabelParser);
});
describe('StatusBarEntryUtility', () => {
    let text;
    it('should create an empty array.', () => {
        text = '';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(0);
    });
    it('should create a string array with one entry.', () => {
        text = 'foo bar';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(1);
        (0, chai_1.expect)(iconArr[0]).equals('foo bar');
    });
    it('should create a string array with one entry - text contains an $.', () => {
        text = 'foo $ bar';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(1);
        (0, chai_1.expect)(iconArr[0]).equals('foo $ bar');
    });
    it('should create a string array with one entry - text contains an $( which does not close.', () => {
        text = 'foo $(bar';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(1);
        (0, chai_1.expect)(iconArr[0]).equals('foo $(bar');
    });
    it('should create a string array with two entries. Second is a simple StatusBarIcon.', () => {
        text = 'foo $(bar)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(2);
        (0, chai_1.expect)(iconArr[0]).equals('foo ');
        (0, chai_1.expect)(iconArr[1]).has.property('name');
        (0, chai_1.expect)(iconArr[1]).has.property('animation');
        (0, chai_1.expect)(iconArr[1].name).equals('bar');
        (0, chai_1.expect)(iconArr[1].animation).to.be.undefined;
    });
    it('should create a string array with two entries. Second is a StatusBarIcon with an animation.', () => {
        text = 'foo $(bar~baz)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(2);
        (0, chai_1.expect)(iconArr[0]).equals('foo ');
        (0, chai_1.expect)(iconArr[1]).has.property('name');
        (0, chai_1.expect)(iconArr[1]).has.property('animation');
        (0, chai_1.expect)(iconArr[1].name).equals('bar');
        (0, chai_1.expect)(iconArr[1].animation).equals('baz');
    });
    it("should create string array of 'foo $(icon1) bar $(icon2) baz $(icon3)'", () => {
        text = 'foo $(icon1) bar $(icon2) baz $(icon3)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(6);
        (0, chai_1.expect)(iconArr[0]).equals('foo ');
        (0, chai_1.expect)(iconArr[2]).equals(' bar ');
    });
    it("should create string array of '$(icon1) foo bar $(icon2) baz $(icon3)'", () => {
        text = '$(icon1) foo bar $(icon2~ani1) baz $(icon3)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(5);
        (0, chai_1.expect)(iconArr[0]).has.property('name');
        (0, chai_1.expect)(iconArr[0].name).equals('icon1');
        (0, chai_1.expect)(iconArr[2]).has.property('animation');
        (0, chai_1.expect)(iconArr[2].animation).equals('ani1');
    });
    it("should create an array with one element of '$(icon1)'", () => {
        text = '$(icon1)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(1);
        (0, chai_1.expect)(iconArr[0]).has.property('name');
        (0, chai_1.expect)(iconArr[0].name).equals('icon1');
    });
    it("should create an array of '$(icon1)$(icon2) (icon3)'", () => {
        text = '$(icon1)$(icon2) $(icon3)';
        const iconArr = statusBarEntryUtility.parse(text);
        (0, chai_1.expect)(iconArr).to.have.lengthOf(4);
        (0, chai_1.expect)(iconArr[0]).has.property('name');
        (0, chai_1.expect)(iconArr[0].name).equals('icon1');
        (0, chai_1.expect)(iconArr[1]).has.property('name');
        (0, chai_1.expect)(iconArr[1].name).equals('icon2');
        (0, chai_1.expect)(iconArr[2]).equals(' ');
        (0, chai_1.expect)(iconArr[3]).has.property('name');
        (0, chai_1.expect)(iconArr[3].name).equals('icon3');
    });
});
//# sourceMappingURL=label-parser.spec.js.map
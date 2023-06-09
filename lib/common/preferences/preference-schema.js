"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceDataProperty = exports.PreferenceSchemaProperties = exports.PreferenceSchema = void 0;
const preference_scope_1 = require("./preference-scope");
const types_1 = require("../types");
var PreferenceSchema;
(function (PreferenceSchema) {
    function is(obj) {
        return (0, types_1.isObject)(obj) && PreferenceSchemaProperties.is(obj.properties);
    }
    PreferenceSchema.is = is;
    function getDefaultScope(schema) {
        let defaultScope = preference_scope_1.PreferenceScope.Workspace;
        if (!preference_scope_1.PreferenceScope.is(schema.scope)) {
            defaultScope = preference_scope_1.PreferenceScope.fromString(schema.scope) || preference_scope_1.PreferenceScope.Workspace;
        }
        else {
            defaultScope = schema.scope;
        }
        return defaultScope;
    }
    PreferenceSchema.getDefaultScope = getDefaultScope;
})(PreferenceSchema = exports.PreferenceSchema || (exports.PreferenceSchema = {}));
var PreferenceSchemaProperties;
(function (PreferenceSchemaProperties) {
    function is(obj) {
        return (0, types_1.isObject)(obj);
    }
    PreferenceSchemaProperties.is = is;
})(PreferenceSchemaProperties = exports.PreferenceSchemaProperties || (exports.PreferenceSchemaProperties = {}));
var PreferenceDataProperty;
(function (PreferenceDataProperty) {
    function fromPreferenceSchemaProperty(schemaProps, defaultScope = preference_scope_1.PreferenceScope.Workspace) {
        if (!schemaProps.scope) {
            schemaProps.scope = defaultScope;
        }
        else if ((0, types_1.isString)(schemaProps.scope)) {
            return Object.assign(schemaProps, { scope: preference_scope_1.PreferenceScope.fromString(schemaProps.scope) || defaultScope });
        }
        return schemaProps;
    }
    PreferenceDataProperty.fromPreferenceSchemaProperty = fromPreferenceSchemaProperty;
})(PreferenceDataProperty = exports.PreferenceDataProperty || (exports.PreferenceDataProperty = {}));
//# sourceMappingURL=preference-schema.js.map
/********************************************************************************
 * Copyright (C) 2022 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { MaybePromise } from '../../common/types';
import { RequestService } from '@theia/request';
import { Argv, Arguments } from 'yargs';
import { CliContribution } from '../cli';
export declare const ProxyUrl = "proxy-url";
export declare const ProxyAuthorization = "proxy-authorization";
export declare const StrictSSL = "strict-ssl";
export declare class ProxyCliContribution implements CliContribution {
    protected readonly requestService: RequestService;
    configure(conf: Argv): void;
    setArguments(args: Arguments): MaybePromise<void>;
}
//# sourceMappingURL=proxy-cli-contribution.d.ts.map
import { Disposable } from '../common';
import { Emitter, Event } from '../common/event';
export declare type ContextKeyValue = null | undefined | boolean | number | string | Array<null | undefined | boolean | number | string> | Record<string, null | undefined | boolean | number | string>;
export interface ContextKey<T extends ContextKeyValue = ContextKeyValue> {
    set(value: T | undefined): void;
    reset(): void;
    get(): T | undefined;
}
export declare namespace ContextKey {
    const None: ContextKey<any>;
}
export interface ContextKeyChangeEvent {
    affects(keys: {
        has(key: string): boolean;
    }): boolean;
}
export declare const ContextKeyService: unique symbol;
export interface ContextMatcher extends Disposable {
    /**
     * Whether the expression is satisfied. If `context` provided, the service will attempt to retrieve a context object associated with that element.
     */
    match(expression: string, context?: HTMLElement): boolean;
}
export interface ContextKeyService extends ContextMatcher {
    readonly onDidChange: Event<ContextKeyChangeEvent>;
    createKey<T extends ContextKeyValue>(key: string, defaultValue: T | undefined): ContextKey<T>;
    /**
     * @returns a Set of the keys used by the given `expression` or `undefined` if none are used or the expression cannot be parsed.
     */
    parseKeys(expression: string): Set<string> | undefined;
    /**
     * Creates a temporary context that will use the `values` passed in when evaluating {@link callback}.
     * {@link callback | The callback} must be synchronous.
     */
    with<T>(values: Record<string, unknown>, callback: () => T): T;
    /**
     * Creates a child service with a separate context scoped to the HTML element passed in.
     * Useful for e.g. setting the {view} context value for particular widgets.
     */
    createScoped(target: HTMLElement): ScopedValueStore;
    /**
     * @param overlay values to be used in the new {@link ContextKeyService}. These values will be static.
     * Creates a child service with a separate context and a set of fixed values to override parent values.
     */
    createOverlay(overlay: Iterable<[string, unknown]>): ContextMatcher;
    /**
     * Set or modify a value in the service's context.
     */
    setContext(key: string, value: unknown): void;
}
export declare type ScopedValueStore = Omit<ContextKeyService, 'onDidChange' | 'match' | 'parseKeys' | 'with' | 'createOverlay'>;
export declare class ContextKeyServiceDummyImpl implements ContextKeyService {
    protected readonly onDidChangeEmitter: Emitter<ContextKeyChangeEvent>;
    readonly onDidChange: Event<ContextKeyChangeEvent>;
    protected fireDidChange(event: ContextKeyChangeEvent): void;
    createKey<T extends ContextKeyValue>(key: string, defaultValue: T | undefined): ContextKey<T>;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    match(expression: string, context?: HTMLElement): boolean;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    parseKeys(expression: string): Set<string> | undefined;
    /**
     * Details should be implemented by an extension, e.g. by the monaco extension.
     * Callback must be synchronous.
     */
    with<T>(values: Record<string, unknown>, callback: () => T): T;
    /**
     * Details should implemented by an extension, e.g. by the monaco extension.
     */
    createScoped(target: HTMLElement): ContextKeyService;
    /**
     * Details should be implemented by an extension, e.g. the monaco extension.
     */
    createOverlay(overlay: Iterable<[string, unknown]>): ContextMatcher;
    /**
     * Details should be implemented by an extension, e.g. by the monaco extension.
     */
    setContext(key: string, value: unknown): void;
    dispose(): void;
}
//# sourceMappingURL=context-key-service.d.ts.map
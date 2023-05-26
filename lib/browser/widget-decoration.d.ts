/**
 * Namespace for the decoration data and the styling refinements for the decorated widgets.
 */
export declare namespace WidgetDecoration {
    /**
     * CSS styles for the decorators.
     */
    namespace Styles {
        const CAPTION_HIGHLIGHT_CLASS = "theia-caption-highlight";
        const CAPTION_PREFIX_CLASS = "theia-caption-prefix";
        const CAPTION_SUFFIX_CLASS = "theia-caption-suffix";
        const ICON_WRAPPER_CLASS = "theia-icon-wrapper";
        const DECORATOR_SIZE_CLASS = "theia-decorator-size";
        const DECORATOR_SIDEBAR_SIZE_CLASS = "theia-decorator-sidebar-size";
        const TOP_RIGHT_CLASS = "theia-top-right";
        const BOTTOM_RIGHT_CLASS = "theia-bottom-right";
        const BOTTOM_RIGHT_SIDEBAR_CLASS = "theia-bottom-right-sidebar";
        const BOTTOM_LEFT_CLASS = "theia-bottom-left";
        const TOP_LEFT_CLASS = "theia-top-left";
    }
    /**
     * For the sake of simplicity, we have merged the `font-style`, `font-weight`, and the `text-decoration` together.
     */
    type FontStyle = 'normal' | 'bold' | 'italic' | 'oblique' | 'underline' | 'line-through';
    /**
     * A string that could be:
     *
     *  - one of the browser colors, (E.g.: `blue`, `red`, `magenta`),
     *  - the case insensitive hexadecimal color code, (for instance, `#ee82ee`, `#20B2AA`, `#f09` ), or
     *  - either the `rgb()` or the `rgba()` functions.
     *
     * For more details, see: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
     *
     * Note, it is highly recommended to use one of the predefined colors of Theia, so the desired color will
     * look nice with both the `light` and the `dark` theme too.
     */
    type Color = string;
    /**
     * Encapsulates styling information of the font.
     */
    interface FontData {
        /**
         * Zero to any font style.
         */
        readonly style?: FontStyle | FontStyle[];
        /**
         * The color of the font.
         */
        readonly color?: Color;
    }
    /**
     * Arbitrary information that has to be shown either before or after the caption as a prefix or a suffix.
     */
    interface CaptionAffix {
        /**
         * The text content of the prefix or the suffix.
         */
        readonly data: string;
        /**
         * Font data for customizing the prefix of the suffix.
         */
        readonly fontData?: FontData;
    }
    interface BaseTailDecoration {
        /**
         * Optional tooltip for the tail decoration.
         */
        readonly tooltip?: string;
    }
    /**
     * Unlike caption suffixes, tail decorations appears right-aligned after the caption and the caption suffixes (is any).
     */
    interface TailDecoration extends BaseTailDecoration {
        /**
         * The text content of the tail decoration.
         */
        readonly data: string;
        /**
         * Font data for customizing the content.
         */
        readonly fontData?: FontData;
    }
    namespace TailDecoration {
        /**
         * Combines all fields of all `TailDecoration` variants
         */
        type AnyPartial = Partial<TailDecoration & TailDecorationIcon & TailDecorationIconClass>;
        /**
         * Represents any permissible concrete `TailDecoration` variation.
         */
        type AnyConcrete = TailDecoration | TailDecorationIcon | TailDecorationIconClass;
        function isDotDecoration(decoration: AnyPartial): decoration is TailDecorationIcon;
    }
    interface TailDecorationIcon extends BaseTailDecoration {
        /**
         * This should be the name of the Font Awesome icon with out the `fa fa-` prefix, just the name, for instance `paw`.
         * For the existing icons, see here: https://fontawesome.com/v4.7.0/icons/.
         */
        readonly icon: string;
        /**
         * The color of the icon.
         */
        readonly color?: Color;
    }
    interface TailDecorationIconClass extends BaseTailDecoration {
        /**
         * This should be the entire Font Awesome class array, for instance ['fa', 'fa-paw']
         * For the existing icons, see here: https://fontawesome.com/v4.7.0/icons/.
         */
        readonly iconClass: string[];
        /**
         * The color of the icon.
         */
        readonly color?: Color;
    }
    /**
     * Enumeration for the quadrant to overlay the image on.
     */
    enum IconOverlayPosition {
        /**
         * Overlays the top right quarter of the original image.
         */
        TOP_RIGHT = 0,
        /**
         * Overlays the bottom right of the original image.
         */
        BOTTOM_RIGHT = 1,
        /**
         * Overlays the bottom left segment of the original image.
         */
        BOTTOM_LEFT = 2,
        /**
         * Occupies the top left quarter of the original icon.
         */
        TOP_LEFT = 3
    }
    namespace IconOverlayPosition {
        /**
         * Returns with the CSS class style for the enum.
         */
        function getStyle(position: IconOverlayPosition, inSideBar?: boolean): string;
    }
    /**
     * A shape that can be optionally rendered behind the overlay icon. Can be used to further refine colors.
     */
    interface IconOverlayBackground {
        /**
         * Either `circle` or `square`.
         */
        readonly shape: 'circle' | 'square';
        /**
         * The color of the background shape.
         */
        readonly color?: Color;
    }
    /**
     * Has not effect if the widget being decorated has no associated icon.
     */
    interface BaseOverlay {
        /**
         * The position where the decoration will be placed on the top of the original icon.
         */
        readonly position: IconOverlayPosition;
        /**
         * The color of the overlaying icon. If not specified, then the default icon color will be used.
         */
        readonly color?: Color;
        /**
         * The optional background color of the overlay icon.
         */
        readonly background?: IconOverlayBackground;
    }
    interface IconOverlay extends BaseOverlay {
        /**
         * This should be the name of the Font Awesome icon with out the `fa fa-` prefix, just the name, for instance `paw`.
         * For the existing icons, see here: https://fontawesome.com/v4.7.0/icons/.
         */
        readonly icon: string;
    }
    interface IconClassOverlay extends BaseOverlay {
        /**
         * This should be the entire Font Awesome class array, for instance ['fa', 'fa-paw']
         * For the existing icons, see here: https://fontawesome.com/v4.7.0/icons/.
         */
        readonly iconClass: string[];
    }
    /**
     * The caption highlighting with the highlighted ranges and an optional background color.
     */
    interface CaptionHighlight {
        /**
         * The ranges to highlight in the caption.
         */
        readonly ranges: CaptionHighlight.Range[];
        /**
         * The optional color of the text data that is being highlighted. Falls back to the default `mark` color values defined under a widget segment class.
         */
        readonly color?: Color;
        /**
         * The optional background color of the text data that is being highlighted.
         */
        readonly backgroundColor?: Color;
    }
    namespace CaptionHighlight {
        /**
         * A pair of offset and length that has to be highlighted as a range.
         */
        interface Range {
            /**
             * Zero based offset of the highlighted region.
             */
            readonly offset: number;
            /**
             * The length of the highlighted region.
             */
            readonly length: number;
        }
        namespace Range {
            /**
             * `true` if the `arg` is contained in the range. The ranges are closed ranges, hence the check is inclusive.
             */
            function contains(arg: number, range: Range): boolean;
        }
        /**
         * The result of a caption splitting based on the highlighting information.
         */
        interface Fragment {
            /**
             * The text data of the fragment.
             */
            readonly data: string;
            /**
             * Has to be highlighted if defined.
             */
            readonly highlight?: true;
        }
        /**
         * Splits the `caption` argument based on the ranges from the `highlight` argument.
         */
        function split(caption: string, highlight: CaptionHighlight): Fragment[];
    }
    /**
     * Encapsulates styling information that has to be applied on the widget which we decorate.
     */
    interface Data {
        /**
         * The higher number has higher priority. If not specified, treated as `0`.
         * When multiple decorators are available for the same item, and decoration data cannot be merged together,
         * then the higher priority item will be applied on the decorated element and the lower priority will be ignored.
         */
        readonly priority?: number;
        /**
         * The font data for the caption.
         */
        readonly fontData?: FontData;
        /**
         * The background color of the entire row.
         */
        readonly backgroundColor?: Color;
        /**
         * Optional, leading prefixes right before the caption.
         */
        readonly captionPrefixes?: CaptionAffix[];
        /**
         * Suffixes that might come after the caption as an additional information.
         */
        readonly captionSuffixes?: CaptionAffix[];
        /**
         * Optional right-aligned decorations that appear after the widget caption and after the caption suffixes (is any).
         */
        readonly tailDecorations?: Array<TailDecoration | TailDecorationIcon | TailDecorationIconClass>;
        /**
         * Custom tooltip for the decorated item. Tooltip will be appended to the original tooltip, if any.
         */
        readonly tooltip?: string;
        /**
         * Sets the color of the icon. Ignored if the decorated item has no icon.
         */
        readonly iconColor?: Color;
        /**
         * Has not effect if given, but the widget does not have an associated image.
         */
        readonly iconOverlay?: IconOverlay | IconClassOverlay;
        /**
         * An array of ranges to highlight the caption.
         */
        readonly highlight?: CaptionHighlight;
        /**
         * A count badge for widgets.
         */
        readonly badge?: number;
    }
    namespace Data {
        /**
         * Compares the decoration data based on the priority. Lowest priorities come first (i.e. left.priority - right.priority).
         */
        const comparePriority: (left: Data, right: Data) => number;
    }
}
//# sourceMappingURL=widget-decoration.d.ts.map
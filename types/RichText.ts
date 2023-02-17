import { Image } from "./Image"
import { InlineImageProps as InlineImage } from "../components/InlineImage/InlineImage"

export const enum HorizontalAlignment {
  Left,
  Right,
}

export const enum ListType {
  Ordered,
  Unordered,
}

export const enum RichTextItemType {
  TextBlock,
  List,
  Image,
}

export interface TextNode {
  content: string
  isBold?: boolean
  to?: string
}
export interface Line {
  nodes: TextNode[]
}
export interface TextBlock {
  lines: Line[]
  figure?: {
    image: Image
    alignment: HorizontalAlignment
    caption?: string
  }
}

export interface List {
  items: RichTextItem[][]
  type?: ListType
}

export interface RichTextItem {
  content: TextBlock | List | InlineImage
  type: RichTextItemType
}

export interface RichText {
  items: RichTextItem[]
}
import * as yup from "yup"
import React from "react"
import { BlockTemplates, InputType } from "./enums"
import { Header } from "./Header/Header"
import { HeaderBlock } from "./Header/headerDef"

export type Unarray<T> = T extends Array<infer U> ? U : T

export interface Block {
  id: string
}

export type BlocksDefs = HeaderBlock

// TODO dynamic import
export const blocksComponentList: Record<BlockTemplates, React.FC<any>> = {
  header: Header,
}

export interface BlockDef<T> {
  title: string
  template: BlockTemplates
  schema: yup.SchemaOf<T>
  adminFields: AdminFields<T>
}

export type AdminFields<T> = {
  [K in keyof T]: AdminField<Unarray<T[K]>>
}

type AdminField<T> = GroupDef<T> | FieldDef

interface GeneralDef {
  label: string
  clonable?: true
}

interface FieldDef extends GeneralDef {
  inputType: InputType
  options?: {
    // TODO only for select
    value: string | number
    label: string
  }[]
}

interface GroupDef<T> extends GeneralDef {
  fields: AdminFields<T>
}

export const isGroupField = <T extends {}>(
  component: AdminField<T>
): component is GroupDef<T> => "fields" in component
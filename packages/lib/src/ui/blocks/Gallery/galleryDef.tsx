import { BlockTemplates, InputType } from "../enums"
import { Block, BlockDef } from "../blocks"
import { BlockFields, withBlockSchema } from "../../components/Block/Block"
import * as yup from "yup"
import { Image, imageDef, imageSchema } from "../../../types/Image"
import PictureOutlined from "@ant-design/icons/lib/icons/PictureOutlined"

export interface GalleryBlock extends Block {
  template: BlockTemplates.Gallery
  fields: GalleryProps
}

export interface GalleryProps extends BlockFields<string> {
  images: Image[]
}

export const gallerySchema: yup.SchemaOf<GalleryProps> = withBlockSchema(
  yup.object({
    images: yup.array().of(imageSchema).required(),
  })
)

export const galleryDef: BlockDef<GalleryProps> = {
  title: "Galerie",
  template: BlockTemplates.Gallery,
  schema: gallerySchema,
  icon: PictureOutlined,
  inputType: InputType.Heading,
  additionalFields: {
    images: {
      clonable: true,
      ...imageDef,
    },
  },
}

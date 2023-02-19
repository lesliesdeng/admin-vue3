interface ISelectOption {
  label: string
  value: any
}
interface ModalStyleOption {
  direction: string
  size: string
}

interface ITreeOption {
  value: string | number
  label: string
  children?: ITreeOption[]
}

type ItemType = 'input' | 'password' | 'select' | 'datepicker' | 'tree'

export interface IFormItem {
  field: string
  type: ItemType
  label: string
  placeHolder?: string
  rules?: any[]
  options?: ISelectOption[]
  otherOption?: any
  defaultValue?: any
  isHidden?: boolean
  slotName?: string
  treeData?: ITreeOption[]
}

export interface IForm {
  type?: string
  title?: string
  formItems?: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
  modalStyle?: ModalStyleOption
}

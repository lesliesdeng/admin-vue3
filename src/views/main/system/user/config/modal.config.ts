import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建用户',
  type: 'drawer', //drawer：抽屉  dialog：弹窗
  modalStyle: {
    direction: 'rtl', //抽屉方向
    size: '40%'
  },
  formItems: [
    { field: 'name', type: 'input', label: '用户名', placeHolder: '请输入用户名' },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeHolder: '请输入真实姓名',
      rules: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeHolder: '请输入密码'
    },
    { field: 'cellphone', type: 'input', label: '电话号码', placeHolder: '请输入电话号码' },
    { field: 'roleId', type: 'select', label: '选择角色', placeHolder: '请选择角色', options: [] },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeHolder: '请选择部门',
      options: []
    },
    {
      field: 'treeId',
      type: 'tree',
      label: '选择tree',
      placeHolder: '请选择tree',
      treeData: [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

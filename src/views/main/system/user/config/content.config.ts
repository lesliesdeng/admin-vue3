export const contentTableConfig = {
  title: '用户列表',
  pageName: 'systemUser',
  // noCreate: true,
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实名', minWidth: '120' },
    { prop: 'cellphone', label: '手机号码', minWidth: '150' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'create' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'update' },
    // 使用封装的编辑删除按钮：slotName：handler
    { label: '操作', minWidth: '240', slotName: 'userhandler', fixed: 'right' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

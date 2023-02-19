export interface ISystemState {
  departmentTotalCount: number
  departmentList: any[]
  roleTotalCount: number
  roleList: any[]
  menuList: any[]
  categoryTotalCount: number
  categoryList: any[]
  goodsTotalCount: number
  goodsList: any[]
  storyTotalCount: number
  storyList: any[]
}

export interface IPagePayload {
  pageName: string
  // pageUrl: string
  queryInfo: any
  id?: number
}

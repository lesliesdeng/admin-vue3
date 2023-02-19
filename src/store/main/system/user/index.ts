import { Module } from 'vuex'
import { SystemUserState } from './types'
import { IPagePayload } from '../types'
import { IRootState } from '../../../types'

import {
  getPageList,
  deletePageData,
  newPageData,
  editPageData
} from '@/service/main/system/system'

const systemUserModule: Module<SystemUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      systemUserTotalCount: 0,
      systemUserList: []
    }
  },
  mutations: {
    changeSystemUsersTotalCount(state, totalCount: number) {
      state.systemUserTotalCount = totalCount
    },
    changeSystemUsersList(state, userList: any) {
      state.systemUserList = userList
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const listData: any[] = (state as any)[`${pageName}List`] ?? []
        return listData
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        const listCount = (state as any)[`${pageName}TotalCount`] ?? 0
        return listCount
      }
    }
  },
  actions: {
    async getPageListDataAction({ commit }, payload: IPagePayload) {
      // const pageName = payload.pageName
      const pageUrl = `/users/list`
      if (pageUrl.length === 0) return
      const { totalCount, list } = await getPageList(pageUrl, payload.queryInfo)
      commit('changeSystemUsersTotalCount', totalCount)
      commit('changeSystemUsersList', list)
    },

    async deletePageDataAction({ dispatch }, payload: IPagePayload) {
      // const pageName = payload.pageName
      const deleteId = payload.id
      if (!deleteId) return
      const pageUrl = `/users/${deleteId}`
      await deletePageData(pageUrl)
      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },

    async newPageDataAction({ dispatch }, payload: IPagePayload) {
      const pageUrl = `/users`
      const pageData = payload.queryInfo
      await newPageData(pageUrl, pageData)

      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },

    async editPageDataAction({ dispatch }, payload: IPagePayload) {
      if (!payload.id) return
      const pageUrl = `/users/${payload.id}`
      const pageData = payload.queryInfo
      await editPageData(pageUrl, pageData)

      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: payload.queryInfo
      })
    }
  }
}

export default systemUserModule

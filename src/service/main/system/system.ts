import iRequest from '../../index'

export function getPageList(pageUrl: string, queryInfo: any) {
  return iRequest.post({
    url: pageUrl,
    data: queryInfo,
    showLoading: true
  })
}

export function deletePageData(pageUrl: string) {
  return iRequest.delete({
    url: pageUrl,
    showLoading: true
  })
}

export function newPageData(pageUrl: string, newData: any) {
  return iRequest.post({
    url: pageUrl,
    data: newData,
    showLoading: true
  })
}

export function editPageData(pageUrl: string, editData: any) {
  return iRequest.patch({
    url: pageUrl,
    data: editData,
    showLoading: true
  })
}

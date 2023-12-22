/**
 * 简单 search + table 功能整合
 */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import VerticalFormPage from "@/components/FormPage/VerticalFormPage";
import { Table } from "antd";
import { handleFormValue, clacPagination } from "@/utils/tools"
import { ParseInfoProps } from '@/components/FormFactory';


interface ISearchTable {
  formRef?: any,
  formItems: ParseInfoProps<any>[],
  columns: Dict[],
  tableAntdProps?: Dict;
  beforeHandleSubmit?: (val: Dict) => any,        // 查询提交前处理数据
  handleTableValueBeforeSet?: (val: Dict) => any, // table获取数据时处理数据
  serviceFn: (val: Dict) => any,
  noPagination: boolean,  // 不分页时，返回数据结构不太一样兼容一下
  setSelectedRowKeys: (params?: any) => any;
  getCurPageIds: (props: Dict) => any;
  isHideReset?:boolean;
  serviceUid?:string
}

const defaultPage = {
  pageNo: 1,
  pageSize: 10
}

const SearchTable: React.FC<ISearchTable> = forwardRef((props, ref) => {
  const { 
    formRef, formItems, columns, tableAntdProps, 
    beforeHandleSubmit, serviceFn, handleTableValueBeforeSet, 
    noPagination = false, getCurPageIds,isHideReset,serviceUid
  } = props
  const [pagination, setPagination] = useState({})
  const [searchParams, setSearchParams] = useState<Dict>({})
  const [list, setList] = useState<Dict[]>([])
  const serviceUidparams={serviceUid:serviceUid}

  useEffect(() => {
    queryList()
  }, [])

  useImperativeHandle(ref, () => ({
    refreshData,
  }))

  const refreshData = (fromStart: boolean = false) => {
    let pageInfo = fromStart 
      ? { pageNo: 1, pageSize: pagination.pageSize || 10 }
      : { pageNo: pagination.current || 1, pageSize: pagination.pageSize || 10 }
    queryList(
      pageInfo,
      searchParams,
      serviceUidparams
    )
  }
  const queryList = async (pageInfo: Dict = defaultPage, searchInfo: Dict = searchParams,serviceUid:Dict=serviceUidparams) => {
    const res = await serviceFn({ ...pageInfo, ...searchInfo,...serviceUid})
    handleTableValueBeforeSet && handleTableValueBeforeSet(res?.resultData)
    let dataList = []

    if (noPagination) {
      dataList = Array.isArray(res?.resultData) ? res?.resultData : []
    } else {
      const { data, pageNo, pageSize, totalCount } = res?.resultData || {}
      setPagination(
        clacPagination({
          current: pageNo || pagination.current || 1,
          pageSize: pageSize ||  pagination.pageSize || 10,
          total: totalCount || 0
        })
      )

      dataList = data
    }

    setList(dataList)
  }

  const toSubmit = (val: Dict) => {
    const value = handleFormValue(val)
    beforeHandleSubmit && beforeHandleSubmit(value)
    setSearchParams(value)
    queryList(defaultPage, value,serviceUidparams)
  }

  const changePage = ({ current, pageSize}: Dict) => {
    queryList({pageNo: current, pageSize})
    getCurPageIds && getCurPageIds({
      curIds: list.map(i => tableAntdProps.rowKey)
    })
  }

  return (
    <>
      {formItems.length > 0 &&
        <VerticalFormPage 
          form={formRef} 
          formItems={formItems} 
          onSubmit={toSubmit}
          isHideReset={isHideReset}
        />
      }
      {props.children}
      <Table
        rowKey={record => record.dataIndex}
        dataSource={list}
        columns={columns}
        pagination={pagination}
        onChange={changePage}
        {...tableAntdProps}
      />
    </>
  )
})

export default SearchTable
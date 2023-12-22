import React from "react";
import { Card } from "antd";
import { menu } from '@/locales/zh-CN';
import routes from "@/routes/index"
import { useModel } from '@/layouts/ModelLayout';

interface CardProps {
  title?: string;
  antdProps?: any;
  height?: string;
}
  
const BaseCard: React.FC<CardProps> = props => {
  const { title, antdProps = {}, height } = props;
  const auth = useModel('useAuthQuery');

  const pathname = window.location.href
  const arr = pathname.split('/')
  let path = `/${arr[arr.length - 1]}`;

  if (/\?/.test(path)) {
    path = path?.split('?')?.[0]
  }

  const calcCardTitle = () => {
    // 默认 '/' 页面展示title
    if (path === '/') return '服务号配置'
    
    return title ? title : menu?.[path];
  };

  let map:Dict = {}
  const routesMap = (list: any[] = routes) => {
    list.forEach(i => {
      if (i.path === '/') return
      if (i.routes && i.routes.length > 0) {
        routesMap(i.routes)
      }
      map[i.path] = i.authCode
    })
    return map
  }

  const renderComp = () => {
    const authKey = routesMap()[path]
    
    if (auth[authKey] || process.env.NOAUTH === 'true' || authKey === undefined) {
      return props.children
    } else {
      return <div>暂无权限～</div>
    }

  }

  return (
    <Card style={{ height: height }} title={calcCardTitle()} {...antdProps}>
      {renderComp()}
    </Card>
  );
};

export default BaseCard